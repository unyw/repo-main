#!/usr/bin/env node
const os = require('os');
const process = require('process')
const path    = require('path')
const { readdirSync, readFileSync, writeFileSync, existsSync } = require('fs')
const { execSync }    = require('child_process');

const version = `1.0.0`


// Utils
const logger = {
  log: console.log,
  error: (a, ...l) => console.error("\x1b[31m" + a, ...l, "\x1b[0m"),
  title: (a, ...l) => console.log("\n\x1b[1m" + a, ...l, "\x1b[0m"),
}

const execLive = cmd => execSync(cmd, {stdio: 'inherit'})

const getDirectories = source =>
  readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

const getFiles = source =>
  readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isFile())
    .map(dirent => dirent.name)

const pkginfoFile = ({
  pkgname,
  pkgver,
  pkgdesc = '',
  url = 'https://unyw.github.io',
  mantainer = '',
  license = '',
  depend = []
}) => `# Generated by unyw build.js v${version}
# https://unyw.github.io
# ${execSync(`LANG=en_us_88591 date --utc`).toString().trim()}
pkgname = ${pkgname}
pkgver = ${pkgver}
pkgdesc = ${pkgdesc}
url = ${url}
size = 100000
builddate = ${execSync(`date +%s`).toString().trim()}
maintainer = ${mantainer}
license = ${license}
${depend.map(dep => `depend = ${dep}`).join('\n')}
`


// Useful paths and consts
const repoDir = path.dirname(process.argv[1])
const distDir = `${repoDir}/stable`
const dataDir   = `${os.homedir()}/unyw`
const rootfsDir = `${dataDir}/rootfs`
const keyDir   = `${dataDir}/keys`

const archs = ['x86', 'x86_64', 'armv7', 'aarch64']
const hostArch = ({
  'ia32' : 'x86',
  'x32'  : 'x86',
  'x64'  : 'x86_64',
  'arm'  : 'armv7',
  'arm64': 'aarch64',
})[process.arch]


// Donwload alpine in $HOME/rootfs if missing 
if(!existsSync(`${rootfsDir}/usr/bin/abuild`)){
  console.log(`Alpine linux rootfs missing. Downloading...`)
  execLive(`mkdir -p '${rootfsDir}'`)
  process.chdir(rootfsDir)
  execLive(`wget -O 'rootfs.tar.gz' 'https://dl-cdn.alpinelinux.org/alpine/v3.14/releases/${hostArch}/alpine-minirootfs-3.14.1-${hostArch}.tar.gz'` +
    `&& tar -xzf rootfs.tar.gz && rm -f rootfs.tar.gz && proot -w / -R . apk add alpine-sdk && echo Done - everything installed!`)

}

// Create key if not exists
if(!existsSync(keyDir)){
  console.log(`Key file missing. Generating...`)
  process.chdir(rootfsDir)
  execLive(`mkdir -p ${keyDir} && proot -w / -R . -b '${keyDir}:/keys' ash -c 'read -p "Enter key name: " key && echo "/keys/$key" | abuild-keygen'`) 
  process.chdir(repoDir)
  console.log(`Generated key files `)
}



// Create dist dirs
process.chdir(repoDir)
execSync(`mkdir -p ${archs.map(arch => `'${distDir}/${arch}'`).join(' ')} '${distDir}/icons'`)



// Build packages
const packages = getDirectories('packages');
const args = process.argv.length > 2 ? process.argv.slice(2) : packages;

console.log("Getting started...")

