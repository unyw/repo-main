var app=function(){"use strict";function n(){}function e(n){return n()}function t(){return Object.create(null)}function o(n){n.forEach(e)}function c(n){return"function"==typeof n}function r(n,e){return n!=n?e==e:n!==e||n&&"object"==typeof n||"function"==typeof n}function i(n){return null==n?"":n}function l(n,e){n.appendChild(e)}function s(n,e,t){n.insertBefore(e,t||null)}function u(n){n.parentNode.removeChild(n)}function a(n){return document.createElement(n)}function d(n){return document.createTextNode(n)}function f(){return d(" ")}function p(n,e,t,o){return n.addEventListener(e,t,o),()=>n.removeEventListener(e,t,o)}function h(n,e,t){null==t?n.removeAttribute(e):n.getAttribute(e)!==t&&n.setAttribute(e,t)}function m(n,e){n.value=null==e?"":e}let y;function v(n){y=n}function k(){if(!y)throw new Error("Function called outside component initialization");return y}const $=[],b=[],w=[],g=[],_=Promise.resolve();let C=!1;function x(n){w.push(n)}let E=!1;const j=new Set;function z(){if(!E){E=!0;do{for(let n=0;n<$.length;n+=1){const e=$[n];v(e),L(e.$$)}for(v(null),$.length=0;b.length;)b.pop()();for(let n=0;n<w.length;n+=1){const e=w[n];j.has(e)||(j.add(e),e())}w.length=0}while($.length);for(;g.length;)g.pop()();C=!1,E=!1,j.clear()}}function L(n){if(null!==n.fragment){n.update(),o(n.before_update);const e=n.dirty;n.dirty=[-1],n.fragment&&n.fragment.p(n.ctx,e),n.after_update.forEach(x)}}const P=new Set;let T;function A(n,e){n&&n.i&&(P.delete(n),n.i(e))}function K(n,e,t,o){if(n&&n.o){if(P.has(n))return;P.add(n),T.c.push((()=>{P.delete(n),o&&(t&&n.d(1),o())})),n.o(e)}}function N(n,e){const t=e.token={};function c(n,c,r,i){if(e.token!==t)return;e.resolved=i;let l=e.ctx;void 0!==r&&(l=l.slice(),l[r]=i);const s=n&&(e.current=n)(l);let u=!1;e.block&&(e.blocks?e.blocks.forEach(((n,t)=>{t!==c&&n&&(T={r:0,c:[],p:T},K(n,1,1,(()=>{e.blocks[t]===n&&(e.blocks[t]=null)})),T.r||o(T.c),T=T.p)})):e.block.d(1),s.c(),A(s,1),s.m(e.mount(),e.anchor),u=!0),e.block=s,e.blocks&&(e.blocks[c]=s),u&&z()}if((r=n)&&"object"==typeof r&&"function"==typeof r.then){const t=k();if(n.then((n=>{v(t),c(e.then,1,e.value,n),v(null)}),(n=>{if(v(t),c(e.catch,2,e.error,n),v(null),!e.hasCatch)throw n})),e.current!==e.pending)return c(e.pending,0),!0}else{if(e.current!==e.then)return c(e.then,1,e.value,n),!0;e.resolved=n}var r}function D(n){n&&n.c()}function O(n,t,r,i){const{fragment:l,on_mount:s,on_destroy:u,after_update:a}=n.$$;l&&l.m(t,r),i||x((()=>{const t=s.map(e).filter(c);u?u.push(...t):o(t),n.$$.on_mount=[]})),a.forEach(x)}function W(n,e){const t=n.$$;null!==t.fragment&&(o(t.on_destroy),t.fragment&&t.fragment.d(e),t.on_destroy=t.fragment=null,t.ctx=[])}function X(n,e){-1===n.$$.dirty[0]&&($.push(n),C||(C=!0,_.then(z)),n.$$.dirty.fill(0)),n.$$.dirty[e/31|0]|=1<<e%31}function I(e,c,r,i,l,s,a,d=[-1]){const f=y;v(e);const p=e.$$={fragment:null,ctx:null,props:s,update:n,not_equal:l,bound:t(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(f?f.$$.context:c.context||[]),callbacks:t(),dirty:d,skip_bound:!1,root:c.target||f.$$.root};a&&a(p.root);let h=!1;if(p.ctx=r?r(e,c.props||{},((n,t,...o)=>{const c=o.length?o[0]:t;return p.ctx&&l(p.ctx[n],p.ctx[n]=c)&&(!p.skip_bound&&p.bound[n]&&p.bound[n](c),h&&X(e,n)),t})):[],p.update(),h=!0,o(p.before_update),p.fragment=!!i&&i(p.ctx),c.target){if(c.hydrate){const n=function(n){return Array.from(n.childNodes)}(c.target);p.fragment&&p.fragment.l(n),n.forEach(u)}else p.fragment&&p.fragment.c();c.intro&&A(e.$$.fragment),O(e,c.target,c.anchor,c.customElement),z()}v(f)}class V{$destroy(){W(this,1),this.$destroy=n}$on(n,e){const t=this.$$.callbacks[n]||(this.$$.callbacks[n]=[]);return t.push(e),()=>{const n=t.indexOf(e);-1!==n&&t.splice(n,1)}}$set(n){var e;this.$$set&&(e=n,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(n),this.$$.skip_bound=!1)}}const U=window.__UNYW_PRIVATE_IP||"localhost";let R=null;const B=async(n="",e={})=>(await fetch(n,{method:"POST",mode:"cors",cache:"no-cache",credentials:"same-origin",headers:{"Content-Type":"application/json"},redirect:"follow",referrerPolicy:"no-referrer",body:JSON.stringify(e)})).json(),S=async()=>(await fetch("/UNYW_TOKEN_API.json").then((n=>n.json()))).token,q=n=>new Promise((e=>setTimeout(e,n)));var Y=async()=>{for(;;){try{return null==R&&(R=await(async()=>{const n="localhost"!=U?"debugapi":await S(),e={},t=await B(`http://${U}:12080/unyw/info?token=${n}`);return Object.entries(t.api).forEach((([t,o])=>{e[t]={},o.forEach((o=>{e[t][o]=async e=>B(`http://${U}:12080/${t}/${o}?token=${n}`,e)}))})),e.unyw.info=async()=>t,e})()),R}catch(n){console.log("error")}await q(100)}};function F(n){n[9]=n[12].vnc.token,n[10]=n[12].vnc.width,n[11]=n[12].vnc.height}function H(e){let t;return{c(){t=a("p"),t.textContent="Error"},m(n,e){s(n,t,e)},p:n,d(n){n&&u(t)}}}function J(n){let e,t;return F(n),{c(){e=a("iframe"),h(e,"id","lc-layout-vncviewer"),h(e,"title","vncviewer"),h(e,"srcdoc",t=`\n    <html>\n    <${en} src='./novnc/novnc.min.js'></${en}>\n    <style> \n      body { width:${n[10]}px; height:${n[11]}px; }\n      body * { overflow: hidden !important;  background-color: ${n[0]} !important;}\n      body > canvas { background-color: transparent !important;}\n    </style>\n    <body style='overflow: hidden; padding: 0; margin:0; background-color: ${n[0]};'>\n      <${en}>\n        window.onload = function(){\n          window.vncConnection = new noVNC(\n              document.body,\n              'ws://${n[3]}:12081/websockify',\n              {repeaterID: '',  shared: true,  credentials: { password: '${n[9]}' }, }\n          )\n\n          document.body.addEventListener('keydown',  (e) =>\tvncConnection._keyboard._handleKeyDown(e)  )\n          document.body.addEventListener('keyup',    (e) => vncConnection._keyboard._handleKeyUp(e)    )\n          document.body.addEventListener('keypress', (e) => vncConnection._keyboard._handleKeyPress(e) )\n          vncConnection.scaleViewport = true\n          vncConnection.addEventListener('disconnect', () => setTimeout( () => location.reload(), 500));\n          vncConnection.addEventListener('credentialsrequired', () => vncConnection.sendCredentials({ password: '${n[9]}' }));\n        }\n      </${en}>\n    </html> `),h(e,"class","svelte-zuad0b")},m(t,o){s(t,e,o),n[6](e)},p(n,o){F(n),1&o&&t!==(t=`\n    <html>\n    <${en} src='./novnc/novnc.min.js'></${en}>\n    <style> \n      body { width:${n[10]}px; height:${n[11]}px; }\n      body * { overflow: hidden !important;  background-color: ${n[0]} !important;}\n      body > canvas { background-color: transparent !important;}\n    </style>\n    <body style='overflow: hidden; padding: 0; margin:0; background-color: ${n[0]};'>\n      <${en}>\n        window.onload = function(){\n          window.vncConnection = new noVNC(\n              document.body,\n              'ws://${n[3]}:12081/websockify',\n              {repeaterID: '',  shared: true,  credentials: { password: '${n[9]}' }, }\n          )\n\n          document.body.addEventListener('keydown',  (e) =>\tvncConnection._keyboard._handleKeyDown(e)  )\n          document.body.addEventListener('keyup',    (e) => vncConnection._keyboard._handleKeyUp(e)    )\n          document.body.addEventListener('keypress', (e) => vncConnection._keyboard._handleKeyPress(e) )\n          vncConnection.scaleViewport = true\n          vncConnection.addEventListener('disconnect', () => setTimeout( () => location.reload(), 500));\n          vncConnection.addEventListener('credentialsrequired', () => vncConnection.sendCredentials({ password: '${n[9]}' }));\n        }\n      </${en}>\n    </html> `)&&h(e,"srcdoc",t)},d(t){t&&u(e),n[6](null)}}}function M(e){let t;return{c(){var n,e,o;t=a("span"),n="display",e="none",t.style.setProperty(n,e,o?"important":"")},m(n,e){s(n,t,e)},p:n,d(n){n&&u(t)}}}function G(e){let t,o={ctx:e,current:null,token:null,hasCatch:!0,pending:M,then:J,catch:H,value:12,error:13};return N(e[4],o),{c(){t=a("div"),o.block.c(),h(t,"class","svelte-zuad0b")},m(n,c){s(n,t,c),o.block.m(t,o.anchor=null),o.mount=()=>t,o.anchor=null,e[7](t)},p(n,[t]){!function(n,e,t){const o=e.slice(),{resolved:c}=n;n.current===n.then&&(o[n.value]=c),n.current===n.catch&&(o[n.error]=c),n.block.p(o,t)}(o,e=n,t)},i:n,o:n,d(n){n&&u(t),o.block.d(),o.token=null,o=null,e[7](null)}}}let Q;function Z(...n){Q.contentWindow.vncConnection.sendKey(...n)}window.sendKeyVNC=Z;let nn=!0;const en="script";function tn(n,e,t){let{background:o="#fff"}=e,{socket:c}=e;const r=window.__UNYW_PRIVATE_IP||"localhost";let i,l,s=Y().then((n=>n.unyw.info()));const u=async()=>{if(!i)return null;const{process:n}=await Y();return await n.screen({socket:c,width:i.clientWidth,height:i.clientHeight})};var a;return a=async()=>{new ResizeObserver((n=>{n.forEach((()=>u()))})).observe(i)},k().$$.on_mount.push(a),n.$$set=n=>{"background"in n&&t(0,o=n.background),"socket"in n&&t(5,c=n.socket)},n.$$.update=()=>{2&n.$$.dirty&&null!=i&&u(),4&n.$$.dirty&&null!=l&&(Q=l)},[o,i,l,r,s,c,function(n){b[n?"unshift":"push"]((()=>{l=n,t(2,l)}))},function(n){b[n?"unshift":"push"]((()=>{i=n,t(1,i)}))}]}class on extends V{constructor(n){super(),I(this,n,tn,G,r,{background:0,socket:5})}}function cn(e){let t,c,r,y,v,k,$,b,w,g,_,C,x,E,j,z,L,P,T,A,K,N,D,O,W;return{c(){t=a("div"),c=a("div"),r=a("p"),r.textContent="TAB",y=f(),v=a("p"),k=d("CTRL"),b=f(),w=a("p"),g=d("ALT"),C=f(),x=a("i"),E=f(),j=a("i"),z=f(),L=a("i"),P=f(),T=a("i"),A=f(),K=a("i"),N=f(),D=a("input"),h(r,"class","svelte-1p86im5"),h(v,"class",$=i(e[10]?"active":"")+" svelte-1p86im5"),h(w,"class",_=i(e[11]?"active":"")+" svelte-1p86im5"),h(x,"class","zmdi zmdi-long-arrow-left svelte-1p86im5"),h(j,"class","zmdi zmdi-long-arrow-up svelte-1p86im5"),h(L,"class","zmdi zmdi-long-arrow-down svelte-1p86im5"),h(T,"class","zmdi zmdi-long-arrow-right svelte-1p86im5"),h(K,"class","zmdi zmdi-keyboard svelte-1p86im5"),h(c,"class","container svelte-1p86im5"),h(D,"type","text"),h(D,"ref","keyboard"),h(D,"autocorrect","off"),h(D,"autocapitalize","none"),h(D,"autocomplete","off"),h(D,"spellcheck","false"),h(D,"class","svelte-1p86im5"),h(t,"class","unywui-bottombar svelte-1p86im5")},m(n,o){s(n,t,o),l(t,c),l(c,r),e[15](r),l(c,y),l(c,v),l(v,k),e[16](v),l(c,b),l(c,w),l(w,g),e[17](w),l(c,C),l(c,x),e[18](x),l(c,E),l(c,j),e[19](j),l(c,z),l(c,L),e[20](L),l(c,P),l(c,T),e[21](T),l(c,A),l(c,K),e[22](K),l(t,N),l(t,D),m(D,e[0]),e[24](D),O||(W=[p(D,"input",e[23]),p(D,"blur",e[14]),p(D,"click",e[12]),p(D,"input",e[25]),p(D,"keyup",e[26]),p(D,"keydown",e[27]),p(D,"keypress",e[28])],O=!0)},p(n,[e]){1024&e&&$!==($=i(n[10]?"active":"")+" svelte-1p86im5")&&h(v,"class",$),2048&e&&_!==(_=i(n[11]?"active":"")+" svelte-1p86im5")&&h(w,"class",_),1&e&&D.value!==n[0]&&m(D,n[0])},i:n,o:n,d(n){n&&u(t),e[15](null),e[16](null),e[17](null),e[18](null),e[19](null),e[20](null),e[21](null),e[22](null),e[24](null),O=!1,o(W)}}}function rn(n,e,t){let o,c,r,i,l,s,u,a,d,f="",p=!1,h=!1,m=!1;const y=(n,e)=>{const t=e.getBoundingClientRect();return n>t.left&&n<t.right},v=(n,e)=>{e.preventDefault(),function(n,e){const t={keydown:n=>Q.contentWindow.vncConnection._keyboard._handleKeyDown(n),keyup:n=>Q.contentWindow.vncConnection._keyboard._handleKeyUp(n),keypress:n=>Q.contentWindow.vncConnection._keyboard._handleKeyPress(n),input:n=>{if("deleteContentBackward"===n.inputType)return Z(65288,null),void n.preventDefault();Z(n.data.charCodeAt(0),n.data.charCodeAt(0))}};"keydown"===n&&229===e.keyCode&&(nn=!0),"input"==n&&(nn=!1),"keyup"===n&&229===e.keyCode&&nn?Z(65288,null):t[n](e)}(n,e)};return[f,o,c,r,i,l,s,u,a,d,p,h,n=>{if(n.preventDefault(),y(n.clientX,o)&&Z(65289,null),y(n.clientX,c)&&(t(10,p=!p),Z(65507,null,p)),y(n.clientX,r)&&(t(11,h=!h),Z(65513,null,h)),y(n.clientX,i)&&Z(65361,null),y(n.clientX,l)&&Z(65362,null),y(n.clientX,s)&&Z(65364,null),y(n.clientX,u)&&Z(65363,null),y(n.clientX,a)&&m)return d.blur(),void(m=!1);m||(m=!0)},v,()=>m=!1,function(n){b[n?"unshift":"push"]((()=>{o=n,t(1,o)}))},function(n){b[n?"unshift":"push"]((()=>{c=n,t(2,c)}))},function(n){b[n?"unshift":"push"]((()=>{r=n,t(3,r)}))},function(n){b[n?"unshift":"push"]((()=>{i=n,t(4,i)}))},function(n){b[n?"unshift":"push"]((()=>{l=n,t(5,l)}))},function(n){b[n?"unshift":"push"]((()=>{s=n,t(6,s)}))},function(n){b[n?"unshift":"push"]((()=>{u=n,t(7,u)}))},function(n){b[n?"unshift":"push"]((()=>{a=n,t(8,a)}))},function(){f=this.value,t(0,f)},function(n){b[n?"unshift":"push"]((()=>{d=n,t(9,d)}))},n=>v("input",n),n=>v("keyup",n),n=>v("keydown",n),n=>v("keypress",n)]}class ln extends V{constructor(n){super(),I(this,n,rn,cn,r,{})}}function sn(n){let e,t,o,c,r,i="error-apk-running"==n[0]&&un(n);return{c(){e=a("div"),t=f(),o=a("div"),i&&i.c(),h(e,"class","dialog-mask svelte-l0jic5"),h(o,"class","dialog svelte-l0jic5")},m(l,u){s(l,e,u),s(l,t,u),s(l,o,u),i&&i.m(o,null),c||(r=p(e,"click",n[2]),c=!0)},p(n,e){"error-apk-running"==n[0]?i?i.p(n,e):(i=un(n),i.c(),i.m(o,null)):i&&(i.d(1),i=null)},d(n){n&&u(e),n&&u(t),n&&u(o),i&&i.d(),c=!1,r()}}}function un(e){let t,o,c,r,i,l,d;return{c(){t=a("h3"),t.textContent="Error",o=f(),c=a("p"),c.textContent="Another installation process is already running. Please wait.",r=f(),i=a("button"),i.textContent="ok",h(i,"class","ok svelte-l0jic5")},m(n,u){s(n,t,u),s(n,o,u),s(n,c,u),s(n,r,u),s(n,i,u),l||(d=p(i,"click",e[3]),l=!0)},p:n,d(n){n&&u(t),n&&u(o),n&&u(c),n&&u(r),n&&u(i),l=!1,d()}}}function an(n){let e,t,o,c,r,i,d=n[0]&&sn(n);return o=new on({props:{socket:n[1]}}),r=new ln({}),{c(){d&&d.c(),e=f(),t=a("main"),D(o.$$.fragment),c=f(),D(r.$$.fragment),h(t,"class","svelte-l0jic5")},m(n,u){d&&d.m(n,u),s(n,e,u),s(n,t,u),O(o,t,null),l(t,c),O(r,t,null),i=!0},p(n,[t]){n[0]?d?d.p(n,t):(d=sn(n),d.c(),d.m(e.parentNode,e)):d&&(d.d(1),d=null)},i(n){i||(A(o.$$.fragment,n),A(r.$$.fragment,n),i=!0)},o(n){K(o.$$.fragment,n),K(r.$$.fragment,n),i=!1},d(n){d&&d.d(n),n&&u(e),n&&u(t),W(o),W(r)}}}function dn(n,e,t){let o=!1;const c="chromium-app";return Y().then((({process:n})=>n.screen({socket:c,command:"chromium-browser --no-sandbox"}))),[o,c,()=>t(0,o=!1),()=>t(0,o=!1)]}return new class extends V{constructor(n){super(),I(this,n,dn,an,r,{})}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map
