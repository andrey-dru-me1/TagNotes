/**
 * Bundled by jsDelivr using Rollup v2.79.1 and Terser v5.19.2.
 * Original file: /npm/@reduxjs/toolkit@2.2.5/dist/redux-toolkit.modern.mjs
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
import{isAction as e,isPlainObject as t,combineReducers as n,applyMiddleware as r,createStore as i,compose as o}from"redux";export*from"redux";import{isDraft as c,current as s,isDraftable as a,produce as u}from"immer";export{produce as createNextState,current,freeze,isDraft,original}from"immer";import{createSelectorCreator as l,weakMapMemoize as f}from"reselect";export{createSelector,createSelectorCreator,lruMemoize,weakMapMemoize}from"reselect";import{thunk as d,withExtraArgument as p}from"redux-thunk";var y="undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{};"function"==typeof y.setTimeout&&setTimeout,"function"==typeof y.clearTimeout&&clearTimeout;function h(e,t){this.fun=e,this.array=t}h.prototype.run=function(){this.fun.apply(null,this.array)};var m=y.performance||{};m.now||m.mozNow||m.msNow||m.oNow||m.webkitNow;new Date;var g=(...e)=>{const t=l(...e),n=Object.assign(((...e)=>{const n=t(...e),r=(e,...t)=>n(c(e)?s(e):e,...t);return Object.assign(r,n),r}),{withTypes:()=>n});return n},w=g(f),b="undefined"!=typeof window&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:function(){if(0!==arguments.length)return"object"==typeof arguments[0]?o:o.apply(null,arguments)},v=e=>e&&"function"==typeof e.match;function j(t,n){function r(...e){if(n){let r=n(...e);if(!r)throw new Error(at(0));return{type:t,payload:r.payload,..."meta"in r&&{meta:r.meta},..."error"in r&&{error:r.error}}}return{type:t,payload:e[0]}}return r.toString=()=>`${t}`,r.type=t,r.match=n=>e(n)&&n.type===t,r}function O(e){return"function"==typeof e&&"type"in e&&v(e)}function E(t){return e(t)&&Object.keys(t).every(S)}function S(e){return["type","payload","error","meta"].indexOf(e)>-1}function T(e={}){return()=>e=>t=>e(t)}function C(e,t){for(const n of e)if(t(n))return n}var A=class e extends Array{constructor(...t){super(...t),Object.setPrototypeOf(this,e.prototype)}static get[Symbol.species](){return e}concat(...e){return super.concat.apply(this,e)}prepend(...t){return 1===t.length&&Array.isArray(t[0])?new e(...t[0].concat(this)):new e(...t.concat(this))}};function M(e){return a(e)?u(e,(()=>{})):e}function k(e,t,n){if(e.has(t)){let r=e.get(t);return n.update&&(r=n.update(r,t,e),e.set(t,r)),r}if(!n.insert)throw new Error(at(10));const r=n.insert(t,e);return e.set(t,r),r}function x(e){return"object"!=typeof e||null==e||Object.isFrozen(e)}function P(e={}){return()=>e=>t=>e(t)}function I(e){const n=typeof e;return null==e||"string"===n||"boolean"===n||"number"===n||Array.isArray(e)||t(e)}function R(e,t="",n=I,r,i=[],o){let c;if(!n(e))return{keyPath:t||"<root>",value:e};if("object"!=typeof e||null===e)return!1;if(o?.has(e))return!1;const s=null!=r?r(e):Object.entries(e),a=i.length>0;for(const[e,u]of s){const s=t?t+"."+e:e;if(a){if(i.some((e=>e instanceof RegExp?e.test(s):s===e)))continue}if(!n(u))return{keyPath:s,value:u};if("object"==typeof u&&(c=R(u,s,n,r,i,o),c))return c}return o&&_(e)&&o.add(e),!1}function _(e){if(!Object.isFrozen(e))return!1;for(const t of Object.values(e))if("object"==typeof t&&null!==t&&!_(t))return!1;return!0}function N(e={}){return()=>e=>t=>e(t)}var $="RTK_autoBatch",q=()=>e=>({payload:e,meta:{[$]:!0}}),B=e=>t=>{setTimeout(t,e)},D="undefined"!=typeof window&&window.requestAnimationFrame?window.requestAnimationFrame:B(10),L=(e={type:"raf"})=>t=>(...n)=>{const r=t(...n);let i=!0,o=!1,c=!1;const s=new Set,a="tick"===e.type?queueMicrotask:"raf"===e.type?D:"callback"===e.type?e.queueNotification:B(e.timeout),u=()=>{c=!1,o&&(o=!1,s.forEach((e=>e())))};return Object.assign({},r,{subscribe(e){const t=r.subscribe((()=>i&&e()));return s.add(e),()=>{t(),s.delete(e)}},dispatch(e){try{return i=!e?.meta?.[$],o=!i,o&&(c||(c=!0,a(u))),r.dispatch(e)}finally{i=!0}}})};function W(e){const c=function(e){const{thunk:t=!0,immutableCheck:n=!0,serializableCheck:r=!0,actionCreatorCheck:i=!0}=e??{};let o=new A;return t&&("boolean"==typeof t?o.push(d):o.push(p(t.extraArgument))),o},{reducer:s,middleware:a,devTools:u=!0,preloadedState:l,enhancers:f}=e||{};let y,h;if("function"==typeof s)y=s;else{if(!t(s))throw new Error(at(1));y=n(s)}h="function"==typeof a?a(c):c();let m=o;u&&(m=b({trace:!1,..."object"==typeof u&&u}));const g=(e=>function(t){const{autoBatch:n=!0}=t??{};let r=new A(e);return n&&r.push(L("object"==typeof n?n:void 0)),r})(r(...h));const w=m(..."function"==typeof f?f(g):g());return i(y,l,w)}function z(e){const t={},n=[];let r;const i={addCase(e,n){const r="string"==typeof e?e:e.type;if(!r)throw new Error(at(28));if(r in t)throw new Error(at(29));return t[r]=n,i},addMatcher:(e,t)=>(n.push({matcher:e,reducer:t}),i),addDefaultCase:e=>(r=e,i)};return e(i),[t,n,r]}function V(e,t){let n,[r,i,o]=z(t);if("function"==typeof e)n=()=>M(e());else{const t=M(e);n=()=>t}function s(e=n(),t){let s=[r[t.type],...i.filter((({matcher:e})=>e(t))).map((({reducer:e})=>e))];return 0===s.filter((e=>!!e)).length&&(s=[o]),s.reduce(((e,n)=>{if(n){if(c(e)){const r=n(e,t);return void 0===r?e:r}if(a(e))return u(e,(e=>n(e,t)));{const r=n(e,t);if(void 0===r){if(null===e)return e;throw new Error(at(9))}return r}}return e}),e)}return s.getInitialState=n,s}var F=(e=21)=>{let t="",n=e;for(;n--;)t+="ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW"[64*Math.random()|0];return t},X=(e,t)=>v(e)?e.match(t):e(t);function G(...e){return t=>e.some((e=>X(e,t)))}function U(...e){return t=>e.every((e=>X(e,t)))}function J(e,t){if(!e||!e.meta)return!1;const n="string"==typeof e.meta.requestId,r=t.indexOf(e.meta.requestStatus)>-1;return n&&r}function K(e){return"function"==typeof e[0]&&"pending"in e[0]&&"fulfilled"in e[0]&&"rejected"in e[0]}function H(...e){return 0===e.length?e=>J(e,["pending"]):K(e)?G(...e.map((e=>e.pending))):H()(e[0])}function Q(...e){return 0===e.length?e=>J(e,["rejected"]):K(e)?G(...e.map((e=>e.rejected))):Q()(e[0])}function Y(...e){const t=e=>e&&e.meta&&e.meta.rejectedWithValue;return 0===e.length||K(e)?U(Q(...e),t):Y()(e[0])}function Z(...e){return 0===e.length?e=>J(e,["fulfilled"]):K(e)?G(...e.map((e=>e.fulfilled))):Z()(e[0])}function ee(...e){return 0===e.length?e=>J(e,["pending","fulfilled","rejected"]):K(e)?G(...e.flatMap((e=>[e.pending,e.rejected,e.fulfilled]))):ee()(e[0])}var te=["name","message","stack","code"],ne=class{constructor(e,t){this.payload=e,this.meta=t}_type},re=class{constructor(e,t){this.payload=e,this.meta=t}_type},ie=e=>{if("object"==typeof e&&null!==e){const t={};for(const n of te)"string"==typeof e[n]&&(t[n]=e[n]);return t}return{message:String(e)}},oe=(()=>{function e(e,t,n){const r=j(e+"/fulfilled",((e,t,n,r)=>({payload:e,meta:{...r||{},arg:n,requestId:t,requestStatus:"fulfilled"}}))),i=j(e+"/pending",((e,t,n)=>({payload:void 0,meta:{...n||{},arg:t,requestId:e,requestStatus:"pending"}}))),o=j(e+"/rejected",((e,t,r,i,o)=>({payload:i,error:(n&&n.serializeError||ie)(e||"Rejected"),meta:{...o||{},arg:r,requestId:t,rejectedWithValue:!!i,requestStatus:"rejected",aborted:"AbortError"===e?.name,condition:"ConditionError"===e?.name}})));return Object.assign((function(e){return(c,s,a)=>{const u=n?.idGenerator?n.idGenerator(e):F(),l=new AbortController;let f,d;function p(e){d=e,l.abort()}const y=async function(){let y;try{let o=n?.condition?.(e,{getState:s,extra:a});if(null!==(h=o)&&"object"==typeof h&&"function"==typeof h.then&&(o=await o),!1===o||l.signal.aborted)throw{name:"ConditionError",message:"Aborted due to condition callback returning false."};const m=new Promise(((e,t)=>{f=()=>{t({name:"AbortError",message:d||"Aborted"})},l.signal.addEventListener("abort",f)}));c(i(u,e,n?.getPendingMeta?.({requestId:u,arg:e},{getState:s,extra:a}))),y=await Promise.race([m,Promise.resolve(t(e,{dispatch:c,getState:s,extra:a,requestId:u,signal:l.signal,abort:p,rejectWithValue:(e,t)=>new ne(e,t),fulfillWithValue:(e,t)=>new re(e,t)})).then((t=>{if(t instanceof ne)throw t;return t instanceof re?r(t.payload,u,e,t.meta):r(t,u,e)}))])}catch(t){y=t instanceof ne?o(null,u,e,t.payload,t.meta):o(t,u,e)}finally{f&&l.signal.removeEventListener("abort",f)}var h;return n&&!n.dispatchConditionRejection&&o.match(y)&&y.meta.condition||c(y),y}();return Object.assign(y,{abort:p,requestId:u,arg:e,unwrap:()=>y.then(ce)})}}),{pending:i,rejected:o,fulfilled:r,settled:G(o,r),typePrefix:e})}return e.withTypes=()=>e,e})();function ce(e){if(e.meta&&e.meta.rejectedWithValue)throw e.payload;if(e.error)throw e.error;return e.payload}var se=Symbol.for("rtk-slice-createasyncthunk"),ae={[se]:oe},ue=(e=>(e.reducer="reducer",e.reducerWithPrepare="reducerWithPrepare",e.asyncThunk="asyncThunk",e))(ue||{});function le(e,t){return`${e}/${t}`}function fe({creators:e}={}){const t=e?.asyncThunk?.[se];return function(e){const{name:n,reducerPath:r=n}=e;if(!n)throw new Error(at(11));const i=("function"==typeof e.reducers?e.reducers(function(){function e(e,t){return{_reducerDefinitionType:"asyncThunk",payloadCreator:e,...t}}return e.withTypes=()=>e,{reducer:e=>Object.assign({[e.name]:(...t)=>e(...t)}[e.name],{_reducerDefinitionType:"reducer"}),preparedReducer:(e,t)=>({_reducerDefinitionType:"reducerWithPrepare",prepare:e,reducer:t}),asyncThunk:e}}()):e.reducers)||{},o=Object.keys(i),c={sliceCaseReducersByName:{},sliceCaseReducersByType:{},actionCreators:{},sliceMatchers:[]},s={addCase(e,t){const n="string"==typeof e?e:e.type;if(!n)throw new Error(at(12));if(n in c.sliceCaseReducersByType)throw new Error(at(13));return c.sliceCaseReducersByType[n]=t,s},addMatcher:(e,t)=>(c.sliceMatchers.push({matcher:e,reducer:t}),s),exposeAction:(e,t)=>(c.actionCreators[e]=t,s),exposeCaseReducer:(e,t)=>(c.sliceCaseReducersByName[e]=t,s)};function a(){const[t={},n=[],r]="function"==typeof e.extraReducers?z(e.extraReducers):[e.extraReducers],i={...t,...c.sliceCaseReducersByType};return V(e.initialState,(e=>{for(let t in i)e.addCase(t,i[t]);for(let t of c.sliceMatchers)e.addMatcher(t.matcher,t.reducer);for(let t of n)e.addMatcher(t.matcher,t.reducer);r&&e.addDefaultCase(r)}))}o.forEach((r=>{const o=i[r],c={reducerName:r,type:le(n,r),createNotation:"function"==typeof e.reducers};!function(e){return"asyncThunk"===e._reducerDefinitionType}(o)?function({type:e,reducerName:t,createNotation:n},r,i){let o,c;if("reducer"in r){if(n&&!function(e){return"reducerWithPrepare"===e._reducerDefinitionType}(r))throw new Error(at(17));o=r.reducer,c=r.prepare}else o=r;i.addCase(e,o).exposeCaseReducer(t,o).exposeAction(t,c?j(e,c):j(e))}(c,o,s):function({type:e,reducerName:t},n,r,i){if(!i)throw new Error(at(18));const{payloadCreator:o,fulfilled:c,pending:s,rejected:a,settled:u,options:l}=n,f=i(e,o,l);r.exposeAction(t,f),c&&r.addCase(f.fulfilled,c);s&&r.addCase(f.pending,s);a&&r.addCase(f.rejected,a);u&&r.addMatcher(f.settled,u);r.exposeCaseReducer(t,{fulfilled:c||ye,pending:s||ye,rejected:a||ye,settled:u||ye})}(c,o,s,t)}));const u=e=>e,l=new Map;let f;function d(e,t){return f||(f=a()),f(e,t)}function p(){return f||(f=a()),f.getInitialState()}function y(t,n=!1){function r(e){let r=e[t];return void 0===r&&n&&(r=p()),r}function i(t=u){const r=k(l,n,{insert:()=>new WeakMap});return k(r,t,{insert:()=>{const r={};for(const[i,o]of Object.entries(e.selectors??{}))r[i]=de(o,t,p,n);return r}})}return{reducerPath:t,getSelectors:i,get selectors(){return i(r)},selectSlice:r}}const h={name:n,reducer:d,actions:c.actionCreators,caseReducers:c.sliceCaseReducersByName,getInitialState:p,...y(r),injectInto(e,{reducerPath:t,...n}={}){const i=t??r;return e.inject({reducerPath:i,reducer:d},n),{...h,...y(i,!0)}}};return h}}function de(e,t,n,r){function i(i,...o){let c=t(i);return void 0===c&&r&&(c=n()),e(c,...o)}return i.unwrapped=e,i}var pe=fe();function ye(){}var he=c;function me(e){const t=ge(((t,n)=>e(n)));return function(e){return t(e,void 0)}}function ge(e){return function(t,n){const r=t=>{E(n)?e(n.payload,t):e(n,t)};return he(t)?(r(t),t):u(t,r)}}function we(e,t){return t(e)}function be(e){return Array.isArray(e)||(e=Object.values(e)),e}function ve(e){return c(e)?s(e):e}function je(e,t,n){e=be(e);const r=ve(n.ids),i=new Set(r),o=[],c=[];for(const n of e){const e=we(n,t);i.has(e)?c.push({id:e,changes:n}):o.push(n)}return[o,c,r]}function Oe(e){function t(t,n){const r=we(t,e);r in n.entities||(n.ids.push(r),n.entities[r]=t)}function n(e,n){e=be(e);for(const r of e)t(r,n)}function r(t,n){const r=we(t,e);r in n.entities||n.ids.push(r),n.entities[r]=t}function i(e,t){let n=!1;e.forEach((e=>{e in t.entities&&(delete t.entities[e],n=!0)})),n&&(t.ids=t.ids.filter((e=>e in t.entities)))}function o(t,n){const r={},i={};t.forEach((e=>{e.id in n.entities&&(i[e.id]={id:e.id,changes:{...i[e.id]?i[e.id].changes:null,...e.changes}})}));if((t=Object.values(i)).length>0){const i=t.filter((t=>function(t,n,r){const i=r.entities[n.id];if(void 0===i)return!1;const o=Object.assign({},i,n.changes),c=we(o,e),s=c!==n.id;return s&&(t[n.id]=c,delete r.entities[n.id]),r.entities[c]=o,s}(r,t,n))).length>0;i&&(n.ids=Object.values(n.entities).map((t=>we(t,e))))}}function c(t,r){const[i,c]=je(t,e,r);o(c,r),n(i,r)}return{removeAll:me((function(e){Object.assign(e,{ids:[],entities:{}})})),addOne:ge(t),addMany:ge(n),setOne:ge(r),setMany:ge((function(e,t){e=be(e);for(const n of e)r(n,t)})),setAll:ge((function(e,t){e=be(e),t.ids=[],t.entities={},n(e,t)})),updateOne:ge((function(e,t){return o([e],t)})),updateMany:ge(o),upsertOne:ge((function(e,t){return c([e],t)})),upsertMany:ge(c),removeOne:ge((function(e,t){return i([e],t)})),removeMany:ge(i)}}function Ee(e,t,n){const r=function(e,t,n){let r=0,i=e.length;for(;r<i;){let o=r+i>>>1;n(t,e[o])>=0?r=o+1:i=o}return r}(e,t,n);return e.splice(r,0,t),e}function Se(e={}){const{selectId:t,sortComparer:n}={sortComparer:!1,selectId:e=>e.id,...e},r=n?function(e,t){const{removeOne:n,removeMany:r,removeAll:i}=Oe(e);function o(t,n,r){t=be(t);const i=new Set(r??s(n.ids)),o=t.filter((t=>!i.has(we(t,e))));0!==o.length&&l(n,o)}function c(t,n){if(0!==(t=be(t)).length){for(const r of t)delete n.entities[e(r)];l(n,t)}}function a(t,n){let r=!1,i=!1;for(let o of t){const t=n.entities[o.id];if(!t)continue;r=!0,Object.assign(t,o.changes);const c=e(t);if(o.id!==c){i=!0,delete n.entities[o.id];const e=n.ids.indexOf(o.id);n.ids[e]=c,n.entities[c]=t}}r&&l(n,[],r,i)}function u(t,n){const[r,i,c]=je(t,e,n);i.length&&a(i,n),r.length&&o(r,n,c)}const l=(n,r,i,o)=>{const c=ve(n.entities),s=ve(n.ids),a=n.entities;let u=s;o&&(u=Array.from(new Set(s)));let l=[];for(const e of u){const t=c[e];t&&l.push(t)}const f=0===l.length;for(const n of r)a[e(n)]=n,f||Ee(l,n,t);f?l=r.slice().sort(t):i&&l.sort(t);const d=l.map(e);(function(e,t){if(e.length!==t.length)return!1;for(let n=0;n<e.length&&n<t.length;n++)if(e[n]!==t[n])return!1;return!0})(s,d)||(n.ids=d)};return{removeOne:n,removeMany:r,removeAll:i,addOne:ge((function(e,t){return o([e],t)})),updateOne:ge((function(e,t){return a([e],t)})),upsertOne:ge((function(e,t){return u([e],t)})),setOne:ge((function(e,t){return c([e],t)})),setMany:ge(c),setAll:ge((function(e,t){e=be(e),t.entities={},t.ids=[],o(e,t,[])})),addMany:ge(o),updateMany:ge(a),upsertMany:ge(u)}}(t,n):Oe(t),i=function(e){return{getInitialState:function(t={},n){const r=Object.assign({ids:[],entities:{}},t);return n?e.setAll(r,n):r}}}(r),o={getSelectors:function(e,t={}){const{createSelector:n=w}=t,r=e=>e.ids,i=e=>e.entities,o=n(r,i,((e,t)=>e.map((e=>t[e])))),c=(e,t)=>t,s=(e,t)=>e[t],a=n(r,(e=>e.length));if(!e)return{selectIds:r,selectEntities:i,selectAll:o,selectTotal:a,selectById:n(i,c,s)};const u=n(e,i);return{selectIds:n(e,r),selectEntities:u,selectAll:n(e,o),selectTotal:n(e,a),selectById:n(u,c,s)}}};return{selectId:t,sortComparer:n,...i,...o,...r}}var Te="listener",Ce="completed",Ae="cancelled",Me=`task-${Ae}`,ke=`task-${Ce}`,xe=`${Te}-${Ae}`,Pe=`${Te}-${Ce}`,Ie=class{constructor(e){this.code=e,this.message=`task ${Ae} (reason: ${e})`}name="TaskAbortError";message},Re=(e,t)=>{if("function"!=typeof e)throw new Error(at(32))},_e=()=>{},Ne=(e,t=_e)=>(e.catch(t),e),$e=(e,t)=>(e.addEventListener("abort",t,{once:!0}),()=>e.removeEventListener("abort",t)),qe=(e,t)=>{const n=e.signal;n.aborted||("reason"in n||Object.defineProperty(n,"reason",{enumerable:!0,value:t,configurable:!0,writable:!0}),e.abort(t))},Be=e=>{if(e.aborted){const{reason:t}=e;throw new Ie(t)}};function De(e,t){let n=_e;return new Promise(((r,i)=>{const o=()=>i(new Ie(e.reason));e.aborted?o():(n=$e(e,o),t.finally((()=>n())).then(r,i))})).finally((()=>{n=_e}))}var Le=e=>t=>Ne(De(e,t).then((t=>(Be(e),t)))),We=e=>{const t=Le(e);return e=>t(new Promise((t=>setTimeout(t,e))))},{assign:ze}=Object,Ve={},Fe="listenerMiddleware",Xe=(e,t)=>(n,r)=>{Re(n);const i=new AbortController;var o;o=i,$e(e,(()=>qe(o,e.reason)));const c=(async(e,t)=>{try{return await Promise.resolve(),{status:"ok",value:await e()}}catch(e){return{status:e instanceof Ie?"cancelled":"rejected",error:e}}finally{t?.()}})((async()=>{Be(e),Be(i.signal);const t=await n({pause:Le(i.signal),delay:We(i.signal),signal:i.signal});return Be(i.signal),t}),(()=>qe(i,ke)));return r?.autoJoin&&t.push(c.catch(_e)),{result:Le(e)(c),cancel(){qe(i,Me)}}},Ge=(e,t)=>(n,r)=>Ne((async(n,r)=>{Be(t);let i=()=>{};const o=[new Promise(((t,r)=>{let o=e({predicate:n,effect:(e,n)=>{n.unsubscribe(),t([e,n.getState(),n.getOriginalState()])}});i=()=>{o(),r()}}))];null!=r&&o.push(new Promise((e=>setTimeout(e,r,null))));try{const e=await De(t,Promise.race(o));return Be(t),e}finally{i()}})(n,r)),Ue=e=>{let{type:t,actionCreator:n,matcher:r,predicate:i,effect:o}=e;if(t)i=j(t).match;else if(n)t=n.type,i=n.match;else if(r)i=r;else if(!i)throw new Error(at(21));return Re(o),{predicate:i,type:t,effect:o}},Je=Object.assign((e=>{const{type:t,predicate:n,effect:r}=Ue(e);return{id:F(),effect:r,type:t,predicate:n,pending:new Set,unsubscribe:()=>{throw new Error(at(22))}}}),{withTypes:()=>Je}),Ke=e=>{e.pending.forEach((e=>{qe(e,xe)}))},He=(e,t,n)=>{try{e(t,n)}catch(e){setTimeout((()=>{throw e}),0)}},Qe=Object.assign(j(`${Fe}/add`),{withTypes:()=>Qe}),Ye=j(`${Fe}/removeAll`),Ze=Object.assign(j(`${Fe}/remove`),{withTypes:()=>Ze}),et=(...e)=>{console.error(`${Fe}/error`,...e)},tt=(t={})=>{const n=new Map,{extra:r,onError:i=et}=t;Re(i);const o=e=>{let t=C(Array.from(n.values()),(t=>t.effect===e.effect));return t||(t=Je(e)),(e=>(e.unsubscribe=()=>n.delete(e.id),n.set(e.id,e),t=>{e.unsubscribe(),t?.cancelActive&&Ke(e)}))(t)};Object.assign(o,{withTypes:()=>o});const c=e=>{const{type:t,effect:r,predicate:i}=Ue(e),o=C(Array.from(n.values()),(e=>("string"==typeof t?e.type===t:e.predicate===i)&&e.effect===r));return o&&(o.unsubscribe(),e.cancelActive&&Ke(o)),!!o};Object.assign(c,{withTypes:()=>c});const s=async(e,t,c,s)=>{const a=new AbortController,u=Ge(o,a.signal),l=[];try{e.pending.add(a),await Promise.resolve(e.effect(t,ze({},c,{getOriginalState:s,condition:(e,t)=>u(e,t).then(Boolean),take:u,delay:We(a.signal),pause:Le(a.signal),extra:r,signal:a.signal,fork:Xe(a.signal,l),unsubscribe:e.unsubscribe,subscribe:()=>{n.set(e.id,e)},cancelActiveListeners:()=>{e.pending.forEach(((e,t,n)=>{e!==a&&(qe(e,xe),n.delete(e))}))},cancel:()=>{qe(a,xe),e.pending.delete(a)},throwIfCancelled:()=>{Be(a.signal)}})))}catch(e){e instanceof Ie||He(i,e,{raisedBy:"effect"})}finally{await Promise.all(l),qe(a,Pe),e.pending.delete(a)}},a=(e=>()=>{e.forEach(Ke),e.clear()})(n);return{middleware:t=>r=>u=>{if(!e(u))return r(u);if(Qe.match(u))return o(u.payload);if(Ye.match(u))return void a();if(Ze.match(u))return c(u.payload);let l=t.getState();const f=()=>{if(l===Ve)throw new Error(at(23));return l};let d;try{if(d=r(u),n.size>0){const e=t.getState(),r=Array.from(n.values());for(const n of r){let r=!1;try{r=n.predicate(u,e,l)}catch(e){r=!1,He(i,e,{raisedBy:"predicate"})}r&&s(n,u,t,f)}}}finally{l=Ve}return d},startListening:o,stopListening:c,clearListeners:a}},nt=()=>{const e=F(),t=new Map,n=Object.assign(j("dynamicMiddleware/add",((...t)=>({payload:t,meta:{instanceId:e}}))),{withTypes:()=>n}),r=Object.assign((function(...e){e.forEach((e=>{let n=C(Array.from(t.values()),(t=>t.middleware===e));n||(n=(e=>({id:F(),middleware:e,applied:new Map}))(e)),t.set(n.id,n)}))}),{withTypes:()=>r}),i=U(n,(e=>t=>t?.meta?.instanceId===e)(e));return{middleware:e=>n=>c=>i(c)?(r(...c.payload),e.dispatch):(e=>{const n=Array.from(t.values()).map((t=>k(t.applied,e,{insert:()=>t.middleware(e)})));return o(...n)})(e)(n)(c),addMiddleware:r,withMiddleware:n,instanceId:e}},rt=Symbol.for("rtk-state-proxy-original"),it=new WeakMap,ot=e=>{if(!(t=e)||!t[rt])throw new Error(at(25));var t;return e[rt]},ct=(e={})=>e;function st(...e){const t=Object.fromEntries((e=>e.flatMap((e=>{return"reducerPath"in(t=e)&&"string"==typeof t.reducerPath?[[e.reducerPath,e.reducer]]:Object.entries(e);var t})))(e)),r=()=>Object.keys(t).length?n(t):ct;let i=r();function o(e,t){return i(e,t)}o.withLazyLoadedSlices=()=>o;const c=Object.assign((function(e,n){return function(r,...i){return e(((e,t)=>k(it,e,{insert:()=>new Proxy(e,{get:(e,n,r)=>{if(n===rt)return e;const i=Reflect.get(e,n,r);if(void 0===i){const e=t[n.toString()];if(e){const t=e(void 0,{type:F()});if(void 0===t)throw new Error(at(24));return t}}return i}})}))(n?n(r,...i):r,t),...i)}}),{original:ot});return Object.assign(o,{inject:(e,n={})=>{const{reducerPath:c,reducer:s}=e,a=t[c];return!n.overrideExisting&&a&&a!==s||(t[c]=s,i=r()),o},selector:c})}function at(e){return`Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `}export{ue as ReducerType,$ as SHOULD_AUTOBATCH,Ie as TaskAbortError,A as Tuple,Qe as addListener,ae as asyncThunkCreator,L as autoBatchEnhancer,fe as buildCreateSlice,Ye as clearAllListeners,st as combineSlices,W as configureStore,j as createAction,T as createActionCreatorInvariantMiddleware,oe as createAsyncThunk,w as createDraftSafeSelector,g as createDraftSafeSelectorCreator,nt as createDynamicMiddleware,Se as createEntityAdapter,P as createImmutableStateInvariantMiddleware,tt as createListenerMiddleware,V as createReducer,N as createSerializableStateInvariantMiddleware,pe as createSlice,R as findNonSerializableValue,at as formatProdErrorMessage,O as isActionCreator,U as isAllOf,G as isAnyOf,ee as isAsyncThunkAction,E as isFluxStandardAction,Z as isFulfilled,x as isImmutableDefault,H as isPending,I as isPlain,Q as isRejected,Y as isRejectedWithValue,ie as miniSerializeError,F as nanoid,q as prepareAutoBatched,Ze as removeListener,ce as unwrapResult};export default null;