args.forEach(el => {
  let package = el.replace('packages/', '')
  if(package.endsWith('/')) package.substr(0, package.length - 1)
  logger.title(`Building packages/${package}`)
  if(!packages.includes(package)){
    logger.error(`ERROR: package "${package}" does not exist!`)
    return
  }
  process.chdir(`${repoDir}/packages/${package}`)

  let manifest = {}
  try {  manifest = JSON.parse(readFileSync('package.json'))
  }catch(e){ 
    logger.error(`${e}\nERROR: can't open ${package}/package.json, skipping.`)
    return
  }
  
  if(!existsSync(`node_modules`) && (manifest['devDependencies'] || manifest['dependencies'])){
    logger.log(`--> Missing node_modules, running 'npm i'`)
    execLive('npm i')
  }

  if(manifest.scripts && manifest.scripts['build']){
    logger.log(`--> Running npm build`)
    execLive('npm run build')
  }     


  // Get properties
  let info = {
    pkgname: manifest['name'],
    pkgver:  manifest['version'],
    pkgdesc: manifest['description'],
    url:     manifest['homepage'],
    mantainer: manifest['author'],
    license:  manifest['license'],
    depend: ['unyw'],
    ...(manifest['unyw-pkginfo'] || {})
  }

  archs.forEach(arch => {
    const fileName = `${info.pkgname}-${info.pkgver}.apk`
    logger.log(`--> Packaging file ${fileName}`)
    execLive(`rm -rf ./.unyw_tmp && mkdir -p ./.unyw_tmp/control ./.unyw_tmp/data`)

    // Copy files
    if(existsSync('app')){
      const appName = info.pkgname.startsWith('unyw-app-') ? info.pkgname.replace('unyw-app-', '') : info.pkgname
      execSync(`mkdir -p ./.unyw_tmp/data/usr/share/unyw/apps/${appName}` + 
        ` && cp -R app/. ./.unyw_tmp/data/usr/share/unyw/apps/${appName}`)
      
      if(existsSync('app/icon.png')){
        execSync(`cp app/icon.png '${distDir}/icons/${info.pkgname}.png'`)
      }
    }
    if(existsSync(`control`))      execLive(`cp -R control/.      ./.unyw_tmp/control/`)
    if(existsSync(`data/all`))     execLive(`cp -R data/all/.     ./.unyw_tmp/data/`)
    if(existsSync(`data/${arch}`)) execLive(`cp -R data/${arch}/. ./.unyw_tmp/data/`)
    
    if(!existsSync('./.unyw_tmp/control/.PKGINFO')) writeFileSync('./.unyw_tmp/control/.PKGINFO', pkginfoFile(info))

    // Build package
    execLive(`proot -w / -R '${rootfsDir}' -b '${keyDir}:/keys' -b '${repoDir}/packages/${package}/.unyw_tmp:/pkgsrc'`
    + ` ash -c 'cd /pkgsrc/data    && find * -print0 | LC_ALL=C sort -z | tar --xattrs --format=posix --pax-option=exthdr.name=%d/PaxHeaders/%f,atime:=0,ctime:=0 --no-recursion --null -T - -f - -c | abuild-tar --hash | gzip -9 > ../data.tar.gz`
    + ` && echo "# Hash added automatically by unyw build.js" >> /pkgsrc/control/.PKGINFO && echo "datahash = $(sha256sum /pkgsrc/data.tar.gz | cut -f1 -d\" \")" >> /pkgsrc/control/.PKGINFO`
    + ` && cd /pkgsrc/control && tar -c .PKGINFO --format=posix | abuild-tar --cut | gzip -9 > ../control.tar.gz` 
    + ` && cd /pkgsrc && abuild-sign -k /keys/*.rsa ./control.tar.gz && cat control.tar.gz data.tar.gz > pkg.apk'`)

    execLive(`cp '${repoDir}/packages/${package}/.unyw_tmp/pkg.apk' '${distDir}/${arch}/${fileName}'`)
  })
})


logger.title("Updating APKINDEX.tar.gz")
archs.forEach(arch => execLive(`proot -w / -R '${rootfsDir}' -b '${keyDir}:/keys' -b '${distDir}/${arch}:/repo'`
 + ` ash -c 'apk index --no-warnings -o /repo/APKINDEX.tar.gz /repo/*.apk && abuild-sign -k /keys/*.rsa /repo/APKINDEX.tar.gz'`))

logger.title("Adding manifest.json")
const manifest = {
  apps: getFiles(`${distDir}/icons`).map( icon => icon.replace('.png', ''))
}
console.log(JSON.stringify(manifest, null, 2))
writeFileSync(`${distDir}/manifest.json`, JSON.stringify(manifest, null, 2))

logger.title("...done!\n")
