


const UNYW_IP = window.__UNYW_PRIVATE_IP || 'localhost'
let unyw = null


const postData = async (url = '', data = {}) => {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

const fetchToken = async () => {
  return (await fetch('/UNYW_TOKEN_API.json').then( r => r.json())).token
}

const wait = (milliseconds) => new Promise(resolve => setTimeout(resolve, milliseconds))


export default async ()  => {
  while(true){
    try{
      if(unyw == null){
        unyw = await (async() => {
          const token = UNYW_IP != 'localhost' ? 'debugapi' : await fetchToken()
          const api = {}
          const info = await postData(`http://${UNYW_IP}:12080/unyw/info?token=${token}`)
          Object.entries(info.api).forEach( ([module, functions]) => {
            api[module] = {}
            functions.forEach(fun => {
              api[module][fun] = async (data) => postData(`http://${UNYW_IP}:12080/${module}/${fun}?token=${token}`, data)
            })
          })
          api['unyw']['info'] = async () => info
          return api
        })()
      }
      return unyw
    }catch(e){
      console.log("error")
    }
    await wait(100)
  }

}