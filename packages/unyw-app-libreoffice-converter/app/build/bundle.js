var app=function(){"use strict";function n(){}function t(n){return n()}function e(){return Object.create(null)}function o(n){n.forEach(t)}function c(n){return"function"==typeof n}function r(n,t){return n!=n?t==t:n!==t||n&&"object"==typeof n||"function"==typeof n}function i(n,t,e,o){return n[1]&&o?function(n,t){for(const e in t)n[e]=t[e];return n}(e.ctx.slice(),n[1](o(t))):e.ctx}function l(n,t){n.appendChild(t)}function s(n,t,e){n.insertBefore(t,e||null)}function a(n){n.parentNode.removeChild(n)}function u(n){return document.createElement(n)}function d(){return n=" ",document.createTextNode(n);var n}function f(n,t,e,o){return n.addEventListener(t,e,o),()=>n.removeEventListener(t,e,o)}function p(n,t,e){null==e?n.removeAttribute(t):n.getAttribute(t)!==e&&n.setAttribute(t,e)}function h(n,t,e,o){n.style.setProperty(t,e,o?"important":"")}function v(n,t){for(let e=0;e<n.options.length;e+=1){const o=n.options[e];if(o.__value===t)return void(o.selected=!0)}}let m;function $(n){m=n}function y(){if(!m)throw new Error("Function called outside component initialization");return m}const b=[],g=[],w=[],k=[],_=Promise.resolve();let x=!1;function C(n){w.push(n)}let E=!1;const L=new Set;function P(){if(!E){E=!0;do{for(let n=0;n<b.length;n+=1){const t=b[n];$(t),j(t.$$)}for($(null),b.length=0;g.length;)g.pop()();for(let n=0;n<w.length;n+=1){const t=w[n];L.has(t)||(L.add(t),t())}w.length=0}while(b.length);for(;k.length;)k.pop()();x=!1,E=!1,L.clear()}}function j(n){if(null!==n.fragment){n.update(),o(n.before_update);const t=n.dirty;n.dirty=[-1],n.fragment&&n.fragment.p(n.ctx,t),n.after_update.forEach(C)}}const N=new Set;let T;function A(n,t){n&&n.i&&(N.delete(n),n.i(t))}function K(n,t,e,o){if(n&&n.o){if(N.has(n))return;N.add(n),T.c.push((()=>{N.delete(n),o&&(e&&n.d(1),o())})),n.o(t)}}function O(n,t){const e=t.token={};function c(n,c,r,i){if(t.token!==e)return;t.resolved=i;let l=t.ctx;void 0!==r&&(l=l.slice(),l[r]=i);const s=n&&(t.current=n)(l);let a=!1;t.block&&(t.blocks?t.blocks.forEach(((n,e)=>{e!==c&&n&&(T={r:0,c:[],p:T},K(n,1,1,(()=>{t.blocks[e]===n&&(t.blocks[e]=null)})),T.r||o(T.c),T=T.p)})):t.block.d(1),s.c(),A(s,1),s.m(t.mount(),t.anchor),a=!0),t.block=s,t.blocks&&(t.blocks[c]=s),a&&P()}if((r=n)&&"object"==typeof r&&"function"==typeof r.then){const e=y();if(n.then((n=>{$(e),c(t.then,1,t.value,n),$(null)}),(n=>{if($(e),c(t.catch,2,t.error,n),$(null),!t.hasCatch)throw n})),t.current!==t.pending)return c(t.pending,0),!0}else{if(t.current!==t.then)return c(t.then,1,t.value,n),!0;t.resolved=n}var r}function I(n){n&&n.c()}function V(n,e,r,i){const{fragment:l,on_mount:s,on_destroy:a,after_update:u}=n.$$;l&&l.m(e,r),i||C((()=>{const e=s.map(t).filter(c);a?a.push(...e):o(e),n.$$.on_mount=[]})),u.forEach(C)}function D(n,t){const e=n.$$;null!==e.fragment&&(o(e.on_destroy),e.fragment&&e.fragment.d(t),e.on_destroy=e.fragment=null,e.ctx=[])}function z(n,t){-1===n.$$.dirty[0]&&(b.push(n),x||(x=!0,_.then(P)),n.$$.dirty.fill(0)),n.$$.dirty[t/31|0]|=1<<t%31}function S(t,c,r,i,l,s,u,d=[-1]){const f=m;$(t);const p=t.$$={fragment:null,ctx:null,props:s,update:n,not_equal:l,bound:e(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(f?f.$$.context:c.context||[]),callbacks:e(),dirty:d,skip_bound:!1,root:c.target||f.$$.root};u&&u(p.root);let h=!1;if(p.ctx=r?r(t,c.props||{},((n,e,...o)=>{const c=o.length?o[0]:e;return p.ctx&&l(p.ctx[n],p.ctx[n]=c)&&(!p.skip_bound&&p.bound[n]&&p.bound[n](c),h&&z(t,n)),e})):[],p.update(),h=!0,o(p.before_update),p.fragment=!!i&&i(p.ctx),c.target){if(c.hydrate){const n=function(n){return Array.from(n.childNodes)}(c.target);p.fragment&&p.fragment.l(n),n.forEach(a)}else p.fragment&&p.fragment.c();c.intro&&A(t.$$.fragment),V(t,c.target,c.anchor,c.customElement),P()}$(f)}class U{$destroy(){D(this,1),this.$destroy=n}$on(n,t){const e=this.$$.callbacks[n]||(this.$$.callbacks[n]=[]);return e.push(t),()=>{const n=e.indexOf(t);-1!==n&&e.splice(n,1)}}$set(n){var t;this.$$set&&(t=n,0!==Object.keys(t).length)&&(this.$$.skip_bound=!0,this.$$set(n),this.$$.skip_bound=!1)}}function W(n){let t,e,o;const c=n[1].default,r=function(n,t,e,o){if(n){const c=i(n,t,e,o);return n[0](c)}}(c,n,n[0],null);return{c(){t=u("div"),e=u("div"),r&&r.c(),p(e,"class","container svelte-13m9sbt"),p(t,"class","unywui-topbar svelte-13m9sbt")},m(n,c){s(n,t,c),l(t,e),r&&r.m(e,null),o=!0},p(n,[t]){r&&r.p&&(!o||1&t)&&function(n,t,e,o,c,r){if(c){const l=i(t,e,o,r);n.p(l,c)}}(r,c,n,n[0],o?function(n,t,e,o){if(n[2]&&o){const c=n[2](o(e));if(void 0===t.dirty)return c;if("object"==typeof c){const n=[],e=Math.max(t.dirty.length,c.length);for(let o=0;o<e;o+=1)n[o]=t.dirty[o]|c[o];return n}return t.dirty|c}return t.dirty}(c,n[0],t,null):function(n){if(n.ctx.length>32){const t=[],e=n.ctx.length/32;for(let n=0;n<e;n++)t[n]=-1;return t}return-1}(n[0]),null)},i(n){o||(A(r,n),o=!0)},o(n){K(r,n),o=!1},d(n){n&&a(t),r&&r.d(n)}}}function q(n,t,e){let{$$slots:o={},$$scope:c}=t;return n.$$set=n=>{"$$scope"in n&&e(0,c=n.$$scope)},[c,o]}class M extends U{constructor(n){super(),S(this,n,q,W,r,{})}}const R=window.__UNYW_PRIVATE_IP||"localhost";let Y=null;const H=async(n="",t={})=>(await fetch(n,{method:"POST",mode:"cors",cache:"no-cache",credentials:"same-origin",headers:{"Content-Type":"application/json"},redirect:"follow",referrerPolicy:"no-referrer",body:JSON.stringify(t)})).json(),B=async()=>(await fetch("/UNYW_TOKEN_API.json").then((n=>n.json()))).token,F=n=>new Promise((t=>setTimeout(t,n)));var J=async()=>{for(;;){try{return null==Y&&(Y=await(async()=>{const n="localhost"!=R?"debugapi":await B(),t={},e=await H(`http://${R}:12080/unyw/info?token=${n}`);return Object.entries(e.api).forEach((([e,o])=>{t[e]={},o.forEach((o=>{t[e][o]=async t=>H(`http://${R}:12080/${e}/${o}?token=${n}`,t)}))})),t.unyw.info=async()=>e,t})()),Y}catch(n){console.log("error")}await F(100)}};function G(n){n[9]=n[12].vnc.token,n[10]=n[12].vnc.width,n[11]=n[12].vnc.height}function Q(t){let e;return{c(){e=u("p"),e.textContent="Error"},m(n,t){s(n,e,t)},p:n,d(n){n&&a(e)}}}function X(n){let t,e;return G(n),{c(){t=u("iframe"),p(t,"id","lc-layout-vncviewer"),p(t,"title","vncviewer"),p(t,"srcdoc",e=`\n    <html>\n    <${en} src='./novnc/novnc.min.js'></${en}>\n    <style> \n      body { width:${n[10]}px; height:${n[11]}px; }\n      body * { overflow: hidden !important;  background-color: ${n[0]} !important;}\n      body > canvas { background-color: transparent !important;}\n    </style>\n    <body style='overflow: hidden; padding: 0; margin:0; background-color: ${n[0]};'>\n      <${en}>\n        window.onload = function(){\n          window.vncConnection = new noVNC(\n              document.body,\n              'ws://${n[3]}:12081/websockify',\n              {repeaterID: '',  shared: true,  credentials: { password: '${n[9]}' }, }\n          )\n\n          document.body.addEventListener('keydown',  (e) =>\tvncConnection._keyboard._handleKeyDown(e)  )\n          document.body.addEventListener('keyup',    (e) => vncConnection._keyboard._handleKeyUp(e)    )\n          document.body.addEventListener('keypress', (e) => vncConnection._keyboard._handleKeyPress(e) )\n          vncConnection.scaleViewport = true\n          vncConnection.addEventListener('disconnect', () => setTimeout( () => location.reload(), 500));\n          vncConnection.addEventListener('credentialsrequired', () => vncConnection.sendCredentials({ password: '${n[9]}' }));\n        }\n      </${en}>\n    </html> `),p(t,"class","svelte-zuad0b")},m(e,o){s(e,t,o),n[6](t)},p(n,o){G(n),1&o&&e!==(e=`\n    <html>\n    <${en} src='./novnc/novnc.min.js'></${en}>\n    <style> \n      body { width:${n[10]}px; height:${n[11]}px; }\n      body * { overflow: hidden !important;  background-color: ${n[0]} !important;}\n      body > canvas { background-color: transparent !important;}\n    </style>\n    <body style='overflow: hidden; padding: 0; margin:0; background-color: ${n[0]};'>\n      <${en}>\n        window.onload = function(){\n          window.vncConnection = new noVNC(\n              document.body,\n              'ws://${n[3]}:12081/websockify',\n              {repeaterID: '',  shared: true,  credentials: { password: '${n[9]}' }, }\n          )\n\n          document.body.addEventListener('keydown',  (e) =>\tvncConnection._keyboard._handleKeyDown(e)  )\n          document.body.addEventListener('keyup',    (e) => vncConnection._keyboard._handleKeyUp(e)    )\n          document.body.addEventListener('keypress', (e) => vncConnection._keyboard._handleKeyPress(e) )\n          vncConnection.scaleViewport = true\n          vncConnection.addEventListener('disconnect', () => setTimeout( () => location.reload(), 500));\n          vncConnection.addEventListener('credentialsrequired', () => vncConnection.sendCredentials({ password: '${n[9]}' }));\n        }\n      </${en}>\n    </html> `)&&p(t,"srcdoc",e)},d(e){e&&a(t),n[6](null)}}}function Z(t){let e;return{c(){e=u("span"),h(e,"display","none")},m(n,t){s(n,e,t)},p:n,d(n){n&&a(e)}}}function nn(t){let e,o={ctx:t,current:null,token:null,hasCatch:!0,pending:Z,then:X,catch:Q,value:12,error:13};return O(t[4],o),{c(){e=u("div"),o.block.c(),p(e,"class","svelte-zuad0b")},m(n,c){s(n,e,c),o.block.m(e,o.anchor=null),o.mount=()=>e,o.anchor=null,t[7](e)},p(n,[e]){!function(n,t,e){const o=t.slice(),{resolved:c}=n;n.current===n.then&&(o[n.value]=c),n.current===n.catch&&(o[n.error]=c),n.block.p(o,e)}(o,t=n,e)},i:n,o:n,d(n){n&&a(e),o.block.d(),o.token=null,o=null,t[7](null)}}}let tn;window.sendKeyVNC=function(...n){tn.contentWindow.vncConnection.sendKey(...n)};const en="script";function on(n,t,e){let{background:o="#fff"}=t,{socket:c}=t;const r=window.__UNYW_PRIVATE_IP||"localhost";let i,l,s=J().then((n=>n.unyw.info()));const a=async()=>{if(!i)return null;const{process:n}=await J();return await n.screen({socket:c,width:i.clientWidth,height:i.clientHeight})};var u;return u=async()=>{new ResizeObserver((n=>{n.forEach((()=>a()))})).observe(i)},y().$$.on_mount.push(u),n.$$set=n=>{"background"in n&&e(0,o=n.background),"socket"in n&&e(5,c=n.socket)},n.$$.update=()=>{2&n.$$.dirty&&null!=i&&a(),4&n.$$.dirty&&null!=l&&(tn=l)},[o,i,l,r,s,c,function(n){g[n?"unshift":"push"]((()=>{l=n,e(2,l)}))},function(n){g[n?"unshift":"push"]((()=>{i=n,e(1,i)}))}]}class cn extends U{constructor(n){super(),S(this,n,on,nn,r,{background:0,socket:5})}}function rn(n){let t,e,o,c,r,i="error-apk-running"==n[0]&&ln(n);return{c(){t=u("div"),e=d(),o=u("div"),i&&i.c(),p(t,"class","dialog-mask svelte-ula5uv"),p(o,"class","dialog svelte-ula5uv")},m(l,a){s(l,t,a),s(l,e,a),s(l,o,a),i&&i.m(o,null),c||(r=f(t,"click",n[5]),c=!0)},p(n,t){"error-apk-running"==n[0]?i?i.p(n,t):(i=ln(n),i.c(),i.m(o,null)):i&&(i.d(1),i=null)},d(n){n&&a(t),n&&a(e),n&&a(o),i&&i.d(),c=!1,r()}}}function ln(t){let e,o,c,r,i,l,h;return{c(){e=u("h3"),e.textContent="Error",o=d(),c=u("p"),c.textContent="Another installation process is already running. Please wait.",r=d(),i=u("button"),i.textContent="ok",p(i,"class","ok svelte-ula5uv")},m(n,a){s(n,e,a),s(n,o,a),s(n,c,a),s(n,r,a),s(n,i,a),l||(h=f(i,"click",t[6]),l=!0)},p:n,d(n){n&&a(e),n&&a(o),n&&a(c),n&&a(r),n&&a(i),l=!1,h()}}}function sn(n){let t;return{c(){t=u("h3"),t.textContent="Libreoffice converter"},m(n,e){s(n,t,e)},d(n){n&&a(t)}}}function an(n){let t,e,c,r,i,m,$,y,b,g,w,k,_,x,E,L,P,j,N,T,O,z,S,U,W,q,R,Y=n[0]&&rn(n);return c=new M({props:{$$slots:{default:[sn]},$$scope:{ctx:n}}}),U=new cn({props:{socket:n[2]}}),{c(){Y&&Y.c(),t=d(),e=u("main"),I(c.$$.fragment),r=d(),i=u("div"),m=u("div"),$=u("button"),$.textContent="Open file",y=d(),b=u("div"),g=u("select"),w=u("option"),w.textContent="pdf",k=u("option"),k.textContent="odt",_=u("option"),_.textContent="doc",x=u("option"),x.textContent="docx",E=u("option"),E.textContent="html",L=u("option"),L.textContent="txt",P=d(),j=u("div"),N=u("button"),N.textContent="Convert",T=d(),O=u("h3"),O.innerHTML="<b><u>Logs:</u></b>",z=d(),S=u("div"),I(U.$$.fragment),p($,"class","svelte-ula5uv"),w.__value="pdf",w.value=w.__value,k.__value="odt",k.value=k.__value,_.__value="doc",_.value=_.__value,x.__value="docx",x.value=x.__value,E.__value="html",E.value=E.__value,L.__value="txt",L.value=L.__value,void 0===n[1]&&C((()=>n[8].call(g))),p(N,"class","svelte-ula5uv"),h(i,"flex","1 1 0"),h(i,"text-align","center"),h(i,"margin","40px"),h(O,"margin","4px 16px"),h(S,"height","40vh"),h(S,"box-sizing","border-box"),h(S,"margin","10px"),p(e,"class","svelte-ula5uv")},m(o,a){Y&&Y.m(o,a),s(o,t,a),s(o,e,a),V(c,e,null),l(e,r),l(e,i),l(i,m),l(m,$),l(i,y),l(i,b),l(b,g),l(g,w),l(g,k),l(g,_),l(g,x),l(g,E),l(g,L),v(g,n[1]),l(i,P),l(i,j),l(j,N),l(e,T),l(e,O),l(e,z),l(e,S),V(U,S,null),W=!0,q||(R=[f($,"click",n[7]),f(g,"change",n[8]),f(N,"click",n[9])],q=!0)},p(n,[e]){n[0]?Y?Y.p(n,e):(Y=rn(n),Y.c(),Y.m(t.parentNode,t)):Y&&(Y.d(1),Y=null);const o={};1024&e&&(o.$$scope={dirty:e,ctx:n}),c.$set(o),2&e&&v(g,n[1])},i(n){W||(A(c.$$.fragment,n),A(U.$$.fragment,n),W=!0)},o(n){K(c.$$.fragment,n),K(U.$$.fragment,n),W=!1},d(n){Y&&Y.d(n),n&&a(t),n&&a(e),D(c),D(U),q=!1,o(R)}}}function un(n,t,e){let o=!1,c="pdf";const r="libreoffice-convert-app",i=n=>`'${n.replaceAll("'","'\"'\"'")}'`,l={pdf:"application/pdf",odt:"application/vnd.oasis.opendocument.text",doc:"application/msword",docx:"application/vnd.openxmlformats-officedocument.wordprocessingml",html:"text/html",txt:"text/plain"};return[o,c,r,i,l,()=>e(0,o=!1),()=>e(0,o=!1),()=>J().then((({intent:n})=>{n.filepicker({file:"document",mimetype:"application/*",folder:"libreoffice-converter"})})),function(){c=function(n){const t=n.querySelector(":checked")||n.options[0];return t&&t.__value}(this),e(1,c)},()=>{J().then((async({process:n,intent:t})=>{await n.kill({socket:r}),console.log(`xterm -e  sh -c ${i(`echo "Converting document..."; libreoffice --headless --convert-to ${c} /storage/unyw/libreoffice-converter/document --outdir /storage/unyw/libreoffice-converter; unyw-api /intent/authenticate ${i('{"title":"ciao", "text": "ciaotx"}')}; echo ""; echo "Done!"; read`)}`),await n.screen({socket:r,command:`xterm -e  sh -c ${i(`echo "Converting document..."; libreoffice --headless --convert-to ${c} /storage/unyw/libreoffice-converter/document --outdir /storage/unyw/libreoffice-converter; unyw-api /intent/open ${i(`{"file":"document.${c}", "folder": "libreoffice-converter", "mimetype":"${l[c]}"}`)}; echo ""; echo "Done!"; read`)}`})}))}]}return new class extends U{constructor(n){super(),S(this,n,un,an,r,{})}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map
