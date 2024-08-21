import{a as B,b as ge,c as ve,d as p,f as we,j as Ee,l as z,m as Te}from"./chunk-LGGSSZIN.js";import{Aa as U,Ba as ae,C as se,Ca as D,Ea as _,Fa as w,Ga as E,Ha as ce,Ia as le,Ja as de,Ka as ue,La as he,Ma as fe,Na as pe,Oa as g,Pa as A,V as v,Vb as me,Wa as ye,X as h,Za as P,_ as j,a as k,aa as d,b as te,ea as M,ka as oe,n as ne,r as b,va as F,z as re,za as ie}from"./chunk-7OQVD62M.js";var $=class{};var T=class t{constructor(e){this.normalizedNames=new Map,this.lazyUpdate=null,e?typeof e=="string"?this.lazyInit=()=>{this.headers=new Map,e.split(`
`).forEach(s=>{let n=s.indexOf(":");if(n>0){let r=s.slice(0,n),o=r.toLowerCase(),i=s.slice(n+1).trim();this.maybeSetNormalizedName(r,o),this.headers.has(o)?this.headers.get(o).push(i):this.headers.set(o,[i])}})}:typeof Headers<"u"&&e instanceof Headers?(this.headers=new Map,e.forEach((s,n)=>{this.setHeaderEntries(n,s)})):this.lazyInit=()=>{this.headers=new Map,Object.entries(e).forEach(([s,n])=>{this.setHeaderEntries(s,n)})}:this.headers=new Map}has(e){return this.init(),this.headers.has(e.toLowerCase())}get(e){this.init();let s=this.headers.get(e.toLowerCase());return s&&s.length>0?s[0]:null}keys(){return this.init(),Array.from(this.normalizedNames.values())}getAll(e){return this.init(),this.headers.get(e.toLowerCase())||null}append(e,s){return this.clone({name:e,value:s,op:"a"})}set(e,s){return this.clone({name:e,value:s,op:"s"})}delete(e,s){return this.clone({name:e,value:s,op:"d"})}maybeSetNormalizedName(e,s){this.normalizedNames.has(s)||this.normalizedNames.set(s,e)}init(){this.lazyInit&&(this.lazyInit instanceof t?this.copyFrom(this.lazyInit):this.lazyInit(),this.lazyInit=null,this.lazyUpdate&&(this.lazyUpdate.forEach(e=>this.applyUpdate(e)),this.lazyUpdate=null))}copyFrom(e){e.init(),Array.from(e.headers.keys()).forEach(s=>{this.headers.set(s,e.headers.get(s)),this.normalizedNames.set(s,e.normalizedNames.get(s))})}clone(e){let s=new t;return s.lazyInit=this.lazyInit&&this.lazyInit instanceof t?this.lazyInit:this,s.lazyUpdate=(this.lazyUpdate||[]).concat([e]),s}applyUpdate(e){let s=e.name.toLowerCase();switch(e.op){case"a":case"s":let n=e.value;if(typeof n=="string"&&(n=[n]),n.length===0)return;this.maybeSetNormalizedName(e.name,s);let r=(e.op==="a"?this.headers.get(s):void 0)||[];r.push(...n),this.headers.set(s,r);break;case"d":let o=e.value;if(!o)this.headers.delete(s),this.normalizedNames.delete(s);else{let i=this.headers.get(s);if(!i)return;i=i.filter(a=>o.indexOf(a)===-1),i.length===0?(this.headers.delete(s),this.normalizedNames.delete(s)):this.headers.set(s,i)}break}}setHeaderEntries(e,s){let n=(Array.isArray(s)?s:[s]).map(o=>o.toString()),r=e.toLowerCase();this.headers.set(r,n),this.maybeSetNormalizedName(e,r)}forEach(e){this.init(),Array.from(this.normalizedNames.keys()).forEach(s=>e(this.normalizedNames.get(s),this.headers.get(s)))}};var K=class{encodeKey(e){return Re(e)}encodeValue(e){return Re(e)}decodeKey(e){return decodeURIComponent(e)}decodeValue(e){return decodeURIComponent(e)}};function Ue(t,e){let s=new Map;return t.length>0&&t.replace(/^\?/,"").split("&").forEach(r=>{let o=r.indexOf("="),[i,a]=o==-1?[e.decodeKey(r),""]:[e.decodeKey(r.slice(0,o)),e.decodeValue(r.slice(o+1))],l=s.get(i)||[];l.push(a),s.set(i,l)}),s}var _e=/%(\d[a-f0-9])/gi,Be={40:"@","3A":":",24:"$","2C":",","3B":";","3D":"=","3F":"?","2F":"/"};function Re(t){return encodeURIComponent(t).replace(_e,(e,s)=>Be[s]??e)}function L(t){return`${t}`}var y=class t{constructor(e={}){if(this.updates=null,this.cloneFrom=null,this.encoder=e.encoder||new K,e.fromString){if(e.fromObject)throw new Error("Cannot specify both fromString and fromObject.");this.map=Ue(e.fromString,this.encoder)}else e.fromObject?(this.map=new Map,Object.keys(e.fromObject).forEach(s=>{let n=e.fromObject[s],r=Array.isArray(n)?n.map(L):[L(n)];this.map.set(s,r)})):this.map=null}has(e){return this.init(),this.map.has(e)}get(e){this.init();let s=this.map.get(e);return s?s[0]:null}getAll(e){return this.init(),this.map.get(e)||null}keys(){return this.init(),Array.from(this.map.keys())}append(e,s){return this.clone({param:e,value:s,op:"a"})}appendAll(e){let s=[];return Object.keys(e).forEach(n=>{let r=e[n];Array.isArray(r)?r.forEach(o=>{s.push({param:n,value:o,op:"a"})}):s.push({param:n,value:r,op:"a"})}),this.clone(s)}set(e,s){return this.clone({param:e,value:s,op:"s"})}delete(e,s){return this.clone({param:e,value:s,op:"d"})}toString(){return this.init(),this.keys().map(e=>{let s=this.encoder.encodeKey(e);return this.map.get(e).map(n=>s+"="+this.encoder.encodeValue(n)).join("&")}).filter(e=>e!=="").join("&")}clone(e){let s=new t({encoder:this.encoder});return s.cloneFrom=this.cloneFrom||this,s.updates=(this.updates||[]).concat(e),s}init(){this.map===null&&(this.map=new Map),this.cloneFrom!==null&&(this.cloneFrom.init(),this.cloneFrom.keys().forEach(e=>this.map.set(e,this.cloneFrom.map.get(e))),this.updates.forEach(e=>{switch(e.op){case"a":case"s":let s=(e.op==="a"?this.map.get(e.param):void 0)||[];s.push(L(e.value)),this.map.set(e.param,s);break;case"d":if(e.value!==void 0){let n=this.map.get(e.param)||[],r=n.indexOf(L(e.value));r!==-1&&n.splice(r,1),n.length>0?this.map.set(e.param,n):this.map.delete(e.param)}else{this.map.delete(e.param);break}}}),this.cloneFrom=this.updates=null)}};var X=class{constructor(){this.map=new Map}set(e,s){return this.map.set(e,s),this}get(e){return this.map.has(e)||this.map.set(e,e.defaultValue()),this.map.get(e)}delete(e){return this.map.delete(e),this}has(e){return this.map.has(e)}keys(){return this.map.keys()}};function ze(t){switch(t){case"DELETE":case"GET":case"HEAD":case"OPTIONS":case"JSONP":return!1;default:return!0}}function be(t){return typeof ArrayBuffer<"u"&&t instanceof ArrayBuffer}function Me(t){return typeof Blob<"u"&&t instanceof Blob}function De(t){return typeof FormData<"u"&&t instanceof FormData}function Ve(t){return typeof URLSearchParams<"u"&&t instanceof URLSearchParams}var N=class t{constructor(e,s,n,r){this.url=s,this.body=null,this.reportProgress=!1,this.withCredentials=!1,this.responseType="json",this.method=e.toUpperCase();let o;if(ze(this.method)||r?(this.body=n!==void 0?n:null,o=r):o=n,o&&(this.reportProgress=!!o.reportProgress,this.withCredentials=!!o.withCredentials,o.responseType&&(this.responseType=o.responseType),o.headers&&(this.headers=o.headers),o.context&&(this.context=o.context),o.params&&(this.params=o.params),this.transferCache=o.transferCache),this.headers??=new T,this.context??=new X,!this.params)this.params=new y,this.urlWithParams=s;else{let i=this.params.toString();if(i.length===0)this.urlWithParams=s;else{let a=s.indexOf("?"),l=a===-1?"?":a<s.length-1?"&":"";this.urlWithParams=s+l+i}}}serializeBody(){return this.body===null?null:typeof this.body=="string"||be(this.body)||Me(this.body)||De(this.body)||Ve(this.body)?this.body:this.body instanceof y?this.body.toString():typeof this.body=="object"||typeof this.body=="boolean"||Array.isArray(this.body)?JSON.stringify(this.body):this.body.toString()}detectContentTypeHeader(){return this.body===null||De(this.body)?null:Me(this.body)?this.body.type||null:be(this.body)?null:typeof this.body=="string"?"text/plain":this.body instanceof y?"application/x-www-form-urlencoded;charset=UTF-8":typeof this.body=="object"||typeof this.body=="number"||typeof this.body=="boolean"?"application/json":null}clone(e={}){let s=e.method||this.method,n=e.url||this.url,r=e.responseType||this.responseType,o=e.transferCache??this.transferCache,i=e.body!==void 0?e.body:this.body,a=e.withCredentials??this.withCredentials,l=e.reportProgress??this.reportProgress,c=e.headers||this.headers,u=e.params||this.params,f=e.context??this.context;return e.setHeaders!==void 0&&(c=Object.keys(e.setHeaders).reduce((m,R)=>m.set(R,e.setHeaders[R]),c)),e.setParams&&(u=Object.keys(e.setParams).reduce((m,R)=>m.set(R,e.setParams[R]),u)),new t(s,n,i,{params:u,headers:c,context:f,reportProgress:l,responseType:r,withCredentials:a,transferCache:o})}},Ae=function(t){return t[t.Sent=0]="Sent",t[t.UploadProgress=1]="UploadProgress",t[t.ResponseHeader=2]="ResponseHeader",t[t.DownloadProgress=3]="DownloadProgress",t[t.Response=4]="Response",t[t.User=5]="User",t}(Ae||{}),J=class{constructor(e,s=Pe.Ok,n="OK"){this.headers=e.headers||new T,this.status=e.status!==void 0?e.status:s,this.statusText=e.statusText||n,this.url=e.url||null,this.ok=this.status>=200&&this.status<300}};var G=class t extends J{constructor(e={}){super(e),this.type=Ae.Response,this.body=e.body!==void 0?e.body:null}clone(e={}){return new t({body:e.body!==void 0?e.body:this.body,headers:e.headers||this.headers,status:e.status!==void 0?e.status:this.status,statusText:e.statusText||this.statusText,url:e.url||this.url||void 0})}};var Pe=function(t){return t[t.Continue=100]="Continue",t[t.SwitchingProtocols=101]="SwitchingProtocols",t[t.Processing=102]="Processing",t[t.EarlyHints=103]="EarlyHints",t[t.Ok=200]="Ok",t[t.Created=201]="Created",t[t.Accepted=202]="Accepted",t[t.NonAuthoritativeInformation=203]="NonAuthoritativeInformation",t[t.NoContent=204]="NoContent",t[t.ResetContent=205]="ResetContent",t[t.PartialContent=206]="PartialContent",t[t.MultiStatus=207]="MultiStatus",t[t.AlreadyReported=208]="AlreadyReported",t[t.ImUsed=226]="ImUsed",t[t.MultipleChoices=300]="MultipleChoices",t[t.MovedPermanently=301]="MovedPermanently",t[t.Found=302]="Found",t[t.SeeOther=303]="SeeOther",t[t.NotModified=304]="NotModified",t[t.UseProxy=305]="UseProxy",t[t.Unused=306]="Unused",t[t.TemporaryRedirect=307]="TemporaryRedirect",t[t.PermanentRedirect=308]="PermanentRedirect",t[t.BadRequest=400]="BadRequest",t[t.Unauthorized=401]="Unauthorized",t[t.PaymentRequired=402]="PaymentRequired",t[t.Forbidden=403]="Forbidden",t[t.NotFound=404]="NotFound",t[t.MethodNotAllowed=405]="MethodNotAllowed",t[t.NotAcceptable=406]="NotAcceptable",t[t.ProxyAuthenticationRequired=407]="ProxyAuthenticationRequired",t[t.RequestTimeout=408]="RequestTimeout",t[t.Conflict=409]="Conflict",t[t.Gone=410]="Gone",t[t.LengthRequired=411]="LengthRequired",t[t.PreconditionFailed=412]="PreconditionFailed",t[t.PayloadTooLarge=413]="PayloadTooLarge",t[t.UriTooLong=414]="UriTooLong",t[t.UnsupportedMediaType=415]="UnsupportedMediaType",t[t.RangeNotSatisfiable=416]="RangeNotSatisfiable",t[t.ExpectationFailed=417]="ExpectationFailed",t[t.ImATeapot=418]="ImATeapot",t[t.MisdirectedRequest=421]="MisdirectedRequest",t[t.UnprocessableEntity=422]="UnprocessableEntity",t[t.Locked=423]="Locked",t[t.FailedDependency=424]="FailedDependency",t[t.TooEarly=425]="TooEarly",t[t.UpgradeRequired=426]="UpgradeRequired",t[t.PreconditionRequired=428]="PreconditionRequired",t[t.TooManyRequests=429]="TooManyRequests",t[t.RequestHeaderFieldsTooLarge=431]="RequestHeaderFieldsTooLarge",t[t.UnavailableForLegalReasons=451]="UnavailableForLegalReasons",t[t.InternalServerError=500]="InternalServerError",t[t.NotImplemented=501]="NotImplemented",t[t.BadGateway=502]="BadGateway",t[t.ServiceUnavailable=503]="ServiceUnavailable",t[t.GatewayTimeout=504]="GatewayTimeout",t[t.HttpVersionNotSupported=505]="HttpVersionNotSupported",t[t.VariantAlsoNegotiates=506]="VariantAlsoNegotiates",t[t.InsufficientStorage=507]="InsufficientStorage",t[t.LoopDetected=508]="LoopDetected",t[t.NotExtended=510]="NotExtended",t[t.NetworkAuthenticationRequired=511]="NetworkAuthenticationRequired",t}(Pe||{});function V(t,e){return{body:e,headers:t.headers,context:t.context,observe:t.observe,params:t.params,reportProgress:t.reportProgress,responseType:t.responseType,withCredentials:t.withCredentials,transferCache:t.transferCache}}var Tt=(()=>{let e=class e{constructor(n){this.handler=n}request(n,r,o={}){let i;if(n instanceof N)i=n;else{let c;o.headers instanceof T?c=o.headers:c=new T(o.headers);let u;o.params&&(o.params instanceof y?u=o.params:u=new y({fromObject:o.params})),i=new N(n,r,o.body!==void 0?o.body:null,{headers:c,context:o.context,params:u,reportProgress:o.reportProgress,responseType:o.responseType||"json",withCredentials:o.withCredentials,transferCache:o.transferCache})}let a=ne(i).pipe(se(c=>this.handler.handle(c)));if(n instanceof N||o.observe==="events")return a;let l=a.pipe(re(c=>c instanceof G));switch(o.observe||"body"){case"body":switch(i.responseType){case"arraybuffer":return l.pipe(b(c=>{if(c.body!==null&&!(c.body instanceof ArrayBuffer))throw new Error("Response is not an ArrayBuffer.");return c.body}));case"blob":return l.pipe(b(c=>{if(c.body!==null&&!(c.body instanceof Blob))throw new Error("Response is not a Blob.");return c.body}));case"text":return l.pipe(b(c=>{if(c.body!==null&&typeof c.body!="string")throw new Error("Response is not a string.");return c.body}));case"json":default:return l.pipe(b(c=>c.body))}case"response":return l;default:throw new Error(`Unreachable: unhandled observe type ${o.observe}}`)}}delete(n,r={}){return this.request("DELETE",n,r)}get(n,r={}){return this.request("GET",n,r)}head(n,r={}){return this.request("HEAD",n,r)}jsonp(n,r){return this.request("JSONP",n,{params:new y().append(r,"JSONP_CALLBACK"),observe:"body",responseType:"json"})}options(n,r={}){return this.request("OPTIONS",n,r)}patch(n,r,o={}){return this.request("PATCH",n,V(o,r))}post(n,r,o={}){return this.request("POST",n,V(o,r))}put(n,r,o={}){return this.request("PUT",n,V(o,r))}};e.\u0275fac=function(r){return new(r||e)(d($))},e.\u0275prov=h({token:e,factory:e.\u0275fac});let t=e;return t})();var Z=class extends ve{constructor(){super(...arguments),this.supportsDOMEvents=!0}},Y=class t extends Z{static makeCurrent(){ge(new t)}onAndCancel(e,s,n){return e.addEventListener(s,n),()=>{e.removeEventListener(s,n)}}dispatchEvent(e,s){e.dispatchEvent(s)}remove(e){e.parentNode&&e.parentNode.removeChild(e)}createElement(e,s){return s=s||this.getDefaultDocument(),s.createElement(e)}createHtmlDocument(){return document.implementation.createHTMLDocument("fakeTitle")}getDefaultDocument(){return document}isElementNode(e){return e.nodeType===Node.ELEMENT_NODE}isShadowRoot(e){return e instanceof DocumentFragment}getGlobalEventTarget(e,s){return s==="window"?window:s==="document"?e:s==="body"?e.body:null}getBaseHref(e){let s=Ke();return s==null?null:Xe(s)}resetBaseElement(){O=null}getUserAgent(){return window.navigator.userAgent}getCookie(e){return we(document.cookie,e)}},O=null;function Ke(){return O=O||document.querySelector("base"),O?O.getAttribute("href"):null}function Xe(t){return new URL(t,document.baseURI).pathname}var Je=(()=>{let e=class e{build(){return new XMLHttpRequest}};e.\u0275fac=function(r){return new(r||e)},e.\u0275prov=h({token:e,factory:e.\u0275fac});let t=e;return t})(),Q=new j(""),Se=(()=>{let e=class e{constructor(n,r){this._zone=r,this._eventNameToPlugin=new Map,n.forEach(o=>{o.manager=this}),this._plugins=n.slice().reverse()}addEventListener(n,r,o){return this._findPluginFor(r).addEventListener(n,r,o)}getZone(){return this._zone}_findPluginFor(n){let r=this._eventNameToPlugin.get(n);if(r)return r;if(r=this._plugins.find(i=>i.supports(n)),!r)throw new v(5101,!1);return this._eventNameToPlugin.set(n,r),r}};e.\u0275fac=function(r){return new(r||e)(d(Q),d(P))},e.\u0275prov=h({token:e,factory:e.\u0275fac});let t=e;return t})(),x=class{constructor(e){this._doc=e}},q="ng-app-id",ke=(()=>{let e=class e{constructor(n,r,o,i={}){this.doc=n,this.appId=r,this.nonce=o,this.platformId=i,this.styleRef=new Map,this.hostNodes=new Set,this.styleNodesInDOM=this.collectServerRenderedStyles(),this.platformIsServer=z(i),this.resetHostNodes()}addStyles(n){for(let r of n)this.changeUsageCount(r,1)===1&&this.onStyleAdded(r)}removeStyles(n){for(let r of n)this.changeUsageCount(r,-1)<=0&&this.onStyleRemoved(r)}ngOnDestroy(){let n=this.styleNodesInDOM;n&&(n.forEach(r=>r.remove()),n.clear());for(let r of this.getAllStyles())this.onStyleRemoved(r);this.resetHostNodes()}addHost(n){this.hostNodes.add(n);for(let r of this.getAllStyles())this.addStyleToHost(n,r)}removeHost(n){this.hostNodes.delete(n)}getAllStyles(){return this.styleRef.keys()}onStyleAdded(n){for(let r of this.hostNodes)this.addStyleToHost(r,n)}onStyleRemoved(n){let r=this.styleRef;r.get(n)?.elements?.forEach(o=>o.remove()),r.delete(n)}collectServerRenderedStyles(){let n=this.doc.head?.querySelectorAll(`style[${q}="${this.appId}"]`);if(n?.length){let r=new Map;return n.forEach(o=>{o.textContent!=null&&r.set(o.textContent,o)}),r}return null}changeUsageCount(n,r){let o=this.styleRef;if(o.has(n)){let i=o.get(n);return i.usage+=r,i.usage}return o.set(n,{usage:r,elements:[]}),r}getStyleElement(n,r){let o=this.styleNodesInDOM,i=o?.get(r);if(i?.parentNode===n)return o.delete(r),i.removeAttribute(q),i;{let a=this.doc.createElement("style");return this.nonce&&a.setAttribute("nonce",this.nonce),a.textContent=r,this.platformIsServer&&a.setAttribute(q,this.appId),n.appendChild(a),a}}addStyleToHost(n,r){let o=this.getStyleElement(n,r),i=this.styleRef,a=i.get(r)?.elements;a?a.push(o):i.set(r,{elements:[o],usage:1})}resetHostNodes(){let n=this.hostNodes;n.clear(),n.add(this.doc.head)}};e.\u0275fac=function(r){return new(r||e)(d(p),d(U),d(_,8),d(D))},e.\u0275prov=h({token:e,factory:e.\u0275fac});let t=e;return t})(),W={svg:"http://www.w3.org/2000/svg",xhtml:"http://www.w3.org/1999/xhtml",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/",math:"http://www.w3.org/1998/MathML/"},ee=/%COMP%/g,Le="%COMP%",Ge=`_nghost-${Le}`,qe=`_ngcontent-${Le}`,We=!0,Ze=new j("",{providedIn:"root",factory:()=>We});function Ye(t){return qe.replace(ee,t)}function Qe(t){return Ge.replace(ee,t)}function xe(t,e){return e.map(s=>s.replace(ee,t))}var Ne=(()=>{let e=class e{constructor(n,r,o,i,a,l,c,u=null){this.eventManager=n,this.sharedStylesHost=r,this.appId=o,this.removeStylesOnCompDestroy=i,this.doc=a,this.platformId=l,this.ngZone=c,this.nonce=u,this.rendererByCompId=new Map,this.platformIsServer=z(l),this.defaultRenderer=new I(n,a,c,this.platformIsServer)}createRenderer(n,r){if(!n||!r)return this.defaultRenderer;this.platformIsServer&&r.encapsulation===M.ShadowDom&&(r=te(k({},r),{encapsulation:M.Emulated}));let o=this.getOrCreateRenderer(n,r);return o instanceof C?o.applyToHost(n):o instanceof S&&o.applyStyles(),o}getOrCreateRenderer(n,r){let o=this.rendererByCompId,i=o.get(r.id);if(!i){let a=this.doc,l=this.ngZone,c=this.eventManager,u=this.sharedStylesHost,f=this.removeStylesOnCompDestroy,m=this.platformIsServer;switch(r.encapsulation){case M.Emulated:i=new C(c,u,r,this.appId,f,a,l,m);break;case M.ShadowDom:return new H(c,u,n,r,a,l,this.nonce,m);default:i=new S(c,u,r,f,a,l,m);break}o.set(r.id,i)}return i}ngOnDestroy(){this.rendererByCompId.clear()}};e.\u0275fac=function(r){return new(r||e)(d(Se),d(ke),d(U),d(Ze),d(p),d(D),d(P),d(_))},e.\u0275prov=h({token:e,factory:e.\u0275fac});let t=e;return t})(),I=class{constructor(e,s,n,r){this.eventManager=e,this.doc=s,this.ngZone=n,this.platformIsServer=r,this.data=Object.create(null),this.throwOnSyntheticProps=!0,this.destroyNode=null}destroy(){}createElement(e,s){return s?this.doc.createElementNS(W[s]||s,e):this.doc.createElement(e)}createComment(e){return this.doc.createComment(e)}createText(e){return this.doc.createTextNode(e)}appendChild(e,s){(Oe(e)?e.content:e).appendChild(s)}insertBefore(e,s,n){e&&(Oe(e)?e.content:e).insertBefore(s,n)}removeChild(e,s){e&&e.removeChild(s)}selectRootElement(e,s){let n=typeof e=="string"?this.doc.querySelector(e):e;if(!n)throw new v(-5104,!1);return s||(n.textContent=""),n}parentNode(e){return e.parentNode}nextSibling(e){return e.nextSibling}setAttribute(e,s,n,r){if(r){s=r+":"+s;let o=W[r];o?e.setAttributeNS(o,s,n):e.setAttribute(s,n)}else e.setAttribute(s,n)}removeAttribute(e,s,n){if(n){let r=W[n];r?e.removeAttributeNS(r,s):e.removeAttribute(`${n}:${s}`)}else e.removeAttribute(s)}addClass(e,s){e.classList.add(s)}removeClass(e,s){e.classList.remove(s)}setStyle(e,s,n,r){r&(A.DashCase|A.Important)?e.style.setProperty(s,n,r&A.Important?"important":""):e.style[s]=n}removeStyle(e,s,n){n&A.DashCase?e.style.removeProperty(s):e.style[s]=""}setProperty(e,s,n){e!=null&&(e[s]=n)}setValue(e,s){e.nodeValue=s}listen(e,s,n){if(typeof e=="string"&&(e=B().getGlobalEventTarget(this.doc,e),!e))throw new Error(`Unsupported event target ${e} for event ${s}`);return this.eventManager.addEventListener(e,s,this.decoratePreventDefault(n))}decoratePreventDefault(e){return s=>{if(s==="__ngUnwrap__")return e;(this.platformIsServer?this.ngZone.runGuarded(()=>e(s)):e(s))===!1&&s.preventDefault()}}};function Oe(t){return t.tagName==="TEMPLATE"&&t.content!==void 0}var H=class extends I{constructor(e,s,n,r,o,i,a,l){super(e,o,i,l),this.sharedStylesHost=s,this.hostEl=n,this.shadowRoot=n.attachShadow({mode:"open"}),this.sharedStylesHost.addHost(this.shadowRoot);let c=xe(r.id,r.styles);for(let u of c){let f=document.createElement("style");a&&f.setAttribute("nonce",a),f.textContent=u,this.shadowRoot.appendChild(f)}}nodeOrShadowRoot(e){return e===this.hostEl?this.shadowRoot:e}appendChild(e,s){return super.appendChild(this.nodeOrShadowRoot(e),s)}insertBefore(e,s,n){return super.insertBefore(this.nodeOrShadowRoot(e),s,n)}removeChild(e,s){return super.removeChild(this.nodeOrShadowRoot(e),s)}parentNode(e){return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(e)))}destroy(){this.sharedStylesHost.removeHost(this.shadowRoot)}},S=class extends I{constructor(e,s,n,r,o,i,a,l){super(e,o,i,a),this.sharedStylesHost=s,this.removeStylesOnCompDestroy=r,this.styles=l?xe(l,n.styles):n.styles}applyStyles(){this.sharedStylesHost.addStyles(this.styles)}destroy(){this.removeStylesOnCompDestroy&&this.sharedStylesHost.removeStyles(this.styles)}},C=class extends S{constructor(e,s,n,r,o,i,a,l){let c=r+"-"+n.id;super(e,s,n,o,i,a,l,c),this.contentAttr=Ye(c),this.hostAttr=Qe(c)}applyToHost(e){this.applyStyles(),this.setAttribute(e,this.hostAttr,"")}createElement(e,s){let n=super.createElement(e,s);return super.setAttribute(n,this.contentAttr,""),n}},He=(()=>{let e=class e extends x{constructor(n){super(n)}supports(n){return!0}addEventListener(n,r,o){return n.addEventListener(r,o,!1),()=>this.removeEventListener(n,r,o)}removeEventListener(n,r,o){return n.removeEventListener(r,o)}};e.\u0275fac=function(r){return new(r||e)(d(p))},e.\u0275prov=h({token:e,factory:e.\u0275fac});let t=e;return t})(),Ie=["alt","control","meta","shift"],et={"\b":"Backspace","	":"Tab","\x7F":"Delete","\x1B":"Escape",Del:"Delete",Esc:"Escape",Left:"ArrowLeft",Right:"ArrowRight",Up:"ArrowUp",Down:"ArrowDown",Menu:"ContextMenu",Scroll:"ScrollLock",Win:"OS"},tt={alt:t=>t.altKey,control:t=>t.ctrlKey,meta:t=>t.metaKey,shift:t=>t.shiftKey},nt=(()=>{let e=class e extends x{constructor(n){super(n)}supports(n){return e.parseEventName(n)!=null}addEventListener(n,r,o){let i=e.parseEventName(r),a=e.eventCallback(i.fullKey,o,this.manager.getZone());return this.manager.getZone().runOutsideAngular(()=>B().onAndCancel(n,i.domEventName,a))}static parseEventName(n){let r=n.toLowerCase().split("."),o=r.shift();if(r.length===0||!(o==="keydown"||o==="keyup"))return null;let i=e._normalizeKey(r.pop()),a="",l=r.indexOf("code");if(l>-1&&(r.splice(l,1),a="code."),Ie.forEach(u=>{let f=r.indexOf(u);f>-1&&(r.splice(f,1),a+=u+".")}),a+=i,r.length!=0||i.length===0)return null;let c={};return c.domEventName=o,c.fullKey=a,c}static matchEventFullKeyCode(n,r){let o=et[n.key]||n.key,i="";return r.indexOf("code.")>-1&&(o=n.code,i="code."),o==null||!o?!1:(o=o.toLowerCase(),o===" "?o="space":o==="."&&(o="dot"),Ie.forEach(a=>{if(a!==o){let l=tt[a];l(n)&&(i+=a+".")}}),i+=o,i===r)}static eventCallback(n,r,o){return i=>{e.matchEventFullKeyCode(i,n)&&o.runGuarded(()=>r(i))}}static _normalizeKey(n){return n==="esc"?"escape":n}};e.\u0275fac=function(r){return new(r||e)(d(p))},e.\u0275prov=h({token:e,factory:e.\u0275fac});let t=e;return t})();function Yt(t,e){return me(k({rootComponent:t},rt(e)))}function rt(t){return{appProviders:[...ct,...t?.providers??[]],platformProviders:at}}function st(){Y.makeCurrent()}function ot(){return new F}function it(){return ie(document),document}var at=[{provide:D,useValue:Ee},{provide:ae,useValue:st,multi:!0},{provide:p,useFactory:it,deps:[]}];var ct=[{provide:oe,useValue:"root"},{provide:F,useFactory:ot,deps:[]},{provide:Q,useClass:He,multi:!0,deps:[p,P,D]},{provide:Q,useClass:nt,multi:!0,deps:[p]},Ne,ke,Se,{provide:ye,useExisting:Ne},{provide:Te,useClass:Je,deps:[]},[]];var Qt=(()=>{let e=class e{constructor(n){this._doc=n}getTitle(){return this._doc.title}setTitle(n){this._doc.title=n||""}};e.\u0275fac=function(r){return new(r||e)(d(p))},e.\u0275prov=h({token:e,factory:e.\u0275fac,providedIn:"root"});let t=e;return t})();var lt=(()=>{let e=class e{};e.\u0275fac=function(r){return new(r||e)},e.\u0275prov=h({token:e,factory:function(r){let o=null;return r?o=new(r||e):o=d(dt),o},providedIn:"root"});let t=e;return t})(),dt=(()=>{let e=class e extends lt{constructor(n){super(),this._doc=n}sanitize(n,r){if(r==null)return null;switch(n){case g.NONE:return r;case g.HTML:return E(r,"HTML")?w(r):pe(this._doc,String(r)).toString();case g.STYLE:return E(r,"Style")?w(r):r;case g.SCRIPT:if(E(r,"Script"))return w(r);throw new v(5200,!1);case g.URL:return E(r,"URL")?w(r):fe(String(r));case g.RESOURCE_URL:if(E(r,"ResourceURL"))return w(r);throw new v(5201,!1);default:throw new v(5202,!1)}}bypassSecurityTrustHtml(n){return ce(n)}bypassSecurityTrustStyle(n){return le(n)}bypassSecurityTrustScript(n){return de(n)}bypassSecurityTrustUrl(n){return ue(n)}bypassSecurityTrustResourceUrl(n){return he(n)}};e.\u0275fac=function(r){return new(r||e)(d(p))},e.\u0275prov=h({token:e,factory:e.\u0275fac,providedIn:"root"});let t=e;return t})();export{Tt as a,Ne as b,Yt as c,Qt as d,lt as e};
