var e=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports);(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var t=e((e=>{function t(e,t){var n=e.length;e.push(t);a:for(;0<n;){var r=n-1>>>1,a=e[r];if(0<i(a,t))e[r]=t,e[n]=a,n=r;else break a}}function n(e){return e.length===0?null:e[0]}function r(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;a:for(var r=0,a=e.length,o=a>>>1;r<o;){var s=2*(r+1)-1,c=e[s],l=s+1,u=e[l];if(0>i(c,n))l<a&&0>i(u,c)?(e[r]=u,e[l]=n,r=l):(e[r]=c,e[s]=n,r=s);else if(l<a&&0>i(u,n))e[r]=u,e[l]=n,r=l;else break a}}return t}function i(e,t){var n=e.sortIndex-t.sortIndex;return n===0?e.id-t.id:n}if(e.unstable_now=void 0,typeof performance==`object`&&typeof performance.now==`function`){var a=performance;e.unstable_now=function(){return a.now()}}else{var o=Date,s=o.now();e.unstable_now=function(){return o.now()-s}}var c=[],l=[],u=1,d=null,f=3,p=!1,m=!1,h=!1,g=!1,_=typeof setTimeout==`function`?setTimeout:null,v=typeof clearTimeout==`function`?clearTimeout:null,y=typeof setImmediate<`u`?setImmediate:null;function b(e){for(var i=n(l);i!==null;){if(i.callback===null)r(l);else if(i.startTime<=e)r(l),i.sortIndex=i.expirationTime,t(c,i);else break;i=n(l)}}function x(e){if(h=!1,b(e),!m)if(n(c)!==null)m=!0,ee||(ee=!0,w());else{var t=n(l);t!==null&&oe(x,t.startTime-e)}}var ee=!1,S=-1,C=5,te=-1;function ne(){return g?!0:!(e.unstable_now()-te<C)}function re(){if(g=!1,ee){var t=e.unstable_now();te=t;var i=!0;try{a:{m=!1,h&&(h=!1,v(S),S=-1),p=!0;var a=f;try{b:{for(b(t),d=n(c);d!==null&&!(d.expirationTime>t&&ne());){var o=d.callback;if(typeof o==`function`){d.callback=null,f=d.priorityLevel;var s=o(d.expirationTime<=t);if(t=e.unstable_now(),typeof s==`function`){d.callback=s,b(t),i=!0;break b}d===n(c)&&r(c),b(t)}else r(c);d=n(c)}if(d!==null)i=!0;else{var u=n(l);u!==null&&oe(x,u.startTime-t),i=!1}}break a}finally{d=null,f=a,p=!1}i=void 0}}finally{i?w():ee=!1}}}var w;if(typeof y==`function`)w=function(){y(re)};else if(typeof MessageChannel<`u`){var ie=new MessageChannel,ae=ie.port2;ie.port1.onmessage=re,w=function(){ae.postMessage(null)}}else w=function(){_(re,0)};function oe(t,n){S=_(function(){t(e.unstable_now())},n)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(e){e.callback=null},e.unstable_forceFrameRate=function(e){0>e||125<e?console.error(`forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported`):C=0<e?Math.floor(1e3/e):5},e.unstable_getCurrentPriorityLevel=function(){return f},e.unstable_next=function(e){switch(f){case 1:case 2:case 3:var t=3;break;default:t=f}var n=f;f=t;try{return e()}finally{f=n}},e.unstable_requestPaint=function(){g=!0},e.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=f;f=e;try{return t()}finally{f=n}},e.unstable_scheduleCallback=function(r,i,a){var o=e.unstable_now();switch(typeof a==`object`&&a?(a=a.delay,a=typeof a==`number`&&0<a?o+a:o):a=o,r){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return s=a+s,r={id:u++,callback:i,priorityLevel:r,startTime:a,expirationTime:s,sortIndex:-1},a>o?(r.sortIndex=a,t(l,r),n(c)===null&&r===n(l)&&(h?(v(S),S=-1):h=!0,oe(x,a-o))):(r.sortIndex=s,t(c,r),m||p||(m=!0,ee||(ee=!0,w()))),r},e.unstable_shouldYield=ne,e.unstable_wrapCallback=function(e){var t=f;return function(){var n=f;f=t;try{return e.apply(this,arguments)}finally{f=n}}}})),n=e(((e,n)=>{n.exports=t()})),r=e((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.portal`),r=Symbol.for(`react.fragment`),i=Symbol.for(`react.strict_mode`),a=Symbol.for(`react.profiler`),o=Symbol.for(`react.consumer`),s=Symbol.for(`react.context`),c=Symbol.for(`react.forward_ref`),l=Symbol.for(`react.suspense`),u=Symbol.for(`react.memo`),d=Symbol.for(`react.lazy`),f=Symbol.for(`react.activity`),p=Symbol.iterator;function m(e){return typeof e!=`object`||!e?null:(e=p&&e[p]||e[`@@iterator`],typeof e==`function`?e:null)}var h={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},g=Object.assign,_={};function v(e,t,n){this.props=e,this.context=t,this.refs=_,this.updater=n||h}v.prototype.isReactComponent={},v.prototype.setState=function(e,t){if(typeof e!=`object`&&typeof e!=`function`&&e!=null)throw Error(`takes an object of state variables to update or a function which returns an object of state variables.`);this.updater.enqueueSetState(this,e,t,`setState`)},v.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,`forceUpdate`)};function y(){}y.prototype=v.prototype;function b(e,t,n){this.props=e,this.context=t,this.refs=_,this.updater=n||h}var x=b.prototype=new y;x.constructor=b,g(x,v.prototype),x.isPureReactComponent=!0;var ee=Array.isArray;function S(){}var C={H:null,A:null,T:null,S:null},te=Object.prototype.hasOwnProperty;function ne(e,n,r){var i=r.ref;return{$$typeof:t,type:e,key:n,ref:i===void 0?null:i,props:r}}function re(e,t){return ne(e.type,t,e.props)}function w(e){return typeof e==`object`&&!!e&&e.$$typeof===t}function ie(e){var t={"=":`=0`,":":`=2`};return`$`+e.replace(/[=:]/g,function(e){return t[e]})}var ae=/\/+/g;function oe(e,t){return typeof e==`object`&&e&&e.key!=null?ie(``+e.key):t.toString(36)}function se(e){switch(e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason;default:switch(typeof e.status==`string`?e.then(S,S):(e.status=`pending`,e.then(function(t){e.status===`pending`&&(e.status=`fulfilled`,e.value=t)},function(t){e.status===`pending`&&(e.status=`rejected`,e.reason=t)})),e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason}}throw e}function ce(e,r,i,a,o){var s=typeof e;(s===`undefined`||s===`boolean`)&&(e=null);var c=!1;if(e===null)c=!0;else switch(s){case`bigint`:case`string`:case`number`:c=!0;break;case`object`:switch(e.$$typeof){case t:case n:c=!0;break;case d:return c=e._init,ce(c(e._payload),r,i,a,o)}}if(c)return o=o(e),c=a===``?`.`+oe(e,0):a,ee(o)?(i=``,c!=null&&(i=c.replace(ae,`$&/`)+`/`),ce(o,r,i,``,function(e){return e})):o!=null&&(w(o)&&(o=re(o,i+(o.key==null||e&&e.key===o.key?``:(``+o.key).replace(ae,`$&/`)+`/`)+c)),r.push(o)),1;c=0;var l=a===``?`.`:a+`:`;if(ee(e))for(var u=0;u<e.length;u++)a=e[u],s=l+oe(a,u),c+=ce(a,r,i,s,o);else if(u=m(e),typeof u==`function`)for(e=u.call(e),u=0;!(a=e.next()).done;)a=a.value,s=l+oe(a,u++),c+=ce(a,r,i,s,o);else if(s===`object`){if(typeof e.then==`function`)return ce(se(e),r,i,a,o);throw r=String(e),Error(`Objects are not valid as a React child (found: `+(r===`[object Object]`?`object with keys {`+Object.keys(e).join(`, `)+`}`:r)+`). If you meant to render a collection of children, use an array instead.`)}return c}function le(e,t,n){if(e==null)return e;var r=[],i=0;return ce(e,r,``,``,function(e){return t.call(n,e,i++)}),r}function ue(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t)},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var T=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},E={map:le,forEach:function(e,t,n){le(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return le(e,function(){t++}),t},toArray:function(e){return le(e,function(e){return e})||[]},only:function(e){if(!w(e))throw Error(`React.Children.only expected to receive a single React element child.`);return e}};e.Activity=f,e.Children=E,e.Component=v,e.Fragment=r,e.Profiler=a,e.PureComponent=b,e.StrictMode=i,e.Suspense=l,e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=C,e.__COMPILER_RUNTIME={__proto__:null,c:function(e){return C.H.useMemoCache(e)}},e.cache=function(e){return function(){return e.apply(null,arguments)}},e.cacheSignal=function(){return null},e.cloneElement=function(e,t,n){if(e==null)throw Error(`The argument must be a React element, but you passed `+e+`.`);var r=g({},e.props),i=e.key;if(t!=null)for(a in t.key!==void 0&&(i=``+t.key),t)!te.call(t,a)||a===`key`||a===`__self`||a===`__source`||a===`ref`&&t.ref===void 0||(r[a]=t[a]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var o=Array(a),s=0;s<a;s++)o[s]=arguments[s+2];r.children=o}return ne(e.type,i,r)},e.createContext=function(e){return e={$$typeof:s,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:o,_context:e},e},e.createElement=function(e,t,n){var r,i={},a=null;if(t!=null)for(r in t.key!==void 0&&(a=``+t.key),t)te.call(t,r)&&r!==`key`&&r!==`__self`&&r!==`__source`&&(i[r]=t[r]);var o=arguments.length-2;if(o===1)i.children=n;else if(1<o){for(var s=Array(o),c=0;c<o;c++)s[c]=arguments[c+2];i.children=s}if(e&&e.defaultProps)for(r in o=e.defaultProps,o)i[r]===void 0&&(i[r]=o[r]);return ne(e,a,i)},e.createRef=function(){return{current:null}},e.forwardRef=function(e){return{$$typeof:c,render:e}},e.isValidElement=w,e.lazy=function(e){return{$$typeof:d,_payload:{_status:-1,_result:e},_init:ue}},e.memo=function(e,t){return{$$typeof:u,type:e,compare:t===void 0?null:t}},e.startTransition=function(e){var t=C.T,n={};C.T=n;try{var r=e(),i=C.S;i!==null&&i(n,r),typeof r==`object`&&r&&typeof r.then==`function`&&r.then(S,T)}catch(e){T(e)}finally{t!==null&&n.types!==null&&(t.types=n.types),C.T=t}},e.unstable_useCacheRefresh=function(){return C.H.useCacheRefresh()},e.use=function(e){return C.H.use(e)},e.useActionState=function(e,t,n){return C.H.useActionState(e,t,n)},e.useCallback=function(e,t){return C.H.useCallback(e,t)},e.useContext=function(e){return C.H.useContext(e)},e.useDebugValue=function(){},e.useDeferredValue=function(e,t){return C.H.useDeferredValue(e,t)},e.useEffect=function(e,t){return C.H.useEffect(e,t)},e.useEffectEvent=function(e){return C.H.useEffectEvent(e)},e.useId=function(){return C.H.useId()},e.useImperativeHandle=function(e,t,n){return C.H.useImperativeHandle(e,t,n)},e.useInsertionEffect=function(e,t){return C.H.useInsertionEffect(e,t)},e.useLayoutEffect=function(e,t){return C.H.useLayoutEffect(e,t)},e.useMemo=function(e,t){return C.H.useMemo(e,t)},e.useOptimistic=function(e,t){return C.H.useOptimistic(e,t)},e.useReducer=function(e,t,n){return C.H.useReducer(e,t,n)},e.useRef=function(e){return C.H.useRef(e)},e.useState=function(e){return C.H.useState(e)},e.useSyncExternalStore=function(e,t,n){return C.H.useSyncExternalStore(e,t,n)},e.useTransition=function(){return C.H.useTransition()},e.version=`19.2.7`})),i=e(((e,t)=>{t.exports=r()})),a=e((e=>{var t=i();function n(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function r(){}var a={d:{f:r,r:function(){throw Error(n(522))},D:r,C:r,L:r,m:r,X:r,S:r,M:r},p:0,findDOMNode:null},o=Symbol.for(`react.portal`);function s(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:o,key:r==null?null:``+r,children:e,containerInfo:t,implementation:n}}var c=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function l(e,t){if(e===`font`)return``;if(typeof t==`string`)return t===`use-credentials`?t:``}e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=a,e.createPortal=function(e,t){var r=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(n(299));return s(e,t,null,r)},e.flushSync=function(e){var t=c.T,n=a.p;try{if(c.T=null,a.p=2,e)return e()}finally{c.T=t,a.p=n,a.d.f()}},e.preconnect=function(e,t){typeof e==`string`&&(t?(t=t.crossOrigin,t=typeof t==`string`?t===`use-credentials`?t:``:void 0):t=null,a.d.C(e,t))},e.prefetchDNS=function(e){typeof e==`string`&&a.d.D(e)},e.preinit=function(e,t){if(typeof e==`string`&&t&&typeof t.as==`string`){var n=t.as,r=l(n,t.crossOrigin),i=typeof t.integrity==`string`?t.integrity:void 0,o=typeof t.fetchPriority==`string`?t.fetchPriority:void 0;n===`style`?a.d.S(e,typeof t.precedence==`string`?t.precedence:void 0,{crossOrigin:r,integrity:i,fetchPriority:o}):n===`script`&&a.d.X(e,{crossOrigin:r,integrity:i,fetchPriority:o,nonce:typeof t.nonce==`string`?t.nonce:void 0})}},e.preinitModule=function(e,t){if(typeof e==`string`)if(typeof t==`object`&&t){if(t.as==null||t.as===`script`){var n=l(t.as,t.crossOrigin);a.d.M(e,{crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0})}}else t??a.d.M(e)},e.preload=function(e,t){if(typeof e==`string`&&typeof t==`object`&&t&&typeof t.as==`string`){var n=t.as,r=l(n,t.crossOrigin);a.d.L(e,n,{crossOrigin:r,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,type:typeof t.type==`string`?t.type:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy==`string`?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet==`string`?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes==`string`?t.imageSizes:void 0,media:typeof t.media==`string`?t.media:void 0})}},e.preloadModule=function(e,t){if(typeof e==`string`)if(t){var n=l(t.as,t.crossOrigin);a.d.m(e,{as:typeof t.as==`string`&&t.as!==`script`?t.as:void 0,crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0})}else a.d.m(e)},e.requestFormReset=function(e){a.d.r(e)},e.unstable_batchedUpdates=function(e,t){return e(t)},e.useFormState=function(e,t,n){return c.H.useFormState(e,t,n)},e.useFormStatus=function(){return c.H.useHostTransitionStatus()},e.version=`19.2.7`})),o=e(((e,t)=>{function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>`u`||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!=`function`))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=a()})),s=e((e=>{var t=n(),r=i(),a=o();function s(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function c(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function l(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function u(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function d(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function f(e){if(l(e)!==e)throw Error(s(188))}function p(e){var t=e.alternate;if(!t){if(t=l(e),t===null)throw Error(s(188));return t===e?e:null}for(var n=e,r=t;;){var i=n.return;if(i===null)break;var a=i.alternate;if(a===null){if(r=i.return,r!==null){n=r;continue}break}if(i.child===a.child){for(a=i.child;a;){if(a===n)return f(i),e;if(a===r)return f(i),t;a=a.sibling}throw Error(s(188))}if(n.return!==r.return)n=i,r=a;else{for(var o=!1,c=i.child;c;){if(c===n){o=!0,n=i,r=a;break}if(c===r){o=!0,r=i,n=a;break}c=c.sibling}if(!o){for(c=a.child;c;){if(c===n){o=!0,n=a,r=i;break}if(c===r){o=!0,r=a,n=i;break}c=c.sibling}if(!o)throw Error(s(189))}}if(n.alternate!==r)throw Error(s(190))}if(n.tag!==3)throw Error(s(188));return n.stateNode.current===n?e:t}function m(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=m(e),t!==null)return t;e=e.sibling}return null}var h=Object.assign,g=Symbol.for(`react.element`),_=Symbol.for(`react.transitional.element`),v=Symbol.for(`react.portal`),y=Symbol.for(`react.fragment`),b=Symbol.for(`react.strict_mode`),x=Symbol.for(`react.profiler`),ee=Symbol.for(`react.consumer`),S=Symbol.for(`react.context`),C=Symbol.for(`react.forward_ref`),te=Symbol.for(`react.suspense`),ne=Symbol.for(`react.suspense_list`),re=Symbol.for(`react.memo`),w=Symbol.for(`react.lazy`),ie=Symbol.for(`react.activity`),ae=Symbol.for(`react.memo_cache_sentinel`),oe=Symbol.iterator;function se(e){return typeof e!=`object`||!e?null:(e=oe&&e[oe]||e[`@@iterator`],typeof e==`function`?e:null)}var ce=Symbol.for(`react.client.reference`);function le(e){if(e==null)return null;if(typeof e==`function`)return e.$$typeof===ce?null:e.displayName||e.name||null;if(typeof e==`string`)return e;switch(e){case y:return`Fragment`;case x:return`Profiler`;case b:return`StrictMode`;case te:return`Suspense`;case ne:return`SuspenseList`;case ie:return`Activity`}if(typeof e==`object`)switch(e.$$typeof){case v:return`Portal`;case S:return e.displayName||`Context`;case ee:return(e._context.displayName||`Context`)+`.Consumer`;case C:var t=e.render;return e=e.displayName,e||=(e=t.displayName||t.name||``,e===``?`ForwardRef`:`ForwardRef(`+e+`)`),e;case re:return t=e.displayName||null,t===null?le(e.type)||`Memo`:t;case w:t=e._payload,e=e._init;try{return le(e(t))}catch{}}return null}var ue=Array.isArray,T=r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,E=a.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,de={pending:!1,data:null,method:null,action:null},fe=[],D=-1;function pe(e){return{current:e}}function O(e){0>D||(e.current=fe[D],fe[D]=null,D--)}function k(e,t){D++,fe[D]=e.current,e.current=t}var me=pe(null),he=pe(null),ge=pe(null),_e=pe(null);function ve(e,t){switch(k(ge,t),k(he,e),k(me,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?Vd(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=Vd(t),e=Hd(t,e);else switch(e){case`svg`:e=1;break;case`math`:e=2;break;default:e=0}}O(me),k(me,e)}function ye(){O(me),O(he),O(ge)}function be(e){e.memoizedState!==null&&k(_e,e);var t=me.current,n=Hd(t,e.type);t!==n&&(k(he,e),k(me,n))}function xe(e){he.current===e&&(O(me),O(he)),_e.current===e&&(O(_e),Qf._currentValue=de)}var Se,Ce;function we(e){if(Se===void 0)try{throw Error()}catch(e){var t=e.stack.trim().match(/\n( *(at )?)/);Se=t&&t[1]||``,Ce=-1<e.stack.indexOf(`
    at`)?` (<anonymous>)`:-1<e.stack.indexOf(`@`)?`@unknown:0:0`:``}return`
`+Se+e+Ce}var Te=!1;function Ee(e,t){if(!e||Te)return``;Te=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var r={DetermineComponentFrameRoot:function(){try{if(t){var n=function(){throw Error()};if(Object.defineProperty(n.prototype,"props",{set:function(){throw Error()}}),typeof Reflect==`object`&&Reflect.construct){try{Reflect.construct(n,[])}catch(e){var r=e}Reflect.construct(e,[],n)}else{try{n.call()}catch(e){r=e}e.call(n.prototype)}}else{try{throw Error()}catch(e){r=e}(n=e())&&typeof n.catch==`function`&&n.catch(function(){})}}catch(e){if(e&&r&&typeof e.stack==`string`)return[e.stack,r.stack]}return[null,null]}};r.DetermineComponentFrameRoot.displayName=`DetermineComponentFrameRoot`;var i=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,`name`);i&&i.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,"name",{value:`DetermineComponentFrameRoot`});var a=r.DetermineComponentFrameRoot(),o=a[0],s=a[1];if(o&&s){var c=o.split(`
`),l=s.split(`
`);for(i=r=0;r<c.length&&!c[r].includes(`DetermineComponentFrameRoot`);)r++;for(;i<l.length&&!l[i].includes(`DetermineComponentFrameRoot`);)i++;if(r===c.length||i===l.length)for(r=c.length-1,i=l.length-1;1<=r&&0<=i&&c[r]!==l[i];)i--;for(;1<=r&&0<=i;r--,i--)if(c[r]!==l[i]){if(r!==1||i!==1)do if(r--,i--,0>i||c[r]!==l[i]){var u=`
`+c[r].replace(` at new `,` at `);return e.displayName&&u.includes(`<anonymous>`)&&(u=u.replace(`<anonymous>`,e.displayName)),u}while(1<=r&&0<=i);break}}}finally{Te=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:``)?we(n):``}function De(e,t){switch(e.tag){case 26:case 27:case 5:return we(e.type);case 16:return we(`Lazy`);case 13:return e.child!==t&&t!==null?we(`Suspense Fallback`):we(`Suspense`);case 19:return we(`SuspenseList`);case 0:case 15:return Ee(e.type,!1);case 11:return Ee(e.type.render,!1);case 1:return Ee(e.type,!0);case 31:return we(`Activity`);default:return``}}function Oe(e){try{var t=``,n=null;do t+=De(e,n),n=e,e=e.return;while(e);return t}catch(e){return`
Error generating stack: `+e.message+`
`+e.stack}}var ke=Object.prototype.hasOwnProperty,Ae=t.unstable_scheduleCallback,je=t.unstable_cancelCallback,Me=t.unstable_shouldYield,Ne=t.unstable_requestPaint,Pe=t.unstable_now,Fe=t.unstable_getCurrentPriorityLevel,Ie=t.unstable_ImmediatePriority,Le=t.unstable_UserBlockingPriority,Re=t.unstable_NormalPriority,A=t.unstable_LowPriority,ze=t.unstable_IdlePriority,Be=t.log,Ve=t.unstable_setDisableYieldValue,He=null,Ue=null;function We(e){if(typeof Be==`function`&&Ve(e),Ue&&typeof Ue.setStrictMode==`function`)try{Ue.setStrictMode(He,e)}catch{}}var Ge=Math.clz32?Math.clz32:Je,Ke=Math.log,qe=Math.LN2;function Je(e){return e>>>=0,e===0?32:31-(Ke(e)/qe|0)|0}var Ye=256,Xe=262144,Ze=4194304;function Qe(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function $e(e,t,n){var r=e.pendingLanes;if(r===0)return 0;var i=0,a=e.suspendedLanes,o=e.pingedLanes;e=e.warmLanes;var s=r&134217727;return s===0?(s=r&~a,s===0?o===0?n||(n=r&~e,n!==0&&(i=Qe(n))):i=Qe(o):i=Qe(s)):(r=s&~a,r===0?(o&=s,o===0?n||(n=s&~e,n!==0&&(i=Qe(n))):i=Qe(o)):i=Qe(r)),i===0?0:t!==0&&t!==i&&(t&a)===0&&(a=i&-i,n=t&-t,a>=n||a===32&&n&4194048)?t:i}function et(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function tt(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function nt(){var e=Ze;return Ze<<=1,!(Ze&62914560)&&(Ze=4194304),e}function rt(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function it(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function at(e,t,n,r,i,a){var o=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var s=e.entanglements,c=e.expirationTimes,l=e.hiddenUpdates;for(n=o&~n;0<n;){var u=31-Ge(n),d=1<<u;s[u]=0,c[u]=-1;var f=l[u];if(f!==null)for(l[u]=null,u=0;u<f.length;u++){var p=f[u];p!==null&&(p.lane&=-536870913)}n&=~d}r!==0&&ot(e,r,0),a!==0&&i===0&&e.tag!==0&&(e.suspendedLanes|=a&~(o&~t))}function ot(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var r=31-Ge(t);e.entangledLanes|=t,e.entanglements[r]=e.entanglements[r]|1073741824|n&261930}function st(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-Ge(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}function ct(e,t){var n=t&-t;return n=n&42?1:lt(n),(n&(e.suspendedLanes|t))===0?n:0}function lt(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function ut(e){return e&=-e,2<e?8<e?e&134217727?32:268435456:8:2}function dt(){var e=E.p;return e===0?(e=window.event,e===void 0?32:mp(e.type)):e}function ft(e,t){var n=E.p;try{return E.p=e,t()}finally{E.p=n}}var pt=Math.random().toString(36).slice(2),mt=`__reactFiber$`+pt,ht=`__reactProps$`+pt,gt=`__reactContainer$`+pt,_t=`__reactEvents$`+pt,vt=`__reactListeners$`+pt,yt=`__reactHandles$`+pt,bt=`__reactResources$`+pt,xt=`__reactMarker$`+pt;function St(e){delete e[mt],delete e[ht],delete e[_t],delete e[vt],delete e[yt]}function Ct(e){var t=e[mt];if(t)return t;for(var n=e.parentNode;n;){if(t=n[gt]||n[mt]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=df(e);e!==null;){if(n=e[mt])return n;e=df(e)}return t}e=n,n=e.parentNode}return null}function wt(e){if(e=e[mt]||e[gt]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function Tt(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(s(33))}function Et(e){var t=e[bt];return t||=e[bt]={hoistableStyles:new Map,hoistableScripts:new Map},t}function Dt(e){e[xt]=!0}var Ot=new Set,kt={};function At(e,t){jt(e,t),jt(e+`Capture`,t)}function jt(e,t){for(kt[e]=t,e=0;e<t.length;e++)Ot.add(t[e])}var Mt=RegExp(`^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$`),Nt={},Pt={};function Ft(e){return ke.call(Pt,e)?!0:ke.call(Nt,e)?!1:Mt.test(e)?Pt[e]=!0:(Nt[e]=!0,!1)}function It(e,t,n){if(Ft(t))if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:e.removeAttribute(t);return;case`boolean`:var r=t.toLowerCase().slice(0,5);if(r!==`data-`&&r!==`aria-`){e.removeAttribute(t);return}}e.setAttribute(t,``+n)}}function Lt(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(t);return}e.setAttribute(t,``+n)}}function Rt(e,t,n,r){if(r===null)e.removeAttribute(n);else{switch(typeof r){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(n);return}e.setAttributeNS(t,n,``+r)}}function zt(e){switch(typeof e){case`bigint`:case`boolean`:case`number`:case`string`:case`undefined`:return e;case`object`:return e;default:return``}}function Bt(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()===`input`&&(t===`checkbox`||t===`radio`)}function Vt(e,t,n){var r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&r!==void 0&&typeof r.get==`function`&&typeof r.set==`function`){var i=r.get,a=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(e){n=``+e,a.call(this,e)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return n},setValue:function(e){n=``+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Ht(e){if(!e._valueTracker){var t=Bt(e)?`checked`:`value`;e._valueTracker=Vt(e,t,``+e[t])}}function Ut(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r=``;return e&&(r=Bt(e)?e.checked?`true`:`false`:e.value),e=r,e===n?!1:(t.setValue(e),!0)}function Wt(e){if(e||=typeof document<`u`?document:void 0,e===void 0)return null;try{return e.activeElement||e.body}catch{return e.body}}var Gt=/[\n"\\]/g;function Kt(e){return e.replace(Gt,function(e){return`\\`+e.charCodeAt(0).toString(16)+` `})}function qt(e,t,n,r,i,a,o,s){e.name=``,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`?e.type=o:e.removeAttribute(`type`),t==null?o!==`submit`&&o!==`reset`||e.removeAttribute(`value`):o===`number`?(t===0&&e.value===``||e.value!=t)&&(e.value=``+zt(t)):e.value!==``+zt(t)&&(e.value=``+zt(t)),t==null?n==null?r!=null&&e.removeAttribute(`value`):Yt(e,o,zt(n)):Yt(e,o,zt(t)),i==null&&a!=null&&(e.defaultChecked=!!a),i!=null&&(e.checked=i&&typeof i!=`function`&&typeof i!=`symbol`),s!=null&&typeof s!=`function`&&typeof s!=`symbol`&&typeof s!=`boolean`?e.name=``+zt(s):e.removeAttribute(`name`)}function Jt(e,t,n,r,i,a,o,s){if(a!=null&&typeof a!=`function`&&typeof a!=`symbol`&&typeof a!=`boolean`&&(e.type=a),t!=null||n!=null){if(!(a!==`submit`&&a!==`reset`||t!=null)){Ht(e);return}n=n==null?``:``+zt(n),t=t==null?n:``+zt(t),s||t===e.value||(e.value=t),e.defaultValue=t}r??=i,r=typeof r!=`function`&&typeof r!=`symbol`&&!!r,e.checked=s?e.checked:!!r,e.defaultChecked=!!r,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`&&(e.name=o),Ht(e)}function Yt(e,t,n){t===`number`&&Wt(e.ownerDocument)===e||e.defaultValue===``+n||(e.defaultValue=``+n)}function Xt(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t[`$`+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty(`$`+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=``+zt(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function Zt(e,t,n){if(t!=null&&(t=``+zt(t),t!==e.value&&(e.value=t),n==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=n==null?``:``+zt(n)}function Qt(e,t,n,r){if(t==null){if(r!=null){if(n!=null)throw Error(s(92));if(ue(r)){if(1<r.length)throw Error(s(93));r=r[0]}n=r}n??=``,t=n}n=zt(t),e.defaultValue=n,r=e.textContent,r===n&&r!==``&&r!==null&&(e.value=r),Ht(e)}function $t(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var en=new Set(`animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp`.split(` `));function tn(e,t,n){var r=t.indexOf(`--`)===0;n==null||typeof n==`boolean`||n===``?r?e.setProperty(t,``):t===`float`?e.cssFloat=``:e[t]=``:r?e.setProperty(t,n):typeof n!=`number`||n===0||en.has(t)?t===`float`?e.cssFloat=n:e[t]=(``+n).trim():e[t]=n+`px`}function nn(e,t,n){if(t!=null&&typeof t!=`object`)throw Error(s(62));if(e=e.style,n!=null){for(var r in n)!n.hasOwnProperty(r)||t!=null&&t.hasOwnProperty(r)||(r.indexOf(`--`)===0?e.setProperty(r,``):r===`float`?e.cssFloat=``:e[r]=``);for(var i in t)r=t[i],t.hasOwnProperty(i)&&n[i]!==r&&tn(e,i,r)}else for(var a in t)t.hasOwnProperty(a)&&tn(e,a,t[a])}function rn(e){if(e.indexOf(`-`)===-1)return!1;switch(e){case`annotation-xml`:case`color-profile`:case`font-face`:case`font-face-src`:case`font-face-uri`:case`font-face-format`:case`font-face-name`:case`missing-glyph`:return!1;default:return!0}}var an=new Map([[`acceptCharset`,`accept-charset`],[`htmlFor`,`for`],[`httpEquiv`,`http-equiv`],[`crossOrigin`,`crossorigin`],[`accentHeight`,`accent-height`],[`alignmentBaseline`,`alignment-baseline`],[`arabicForm`,`arabic-form`],[`baselineShift`,`baseline-shift`],[`capHeight`,`cap-height`],[`clipPath`,`clip-path`],[`clipRule`,`clip-rule`],[`colorInterpolation`,`color-interpolation`],[`colorInterpolationFilters`,`color-interpolation-filters`],[`colorProfile`,`color-profile`],[`colorRendering`,`color-rendering`],[`dominantBaseline`,`dominant-baseline`],[`enableBackground`,`enable-background`],[`fillOpacity`,`fill-opacity`],[`fillRule`,`fill-rule`],[`floodColor`,`flood-color`],[`floodOpacity`,`flood-opacity`],[`fontFamily`,`font-family`],[`fontSize`,`font-size`],[`fontSizeAdjust`,`font-size-adjust`],[`fontStretch`,`font-stretch`],[`fontStyle`,`font-style`],[`fontVariant`,`font-variant`],[`fontWeight`,`font-weight`],[`glyphName`,`glyph-name`],[`glyphOrientationHorizontal`,`glyph-orientation-horizontal`],[`glyphOrientationVertical`,`glyph-orientation-vertical`],[`horizAdvX`,`horiz-adv-x`],[`horizOriginX`,`horiz-origin-x`],[`imageRendering`,`image-rendering`],[`letterSpacing`,`letter-spacing`],[`lightingColor`,`lighting-color`],[`markerEnd`,`marker-end`],[`markerMid`,`marker-mid`],[`markerStart`,`marker-start`],[`overlinePosition`,`overline-position`],[`overlineThickness`,`overline-thickness`],[`paintOrder`,`paint-order`],[`panose-1`,`panose-1`],[`pointerEvents`,`pointer-events`],[`renderingIntent`,`rendering-intent`],[`shapeRendering`,`shape-rendering`],[`stopColor`,`stop-color`],[`stopOpacity`,`stop-opacity`],[`strikethroughPosition`,`strikethrough-position`],[`strikethroughThickness`,`strikethrough-thickness`],[`strokeDasharray`,`stroke-dasharray`],[`strokeDashoffset`,`stroke-dashoffset`],[`strokeLinecap`,`stroke-linecap`],[`strokeLinejoin`,`stroke-linejoin`],[`strokeMiterlimit`,`stroke-miterlimit`],[`strokeOpacity`,`stroke-opacity`],[`strokeWidth`,`stroke-width`],[`textAnchor`,`text-anchor`],[`textDecoration`,`text-decoration`],[`textRendering`,`text-rendering`],[`transformOrigin`,`transform-origin`],[`underlinePosition`,`underline-position`],[`underlineThickness`,`underline-thickness`],[`unicodeBidi`,`unicode-bidi`],[`unicodeRange`,`unicode-range`],[`unitsPerEm`,`units-per-em`],[`vAlphabetic`,`v-alphabetic`],[`vHanging`,`v-hanging`],[`vIdeographic`,`v-ideographic`],[`vMathematical`,`v-mathematical`],[`vectorEffect`,`vector-effect`],[`vertAdvY`,`vert-adv-y`],[`vertOriginX`,`vert-origin-x`],[`vertOriginY`,`vert-origin-y`],[`wordSpacing`,`word-spacing`],[`writingMode`,`writing-mode`],[`xmlnsXlink`,`xmlns:xlink`],[`xHeight`,`x-height`]]),on=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function sn(e){return on.test(``+e)?`javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')`:e}function cn(){}var ln=null;function un(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var dn=null,fn=null;function pn(e){var t=wt(e);if(t&&(e=t.stateNode)){var n=e[ht]||null;a:switch(e=t.stateNode,t.type){case`input`:if(qt(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type===`radio`&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll(`input[name="`+Kt(``+t)+`"][type="radio"]`),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var i=r[ht]||null;if(!i)throw Error(s(90));qt(r,i.value,i.defaultValue,i.defaultValue,i.checked,i.defaultChecked,i.type,i.name)}}for(t=0;t<n.length;t++)r=n[t],r.form===e.form&&Ut(r)}break a;case`textarea`:Zt(e,n.value,n.defaultValue);break a;case`select`:t=n.value,t!=null&&Xt(e,!!n.multiple,t,!1)}}}var mn=!1;function hn(e,t,n){if(mn)return e(t,n);mn=!0;try{return e(t)}finally{if(mn=!1,(dn!==null||fn!==null)&&(bu(),dn&&(t=dn,e=fn,fn=dn=null,pn(t),e)))for(t=0;t<e.length;t++)pn(e[t])}}function gn(e,t){var n=e.stateNode;if(n===null)return null;var r=n[ht]||null;if(r===null)return null;n=r[t];a:switch(t){case`onClick`:case`onClickCapture`:case`onDoubleClick`:case`onDoubleClickCapture`:case`onMouseDown`:case`onMouseDownCapture`:case`onMouseMove`:case`onMouseMoveCapture`:case`onMouseUp`:case`onMouseUpCapture`:case`onMouseEnter`:(r=!r.disabled)||(e=e.type,r=!(e===`button`||e===`input`||e===`select`||e===`textarea`)),e=!r;break a;default:e=!1}if(e)return null;if(n&&typeof n!=`function`)throw Error(s(231,t,typeof n));return n}var _n=!(typeof window>`u`||window.document===void 0||window.document.createElement===void 0),vn=!1;if(_n)try{var yn={};Object.defineProperty(yn,"passive",{get:function(){vn=!0}}),window.addEventListener(`test`,yn,yn),window.removeEventListener(`test`,yn,yn)}catch{vn=!1}var bn=null,xn=null,Sn=null;function Cn(){if(Sn)return Sn;var e,t=xn,n=t.length,r,i=`value`in bn?bn.value:bn.textContent,a=i.length;for(e=0;e<n&&t[e]===i[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===i[a-r];r++);return Sn=i.slice(e,1<r?1-r:void 0)}function wn(e){var t=e.keyCode;return`charCode`in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Tn(){return!0}function En(){return!1}function Dn(e){function t(t,n,r,i,a){for(var o in this._reactName=t,this._targetInst=r,this.type=n,this.nativeEvent=i,this.target=a,this.currentTarget=null,e)e.hasOwnProperty(o)&&(t=e[o],this[o]=t?t(i):i[o]);return this.isDefaultPrevented=(i.defaultPrevented==null?!1===i.returnValue:i.defaultPrevented)?Tn:En,this.isPropagationStopped=En,this}return h(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():typeof e.returnValue!=`unknown`&&(e.returnValue=!1),this.isDefaultPrevented=Tn)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():typeof e.cancelBubble!=`unknown`&&(e.cancelBubble=!0),this.isPropagationStopped=Tn)},persist:function(){},isPersistent:Tn}),t}var On={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},kn=Dn(On),An=h({},On,{view:0,detail:0}),jn=Dn(An),Mn,Nn,Pn,Fn=h({},An,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Kn,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return`movementX`in e?e.movementX:(e!==Pn&&(Pn&&e.type===`mousemove`?(Mn=e.screenX-Pn.screenX,Nn=e.screenY-Pn.screenY):Nn=Mn=0,Pn=e),Mn)},movementY:function(e){return`movementY`in e?e.movementY:Nn}}),In=Dn(Fn),Ln=Dn(h({},Fn,{dataTransfer:0})),Rn=Dn(h({},An,{relatedTarget:0})),zn=Dn(h({},On,{animationName:0,elapsedTime:0,pseudoElement:0})),Bn=Dn(h({},On,{clipboardData:function(e){return`clipboardData`in e?e.clipboardData:window.clipboardData}})),Vn=Dn(h({},On,{data:0})),Hn={Esc:`Escape`,Spacebar:` `,Left:`ArrowLeft`,Up:`ArrowUp`,Right:`ArrowRight`,Down:`ArrowDown`,Del:`Delete`,Win:`OS`,Menu:`ContextMenu`,Apps:`ContextMenu`,Scroll:`ScrollLock`,MozPrintableKey:`Unidentified`},Un={8:`Backspace`,9:`Tab`,12:`Clear`,13:`Enter`,16:`Shift`,17:`Control`,18:`Alt`,19:`Pause`,20:`CapsLock`,27:`Escape`,32:` `,33:`PageUp`,34:`PageDown`,35:`End`,36:`Home`,37:`ArrowLeft`,38:`ArrowUp`,39:`ArrowRight`,40:`ArrowDown`,45:`Insert`,46:`Delete`,112:`F1`,113:`F2`,114:`F3`,115:`F4`,116:`F5`,117:`F6`,118:`F7`,119:`F8`,120:`F9`,121:`F10`,122:`F11`,123:`F12`,144:`NumLock`,145:`ScrollLock`,224:`Meta`},Wn={Alt:`altKey`,Control:`ctrlKey`,Meta:`metaKey`,Shift:`shiftKey`};function Gn(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Wn[e])?!!t[e]:!1}function Kn(){return Gn}var qn=Dn(h({},An,{key:function(e){if(e.key){var t=Hn[e.key]||e.key;if(t!==`Unidentified`)return t}return e.type===`keypress`?(e=wn(e),e===13?`Enter`:String.fromCharCode(e)):e.type===`keydown`||e.type===`keyup`?Un[e.keyCode]||`Unidentified`:``},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Kn,charCode:function(e){return e.type===`keypress`?wn(e):0},keyCode:function(e){return e.type===`keydown`||e.type===`keyup`?e.keyCode:0},which:function(e){return e.type===`keypress`?wn(e):e.type===`keydown`||e.type===`keyup`?e.keyCode:0}})),Jn=Dn(h({},Fn,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),Yn=Dn(h({},An,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Kn})),Xn=Dn(h({},On,{propertyName:0,elapsedTime:0,pseudoElement:0})),Zn=Dn(h({},Fn,{deltaX:function(e){return`deltaX`in e?e.deltaX:`wheelDeltaX`in e?-e.wheelDeltaX:0},deltaY:function(e){return`deltaY`in e?e.deltaY:`wheelDeltaY`in e?-e.wheelDeltaY:`wheelDelta`in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0})),Qn=Dn(h({},On,{newState:0,oldState:0})),$n=[9,13,27,32],er=_n&&`CompositionEvent`in window,tr=null;_n&&`documentMode`in document&&(tr=document.documentMode);var nr=_n&&`TextEvent`in window&&!tr,rr=_n&&(!er||tr&&8<tr&&11>=tr),ir=` `,ar=!1;function or(e,t){switch(e){case`keyup`:return $n.indexOf(t.keyCode)!==-1;case`keydown`:return t.keyCode!==229;case`keypress`:case`mousedown`:case`focusout`:return!0;default:return!1}}function sr(e){return e=e.detail,typeof e==`object`&&`data`in e?e.data:null}var cr=!1;function lr(e,t){switch(e){case`compositionend`:return sr(t);case`keypress`:return t.which===32?(ar=!0,ir):null;case`textInput`:return e=t.data,e===ir&&ar?null:e;default:return null}}function ur(e,t){if(cr)return e===`compositionend`||!er&&or(e,t)?(e=Cn(),Sn=xn=bn=null,cr=!1,e):null;switch(e){case`paste`:return null;case`keypress`:if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case`compositionend`:return rr&&t.locale!==`ko`?null:t.data;default:return null}}var dr={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function fr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t===`input`?!!dr[e.type]:t===`textarea`}function pr(e,t,n,r){dn?fn?fn.push(r):fn=[r]:dn=r,t=Ed(t,`onChange`),0<t.length&&(n=new kn(`onChange`,`change`,null,n,r),e.push({event:n,listeners:t}))}var mr=null,hr=null;function gr(e){yd(e,0)}function _r(e){if(Ut(Tt(e)))return e}function vr(e,t){if(e===`change`)return t}var yr=!1;if(_n){var br;if(_n){var xr=`oninput`in document;if(!xr){var Sr=document.createElement(`div`);Sr.setAttribute(`oninput`,`return;`),xr=typeof Sr.oninput==`function`}br=xr}else br=!1;yr=br&&(!document.documentMode||9<document.documentMode)}function Cr(){mr&&(mr.detachEvent(`onpropertychange`,wr),hr=mr=null)}function wr(e){if(e.propertyName===`value`&&_r(hr)){var t=[];pr(t,hr,e,un(e)),hn(gr,t)}}function Tr(e,t,n){e===`focusin`?(Cr(),mr=t,hr=n,mr.attachEvent(`onpropertychange`,wr)):e===`focusout`&&Cr()}function Er(e){if(e===`selectionchange`||e===`keyup`||e===`keydown`)return _r(hr)}function Dr(e,t){if(e===`click`)return _r(t)}function Or(e,t){if(e===`input`||e===`change`)return _r(t)}function kr(e,t){return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t}var Ar=typeof Object.is==`function`?Object.is:kr;function jr(e,t){if(Ar(e,t))return!0;if(typeof e!=`object`||!e||typeof t!=`object`||!t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!ke.call(t,i)||!Ar(e[i],t[i]))return!1}return!0}function Mr(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Nr(e,t){var n=Mr(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}a:{for(;n;){if(n.nextSibling){n=n.nextSibling;break a}n=n.parentNode}n=void 0}n=Mr(n)}}function Pr(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Pr(e,t.parentNode):`contains`in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Fr(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=Wt(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href==`string`}catch{n=!1}if(n)e=t.contentWindow;else break;t=Wt(e.document)}return t}function Ir(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t===`input`&&(e.type===`text`||e.type===`search`||e.type===`tel`||e.type===`url`||e.type===`password`)||t===`textarea`||e.contentEditable===`true`)}var Lr=_n&&`documentMode`in document&&11>=document.documentMode,Rr=null,zr=null,Br=null,Vr=!1;function Hr(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Vr||Rr==null||Rr!==Wt(r)||(r=Rr,`selectionStart`in r&&Ir(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Br&&jr(Br,r)||(Br=r,r=Ed(zr,`onSelect`),0<r.length&&(t=new kn(`onSelect`,`select`,null,t,n),e.push({event:t,listeners:r}),t.target=Rr)))}function Ur(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n[`Webkit`+e]=`webkit`+t,n[`Moz`+e]=`moz`+t,n}var Wr={animationend:Ur(`Animation`,`AnimationEnd`),animationiteration:Ur(`Animation`,`AnimationIteration`),animationstart:Ur(`Animation`,`AnimationStart`),transitionrun:Ur(`Transition`,`TransitionRun`),transitionstart:Ur(`Transition`,`TransitionStart`),transitioncancel:Ur(`Transition`,`TransitionCancel`),transitionend:Ur(`Transition`,`TransitionEnd`)},Gr={},Kr={};_n&&(Kr=document.createElement(`div`).style,`AnimationEvent`in window||(delete Wr.animationend.animation,delete Wr.animationiteration.animation,delete Wr.animationstart.animation),`TransitionEvent`in window||delete Wr.transitionend.transition);function qr(e){if(Gr[e])return Gr[e];if(!Wr[e])return e;var t=Wr[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Kr)return Gr[e]=t[n];return e}var Jr=qr(`animationend`),Yr=qr(`animationiteration`),Xr=qr(`animationstart`),Zr=qr(`transitionrun`),Qr=qr(`transitionstart`),$r=qr(`transitioncancel`),ei=qr(`transitionend`),ti=new Map,ni=`abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel`.split(` `);ni.push(`scrollEnd`);function ri(e,t){ti.set(e,t),At(t,[e])}var ii=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},ai=[],oi=0,si=0;function ci(){for(var e=oi,t=si=oi=0;t<e;){var n=ai[t];ai[t++]=null;var r=ai[t];ai[t++]=null;var i=ai[t];ai[t++]=null;var a=ai[t];if(ai[t++]=null,r!==null&&i!==null){var o=r.pending;o===null?i.next=i:(i.next=o.next,o.next=i),r.pending=i}a!==0&&fi(n,i,a)}}function li(e,t,n,r){ai[oi++]=e,ai[oi++]=t,ai[oi++]=n,ai[oi++]=r,si|=r,e.lanes|=r,e=e.alternate,e!==null&&(e.lanes|=r)}function ui(e,t,n,r){return li(e,t,n,r),pi(e)}function di(e,t){return li(e,null,null,t),pi(e)}function fi(e,t,n){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n);for(var i=!1,a=e.return;a!==null;)a.childLanes|=n,r=a.alternate,r!==null&&(r.childLanes|=n),a.tag===22&&(e=a.stateNode,e===null||e._visibility&1||(i=!0)),e=a,a=a.return;return e.tag===3?(a=e.stateNode,i&&t!==null&&(i=31-Ge(n),e=a.hiddenUpdates,r=e[i],r===null?e[i]=[t]:r.push(t),t.lane=n|536870912),a):null}function pi(e){if(50<du)throw du=0,fu=null,Error(s(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var mi={};function hi(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function gi(e,t,n,r){return new hi(e,t,n,r)}function _i(e){return e=e.prototype,!(!e||!e.isReactComponent)}function vi(e,t){var n=e.alternate;return n===null?(n=gi(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&65011712,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function yi(e,t){e.flags&=65011714;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function bi(e,t,n,r,i,a){var o=0;if(r=e,typeof e==`function`)_i(e)&&(o=1);else if(typeof e==`string`)o=Uf(e,n,me.current)?26:e===`html`||e===`head`||e===`body`?27:5;else a:switch(e){case ie:return e=gi(31,n,t,i),e.elementType=ie,e.lanes=a,e;case y:return xi(n.children,i,a,t);case b:o=8,i|=24;break;case x:return e=gi(12,n,t,i|2),e.elementType=x,e.lanes=a,e;case te:return e=gi(13,n,t,i),e.elementType=te,e.lanes=a,e;case ne:return e=gi(19,n,t,i),e.elementType=ne,e.lanes=a,e;default:if(typeof e==`object`&&e)switch(e.$$typeof){case S:o=10;break a;case ee:o=9;break a;case C:o=11;break a;case re:o=14;break a;case w:o=16,r=null;break a}o=29,n=Error(s(130,e===null?`null`:typeof e,``)),r=null}return t=gi(o,n,t,i),t.elementType=e,t.type=r,t.lanes=a,t}function xi(e,t,n,r){return e=gi(7,e,r,t),e.lanes=n,e}function Si(e,t,n){return e=gi(6,e,null,t),e.lanes=n,e}function Ci(e){var t=gi(18,null,null,0);return t.stateNode=e,t}function wi(e,t,n){return t=gi(4,e.children===null?[]:e.children,e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var Ti=new WeakMap;function Ei(e,t){if(typeof e==`object`&&e){var n=Ti.get(e);return n===void 0?(t={value:e,source:t,stack:Oe(t)},Ti.set(e,t),t):n}return{value:e,source:t,stack:Oe(t)}}var Di=[],Oi=0,ki=null,Ai=0,ji=[],Mi=0,Ni=null,Pi=1,Fi=``;function Ii(e,t){Di[Oi++]=Ai,Di[Oi++]=ki,ki=e,Ai=t}function Li(e,t,n){ji[Mi++]=Pi,ji[Mi++]=Fi,ji[Mi++]=Ni,Ni=e;var r=Pi;e=Fi;var i=32-Ge(r)-1;r&=~(1<<i),n+=1;var a=32-Ge(t)+i;if(30<a){var o=i-i%5;a=(r&(1<<o)-1).toString(32),r>>=o,i-=o,Pi=1<<32-Ge(t)+i|n<<i|r,Fi=a+e}else Pi=1<<a|n<<i|r,Fi=e}function Ri(e){e.return!==null&&(Ii(e,1),Li(e,1,0))}function zi(e){for(;e===ki;)ki=Di[--Oi],Di[Oi]=null,Ai=Di[--Oi],Di[Oi]=null;for(;e===Ni;)Ni=ji[--Mi],ji[Mi]=null,Fi=ji[--Mi],ji[Mi]=null,Pi=ji[--Mi],ji[Mi]=null}function Bi(e,t){ji[Mi++]=Pi,ji[Mi++]=Fi,ji[Mi++]=Ni,Pi=t.id,Fi=t.overflow,Ni=e}var Vi=null,j=null,M=!1,Hi=null,Ui=!1,Wi=Error(s(519));function Gi(e){throw Zi(Ei(Error(s(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?`text`:`HTML`,``)),e)),Wi}function Ki(e){var t=e.stateNode,n=e.type,r=e.memoizedProps;switch(t[mt]=e,t[ht]=r,n){case`dialog`:Q(`cancel`,t),Q(`close`,t);break;case`iframe`:case`object`:case`embed`:Q(`load`,t);break;case`video`:case`audio`:for(n=0;n<_d.length;n++)Q(_d[n],t);break;case`source`:Q(`error`,t);break;case`img`:case`image`:case`link`:Q(`error`,t),Q(`load`,t);break;case`details`:Q(`toggle`,t);break;case`input`:Q(`invalid`,t),Jt(t,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0);break;case`select`:Q(`invalid`,t);break;case`textarea`:Q(`invalid`,t),Qt(t,r.value,r.defaultValue,r.children)}n=r.children,typeof n!=`string`&&typeof n!=`number`&&typeof n!=`bigint`||t.textContent===``+n||!0===r.suppressHydrationWarning||Md(t.textContent,n)?(r.popover!=null&&(Q(`beforetoggle`,t),Q(`toggle`,t)),r.onScroll!=null&&Q(`scroll`,t),r.onScrollEnd!=null&&Q(`scrollend`,t),r.onClick!=null&&(t.onclick=cn),t=!0):t=!1,t||Gi(e,!0)}function qi(e){for(Vi=e.return;Vi;)switch(Vi.tag){case 5:case 31:case 13:Ui=!1;return;case 27:case 3:Ui=!0;return;default:Vi=Vi.return}}function Ji(e){if(e!==Vi)return!1;if(!M)return qi(e),M=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=!(n!==`form`&&n!==`button`)||Ud(e.type,e.memoizedProps)),n=!n),n&&j&&Gi(e),qi(e),t===13){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(s(317));j=uf(e)}else if(t===31){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(s(317));j=uf(e)}else t===27?(t=j,Zd(e.type)?(e=lf,lf=null,j=e):j=t):j=Vi?cf(e.stateNode.nextSibling):null;return!0}function Yi(){j=Vi=null,M=!1}function Xi(){var e=Hi;return e!==null&&(Ql===null?Ql=e:Ql.push.apply(Ql,e),Hi=null),e}function Zi(e){Hi===null?Hi=[e]:Hi.push(e)}var Qi=pe(null),$i=null,ea=null;function ta(e,t,n){k(Qi,t._currentValue),t._currentValue=n}function na(e){e._currentValue=Qi.current,O(Qi)}function ra(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)===t?r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t):(e.childLanes|=t,r!==null&&(r.childLanes|=t)),e===n)break;e=e.return}}function ia(e,t,n,r){var i=e.child;for(i!==null&&(i.return=e);i!==null;){var a=i.dependencies;if(a!==null){var o=i.child;a=a.firstContext;a:for(;a!==null;){var c=a;a=i;for(var l=0;l<t.length;l++)if(c.context===t[l]){a.lanes|=n,c=a.alternate,c!==null&&(c.lanes|=n),ra(a.return,n,e),r||(o=null);break a}a=c.next}}else if(i.tag===18){if(o=i.return,o===null)throw Error(s(341));o.lanes|=n,a=o.alternate,a!==null&&(a.lanes|=n),ra(o,n,e),o=null}else o=i.child;if(o!==null)o.return=i;else for(o=i;o!==null;){if(o===e){o=null;break}if(i=o.sibling,i!==null){i.return=o.return,o=i;break}o=o.return}i=o}}function aa(e,t,n,r){e=null;for(var i=t,a=!1;i!==null;){if(!a){if(i.flags&524288)a=!0;else if(i.flags&262144)break}if(i.tag===10){var o=i.alternate;if(o===null)throw Error(s(387));if(o=o.memoizedProps,o!==null){var c=i.type;Ar(i.pendingProps.value,o.value)||(e===null?e=[c]:e.push(c))}}else if(i===_e.current){if(o=i.alternate,o===null)throw Error(s(387));o.memoizedState.memoizedState!==i.memoizedState.memoizedState&&(e===null?e=[Qf]:e.push(Qf))}i=i.return}e!==null&&ia(t,e,n,r),t.flags|=262144}function oa(e){for(e=e.firstContext;e!==null;){if(!Ar(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function sa(e){$i=e,ea=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function ca(e){return ua($i,e)}function la(e,t){return $i===null&&sa(e),ua(e,t)}function ua(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},ea===null){if(e===null)throw Error(s(308));ea=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else ea=ea.next=t;return n}var da=typeof AbortController<`u`?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(t,n){e.push(n)}};this.abort=function(){t.aborted=!0,e.forEach(function(e){return e()})}},fa=t.unstable_scheduleCallback,pa=t.unstable_NormalPriority,N={$$typeof:S,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function ma(){return{controller:new da,data:new Map,refCount:0}}function ha(e){e.refCount--,e.refCount===0&&fa(pa,function(){e.controller.abort()})}var ga=null,_a=0,va=0,ya=null;function ba(e,t){if(ga===null){var n=ga=[];_a=0,va=dd(),ya={status:`pending`,value:void 0,then:function(e){n.push(e)}}}return _a++,t.then(xa,xa),t}function xa(){if(--_a===0&&ga!==null){ya!==null&&(ya.status=`fulfilled`);var e=ga;ga=null,va=0,ya=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function Sa(e,t){var n=[],r={status:`pending`,value:null,reason:null,then:function(e){n.push(e)}};return e.then(function(){r.status=`fulfilled`,r.value=t;for(var e=0;e<n.length;e++)(0,n[e])(t)},function(e){for(r.status=`rejected`,r.reason=e,e=0;e<n.length;e++)(0,n[e])(void 0)}),r}var Ca=T.S;T.S=function(e,t){tu=Pe(),typeof t==`object`&&t&&typeof t.then==`function`&&ba(e,t),Ca!==null&&Ca(e,t)};var wa=pe(null);function Ta(){var e=wa.current;return e===null?G.pooledCache:e}function Ea(e,t){t===null?k(wa,wa.current):k(wa,t.pool)}function Da(){var e=Ta();return e===null?null:{parent:N._currentValue,pool:e}}var Oa=Error(s(460)),ka=Error(s(474)),Aa=Error(s(542)),ja={then:function(){}};function Ma(e){return e=e.status,e===`fulfilled`||e===`rejected`}function Na(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(cn,cn),t=n),t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,La(e),e;default:if(typeof t.status==`string`)t.then(cn,cn);else{if(e=G,e!==null&&100<e.shellSuspendCounter)throw Error(s(482));e=t,e.status=`pending`,e.then(function(e){if(t.status===`pending`){var n=t;n.status=`fulfilled`,n.value=e}},function(e){if(t.status===`pending`){var n=t;n.status=`rejected`,n.reason=e}})}switch(t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,La(e),e}throw Fa=t,Oa}}function Pa(e){try{var t=e._init;return t(e._payload)}catch(e){throw typeof e==`object`&&e&&typeof e.then==`function`?(Fa=e,Oa):e}}var Fa=null;function Ia(){if(Fa===null)throw Error(s(459));var e=Fa;return Fa=null,e}function La(e){if(e===Oa||e===Aa)throw Error(s(483))}var Ra=null,za=0;function Ba(e){var t=za;return za+=1,Ra===null&&(Ra=[]),Na(Ra,e,t)}function Va(e,t){t=t.props.ref,e.ref=t===void 0?null:t}function Ha(e,t){throw t.$$typeof===g?Error(s(525)):(e=Object.prototype.toString.call(t),Error(s(31,e===`[object Object]`?`object with keys {`+Object.keys(t).join(`, `)+`}`:e)))}function Ua(e){function t(t,n){if(e){var r=t.deletions;r===null?(t.deletions=[n],t.flags|=16):r.push(n)}}function n(n,r){if(!e)return null;for(;r!==null;)t(n,r),r=r.sibling;return null}function r(e){for(var t=new Map;e!==null;)e.key===null?t.set(e.index,e):t.set(e.key,e),e=e.sibling;return t}function i(e,t){return e=vi(e,t),e.index=0,e.sibling=null,e}function a(t,n,r){return t.index=r,e?(r=t.alternate,r===null?(t.flags|=67108866,n):(r=r.index,r<n?(t.flags|=67108866,n):r)):(t.flags|=1048576,n)}function o(t){return e&&t.alternate===null&&(t.flags|=67108866),t}function c(e,t,n,r){return t===null||t.tag!==6?(t=Si(n,e.mode,r),t.return=e,t):(t=i(t,n),t.return=e,t)}function l(e,t,n,r){var a=n.type;return a===y?d(e,t,n.props.children,r,n.key):t!==null&&(t.elementType===a||typeof a==`object`&&a&&a.$$typeof===w&&Pa(a)===t.type)?(t=i(t,n.props),Va(t,n),t.return=e,t):(t=bi(n.type,n.key,n.props,null,e.mode,r),Va(t,n),t.return=e,t)}function u(e,t,n,r){return t===null||t.tag!==4||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?(t=wi(n,e.mode,r),t.return=e,t):(t=i(t,n.children||[]),t.return=e,t)}function d(e,t,n,r,a){return t===null||t.tag!==7?(t=xi(n,e.mode,r,a),t.return=e,t):(t=i(t,n),t.return=e,t)}function f(e,t,n){if(typeof t==`string`&&t!==``||typeof t==`number`||typeof t==`bigint`)return t=Si(``+t,e.mode,n),t.return=e,t;if(typeof t==`object`&&t){switch(t.$$typeof){case _:return n=bi(t.type,t.key,t.props,null,e.mode,n),Va(n,t),n.return=e,n;case v:return t=wi(t,e.mode,n),t.return=e,t;case w:return t=Pa(t),f(e,t,n)}if(ue(t)||se(t))return t=xi(t,e.mode,n,null),t.return=e,t;if(typeof t.then==`function`)return f(e,Ba(t),n);if(t.$$typeof===S)return f(e,la(e,t),n);Ha(e,t)}return null}function p(e,t,n,r){var i=t===null?null:t.key;if(typeof n==`string`&&n!==``||typeof n==`number`||typeof n==`bigint`)return i===null?c(e,t,``+n,r):null;if(typeof n==`object`&&n){switch(n.$$typeof){case _:return n.key===i?l(e,t,n,r):null;case v:return n.key===i?u(e,t,n,r):null;case w:return n=Pa(n),p(e,t,n,r)}if(ue(n)||se(n))return i===null?d(e,t,n,r,null):null;if(typeof n.then==`function`)return p(e,t,Ba(n),r);if(n.$$typeof===S)return p(e,t,la(e,n),r);Ha(e,n)}return null}function m(e,t,n,r,i){if(typeof r==`string`&&r!==``||typeof r==`number`||typeof r==`bigint`)return e=e.get(n)||null,c(t,e,``+r,i);if(typeof r==`object`&&r){switch(r.$$typeof){case _:return e=e.get(r.key===null?n:r.key)||null,l(t,e,r,i);case v:return e=e.get(r.key===null?n:r.key)||null,u(t,e,r,i);case w:return r=Pa(r),m(e,t,n,r,i)}if(ue(r)||se(r))return e=e.get(n)||null,d(t,e,r,i,null);if(typeof r.then==`function`)return m(e,t,n,Ba(r),i);if(r.$$typeof===S)return m(e,t,n,la(t,r),i);Ha(t,r)}return null}function h(i,o,s,c){for(var l=null,u=null,d=o,h=o=0,g=null;d!==null&&h<s.length;h++){d.index>h?(g=d,d=null):g=d.sibling;var _=p(i,d,s[h],c);if(_===null){d===null&&(d=g);break}e&&d&&_.alternate===null&&t(i,d),o=a(_,o,h),u===null?l=_:u.sibling=_,u=_,d=g}if(h===s.length)return n(i,d),M&&Ii(i,h),l;if(d===null){for(;h<s.length;h++)d=f(i,s[h],c),d!==null&&(o=a(d,o,h),u===null?l=d:u.sibling=d,u=d);return M&&Ii(i,h),l}for(d=r(d);h<s.length;h++)g=m(d,i,h,s[h],c),g!==null&&(e&&g.alternate!==null&&d.delete(g.key===null?h:g.key),o=a(g,o,h),u===null?l=g:u.sibling=g,u=g);return e&&d.forEach(function(e){return t(i,e)}),M&&Ii(i,h),l}function g(i,o,c,l){if(c==null)throw Error(s(151));for(var u=null,d=null,h=o,g=o=0,_=null,v=c.next();h!==null&&!v.done;g++,v=c.next()){h.index>g?(_=h,h=null):_=h.sibling;var y=p(i,h,v.value,l);if(y===null){h===null&&(h=_);break}e&&h&&y.alternate===null&&t(i,h),o=a(y,o,g),d===null?u=y:d.sibling=y,d=y,h=_}if(v.done)return n(i,h),M&&Ii(i,g),u;if(h===null){for(;!v.done;g++,v=c.next())v=f(i,v.value,l),v!==null&&(o=a(v,o,g),d===null?u=v:d.sibling=v,d=v);return M&&Ii(i,g),u}for(h=r(h);!v.done;g++,v=c.next())v=m(h,i,g,v.value,l),v!==null&&(e&&v.alternate!==null&&h.delete(v.key===null?g:v.key),o=a(v,o,g),d===null?u=v:d.sibling=v,d=v);return e&&h.forEach(function(e){return t(i,e)}),M&&Ii(i,g),u}function b(e,r,a,c){if(typeof a==`object`&&a&&a.type===y&&a.key===null&&(a=a.props.children),typeof a==`object`&&a){switch(a.$$typeof){case _:a:{for(var l=a.key;r!==null;){if(r.key===l){if(l=a.type,l===y){if(r.tag===7){n(e,r.sibling),c=i(r,a.props.children),c.return=e,e=c;break a}}else if(r.elementType===l||typeof l==`object`&&l&&l.$$typeof===w&&Pa(l)===r.type){n(e,r.sibling),c=i(r,a.props),Va(c,a),c.return=e,e=c;break a}n(e,r);break}else t(e,r);r=r.sibling}a.type===y?(c=xi(a.props.children,e.mode,c,a.key),c.return=e,e=c):(c=bi(a.type,a.key,a.props,null,e.mode,c),Va(c,a),c.return=e,e=c)}return o(e);case v:a:{for(l=a.key;r!==null;){if(r.key===l)if(r.tag===4&&r.stateNode.containerInfo===a.containerInfo&&r.stateNode.implementation===a.implementation){n(e,r.sibling),c=i(r,a.children||[]),c.return=e,e=c;break a}else{n(e,r);break}else t(e,r);r=r.sibling}c=wi(a,e.mode,c),c.return=e,e=c}return o(e);case w:return a=Pa(a),b(e,r,a,c)}if(ue(a))return h(e,r,a,c);if(se(a)){if(l=se(a),typeof l!=`function`)throw Error(s(150));return a=l.call(a),g(e,r,a,c)}if(typeof a.then==`function`)return b(e,r,Ba(a),c);if(a.$$typeof===S)return b(e,r,la(e,a),c);Ha(e,a)}return typeof a==`string`&&a!==``||typeof a==`number`||typeof a==`bigint`?(a=``+a,r!==null&&r.tag===6?(n(e,r.sibling),c=i(r,a),c.return=e,e=c):(n(e,r),c=Si(a,e.mode,c),c.return=e,e=c),o(e)):n(e,r)}return function(e,t,n,r){try{za=0;var i=b(e,t,n,r);return Ra=null,i}catch(t){if(t===Oa||t===Aa)throw t;var a=gi(29,t,null,e.mode);return a.lanes=r,a.return=e,a}}}var Wa=Ua(!0),Ga=Ua(!1),Ka=!1;function qa(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Ja(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Ya(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Xa(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,W&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,t=pi(e),fi(e,null,n),t}return li(e,r,t,n),pi(e)}function Za(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,n&4194048)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,st(e,n)}}function Qa(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var o={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};a===null?i=a=o:a=a.next=o,n=n.next}while(n!==null);a===null?i=a=t:a=a.next=t}else i=a=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:a,shared:r.shared,callbacks:r.callbacks},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var $a=!1;function eo(){if($a){var e=ya;if(e!==null)throw e}}function to(e,t,n,r){$a=!1;var i=e.updateQueue;Ka=!1;var a=i.firstBaseUpdate,o=i.lastBaseUpdate,s=i.shared.pending;if(s!==null){i.shared.pending=null;var c=s,l=c.next;c.next=null,o===null?a=l:o.next=l,o=c;var u=e.alternate;u!==null&&(u=u.updateQueue,s=u.lastBaseUpdate,s!==o&&(s===null?u.firstBaseUpdate=l:s.next=l,u.lastBaseUpdate=c))}if(a!==null){var d=i.baseState;o=0,u=l=c=null,s=a;do{var f=s.lane&-536870913,p=f!==s.lane;if(p?(q&f)===f:(r&f)===f){f!==0&&f===va&&($a=!0),u!==null&&(u=u.next={lane:0,tag:s.tag,payload:s.payload,callback:null,next:null});a:{var m=e,g=s;f=t;var _=n;switch(g.tag){case 1:if(m=g.payload,typeof m==`function`){d=m.call(_,d,f);break a}d=m;break a;case 3:m.flags=m.flags&-65537|128;case 0:if(m=g.payload,f=typeof m==`function`?m.call(_,d,f):m,f==null)break a;d=h({},d,f);break a;case 2:Ka=!0}}f=s.callback,f!==null&&(e.flags|=64,p&&(e.flags|=8192),p=i.callbacks,p===null?i.callbacks=[f]:p.push(f))}else p={lane:f,tag:s.tag,payload:s.payload,callback:s.callback,next:null},u===null?(l=u=p,c=d):u=u.next=p,o|=f;if(s=s.next,s===null){if(s=i.shared.pending,s===null)break;p=s,s=p.next,p.next=null,i.lastBaseUpdate=p,i.shared.pending=null}}while(1);u===null&&(c=d),i.baseState=c,i.firstBaseUpdate=l,i.lastBaseUpdate=u,a===null&&(i.shared.lanes=0),Kl|=o,e.lanes=o,e.memoizedState=d}}function no(e,t){if(typeof e!=`function`)throw Error(s(191,e));e.call(t)}function ro(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)no(n[e],t)}var io=pe(null),ao=pe(0);function oo(e,t){e=Gl,k(ao,e),k(io,t),Gl=e|t.baseLanes}function so(){k(ao,Gl),k(io,io.current)}function co(){Gl=ao.current,O(io),O(ao)}var lo=pe(null),uo=null;function fo(e){var t=e.alternate;k(P,P.current&1),k(lo,e),uo===null&&(t===null||io.current!==null||t.memoizedState!==null)&&(uo=e)}function po(e){k(P,P.current),k(lo,e),uo===null&&(uo=e)}function mo(e){e.tag===22?(k(P,P.current),k(lo,e),uo===null&&(uo=e)):ho(e)}function ho(){k(P,P.current),k(lo,lo.current)}function go(e){O(lo),uo===e&&(uo=null),O(P)}var P=pe(0);function _o(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||af(n)||of(n)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder===`forwards`||t.memoizedProps.revealOrder===`backwards`||t.memoizedProps.revealOrder===`unstable_legacy-backwards`||t.memoizedProps.revealOrder===`together`)){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var vo=0,F=null,I=null,L=null,yo=!1,bo=!1,xo=!1,So=0,Co=0,wo=null,To=0;function R(){throw Error(s(321))}function Eo(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Ar(e[n],t[n]))return!1;return!0}function Do(e,t,n,r,i,a){return vo=a,F=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,T.H=e===null||e.memoizedState===null?Us:Ws,xo=!1,a=n(r,i),xo=!1,bo&&(a=ko(t,n,r,i)),Oo(e),a}function Oo(e){T.H=Hs;var t=I!==null&&I.next!==null;if(vo=0,L=I=F=null,yo=!1,Co=0,wo=null,t)throw Error(s(300));e===null||B||(e=e.dependencies,e!==null&&oa(e)&&(B=!0))}function ko(e,t,n,r){F=e;var i=0;do{if(bo&&(wo=null),Co=0,bo=!1,25<=i)throw Error(s(301));if(i+=1,L=I=null,e.updateQueue!=null){var a=e.updateQueue;a.lastEffect=null,a.events=null,a.stores=null,a.memoCache!=null&&(a.memoCache.index=0)}T.H=Gs,a=t(n,r)}while(bo);return a}function Ao(){var e=T.H,t=e.useState()[0];return t=typeof t.then==`function`?Io(t):t,e=e.useState()[0],(I===null?null:I.memoizedState)!==e&&(F.flags|=1024),t}function jo(){var e=So!==0;return So=0,e}function Mo(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function No(e){if(yo){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}yo=!1}vo=0,L=I=F=null,bo=!1,Co=So=0,wo=null}function Po(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return L===null?F.memoizedState=L=e:L=L.next=e,L}function z(){if(I===null){var e=F.alternate;e=e===null?null:e.memoizedState}else e=I.next;var t=L===null?F.memoizedState:L.next;if(t!==null)L=t,I=e;else{if(e===null)throw F.alternate===null?Error(s(467)):Error(s(310));I=e,e={memoizedState:I.memoizedState,baseState:I.baseState,baseQueue:I.baseQueue,queue:I.queue,next:null},L===null?F.memoizedState=L=e:L=L.next=e}return L}function Fo(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Io(e){var t=Co;return Co+=1,wo===null&&(wo=[]),e=Na(wo,e,t),t=F,(L===null?t.memoizedState:L.next)===null&&(t=t.alternate,T.H=t===null||t.memoizedState===null?Us:Ws),e}function Lo(e){if(typeof e==`object`&&e){if(typeof e.then==`function`)return Io(e);if(e.$$typeof===S)return ca(e)}throw Error(s(438,String(e)))}function Ro(e){var t=null,n=F.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var r=F.alternate;r!==null&&(r=r.updateQueue,r!==null&&(r=r.memoCache,r!=null&&(t={data:r.data.map(function(e){return e.slice()}),index:0})))}if(t??={data:[],index:0},n===null&&(n=Fo(),F.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),r=0;r<e;r++)n[r]=ae;return t.index++,n}function zo(e,t){return typeof t==`function`?t(e):t}function Bo(e){return Vo(z(),I,e)}function Vo(e,t,n){var r=e.queue;if(r===null)throw Error(s(311));r.lastRenderedReducer=n;var i=e.baseQueue,a=r.pending;if(a!==null){if(i!==null){var o=i.next;i.next=a.next,a.next=o}t.baseQueue=i=a,r.pending=null}if(a=e.baseState,i===null)e.memoizedState=a;else{t=i.next;var c=o=null,l=null,u=t,d=!1;do{var f=u.lane&-536870913;if(f===u.lane?(vo&f)===f:(q&f)===f){var p=u.revertLane;if(p===0)l!==null&&(l=l.next={lane:0,revertLane:0,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),f===va&&(d=!0);else if((vo&p)===p){u=u.next,p===va&&(d=!0);continue}else f={lane:0,revertLane:u.revertLane,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=f,o=a):l=l.next=f,F.lanes|=p,Kl|=p;f=u.action,xo&&n(a,f),a=u.hasEagerState?u.eagerState:n(a,f)}else p={lane:f,revertLane:u.revertLane,gesture:u.gesture,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=p,o=a):l=l.next=p,F.lanes|=f,Kl|=f;u=u.next}while(u!==null&&u!==t);if(l===null?o=a:l.next=c,!Ar(a,e.memoizedState)&&(B=!0,d&&(n=ya,n!==null)))throw n;e.memoizedState=a,e.baseState=o,e.baseQueue=l,r.lastRenderedState=a}return i===null&&(r.lanes=0),[e.memoizedState,r.dispatch]}function Ho(e){var t=z(),n=t.queue;if(n===null)throw Error(s(311));n.lastRenderedReducer=e;var r=n.dispatch,i=n.pending,a=t.memoizedState;if(i!==null){n.pending=null;var o=i=i.next;do a=e(a,o.action),o=o.next;while(o!==i);Ar(a,t.memoizedState)||(B=!0),t.memoizedState=a,t.baseQueue===null&&(t.baseState=a),n.lastRenderedState=a}return[a,r]}function Uo(e,t,n){var r=F,i=z(),a=M;if(a){if(n===void 0)throw Error(s(407));n=n()}else n=t();var o=!Ar((I||i).memoizedState,n);if(o&&(i.memoizedState=n,B=!0),i=i.queue,ms(Ko.bind(null,r,i,e),[e]),i.getSnapshot!==t||o||L!==null&&L.memoizedState.tag&1){if(r.flags|=2048,ls(9,{destroy:void 0},Go.bind(null,r,i,n,t),null),G===null)throw Error(s(349));a||vo&127||Wo(r,t,n)}return n}function Wo(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=F.updateQueue,t===null?(t=Fo(),F.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Go(e,t,n,r){t.value=n,t.getSnapshot=r,qo(t)&&Jo(e)}function Ko(e,t,n){return n(function(){qo(t)&&Jo(e)})}function qo(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Ar(e,n)}catch{return!0}}function Jo(e){var t=di(e,2);t!==null&&hu(t,e,2)}function Yo(e){var t=Po();if(typeof e==`function`){var n=e;if(e=n(),xo){We(!0);try{n()}finally{We(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:zo,lastRenderedState:e},t}function Xo(e,t,n,r){return e.baseState=n,Vo(e,I,typeof r==`function`?r:zo)}function Zo(e,t,n,r,i){if(zs(e))throw Error(s(485));if(e=t.action,e!==null){var a={payload:i,action:e,next:null,isTransition:!0,status:`pending`,value:null,reason:null,listeners:[],then:function(e){a.listeners.push(e)}};T.T===null?a.isTransition=!1:n(!0),r(a),n=t.pending,n===null?(a.next=t.pending=a,Qo(t,a)):(a.next=n.next,t.pending=n.next=a)}}function Qo(e,t){var n=t.action,r=t.payload,i=e.state;if(t.isTransition){var a=T.T,o={};T.T=o;try{var s=n(i,r),c=T.S;c!==null&&c(o,s),$o(e,t,s)}catch(n){ts(e,t,n)}finally{a!==null&&o.types!==null&&(a.types=o.types),T.T=a}}else try{a=n(i,r),$o(e,t,a)}catch(n){ts(e,t,n)}}function $o(e,t,n){typeof n==`object`&&n&&typeof n.then==`function`?n.then(function(n){es(e,t,n)},function(n){return ts(e,t,n)}):es(e,t,n)}function es(e,t,n){t.status=`fulfilled`,t.value=n,ns(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,Qo(e,n)))}function ts(e,t,n){var r=e.pending;if(e.pending=null,r!==null){r=r.next;do t.status=`rejected`,t.reason=n,ns(t),t=t.next;while(t!==r)}e.action=null}function ns(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function rs(e,t){return t}function is(e,t){if(M){var n=G.formState;if(n!==null){a:{var r=F;if(M){if(j){b:{for(var i=j,a=Ui;i.nodeType!==8;){if(!a){i=null;break b}if(i=cf(i.nextSibling),i===null){i=null;break b}}a=i.data,i=a===`F!`||a===`F`?i:null}if(i){j=cf(i.nextSibling),r=i.data===`F!`;break a}}Gi(r)}r=!1}r&&(t=n[0])}}return n=Po(),n.memoizedState=n.baseState=t,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:rs,lastRenderedState:t},n.queue=r,n=Is.bind(null,F,r),r.dispatch=n,r=Yo(!1),a=Rs.bind(null,F,!1,r.queue),r=Po(),i={state:t,dispatch:null,action:e,pending:null},r.queue=i,n=Zo.bind(null,F,i,a,n),i.dispatch=n,r.memoizedState=e,[t,n,!1]}function as(e){return os(z(),I,e)}function os(e,t,n){if(t=Vo(e,t,rs)[0],e=Bo(zo)[0],typeof t==`object`&&t&&typeof t.then==`function`)try{var r=Io(t)}catch(e){throw e===Oa?Aa:e}else r=t;t=z();var i=t.queue,a=i.dispatch;return n!==t.memoizedState&&(F.flags|=2048,ls(9,{destroy:void 0},ss.bind(null,i,n),null)),[r,a,e]}function ss(e,t){e.action=t}function cs(e){var t=z(),n=I;if(n!==null)return os(t,n,e);z(),t=t.memoizedState,n=z();var r=n.queue.dispatch;return n.memoizedState=e,[t,r,!1]}function ls(e,t,n,r){return e={tag:e,create:n,deps:r,inst:t,next:null},t=F.updateQueue,t===null&&(t=Fo(),F.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e),e}function us(){return z().memoizedState}function ds(e,t,n,r){var i=Po();F.flags|=e,i.memoizedState=ls(1|t,{destroy:void 0},n,r===void 0?null:r)}function fs(e,t,n,r){var i=z();r=r===void 0?null:r;var a=i.memoizedState.inst;I!==null&&r!==null&&Eo(r,I.memoizedState.deps)?i.memoizedState=ls(t,a,n,r):(F.flags|=e,i.memoizedState=ls(1|t,a,n,r))}function ps(e,t){ds(8390656,8,e,t)}function ms(e,t){fs(2048,8,e,t)}function hs(e){F.flags|=4;var t=F.updateQueue;if(t===null)t=Fo(),F.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function gs(e){var t=z().memoizedState;return hs({ref:t,nextImpl:e}),function(){if(W&2)throw Error(s(440));return t.impl.apply(void 0,arguments)}}function _s(e,t){return fs(4,2,e,t)}function vs(e,t){return fs(4,4,e,t)}function ys(e,t){if(typeof t==`function`){e=e();var n=t(e);return function(){typeof n==`function`?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function bs(e,t,n){n=n==null?null:n.concat([e]),fs(4,4,ys.bind(null,t,e),n)}function xs(){}function Ss(e,t){var n=z();t=t===void 0?null:t;var r=n.memoizedState;return t!==null&&Eo(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Cs(e,t){var n=z();t=t===void 0?null:t;var r=n.memoizedState;if(t!==null&&Eo(t,r[1]))return r[0];if(r=e(),xo){We(!0);try{e()}finally{We(!1)}}return n.memoizedState=[r,t],r}function ws(e,t,n){return n===void 0||vo&1073741824&&!(q&261930)?e.memoizedState=t:(e.memoizedState=n,e=mu(),F.lanes|=e,Kl|=e,n)}function Ts(e,t,n,r){return Ar(n,t)?n:io.current===null?!(vo&42)||vo&1073741824&&!(q&261930)?(B=!0,e.memoizedState=n):(e=mu(),F.lanes|=e,Kl|=e,t):(e=ws(e,n,r),Ar(e,t)||(B=!0),e)}function Es(e,t,n,r,i){var a=E.p;E.p=a!==0&&8>a?a:8;var o=T.T,s={};T.T=s,Rs(e,!1,t,n);try{var c=i(),l=T.S;l!==null&&l(s,c),typeof c==`object`&&c&&typeof c.then==`function`?Ls(e,t,Sa(c,r),pu(e)):Ls(e,t,r,pu(e))}catch(n){Ls(e,t,{then:function(){},status:`rejected`,reason:n},pu())}finally{E.p=a,o!==null&&s.types!==null&&(o.types=s.types),T.T=o}}function Ds(){}function Os(e,t,n,r){if(e.tag!==5)throw Error(s(476));var i=ks(e).queue;Es(e,i,t,de,n===null?Ds:function(){return As(e),n(r)})}function ks(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:de,baseState:de,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:zo,lastRenderedState:de},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:zo,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function As(e){var t=ks(e);t.next===null&&(t=e.alternate.memoizedState),Ls(e,t.next.queue,{},pu())}function js(){return ca(Qf)}function Ms(){return z().memoizedState}function Ns(){return z().memoizedState}function Ps(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=pu();e=Ya(n);var r=Xa(t,e,n);r!==null&&(hu(r,t,n),Za(r,t,n)),t={cache:ma()},e.payload=t;return}t=t.return}}function Fs(e,t,n){var r=pu();n={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},zs(e)?Bs(t,n):(n=ui(e,t,n,r),n!==null&&(hu(n,e,r),Vs(n,t,r)))}function Is(e,t,n){Ls(e,t,n,pu())}function Ls(e,t,n,r){var i={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(zs(e))Bs(t,i);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var o=t.lastRenderedState,s=a(o,n);if(i.hasEagerState=!0,i.eagerState=s,Ar(s,o))return li(e,t,i,0),G===null&&ci(),!1}catch{}if(n=ui(e,t,i,r),n!==null)return hu(n,e,r),Vs(n,t,r),!0}return!1}function Rs(e,t,n,r){if(r={lane:2,revertLane:dd(),gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},zs(e)){if(t)throw Error(s(479))}else t=ui(e,n,r,2),t!==null&&hu(t,e,2)}function zs(e){var t=e.alternate;return e===F||t!==null&&t===F}function Bs(e,t){bo=yo=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Vs(e,t,n){if(n&4194048){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,st(e,n)}}var Hs={readContext:ca,use:Lo,useCallback:R,useContext:R,useEffect:R,useImperativeHandle:R,useLayoutEffect:R,useInsertionEffect:R,useMemo:R,useReducer:R,useRef:R,useState:R,useDebugValue:R,useDeferredValue:R,useTransition:R,useSyncExternalStore:R,useId:R,useHostTransitionStatus:R,useFormState:R,useActionState:R,useOptimistic:R,useMemoCache:R,useCacheRefresh:R};Hs.useEffectEvent=R;var Us={readContext:ca,use:Lo,useCallback:function(e,t){return Po().memoizedState=[e,t===void 0?null:t],e},useContext:ca,useEffect:ps,useImperativeHandle:function(e,t,n){n=n==null?null:n.concat([e]),ds(4194308,4,ys.bind(null,t,e),n)},useLayoutEffect:function(e,t){return ds(4194308,4,e,t)},useInsertionEffect:function(e,t){ds(4,2,e,t)},useMemo:function(e,t){var n=Po();t=t===void 0?null:t;var r=e();if(xo){We(!0);try{e()}finally{We(!1)}}return n.memoizedState=[r,t],r},useReducer:function(e,t,n){var r=Po();if(n!==void 0){var i=n(t);if(xo){We(!0);try{n(t)}finally{We(!1)}}}else i=t;return r.memoizedState=r.baseState=i,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:i},r.queue=e,e=e.dispatch=Fs.bind(null,F,e),[r.memoizedState,e]},useRef:function(e){var t=Po();return e={current:e},t.memoizedState=e},useState:function(e){e=Yo(e);var t=e.queue,n=Is.bind(null,F,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:xs,useDeferredValue:function(e,t){return ws(Po(),e,t)},useTransition:function(){var e=Yo(!1);return e=Es.bind(null,F,e.queue,!0,!1),Po().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var r=F,i=Po();if(M){if(n===void 0)throw Error(s(407));n=n()}else{if(n=t(),G===null)throw Error(s(349));q&127||Wo(r,t,n)}i.memoizedState=n;var a={value:n,getSnapshot:t};return i.queue=a,ps(Ko.bind(null,r,a,e),[e]),r.flags|=2048,ls(9,{destroy:void 0},Go.bind(null,r,a,n,t),null),n},useId:function(){var e=Po(),t=G.identifierPrefix;if(M){var n=Fi,r=Pi;n=(r&~(1<<32-Ge(r)-1)).toString(32)+n,t=`_`+t+`R_`+n,n=So++,0<n&&(t+=`H`+n.toString(32)),t+=`_`}else n=To++,t=`_`+t+`r_`+n.toString(32)+`_`;return e.memoizedState=t},useHostTransitionStatus:js,useFormState:is,useActionState:is,useOptimistic:function(e){var t=Po();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=Rs.bind(null,F,!0,n),n.dispatch=t,[e,t]},useMemoCache:Ro,useCacheRefresh:function(){return Po().memoizedState=Ps.bind(null,F)},useEffectEvent:function(e){var t=Po(),n={impl:e};return t.memoizedState=n,function(){if(W&2)throw Error(s(440));return n.impl.apply(void 0,arguments)}}},Ws={readContext:ca,use:Lo,useCallback:Ss,useContext:ca,useEffect:ms,useImperativeHandle:bs,useInsertionEffect:_s,useLayoutEffect:vs,useMemo:Cs,useReducer:Bo,useRef:us,useState:function(){return Bo(zo)},useDebugValue:xs,useDeferredValue:function(e,t){return Ts(z(),I.memoizedState,e,t)},useTransition:function(){var e=Bo(zo)[0],t=z().memoizedState;return[typeof e==`boolean`?e:Io(e),t]},useSyncExternalStore:Uo,useId:Ms,useHostTransitionStatus:js,useFormState:as,useActionState:as,useOptimistic:function(e,t){return Xo(z(),I,e,t)},useMemoCache:Ro,useCacheRefresh:Ns};Ws.useEffectEvent=gs;var Gs={readContext:ca,use:Lo,useCallback:Ss,useContext:ca,useEffect:ms,useImperativeHandle:bs,useInsertionEffect:_s,useLayoutEffect:vs,useMemo:Cs,useReducer:Ho,useRef:us,useState:function(){return Ho(zo)},useDebugValue:xs,useDeferredValue:function(e,t){var n=z();return I===null?ws(n,e,t):Ts(n,I.memoizedState,e,t)},useTransition:function(){var e=Ho(zo)[0],t=z().memoizedState;return[typeof e==`boolean`?e:Io(e),t]},useSyncExternalStore:Uo,useId:Ms,useHostTransitionStatus:js,useFormState:cs,useActionState:cs,useOptimistic:function(e,t){var n=z();return I===null?(n.baseState=e,[e,n.queue.dispatch]):Xo(n,I,e,t)},useMemoCache:Ro,useCacheRefresh:Ns};Gs.useEffectEvent=gs;function Ks(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:h({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var qs={enqueueSetState:function(e,t,n){e=e._reactInternals;var r=pu(),i=Ya(r);i.payload=t,n!=null&&(i.callback=n),t=Xa(e,i,r),t!==null&&(hu(t,e,r),Za(t,e,r))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=pu(),i=Ya(r);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=Xa(e,i,r),t!==null&&(hu(t,e,r),Za(t,e,r))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=pu(),r=Ya(n);r.tag=2,t!=null&&(r.callback=t),t=Xa(e,r,n),t!==null&&(hu(t,e,n),Za(t,e,n))}};function Js(e,t,n,r,i,a,o){return e=e.stateNode,typeof e.shouldComponentUpdate==`function`?e.shouldComponentUpdate(r,a,o):t.prototype&&t.prototype.isPureReactComponent?!jr(n,r)||!jr(i,a):!0}function Ys(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps==`function`&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps==`function`&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&qs.enqueueReplaceState(t,t.state,null)}function Xs(e,t){var n=t;if(`ref`in t)for(var r in n={},t)r!==`ref`&&(n[r]=t[r]);if(e=e.defaultProps)for(var i in n===t&&(n=h({},n)),e)n[i]===void 0&&(n[i]=e[i]);return n}function Zs(e){ii(e)}function Qs(e){console.error(e)}function $s(e){ii(e)}function ec(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(e){setTimeout(function(){throw e})}}function tc(e,t,n){try{var r=e.onCaughtError;r(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(e){setTimeout(function(){throw e})}}function nc(e,t,n){return n=Ya(n),n.tag=3,n.payload={element:null},n.callback=function(){ec(e,t)},n}function rc(e){return e=Ya(e),e.tag=3,e}function ic(e,t,n,r){var i=n.type.getDerivedStateFromError;if(typeof i==`function`){var a=r.value;e.payload=function(){return i(a)},e.callback=function(){tc(t,n,r)}}var o=n.stateNode;o!==null&&typeof o.componentDidCatch==`function`&&(e.callback=function(){tc(t,n,r),typeof i!=`function`&&(iu===null?iu=new Set([this]):iu.add(this));var e=r.stack;this.componentDidCatch(r.value,{componentStack:e===null?``:e})})}function ac(e,t,n,r,i){if(n.flags|=32768,typeof r==`object`&&r&&typeof r.then==`function`){if(t=n.alternate,t!==null&&aa(t,n,i,!0),n=lo.current,n!==null){switch(n.tag){case 31:case 13:return uo===null?Du():n.alternate===null&&Y===0&&(Y=3),n.flags&=-257,n.flags|=65536,n.lanes=i,r===ja?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([r]):t.add(r),Gu(e,r,i)),!1;case 22:return n.flags|=65536,r===ja?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([r])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([r]):n.add(r)),Gu(e,r,i)),!1}throw Error(s(435,n.tag))}return Gu(e,r,i),Du(),!1}if(M)return t=lo.current,t===null?(r!==Wi&&(t=Error(s(423),{cause:r}),Zi(Ei(t,n))),e=e.current.alternate,e.flags|=65536,i&=-i,e.lanes|=i,r=Ei(r,n),i=nc(e.stateNode,r,i),Qa(e,i),Y!==4&&(Y=2)):(!(t.flags&65536)&&(t.flags|=256),t.flags|=65536,t.lanes=i,r!==Wi&&(e=Error(s(422),{cause:r}),Zi(Ei(e,n)))),!1;var a=Error(s(520),{cause:r});if(a=Ei(a,n),Zl===null?Zl=[a]:Zl.push(a),Y!==4&&(Y=2),t===null)return!0;r=Ei(r,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=i&-i,n.lanes|=e,e=nc(n.stateNode,r,e),Qa(n,e),!1;case 1:if(t=n.type,a=n.stateNode,!(n.flags&128)&&(typeof t.getDerivedStateFromError==`function`||a!==null&&typeof a.componentDidCatch==`function`&&(iu===null||!iu.has(a))))return n.flags|=65536,i&=-i,n.lanes|=i,i=rc(i),ic(i,e,n,r),Qa(n,i),!1}n=n.return}while(n!==null);return!1}var oc=Error(s(461)),B=!1;function sc(e,t,n,r){t.child=e===null?Ga(t,null,n,r):Wa(t,e.child,n,r)}function cc(e,t,n,r,i){n=n.render;var a=t.ref;if(`ref`in r){var o={};for(var s in r)s!==`ref`&&(o[s]=r[s])}else o=r;return sa(t),r=Do(e,t,n,o,a,i),s=jo(),e!==null&&!B?(Mo(e,t,i),Mc(e,t,i)):(M&&s&&Ri(t),t.flags|=1,sc(e,t,r,i),t.child)}function lc(e,t,n,r,i){if(e===null){var a=n.type;return typeof a==`function`&&!_i(a)&&a.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=a,uc(e,t,a,r,i)):(e=bi(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,!Nc(e,i)){var o=a.memoizedProps;if(n=n.compare,n=n===null?jr:n,n(o,r)&&e.ref===t.ref)return Mc(e,t,i)}return t.flags|=1,e=vi(a,r),e.ref=t.ref,e.return=t,t.child=e}function uc(e,t,n,r,i){if(e!==null){var a=e.memoizedProps;if(jr(a,r)&&e.ref===t.ref)if(B=!1,t.pendingProps=r=a,Nc(e,i))e.flags&131072&&(B=!0);else return t.lanes=e.lanes,Mc(e,t,i)}return vc(e,t,n,r,i)}function dc(e,t,n,r){var i=r.children,a=e===null?null:e.memoizedState;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),r.mode===`hidden`){if(t.flags&128){if(a=a===null?n:a.baseLanes|n,e!==null){for(r=t.child=e.child,i=0;r!==null;)i=i|r.lanes|r.childLanes,r=r.sibling;r=i&~a}else r=0,t.child=null;return pc(e,t,a,n,r)}if(n&536870912)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&Ea(t,a===null?null:a.cachePool),a===null?so():oo(t,a),mo(t);else return r=t.lanes=536870912,pc(e,t,a===null?n:a.baseLanes|n,n,r)}else a===null?(e!==null&&Ea(t,null),so(),ho(t)):(Ea(t,a.cachePool),oo(t,a),ho(t),t.memoizedState=null);return sc(e,t,i,n),t.child}function fc(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function pc(e,t,n,r,i){var a=Ta();return a=a===null?null:{parent:N._currentValue,pool:a},t.memoizedState={baseLanes:n,cachePool:a},e!==null&&Ea(t,null),so(),mo(t),e!==null&&aa(e,t,r,!0),t.childLanes=i,null}function mc(e,t){return t=Dc({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function hc(e,t,n){return Wa(t,e.child,null,n),e=mc(t,t.pendingProps),e.flags|=2,go(t),t.memoizedState=null,e}function gc(e,t,n){var r=t.pendingProps,i=(t.flags&128)!=0;if(t.flags&=-129,e===null){if(M){if(r.mode===`hidden`)return e=mc(t,r),t.lanes=536870912,fc(null,e);if(po(t),(e=j)?(e=rf(e,Ui),e=e!==null&&e.data===`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Ni===null?null:{id:Pi,overflow:Fi},retryLane:536870912,hydrationErrors:null},n=Ci(e),n.return=t,t.child=n,Vi=t,j=null)):e=null,e===null)throw Gi(t);return t.lanes=536870912,null}return mc(t,r)}var a=e.memoizedState;if(a!==null){var o=a.dehydrated;if(po(t),i)if(t.flags&256)t.flags&=-257,t=hc(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(s(558));else if(B||aa(e,t,n,!1),i=(n&e.childLanes)!==0,B||i){if(r=G,r!==null&&(o=ct(r,n),o!==0&&o!==a.retryLane))throw a.retryLane=o,di(e,o),hu(r,e,o),oc;Du(),t=hc(e,t,n)}else e=a.treeContext,j=cf(o.nextSibling),Vi=t,M=!0,Hi=null,Ui=!1,e!==null&&Bi(t,e),t=mc(t,r),t.flags|=4096;return t}return e=vi(e.child,{mode:r.mode,children:r.children}),e.ref=t.ref,t.child=e,e.return=t,e}function _c(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!=`function`&&typeof n!=`object`)throw Error(s(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function vc(e,t,n,r,i){return sa(t),n=Do(e,t,n,r,void 0,i),r=jo(),e!==null&&!B?(Mo(e,t,i),Mc(e,t,i)):(M&&r&&Ri(t),t.flags|=1,sc(e,t,n,i),t.child)}function yc(e,t,n,r,i,a){return sa(t),t.updateQueue=null,n=ko(t,r,n,i),Oo(e),r=jo(),e!==null&&!B?(Mo(e,t,a),Mc(e,t,a)):(M&&r&&Ri(t),t.flags|=1,sc(e,t,n,a),t.child)}function bc(e,t,n,r,i){if(sa(t),t.stateNode===null){var a=mi,o=n.contextType;typeof o==`object`&&o&&(a=ca(o)),a=new n(r,a),t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,a.updater=qs,t.stateNode=a,a._reactInternals=t,a=t.stateNode,a.props=r,a.state=t.memoizedState,a.refs={},qa(t),o=n.contextType,a.context=typeof o==`object`&&o?ca(o):mi,a.state=t.memoizedState,o=n.getDerivedStateFromProps,typeof o==`function`&&(Ks(t,n,o,r),a.state=t.memoizedState),typeof n.getDerivedStateFromProps==`function`||typeof a.getSnapshotBeforeUpdate==`function`||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(o=a.state,typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount(),o!==a.state&&qs.enqueueReplaceState(a,a.state,null),to(t,r,a,i),eo(),a.state=t.memoizedState),typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!0}else if(e===null){a=t.stateNode;var s=t.memoizedProps,c=Xs(n,s);a.props=c;var l=a.context,u=n.contextType;o=mi,typeof u==`object`&&u&&(o=ca(u));var d=n.getDerivedStateFromProps;u=typeof d==`function`||typeof a.getSnapshotBeforeUpdate==`function`,s=t.pendingProps!==s,u||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(s||l!==o)&&Ys(t,a,r,o),Ka=!1;var f=t.memoizedState;a.state=f,to(t,r,a,i),eo(),l=t.memoizedState,s||f!==l||Ka?(typeof d==`function`&&(Ks(t,n,d,r),l=t.memoizedState),(c=Ka||Js(t,n,c,r,f,l,o))?(u||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount==`function`&&(t.flags|=4194308)):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=l),a.props=r,a.state=l,a.context=o,r=c):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!1)}else{a=t.stateNode,Ja(e,t),o=t.memoizedProps,u=Xs(n,o),a.props=u,d=t.pendingProps,f=a.context,l=n.contextType,c=mi,typeof l==`object`&&l&&(c=ca(l)),s=n.getDerivedStateFromProps,(l=typeof s==`function`||typeof a.getSnapshotBeforeUpdate==`function`)||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(o!==d||f!==c)&&Ys(t,a,r,c),Ka=!1,f=t.memoizedState,a.state=f,to(t,r,a,i),eo();var p=t.memoizedState;o!==d||f!==p||Ka||e!==null&&e.dependencies!==null&&oa(e.dependencies)?(typeof s==`function`&&(Ks(t,n,s,r),p=t.memoizedState),(u=Ka||Js(t,n,u,r,f,p,c)||e!==null&&e.dependencies!==null&&oa(e.dependencies))?(l||typeof a.UNSAFE_componentWillUpdate!=`function`&&typeof a.componentWillUpdate!=`function`||(typeof a.componentWillUpdate==`function`&&a.componentWillUpdate(r,p,c),typeof a.UNSAFE_componentWillUpdate==`function`&&a.UNSAFE_componentWillUpdate(r,p,c)),typeof a.componentDidUpdate==`function`&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate==`function`&&(t.flags|=1024)):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=p),a.props=r,a.state=p,a.context=c,r=u):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),r=!1)}return a=r,_c(e,t),r=(t.flags&128)!=0,a||r?(a=t.stateNode,n=r&&typeof n.getDerivedStateFromError!=`function`?null:a.render(),t.flags|=1,e!==null&&r?(t.child=Wa(t,e.child,null,i),t.child=Wa(t,null,n,i)):sc(e,t,n,i),t.memoizedState=a.state,e=t.child):e=Mc(e,t,i),e}function xc(e,t,n,r){return Yi(),t.flags|=256,sc(e,t,n,r),t.child}var Sc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Cc(e){return{baseLanes:e,cachePool:Da()}}function wc(e,t,n){return e=e===null?0:e.childLanes&~n,t&&(e|=Yl),e}function Tc(e,t,n){var r=t.pendingProps,i=!1,a=(t.flags&128)!=0,o;if((o=a)||(o=e!==null&&e.memoizedState===null?!1:(P.current&2)!=0),o&&(i=!0,t.flags&=-129),o=(t.flags&32)!=0,t.flags&=-33,e===null){if(M){if(i?fo(t):ho(t),(e=j)?(e=rf(e,Ui),e=e!==null&&e.data!==`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Ni===null?null:{id:Pi,overflow:Fi},retryLane:536870912,hydrationErrors:null},n=Ci(e),n.return=t,t.child=n,Vi=t,j=null)):e=null,e===null)throw Gi(t);return of(e)?t.lanes=32:t.lanes=536870912,null}var c=r.children;return r=r.fallback,i?(ho(t),i=t.mode,c=Dc({mode:`hidden`,children:c},i),r=xi(r,i,n,null),c.return=t,r.return=t,c.sibling=r,t.child=c,r=t.child,r.memoizedState=Cc(n),r.childLanes=wc(e,o,n),t.memoizedState=Sc,fc(null,r)):(fo(t),Ec(t,c))}var l=e.memoizedState;if(l!==null&&(c=l.dehydrated,c!==null)){if(a)t.flags&256?(fo(t),t.flags&=-257,t=Oc(e,t,n)):t.memoizedState===null?(ho(t),c=r.fallback,i=t.mode,r=Dc({mode:`visible`,children:r.children},i),c=xi(c,i,n,null),c.flags|=2,r.return=t,c.return=t,r.sibling=c,t.child=r,Wa(t,e.child,null,n),r=t.child,r.memoizedState=Cc(n),r.childLanes=wc(e,o,n),t.memoizedState=Sc,t=fc(null,r)):(ho(t),t.child=e.child,t.flags|=128,t=null);else if(fo(t),of(c)){if(o=c.nextSibling&&c.nextSibling.dataset,o)var u=o.dgst;o=u,r=Error(s(419)),r.stack=``,r.digest=o,Zi({value:r,source:null,stack:null}),t=Oc(e,t,n)}else if(B||aa(e,t,n,!1),o=(n&e.childLanes)!==0,B||o){if(o=G,o!==null&&(r=ct(o,n),r!==0&&r!==l.retryLane))throw l.retryLane=r,di(e,r),hu(o,e,r),oc;af(c)||Du(),t=Oc(e,t,n)}else af(c)?(t.flags|=192,t.child=e.child,t=null):(e=l.treeContext,j=cf(c.nextSibling),Vi=t,M=!0,Hi=null,Ui=!1,e!==null&&Bi(t,e),t=Ec(t,r.children),t.flags|=4096);return t}return i?(ho(t),c=r.fallback,i=t.mode,l=e.child,u=l.sibling,r=vi(l,{mode:`hidden`,children:r.children}),r.subtreeFlags=l.subtreeFlags&65011712,u===null?(c=xi(c,i,n,null),c.flags|=2):c=vi(u,c),c.return=t,r.return=t,r.sibling=c,t.child=r,fc(null,r),r=t.child,c=e.child.memoizedState,c===null?c=Cc(n):(i=c.cachePool,i===null?i=Da():(l=N._currentValue,i=i.parent===l?i:{parent:l,pool:l}),c={baseLanes:c.baseLanes|n,cachePool:i}),r.memoizedState=c,r.childLanes=wc(e,o,n),t.memoizedState=Sc,fc(e.child,r)):(fo(t),n=e.child,e=n.sibling,n=vi(n,{mode:`visible`,children:r.children}),n.return=t,n.sibling=null,e!==null&&(o=t.deletions,o===null?(t.deletions=[e],t.flags|=16):o.push(e)),t.child=n,t.memoizedState=null,n)}function Ec(e,t){return t=Dc({mode:`visible`,children:t},e.mode),t.return=e,e.child=t}function Dc(e,t){return e=gi(22,e,null,t),e.lanes=0,e}function Oc(e,t,n){return Wa(t,e.child,null,n),e=Ec(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function kc(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),ra(e.return,t,n)}function Ac(e,t,n,r,i,a){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i,treeForkCount:a}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=i,o.treeForkCount=a)}function jc(e,t,n){var r=t.pendingProps,i=r.revealOrder,a=r.tail;r=r.children;var o=P.current,s=(o&2)!=0;if(s?(o=o&1|2,t.flags|=128):o&=1,k(P,o),sc(e,t,r,n),r=M?Ai:0,!s&&e!==null&&e.flags&128)a:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&kc(e,n,t);else if(e.tag===19)kc(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break a;for(;e.sibling===null;){if(e.return===null||e.return===t)break a;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(i){case`forwards`:for(n=t.child,i=null;n!==null;)e=n.alternate,e!==null&&_o(e)===null&&(i=n),n=n.sibling;n=i,n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),Ac(t,!1,i,n,a,r);break;case`backwards`:case`unstable_legacy-backwards`:for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&_o(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}Ac(t,!0,n,null,a,r);break;case`together`:Ac(t,!1,null,null,void 0,r);break;default:t.memoizedState=null}return t.child}function Mc(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Kl|=t.lanes,(n&t.childLanes)===0)if(e!==null){if(aa(e,t,n,!1),(n&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(s(153));if(t.child!==null){for(e=t.child,n=vi(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=vi(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Nc(e,t){return(e.lanes&t)===0?(e=e.dependencies,!!(e!==null&&oa(e))):!0}function Pc(e,t,n){switch(t.tag){case 3:ve(t,t.stateNode.containerInfo),ta(t,N,e.memoizedState.cache),Yi();break;case 27:case 5:be(t);break;case 4:ve(t,t.stateNode.containerInfo);break;case 10:ta(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,po(t),null;break;case 13:var r=t.memoizedState;if(r!==null)return r.dehydrated===null?(n&t.child.childLanes)===0?(fo(t),e=Mc(e,t,n),e===null?null:e.sibling):Tc(e,t,n):(fo(t),t.flags|=128,null);fo(t);break;case 19:var i=(e.flags&128)!=0;if(r=(n&t.childLanes)!==0,r||=(aa(e,t,n,!1),(n&t.childLanes)!==0),i){if(r)return jc(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),k(P,P.current),r)break;return null;case 22:return t.lanes=0,dc(e,t,n,t.pendingProps);case 24:ta(t,N,e.memoizedState.cache)}return Mc(e,t,n)}function Fc(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps)B=!0;else{if(!Nc(e,n)&&!(t.flags&128))return B=!1,Pc(e,t,n);B=!!(e.flags&131072)}else B=!1,M&&t.flags&1048576&&Li(t,Ai,t.index);switch(t.lanes=0,t.tag){case 16:a:{var r=t.pendingProps;if(e=Pa(t.elementType),t.type=e,typeof e==`function`)_i(e)?(r=Xs(e,r),t.tag=1,t=bc(null,t,e,r,n)):(t.tag=0,t=vc(null,t,e,r,n));else{if(e!=null){var i=e.$$typeof;if(i===C){t.tag=11,t=cc(null,t,e,r,n);break a}else if(i===re){t.tag=14,t=lc(null,t,e,r,n);break a}}throw t=le(e)||e,Error(s(306,t,``))}}return t;case 0:return vc(e,t,t.type,t.pendingProps,n);case 1:return r=t.type,i=Xs(r,t.pendingProps),bc(e,t,r,i,n);case 3:a:{if(ve(t,t.stateNode.containerInfo),e===null)throw Error(s(387));r=t.pendingProps;var a=t.memoizedState;i=a.element,Ja(e,t),to(t,r,null,n);var o=t.memoizedState;if(r=o.cache,ta(t,N,r),r!==a.cache&&ia(t,[N],n,!0),eo(),r=o.element,a.isDehydrated)if(a={element:r,isDehydrated:!1,cache:o.cache},t.updateQueue.baseState=a,t.memoizedState=a,t.flags&256){t=xc(e,t,r,n);break a}else if(r!==i){i=Ei(Error(s(424)),t),Zi(i),t=xc(e,t,r,n);break a}else{switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName===`HTML`?e.ownerDocument.body:e}for(j=cf(e.firstChild),Vi=t,M=!0,Hi=null,Ui=!0,n=Ga(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling}else{if(Yi(),r===i){t=Mc(e,t,n);break a}sc(e,t,r,n)}t=t.child}return t;case 26:return _c(e,t),e===null?(n=kf(t.type,null,t.pendingProps,null))?t.memoizedState=n:M||(n=t.type,e=t.pendingProps,r=Bd(ge.current).createElement(n),r[mt]=t,r[ht]=e,Pd(r,n,e),Dt(r),t.stateNode=r):t.memoizedState=kf(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return be(t),e===null&&M&&(r=t.stateNode=ff(t.type,t.pendingProps,ge.current),Vi=t,Ui=!0,i=j,Zd(t.type)?(lf=i,j=cf(r.firstChild)):j=i),sc(e,t,t.pendingProps.children,n),_c(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&M&&((i=r=j)&&(r=tf(r,t.type,t.pendingProps,Ui),r===null?i=!1:(t.stateNode=r,Vi=t,j=cf(r.firstChild),Ui=!1,i=!0)),i||Gi(t)),be(t),i=t.type,a=t.pendingProps,o=e===null?null:e.memoizedProps,r=a.children,Ud(i,a)?r=null:o!==null&&Ud(i,o)&&(t.flags|=32),t.memoizedState!==null&&(i=Do(e,t,Ao,null,null,n),Qf._currentValue=i),_c(e,t),sc(e,t,r,n),t.child;case 6:return e===null&&M&&((e=n=j)&&(n=nf(n,t.pendingProps,Ui),n===null?e=!1:(t.stateNode=n,Vi=t,j=null,e=!0)),e||Gi(t)),null;case 13:return Tc(e,t,n);case 4:return ve(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=Wa(t,null,r,n):sc(e,t,r,n),t.child;case 11:return cc(e,t,t.type,t.pendingProps,n);case 7:return sc(e,t,t.pendingProps,n),t.child;case 8:return sc(e,t,t.pendingProps.children,n),t.child;case 12:return sc(e,t,t.pendingProps.children,n),t.child;case 10:return r=t.pendingProps,ta(t,t.type,r.value),sc(e,t,r.children,n),t.child;case 9:return i=t.type._context,r=t.pendingProps.children,sa(t),i=ca(i),r=r(i),t.flags|=1,sc(e,t,r,n),t.child;case 14:return lc(e,t,t.type,t.pendingProps,n);case 15:return uc(e,t,t.type,t.pendingProps,n);case 19:return jc(e,t,n);case 31:return gc(e,t,n);case 22:return dc(e,t,n,t.pendingProps);case 24:return sa(t),r=ca(N),e===null?(i=Ta(),i===null&&(i=G,a=ma(),i.pooledCache=a,a.refCount++,a!==null&&(i.pooledCacheLanes|=n),i=a),t.memoizedState={parent:r,cache:i},qa(t),ta(t,N,i)):((e.lanes&n)!==0&&(Ja(e,t),to(t,null,null,n),eo()),i=e.memoizedState,a=t.memoizedState,i.parent===r?(r=a.cache,ta(t,N,r),r!==i.cache&&ia(t,[N],n,!0)):(i={parent:r,cache:r},t.memoizedState=i,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=i),ta(t,N,r))),sc(e,t,t.pendingProps.children,n),t.child;case 29:throw t.pendingProps}throw Error(s(156,t.tag))}function Ic(e){e.flags|=4}function Lc(e,t,n,r,i){if((t=(e.mode&32)!=0)&&(t=!1),t){if(e.flags|=16777216,(i&335544128)===i)if(e.stateNode.complete)e.flags|=8192;else if(wu())e.flags|=8192;else throw Fa=ja,ka}else e.flags&=-16777217}function Rc(e,t){if(t.type!==`stylesheet`||t.state.loading&4)e.flags&=-16777217;else if(e.flags|=16777216,!Wf(t))if(wu())e.flags|=8192;else throw Fa=ja,ka}function zc(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag===22?536870912:nt(),e.lanes|=t,Xl|=t)}function Bc(e,t){if(!M)switch(e.tailMode){case`hidden`:t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case`collapsed`:n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function V(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&65011712,r|=i.flags&65011712,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Vc(e,t,n){var r=t.pendingProps;switch(zi(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return V(t),null;case 1:return V(t),null;case 3:return n=t.stateNode,r=null,e!==null&&(r=e.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),na(N),ye(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(Ji(t)?Ic(t):e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Xi())),V(t),null;case 26:var i=t.type,a=t.memoizedState;return e===null?(Ic(t),a===null?(V(t),Lc(t,i,null,r,n)):(V(t),Rc(t,a))):a?a===e.memoizedState?(V(t),t.flags&=-16777217):(Ic(t),V(t),Rc(t,a)):(e=e.memoizedProps,e!==r&&Ic(t),V(t),Lc(t,i,e,r,n)),null;case 27:if(xe(t),n=ge.current,i=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&Ic(t);else{if(!r){if(t.stateNode===null)throw Error(s(166));return V(t),null}e=me.current,Ji(t)?Ki(t,e):(e=ff(i,r,n),t.stateNode=e,Ic(t))}return V(t),null;case 5:if(xe(t),i=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&Ic(t);else{if(!r){if(t.stateNode===null)throw Error(s(166));return V(t),null}if(a=me.current,Ji(t))Ki(t,a);else{var o=Bd(ge.current);switch(a){case 1:a=o.createElementNS(`http://www.w3.org/2000/svg`,i);break;case 2:a=o.createElementNS(`http://www.w3.org/1998/Math/MathML`,i);break;default:switch(i){case`svg`:a=o.createElementNS(`http://www.w3.org/2000/svg`,i);break;case`math`:a=o.createElementNS(`http://www.w3.org/1998/Math/MathML`,i);break;case`script`:a=o.createElement(`div`),a.innerHTML=`<script><\/script>`,a=a.removeChild(a.firstChild);break;case`select`:a=typeof r.is==`string`?o.createElement(`select`,{is:r.is}):o.createElement(`select`),r.multiple?a.multiple=!0:r.size&&(a.size=r.size);break;default:a=typeof r.is==`string`?o.createElement(i,{is:r.is}):o.createElement(i)}}a[mt]=t,a[ht]=r;a:for(o=t.child;o!==null;){if(o.tag===5||o.tag===6)a.appendChild(o.stateNode);else if(o.tag!==4&&o.tag!==27&&o.child!==null){o.child.return=o,o=o.child;continue}if(o===t)break a;for(;o.sibling===null;){if(o.return===null||o.return===t)break a;o=o.return}o.sibling.return=o.return,o=o.sibling}t.stateNode=a;a:switch(Pd(a,i,r),i){case`button`:case`input`:case`select`:case`textarea`:r=!!r.autoFocus;break a;case`img`:r=!0;break a;default:r=!1}r&&Ic(t)}}return V(t),Lc(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==r&&Ic(t);else{if(typeof r!=`string`&&t.stateNode===null)throw Error(s(166));if(e=ge.current,Ji(t)){if(e=t.stateNode,n=t.memoizedProps,r=null,i=Vi,i!==null)switch(i.tag){case 27:case 5:r=i.memoizedProps}e[mt]=t,e=!!(e.nodeValue===n||r!==null&&!0===r.suppressHydrationWarning||Md(e.nodeValue,n)),e||Gi(t,!0)}else e=Bd(e).createTextNode(r),e[mt]=t,t.stateNode=e}return V(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(r=Ji(t),n!==null){if(e===null){if(!r)throw Error(s(318));if(e=t.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(s(557));e[mt]=t}else Yi(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;V(t),e=!1}else n=Xi(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(go(t),t):(go(t),null);if(t.flags&128)throw Error(s(558))}return V(t),null;case 13:if(r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(i=Ji(t),r!==null&&r.dehydrated!==null){if(e===null){if(!i)throw Error(s(318));if(i=t.memoizedState,i=i===null?null:i.dehydrated,!i)throw Error(s(317));i[mt]=t}else Yi(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;V(t),i=!1}else i=Xi(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=i),i=!0;if(!i)return t.flags&256?(go(t),t):(go(t),null)}return go(t),t.flags&128?(t.lanes=n,t):(n=r!==null,e=e!==null&&e.memoizedState!==null,n&&(r=t.child,i=null,r.alternate!==null&&r.alternate.memoizedState!==null&&r.alternate.memoizedState.cachePool!==null&&(i=r.alternate.memoizedState.cachePool.pool),a=null,r.memoizedState!==null&&r.memoizedState.cachePool!==null&&(a=r.memoizedState.cachePool.pool),a!==i&&(r.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),zc(t,t.updateQueue),V(t),null);case 4:return ye(),e===null&&Sd(t.stateNode.containerInfo),V(t),null;case 10:return na(t.type),V(t),null;case 19:if(O(P),r=t.memoizedState,r===null)return V(t),null;if(i=(t.flags&128)!=0,a=r.rendering,a===null)if(i)Bc(r,!1);else{if(Y!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(a=_o(e),a!==null){for(t.flags|=128,Bc(r,!1),e=a.updateQueue,t.updateQueue=e,zc(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)yi(n,e),n=n.sibling;return k(P,P.current&1|2),M&&Ii(t,r.treeForkCount),t.child}e=e.sibling}r.tail!==null&&Pe()>nu&&(t.flags|=128,i=!0,Bc(r,!1),t.lanes=4194304)}else{if(!i)if(e=_o(a),e!==null){if(t.flags|=128,i=!0,e=e.updateQueue,t.updateQueue=e,zc(t,e),Bc(r,!0),r.tail===null&&r.tailMode===`hidden`&&!a.alternate&&!M)return V(t),null}else 2*Pe()-r.renderingStartTime>nu&&n!==536870912&&(t.flags|=128,i=!0,Bc(r,!1),t.lanes=4194304);r.isBackwards?(a.sibling=t.child,t.child=a):(e=r.last,e===null?t.child=a:e.sibling=a,r.last=a)}return r.tail===null?(V(t),null):(e=r.tail,r.rendering=e,r.tail=e.sibling,r.renderingStartTime=Pe(),e.sibling=null,n=P.current,k(P,i?n&1|2:n&1),M&&Ii(t,r.treeForkCount),e);case 22:case 23:return go(t),co(),r=t.memoizedState!==null,e===null?r&&(t.flags|=8192):e.memoizedState!==null!==r&&(t.flags|=8192),r?n&536870912&&!(t.flags&128)&&(V(t),t.subtreeFlags&6&&(t.flags|=8192)):V(t),n=t.updateQueue,n!==null&&zc(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),r=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(r=t.memoizedState.cachePool.pool),r!==n&&(t.flags|=2048),e!==null&&O(wa),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),na(N),V(t),null;case 25:return null;case 30:return null}throw Error(s(156,t.tag))}function Hc(e,t){switch(zi(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return na(N),ye(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return xe(t),null;case 31:if(t.memoizedState!==null){if(go(t),t.alternate===null)throw Error(s(340));Yi()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(go(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(s(340));Yi()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return O(P),null;case 4:return ye(),null;case 10:return na(t.type),null;case 22:case 23:return go(t),co(),e!==null&&O(wa),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return na(N),null;case 25:return null;default:return null}}function Uc(e,t){switch(zi(t),t.tag){case 3:na(N),ye();break;case 26:case 27:case 5:xe(t);break;case 4:ye();break;case 31:t.memoizedState!==null&&go(t);break;case 13:go(t);break;case 19:O(P);break;case 10:na(t.type);break;case 22:case 23:go(t),co(),e!==null&&O(wa);break;case 24:na(N)}}function Wc(e,t){try{var n=t.updateQueue,r=n===null?null:n.lastEffect;if(r!==null){var i=r.next;n=i;do{if((n.tag&e)===e){r=void 0;var a=n.create,o=n.inst;r=a(),o.destroy=r}n=n.next}while(n!==i)}}catch(e){Z(t,t.return,e)}}function Gc(e,t,n){try{var r=t.updateQueue,i=r===null?null:r.lastEffect;if(i!==null){var a=i.next;r=a;do{if((r.tag&e)===e){var o=r.inst,s=o.destroy;if(s!==void 0){o.destroy=void 0,i=t;var c=n,l=s;try{l()}catch(e){Z(i,c,e)}}}r=r.next}while(r!==a)}}catch(e){Z(t,t.return,e)}}function Kc(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{ro(t,n)}catch(t){Z(e,e.return,t)}}}function qc(e,t,n){n.props=Xs(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(n){Z(e,t,n)}}function Jc(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var r=e.stateNode;break;case 30:r=e.stateNode;break;default:r=e.stateNode}typeof n==`function`?e.refCleanup=n(r):n.current=r}}catch(n){Z(e,t,n)}}function Yc(e,t){var n=e.ref,r=e.refCleanup;if(n!==null)if(typeof r==`function`)try{r()}catch(n){Z(e,t,n)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n==`function`)try{n(null)}catch(n){Z(e,t,n)}else n.current=null}function Xc(e){var t=e.type,n=e.memoizedProps,r=e.stateNode;try{a:switch(t){case`button`:case`input`:case`select`:case`textarea`:n.autoFocus&&r.focus();break a;case`img`:n.src?r.src=n.src:n.srcSet&&(r.srcset=n.srcSet)}}catch(t){Z(e,e.return,t)}}function Zc(e,t,n){try{var r=e.stateNode;Fd(r,e.type,n,t),r[ht]=t}catch(t){Z(e,e.return,t)}}function Qc(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Zd(e.type)||e.tag===4}function $c(e){a:for(;;){for(;e.sibling===null;){if(e.return===null||Qc(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Zd(e.type)||e.flags&2||e.child===null||e.tag===4)continue a;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function el(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n).insertBefore(e,t):(t=n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n,t.appendChild(e),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=cn));else if(r!==4&&(r===27&&Zd(e.type)&&(n=e.stateNode,t=null),e=e.child,e!==null))for(el(e,t,n),e=e.sibling;e!==null;)el(e,t,n),e=e.sibling}function tl(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(r===27&&Zd(e.type)&&(n=e.stateNode),e=e.child,e!==null))for(tl(e,t,n),e=e.sibling;e!==null;)tl(e,t,n),e=e.sibling}function nl(e){var t=e.stateNode,n=e.memoizedProps;try{for(var r=e.type,i=t.attributes;i.length;)t.removeAttributeNode(i[0]);Pd(t,r,n),t[mt]=e,t[ht]=n}catch(t){Z(e,e.return,t)}}var rl=!1,H=!1,il=!1,al=typeof WeakSet==`function`?WeakSet:Set,ol=null;function sl(e,t){if(e=e.containerInfo,Rd=sp,e=Fr(e),Ir(e)){if(`selectionStart`in e)var n={start:e.selectionStart,end:e.selectionEnd};else a:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var i=r.anchorOffset,a=r.focusNode;r=r.focusOffset;try{n.nodeType,a.nodeType}catch{n=null;break a}var o=0,c=-1,l=-1,u=0,d=0,f=e,p=null;b:for(;;){for(var m;f!==n||i!==0&&f.nodeType!==3||(c=o+i),f!==a||r!==0&&f.nodeType!==3||(l=o+r),f.nodeType===3&&(o+=f.nodeValue.length),(m=f.firstChild)!==null;)p=f,f=m;for(;;){if(f===e)break b;if(p===n&&++u===i&&(c=o),p===a&&++d===r&&(l=o),(m=f.nextSibling)!==null)break;f=p,p=f.parentNode}f=m}n=c===-1||l===-1?null:{start:c,end:l}}else n=null}n||={start:0,end:0}}else n=null;for(zd={focusedElem:e,selectionRange:n},sp=!1,ol=t;ol!==null;)if(t=ol,e=t.child,t.subtreeFlags&1028&&e!==null)e.return=t,ol=e;else for(;ol!==null;){switch(t=ol,a=t.alternate,e=t.flags,t.tag){case 0:if(e&4&&(e=t.updateQueue,e=e===null?null:e.events,e!==null))for(n=0;n<e.length;n++)i=e[n],i.ref.impl=i.nextImpl;break;case 11:case 15:break;case 1:if(e&1024&&a!==null){e=void 0,n=t,i=a.memoizedProps,a=a.memoizedState,r=n.stateNode;try{var h=Xs(n.type,i);e=r.getSnapshotBeforeUpdate(h,a),r.__reactInternalSnapshotBeforeUpdate=e}catch(e){Z(n,n.return,e)}}break;case 3:if(e&1024){if(e=t.stateNode.containerInfo,n=e.nodeType,n===9)ef(e);else if(n===1)switch(e.nodeName){case`HEAD`:case`HTML`:case`BODY`:ef(e);break;default:e.textContent=``}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if(e&1024)throw Error(s(163))}if(e=t.sibling,e!==null){e.return=t.return,ol=e;break}ol=t.return}}function cl(e,t,n){var r=n.flags;switch(n.tag){case 0:case 11:case 15:Sl(e,n),r&4&&Wc(5,n);break;case 1:if(Sl(e,n),r&4)if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(e){Z(n,n.return,e)}else{var i=Xs(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(i,t,e.__reactInternalSnapshotBeforeUpdate)}catch(e){Z(n,n.return,e)}}r&64&&Kc(n),r&512&&Jc(n,n.return);break;case 3:if(Sl(e,n),r&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{ro(e,t)}catch(e){Z(n,n.return,e)}}break;case 27:t===null&&r&4&&nl(n);case 26:case 5:Sl(e,n),t===null&&r&4&&Xc(n),r&512&&Jc(n,n.return);break;case 12:Sl(e,n);break;case 31:Sl(e,n),r&4&&pl(e,n);break;case 13:Sl(e,n),r&4&&ml(e,n),r&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=Ju.bind(null,n),sf(e,n))));break;case 22:if(r=n.memoizedState!==null||rl,!r){t=t!==null&&t.memoizedState!==null||H,i=rl;var a=H;rl=r,(H=t)&&!a?wl(e,n,(n.subtreeFlags&8772)!=0):Sl(e,n),rl=i,H=a}break;case 30:break;default:Sl(e,n)}}function ll(e){var t=e.alternate;t!==null&&(e.alternate=null,ll(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&St(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var U=null,ul=!1;function dl(e,t,n){for(n=n.child;n!==null;)fl(e,t,n),n=n.sibling}function fl(e,t,n){if(Ue&&typeof Ue.onCommitFiberUnmount==`function`)try{Ue.onCommitFiberUnmount(He,n)}catch{}switch(n.tag){case 26:H||Yc(n,t),dl(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:H||Yc(n,t);var r=U,i=ul;Zd(n.type)&&(U=n.stateNode,ul=!1),dl(e,t,n),pf(n.stateNode),U=r,ul=i;break;case 5:H||Yc(n,t);case 6:if(r=U,i=ul,U=null,dl(e,t,n),U=r,ul=i,U!==null)if(ul)try{(U.nodeType===9?U.body:U.nodeName===`HTML`?U.ownerDocument.body:U).removeChild(n.stateNode)}catch(e){Z(n,t,e)}else try{U.removeChild(n.stateNode)}catch(e){Z(n,t,e)}break;case 18:U!==null&&(ul?(e=U,Qd(e.nodeType===9?e.body:e.nodeName===`HTML`?e.ownerDocument.body:e,n.stateNode),Np(e)):Qd(U,n.stateNode));break;case 4:r=U,i=ul,U=n.stateNode.containerInfo,ul=!0,dl(e,t,n),U=r,ul=i;break;case 0:case 11:case 14:case 15:Gc(2,n,t),H||Gc(4,n,t),dl(e,t,n);break;case 1:H||(Yc(n,t),r=n.stateNode,typeof r.componentWillUnmount==`function`&&qc(n,t,r)),dl(e,t,n);break;case 21:dl(e,t,n);break;case 22:H=(r=H)||n.memoizedState!==null,dl(e,t,n),H=r;break;default:dl(e,t,n)}}function pl(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Np(e)}catch(e){Z(t,t.return,e)}}}function ml(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Np(e)}catch(e){Z(t,t.return,e)}}function hl(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new al),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new al),t;default:throw Error(s(435,e.tag))}}function gl(e,t){var n=hl(e);t.forEach(function(t){if(!n.has(t)){n.add(t);var r=Yu.bind(null,e,t);t.then(r,r)}})}function _l(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r],a=e,o=t,c=o;a:for(;c!==null;){switch(c.tag){case 27:if(Zd(c.type)){U=c.stateNode,ul=!1;break a}break;case 5:U=c.stateNode,ul=!1;break a;case 3:case 4:U=c.stateNode.containerInfo,ul=!0;break a}c=c.return}if(U===null)throw Error(s(160));fl(a,o,i),U=null,ul=!1,a=i.alternate,a!==null&&(a.return=null),i.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)yl(t,e),t=t.sibling}var vl=null;function yl(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:_l(t,e),bl(e),r&4&&(Gc(3,e,e.return),Wc(3,e),Gc(5,e,e.return));break;case 1:_l(t,e),bl(e),r&512&&(H||n===null||Yc(n,n.return)),r&64&&rl&&(e=e.updateQueue,e!==null&&(r=e.callbacks,r!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?r:n.concat(r))));break;case 26:var i=vl;if(_l(t,e),bl(e),r&512&&(H||n===null||Yc(n,n.return)),r&4){var a=n===null?null:n.memoizedState;if(r=e.memoizedState,n===null)if(r===null)if(e.stateNode===null){a:{r=e.type,n=e.memoizedProps,i=i.ownerDocument||i;b:switch(r){case`title`:a=i.getElementsByTagName(`title`)[0],(!a||a[xt]||a[mt]||a.namespaceURI===`http://www.w3.org/2000/svg`||a.hasAttribute(`itemprop`))&&(a=i.createElement(r),i.head.insertBefore(a,i.querySelector(`head > title`))),Pd(a,r,n),a[mt]=e,Dt(a),r=a;break a;case`link`:var o=Vf(`link`,`href`,i).get(r+(n.href||``));if(o){for(var c=0;c<o.length;c++)if(a=o[c],a.getAttribute(`href`)===(n.href==null||n.href===``?null:n.href)&&a.getAttribute(`rel`)===(n.rel==null?null:n.rel)&&a.getAttribute(`title`)===(n.title==null?null:n.title)&&a.getAttribute(`crossorigin`)===(n.crossOrigin==null?null:n.crossOrigin)){o.splice(c,1);break b}}a=i.createElement(r),Pd(a,r,n),i.head.appendChild(a);break;case`meta`:if(o=Vf(`meta`,`content`,i).get(r+(n.content||``))){for(c=0;c<o.length;c++)if(a=o[c],a.getAttribute(`content`)===(n.content==null?null:``+n.content)&&a.getAttribute(`name`)===(n.name==null?null:n.name)&&a.getAttribute(`property`)===(n.property==null?null:n.property)&&a.getAttribute(`http-equiv`)===(n.httpEquiv==null?null:n.httpEquiv)&&a.getAttribute(`charset`)===(n.charSet==null?null:n.charSet)){o.splice(c,1);break b}}a=i.createElement(r),Pd(a,r,n),i.head.appendChild(a);break;default:throw Error(s(468,r))}a[mt]=e,Dt(a),r=a}e.stateNode=r}else Hf(i,e.type,e.stateNode);else e.stateNode=If(i,r,e.memoizedProps);else a===r?r===null&&e.stateNode!==null&&Zc(e,e.memoizedProps,n.memoizedProps):(a===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):a.count--,r===null?Hf(i,e.type,e.stateNode):If(i,r,e.memoizedProps))}break;case 27:_l(t,e),bl(e),r&512&&(H||n===null||Yc(n,n.return)),n!==null&&r&4&&Zc(e,e.memoizedProps,n.memoizedProps);break;case 5:if(_l(t,e),bl(e),r&512&&(H||n===null||Yc(n,n.return)),e.flags&32){i=e.stateNode;try{$t(i,``)}catch(t){Z(e,e.return,t)}}r&4&&e.stateNode!=null&&(i=e.memoizedProps,Zc(e,i,n===null?i:n.memoizedProps)),r&1024&&(il=!0);break;case 6:if(_l(t,e),bl(e),r&4){if(e.stateNode===null)throw Error(s(162));r=e.memoizedProps,n=e.stateNode;try{n.nodeValue=r}catch(t){Z(e,e.return,t)}}break;case 3:if(Bf=null,i=vl,vl=gf(t.containerInfo),_l(t,e),vl=i,bl(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Np(t.containerInfo)}catch(t){Z(e,e.return,t)}il&&(il=!1,xl(e));break;case 4:r=vl,vl=gf(e.stateNode.containerInfo),_l(t,e),bl(e),vl=r;break;case 12:_l(t,e),bl(e);break;case 31:_l(t,e),bl(e),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,gl(e,r)));break;case 13:_l(t,e),bl(e),e.child.flags&8192&&e.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&(eu=Pe()),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,gl(e,r)));break;case 22:i=e.memoizedState!==null;var l=n!==null&&n.memoizedState!==null,u=rl,d=H;if(rl=u||i,H=d||l,_l(t,e),H=d,rl=u,bl(e),r&8192)a:for(t=e.stateNode,t._visibility=i?t._visibility&-2:t._visibility|1,i&&(n===null||l||rl||H||Cl(e)),n=null,t=e;;){if(t.tag===5||t.tag===26){if(n===null){l=n=t;try{if(a=l.stateNode,i)o=a.style,typeof o.setProperty==`function`?o.setProperty(`display`,`none`,`important`):o.display=`none`;else{c=l.stateNode;var f=l.memoizedProps.style,p=f!=null&&f.hasOwnProperty(`display`)?f.display:null;c.style.display=p==null||typeof p==`boolean`?``:(``+p).trim()}}catch(e){Z(l,l.return,e)}}}else if(t.tag===6){if(n===null){l=t;try{l.stateNode.nodeValue=i?``:l.memoizedProps}catch(e){Z(l,l.return,e)}}}else if(t.tag===18){if(n===null){l=t;try{var m=l.stateNode;i?$d(m,!0):$d(l.stateNode,!1)}catch(e){Z(l,l.return,e)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break a;for(;t.sibling===null;){if(t.return===null||t.return===e)break a;n===t&&(n=null),t=t.return}n===t&&(n=null),t.sibling.return=t.return,t=t.sibling}r&4&&(r=e.updateQueue,r!==null&&(n=r.retryQueue,n!==null&&(r.retryQueue=null,gl(e,n))));break;case 19:_l(t,e),bl(e),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,gl(e,r)));break;case 30:break;case 21:break;default:_l(t,e),bl(e)}}function bl(e){var t=e.flags;if(t&2){try{for(var n,r=e.return;r!==null;){if(Qc(r)){n=r;break}r=r.return}if(n==null)throw Error(s(160));switch(n.tag){case 27:var i=n.stateNode;tl(e,$c(e),i);break;case 5:var a=n.stateNode;n.flags&32&&($t(a,``),n.flags&=-33),tl(e,$c(e),a);break;case 3:case 4:var o=n.stateNode.containerInfo;el(e,$c(e),o);break;default:throw Error(s(161))}}catch(t){Z(e,e.return,t)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function xl(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;xl(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function Sl(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)cl(e,t.alternate,t),t=t.sibling}function Cl(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:Gc(4,t,t.return),Cl(t);break;case 1:Yc(t,t.return);var n=t.stateNode;typeof n.componentWillUnmount==`function`&&qc(t,t.return,n),Cl(t);break;case 27:pf(t.stateNode);case 26:case 5:Yc(t,t.return),Cl(t);break;case 22:t.memoizedState===null&&Cl(t);break;case 30:Cl(t);break;default:Cl(t)}e=e.sibling}}function wl(e,t,n){for(n&&=(t.subtreeFlags&8772)!=0,t=t.child;t!==null;){var r=t.alternate,i=e,a=t,o=a.flags;switch(a.tag){case 0:case 11:case 15:wl(i,a,n),Wc(4,a);break;case 1:if(wl(i,a,n),r=a,i=r.stateNode,typeof i.componentDidMount==`function`)try{i.componentDidMount()}catch(e){Z(r,r.return,e)}if(r=a,i=r.updateQueue,i!==null){var s=r.stateNode;try{var c=i.shared.hiddenCallbacks;if(c!==null)for(i.shared.hiddenCallbacks=null,i=0;i<c.length;i++)no(c[i],s)}catch(e){Z(r,r.return,e)}}n&&o&64&&Kc(a),Jc(a,a.return);break;case 27:nl(a);case 26:case 5:wl(i,a,n),n&&r===null&&o&4&&Xc(a),Jc(a,a.return);break;case 12:wl(i,a,n);break;case 31:wl(i,a,n),n&&o&4&&pl(i,a);break;case 13:wl(i,a,n),n&&o&4&&ml(i,a);break;case 22:a.memoizedState===null&&wl(i,a,n),Jc(a,a.return);break;case 30:break;default:wl(i,a,n)}t=t.sibling}}function Tl(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&ha(n))}function El(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&ha(e))}function Dl(e,t,n,r){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)Ol(e,t,n,r),t=t.sibling}function Ol(e,t,n,r){var i=t.flags;switch(t.tag){case 0:case 11:case 15:Dl(e,t,n,r),i&2048&&Wc(9,t);break;case 1:Dl(e,t,n,r);break;case 3:Dl(e,t,n,r),i&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&ha(e)));break;case 12:if(i&2048){Dl(e,t,n,r),e=t.stateNode;try{var a=t.memoizedProps,o=a.id,s=a.onPostCommit;typeof s==`function`&&s(o,t.alternate===null?`mount`:`update`,e.passiveEffectDuration,-0)}catch(e){Z(t,t.return,e)}}else Dl(e,t,n,r);break;case 31:Dl(e,t,n,r);break;case 13:Dl(e,t,n,r);break;case 23:break;case 22:a=t.stateNode,o=t.alternate,t.memoizedState===null?a._visibility&2?Dl(e,t,n,r):(a._visibility|=2,kl(e,t,n,r,(t.subtreeFlags&10256)!=0||!1)):a._visibility&2?Dl(e,t,n,r):Al(e,t),i&2048&&Tl(o,t);break;case 24:Dl(e,t,n,r),i&2048&&El(t.alternate,t);break;default:Dl(e,t,n,r)}}function kl(e,t,n,r,i){for(i&&=(t.subtreeFlags&10256)!=0||!1,t=t.child;t!==null;){var a=e,o=t,s=n,c=r,l=o.flags;switch(o.tag){case 0:case 11:case 15:kl(a,o,s,c,i),Wc(8,o);break;case 23:break;case 22:var u=o.stateNode;o.memoizedState===null?(u._visibility|=2,kl(a,o,s,c,i)):u._visibility&2?kl(a,o,s,c,i):Al(a,o),i&&l&2048&&Tl(o.alternate,o);break;case 24:kl(a,o,s,c,i),i&&l&2048&&El(o.alternate,o);break;default:kl(a,o,s,c,i)}t=t.sibling}}function Al(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,r=t,i=r.flags;switch(r.tag){case 22:Al(n,r),i&2048&&Tl(r.alternate,r);break;case 24:Al(n,r),i&2048&&El(r.alternate,r);break;default:Al(n,r)}t=t.sibling}}var jl=8192;function Ml(e,t,n){if(e.subtreeFlags&jl)for(e=e.child;e!==null;)Nl(e,t,n),e=e.sibling}function Nl(e,t,n){switch(e.tag){case 26:Ml(e,t,n),e.flags&jl&&e.memoizedState!==null&&Gf(n,vl,e.memoizedState,e.memoizedProps);break;case 5:Ml(e,t,n);break;case 3:case 4:var r=vl;vl=gf(e.stateNode.containerInfo),Ml(e,t,n),vl=r;break;case 22:e.memoizedState===null&&(r=e.alternate,r!==null&&r.memoizedState!==null?(r=jl,jl=16777216,Ml(e,t,n),jl=r):Ml(e,t,n));break;default:Ml(e,t,n)}}function Pl(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Fl(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];ol=r,Rl(r,e)}Pl(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Il(e),e=e.sibling}function Il(e){switch(e.tag){case 0:case 11:case 15:Fl(e),e.flags&2048&&Gc(9,e,e.return);break;case 3:Fl(e);break;case 12:Fl(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,Ll(e)):Fl(e);break;default:Fl(e)}}function Ll(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];ol=r,Rl(r,e)}Pl(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:Gc(8,t,t.return),Ll(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,Ll(t));break;default:Ll(t)}e=e.sibling}}function Rl(e,t){for(;ol!==null;){var n=ol;switch(n.tag){case 0:case 11:case 15:Gc(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var r=n.memoizedState.cachePool.pool;r!=null&&r.refCount++}break;case 24:ha(n.memoizedState.cache)}if(r=n.child,r!==null)r.return=n,ol=r;else a:for(n=e;ol!==null;){r=ol;var i=r.sibling,a=r.return;if(ll(r),r===n){ol=null;break a}if(i!==null){i.return=a,ol=i;break a}ol=a}}}var zl={getCacheForType:function(e){var t=ca(N),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return ca(N).controller.signal}},Bl=typeof WeakMap==`function`?WeakMap:Map,W=0,G=null,K=null,q=0,J=0,Vl=null,Hl=!1,Ul=!1,Wl=!1,Gl=0,Y=0,Kl=0,ql=0,Jl=0,Yl=0,Xl=0,Zl=null,Ql=null,$l=!1,eu=0,tu=0,nu=1/0,ru=null,iu=null,X=0,au=null,ou=null,su=0,cu=0,lu=null,uu=null,du=0,fu=null;function pu(){return W&2&&q!==0?q&-q:T.T===null?dt():dd()}function mu(){if(Yl===0)if(!(q&536870912)||M){var e=Xe;Xe<<=1,!(Xe&3932160)&&(Xe=262144),Yl=e}else Yl=536870912;return e=lo.current,e!==null&&(e.flags|=32),Yl}function hu(e,t,n){(e===G&&(J===2||J===9)||e.cancelPendingCommit!==null)&&(Su(e,0),yu(e,q,Yl,!1)),it(e,n),(!(W&2)||e!==G)&&(e===G&&(!(W&2)&&(ql|=n),Y===4&&yu(e,q,Yl,!1)),rd(e))}function gu(e,t,n){if(W&6)throw Error(s(327));var r=!n&&(t&127)==0&&(t&e.expiredLanes)===0||et(e,t),i=r?Au(e,t):Ou(e,t,!0),a=r;do{if(i===0){Ul&&!r&&yu(e,t,0,!1);break}else{if(n=e.current.alternate,a&&!vu(n)){i=Ou(e,t,!1),a=!1;continue}if(i===2){if(a=t,e.errorRecoveryDisabledLanes&a)var o=0;else o=e.pendingLanes&-536870913,o=o===0?o&536870912?536870912:0:o;if(o!==0){t=o;a:{var c=e;i=Zl;var l=c.current.memoizedState.isDehydrated;if(l&&(Su(c,o).flags|=256),o=Ou(c,o,!1),o!==2){if(Wl&&!l){c.errorRecoveryDisabledLanes|=a,ql|=a,i=4;break a}a=Ql,Ql=i,a!==null&&(Ql===null?Ql=a:Ql.push.apply(Ql,a))}i=o}if(a=!1,i!==2)continue}}if(i===1){Su(e,0),yu(e,t,0,!0);break}a:{switch(r=e,a=i,a){case 0:case 1:throw Error(s(345));case 4:if((t&4194048)!==t)break;case 6:yu(r,t,Yl,!Hl);break a;case 2:Ql=null;break;case 3:case 5:break;default:throw Error(s(329))}if((t&62914560)===t&&(i=eu+300-Pe(),10<i)){if(yu(r,t,Yl,!Hl),$e(r,0,!0)!==0)break a;su=t,r.timeoutHandle=Kd(_u.bind(null,r,n,Ql,ru,$l,t,Yl,ql,Xl,Hl,a,`Throttled`,-0,0),i);break a}_u(r,n,Ql,ru,$l,t,Yl,ql,Xl,Hl,a,null,-0,0)}}break}while(1);rd(e)}function _u(e,t,n,r,i,a,o,s,c,l,u,d,f,p){if(e.timeoutHandle=-1,d=t.subtreeFlags,d&8192||(d&16785408)==16785408){d={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:cn},Nl(t,a,d);var m=(a&62914560)===a?eu-Pe():(a&4194048)===a?tu-Pe():0;if(m=qf(d,m),m!==null){su=a,e.cancelPendingCommit=m(Lu.bind(null,e,t,a,n,r,i,o,s,c,u,d,null,f,p)),yu(e,a,o,!l);return}}Lu(e,t,a,n,r,i,o,s,c)}function vu(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var r=0;r<n.length;r++){var i=n[r],a=i.getSnapshot;i=i.value;try{if(!Ar(a(),i))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function yu(e,t,n,r){t&=~Jl,t&=~ql,e.suspendedLanes|=t,e.pingedLanes&=~t,r&&(e.warmLanes|=t),r=e.expirationTimes;for(var i=t;0<i;){var a=31-Ge(i),o=1<<a;r[a]=-1,i&=~o}n!==0&&ot(e,n,t)}function bu(){return W&6?!0:(id(0,!1),!1)}function xu(){if(K!==null){if(J===0)var e=K.return;else e=K,ea=$i=null,No(e),Ra=null,za=0,e=K;for(;e!==null;)Uc(e.alternate,e),e=e.return;K=null}}function Su(e,t){var n=e.timeoutHandle;n!==-1&&(e.timeoutHandle=-1,qd(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),su=0,xu(),G=e,K=n=vi(e.current,null),q=t,J=0,Vl=null,Hl=!1,Ul=et(e,t),Wl=!1,Xl=Yl=Jl=ql=Kl=Y=0,Ql=Zl=null,$l=!1,t&8&&(t|=t&32);var r=e.entangledLanes;if(r!==0)for(e=e.entanglements,r&=t;0<r;){var i=31-Ge(r),a=1<<i;t|=e[i],r&=~a}return Gl=t,ci(),n}function Cu(e,t){F=null,T.H=Hs,t===Oa||t===Aa?(t=Ia(),J=3):t===ka?(t=Ia(),J=4):J=t===oc?8:typeof t==`object`&&t&&typeof t.then==`function`?6:1,Vl=t,K===null&&(Y=1,ec(e,Ei(t,e.current)))}function wu(){var e=lo.current;return e===null?!0:(q&4194048)===q?uo===null:(q&62914560)===q||q&536870912?e===uo:!1}function Tu(){var e=T.H;return T.H=Hs,e===null?Hs:e}function Eu(){var e=T.A;return T.A=zl,e}function Du(){Y=4,Hl||(q&4194048)!==q&&lo.current!==null||(Ul=!0),!(Kl&134217727)&&!(ql&134217727)||G===null||yu(G,q,Yl,!1)}function Ou(e,t,n){var r=W;W|=2;var i=Tu(),a=Eu();(G!==e||q!==t)&&(ru=null,Su(e,t)),t=!1;var o=Y;a:do try{if(J!==0&&K!==null){var s=K,c=Vl;switch(J){case 8:xu(),o=6;break a;case 3:case 2:case 9:case 6:lo.current===null&&(t=!0);var l=J;if(J=0,Vl=null,Pu(e,s,c,l),n&&Ul){o=0;break a}break;default:l=J,J=0,Vl=null,Pu(e,s,c,l)}}ku(),o=Y;break}catch(t){Cu(e,t)}while(1);return t&&e.shellSuspendCounter++,ea=$i=null,W=r,T.H=i,T.A=a,K===null&&(G=null,q=0,ci()),o}function ku(){for(;K!==null;)Mu(K)}function Au(e,t){var n=W;W|=2;var r=Tu(),i=Eu();G!==e||q!==t?(ru=null,nu=Pe()+500,Su(e,t)):Ul=et(e,t);a:do try{if(J!==0&&K!==null){t=K;var a=Vl;b:switch(J){case 1:J=0,Vl=null,Pu(e,t,a,1);break;case 2:case 9:if(Ma(a)){J=0,Vl=null,Nu(t);break}t=function(){J!==2&&J!==9||G!==e||(J=7),rd(e)},a.then(t,t);break a;case 3:J=7;break a;case 4:J=5;break a;case 7:Ma(a)?(J=0,Vl=null,Nu(t)):(J=0,Vl=null,Pu(e,t,a,7));break;case 5:var o=null;switch(K.tag){case 26:o=K.memoizedState;case 5:case 27:var c=K;if(o?Wf(o):c.stateNode.complete){J=0,Vl=null;var l=c.sibling;if(l!==null)K=l;else{var u=c.return;u===null?K=null:(K=u,Fu(u))}break b}}J=0,Vl=null,Pu(e,t,a,5);break;case 6:J=0,Vl=null,Pu(e,t,a,6);break;case 8:xu(),Y=6;break a;default:throw Error(s(462))}}ju();break}catch(t){Cu(e,t)}while(1);return ea=$i=null,T.H=r,T.A=i,W=n,K===null?(G=null,q=0,ci(),Y):0}function ju(){for(;K!==null&&!Me();)Mu(K)}function Mu(e){var t=Fc(e.alternate,e,Gl);e.memoizedProps=e.pendingProps,t===null?Fu(e):K=t}function Nu(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=yc(n,t,t.pendingProps,t.type,void 0,q);break;case 11:t=yc(n,t,t.pendingProps,t.type.render,t.ref,q);break;case 5:No(t);default:Uc(n,t),t=K=yi(t,Gl),t=Fc(n,t,Gl)}e.memoizedProps=e.pendingProps,t===null?Fu(e):K=t}function Pu(e,t,n,r){ea=$i=null,No(t),Ra=null,za=0;var i=t.return;try{if(ac(e,i,t,n,q)){Y=1,ec(e,Ei(n,e.current)),K=null;return}}catch(t){if(i!==null)throw K=i,t;Y=1,ec(e,Ei(n,e.current)),K=null;return}t.flags&32768?(M||r===1?e=!0:Ul||q&536870912?e=!1:(Hl=e=!0,(r===2||r===9||r===3||r===6)&&(r=lo.current,r!==null&&r.tag===13&&(r.flags|=16384))),Iu(t,e)):Fu(t)}function Fu(e){var t=e;do{if(t.flags&32768){Iu(t,Hl);return}e=t.return;var n=Vc(t.alternate,t,Gl);if(n!==null){K=n;return}if(t=t.sibling,t!==null){K=t;return}K=t=e}while(t!==null);Y===0&&(Y=5)}function Iu(e,t){do{var n=Hc(e.alternate,e);if(n!==null){n.flags&=32767,K=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){K=e;return}K=e=n}while(e!==null);Y=6,K=null}function Lu(e,t,n,r,i,a,o,c,l){e.cancelPendingCommit=null;do Hu();while(X!==0);if(W&6)throw Error(s(327));if(t!==null){if(t===e.current)throw Error(s(177));if(a=t.lanes|t.childLanes,a|=si,at(e,n,a,o,c,l),e===G&&(K=G=null,q=0),ou=t,au=e,su=n,cu=a,lu=i,uu=r,t.subtreeFlags&10256||t.flags&10256?(e.callbackNode=null,e.callbackPriority=0,Xu(Re,function(){return Uu(),null})):(e.callbackNode=null,e.callbackPriority=0),r=(t.flags&13878)!=0,t.subtreeFlags&13878||r){r=T.T,T.T=null,i=E.p,E.p=2,o=W,W|=4;try{sl(e,t,n)}finally{W=o,E.p=i,T.T=r}}X=1,Ru(),zu(),Bu()}}function Ru(){if(X===1){X=0;var e=au,t=ou,n=(t.flags&13878)!=0;if(t.subtreeFlags&13878||n){n=T.T,T.T=null;var r=E.p;E.p=2;var i=W;W|=4;try{yl(t,e);var a=zd,o=Fr(e.containerInfo),s=a.focusedElem,c=a.selectionRange;if(o!==s&&s&&s.ownerDocument&&Pr(s.ownerDocument.documentElement,s)){if(c!==null&&Ir(s)){var l=c.start,u=c.end;if(u===void 0&&(u=l),`selectionStart`in s)s.selectionStart=l,s.selectionEnd=Math.min(u,s.value.length);else{var d=s.ownerDocument||document,f=d&&d.defaultView||window;if(f.getSelection){var p=f.getSelection(),m=s.textContent.length,h=Math.min(c.start,m),g=c.end===void 0?h:Math.min(c.end,m);!p.extend&&h>g&&(o=g,g=h,h=o);var _=Nr(s,h),v=Nr(s,g);if(_&&v&&(p.rangeCount!==1||p.anchorNode!==_.node||p.anchorOffset!==_.offset||p.focusNode!==v.node||p.focusOffset!==v.offset)){var y=d.createRange();y.setStart(_.node,_.offset),p.removeAllRanges(),h>g?(p.addRange(y),p.extend(v.node,v.offset)):(y.setEnd(v.node,v.offset),p.addRange(y))}}}}for(d=[],p=s;p=p.parentNode;)p.nodeType===1&&d.push({element:p,left:p.scrollLeft,top:p.scrollTop});for(typeof s.focus==`function`&&s.focus(),s=0;s<d.length;s++){var b=d[s];b.element.scrollLeft=b.left,b.element.scrollTop=b.top}}sp=!!Rd,zd=Rd=null}finally{W=i,E.p=r,T.T=n}}e.current=t,X=2}}function zu(){if(X===2){X=0;var e=au,t=ou,n=(t.flags&8772)!=0;if(t.subtreeFlags&8772||n){n=T.T,T.T=null;var r=E.p;E.p=2;var i=W;W|=4;try{cl(e,t.alternate,t)}finally{W=i,E.p=r,T.T=n}}X=3}}function Bu(){if(X===4||X===3){X=0,Ne();var e=au,t=ou,n=su,r=uu;t.subtreeFlags&10256||t.flags&10256?X=5:(X=0,ou=au=null,Vu(e,e.pendingLanes));var i=e.pendingLanes;if(i===0&&(iu=null),ut(n),t=t.stateNode,Ue&&typeof Ue.onCommitFiberRoot==`function`)try{Ue.onCommitFiberRoot(He,t,void 0,(t.current.flags&128)==128)}catch{}if(r!==null){t=T.T,i=E.p,E.p=2,T.T=null;try{for(var a=e.onRecoverableError,o=0;o<r.length;o++){var s=r[o];a(s.value,{componentStack:s.stack})}}finally{T.T=t,E.p=i}}su&3&&Hu(),rd(e),i=e.pendingLanes,n&261930&&i&42?e===fu?du++:(du=0,fu=e):du=0,id(0,!1)}}function Vu(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,ha(t)))}function Hu(){return Ru(),zu(),Bu(),Uu()}function Uu(){if(X!==5)return!1;var e=au,t=cu;cu=0;var n=ut(su),r=T.T,i=E.p;try{E.p=32>n?32:n,T.T=null,n=lu,lu=null;var a=au,o=su;if(X=0,ou=au=null,su=0,W&6)throw Error(s(331));var c=W;if(W|=4,Il(a.current),Ol(a,a.current,o,n),W=c,id(0,!1),Ue&&typeof Ue.onPostCommitFiberRoot==`function`)try{Ue.onPostCommitFiberRoot(He,a)}catch{}return!0}finally{E.p=i,T.T=r,Vu(e,t)}}function Wu(e,t,n){t=Ei(n,t),t=nc(e.stateNode,t,2),e=Xa(e,t,2),e!==null&&(it(e,2),rd(e))}function Z(e,t,n){if(e.tag===3)Wu(e,e,n);else for(;t!==null;){if(t.tag===3){Wu(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError==`function`||typeof r.componentDidCatch==`function`&&(iu===null||!iu.has(r))){e=Ei(n,e),n=rc(2),r=Xa(t,n,2),r!==null&&(ic(n,r,t,e),it(r,2),rd(r));break}}t=t.return}}function Gu(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Bl;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(Wl=!0,i.add(n),e=Ku.bind(null,e,t,n),t.then(e,e))}function Ku(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,G===e&&(q&n)===n&&(Y===4||Y===3&&(q&62914560)===q&&300>Pe()-eu?!(W&2)&&Su(e,0):Jl|=n,Xl===q&&(Xl=0)),rd(e)}function qu(e,t){t===0&&(t=nt()),e=di(e,t),e!==null&&(it(e,t),rd(e))}function Ju(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),qu(e,n)}function Yu(e,t){var n=0;switch(e.tag){case 31:case 13:var r=e.stateNode,i=e.memoizedState;i!==null&&(n=i.retryLane);break;case 19:r=e.stateNode;break;case 22:r=e.stateNode._retryCache;break;default:throw Error(s(314))}r!==null&&r.delete(t),qu(e,n)}function Xu(e,t){return Ae(e,t)}var Zu=null,Qu=null,$u=!1,ed=!1,td=!1,nd=0;function rd(e){e!==Qu&&e.next===null&&(Qu===null?Zu=Qu=e:Qu=Qu.next=e),ed=!0,$u||($u=!0,ud())}function id(e,t){if(!td&&ed){td=!0;do for(var n=!1,r=Zu;r!==null;){if(!t)if(e!==0){var i=r.pendingLanes;if(i===0)var a=0;else{var o=r.suspendedLanes,s=r.pingedLanes;a=(1<<31-Ge(42|e)+1)-1,a&=i&~(o&~s),a=a&201326741?a&201326741|1:a?a|2:0}a!==0&&(n=!0,ld(r,a))}else a=q,a=$e(r,r===G?a:0,r.cancelPendingCommit!==null||r.timeoutHandle!==-1),!(a&3)||et(r,a)||(n=!0,ld(r,a));r=r.next}while(n);td=!1}}function ad(){od()}function od(){ed=$u=!1;var e=0;nd!==0&&Gd()&&(e=nd);for(var t=Pe(),n=null,r=Zu;r!==null;){var i=r.next,a=sd(r,t);a===0?(r.next=null,n===null?Zu=i:n.next=i,i===null&&(Qu=n)):(n=r,(e!==0||a&3)&&(ed=!0)),r=i}X!==0&&X!==5||id(e,!1),nd!==0&&(nd=0)}function sd(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,a=e.pendingLanes&-62914561;0<a;){var o=31-Ge(a),s=1<<o,c=i[o];c===-1?((s&n)===0||(s&r)!==0)&&(i[o]=tt(s,t)):c<=t&&(e.expiredLanes|=s),a&=~s}if(t=G,n=q,n=$e(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r=e.callbackNode,n===0||e===t&&(J===2||J===9)||e.cancelPendingCommit!==null)return r!==null&&r!==null&&je(r),e.callbackNode=null,e.callbackPriority=0;if(!(n&3)||et(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(r!==null&&je(r),ut(n)){case 2:case 8:n=Le;break;case 32:n=Re;break;case 268435456:n=ze;break;default:n=Re}return r=cd.bind(null,e),n=Ae(n,r),e.callbackPriority=t,e.callbackNode=n,t}return r!==null&&r!==null&&je(r),e.callbackPriority=2,e.callbackNode=null,2}function cd(e,t){if(X!==0&&X!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(Hu()&&e.callbackNode!==n)return null;var r=q;return r=$e(e,e===G?r:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r===0?null:(gu(e,r,t),sd(e,Pe()),e.callbackNode!=null&&e.callbackNode===n?cd.bind(null,e):null)}function ld(e,t){if(Hu())return null;gu(e,t,!0)}function ud(){Yd(function(){W&6?Ae(Ie,ad):od()})}function dd(){if(nd===0){var e=va;e===0&&(e=Ye,Ye<<=1,!(Ye&261888)&&(Ye=256)),nd=e}return nd}function fd(e){return e==null||typeof e==`symbol`||typeof e==`boolean`?null:typeof e==`function`?e:sn(``+e)}function pd(e,t){var n=t.ownerDocument.createElement(`input`);return n.name=t.name,n.value=t.value,e.id&&n.setAttribute(`form`,e.id),t.parentNode.insertBefore(n,t),e=new FormData(e),n.parentNode.removeChild(n),e}function md(e,t,n,r,i){if(t===`submit`&&n&&n.stateNode===i){var a=fd((i[ht]||null).action),o=r.submitter;o&&(t=(t=o[ht]||null)?fd(t.formAction):o.getAttribute(`formAction`),t!==null&&(a=t,o=null));var s=new kn(`action`,`action`,null,r,i);e.push({event:s,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if(nd!==0){var e=o?pd(i,o):new FormData(i);Os(n,{pending:!0,data:e,method:i.method,action:a},null,e)}}else typeof a==`function`&&(s.preventDefault(),e=o?pd(i,o):new FormData(i),Os(n,{pending:!0,data:e,method:i.method,action:a},a,e))},currentTarget:i}]})}}for(var hd=0;hd<ni.length;hd++){var gd=ni[hd];ri(gd.toLowerCase(),`on`+(gd[0].toUpperCase()+gd.slice(1)))}ri(Jr,`onAnimationEnd`),ri(Yr,`onAnimationIteration`),ri(Xr,`onAnimationStart`),ri(`dblclick`,`onDoubleClick`),ri(`focusin`,`onFocus`),ri(`focusout`,`onBlur`),ri(Zr,`onTransitionRun`),ri(Qr,`onTransitionStart`),ri($r,`onTransitionCancel`),ri(ei,`onTransitionEnd`),jt(`onMouseEnter`,[`mouseout`,`mouseover`]),jt(`onMouseLeave`,[`mouseout`,`mouseover`]),jt(`onPointerEnter`,[`pointerout`,`pointerover`]),jt(`onPointerLeave`,[`pointerout`,`pointerover`]),At(`onChange`,`change click focusin focusout input keydown keyup selectionchange`.split(` `)),At(`onSelect`,`focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange`.split(` `)),At(`onBeforeInput`,[`compositionend`,`keypress`,`textInput`,`paste`]),At(`onCompositionEnd`,`compositionend focusout keydown keypress keyup mousedown`.split(` `)),At(`onCompositionStart`,`compositionstart focusout keydown keypress keyup mousedown`.split(` `)),At(`onCompositionUpdate`,`compositionupdate focusout keydown keypress keyup mousedown`.split(` `));var _d=`abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting`.split(` `),vd=new Set(`beforetoggle cancel close invalid load scroll scrollend toggle`.split(` `).concat(_d));function yd(e,t){t=(t&4)!=0;for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;a:{var a=void 0;if(t)for(var o=r.length-1;0<=o;o--){var s=r[o],c=s.instance,l=s.currentTarget;if(s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){ii(e)}i.currentTarget=null,a=c}else for(o=0;o<r.length;o++){if(s=r[o],c=s.instance,l=s.currentTarget,s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){ii(e)}i.currentTarget=null,a=c}}}}function Q(e,t){var n=t[_t];n===void 0&&(n=t[_t]=new Set);var r=e+`__bubble`;n.has(r)||(Cd(t,e,2,!1),n.add(r))}function bd(e,t,n){var r=0;t&&(r|=4),Cd(n,e,r,t)}var xd=`_reactListening`+Math.random().toString(36).slice(2);function Sd(e){if(!e[xd]){e[xd]=!0,Ot.forEach(function(t){t!==`selectionchange`&&(vd.has(t)||bd(t,!1,e),bd(t,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[xd]||(t[xd]=!0,bd(`selectionchange`,!1,t))}}function Cd(e,t,n,r){switch(mp(t)){case 2:var i=cp;break;case 8:i=lp;break;default:i=up}n=i.bind(null,t,n,e),i=void 0,!vn||t!==`touchstart`&&t!==`touchmove`&&t!==`wheel`||(i=!0),r?i===void 0?e.addEventListener(t,n,!0):e.addEventListener(t,n,{capture:!0,passive:i}):i===void 0?e.addEventListener(t,n,!1):e.addEventListener(t,n,{passive:i})}function wd(e,t,n,r,i){var a=r;if(!(t&1)&&!(t&2)&&r!==null)a:for(;;){if(r===null)return;var o=r.tag;if(o===3||o===4){var s=r.stateNode.containerInfo;if(s===i)break;if(o===4)for(o=r.return;o!==null;){var c=o.tag;if((c===3||c===4)&&o.stateNode.containerInfo===i)return;o=o.return}for(;s!==null;){if(o=Ct(s),o===null)return;if(c=o.tag,c===5||c===6||c===26||c===27){r=a=o;continue a}s=s.parentNode}}r=r.return}hn(function(){var r=a,i=un(n),o=[];a:{var s=ti.get(e);if(s!==void 0){var c=kn,u=e;switch(e){case`keypress`:if(wn(n)===0)break a;case`keydown`:case`keyup`:c=qn;break;case`focusin`:u=`focus`,c=Rn;break;case`focusout`:u=`blur`,c=Rn;break;case`beforeblur`:case`afterblur`:c=Rn;break;case`click`:if(n.button===2)break a;case`auxclick`:case`dblclick`:case`mousedown`:case`mousemove`:case`mouseup`:case`mouseout`:case`mouseover`:case`contextmenu`:c=In;break;case`drag`:case`dragend`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`dragstart`:case`drop`:c=Ln;break;case`touchcancel`:case`touchend`:case`touchmove`:case`touchstart`:c=Yn;break;case Jr:case Yr:case Xr:c=zn;break;case ei:c=Xn;break;case`scroll`:case`scrollend`:c=jn;break;case`wheel`:c=Zn;break;case`copy`:case`cut`:case`paste`:c=Bn;break;case`gotpointercapture`:case`lostpointercapture`:case`pointercancel`:case`pointerdown`:case`pointermove`:case`pointerout`:case`pointerover`:case`pointerup`:c=Jn;break;case`toggle`:case`beforetoggle`:c=Qn}var d=(t&4)!=0,f=!d&&(e===`scroll`||e===`scrollend`),p=d?s===null?null:s+`Capture`:s;d=[];for(var m=r,h;m!==null;){var g=m;if(h=g.stateNode,g=g.tag,g!==5&&g!==26&&g!==27||h===null||p===null||(g=gn(m,p),g!=null&&d.push(Td(m,g,h))),f)break;m=m.return}0<d.length&&(s=new c(s,u,null,n,i),o.push({event:s,listeners:d}))}}if(!(t&7)){a:{if(s=e===`mouseover`||e===`pointerover`,c=e===`mouseout`||e===`pointerout`,s&&n!==ln&&(u=n.relatedTarget||n.fromElement)&&(Ct(u)||u[gt]))break a;if((c||s)&&(s=i.window===i?i:(s=i.ownerDocument)?s.defaultView||s.parentWindow:window,c?(u=n.relatedTarget||n.toElement,c=r,u=u?Ct(u):null,u!==null&&(f=l(u),d=u.tag,u!==f||d!==5&&d!==27&&d!==6)&&(u=null)):(c=null,u=r),c!==u)){if(d=In,g=`onMouseLeave`,p=`onMouseEnter`,m=`mouse`,(e===`pointerout`||e===`pointerover`)&&(d=Jn,g=`onPointerLeave`,p=`onPointerEnter`,m=`pointer`),f=c==null?s:Tt(c),h=u==null?s:Tt(u),s=new d(g,m+`leave`,c,n,i),s.target=f,s.relatedTarget=h,g=null,Ct(i)===r&&(d=new d(p,m+`enter`,u,n,i),d.target=h,d.relatedTarget=f,g=d),f=g,c&&u)b:{for(d=Dd,p=c,m=u,h=0,g=p;g;g=d(g))h++;g=0;for(var _=m;_;_=d(_))g++;for(;0<h-g;)p=d(p),h--;for(;0<g-h;)m=d(m),g--;for(;h--;){if(p===m||m!==null&&p===m.alternate){d=p;break b}p=d(p),m=d(m)}d=null}else d=null;c!==null&&Od(o,s,c,d,!1),u!==null&&f!==null&&Od(o,f,u,d,!0)}}a:{if(s=r?Tt(r):window,c=s.nodeName&&s.nodeName.toLowerCase(),c===`select`||c===`input`&&s.type===`file`)var v=vr;else if(fr(s))if(yr)v=Or;else{v=Er;var y=Tr}else c=s.nodeName,!c||c.toLowerCase()!==`input`||s.type!==`checkbox`&&s.type!==`radio`?r&&rn(r.elementType)&&(v=vr):v=Dr;if(v&&=v(e,r)){pr(o,v,n,i);break a}y&&y(e,s,r),e===`focusout`&&r&&s.type===`number`&&r.memoizedProps.value!=null&&Yt(s,`number`,s.value)}switch(y=r?Tt(r):window,e){case`focusin`:(fr(y)||y.contentEditable===`true`)&&(Rr=y,zr=r,Br=null);break;case`focusout`:Br=zr=Rr=null;break;case`mousedown`:Vr=!0;break;case`contextmenu`:case`mouseup`:case`dragend`:Vr=!1,Hr(o,n,i);break;case`selectionchange`:if(Lr)break;case`keydown`:case`keyup`:Hr(o,n,i)}var b;if(er)b:{switch(e){case`compositionstart`:var x=`onCompositionStart`;break b;case`compositionend`:x=`onCompositionEnd`;break b;case`compositionupdate`:x=`onCompositionUpdate`;break b}x=void 0}else cr?or(e,n)&&(x=`onCompositionEnd`):e===`keydown`&&n.keyCode===229&&(x=`onCompositionStart`);x&&(rr&&n.locale!==`ko`&&(cr||x!==`onCompositionStart`?x===`onCompositionEnd`&&cr&&(b=Cn()):(bn=i,xn=`value`in bn?bn.value:bn.textContent,cr=!0)),y=Ed(r,x),0<y.length&&(x=new Vn(x,e,null,n,i),o.push({event:x,listeners:y}),b?x.data=b:(b=sr(n),b!==null&&(x.data=b)))),(b=nr?lr(e,n):ur(e,n))&&(x=Ed(r,`onBeforeInput`),0<x.length&&(y=new Vn(`onBeforeInput`,`beforeinput`,null,n,i),o.push({event:y,listeners:x}),y.data=b)),md(o,e,r,n,i)}yd(o,t)})}function Td(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Ed(e,t){for(var n=t+`Capture`,r=[];e!==null;){var i=e,a=i.stateNode;if(i=i.tag,i!==5&&i!==26&&i!==27||a===null||(i=gn(e,n),i!=null&&r.unshift(Td(e,i,a)),i=gn(e,t),i!=null&&r.push(Td(e,i,a))),e.tag===3)return r;e=e.return}return[]}function Dd(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Od(e,t,n,r,i){for(var a=t._reactName,o=[];n!==null&&n!==r;){var s=n,c=s.alternate,l=s.stateNode;if(s=s.tag,c!==null&&c===r)break;s!==5&&s!==26&&s!==27||l===null||(c=l,i?(l=gn(n,a),l!=null&&o.unshift(Td(n,l,c))):i||(l=gn(n,a),l!=null&&o.push(Td(n,l,c)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var kd=/\r\n?/g,Ad=/\u0000|\uFFFD/g;function jd(e){return(typeof e==`string`?e:``+e).replace(kd,`
`).replace(Ad,``)}function Md(e,t){return t=jd(t),jd(e)===t}function $(e,t,n,r,i,a){switch(n){case`children`:typeof r==`string`?t===`body`||t===`textarea`&&r===``||$t(e,r):(typeof r==`number`||typeof r==`bigint`)&&t!==`body`&&$t(e,``+r);break;case`className`:Lt(e,`class`,r);break;case`tabIndex`:Lt(e,`tabindex`,r);break;case`dir`:case`role`:case`viewBox`:case`width`:case`height`:Lt(e,n,r);break;case`style`:nn(e,r,a);break;case`data`:if(t!==`object`){Lt(e,`data`,r);break}case`src`:case`href`:if(r===``&&(t!==`a`||n!==`href`)){e.removeAttribute(n);break}if(r==null||typeof r==`function`||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=sn(``+r),e.setAttribute(n,r);break;case`action`:case`formAction`:if(typeof r==`function`){e.setAttribute(n,`javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')`);break}else typeof a==`function`&&(n===`formAction`?(t!==`input`&&$(e,t,`name`,i.name,i,null),$(e,t,`formEncType`,i.formEncType,i,null),$(e,t,`formMethod`,i.formMethod,i,null),$(e,t,`formTarget`,i.formTarget,i,null)):($(e,t,`encType`,i.encType,i,null),$(e,t,`method`,i.method,i,null),$(e,t,`target`,i.target,i,null)));if(r==null||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=sn(``+r),e.setAttribute(n,r);break;case`onClick`:r!=null&&(e.onclick=cn);break;case`onScroll`:r!=null&&Q(`scroll`,e);break;case`onScrollEnd`:r!=null&&Q(`scrollend`,e);break;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(s(61));if(n=r.__html,n!=null){if(i.children!=null)throw Error(s(60));e.innerHTML=n}}break;case`multiple`:e.multiple=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`muted`:e.muted=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`defaultValue`:case`defaultChecked`:case`innerHTML`:case`ref`:break;case`autoFocus`:break;case`xlinkHref`:if(r==null||typeof r==`function`||typeof r==`boolean`||typeof r==`symbol`){e.removeAttribute(`xlink:href`);break}n=sn(``+r),e.setAttributeNS(`http://www.w3.org/1999/xlink`,`xlink:href`,n);break;case`contentEditable`:case`spellCheck`:case`draggable`:case`value`:case`autoReverse`:case`externalResourcesRequired`:case`focusable`:case`preserveAlpha`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``+r):e.removeAttribute(n);break;case`inert`:case`allowFullScreen`:case`async`:case`autoPlay`:case`controls`:case`default`:case`defer`:case`disabled`:case`disablePictureInPicture`:case`disableRemotePlayback`:case`formNoValidate`:case`hidden`:case`loop`:case`noModule`:case`noValidate`:case`open`:case`playsInline`:case`readOnly`:case`required`:case`reversed`:case`scoped`:case`seamless`:case`itemScope`:r&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``):e.removeAttribute(n);break;case`capture`:case`download`:!0===r?e.setAttribute(n,``):!1!==r&&r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,r):e.removeAttribute(n);break;case`cols`:case`rows`:case`size`:case`span`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`&&!isNaN(r)&&1<=r?e.setAttribute(n,r):e.removeAttribute(n);break;case`rowSpan`:case`start`:r==null||typeof r==`function`||typeof r==`symbol`||isNaN(r)?e.removeAttribute(n):e.setAttribute(n,r);break;case`popover`:Q(`beforetoggle`,e),Q(`toggle`,e),It(e,`popover`,r);break;case`xlinkActuate`:Rt(e,`http://www.w3.org/1999/xlink`,`xlink:actuate`,r);break;case`xlinkArcrole`:Rt(e,`http://www.w3.org/1999/xlink`,`xlink:arcrole`,r);break;case`xlinkRole`:Rt(e,`http://www.w3.org/1999/xlink`,`xlink:role`,r);break;case`xlinkShow`:Rt(e,`http://www.w3.org/1999/xlink`,`xlink:show`,r);break;case`xlinkTitle`:Rt(e,`http://www.w3.org/1999/xlink`,`xlink:title`,r);break;case`xlinkType`:Rt(e,`http://www.w3.org/1999/xlink`,`xlink:type`,r);break;case`xmlBase`:Rt(e,`http://www.w3.org/XML/1998/namespace`,`xml:base`,r);break;case`xmlLang`:Rt(e,`http://www.w3.org/XML/1998/namespace`,`xml:lang`,r);break;case`xmlSpace`:Rt(e,`http://www.w3.org/XML/1998/namespace`,`xml:space`,r);break;case`is`:It(e,`is`,r);break;case`innerText`:case`textContent`:break;default:(!(2<n.length)||n[0]!==`o`&&n[0]!==`O`||n[1]!==`n`&&n[1]!==`N`)&&(n=an.get(n)||n,It(e,n,r))}}function Nd(e,t,n,r,i,a){switch(n){case`style`:nn(e,r,a);break;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(s(61));if(n=r.__html,n!=null){if(i.children!=null)throw Error(s(60));e.innerHTML=n}}break;case`children`:typeof r==`string`?$t(e,r):(typeof r==`number`||typeof r==`bigint`)&&$t(e,``+r);break;case`onScroll`:r!=null&&Q(`scroll`,e);break;case`onScrollEnd`:r!=null&&Q(`scrollend`,e);break;case`onClick`:r!=null&&(e.onclick=cn);break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`innerHTML`:case`ref`:break;case`innerText`:case`textContent`:break;default:if(!kt.hasOwnProperty(n))a:{if(n[0]===`o`&&n[1]===`n`&&(i=n.endsWith(`Capture`),t=n.slice(2,i?n.length-7:void 0),a=e[ht]||null,a=a==null?null:a[n],typeof a==`function`&&e.removeEventListener(t,a,i),typeof r==`function`)){typeof a!=`function`&&a!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(t,r,i);break a}n in e?e[n]=r:!0===r?e.setAttribute(n,``):It(e,n,r)}}}function Pd(e,t,n){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`img`:Q(`error`,e),Q(`load`,e);var r=!1,i=!1,a;for(a in n)if(n.hasOwnProperty(a)){var o=n[a];if(o!=null)switch(a){case`src`:r=!0;break;case`srcSet`:i=!0;break;case`children`:case`dangerouslySetInnerHTML`:throw Error(s(137,t));default:$(e,t,a,o,n,null)}}i&&$(e,t,`srcSet`,n.srcSet,n,null),r&&$(e,t,`src`,n.src,n,null);return;case`input`:Q(`invalid`,e);var c=a=o=i=null,l=null,u=null;for(r in n)if(n.hasOwnProperty(r)){var d=n[r];if(d!=null)switch(r){case`name`:i=d;break;case`type`:o=d;break;case`checked`:l=d;break;case`defaultChecked`:u=d;break;case`value`:a=d;break;case`defaultValue`:c=d;break;case`children`:case`dangerouslySetInnerHTML`:if(d!=null)throw Error(s(137,t));break;default:$(e,t,r,d,n,null)}}Jt(e,a,c,l,u,o,i,!1);return;case`select`:for(i in Q(`invalid`,e),r=o=a=null,n)if(n.hasOwnProperty(i)&&(c=n[i],c!=null))switch(i){case`value`:a=c;break;case`defaultValue`:o=c;break;case`multiple`:r=c;default:$(e,t,i,c,n,null)}t=a,n=o,e.multiple=!!r,t==null?n!=null&&Xt(e,!!r,n,!0):Xt(e,!!r,t,!1);return;case`textarea`:for(o in Q(`invalid`,e),a=i=r=null,n)if(n.hasOwnProperty(o)&&(c=n[o],c!=null))switch(o){case`value`:r=c;break;case`defaultValue`:i=c;break;case`children`:a=c;break;case`dangerouslySetInnerHTML`:if(c!=null)throw Error(s(91));break;default:$(e,t,o,c,n,null)}Qt(e,r,i,a);return;case`option`:for(l in n)if(n.hasOwnProperty(l)&&(r=n[l],r!=null))switch(l){case`selected`:e.selected=r&&typeof r!=`function`&&typeof r!=`symbol`;break;default:$(e,t,l,r,n,null)}return;case`dialog`:Q(`beforetoggle`,e),Q(`toggle`,e),Q(`cancel`,e),Q(`close`,e);break;case`iframe`:case`object`:Q(`load`,e);break;case`video`:case`audio`:for(r=0;r<_d.length;r++)Q(_d[r],e);break;case`image`:Q(`error`,e),Q(`load`,e);break;case`details`:Q(`toggle`,e);break;case`embed`:case`source`:case`link`:Q(`error`,e),Q(`load`,e);case`area`:case`base`:case`br`:case`col`:case`hr`:case`keygen`:case`meta`:case`param`:case`track`:case`wbr`:case`menuitem`:for(u in n)if(n.hasOwnProperty(u)&&(r=n[u],r!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:throw Error(s(137,t));default:$(e,t,u,r,n,null)}return;default:if(rn(t)){for(d in n)n.hasOwnProperty(d)&&(r=n[d],r!==void 0&&Nd(e,t,d,r,n,void 0));return}}for(c in n)n.hasOwnProperty(c)&&(r=n[c],r!=null&&$(e,t,c,r,n,null))}function Fd(e,t,n,r){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`input`:var i=null,a=null,o=null,c=null,l=null,u=null,d=null;for(m in n){var f=n[m];if(n.hasOwnProperty(m)&&f!=null)switch(m){case`checked`:break;case`value`:break;case`defaultValue`:l=f;default:r.hasOwnProperty(m)||$(e,t,m,null,r,f)}}for(var p in r){var m=r[p];if(f=n[p],r.hasOwnProperty(p)&&(m!=null||f!=null))switch(p){case`type`:a=m;break;case`name`:i=m;break;case`checked`:u=m;break;case`defaultChecked`:d=m;break;case`value`:o=m;break;case`defaultValue`:c=m;break;case`children`:case`dangerouslySetInnerHTML`:if(m!=null)throw Error(s(137,t));break;default:m!==f&&$(e,t,p,m,r,f)}}qt(e,o,c,l,u,d,a,i);return;case`select`:for(a in m=o=c=p=null,n)if(l=n[a],n.hasOwnProperty(a)&&l!=null)switch(a){case`value`:break;case`multiple`:m=l;default:r.hasOwnProperty(a)||$(e,t,a,null,r,l)}for(i in r)if(a=r[i],l=n[i],r.hasOwnProperty(i)&&(a!=null||l!=null))switch(i){case`value`:p=a;break;case`defaultValue`:c=a;break;case`multiple`:o=a;default:a!==l&&$(e,t,i,a,r,l)}t=c,n=o,r=m,p==null?!!r!=!!n&&(t==null?Xt(e,!!n,n?[]:``,!1):Xt(e,!!n,t,!0)):Xt(e,!!n,p,!1);return;case`textarea`:for(c in m=p=null,n)if(i=n[c],n.hasOwnProperty(c)&&i!=null&&!r.hasOwnProperty(c))switch(c){case`value`:break;case`children`:break;default:$(e,t,c,null,r,i)}for(o in r)if(i=r[o],a=n[o],r.hasOwnProperty(o)&&(i!=null||a!=null))switch(o){case`value`:p=i;break;case`defaultValue`:m=i;break;case`children`:break;case`dangerouslySetInnerHTML`:if(i!=null)throw Error(s(91));break;default:i!==a&&$(e,t,o,i,r,a)}Zt(e,p,m);return;case`option`:for(var h in n)if(p=n[h],n.hasOwnProperty(h)&&p!=null&&!r.hasOwnProperty(h))switch(h){case`selected`:e.selected=!1;break;default:$(e,t,h,null,r,p)}for(l in r)if(p=r[l],m=n[l],r.hasOwnProperty(l)&&p!==m&&(p!=null||m!=null))switch(l){case`selected`:e.selected=p&&typeof p!=`function`&&typeof p!=`symbol`;break;default:$(e,t,l,p,r,m)}return;case`img`:case`link`:case`area`:case`base`:case`br`:case`col`:case`embed`:case`hr`:case`keygen`:case`meta`:case`param`:case`source`:case`track`:case`wbr`:case`menuitem`:for(var g in n)p=n[g],n.hasOwnProperty(g)&&p!=null&&!r.hasOwnProperty(g)&&$(e,t,g,null,r,p);for(u in r)if(p=r[u],m=n[u],r.hasOwnProperty(u)&&p!==m&&(p!=null||m!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:if(p!=null)throw Error(s(137,t));break;default:$(e,t,u,p,r,m)}return;default:if(rn(t)){for(var _ in n)p=n[_],n.hasOwnProperty(_)&&p!==void 0&&!r.hasOwnProperty(_)&&Nd(e,t,_,void 0,r,p);for(d in r)p=r[d],m=n[d],!r.hasOwnProperty(d)||p===m||p===void 0&&m===void 0||Nd(e,t,d,p,r,m);return}}for(var v in n)p=n[v],n.hasOwnProperty(v)&&p!=null&&!r.hasOwnProperty(v)&&$(e,t,v,null,r,p);for(f in r)p=r[f],m=n[f],!r.hasOwnProperty(f)||p===m||p==null&&m==null||$(e,t,f,p,r,m)}function Id(e){switch(e){case`css`:case`script`:case`font`:case`img`:case`image`:case`input`:case`link`:return!0;default:return!1}}function Ld(){if(typeof performance.getEntriesByType==`function`){for(var e=0,t=0,n=performance.getEntriesByType(`resource`),r=0;r<n.length;r++){var i=n[r],a=i.transferSize,o=i.initiatorType,s=i.duration;if(a&&s&&Id(o)){for(o=0,s=i.responseEnd,r+=1;r<n.length;r++){var c=n[r],l=c.startTime;if(l>s)break;var u=c.transferSize,d=c.initiatorType;u&&Id(d)&&(c=c.responseEnd,o+=u*(c<s?1:(s-l)/(c-l)))}if(--r,t+=8*(a+o)/(i.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e==`number`)?e:5}var Rd=null,zd=null;function Bd(e){return e.nodeType===9?e:e.ownerDocument}function Vd(e){switch(e){case`http://www.w3.org/2000/svg`:return 1;case`http://www.w3.org/1998/Math/MathML`:return 2;default:return 0}}function Hd(e,t){if(e===0)switch(t){case`svg`:return 1;case`math`:return 2;default:return 0}return e===1&&t===`foreignObject`?0:e}function Ud(e,t){return e===`textarea`||e===`noscript`||typeof t.children==`string`||typeof t.children==`number`||typeof t.children==`bigint`||typeof t.dangerouslySetInnerHTML==`object`&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Wd=null;function Gd(){var e=window.event;return e&&e.type===`popstate`?e===Wd?!1:(Wd=e,!0):(Wd=null,!1)}var Kd=typeof setTimeout==`function`?setTimeout:void 0,qd=typeof clearTimeout==`function`?clearTimeout:void 0,Jd=typeof Promise==`function`?Promise:void 0,Yd=typeof queueMicrotask==`function`?queueMicrotask:Jd===void 0?Kd:function(e){return Jd.resolve(null).then(e).catch(Xd)};function Xd(e){setTimeout(function(){throw e})}function Zd(e){return e===`head`}function Qd(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8)if(n=i.data,n===`/$`||n===`/&`){if(r===0){e.removeChild(i),Np(t);return}r--}else if(n===`$`||n===`$?`||n===`$~`||n===`$!`||n===`&`)r++;else if(n===`html`)pf(e.ownerDocument.documentElement);else if(n===`head`){n=e.ownerDocument.head,pf(n);for(var a=n.firstChild;a;){var o=a.nextSibling,s=a.nodeName;a[xt]||s===`SCRIPT`||s===`STYLE`||s===`LINK`&&a.rel.toLowerCase()===`stylesheet`||n.removeChild(a),a=o}}else n===`body`&&pf(e.ownerDocument.body);n=i}while(n);Np(t)}function $d(e,t){var n=e;e=0;do{var r=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display=`none`):(n.style.display=n._stashedDisplay||``,n.getAttribute(`style`)===``&&n.removeAttribute(`style`)):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=``):n.nodeValue=n._stashedText||``),r&&r.nodeType===8)if(n=r.data,n===`/$`){if(e===0)break;e--}else n!==`$`&&n!==`$?`&&n!==`$~`&&n!==`$!`||e++;n=r}while(n)}function ef(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case`HTML`:case`HEAD`:case`BODY`:ef(n),St(n);continue;case`SCRIPT`:case`STYLE`:continue;case`LINK`:if(n.rel.toLowerCase()===`stylesheet`)continue}e.removeChild(n)}}function tf(e,t,n,r){for(;e.nodeType===1;){var i=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!r&&(e.nodeName!==`INPUT`||e.type!==`hidden`))break}else if(!r)if(t===`input`&&e.type===`hidden`){var a=i.name==null?null:``+i.name;if(i.type===`hidden`&&e.getAttribute(`name`)===a)return e}else return e;else if(!e[xt])switch(t){case`meta`:if(!e.hasAttribute(`itemprop`))break;return e;case`link`:if(a=e.getAttribute(`rel`),a===`stylesheet`&&e.hasAttribute(`data-precedence`)||a!==i.rel||e.getAttribute(`href`)!==(i.href==null||i.href===``?null:i.href)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin)||e.getAttribute(`title`)!==(i.title==null?null:i.title))break;return e;case`style`:if(e.hasAttribute(`data-precedence`))break;return e;case`script`:if(a=e.getAttribute(`src`),(a!==(i.src==null?null:i.src)||e.getAttribute(`type`)!==(i.type==null?null:i.type)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin))&&a&&e.hasAttribute(`async`)&&!e.hasAttribute(`itemprop`))break;return e;default:return e}if(e=cf(e.nextSibling),e===null)break}return null}function nf(e,t,n){if(t===``)return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!n||(e=cf(e.nextSibling),e===null))return null;return e}function rf(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!t||(e=cf(e.nextSibling),e===null))return null;return e}function af(e){return e.data===`$?`||e.data===`$~`}function of(e){return e.data===`$!`||e.data===`$?`&&e.ownerDocument.readyState!==`loading`}function sf(e,t){var n=e.ownerDocument;if(e.data===`$~`)e._reactRetry=t;else if(e.data!==`$?`||n.readyState!==`loading`)t();else{var r=function(){t(),n.removeEventListener(`DOMContentLoaded`,r)};n.addEventListener(`DOMContentLoaded`,r),e._reactRetry=r}}function cf(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t===`$`||t===`$!`||t===`$?`||t===`$~`||t===`&`||t===`F!`||t===`F`)break;if(t===`/$`||t===`/&`)return null}}return e}var lf=null;function uf(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`/$`||n===`/&`){if(t===0)return cf(e.nextSibling);t--}else n!==`$`&&n!==`$!`&&n!==`$?`&&n!==`$~`&&n!==`&`||t++}e=e.nextSibling}return null}function df(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`$`||n===`$!`||n===`$?`||n===`$~`||n===`&`){if(t===0)return e;t--}else n!==`/$`&&n!==`/&`||t++}e=e.previousSibling}return null}function ff(e,t,n){switch(t=Bd(n),e){case`html`:if(e=t.documentElement,!e)throw Error(s(452));return e;case`head`:if(e=t.head,!e)throw Error(s(453));return e;case`body`:if(e=t.body,!e)throw Error(s(454));return e;default:throw Error(s(451))}}function pf(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);St(e)}var mf=new Map,hf=new Set;function gf(e){return typeof e.getRootNode==`function`?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var _f=E.d;E.d={f:vf,r:yf,D:Sf,C:Cf,L:wf,m:Tf,X:Df,S:Ef,M:Of};function vf(){var e=_f.f(),t=bu();return e||t}function yf(e){var t=wt(e);t!==null&&t.tag===5&&t.type===`form`?As(t):_f.r(e)}var bf=typeof document>`u`?null:document;function xf(e,t,n){var r=bf;if(r&&typeof t==`string`&&t){var i=Kt(t);i=`link[rel="`+e+`"][href="`+i+`"]`,typeof n==`string`&&(i+=`[crossorigin="`+n+`"]`),hf.has(i)||(hf.add(i),e={rel:e,crossOrigin:n,href:t},r.querySelector(i)===null&&(t=r.createElement(`link`),Pd(t,`link`,e),Dt(t),r.head.appendChild(t)))}}function Sf(e){_f.D(e),xf(`dns-prefetch`,e,null)}function Cf(e,t){_f.C(e,t),xf(`preconnect`,e,t)}function wf(e,t,n){_f.L(e,t,n);var r=bf;if(r&&e&&t){var i=`link[rel="preload"][as="`+Kt(t)+`"]`;t===`image`&&n&&n.imageSrcSet?(i+=`[imagesrcset="`+Kt(n.imageSrcSet)+`"]`,typeof n.imageSizes==`string`&&(i+=`[imagesizes="`+Kt(n.imageSizes)+`"]`)):i+=`[href="`+Kt(e)+`"]`;var a=i;switch(t){case`style`:a=Af(e);break;case`script`:a=Pf(e)}mf.has(a)||(e=h({rel:`preload`,href:t===`image`&&n&&n.imageSrcSet?void 0:e,as:t},n),mf.set(a,e),r.querySelector(i)!==null||t===`style`&&r.querySelector(jf(a))||t===`script`&&r.querySelector(Ff(a))||(t=r.createElement(`link`),Pd(t,`link`,e),Dt(t),r.head.appendChild(t)))}}function Tf(e,t){_f.m(e,t);var n=bf;if(n&&e){var r=t&&typeof t.as==`string`?t.as:`script`,i=`link[rel="modulepreload"][as="`+Kt(r)+`"][href="`+Kt(e)+`"]`,a=i;switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:a=Pf(e)}if(!mf.has(a)&&(e=h({rel:`modulepreload`,href:e},t),mf.set(a,e),n.querySelector(i)===null)){switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:if(n.querySelector(Ff(a)))return}r=n.createElement(`link`),Pd(r,`link`,e),Dt(r),n.head.appendChild(r)}}}function Ef(e,t,n){_f.S(e,t,n);var r=bf;if(r&&e){var i=Et(r).hoistableStyles,a=Af(e);t||=`default`;var o=i.get(a);if(!o){var s={loading:0,preload:null};if(o=r.querySelector(jf(a)))s.loading=5;else{e=h({rel:`stylesheet`,href:e,"data-precedence":t},n),(n=mf.get(a))&&Rf(e,n);var c=o=r.createElement(`link`);Dt(c),Pd(c,`link`,e),c._p=new Promise(function(e,t){c.onload=e,c.onerror=t}),c.addEventListener(`load`,function(){s.loading|=1}),c.addEventListener(`error`,function(){s.loading|=2}),s.loading|=4,Lf(o,t,r)}o={type:`stylesheet`,instance:o,count:1,state:s},i.set(a,o)}}}function Df(e,t){_f.X(e,t);var n=bf;if(n&&e){var r=Et(n).hoistableScripts,i=Pf(e),a=r.get(i);a||(a=n.querySelector(Ff(i)),a||(e=h({src:e,async:!0},t),(t=mf.get(i))&&zf(e,t),a=n.createElement(`script`),Dt(a),Pd(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function Of(e,t){_f.M(e,t);var n=bf;if(n&&e){var r=Et(n).hoistableScripts,i=Pf(e),a=r.get(i);a||(a=n.querySelector(Ff(i)),a||(e=h({src:e,async:!0,type:`module`},t),(t=mf.get(i))&&zf(e,t),a=n.createElement(`script`),Dt(a),Pd(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function kf(e,t,n,r){var i=(i=ge.current)?gf(i):null;if(!i)throw Error(s(446));switch(e){case`meta`:case`title`:return null;case`style`:return typeof n.precedence==`string`&&typeof n.href==`string`?(t=Af(n.href),n=Et(i).hoistableStyles,r=n.get(t),r||(r={type:`style`,instance:null,count:0,state:null},n.set(t,r)),r):{type:`void`,instance:null,count:0,state:null};case`link`:if(n.rel===`stylesheet`&&typeof n.href==`string`&&typeof n.precedence==`string`){e=Af(n.href);var a=Et(i).hoistableStyles,o=a.get(e);if(o||(i=i.ownerDocument||i,o={type:`stylesheet`,instance:null,count:0,state:{loading:0,preload:null}},a.set(e,o),(a=i.querySelector(jf(e)))&&!a._p&&(o.instance=a,o.state.loading=5),mf.has(e)||(n={rel:`preload`,as:`style`,href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},mf.set(e,n),a||Nf(i,e,n,o.state))),t&&r===null)throw Error(s(528,``));return o}if(t&&r!==null)throw Error(s(529,``));return null;case`script`:return t=n.async,n=n.src,typeof n==`string`&&t&&typeof t!=`function`&&typeof t!=`symbol`?(t=Pf(n),n=Et(i).hoistableScripts,r=n.get(t),r||(r={type:`script`,instance:null,count:0,state:null},n.set(t,r)),r):{type:`void`,instance:null,count:0,state:null};default:throw Error(s(444,e))}}function Af(e){return`href="`+Kt(e)+`"`}function jf(e){return`link[rel="stylesheet"][`+e+`]`}function Mf(e){return h({},e,{"data-precedence":e.precedence,precedence:null})}function Nf(e,t,n,r){e.querySelector(`link[rel="preload"][as="style"][`+t+`]`)?r.loading=1:(t=e.createElement(`link`),r.preload=t,t.addEventListener(`load`,function(){return r.loading|=1}),t.addEventListener(`error`,function(){return r.loading|=2}),Pd(t,`link`,n),Dt(t),e.head.appendChild(t))}function Pf(e){return`[src="`+Kt(e)+`"]`}function Ff(e){return`script[async]`+e}function If(e,t,n){if(t.count++,t.instance===null)switch(t.type){case`style`:var r=e.querySelector(`style[data-href~="`+Kt(n.href)+`"]`);if(r)return t.instance=r,Dt(r),r;var i=h({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return r=(e.ownerDocument||e).createElement(`style`),Dt(r),Pd(r,`style`,i),Lf(r,n.precedence,e),t.instance=r;case`stylesheet`:i=Af(n.href);var a=e.querySelector(jf(i));if(a)return t.state.loading|=4,t.instance=a,Dt(a),a;r=Mf(n),(i=mf.get(i))&&Rf(r,i),a=(e.ownerDocument||e).createElement(`link`),Dt(a);var o=a;return o._p=new Promise(function(e,t){o.onload=e,o.onerror=t}),Pd(a,`link`,r),t.state.loading|=4,Lf(a,n.precedence,e),t.instance=a;case`script`:return a=Pf(n.src),(i=e.querySelector(Ff(a)))?(t.instance=i,Dt(i),i):(r=n,(i=mf.get(a))&&(r=h({},n),zf(r,i)),e=e.ownerDocument||e,i=e.createElement(`script`),Dt(i),Pd(i,`link`,r),e.head.appendChild(i),t.instance=i);case`void`:return null;default:throw Error(s(443,t.type))}else t.type===`stylesheet`&&!(t.state.loading&4)&&(r=t.instance,t.state.loading|=4,Lf(r,n.precedence,e));return t.instance}function Lf(e,t,n){for(var r=n.querySelectorAll(`link[rel="stylesheet"][data-precedence],style[data-precedence]`),i=r.length?r[r.length-1]:null,a=i,o=0;o<r.length;o++){var s=r[o];if(s.dataset.precedence===t)a=s;else if(a!==i)break}a?a.parentNode.insertBefore(e,a.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function Rf(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.title??=t.title}function zf(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.integrity??=t.integrity}var Bf=null;function Vf(e,t,n){if(Bf===null){var r=new Map,i=Bf=new Map;i.set(n,r)}else i=Bf,r=i.get(n),r||(r=new Map,i.set(n,r));if(r.has(e))return r;for(r.set(e,null),n=n.getElementsByTagName(e),i=0;i<n.length;i++){var a=n[i];if(!(a[xt]||a[mt]||e===`link`&&a.getAttribute(`rel`)===`stylesheet`)&&a.namespaceURI!==`http://www.w3.org/2000/svg`){var o=a.getAttribute(t)||``;o=e+o;var s=r.get(o);s?s.push(a):r.set(o,[a])}}return r}function Hf(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t===`title`?e.querySelector(`head > title`):null)}function Uf(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case`meta`:case`title`:return!0;case`style`:if(typeof t.precedence!=`string`||typeof t.href!=`string`||t.href===``)break;return!0;case`link`:if(typeof t.rel!=`string`||typeof t.href!=`string`||t.href===``||t.onLoad||t.onError)break;switch(t.rel){case`stylesheet`:return e=t.disabled,typeof t.precedence==`string`&&e==null;default:return!0}case`script`:if(t.async&&typeof t.async!=`function`&&typeof t.async!=`symbol`&&!t.onLoad&&!t.onError&&t.src&&typeof t.src==`string`)return!0}return!1}function Wf(e){return!(e.type===`stylesheet`&&!(e.state.loading&3))}function Gf(e,t,n,r){if(n.type===`stylesheet`&&(typeof r.media!=`string`||!1!==matchMedia(r.media).matches)&&!(n.state.loading&4)){if(n.instance===null){var i=Af(r.href),a=t.querySelector(jf(i));if(a){t=a._p,typeof t==`object`&&t&&typeof t.then==`function`&&(e.count++,e=Jf.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=a,Dt(a);return}a=t.ownerDocument||t,r=Mf(r),(i=mf.get(i))&&Rf(r,i),a=a.createElement(`link`),Dt(a);var o=a;o._p=new Promise(function(e,t){o.onload=e,o.onerror=t}),Pd(a,`link`,r),n.instance=a}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&!(n.state.loading&3)&&(e.count++,n=Jf.bind(e),t.addEventListener(`load`,n),t.addEventListener(`error`,n))}}var Kf=0;function qf(e,t){return e.stylesheets&&e.count===0&&Xf(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var r=setTimeout(function(){if(e.stylesheets&&Xf(e,e.stylesheets),e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}},6e4+t);0<e.imgBytes&&Kf===0&&(Kf=62500*Ld());var i=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&Xf(e,e.stylesheets),e.unsuspend)){var t=e.unsuspend;e.unsuspend=null,t()}},(e.imgBytes>Kf?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(r),clearTimeout(i)}}:null}function Jf(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Xf(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Yf=null;function Xf(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Yf=new Map,t.forEach(Zf,e),Yf=null,Jf.call(e))}function Zf(e,t){if(!(t.state.loading&4)){var n=Yf.get(e);if(n)var r=n.get(null);else{n=new Map,Yf.set(e,n);for(var i=e.querySelectorAll(`link[data-precedence],style[data-precedence]`),a=0;a<i.length;a++){var o=i[a];(o.nodeName===`LINK`||o.getAttribute(`media`)!==`not all`)&&(n.set(o.dataset.precedence,o),r=o)}r&&n.set(null,r)}i=t.instance,o=i.getAttribute(`data-precedence`),a=n.get(o)||r,a===r&&n.set(null,i),n.set(o,i),this.count++,r=Jf.bind(this),i.addEventListener(`load`,r),i.addEventListener(`error`,r),a?a.parentNode.insertBefore(i,a.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(i,e.firstChild)),t.state.loading|=4}}var Qf={$$typeof:S,Provider:null,Consumer:null,_currentValue:de,_currentValue2:de,_threadCount:0};function $f(e,t,n,r,i,a,o,s,c){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=rt(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=rt(0),this.hiddenUpdates=rt(null),this.identifierPrefix=r,this.onUncaughtError=i,this.onCaughtError=a,this.onRecoverableError=o,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=c,this.incompleteTransitions=new Map}function ep(e,t,n,r,i,a,o,s,c,l,u,d){return e=new $f(e,t,n,o,c,l,u,d,s),t=1,!0===a&&(t|=24),a=gi(3,null,null,t),e.current=a,a.stateNode=e,t=ma(),t.refCount++,e.pooledCache=t,t.refCount++,a.memoizedState={element:r,isDehydrated:n,cache:t},qa(a),e}function tp(e){return e?(e=mi,e):mi}function np(e,t,n,r,i,a){i=tp(i),r.context===null?r.context=i:r.pendingContext=i,r=Ya(t),r.payload={element:n},a=a===void 0?null:a,a!==null&&(r.callback=a),n=Xa(e,r,t),n!==null&&(hu(n,e,t),Za(n,e,t))}function rp(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function ip(e,t){rp(e,t),(e=e.alternate)&&rp(e,t)}function ap(e){if(e.tag===13||e.tag===31){var t=di(e,67108864);t!==null&&hu(t,e,67108864),ip(e,67108864)}}function op(e){if(e.tag===13||e.tag===31){var t=pu();t=lt(t);var n=di(e,t);n!==null&&hu(n,e,t),ip(e,t)}}var sp=!0;function cp(e,t,n,r){var i=T.T;T.T=null;var a=E.p;try{E.p=2,up(e,t,n,r)}finally{E.p=a,T.T=i}}function lp(e,t,n,r){var i=T.T;T.T=null;var a=E.p;try{E.p=8,up(e,t,n,r)}finally{E.p=a,T.T=i}}function up(e,t,n,r){if(sp){var i=dp(r);if(i===null)wd(e,t,r,fp,n),Cp(e,r);else if(Tp(i,e,t,n,r))r.stopPropagation();else if(Cp(e,r),t&4&&-1<Sp.indexOf(e)){for(;i!==null;){var a=wt(i);if(a!==null)switch(a.tag){case 3:if(a=a.stateNode,a.current.memoizedState.isDehydrated){var o=Qe(a.pendingLanes);if(o!==0){var s=a;for(s.pendingLanes|=2,s.entangledLanes|=2;o;){var c=1<<31-Ge(o);s.entanglements[1]|=c,o&=~c}rd(a),!(W&6)&&(nu=Pe()+500,id(0,!1))}}break;case 31:case 13:s=di(a,2),s!==null&&hu(s,a,2),bu(),ip(a,2)}if(a=dp(r),a===null&&wd(e,t,r,fp,n),a===i)break;i=a}i!==null&&r.stopPropagation()}else wd(e,t,r,null,n)}}function dp(e){return e=un(e),pp(e)}var fp=null;function pp(e){if(fp=null,e=Ct(e),e!==null){var t=l(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=u(t),e!==null)return e;e=null}else if(n===31){if(e=d(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return fp=e,null}function mp(e){switch(e){case`beforetoggle`:case`cancel`:case`click`:case`close`:case`contextmenu`:case`copy`:case`cut`:case`auxclick`:case`dblclick`:case`dragend`:case`dragstart`:case`drop`:case`focusin`:case`focusout`:case`input`:case`invalid`:case`keydown`:case`keypress`:case`keyup`:case`mousedown`:case`mouseup`:case`paste`:case`pause`:case`play`:case`pointercancel`:case`pointerdown`:case`pointerup`:case`ratechange`:case`reset`:case`resize`:case`seeked`:case`submit`:case`toggle`:case`touchcancel`:case`touchend`:case`touchstart`:case`volumechange`:case`change`:case`selectionchange`:case`textInput`:case`compositionstart`:case`compositionend`:case`compositionupdate`:case`beforeblur`:case`afterblur`:case`beforeinput`:case`blur`:case`fullscreenchange`:case`focus`:case`hashchange`:case`popstate`:case`select`:case`selectstart`:return 2;case`drag`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`mousemove`:case`mouseout`:case`mouseover`:case`pointermove`:case`pointerout`:case`pointerover`:case`scroll`:case`touchmove`:case`wheel`:case`mouseenter`:case`mouseleave`:case`pointerenter`:case`pointerleave`:return 8;case`message`:switch(Fe()){case Ie:return 2;case Le:return 8;case Re:case A:return 32;case ze:return 268435456;default:return 32}default:return 32}}var hp=!1,gp=null,_p=null,vp=null,yp=new Map,bp=new Map,xp=[],Sp=`mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset`.split(` `);function Cp(e,t){switch(e){case`focusin`:case`focusout`:gp=null;break;case`dragenter`:case`dragleave`:_p=null;break;case`mouseover`:case`mouseout`:vp=null;break;case`pointerover`:case`pointerout`:yp.delete(t.pointerId);break;case`gotpointercapture`:case`lostpointercapture`:bp.delete(t.pointerId)}}function wp(e,t,n,r,i,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:a,targetContainers:[i]},t!==null&&(t=wt(t),t!==null&&ap(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function Tp(e,t,n,r,i){switch(t){case`focusin`:return gp=wp(gp,e,t,n,r,i),!0;case`dragenter`:return _p=wp(_p,e,t,n,r,i),!0;case`mouseover`:return vp=wp(vp,e,t,n,r,i),!0;case`pointerover`:var a=i.pointerId;return yp.set(a,wp(yp.get(a)||null,e,t,n,r,i)),!0;case`gotpointercapture`:return a=i.pointerId,bp.set(a,wp(bp.get(a)||null,e,t,n,r,i)),!0}return!1}function Ep(e){var t=Ct(e.target);if(t!==null){var n=l(t);if(n!==null){if(t=n.tag,t===13){if(t=u(n),t!==null){e.blockedOn=t,ft(e.priority,function(){op(n)});return}}else if(t===31){if(t=d(n),t!==null){e.blockedOn=t,ft(e.priority,function(){op(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Dp(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=dp(e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);ln=r,n.target.dispatchEvent(r),ln=null}else return t=wt(n),t!==null&&ap(t),e.blockedOn=n,!1;t.shift()}return!0}function Op(e,t,n){Dp(e)&&n.delete(t)}function kp(){hp=!1,gp!==null&&Dp(gp)&&(gp=null),_p!==null&&Dp(_p)&&(_p=null),vp!==null&&Dp(vp)&&(vp=null),yp.forEach(Op),bp.forEach(Op)}function Ap(e,n){e.blockedOn===n&&(e.blockedOn=null,hp||(hp=!0,t.unstable_scheduleCallback(t.unstable_NormalPriority,kp)))}var jp=null;function Mp(e){jp!==e&&(jp=e,t.unstable_scheduleCallback(t.unstable_NormalPriority,function(){jp===e&&(jp=null);for(var t=0;t<e.length;t+=3){var n=e[t],r=e[t+1],i=e[t+2];if(typeof r!=`function`){if(pp(r||n)===null)continue;break}var a=wt(n);a!==null&&(e.splice(t,3),t-=3,Os(a,{pending:!0,data:i,method:n.method,action:r},r,i))}}))}function Np(e){function t(t){return Ap(t,e)}gp!==null&&Ap(gp,e),_p!==null&&Ap(_p,e),vp!==null&&Ap(vp,e),yp.forEach(t),bp.forEach(t);for(var n=0;n<xp.length;n++){var r=xp[n];r.blockedOn===e&&(r.blockedOn=null)}for(;0<xp.length&&(n=xp[0],n.blockedOn===null);)Ep(n),n.blockedOn===null&&xp.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(r=0;r<n.length;r+=3){var i=n[r],a=n[r+1],o=i[ht]||null;if(typeof a==`function`)o||Mp(n);else if(o){var s=null;if(a&&a.hasAttribute(`formAction`)){if(i=a,o=a[ht]||null)s=o.formAction;else if(pp(i)!==null)continue}else s=o.action;typeof s==`function`?n[r+1]=s:(n.splice(r,3),r-=3),Mp(n)}}}function Pp(){function e(e){e.canIntercept&&e.info===`react-transition`&&e.intercept({handler:function(){return new Promise(function(e){return i=e})},focusReset:`manual`,scroll:`manual`})}function t(){i!==null&&(i(),i=null),r||setTimeout(n,20)}function n(){if(!r&&!navigation.transition){var e=navigation.currentEntry;e&&e.url!=null&&navigation.navigate(e.url,{state:e.getState(),info:`react-transition`,history:`replace`})}}if(typeof navigation==`object`){var r=!1,i=null;return navigation.addEventListener(`navigate`,e),navigation.addEventListener(`navigatesuccess`,t),navigation.addEventListener(`navigateerror`,t),setTimeout(n,100),function(){r=!0,navigation.removeEventListener(`navigate`,e),navigation.removeEventListener(`navigatesuccess`,t),navigation.removeEventListener(`navigateerror`,t),i!==null&&(i(),i=null)}}}function Fp(e){this._internalRoot=e}Ip.prototype.render=Fp.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(s(409));var n=t.current;np(n,pu(),e,t,null,null)},Ip.prototype.unmount=Fp.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;np(e.current,2,null,e,null,null),bu(),t[gt]=null}};function Ip(e){this._internalRoot=e}Ip.prototype.unstable_scheduleHydration=function(e){if(e){var t=dt();e={blockedOn:null,target:e,priority:t};for(var n=0;n<xp.length&&t!==0&&t<xp[n].priority;n++);xp.splice(n,0,e),n===0&&Ep(e)}};var Lp=r.version;if(Lp!==`19.2.7`)throw Error(s(527,Lp,`19.2.7`));E.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render==`function`?Error(s(188)):(e=Object.keys(e).join(`,`),Error(s(268,e)));return e=p(t),e=e===null?null:m(e),e=e===null?null:e.stateNode,e};var Rp={bundleType:0,version:`19.2.7`,rendererPackageName:`react-dom`,currentDispatcherRef:T,reconcilerVersion:`19.2.7`};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`){var zp=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!zp.isDisabled&&zp.supportsFiber)try{He=zp.inject(Rp),Ue=zp}catch{}}e.createRoot=function(e,t){if(!c(e))throw Error(s(299));var n=!1,r=``,i=Zs,a=Qs,o=$s;return t!=null&&(!0===t.unstable_strictMode&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onUncaughtError!==void 0&&(i=t.onUncaughtError),t.onCaughtError!==void 0&&(a=t.onCaughtError),t.onRecoverableError!==void 0&&(o=t.onRecoverableError)),t=ep(e,1,!1,null,null,n,r,null,i,a,o,Pp),e[gt]=t.current,Sd(e),new Fp(t)}})),c=e(((e,t)=>{function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>`u`||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!=`function`))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=s()})),l=i(),u=c(),d=`
:root {
  color-scheme: light;
  --bg: #fafafa;
  --bg-2: #ffffff;
  --panel: rgba(255, 255, 255, 0.92);
  --panel-strong: rgba(255, 255, 255, 0.98);
  --line: rgba(39, 39, 42, 0.12);
  --line-soft: rgba(39, 39, 42, 0.08);
  --text: #18181b;
  --muted: rgba(39, 39, 42, 0.62);
  --up: #dc2626;
  --down: #16a34a;
  --gold: #a16207;
  --accent: #3f3f46;
  --shadow: 0 8px 30px rgba(0, 0, 0, 0.04);
}

.dark {
  color-scheme: dark;
  --bg: #09090b;
  --bg-2: #18181b;
  --panel: rgba(24, 24, 27, 0.88);
  --panel-strong: rgba(24, 24, 27, 0.96);
  --line: rgba(244, 244, 245, 0.12);
  --line-soft: rgba(244, 244, 245, 0.08);
  --text: #fafafa;
  --muted: rgba(244, 244, 245, 0.6);
  --up: #f87171;
  --down: #4ade80;
  --gold: #facc15;
  --accent: #e4e4e7;
  --shadow: 0 8px 30px rgba(0, 0, 0, 0.24);
}

* { box-sizing: border-box; }

body {
  margin: 0;
  min-height: 100vh;
  color: var(--text);
  background:
    linear-gradient(180deg, var(--bg), var(--bg-2));
  font-family: "Avenir Next", "Segoe UI", sans-serif;
}

.page {
  width: min(1320px, calc(100% - 28px));
  margin: 0 auto;
  padding: 28px 0 44px;
}

.hero {
  display: grid;
  grid-template-columns: 1.4fr 0.8fr;
  gap: 16px;
  margin-bottom: 18px;
}

h1 {
  margin: 0 0 8px;
  font-size: clamp(34px, 6vw, 64px);
  letter-spacing: -0.05em;
  line-height: 0.94;
}

.lead {
  margin: 0;
  max-width: 760px;
  color: var(--muted);
  line-height: 1.7;
}

.panel {
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 24px;
  padding: 18px;
  backdrop-filter: blur(10px);
  box-shadow: var(--shadow);
  position: relative;
  overflow: hidden;
}

.card {
  background: var(--panel);
  border-color: var(--line);
  box-shadow: var(--shadow);
  border-radius: 24px;
}

.card > header h2 {
  margin: 0;
  letter-spacing: -0.02em;
}

.card > header p {
  color: var(--muted);
}

button,
input,
.concept-card,
.panel {
  transition: all 0.2s ease;
}

.panel::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(140deg, rgba(255,255,255,0.45), transparent 34%);
  pointer-events: none;
}

.hero-copy,
.hero-side {
  min-height: 168px;
}

.eyebrow {
  margin-bottom: 10px;
  color: var(--accent);
  font-size: 12px;
  letter-spacing: 0.24em;
  text-transform: uppercase;
}

.hero-side {
  display: grid;
  align-content: space-between;
  gap: 16px;
}

.status-rail {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}

.status-pill {
  padding: 12px 14px;
  border: 1px solid var(--line-soft);
  border-radius: 16px;
  background: rgba(15, 23, 42, 0.02);
}

.status-pill .label {
  font-size: 11px;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 4px;
}

.status-pill .value {
  font-size: 14px;
  color: var(--text);
}

.controls {
  display: grid;
  grid-template-columns: 280px minmax(220px, 1fr) 140px;
  gap: 12px;
  align-items: end;
  margin: 18px 0 16px;
}

.control-field {
  display: grid;
  gap: 8px;
}

.control-label {
  color: var(--muted);
  font-size: 12px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.select button {
  width: 100%;
  justify-content: space-between;
}

.select {
  position: relative;
}

.select [data-popover] {
  display: none;
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  z-index: 50;
  background: var(--panel-strong);
  border: 1px solid var(--line);
  border-radius: 18px;
  backdrop-filter: blur(10px);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.18);
  overflow: hidden;
  padding: 8px;
}

.select [data-popover][aria-hidden="false"] {
  display: block;
}

.select [data-popover] header {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 6px 8px;
  border-bottom: 1px solid var(--line-soft);
  margin-bottom: 4px;
}

.select [data-popover] header input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: var(--text);
  font-size: 13px;
}

.select [data-popover] header input::placeholder {
  color: var(--muted);
}

.select [data-popover] header svg {
  flex-shrink: 0;
  color: var(--muted);
}

.select [role="listbox"] {
  max-height: 260px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.select [role="option"] {
  padding: 8px 12px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 13px;
  color: var(--text);
  transition: background 0.12s;
  display: flex;
  align-items: center;
  gap: 8px;
}

.select [role="option"]:hover {
  background: rgba(63, 63, 70, 0.06);
}

.select [role="option"][data-selected] {
  background: rgba(63, 63, 70, 0.1);
}

.select [role="option"][data-highlighted] {
  background: rgba(63, 63, 70, 0.08);
}

.select [role="option"][hidden] {
  display: none;
}

.btn:hover,
.btn-secondary:hover,
.btn-outline:hover,
.select button:hover,
.input:hover {
  transform: translateY(-1px);
}

.btn:focus-visible,
.btn-secondary:focus-visible,
.btn-outline:focus-visible,
.select button:focus-visible,
.input:focus-visible {
  outline: 2px solid rgba(63, 63, 70, 0.18);
  outline-offset: 2px;
}

.btn:active,
.btn-secondary:active,
.btn-outline:active,
.select button:active {
  transform: translateY(0);
}

.metric-grid {
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
  margin-bottom: 16px;
}

.metric {
  min-height: 112px;
}

.metric-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.metric-label {
  color: var(--muted);
  font-size: 12px;
  margin-bottom: 6px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.metric-value {
  font-size: 32px;
  letter-spacing: -0.05em;
}

.metric-sub {
  margin-top: 6px;
  font-size: 12px;
  color: var(--muted);
}

.chart-panel {
  position: relative;
  margin-bottom: 16px;
  padding: 20px;
}

#chart {
  height: 540px;
}

.chart-custom-legend {
  display: flex;
  gap: 16px;
  padding: 8px 0 0;
  flex-wrap: wrap;
}

.chart-legend-col {
  flex: 1;
  min-width: 200px;
}

.chart-legend-col h4 {
  font-size: 11px;
  font-weight: 600;
  margin: 0 0 4px;
}

.chart-legend-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 2px 8px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 11px;
  transition: opacity 0.15s;
}

.chart-legend-item:hover {
  background: rgba(63, 63, 70, 0.06);
}

.chart-legend-item.is-hidden {
  opacity: 0.35;
}

.chart-legend-swatch {
  display: inline-block;
  width: 14px;
  height: 4px;
  border-radius: 2px;
  flex-shrink: 0;
}

#chart,
#netflow-chart,
#emotion-chart {
  border: 1px solid rgba(24, 24, 27, 0.14);
  border-radius: 20px;
  background:
    linear-gradient(180deg, rgba(24, 24, 27, 0.96), rgba(39, 39, 42, 0.94)),
    radial-gradient(circle at top, rgba(255,255,255,0.04), transparent 38%);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.04),
    0 8px 30px rgba(0, 0, 0, 0.08);
}

.dark #chart,
.dark #netflow-chart,
.dark #emotion-chart {
  border-color: rgba(244, 244, 245, 0.08);
  background:
    linear-gradient(180deg, rgba(9, 9, 11, 0.98), rgba(24, 24, 27, 0.96)),
    radial-gradient(circle at top, rgba(255,255,255,0.05), transparent 38%);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.03),
    0 8px 30px rgba(0, 0, 0, 0.2);
}

.anchor-stream {
  margin-top: 10px;
  padding: 12px 14px;
  border: 1px solid var(--line-soft);
  border-radius: 18px;
  background: linear-gradient(180deg, rgba(9,9,11,0.92), rgba(24,24,27,0.88));
}

.anchor-stream-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
}

.anchor-stream-title {
  font-size: 12px;
  font-weight: 600;
  color: rgba(244,244,245,0.9);
}

.anchor-stream-meta {
  font-size: 11px;
  color: rgba(244,244,245,0.52);
}

.anchor-stream-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 8px;
}

.anchor-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid rgba(244,244,245,0.08);
  background: rgba(255,255,255,0.03);
}

.anchor-item.is-active {
  border-color: rgba(250,204,21,0.48);
  box-shadow: inset 0 0 0 1px rgba(250,204,21,0.14);
}

.anchor-item-main {
  min-width: 0;
}

.anchor-item-time {
  display: inline-block;
  margin-bottom: 4px;
  font-size: 11px;
  color: rgba(244,244,245,0.52);
}

.anchor-item-name {
  font-size: 13px;
  font-weight: 600;
  color: rgba(244,244,245,0.94);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.anchor-badge {
  flex-shrink: 0;
  padding: 4px 8px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
}

.anchor-badge.up {
  color: #fecaca;
  background: rgba(220,38,38,0.2);
}

.anchor-badge.down {
  color: #bbf7d0;
  background: rgba(22,163,74,0.2);
}

.anchor-badge.flat {
  color: #fde68a;
  background: rgba(245,158,11,0.2);
}

#chart .highcharts-point.top-marker {
  animation: pulse-marker 1.15s ease-in-out infinite;
  transform-origin: center;
  transform-box: fill-box;
}

#chart .highcharts-point.bottom-marker {
  opacity: 0.68;
}

#chart .highcharts-series.trail-series path {
  filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.16));
  opacity: 0.95;
}

@keyframes pulse-marker {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.58;
    transform: scale(1.28);
  }
}

.chart-head {
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 16px;
  margin-bottom: 14px;
}

.chart-title {
  font-size: 28px;
  letter-spacing: -0.04em;
}

.chart-note {
  color: var(--muted);
  font-size: 13px;
  max-width: 540px;
}

.chart-stats {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
}

.mini-stat-card {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 6px 12px;
  border: 1px solid var(--line-soft);
  border-radius: 10px;
  background: rgba(15, 23, 42, 0.03);
  min-width: 80px;
}

.dark .mini-stat-card {
  background: rgba(244, 244, 245, 0.04);
}

.mini-stat-label {
  font-size: 10px;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.mini-stat-value {
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.speed-group {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.speed-btn.is-active {
  border-color: var(--accent);
  background: rgba(63, 63, 70, 0.08);
}

.chart-filter-tags {
  display: inline-flex;
  gap: 4px;
  flex-wrap: wrap;
}

.chart-filter-btn {
  font-size: 11px;
  padding: 2px 8px;
}

.chart-filter-btn.is-active {
  border-color: var(--accent);
  background: rgba(63, 63, 70, 0.08);
}

.toggle-label {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  font-size: 12px;
  color: var(--muted);
  user-select: none;
}

.toggle-label input[type="checkbox"] {
  accent-color: var(--accent);
}

.featured-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
}

.featured-item {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  border: 1px solid var(--line-soft);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.04);
  font-size: 12px;
}

.featured-shape {
  display: inline-block;
  width: 10px;
  height: 10px;
}

.shape-circle {
  border-radius: 999px;
}

.shape-square {
  border-radius: 2px;
}

.shape-triangle {
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 10px solid currentColor;
}

.scrubber {
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px solid var(--line-soft);
}

.scrubber-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.timeline {
  width: 100%;
}

input[type="range"].input {
  width: 100%;
}

.concepts-panel {
  position: relative;
  padding: 20px;
}

.concepts-head {
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 16px;
  margin-bottom: 14px;
}

.concepts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 10px;
}

.concepts-grid.has-two-columns {
  grid-template-columns: 1fr 1fr;
}

.concept-column {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.concept-column-title {
  font-size: 13px;
  font-weight: 600;
  letter-spacing: -0.02em;
  padding-bottom: 4px;
  border-bottom: 1px solid var(--line-soft);
}

.concept-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 10px 14px;
  border-radius: 12px;
}

.concept-item.flow-in {
  border-color: rgba(220, 38, 38, 0.14);
  background: rgba(220, 38, 38, 0.03);
}

.concept-item.flow-out {
  border-color: rgba(22, 163, 74, 0.14);
  background: rgba(22, 163, 74, 0.03);
}

.concept-item:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.04);
}

.concept-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}

.concept-rank {
  color: var(--muted);
  font-size: 10px;
}

.concept-name {
  font-size: 13px;
  line-height: 1.2;
}

.concept-flow {
  margin: 2px 0;
  font-size: 18px;
  letter-spacing: -0.04em;
}

.concept-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  font-size: 11px;
}

.concept-chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  width: fit-content;
  padding: 5px 9px;
  border-radius: 999px;
  background: rgba(255,255,255,0.04);
  color: var(--muted);
  font-size: 11px;
}

.concept-item {
  cursor: pointer;
  text-align: left;
}

.concept-action {
  margin-left: auto;
  font-size: 11px;
  color: var(--muted);
}

.drawer-backdrop {
  position: fixed;
  inset: 0;
  z-index: 80;
  display: none;
  background: rgba(9, 9, 11, 0.42);
  backdrop-filter: blur(4px);
}

.stock-drawer {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 90;
  display: flex;
  flex-direction: column;
  width: min(760px, 100vw);
  height: 100vh;
  padding: 18px;
  border-left: 1px solid var(--line);
  background: var(--panel-strong);
  box-shadow: -24px 0 60px rgba(0, 0, 0, 0.18);
  transform: translateX(100%);
  transition: transform 0.22s ease;
}

body.drawer-open {
  overflow: hidden;
}

body.drawer-open .drawer-backdrop {
  display: block;
}

body.drawer-open .stock-drawer {
  transform: translateX(0);
}

.stock-drawer-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--line-soft);
}

.stock-drawer-title {
  margin: 0;
  font-size: 24px;
  line-height: 1.15;
  letter-spacing: -0.03em;
}

.stock-drawer-meta {
  margin-top: 6px;
  color: var(--muted);
  font-size: 12px;
}

.stock-chart-wrap {
  position: relative;
  margin-top: 14px;
}

#stock-drawer-chart {
  height: 440px;
  border: 1px solid rgba(24, 24, 27, 0.14);
  border-radius: 20px;
  background:
    linear-gradient(180deg, rgba(24, 24, 27, 0.96), rgba(39, 39, 42, 0.94)),
    radial-gradient(circle at top, rgba(255,255,255,0.04), transparent 38%);
  transition: opacity 0.16s ease;
}

.dark #stock-drawer-chart {
  border-color: rgba(244, 244, 245, 0.08);
  background:
    linear-gradient(180deg, rgba(9, 9, 11, 0.98), rgba(24, 24, 27, 0.96)),
    radial-gradient(circle at top, rgba(255,255,255,0.05), transparent 38%);
}

.stock-loading-overlay {
  position: absolute;
  inset: 0;
  z-index: 3;
  display: none;
  align-items: center;
  justify-content: center;
  padding: 24px;
  border-radius: 20px;
  background: linear-gradient(180deg, rgba(9,9,11,0.72), rgba(24,24,27,0.82));
  backdrop-filter: blur(6px);
}

.stock-drawer.is-loading #stock-drawer-chart {
  opacity: 0.42;
}

.stock-drawer.is-loading .stock-loading-overlay {
  display: flex;
}

.stock-loading-card {
  display: grid;
  gap: 14px;
  width: min(360px, 100%);
  padding: 18px;
  border: 1px solid rgba(244,244,245,0.1);
  border-radius: 16px;
  background: rgba(255,255,255,0.05);
}

.stock-loading-head {
  display: flex;
  align-items: center;
  gap: 10px;
  color: rgba(244,244,245,0.88);
  font-size: 13px;
  font-weight: 600;
}

.stock-spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(244,244,245,0.22);
  border-top-color: #ffd36b;
  border-radius: 999px;
  animation: stock-spin 0.8s linear infinite;
}

.stock-loading-lines {
  display: grid;
  gap: 8px;
}

@keyframes stock-spin {
  to {
    transform: rotate(360deg);
  }
}

.stock-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 8px;
  margin-top: 12px;
  overflow-y: auto;
  padding-right: 2px;
}

.stock-row {
  display: grid;
  gap: 4px;
  padding: 10px 12px;
  border: 1px solid var(--line-soft);
  border-radius: 12px;
  background: rgba(63, 63, 70, 0.04);
}

.stock-row-main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.stock-name {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 13px;
  font-weight: 600;
}

.stock-title-line {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
}

.stock-title-line .stock-name {
  flex: 1;
}

.stock-code {
  color: var(--muted);
  font-size: 11px;
}

.stock-tag {
  flex-shrink: 0;
  padding: 1px 6px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 600;
  line-height: 1.5;
}

.stock-tag.core {
  color: #fde68a;
  border: 1px solid rgba(250, 204, 21, 0.34);
  background: rgba(250, 204, 21, 0.12);
}

.stock-empty {
  margin-top: 14px;
  padding: 28px;
  border: 1px dashed var(--line);
  border-radius: 16px;
  color: var(--muted);
  text-align: center;
  font-size: 13px;
}

.stock-row.is-skeleton {
  min-height: 58px;
  pointer-events: none;
}

.muted { color: var(--muted); }
.up { color: var(--up); }
.down { color: var(--down); }
.gold { color: var(--gold); }
.blue { color: var(--blue); }

.loading-overlay {
  position: absolute;
  inset: 0;
  z-index: 15;
  display: none;
  padding: 16px;
  border-radius: inherit;
  background: linear-gradient(180deg, rgba(250, 250, 250, 0.84), rgba(244, 244, 245, 0.78));
  backdrop-filter: blur(6px);
}

.dark .loading-overlay {
  background: linear-gradient(180deg, rgba(9, 9, 11, 0.82), rgba(24, 24, 27, 0.78));
}

body[data-loading="true"] .loading-overlay {
  display: block;
}

body[data-loading="true"] .loading-dim {
  pointer-events: none;
}

.loading-stack {
  display: grid;
  gap: 12px;
  height: 100%;
}

.loading-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
  height: 100%;
}

.loading-concepts {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  height: 100%;
}

.skeleton-card,
.skeleton-line {
  position: relative;
  overflow: hidden;
  border-radius: 14px;
  background: rgba(63, 63, 70, 0.08);
}

.dark .skeleton-card,
.dark .skeleton-line {
  background: rgba(244, 244, 245, 0.08);
}

.skeleton-card::after,
.skeleton-line::after {
  content: "";
  position: absolute;
  inset: 0;
  transform: translateX(-100%);
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.36), transparent);
  animation: skeleton-shimmer 1.2s ease-in-out infinite;
}

.dark .skeleton-card::after,
.dark .skeleton-line::after {
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.14), transparent);
}

.skeleton-card {
  min-height: 112px;
}

.skeleton-line {
  height: 12px;
}

.skeleton-line.lg {
  height: 18px;
}

.skeleton-line.sm {
  width: 38%;
}

.skeleton-line.md {
  width: 62%;
}

.skeleton-line.wide {
  width: 86%;
}

.skeleton-chart {
  min-height: 540px;
}

.skeleton-netflow {
  min-height: 120px;
}

.skeleton-emotion {
  min-height: 180px;
}

.skeleton-concept {
  min-height: 88px;
}

.loading-label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  width: fit-content;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 12px;
  color: var(--muted);
  background: rgba(255,255,255,0.5);
}

.dark .loading-label {
  background: rgba(255,255,255,0.06);
}

@keyframes skeleton-shimmer {
  100% {
    transform: translateX(100%);
  }
}

@media (max-width: 920px) {
  .hero,
  .controls,
  .metric-grid,
  .status-rail,
  .concepts-grid,
  .loading-grid,
  .loading-concepts {
    grid-template-columns: 1fr;
  }

  #chart {
    height: 380px;
  }

  .stock-drawer {
    width: 100vw;
  }

  #stock-drawer-chart {
    height: 360px;
  }
}
`;new URL(`https://fin-flow.lingsbot.online`).origin;var f=e((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.fragment`);function r(e,n,r){var i=null;if(r!==void 0&&(i=``+r),n.key!==void 0&&(i=``+n.key),`key`in n)for(var a in r={},n)a!==`key`&&(r[a]=n[a]);else r=n;return n=r.ref,{$$typeof:t,type:e,key:i,ref:n===void 0?null:n,props:r}}e.Fragment=n,e.jsx=r,e.jsxs=r})),p=e(((e,t)=>{t.exports=f()}))(),m=[[`limit10`,`前10`],[`top3`,`关注前三`],[`bottom3`,`关注后三`],[`inflow`,`只看净流入`],[`outflow`,`只看净流出`]],h=[20,40,60];function g({loading:e}){return(0,p.jsxs)(`section`,{className:`panel chart-panel loading-dim`,"aria-busy":e?`true`:`false`,children:[(0,p.jsxs)(`div`,{className:`chart-head`,children:[(0,p.jsxs)(`div`,{children:[(0,p.jsx)(`div`,{className:`chart-title`,children:`日内资金曲线`}),(0,p.jsxs)(`div`,{className:`chart-note`,children:[`当前仅采集并展示主力净流入前 `,10,` 和净流出前 `,10,` 的概念。光标所在位置，就是你当前查看的市场切片。`]}),(0,p.jsx)(`div`,{className:`chart-stats`,children:(0,p.jsx)(`span`,{className:`chart-filter-tags`,children:m.map(([e,t],n)=>(0,p.jsx)(`button`,{className:`btn-outline size-sm chart-filter-btn${n===0?` is-active`:``}`,"data-filter":e,type:`button`,children:t},e))})}),(0,p.jsx)(`div`,{className:`featured-legend`,id:`featured-legend`})]}),(0,p.jsxs)(`div`,{className:`speed-group`,children:[(0,p.jsx)(`button`,{id:`play-btn`,className:`btn`,type:`button`,children:`播放日内轨迹`}),h.map(e=>(0,p.jsxs)(`button`,{className:`btn-secondary speed-btn`,"data-speed":e,type:`button`,children:[e,`x`]},e))]})]}),(0,p.jsx)(`div`,{id:`chart`}),(0,p.jsx)(`div`,{className:`chart-custom-legend`,id:`chart-custom-legend`}),(0,p.jsx)(`div`,{id:`netflow-chart`,style:{height:120,marginTop:8}}),(0,p.jsx)(`div`,{id:`emotion-chart`,style:{height:180,marginTop:8}}),(0,p.jsx)(_,{}),(0,p.jsx)(v,{}),(0,p.jsx)(y,{})]})}function _(){return(0,p.jsxs)(`div`,{className:`anchor-stream`,children:[(0,p.jsxs)(`div`,{className:`anchor-stream-head`,children:[(0,p.jsx)(`div`,{className:`anchor-stream-title`,children:`大盘联动`}),(0,p.jsx)(`div`,{className:`anchor-stream-meta`,id:`anchor-stream-meta`,children:`等待联动数据...`})]}),(0,p.jsx)(`div`,{className:`anchor-stream-list`,id:`anchor-stream`})]})}function v(){return(0,p.jsxs)(`div`,{className:`scrubber`,children:[(0,p.jsxs)(`div`,{className:`scrubber-head`,children:[(0,p.jsx)(`div`,{className:`muted`,children:`时间进度`}),(0,p.jsx)(`kbd`,{id:`sample-progress`,children:`0 / 0`})]}),(0,p.jsx)(`input`,{id:`timeline`,className:`timeline input w-full`,type:`range`,min:`0`,max:`0`,defaultValue:`0`,step:`1`})]})}function y(){return(0,p.jsx)(`div`,{className:`loading-overlay`,"aria-hidden":`true`,children:(0,p.jsxs)(`div`,{className:`loading-stack`,children:[(0,p.jsx)(`div`,{className:`loading-label`,children:`正在绘制日内资金曲线...`}),(0,p.jsx)(`div`,{className:`skeleton-line wide`}),(0,p.jsx)(`div`,{className:`skeleton-card skeleton-chart`}),(0,p.jsx)(`div`,{className:`skeleton-card skeleton-netflow`}),(0,p.jsx)(`div`,{className:`skeleton-card skeleton-emotion`}),(0,p.jsx)(`div`,{className:`skeleton-line md`})]})})}function b(e,t){let n=t.leaders?.length?t.leaders:e.filter(e=>e.mainFundDiff>0),r=t.laggards?.length?t.laggards:e.filter(e=>e.mainFundDiff<0);return{inflow:n.filter(e=>e.mainFundDiff>0).sort((e,t)=>t.mainFundDiff-e.mainFundDiff),outflow:r.filter(e=>e.mainFundDiff<0).sort((e,t)=>e.mainFundDiff-t.mainFundDiff)}}function x(e,t=`limit10`){let n=b(e.concepts?.length?e.concepts:[...e.leaders||[],...e.laggards||[]],e);return t===`top3`?{inflow:n.inflow.slice(0,3),outflow:n.outflow.slice(0,3)}:t===`bottom3`?{inflow:n.inflow.slice(-3),outflow:n.outflow.slice(-3)}:t===`inflow`?{inflow:n.inflow.slice(0,10),outflow:[]}:t===`outflow`?{inflow:[],outflow:n.outflow.slice(0,10)}:{inflow:n.inflow.slice(0,10),outflow:n.outflow.slice(0,10)}}function ee(e,t=`limit10`){let{inflow:n,outflow:r}=x(e,t),i=n.slice(0,3).reduce((e,t)=>e+t.mainFundDiff,0),a=r.slice(0,3).reduce((e,t)=>e+Math.abs(t.mainFundDiff||0),0),o=n.reduce((e,t)=>e+t.mainFundDiff,0),s=r.reduce((e,t)=>e+Math.abs(t.mainFundDiff||0),0),c=o>0?i/o:0,l=s>0?a/s:0;return{inflowTop3Abs:i,outflowTop3Abs:a,inflowShare:c,outflowShare:l,inflowLabel:S(c),outflowLabel:S(l)}}function S(e){return e>.45?`高集中`:e>=.3?`中等集中`:`分散`}function C(e){let t=Number(e||0),n=Math.abs(t);return n>=0xe8d4a51000?`${(t/0xe8d4a51000).toFixed(2)}万亿`:n>=1e8?`${(t/1e8).toFixed(n>=1e10?0:2)}亿`:n>=1e4?`${(t/1e4).toFixed(2)}万`:String(t)}function te(e){return`${(Number(e||0)*100).toFixed(2)}%`}function ne(e){return{morning:`早盘`,afternoon:`午盘`,lunch_break:`午间休市`,closed:`休市`}[e]||e||`--`}function re(e){return e?new Intl.DateTimeFormat(`zh-CN`,{hour:`2-digit`,minute:`2-digit`,second:`2-digit`,hour12:!1,timeZone:`Asia/Shanghai`}).format(new Date(e)):`--`}function w({sample:e,loading:t}){let n=e?.concepts?.length?e.concepts:[...e?.leaders||[],...e?.laggards||[]],{inflow:r,outflow:i}=e?x(e):{inflow:[],outflow:[]},a=e?b(n,e):{inflow:[],outflow:[]},o=r.length>0&&i.length>0;return(0,p.jsxs)(`section`,{className:`panel concepts-panel loading-dim`,"aria-busy":t?`true`:`false`,children:[(0,p.jsxs)(`div`,{className:`concepts-head`,children:[(0,p.jsxs)(`div`,{children:[(0,p.jsx)(`div`,{className:`chart-title`,style:{fontSize:24},children:`概念板块资金流`}),(0,p.jsx)(`div`,{className:`chart-note`,children:`左列为净流入概念，右列为净流出概念。可通过上方筛选器自由选择关注的板块。`})]}),(0,p.jsxs)(`div`,{className:`metric-sub`,children:[`Top `,20,` Concepts`]})]}),(0,p.jsxs)(`div`,{className:`concepts-grid${o?` has-two-columns`:``}`,id:`concepts-grid`,children:[(0,p.jsx)(ie,{items:r,label:`📈 净流入`,colorClass:`up`,total:a.inflow.length}),(0,p.jsx)(ie,{items:i,label:`📉 净流出`,colorClass:`down`,total:a.outflow.length})]}),(0,p.jsx)(oe,{})]})}function ie({items:e,label:t,colorClass:n,total:r}){return(0,p.jsxs)(`div`,{className:`concept-column`,children:[(0,p.jsxs)(`h3`,{className:`concept-column-title ${n}`,children:[t,` (`,e.length,`/`,r,`)`]}),e.length===0?(0,p.jsx)(`p`,{className:`muted`,style:{padding:`20px 0`,textAlign:`center`},children:`暂无数据`}):e.map((e,t)=>(0,p.jsx)(ae,{item:e,rank:t+1},e.code||`${e.name}-${t}`))]})}function ae({item:e,rank:t}){let n=e.mainFundDiff>=0,r=n?`flow-in`:`flow-out`,i=n?`up`:`down`,a=e.change>=0?`up`:`down`,o=n?`净流入`:`净流出`;return(0,p.jsxs)(`article`,{className:`card concept-item group/item ${r}`,role:`button`,tabIndex:`0`,"data-concept-code":e.code,"data-tooltip":`${e.name} · ${o}`,"data-side":`top`,children:[(0,p.jsxs)(`header`,{className:`concept-top`,children:[(0,p.jsxs)(`div`,{children:[(0,p.jsxs)(`div`,{className:`concept-rank`,children:[`#`,String(t).padStart(2,`0`)]}),(0,p.jsx)(`h2`,{className:`concept-name`,children:e.name})]}),(0,p.jsx)(`span`,{className:i,style:{fontWeight:600,fontSize:11},children:o})]}),(0,p.jsxs)(`section`,{children:[(0,p.jsx)(`div`,{className:`concept-flow ${i}`,children:C(e.mainFundDiff)}),(0,p.jsxs)(`div`,{className:a,style:{fontSize:12},children:[`涨跌幅 `,te(e.change)]})]}),(0,p.jsxs)(`footer`,{className:`concept-foot`,children:[(0,p.jsxs)(`p`,{className:`muted`,children:[`代表股 `,e.leaderStock]}),(0,p.jsx)(`span`,{className:`concept-action`,children:`查看个股分时`})]})]})}function oe(){return(0,p.jsx)(`div`,{className:`loading-overlay`,"aria-hidden":`true`,children:(0,p.jsxs)(`div`,{className:`loading-stack`,children:[(0,p.jsx)(`div`,{className:`loading-label`,children:`正在整理概念资金流...`}),(0,p.jsx)(`div`,{className:`loading-concepts`,children:Array.from({length:6}).map((e,t)=>(0,p.jsx)(`div`,{className:`skeleton-card skeleton-concept`},t))})]})})}function se(){return(0,p.jsxs)(`section`,{className:`controls`,children:[(0,p.jsxs)(`div`,{className:`control-field`,children:[(0,p.jsx)(`span`,{className:`control-label`,children:`交易日`}),(0,p.jsxs)(`div`,{id:`date-combobox`,className:`select`,children:[(0,p.jsxs)(`button`,{type:`button`,className:`btn`,id:`date-combobox-trigger`,"aria-haspopup":`listbox`,"aria-expanded":`false`,"aria-controls":`date-combobox-listbox`,children:[(0,p.jsx)(`span`,{className:`truncate`,children:`选择交易日`}),(0,p.jsx)(ce,{})]}),(0,p.jsxs)(`div`,{id:`date-combobox-popover`,"data-popover":``,"aria-hidden":`true`,children:[(0,p.jsxs)(`header`,{children:[(0,p.jsx)(le,{}),(0,p.jsx)(`input`,{type:`text`,defaultValue:``,placeholder:`搜索交易日...`,autoComplete:`off`,autoCorrect:`off`,spellCheck:`false`,"aria-autocomplete":`list`,role:`combobox`,"aria-expanded":`false`,"aria-controls":`date-combobox-listbox`,"aria-labelledby":`date-combobox-trigger`})]}),(0,p.jsx)(`div`,{role:`listbox`,id:`date-combobox-listbox`,"aria-orientation":`vertical`,"aria-labelledby":`date-combobox-trigger`,"data-empty":`暂无交易日数据`})]}),(0,p.jsx)(`input`,{id:`date-combobox-value`,type:`hidden`,name:`trade-date`,value:``,readOnly:!0})]})]}),(0,p.jsxs)(`div`,{className:`panel`,style:{padding:`12px 14px`},children:[(0,p.jsx)(`div`,{className:`metric-label`,children:`当前市场切片`}),(0,p.jsx)(`div`,{id:`current-time`,className:`metric-value`,style:{fontSize:24},children:`--:--:--`})]}),(0,p.jsxs)(`div`,{className:`control-field`,children:[(0,p.jsx)(`span`,{className:`control-label`,children:`最新交易日`}),(0,p.jsx)(`button`,{id:`latest-btn`,className:`btn-secondary`,type:`button`,children:`跳到最新`})]})]})}function ce(){return(0,p.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:`18`,height:`18`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,"aria-hidden":`true`,children:[(0,p.jsx)(`path`,{d:`m7 15 5 5 5-5`}),(0,p.jsx)(`path`,{d:`m7 9 5-5 5 5`})]})}function le(){return(0,p.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:`18`,height:`18`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,"aria-hidden":`true`,children:[(0,p.jsx)(`circle`,{cx:`11`,cy:`11`,r:`8`}),(0,p.jsx)(`path`,{d:`m21 21-4.3-4.3`})]})}function ue({status:e}){return(0,p.jsxs)(`section`,{className:`hero`,children:[(0,p.jsxs)(`article`,{className:`panel hero-copy`,children:[(0,p.jsxs)(`div`,{className:`eyebrow`,children:[`A-Share Concept Flow / `,20,` Signals`]}),(0,p.jsxs)(`h1`,{children:[`A股概念资金流`,(0,p.jsx)(`br`,{}),`数据可视化回放。`]}),(0,p.jsxs)(`p`,{className:`lead`,children:[`后台自动采集并按天存储 A 股概念板块主力资金流。当前页面聚焦净流入 Top `,10,` 与净流出 Top `,10,`， 支持按交易日查看、日内回放、盘面观察与收盘复盘，帮助你更直观地理解题材轮动和资金迁移。`]}),(0,p.jsxs)(`p`,{className:`lead`,style:{marginTop:14},children:[`延伸阅读： `,(0,p.jsx)(`a`,{href:`/about`,children:`关于本站`}),` / `,(0,p.jsx)(`a`,{href:`/guide/a-share-concept-flow`,children:`A股概念资金流怎么看`}),` /`,` `,(0,p.jsx)(`a`,{href:`/methodology`,children:`数据口径与方法说明`})]})]}),(0,p.jsxs)(`article`,{className:`panel hero-side`,children:[(0,p.jsx)(`div`,{children:(0,p.jsxs)(`div`,{className:`flex items-start justify-between gap-3`,children:[(0,p.jsxs)(`div`,{children:[(0,p.jsx)(`div`,{className:`metric-label`,children:`当前模式`}),(0,p.jsxs)(`div`,{className:`metric-value`,style:{fontSize:34},children:[20,` 概念回放`]})]}),(0,p.jsxs)(`button`,{type:`button`,"aria-label":`切换明暗主题`,"data-tooltip":`切换主题`,"data-side":`bottom`,onClick:()=>document.dispatchEvent(new CustomEvent(`basecoat:theme`)),className:`btn-icon-outline size-8`,children:[(0,p.jsx)(`span`,{className:`hidden dark:block`,children:(0,p.jsx)(E,{})}),(0,p.jsx)(`span`,{className:`block dark:hidden`,children:(0,p.jsx)(de,{})})]})]})}),(0,p.jsxs)(`div`,{className:`status-rail`,children:[(0,p.jsx)(T,{label:`上海时间`,id:`status-now`,value:e?.chinaNow?.isoLike||`--`,badge:!0}),(0,p.jsx)(T,{label:`交易阶段`,id:`status-session`,value:ne(e?.currentTradingSession),badge:!0}),(0,p.jsx)(T,{label:`下次采集`,id:`status-next-run`,value:re(e?.nextRunAt),kbd:!0}),(0,p.jsx)(T,{label:`今日样本`,id:`status-samples`,value:String(e?.samplesToday??`--`),kbd:!0})]})]})]})}function T({label:e,id:t,value:n,badge:r,kbd:i}){return(0,p.jsxs)(`div`,{className:`status-pill`,children:[(0,p.jsx)(`div`,{className:`label`,children:e}),(0,p.jsx)(`div`,{className:`value`,children:r?(0,p.jsx)(`span`,{className:`badge`,id:t,children:n}):i?(0,p.jsx)(`kbd`,{id:t,children:n}):(0,p.jsx)(`span`,{id:t,children:n})})]})}function E(){return(0,p.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:`18`,height:`18`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,p.jsx)(`circle`,{cx:`12`,cy:`12`,r:`4`}),(0,p.jsx)(`path`,{d:`M12 2v2`}),(0,p.jsx)(`path`,{d:`M12 20v2`}),(0,p.jsx)(`path`,{d:`m4.93 4.93 1.41 1.41`}),(0,p.jsx)(`path`,{d:`m17.66 17.66 1.41 1.41`}),(0,p.jsx)(`path`,{d:`M2 12h2`}),(0,p.jsx)(`path`,{d:`M20 12h2`}),(0,p.jsx)(`path`,{d:`m6.34 17.66-1.41 1.41`}),(0,p.jsx)(`path`,{d:`m19.07 4.93-1.41 1.41`})]})}function de(){return(0,p.jsx)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:`18`,height:`18`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:(0,p.jsx)(`path`,{d:`M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z`})})}function fe({data:e,sample:t,loading:n}){let r=O(e,t);return(0,p.jsxs)(`section`,{className:`metric-grid loading-dim`,"aria-busy":n?`true`:`false`,children:[(0,p.jsx)(D,{label:`最近采集时间`,badge:`Live`,valueId:`updated-at`,value:r.updatedAt}),(0,p.jsx)(D,{label:`所选交易日`,badge:`CN`,badgeClassName:`kbd`,valueId:`selected-date`,value:r.selectedDate}),(0,p.jsx)(D,{label:`净流入 / 净流出`,badge:`分布`,valueId:`positive-count`,value:r.positiveCount,subId:`positive-sub`,sub:r.positiveSub}),(0,p.jsx)(D,{label:`净流入 Top3`,badge:`📈`,valueId:`inflow-top3-card`,value:r.inflowTop3,valueClassName:`up`,sub:`买入端前三规模`}),(0,p.jsx)(D,{label:`净流出 Top3`,badge:`📉`,valueId:`outflow-top3-card`,value:r.outflowTop3,valueClassName:`down`,sub:`卖出端前三规模`}),(0,p.jsx)(D,{label:`流入集中`,badge:`📈`,badgeClassName:`badge-outline up`,valueId:`top-three-share`,value:r.inflowShare,sub:`占流入总量比例`}),(0,p.jsx)(D,{label:`流出集中`,badge:`📉`,badgeClassName:`badge-outline down`,valueId:`concentration-badge`,value:r.outflowShare,sub:`占流出总量比例`}),(0,p.jsx)(D,{label:`市场净资金`,badge:`📊`,valueId:`net-flow-stat`,value:r.netFlow,valueClassName:r.netFlowClass,sub:`净流入 + 净流出总和`}),(0,p.jsx)(D,{label:`市场温度`,badge:`🌡️`,valueId:`emotion-degree`,value:r.emotionDegree,sub:(0,p.jsxs)(`span`,{children:[`成交 `,(0,p.jsx)(`span`,{id:`emotion-balance`,children:r.emotionBalance}),` `,(0,p.jsx)(`span`,{id:`emotion-balchg`,className:r.emotionBalanceChangeClass,children:r.emotionBalanceChange}),` · 预估 `,(0,p.jsx)(`span`,{id:`emotion-preview`,children:r.emotionPreview})]})}),(0,p.jsx)(D,{label:`涨停板`,badge:`📋`,valueId:`emotion-updown`,value:r.emotionUpDown,sub:(0,p.jsxs)(`span`,{children:[`封板率 `,(0,p.jsx)(`span`,{id:`emotion-ratio`,children:r.emotionRatio})]})}),(0,p.jsx)(D,{label:`昨日涨停表现`,badge:`📊`,valueId:`emotion-perf`,value:r.emotionPerformance,sub:(0,p.jsxs)(`span`,{children:[`高开 `,(0,p.jsx)(`span`,{id:`emotion-open`,children:r.emotionOpen}),` · 盈利 `,(0,p.jsx)(`span`,{id:`emotion-profit`,children:r.emotionProfit})]})}),(0,p.jsx)(D,{label:`上涨 / 下跌`,badge:`📈📉`,valueId:`emotion-risefall`,value:r.emotionRiseFall,sub:(0,p.jsxs)(`span`,{children:[`涨停 `,(0,p.jsx)(`span`,{id:`emotion-up`,children:r.emotionUp}),` · 跌停 `,(0,p.jsx)(`span`,{id:`emotion-down`,children:r.emotionDown})]})}),(0,p.jsx)(pe,{})]})}function D({label:e,badge:t,badgeClassName:n=`badge-outline`,valueId:r,value:i,valueClassName:a=``,subId:o,sub:s}){return(0,p.jsxs)(`article`,{className:`card metric`,children:[(0,p.jsxs)(`header`,{className:`metric-row`,children:[(0,p.jsxs)(`div`,{children:[(0,p.jsx)(`h2`,{className:`metric-label`,children:e}),(0,p.jsx)(`p`,{className:`sr-only`,children:`实时指标`})]}),(0,p.jsx)(`span`,{className:n,children:t})]}),(0,p.jsxs)(`section`,{children:[(0,p.jsx)(`div`,{className:`metric-value ${a}`.trim(),id:r,children:i}),s?(0,p.jsx)(`p`,{className:`metric-sub`,id:o,children:s}):null]})]})}function pe(){return(0,p.jsx)(`div`,{className:`loading-overlay`,"aria-hidden":`true`,children:(0,p.jsxs)(`div`,{className:`loading-stack`,children:[(0,p.jsx)(`div`,{className:`loading-label`,children:`正在加载交易日数据...`}),(0,p.jsx)(`div`,{className:`loading-grid`,children:Array.from({length:8}).map((e,t)=>(0,p.jsx)(`div`,{className:`skeleton-card`},t))})]})})}function O(e,t){if(!e||!t)return{updatedAt:`--:--:--`,selectedDate:`--`,positiveCount:`--`,positiveSub:`--`,inflowTop3:`--`,outflowTop3:`--`,inflowShare:`--`,outflowShare:`--`,netFlow:`--`,netFlowClass:``,emotionDegree:`--`,emotionBalance:`--`,emotionBalanceChange:`--`,emotionBalanceChangeClass:``,emotionPreview:`--`,emotionUpDown:`--`,emotionRatio:`--`,emotionPerformance:`--`,emotionOpen:`--`,emotionProfit:`--`,emotionRiseFall:`--`,emotionUp:`--`,emotionDown:`--`};let n=ee(t),r=t.concepts?.length?t.concepts:[...t.leaders||[],...t.laggards||[]],i=r.filter(e=>e.mainFundDiff>0).length,a=r.filter(e=>e.mainFundDiff<0).length,o=r.reduce((e,t)=>e+(t.mainFundDiff||0),0),s=e.emotion||t.emotion||{},c=s.balanceChange||0;return{updatedAt:new Intl.DateTimeFormat(`zh-CN`,{hour:`2-digit`,minute:`2-digit`,second:`2-digit`,hour12:!1}).format(new Date(e.updatedAt)),selectedDate:e.requestedDate||`--`,positiveCount:`${i} / ${a}`,positiveSub:`流入 ${i} 个 · 流出 ${a} 个`,inflowTop3:C(n.inflowTop3Abs),outflowTop3:C(n.outflowTop3Abs),inflowShare:`${te(n.inflowShare)} ${n.inflowLabel}`,outflowShare:`${te(n.outflowShare)} ${n.outflowLabel}`,netFlow:C(o),netFlowClass:o>=0?`up`:`down`,emotionDegree:`温度 ${s.degree||`--`}°`,emotionBalance:s.balanceStr||`--`,emotionBalanceChange:`${c>=0?`+`:``}${C(c)}`,emotionBalanceChangeClass:c>=0?`up`:`down`,emotionPreview:s.previewBalanceStr||`--`,emotionUpDown:`${s.riseNum||`--`} / ${s.fallNum||`--`}`,emotionRatio:s.upRatio?`${s.upRatio}%`:`--`,emotionPerformance:s.performance?`${s.performance}%`:`--`,emotionOpen:s.upOpenRatio?`${s.upOpenRatio}%`:`--`,emotionProfit:s.profitRatio?`${s.profitRatio}%`:`--`,emotionRiseFall:`${s.riseNum||`--`} / ${s.fallNum||`--`}`,emotionUp:s.upNum||`--`,emotionDown:s.downNum||`--`}}function k(){return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(`div`,{className:`drawer-backdrop`,id:`stock-drawer-backdrop`,"aria-hidden":`true`}),(0,p.jsxs)(`aside`,{className:`stock-drawer`,id:`stock-drawer`,"aria-hidden":`true`,"aria-labelledby":`stock-drawer-title`,children:[(0,p.jsxs)(`header`,{className:`stock-drawer-head`,children:[(0,p.jsxs)(`div`,{children:[(0,p.jsx)(`h2`,{className:`stock-drawer-title`,id:`stock-drawer-title`,children:`板块个股分时`}),(0,p.jsx)(`div`,{className:`stock-drawer-meta`,id:`stock-drawer-meta`,children:`选择一个概念板块查看个股资金流。`})]}),(0,p.jsx)(`button`,{className:`btn-icon-outline size-8`,id:`stock-drawer-close`,type:`button`,"aria-label":`关闭板块个股分时`,children:(0,p.jsx)(me,{})})]}),(0,p.jsxs)(`div`,{className:`stock-chart-wrap`,children:[(0,p.jsx)(`div`,{id:`stock-drawer-chart`}),(0,p.jsx)(`div`,{className:`stock-loading-overlay`,id:`stock-loading-overlay`,"aria-hidden":`true`,children:(0,p.jsxs)(`div`,{className:`stock-loading-card`,children:[(0,p.jsxs)(`div`,{className:`stock-loading-head`,children:[(0,p.jsx)(`span`,{className:`stock-spinner`,"aria-hidden":`true`}),(0,p.jsx)(`span`,{children:`正在加载板块个股分时`})]}),(0,p.jsxs)(`div`,{className:`stock-loading-lines`,"aria-hidden":`true`,children:[(0,p.jsx)(`div`,{className:`skeleton-line wide`}),(0,p.jsx)(`div`,{className:`skeleton-line md`}),(0,p.jsx)(`div`,{className:`skeleton-line wide`})]})]})})]}),(0,p.jsx)(`div`,{className:`stock-list`,id:`stock-drawer-list`})]})]})}function me(){return(0,p.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:`18`,height:`18`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,p.jsx)(`path`,{d:`M18 6 6 18`}),(0,p.jsx)(`path`,{d:`m6 6 12 12`})]})}var he=`
const REFRESH_MS = 30000;
const FOREGROUND_REFRESH_DEBOUNCE_MS = 5000;
const BASE_PLAY_INTERVAL_MS = 100;
const COLORS = [
  "#38bdf8",
  "#22c55e",
  "#f59e0b",
  "#a78bfa",
  "#f97316",
  "#14b8a6",
  "#8b5cf6",
  "#84cc16",
  "#0ea5e9",
  "#eab308",
  "#10b981",
  "#c084fc",
];
const NEW_ENTRY_MIN_INDEX = 3;
const NEW_ENTRY_MAX_PER_SIDE = 3;

const state = {
  data: null,
  index: 0,
  playing: false,
  timer: null,
  colorMap: {},
  playbackSpeed: 40,
  chartFilter: "limit10",
  foregroundRefreshAt: 0,
  foregroundRefreshing: false,
  selectedConceptCode: null,
  stockDrawerData: null,
  stockDrawerLoading: false,
  stockDrawerCache: {},
};

function setPageLoading(isLoading) {
  document.body.setAttribute("data-loading", isLoading ? "true" : "false");
  document.querySelectorAll(".metric-grid, .chart-panel, .concepts-panel").forEach((section) => {
    section.setAttribute("aria-busy", isLoading ? "true" : "false");
  });
}

function shouldPollLiveData() {
  return document.visibilityState === "visible";
}

readUrlParams();

const dateCombobox = document.getElementById("date-combobox");
const dateTrigger = document.getElementById("date-combobox-trigger");
const datePopover = document.getElementById("date-combobox-popover");
const dateListbox = document.getElementById("date-combobox-listbox");
const dateValueInput = document.getElementById("date-combobox-value");
const dateFilterInput = datePopover ? datePopover.querySelector("input") : null;

const playBtn = document.getElementById("play-btn");
const latestBtn = document.getElementById("latest-btn");
const timeline = document.getElementById("timeline");
const speedButtons = Array.from(document.querySelectorAll(".speed-btn"));
const stockDrawer = document.getElementById("stock-drawer");
const stockDrawerBackdrop = document.getElementById("stock-drawer-backdrop");
const stockDrawerClose = document.getElementById("stock-drawer-close");
let chart;
let netFlowChart;
let emotionChart;
let stockDrawerChart;
let dateController;
function initCombobox({ trigger, popover, listbox, valueInput, filterInput, onSelect }) {
  let open = false;
  let highlightedIndex = -1;

  function getVisibleOptions() {
    return Array.from(listbox.querySelectorAll('[role="option"]:not([hidden])'));
  }

  function openPopover() {
    open = true;
    popover.setAttribute("aria-hidden", "false");
    trigger.setAttribute("aria-expanded", "true");
    highlightedIndex = -1;
    updateHighlight();
    if (filterInput) {
      filterInput.value = "";
      filterOptions("");
      setTimeout(() => filterInput.focus(), 50);
    }
  }

  function closePopover() {
    open = false;
    popover.setAttribute("aria-hidden", "true");
    trigger.setAttribute("aria-expanded", "false");
    highlightedIndex = -1;
    updateHighlight();
  }

  function selectOption(optionEl) {
    const value = optionEl.getAttribute("data-value");
    const label = optionEl.querySelector(".option-label")?.textContent || optionEl.textContent.trim();
    valueInput.value = value;
    const triggerText = trigger.querySelector(".truncate");
    if (triggerText) triggerText.textContent = label;
    closePopover();
    if (onSelect) onSelect(value, label);
  }

  function updateHighlight() {
    const options = getVisibleOptions();
    options.forEach((opt, i) => {
      if (i === highlightedIndex) {
        opt.setAttribute("data-highlighted", "");
      } else {
        opt.removeAttribute("data-highlighted");
      }
    });
  }

  function filterOptions(query) {
    const lower = query.toLowerCase();
    const options = Array.from(listbox.querySelectorAll('[role="option"]'));
    options.forEach((opt) => {
      const text = opt.textContent.toLowerCase();
      if (!lower || text.includes(lower)) {
        opt.removeAttribute("hidden");
      } else {
        opt.setAttribute("hidden", "");
      }
    });
    highlightedIndex = -1;
    updateHighlight();
  }

  function focusOption(direction) {
    const options = getVisibleOptions();
    if (options.length === 0) return;
    if (direction === "next") {
      highlightedIndex = (highlightedIndex + 1) % options.length;
    } else if (direction === "prev") {
      highlightedIndex = highlightedIndex <= 0 ? options.length - 1 : highlightedIndex - 1;
    } else if (direction === "first") {
      highlightedIndex = 0;
    } else if (direction === "last") {
      highlightedIndex = options.length - 1;
    }
    updateHighlight();
    const opt = options[highlightedIndex];
    if (opt) opt.scrollIntoView({ block: "nearest" });
  }

  trigger.addEventListener("click", (e) => {
    e.stopPropagation();
    if (open) {
      closePopover();
    } else {
      openPopover();
    }
  });

  listbox.addEventListener("click", (e) => {
    const option = e.target.closest('[role="option"]');
    if (!option) return;
    selectOption(option);
  });

  if (filterInput) {
    filterInput.addEventListener("input", () => {
      filterOptions(filterInput.value);
    });

    filterInput.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        focusOption("next");
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        focusOption("prev");
      } else if (e.key === "Enter") {
        e.preventDefault();
        const options = getVisibleOptions();
        if (highlightedIndex >= 0 && highlightedIndex < options.length) {
          selectOption(options[highlightedIndex]);
        } else if (options.length > 0) {
          selectOption(options[0]);
        }
      } else if (e.key === "Escape") {
        closePopover();
        trigger.focus();
      }
    });

    filterInput.addEventListener("blur", () => {
      setTimeout(() => {
        if (open && !popover.contains(document.activeElement)) {
          closePopover();
        }
      }, 150);
    });
  }

  document.addEventListener("click", (e) => {
    if (open && !trigger.contains(e.target) && !popover.contains(e.target)) {
      closePopover();
    }
  });

  return {
    open: () => openPopover(),
    close: () => closePopover(),
    selectByValue(value) {
      if (!value) return;
      const option = listbox.querySelector('[role="option"][data-value="' + CSS.escape(value) + '"]');
      if (option) {
        const label = option.textContent.trim();
        const triggerText = trigger.querySelector(".truncate");
        if (triggerText) triggerText.textContent = label;
        valueInput.value = value;
      }
    },
  };
}

function formatFund(value) {
  const abs = Math.abs(value);
  if (abs >= 1e12) return (value / 1e12).toFixed(2) + "万亿";
  if (abs >= 1e8) return (value / 1e8).toFixed(abs >= 1e10 ? 0 : 2) + "亿";
  if (abs >= 1e4) return (value / 1e4).toFixed(2) + "万";
  return String(value);
}

function formatPercent(value) {
  return (value * 100).toFixed(2) + "%";
}

function escapeHtmlText(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatAnchorDirection(direction) {
  if (direction === "up") return "↑ 上涨";
  if (direction === "down") return "↓ 下跌";
  return "→ 联动";
}

function findLastValueAt(dataPoints, index) {
  for (let cursor = index; cursor >= 0; cursor -= 1) {
    const value = dataPoints[cursor];
    if (value != null) return value;
  }
  return null;
}

function buildAnchorScatterData(data) {
  const anchorItems = data.anchors || [];
  const degreeSeries = (data.emotionSeries || {}).degree || [];
  const perIndexCount = {};

  return anchorItems
    .filter((item) => item.index <= state.index)
    .map((item) => {
      const stacked = perIndexCount[item.index] || 0;
      perIndexCount[item.index] = stacked + 1;
      const baseY = findLastValueAt(degreeSeries, item.index) ?? 0;
      const directionFactor = item.direction === "down" ? -1 : 1;
      return {
        x: item.index,
        y: baseY + directionFactor * (3 + stacked * 2),
        name: item.name,
        eventTime: item.time,
        direction: item.direction,
      };
    });
}

function renderAnchorStream(data) {
  const container = document.getElementById("anchor-stream");
  const meta = document.getElementById("anchor-stream-meta");
  const anchors = (data.anchors || []).filter((item) => item.index <= state.index);
  const active = anchors.filter((item) => item.index === state.index);
  const recent = anchors.slice(-6).reverse();

  meta.textContent = active.length > 0
    ? "当前时点 " + active.length + " 条联动事件"
    : "截至当前已发生 " + anchors.length + " 条联动事件";

  if (recent.length === 0) {
    container.innerHTML = '<div class="muted" style="font-size:12px;">当前时点之前暂无联动事件。</div>';
    return;
  }

  container.innerHTML = recent.map((item) =>
    '<article class="anchor-item' + (item.index === state.index ? ' is-active' : '') + '">' +
      '<div class="anchor-item-main">' +
        '<span class="anchor-item-time">' + item.time + '</span>' +
        '<div class="anchor-item-name">' + item.name + '</div>' +
      '</div>' +
      '<span class="anchor-badge ' + item.direction + '">' + formatAnchorDirection(item.direction) + '</span>' +
    '</article>'
  ).join("");
}

function readUrlParams() {
  // No longer store concept filters in URL
}

function syncUrl() {
  const params = new URLSearchParams(window.location.search);
  if (state.data?.requestedDate) {
    params.set("date", state.data.requestedDate);
  } else {
    params.delete("date");
  }
  const newUrl = window.location.pathname + (params.toString() ? "?" + params.toString() : "");
  history.replaceState(null, "", newUrl);
}

function concentrationMeta(sample) {
  const concepts = sample.concepts && sample.concepts.length
    ? sample.concepts
    : [...sample.leaders, ...sample.laggards];
  const { inflow, outflow } = filteredFlowGroups(concepts, sample, state.chartFilter);

  const inflowTop3Abs = inflow.slice(0, 3).reduce((sum, item) => sum + item.mainFundDiff, 0);
  const outflowTop3Abs = outflow.slice(0, 3).reduce((sum, item) => sum + Math.abs(item.mainFundDiff || 0), 0);

  const inflowTotal = inflow.reduce((sum, item) => sum + item.mainFundDiff, 0);
  const outflowTotal = outflow.reduce((sum, item) => sum + Math.abs(item.mainFundDiff || 0), 0);

  const inflowShare = inflowTotal > 0 ? inflowTop3Abs / inflowTotal : 0;
  const outflowShare = outflowTotal > 0 ? outflowTop3Abs / outflowTotal : 0;

  function concentrationLabel(share) {
    if (share > 0.45) return "高集中";
    if (share >= 0.3) return "中等集中";
    return "分散";
  }

  return {
    inflowTop3Abs,
    outflowTop3Abs,
    inflowShare,
    outflowShare,
    inflowLabel: concentrationLabel(inflowShare),
    outflowLabel: concentrationLabel(outflowShare),
  };
}

function limitFromChartFilter(filter) {
  if (filter === "limit10") return 10;
  return 10;
}

function sortedFlowSources(concepts, sample) {
  const inflowSource = sample.leaders && sample.leaders.length
    ? sample.leaders
    : concepts.filter((item) => item.mainFundDiff > 0);
  const outflowSource = sample.laggards && sample.laggards.length
    ? sample.laggards
    : concepts.filter((item) => item.mainFundDiff < 0);

  return {
    inflow: inflowSource
      .filter((item) => item.mainFundDiff > 0)
      .sort((a, b) => b.mainFundDiff - a.mainFundDiff),
    outflow: outflowSource
      .filter((item) => item.mainFundDiff < 0)
      .sort((a, b) => a.mainFundDiff - b.mainFundDiff),
  };
}

function filteredFlowGroups(concepts, sample, filter) {
  const sorted = sortedFlowSources(concepts, sample);
  const limit = limitFromChartFilter(filter);

  if (filter === "top3") {
    return {
      inflow: sorted.inflow.slice(0, 3),
      outflow: sorted.outflow.slice(0, 3),
    };
  }

  if (filter === "bottom3") {
    return {
      inflow: sorted.inflow.slice(-3),
      outflow: sorted.outflow.slice(-3),
    };
  }

  if (filter === "inflow") {
    return {
      inflow: sorted.inflow.slice(0, limit),
      outflow: [],
    };
  }

  if (filter === "outflow") {
    return {
      inflow: [],
      outflow: sorted.outflow.slice(0, limit),
    };
  }

  return {
    inflow: sorted.inflow.slice(0, limit),
    outflow: sorted.outflow.slice(0, limit),
  };
}

function concentrationSeriesData(samples) {
  return samples.map((sample) => {
    const meta = concentrationMeta(sample);
    return {
      inflow: meta.inflowShare * 100,
      outflow: meta.outflowShare * 100,
    };
  });
}

function concentrationAxisRange(seriesData) {
  const allValues = seriesData.flatMap((d) => [d?.inflow ?? 0, d?.outflow ?? 0]);
  const visible = allValues.filter((value) => Number.isFinite(value));
  if (visible.length === 0) {
    return { min: 0, max: 100 };
  }

  const min = Math.min(...visible);
  const max = Math.max(...visible);
  const pad = Math.max(2, (max - min) * 0.35 || 4);
  return {
    min: Math.max(0, Math.floor((min - pad) * 10) / 10),
    max: Math.min(100, Math.ceil((max + pad) * 10) / 10),
  };
}

function formatSessionLabel(session) {
  const map = {
    morning: "早盘",
    afternoon: "午盘",
    lunch_break: "午间休市",
    closed: "休市",
  };
  return map[session] || session || "--";
}

function formatStatusTime(value) {
  if (!value) return "--";
  const date = new Date(value);
  return new Intl.DateTimeFormat("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Asia/Shanghai",
  }).format(date);
}

function hashCode(value) {
  const input = String(value || "");
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = ((hash << 5) - hash + input.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

function stableColorForCode(code) {
  const hash = hashCode(code);
  const hue = hash % 360;
  const saturation = 68 + (hash % 8);
  const lightness = 52 + (hash % 10);
  return "hsl(" + hue + "deg " + saturation + "% " + lightness + "%)";
}

function buildColorMap(data) {
  const conceptCodes = data.chart.series.map((item) => item.code);
  state.colorMap = Object.fromEntries(
    conceptCodes.map((code) => [code, stableColorForCode(code)]),
  );
}

function colorForCode(code) {
  return state.colorMap[code] || stableColorForCode(code) || COLORS[0];
}

function setComboboxValue(value) {
  if (dateController) dateController.selectByValue(value);
}

function renderDateOptions(availableDates, selectedDate) {
  dateListbox.innerHTML = availableDates
    .map((date) => '<div role="option" data-value="' + date + '">' + date + '</div>')
    .join("");
  setComboboxValue(selectedDate);
}

function updateSliderPaint() {
  const min = parseFloat(timeline.min || 0);
  const max = parseFloat(timeline.max || 100);
  const value = parseFloat(timeline.value || 0);
  const percent = max === min ? 0 : ((value - min) / (max - min)) * 100;
  timeline.style.setProperty("--slider-value", percent + "%");
}

function updateSpeedButtons() {
  speedButtons.forEach((button) => {
    button.classList.toggle("is-active", Number(button.dataset.speed) === state.playbackSpeed);
  });
}

async function fetchStatus() {
  if (!shouldPollLiveData()) return false;
  try {
    const response = await fetch("/api/status", { cache: "no-store" });
    if (!response.ok) return false;
    const status = await response.json();
    document.getElementById("status-now").textContent = status.chinaNow?.isoLike || "--";
    document.getElementById("status-session").textContent = formatSessionLabel(status.currentTradingSession);
    document.getElementById("status-next-run").textContent = formatStatusTime(status.nextRunAt);
    document.getElementById("status-samples").textContent = String(status.samplesToday ?? "--");
    return true;
  } catch {
    return false;
  }
}

function stopPlayback() {
  if (state.timer) clearInterval(state.timer);
  state.timer = null;
  state.playing = false;
  playBtn.textContent = "播放日内轨迹";
}

function startPlayback() {
  if (!state.data || state.data.samples.length === 0) return;
  stopPlayback();
  state.playing = true;
  playBtn.textContent = "暂停回放";
  state.timer = setInterval(() => {
    if (state.index >= state.data.samples.length - 1) {
      stopPlayback();
      return;
    }
    setIndex(state.index + 1);
  }, Math.max(8, Math.floor(BASE_PLAY_INTERVAL_MS / state.playbackSpeed)));
}

function togglePlayback() {
  if (state.playing) {
    stopPlayback();
  } else {
    if (state.index >= state.data.samples.length - 1) {
      setIndex(0);
    }
    startPlayback();
  }
}

function ensureNetFlowChart() {
  if (netFlowChart) return netFlowChart;
  netFlowChart = Highcharts.chart("netflow-chart", {
    chart: {
      backgroundColor: "transparent",
      animation: false,
      spacing: [0, 8, 4, 8],
      height: 120,
    },
    title: { text: "市场净资金", align: "left", style: { color: "rgba(244,244,245,0.7)", fontSize: "11px", fontWeight: "400" } },
    credits: { enabled: false },
    exporting: { enabled: false },
    legend: { enabled: true, align: "right", verticalAlign: "top", layout: "horizontal", itemStyle: { color: "rgba(244,244,245,0.7)", fontSize: "10px" }, itemDistance: 14, symbolRadius: 2, symbolWidth: 14, symbolHeight: 3, margin: 0 },
    xAxis: {
      categories: [],
      tickLength: 0,
      lineWidth: 0,
      labels: { enabled: false },
    },
    yAxis: {
      title: { text: null },
      gridLineWidth: 1,
      gridLineColor: "rgba(244,244,245,0.06)",
      labels: {
        style: { color: "rgba(244,244,245,0.5)", fontSize: "10px" },
        formatter() { return formatFund(this.value); },
      },
      plotLines: [{ value: 0, color: "rgba(250,250,250,0.2)", width: 1, zIndex: 4 }],
    },
    tooltip: {
      shared: true,
      backgroundColor: "rgba(9,9,11,0.96)",
      borderColor: "rgba(244,244,245,0.08)",
      style: { color: "#fafafa", fontSize: "11px" },
      useHTML: true,
      formatter() {
        return '<div style="font-size:12px;font-weight:600;margin-bottom:4px;">' + this.x + '</div>' +
          (this.points || []).map((point) =>
            '<div style="display:flex;justify-content:space-between;gap:12px;font-size:11px;">' +
              '<span>' + point.series.name + '</span>' +
              '<span style="font-weight:500;">' + formatFund(point.y) + '</span>' +
            '</div>'
          ).join("");
      },
    },
    plotOptions: {
      column: {
        grouping: false,
        groupPadding: 0,
        pointPadding: 0.05,
        borderWidth: 0,
        animation: { duration: 200 },
      },
    },
    series: [{
      id: "netflow-bars",
      type: "column",
      name: "当日净资金",
      zIndex: 1,
      data: [],
    }, {
      id: "netflow-prev",
      type: "spline",
      name: "昨日净资金",
      color: "rgba(191,219,254,0.42)",
      lineColor: "rgba(191,219,254,0.42)",
      lineWidth: 1.25,
      dashStyle: "ShortDot",
      zIndex: 2,
      data: [],
    }],
  });
  return netFlowChart;
}

function ensureEmotionChart() {
  if (emotionChart) return emotionChart;
  emotionChart = Highcharts.chart("emotion-chart", {
    chart: {
      backgroundColor: "transparent",
      animation: false,
      spacing: [0, 8, 4, 8],
      height: 160,
    },
    title: { text: "市场情绪", align: "left", style: { color: "rgba(244,244,245,0.7)", fontSize: "11px", fontWeight: "400" } },
    credits: { enabled: false },
    exporting: { enabled: false },
    legend: { enabled: true, align: "right", verticalAlign: "top", layout: "horizontal", itemStyle: { color: "rgba(244,244,245,0.7)", fontSize: "10px" }, itemDistance: 14, symbolRadius: 2, symbolWidth: 14, symbolHeight: 3, margin: 0 },
    xAxis: {
      categories: [],
      tickLength: 0,
      lineWidth: 0,
      labels: { enabled: false },
    },
    yAxis: [{
      title: { text: null },
      gridLineWidth: 1,
      gridLineColor: "rgba(244,244,245,0.06)",
      labels: { style: { color: "rgba(244,244,245,0.5)", fontSize: "10px" } },
    }, {
      title: { text: null },
      opposite: true,
      gridLineWidth: 0,
      labels: { style: { color: "rgba(244,244,245,0.4)", fontSize: "10px" }, formatter() { return this.value + "万亿"; } },
    }],
    tooltip: {
      shared: true,
      useHTML: true,
      backgroundColor: "rgba(9,9,11,0.96)",
      borderColor: "rgba(244,244,245,0.08)",
      style: { color: "#fafafa", fontSize: "11px" },
      formatter() {
        const points = this.points || [];
        return '<div style="font-size:12px;font-weight:600;margin-bottom:4px;">' + this.x + '</div>' +
          points.map((p) => {
            if (p.series.options.id.startsWith("emo-anchor")) {
              return '<div style="display:flex;justify-content:space-between;gap:12px;font-size:11px;line-height:1.4;">' +
                '<span>' + (p.point.name || p.series.name) + '</span>' +
                '<span style="font-weight:500;">' + formatAnchorDirection(p.point.direction) + '</span>' +
              '</div>';
            }
            return '<div style="display:flex;justify-content:space-between;gap:12px;font-size:11px;line-height:1.4;">' +
              '<span>' + p.series.name + '</span>' +
              '<span style="font-weight:500;">' + (isEmotionVolumeSeries(p.series.options.id) ? p.y + "万亿" : p.y) + '</span>' +
              '</div>';
          }).join("");
      },
    },
    plotOptions: {
      series: { animation: { duration: 200 }, marker: { enabled: false } },
    },
    series: [{
      id: "emo-degree", type: "spline", name: "市场温度", yAxis: 0, color: "#f59e0b", lineWidth: 2, zIndex: 2, data: [],
    }, {
      id: "emo-degree-prev", type: "spline", name: "昨日温度", yAxis: 0, color: "rgba(245,158,11,0.42)", lineWidth: 1.25, dashStyle: "ShortDot", zIndex: 1, data: [],
    }, {
      id: "emo-balance", type: "area", name: "成交量", yAxis: 1, color: "rgba(59,130,246,0.2)", lineColor: "rgba(59,130,246,0.6)", lineWidth: 1.5, fillOpacity: 0.15, zIndex: 1, data: [],
    }, {
      id: "emo-balance-prev", type: "spline", name: "昨日成交量", yAxis: 1, color: "rgba(147,197,253,0.38)", lineColor: "rgba(147,197,253,0.42)", lineWidth: 1.25, dashStyle: "ShortDot", zIndex: 0, data: [],
    }, {
      id: "emo-preview", type: "spline", name: "预估成交量", yAxis: 1, color: "#93c5fd", lineColor: "#93c5fd", lineWidth: 2, dashStyle: "ShortDash", zIndex: 3, data: [],
    }, {
      id: "emo-anchor-up", type: "scatter", name: "联动上涨", yAxis: 0, color: "#dc2626", zIndex: 5, data: [], showInLegend: false,
      marker: { enabled: true, symbol: "triangle", radius: 5, fillColor: "#dc2626", lineColor: "rgba(255,255,255,0.8)", lineWidth: 1.5 },
      dataLabels: {
        enabled: true,
        allowOverlap: false,
        crop: false,
        overflow: "none",
        x: 8,
        y: -10,
        formatter() { return this.point.name || ""; },
        style: { color: "#fecaca", fontSize: "10px", fontWeight: "600", textOutline: "none" },
      },
      tooltip: { pointFormatter() { return '<span style="color:#dc2626;">▲</span> ' + this.eventTime + ' ' + this.name + ' <b>上涨</b><br/>'; } },
    }, {
      id: "emo-anchor-down", type: "scatter", name: "联动下跌", yAxis: 0, color: "#16a34a", zIndex: 5, data: [], showInLegend: false,
      marker: { enabled: true, symbol: "triangle-down", radius: 5, fillColor: "#16a34a", lineColor: "rgba(255,255,255,0.8)", lineWidth: 1.5 },
      dataLabels: {
        enabled: true,
        allowOverlap: false,
        crop: false,
        overflow: "none",
        x: 8,
        y: 14,
        formatter() { return this.point.name || ""; },
        style: { color: "#bbf7d0", fontSize: "10px", fontWeight: "600", textOutline: "none" },
      },
      tooltip: { pointFormatter() { return '<span style="color:#16a34a;">▼</span> ' + this.eventTime + ' ' + this.name + ' <b>下跌</b><br/>'; } },
    }, {
      id: "emo-anchor-flat", type: "scatter", name: "联动事件", yAxis: 0, color: "#f59e0b", zIndex: 5, data: [], showInLegend: false,
      marker: { enabled: true, symbol: "diamond", radius: 4.5, fillColor: "#f59e0b", lineColor: "rgba(255,255,255,0.8)", lineWidth: 1.5 },
      dataLabels: {
        enabled: true,
        allowOverlap: false,
        crop: false,
        overflow: "none",
        x: 8,
        y: -10,
        formatter() { return this.point.name || ""; },
        style: { color: "#fde68a", fontSize: "10px", fontWeight: "600", textOutline: "none" },
      },
      tooltip: { pointFormatter() { return '<span style="color:#f59e0b;">◆</span> ' + this.eventTime + ' ' + this.name + ' <b>联动</b><br/>'; } },
    }],
  });
  return emotionChart;
}

function ensureStockDrawerChart() {
  if (stockDrawerChart) return stockDrawerChart;
  stockDrawerChart = Highcharts.chart("stock-drawer-chart", {
    chart: {
      backgroundColor: "transparent",
      animation: false,
      spacing: [12, 8, 8, 8],
    },
    title: { text: null },
    credits: { enabled: false },
    exporting: { enabled: false },
    legend: {
      enabled: true,
      align: "left",
      verticalAlign: "bottom",
      itemStyle: { color: "rgba(244,244,245,0.72)", fontSize: "11px" },
      itemHoverStyle: { color: "#fafafa" },
      maxHeight: 86,
    },
    xAxis: {
      categories: [],
      tickLength: 0,
      lineColor: "rgba(244,244,245,0.14)",
      gridLineWidth: 1,
      gridLineColor: "rgba(244,244,245,0.05)",
      labels: {
        formatter() {
          const label = String(this.value || "");
          const parts = label.split(":");
          const mm = parts[1];
          if (this.pos === 0 || this.pos === this.axis.categories.length - 1) return parts[0] + ":" + mm;
          if (mm === "00" || mm === "30") return parts[0] + ":" + mm;
          return "";
        },
        style: { color: "rgba(244,244,245,0.62)" },
      },
    },
    yAxis: {
      title: { text: null },
      gridLineWidth: 1,
      gridLineColor: "rgba(244,244,245,0.08)",
      labels: {
        style: { color: "rgba(244,244,245,0.62)" },
        formatter() { return formatFund(this.value); },
      },
      plotLines: [{ value: 0, color: "rgba(250,250,250,0.24)", width: 1.2, zIndex: 4 }],
    },
    tooltip: {
      shared: true,
      backgroundColor: "rgba(9,9,11,0.96)",
      borderColor: "rgba(244,244,245,0.08)",
      style: { color: "#fafafa" },
      useHTML: true,
      formatter() {
        const rows = (this.points || [])
          .filter((point) => point.y != null)
          .sort((a, b) => Math.abs(b.y) - Math.abs(a.y))
          .map((point) =>
            '<div style="display:flex;justify-content:space-between;gap:14px;font-size:11px;line-height:1.55;">' +
              '<span style="color:' + point.color + ';">● ' + escapeHtmlText(point.series.name) + '</span>' +
              '<span style="color:' + (point.y >= 0 ? '#dc2626' : '#16a34a') + ';font-weight:600;">' + formatFund(point.y) + '</span>' +
            '</div>'
          ).join("");
        return '<div style="font-size:13px;font-weight:600;margin-bottom:6px;">' + this.x + '</div>' + rows;
      },
    },
    plotOptions: {
      series: {
        animation: { duration: 260 },
        marker: { enabled: false },
        lineWidth: 1.8,
        opacity: 0.84,
        connectNulls: false,
        states: { inactive: { opacity: 0.14 } },
      },
    },
    series: [],
  });
  return stockDrawerChart;
}

function currentConcept() {
  const sample = state.data?.samples?.[state.index];
  const concepts = sample?.concepts?.length ? sample.concepts : [...(sample?.leaders || []), ...(sample?.laggards || [])];
  return concepts.find((item) => item.code === state.selectedConceptCode) || null;
}

function stockSnapshotForConcept(conceptCode, index = state.index) {
  if (state.stockDrawerData?.code !== conceptCode) return null;
  // We only have a single snapshot (current), not per-time-index data
  return state.stockDrawerData.samples?.[0] || null;
}

function buildStockSeries(conceptCode) {
  if (state.stockDrawerData?.code !== conceptCode) return [];
  return state.stockDrawerData.series || [];
}

async function fetchStockDrawerData(conceptCode, options = {}) {
  const { force = false } = options;
  const date = state.data?.requestedDate || "";
  const cacheKey = date + ":" + conceptCode;
  if (!force && state.stockDrawerCache[cacheKey]) {
    state.stockDrawerData = state.stockDrawerCache[cacheKey];
    return state.stockDrawerData;
  }

  // 1. Fetch stock list for this concept
  const params = new URLSearchParams();
  if (date) params.set("date", date);
  params.set("code", conceptCode);
  const listRes = await fetch("/api/plate-stocks?" + params.toString(), { cache: "no-store" });
  if (!listRes.ok) throw new Error("加载板块个股失败");
  const listData = await listRes.json();

  // 2. Fetch tline data for each stock in parallel (limit to top 20)
  const stockCodes = (listData.stocks || []).slice(0, 20).map((s) => s.code);
  const tlineResults = await Promise.allSettled(
    stockCodes.map(async (code) => {
      const res = await fetch("/api/tline?code=" + encodeURIComponent(code), { cache: "no-store" });
      if (!res.ok) return null;
      return res.json();
    })
  );

  // 3. Build series from tline data
  const series = [];
  const stockTlineMap = new Map();
  tlineResults.forEach((r, i) => {
    if (r.status === "fulfilled" && r.value?.data?.line) {
      stockTlineMap.set(stockCodes[i], r.value.data.line);
    }
  });

  for (const stock of (listData.stocks || [])) {
    const line = stockTlineMap.get(stock.code);
    if (!line) continue;
    series.push({
      code: stock.code,
      name: stock.name,
      data: line.map((pt) => pt.change || 0),
    });
  }

  // 4. Build samples with stock list for the table
  const sampleStocks = (listData.stocks || []).map((s) => ({
    code: s.code,
    name: s.name,
    fundflow: 0,
    change: s.change || 0,
    isCore: s.isCore || false,
  }));

  const payload = {
    code: conceptCode,
    name: listData.name || conceptCode,
    series,
    samples: [{ stocks: sampleStocks }],
  };

  state.stockDrawerCache[cacheKey] = payload;
  state.stockDrawerData = payload;
  return payload;
}

async function openStockDrawer(conceptCode) {
  state.selectedConceptCode = conceptCode;
  state.stockDrawerData = null;
  state.stockDrawerLoading = true;
  stockDrawer.setAttribute("aria-hidden", "false");
  stockDrawer.classList.add("is-loading");
  document.body.classList.add("drawer-open");
  renderStockDrawer();
  try {
    await fetchStockDrawerData(conceptCode);
  } catch {
    state.stockDrawerData = { code: conceptCode, name: currentConcept()?.name || conceptCode, series: [], samples: [] };
  } finally {
    state.stockDrawerLoading = false;
    stockDrawer.classList.remove("is-loading");
    renderStockDrawer();
    setTimeout(() => {
      if (stockDrawerChart) stockDrawerChart.reflow();
    }, 240);
  }
}

function closeStockDrawer() {
  document.body.classList.remove("drawer-open");
  stockDrawer.setAttribute("aria-hidden", "true");
  state.selectedConceptCode = null;
  state.stockDrawerData = null;
  state.stockDrawerLoading = false;
  stockDrawer.classList.remove("is-loading");
}

function renderStockDrawer() {
  if (!state.data || !state.selectedConceptCode) return;
  const concept = currentConcept();
  const snapshot = stockSnapshotForConcept(state.selectedConceptCode);
  const series = buildStockSeries(state.selectedConceptCode);
  const title = concept?.name || state.stockDrawerData?.name || "板块个股";
  const meta = document.getElementById("stock-drawer-meta");
  const list = document.getElementById("stock-drawer-list");
  const stockChart = ensureStockDrawerChart();

  document.getElementById("stock-drawer-title").textContent = title + " 个股资金流";
  if (state.stockDrawerLoading) {
    meta.textContent = "正在加载板块个股分时...";
  } else {
    meta.textContent = series.length + " 只个股 · 分时走势";
  }

  // Use tline time labels for x-axis (minute-level, full trading day)
  const tlineTimes = series.length > 0 ? buildTlineTimeLabels(series[0].data.length) : [];
  stockChart.xAxis[0].setCategories(tlineTimes, false);

  series.forEach((item) => {
    const existing = stockChart.series.find((s) => s.options.id === item.code);
    const color = stableColorForCode(item.code);
    const options = {
      id: item.code,
      type: "spline",
      name: item.name,
      color,
      zoneAxis: "y",
      zones: [
        { value: 0, color: "#22c55e" },
        { color },
      ],
      data: item.data,
    };
    if (existing) {
      existing.update({ name: options.name, color, zones: options.zones }, false);
      existing.setData(options.data, false, { duration: 220 });
    } else {
      stockChart.addSeries(options, false, { duration: 220 });
    }
  });

  stockChart.series
    .filter((chartSeries) => !series.some((item) => item.code === chartSeries.options.id))
    .forEach((chartSeries) => chartSeries.remove(false));

  stockChart.redraw();

  if (state.stockDrawerLoading) {
    list.innerHTML = Array.from({ length: 6 }).map(() =>
      '<article class="stock-row is-skeleton">' +
        '<div class="skeleton-line wide"></div>' +
        '<div class="skeleton-line md"></div>' +
      '</article>'
    ).join("");
    return;
  }

  const currentStocks = snapshot?.stocks || [];
  if (currentStocks.length === 0) {
    list.innerHTML = '<div class="stock-empty">当前样本暂未采集到这个板块的个股资金流。</div>';
    return;
  }

  list.innerHTML = currentStocks.map((item) => {
    const flowClass = (item.fundflow || 0) >= 0 ? "up" : "down";
    const changeClass = (item.change || 0) >= 0 ? "up" : "down";
    return '<article class="stock-row">' +
      '<div class="stock-row-main">' +
        '<div class="stock-title-line">' +
          '<span class="stock-name">' + escapeHtmlText(item.name) + '</span>' +
          (item.isCore ? '<span class="stock-tag core">核心</span>' : '') +
        '</div>' +
        '<div class="' + flowClass + '" style="font-size:12px;font-weight:600;">' + formatFund(item.fundflow || 0) + '</div>' +
      '</div>' +
      '<div class="stock-row-main">' +
        '<span class="stock-code">' + escapeHtmlText(item.code) + '</span>' +
        '<span class="' + changeClass + '" style="font-size:12px;">' + formatPercent(item.change || 0) + '</span>' +
      '</div>' +
    '</article>';
  }).join("");
}

function ensureChart() {
  if (chart) return chart;
  chart = Highcharts.chart("chart", {
    chart: {
      backgroundColor: "transparent",
      plotBackgroundColor: "rgba(9, 9, 11, 0.18)",
      animation: false,
      spacing: [12, 8, 8, 8],
      marginBottom: 16,
    },
    title: { text: null },
    credits: { enabled: false },
    exporting: { enabled: false },
    legend: {
      enabled: false,
    },
    xAxis: {
      categories: [],
      tickLength: 0,
      lineColor: "rgba(244,244,245,0.14)",
      gridLineWidth: 1,
      gridLineColor: "rgba(244,244,245,0.05)",
      labels: {
        formatter() {
          const label = String(this.value || "");
          const index = this.pos;
          const total = this.axis.categories.length - 1;
          const parts = label.split(":");
          const hh = parts[0];
          const mm = parts[1];
          if (index === 0 || index === total) return hh + ":" + mm;
          if (mm === "00" || mm === "30") return hh + ":" + mm;
          return "";
        },
        style: { color: "rgba(244,244,245,0.62)" },
      },
    },
    yAxis: [
      {
        title: { text: null },
        gridLineWidth: 1,
        gridLineColor: "rgba(244,244,245,0.08)",
        labels: {
          style: { color: "rgba(244,244,245,0.62)" },
          formatter() { return formatFund(this.value); },
        },
        plotLines: [{ id: "zero-line", value: 0, color: "rgba(250,250,250,0.24)", width: 1.2, zIndex: 4 }],
      },
      {
        title: { text: null },
        opposite: true,
        gridLineWidth: 0,
        labels: {
          style: { color: "rgba(244,244,245,0.52)" },
          formatter() { return this.value + "%"; },
        },
      },
    ],
    tooltip: {
      shared: true,
      backgroundColor: "rgba(9,9,11,0.96)",
      borderColor: "rgba(244,244,245,0.08)",
      style: { color: "#fafafa" },
      useHTML: true,
      formatter() {
        const points = this.points || [];
        const pts = points.filter((p) => p.series.options.id !== "net-flow-bars" && !p.series.options.id?.startsWith("conc-"));
        const concIn = points.find((p) => p.series.options.id === "conc-inflow");
        const concOut = points.find((p) => p.series.options.id === "conc-outflow");
        const inflowPts = pts.filter((p) => p.y > 0).sort((a, b) => b.y - a.y);
        const outflowPts = pts.filter((p) => p.y < 0).sort((a, b) => a.y - b.y);

        let html = '<div style="font-size:13px;font-weight:600;margin-bottom:6px;">' + this.x + '</div>';
        html += '<div style="display:flex;gap:16px;">';

        // Inflow column
        html += '<div style="flex:1;min-width:140px;">';
        html += '<div style="font-size:10px;color:#dc2626;margin-bottom:4px;">📈 净流入</div>';
        inflowPts.forEach((p) => {
          html += '<div style="display:flex;justify-content:space-between;gap:8px;font-size:11px;line-height:1.5;">';
          html += '<span style="color:' + p.color + ';">● ' + p.series.name + '</span>';
          html += '<span style="color:' + (p.y >= 0 ? '#dc2626' : '#16a34a') + ';font-weight:500;">' + formatFund(p.y) + '</span>';
          html += '</div>';
        });
        html += '</div>';

        // Outflow column
        html += '<div style="flex:1;min-width:140px;">';
        html += '<div style="font-size:10px;color:#16a34a;margin-bottom:4px;">📉 净流出</div>';
        outflowPts.forEach((p) => {
          html += '<div style="display:flex;justify-content:space-between;gap:8px;font-size:11px;line-height:1.5;">';
          html += '<span style="color:' + p.color + ';">● ' + p.series.name + '</span>';
          html += '<span style="color:' + (p.y >= 0 ? '#dc2626' : '#16a34a') + ';font-weight:500;">' + formatFund(p.y) + '</span>';
          html += '</div>';
        });
        html += '</div>';

        html += '</div>';
        if (concIn || concOut) {
          html += '<div style="margin-top:8px;padding-top:8px;border-top:1px solid rgba(244,244,245,0.08);display:flex;gap:16px;">';
          html += '<div style="flex:1;min-width:140px;display:flex;justify-content:space-between;gap:8px;font-size:11px;line-height:1.5;">';
          html += '<span style="color:#fca5a5;">流入集中度</span>';
          html += '<span style="color:#dc2626;font-weight:600;">' + (concIn ? Number(concIn.y).toFixed(2) + '%' : '--') + '</span>';
          html += '</div>';
          html += '<div style="flex:1;min-width:140px;display:flex;justify-content:space-between;gap:8px;font-size:11px;line-height:1.5;">';
          html += '<span style="color:#86efac;">流出集中度</span>';
          html += '<span style="color:#16a34a;font-weight:600;">' + (concOut ? Number(concOut.y).toFixed(2) + '%' : '--') + '</span>';
          html += '</div>';
          html += '</div>';
        }
        return html;
      },
    },
    plotOptions: {
      series: {
        animation: { duration: 350 },
        marker: { enabled: false },
        lineWidth: 1.8,
        opacity: 0.82,
        connectNulls: false,
        states: {
          inactive: {
            opacity: 0.12,
          },
        },
      },
    },
    series: [],
  });
  return chart;
}

function isEmotionVolumeSeries(seriesId) {
  return seriesId === "emo-balance" ||
    seriesId === "emo-balance-prev" ||
    seriesId === "emo-preview";
}

function visiblePlaybackData(dataPoints) {
  return dataPoints.map((value, index) => (index <= state.index ? value : null));
}

function trailPlaybackData(dataPoints, windowSize = 5) {
  const start = Math.max(0, state.index - windowSize + 1);
  return dataPoints.map((value, index) => (
    index >= start && index <= state.index ? value : null
  ));
}

function latestDefinedValue(dataPoints) {
  for (let index = dataPoints.length - 1; index >= 0; index -= 1) {
    const value = dataPoints[index];
    if (value != null) return value;
  }
  return null;
}

function detectNewEntryAlerts(seriesList) {
  const alerts = [];

  seriesList.forEach((item) => {
    const firstIndex = item.data.findIndex((value) => value != null);
    if (firstIndex < NEW_ENTRY_MIN_INDEX || firstIndex > state.index) return;

    const y = item.data[firstIndex];
    if (y == null) return;

    const isInflow = y > 0;
    alerts.push({
      code: item.code,
      name: item.name,
      x: firstIndex,
      y,
      isInflow,
      color: colorForCode(item.code),
      tag: item.name,
    });
  });

  const sortAlerts = (a, b) => {
    if (a.x !== b.x) return b.x - a.x;
    return Math.abs(b.y) - Math.abs(a.y);
  };

  const inflow = alerts
    .filter((item) => item.isInflow)
    .sort(sortAlerts)
    .slice(0, NEW_ENTRY_MAX_PER_SIDE);

  const outflow = alerts
    .filter((item) => !item.isInflow)
    .sort(sortAlerts)
    .slice(0, NEW_ENTRY_MAX_PER_SIDE);

  return [...inflow, ...outflow];
}

function featuredSeries(data) {
  const sample = data.samples?.[state.index];
  const concepts = sample?.concepts || [];
  const inflow = concepts.filter((item) => item.mainFundDiff > 0).sort((a, b) => b.mainFundDiff - a.mainFundDiff);
  const outflow = concepts.filter((item) => item.mainFundDiff < 0).sort((a, b) => a.mainFundDiff - b.mainFundDiff);
  const symbols = ["circle", "triangle", "square"];

  return {
    top: inflow.slice(0, 3).map((item, index) => ({
      ...item,
      symbol: symbols[index] || "circle",
    })),
    bottom: outflow.slice(0, 3).map((item, index) => ({
      ...item,
      symbol: symbols[index] || "circle",
    })),
  };
}

function renderFeaturedLegend(data) {
  const featured = featuredSeries(data);
  const items = [
    ...featured.top.map((item, index) => ({
      ...item,
      rankLabel: "Top " + (index + 1),
      tone: "up",
    })),
    ...featured.bottom.map((item, index) => ({
      ...item,
      rankLabel: "Bottom " + (index + 1),
      tone: "down",
    })),
  ];

  document.getElementById("featured-legend").innerHTML = items.map((item) => {
    const shapeClass = item.symbol === "triangle"
      ? "shape-triangle"
      : item.symbol === "square"
        ? "shape-square"
        : "shape-circle";
    const color = colorForCode(item.code);
    return '<div class="featured-item">' +
      '<span class="featured-shape ' + shapeClass + '" style="color:' + color + ';background:' + (item.symbol === "triangle" ? "transparent" : color) + '"></span>' +
      '<span class="' + item.tone + '">' + item.rankLabel + '</span>' +
      '<span>' + item.name + '</span>' +
    '</div>';
  }).join("");
}

function renderCustomLegend(data) {
  const series = data.chart.series;
  const inflow = series.filter((item) => {
    const last = latestDefinedValue(item.data);
    return last != null && last > 0;
  });
  const outflow = series.filter((item) => {
    const last = latestDefinedValue(item.data);
    return last != null && last < 0;
  });

  function legendItem(item) {
    const color = colorForCode(item.code);
    return '<span class="chart-legend-item" data-code="' + item.code + '">' +
      '<span class="chart-legend-swatch" style="background:' + color + ';"></span>' +
      '<span>' + item.name + '</span>' +
    '</span>';
  }

  const container = document.getElementById("chart-custom-legend");
  container.innerHTML =
    '<div class="chart-legend-col">' +
      '<h4 class="up">📈 净流入</h4>' +
      inflow.map(legendItem).join("") +
    '</div>' +
    '<div class="chart-legend-col">' +
      '<h4 class="down">📉 净流出</h4>' +
      outflow.map(legendItem).join("") +
    '</div>';

  // Click to toggle series visibility
  container.querySelectorAll(".chart-legend-item").forEach((el) => {
    el.addEventListener("click", () => {
      const code = el.dataset.code;
      const s = chart.series.find((ser) => ser.options.id === code);
      if (s) {
        if (s.visible) {
          s.hide();
          el.classList.add("is-hidden");
        } else {
          s.show();
          el.classList.remove("is-hidden");
        }
      }
    });
  });
}

function renderChart(data) {
  const currentChart = ensureChart();
  currentChart.xAxis[0].setCategories(data.sampleTimes, false);
  let visibleSeries = data.chart.series;
  const sample = data.samples[state.index];
  const concepts = sample?.concepts || [];
  const { inflow: filteredInflow, outflow: filteredOutflow } = filteredFlowGroups(concepts, sample || {}, state.chartFilter);

  // Apply chart filter
  if (state.chartFilter === "inflow") {
    const inflowCodes = new Set(filteredInflow.map((item) => item.code));
    visibleSeries = visibleSeries.filter((item) => inflowCodes.has(item.code));
  } else if (state.chartFilter === "outflow") {
    const outflowCodes = new Set(filteredOutflow.map((item) => item.code));
    visibleSeries = visibleSeries.filter((item) => outflowCodes.has(item.code));
  } else if (
    state.chartFilter === "top3" ||
    state.chartFilter === "bottom3" ||
    state.chartFilter === "limit10"
  ) {
    const visibleCodes = new Set([
      ...filteredInflow.map((item) => item.code),
      ...filteredOutflow.map((item) => item.code),
    ]);
    visibleSeries = visibleSeries.filter((item) => visibleCodes.has(item.code));
  }
  const featured = featuredSeries(data);
  const newEntryAlerts = detectNewEntryAlerts(visibleSeries);
  const concentrationData = visiblePlaybackData(concentrationSeriesData(data.samples));
  const concentrationRange = concentrationAxisRange(concentrationData);

  currentChart.yAxis[1].setExtremes(concentrationRange.min, concentrationRange.max, false, false);

  visibleSeries.forEach((item) => {
    const existing = currentChart.series.find((series) => series.options.id === item.code);
    const color = colorForCode(item.code);
    const options = {
      id: item.code,
      type: "spline",
      name: item.name,
      color,
      zoneAxis: "y",
      zones: [
        { value: 0, color: "#22c55e" },
        { color },
      ],
      data: visiblePlaybackData(item.data),
    };

    if (existing) {
      existing.update({ name: item.name, color, zones: options.zones }, false);
      existing.setData(options.data, false, { duration: 300 });
    } else {
      currentChart.addSeries(options, false, { duration: 300 });
    }
  });

  // Inflow concentration
  const concInData = concentrationData.map((d) => d?.inflow ?? null);
  const concInPt = concInData[state.index];
  [{id:"conc-inflow",name:"流入集中度",color:"#dc2626",dash:"ShortDash",data:concInData},
   {id:"conc-outflow",name:"流出集中度",color:"#16a34a",dash:"ShortDot",data:concentrationData.map((d) => d?.outflow ?? null)}].forEach((sc) => {
    const ex = currentChart.series.find((s) => s.options.id === sc.id);
    const opts = { id:sc.id, type:"spline", name:sc.name, yAxis:1, color:sc.color, lineWidth:2.4, dashStyle:sc.dash, enableMouseTracking:true, marker:{enabled:false}, data:sc.data, zIndex:5 };
    if (ex) { ex.setData(sc.data, false, { duration: 260 }); }
    else { currentChart.addSeries(opts, false, { duration: 260 }); }
  });
  [{id:"conc-inflow-marker",y:concInPt,symbol:"diamond",color:"#dc2626"},
   {id:"conc-outflow-marker",y:concentrationData[state.index]?.outflow ?? null,symbol:"triangle",color:"#16a34a"}].forEach((sc) => {
    const ex = currentChart.series.find((s) => s.options.id === sc.id);
    const opts = { id:sc.id, type:"scatter", name:sc.id, yAxis:1, showInLegend:false, enableMouseTracking:false, zIndex:8, data:sc.y==null?[]:[{x:state.index,y:sc.y,className:"top-marker"}], marker:{enabled:true,symbol:sc.symbol,radius:5,lineWidth:2,lineColor:"rgba(255,255,255,0.85)",fillColor:sc.color} };
    if (ex) { ex.update({marker:opts.marker},false); ex.setData(opts.data,false,{duration:220}); }
    else { currentChart.addSeries(opts,false,{duration:220}); }
  });

  featured.top.forEach((item) => {
    const baseSeries = visibleSeries.find((series) => series.code === item.code);
    if (!baseSeries) return;

    const markerId = "marker-" + item.code;
    const trailId = "trail-" + item.code;
    const existing = currentChart.series.find((series) => series.options.id === markerId);
    const trailExisting = currentChart.series.find((series) => series.options.id === trailId);
    const markerColor = colorForCode(item.code);
    const visibleData = visiblePlaybackData(baseSeries.data);
    const trailData = trailPlaybackData(baseSeries.data, 6);
    const pointValue = visibleData[state.index];
    const markerSeries = {
      id: markerId,
      type: "scatter",
      name: item.name + " marker",
      linkedTo: item.code,
      enableMouseTracking: false,
      showInLegend: false,
      zIndex: 7,
      data: pointValue == null ? [] : [{
        x: state.index,
        y: pointValue,
        className: "top-marker",
      }],
      marker: {
        enabled: true,
        symbol: item.symbol,
        radius: 7,
        lineWidth: 2,
        lineColor: "rgba(255,255,255,0.85)",
        fillColor: markerColor,
      },
    };
    const trailSeries = {
      id: trailId,
      type: "spline",
      name: item.name + " trail",
      linkedTo: item.code,
      enableMouseTracking: false,
      showInLegend: false,
      zIndex: 6,
      className: "trail-series",
      color: markerColor,
      lineWidth: 4,
      opacity: 0.35,
      data: trailData,
    };

    if (existing) {
      existing.update({ marker: markerSeries.marker }, false);
      existing.setData(markerSeries.data, false, { duration: 240 });
    } else {
      currentChart.addSeries(markerSeries, false, { duration: 240 });
    }

    if (trailExisting) {
      trailExisting.setData(trailSeries.data, false, { duration: 240 });
    } else {
      currentChart.addSeries(trailSeries, false, { duration: 240 });
    }
  });

  featured.bottom.forEach((item) => {
    const baseSeries = visibleSeries.find((series) => series.code === item.code);
    if (!baseSeries) return;

    const markerId = "marker-bottom-" + item.code;
    const existing = currentChart.series.find((series) => series.options.id === markerId);
    const markerColor = colorForCode(item.code);
    const visibleData = visiblePlaybackData(baseSeries.data);
    const pointValue = visibleData[state.index];
    const markerSeries = {
      id: markerId,
      type: "scatter",
      name: item.name + " bottom marker",
      linkedTo: item.code,
      enableMouseTracking: false,
      showInLegend: false,
      zIndex: 6,
      data: pointValue == null ? [] : [{
        x: state.index,
        y: pointValue,
        className: "bottom-marker",
      }],
      marker: {
        enabled: true,
        symbol: item.symbol,
        radius: 4.5,
        lineWidth: 1,
        lineColor: "rgba(255,255,255,0.4)",
        fillColor: markerColor,
      },
    };

    if (existing) {
      existing.update({ marker: markerSeries.marker }, false);
      existing.setData(markerSeries.data, false, { duration: 220 });
    } else {
      currentChart.addSeries(markerSeries, false, { duration: 220 });
    }
  });

  const entryAlertsSeries = currentChart.series.find((series) => series.options.id === "new-entry-alerts");
  const entryAlertOptions = {
    id: "new-entry-alerts",
    type: "scatter",
    name: "新进榜提示",
    showInLegend: false,
    zIndex: 9,
    data: newEntryAlerts.map((item) => ({
      x: item.x,
      y: item.y,
      color: item.color,
      entryTag: item.tag,
      name: item.name,
      dataLabels: {
        enabled: true,
        allowOverlap: true,
        crop: false,
        overflow: "none",
        y: item.isInflow ? -14 : 16,
        padding: 0,
        useHTML: true,
        formatter() {
          const bg = item.isInflow ? "rgba(220,38,38,0.9)" : "rgba(22,163,74,0.9)";
          return '<span style="display:inline-block;padding:2px 6px;border-radius:999px;background:' + bg + ';color:#fff;font-size:10px;font-weight:600;white-space:nowrap;">' + (this.point.entryTag || "") + '</span>';
        },
      },
    })),
    marker: {
      enabled: true,
      symbol: "diamond",
      radius: 5,
      lineWidth: 2,
      lineColor: "rgba(255,255,255,0.9)",
    },
    tooltip: {
      pointFormatter() {
        return '<span style="color:' + this.color + ';">●</span> ' + this.name + ' <b>' + this.entryTag + '</b><br/>';
      },
    },
  };

  if (entryAlertsSeries) {
    entryAlertsSeries.setData(entryAlertOptions.data, false, { duration: 220 });
  } else {
    currentChart.addSeries(entryAlertOptions, false, { duration: 220 });
  }

  currentChart.series
    .filter((series) => {
      const isPrimary = visibleSeries.some((item) => item.code === series.options.id);
      const isConcentration = series.options.id === "conc-inflow" || series.options.id === "conc-outflow";
      const isTopMarker = featured.top.some((item) => ("marker-" + item.code) === series.options.id);
      const isTrail = featured.top.some((item) => ("trail-" + item.code) === series.options.id);
      const isBottomMarker = featured.bottom.some((item) => ("marker-bottom-" + item.code) === series.options.id);
      const isConcentrationMarker = series.options.id === "conc-inflow-marker" || series.options.id === "conc-outflow-marker";
      const isNewEntryAlert = series.options.id === "new-entry-alerts";
      return !isPrimary && !isConcentration && !isConcentrationMarker && !isTopMarker && !isTrail && !isBottomMarker && !isNewEntryAlert;
    })
    .forEach((series) => series.remove(false));

  // Net flow bar chart (separate chart below)
  const nfChart = ensureNetFlowChart();
  const netFlowData = data.chart.netFlow || [];
  const previousNetFlowData = data.chart.previousNetFlow || [];
  const netFlowVisible = visiblePlaybackData(netFlowData);
  const previousNetFlowVisible = visiblePlaybackData(previousNetFlowData);
  nfChart.xAxis[0].setCategories(data.sampleTimes, false);
  const nfSeries = nfChart.series.find((s) => s.options.id === "netflow-bars");
  const nfPrevSeries = nfChart.series.find((s) => s.options.id === "netflow-prev");
  nfSeries.setData(netFlowVisible.map((v, i) => ({
    x: i,
    y: v,
    color: v != null ? (v >= 0 ? "rgba(22,163,74,0.5)" : "rgba(220,38,38,0.5)") : "transparent",
  })), false);
  nfPrevSeries.setVisible(previousNetFlowVisible.some((value) => value != null), false);
  nfPrevSeries.setData(previousNetFlowVisible, false);
  nfChart.redraw();
  // Draw cursor line on net flow chart too
  nfChart.xAxis[0].removePlotLine("nf-playhead");
  nfChart.xAxis[0].addPlotLine({ id: "nf-playhead", value: state.index, color: "#ffd36b", width: 1.5, zIndex: 5 });

  // Remove inline net flow series from main chart if it exists
  const oldNf = currentChart.series.find((s) => s.options.id === "net-flow-bars");
  if (oldNf) oldNf.remove(false);

  // Emotion chart (temperature + volume, shared xAxis)
  const emoChart = ensureEmotionChart();
  const emoData = data.emotionSeries || { degree: [], balance: [] };
  emoChart.xAxis[0].setCategories(data.sampleTimes, false);
  const degreeSeries = emoChart.series.find((s) => s.options.id === "emo-degree");
  const degreePrevSeries = emoChart.series.find((s) => s.options.id === "emo-degree-prev");
  const balanceSeries = emoChart.series.find((s) => s.options.id === "emo-balance");
  const balancePrevSeries = emoChart.series.find((s) => s.options.id === "emo-balance-prev");
  const previewSeries = emoChart.series.find((s) => s.options.id === "emo-preview");
  const anchorUpSeries = emoChart.series.find((s) => s.options.id === "emo-anchor-up");
  const anchorDownSeries = emoChart.series.find((s) => s.options.id === "emo-anchor-down");
  const anchorFlatSeries = emoChart.series.find((s) => s.options.id === "emo-anchor-flat");
  const previousDegreeData = visiblePlaybackData(emoData.previousDegree || []);
  const previousBalanceData = visiblePlaybackData(emoData.previousBalance || []);
  degreeSeries.setData(visiblePlaybackData(emoData.degree), false);
  degreePrevSeries.setVisible(previousDegreeData.some((value) => value != null), false);
  degreePrevSeries.setData(previousDegreeData, false);
  balanceSeries.setData(visiblePlaybackData(emoData.balance), false);
  balancePrevSeries.setVisible(previousBalanceData.some((value) => value != null), false);
  balancePrevSeries.setData(previousBalanceData, false);
  previewSeries.setData(visiblePlaybackData(emoData.previewBalance || []), false);
  const anchorScatter = buildAnchorScatterData(data);
  anchorUpSeries.setData(anchorScatter.filter((item) => item.direction === "up"), false);
  anchorDownSeries.setData(anchorScatter.filter((item) => item.direction === "down"), false);
  anchorFlatSeries.setData(anchorScatter.filter((item) => item.direction !== "up" && item.direction !== "down"), false);
  emoChart.redraw();
  emoChart.xAxis[0].removePlotLine("emo-playhead");
  emoChart.xAxis[0].addPlotLine({ id: "emo-playhead", value: state.index, color: "#ffd36b", width: 1.5, zIndex: 5 });

  currentChart.redraw();
  drawCursor();
  renderFeaturedLegend(data);
  renderCustomLegend(data);
}

function drawCursor() {
  if (!chart || !state.data) return;
  const xAxis = chart.xAxis[0];
  const label = state.data.sampleTimes[state.index];

  xAxis.removePlotLine("playhead");
  xAxis.addPlotLine({
    id: "playhead",
    value: state.index,
    color: "#ffd36b",
    width: 1.5,
    zIndex: 5,
    dashStyle: "Dash",
    label: {
      text: label,
      rotation: 0,
      y: 14,
      style: {
        color: "#ffd36b",
        fontSize: "10px",
      },
    },
  });
}

function renderConceptGrid(sample) {
  const concepts = sample.concepts && sample.concepts.length
    ? sample.concepts
    : [...sample.leaders, ...sample.laggards];
  const filtered = concepts;
  const allInflow = filtered.filter((item) => item.mainFundDiff >= 0);
  const allOutflow = filtered.filter((item) => item.mainFundDiff < 0);
  const inflow = allInflow.slice(0, 10);
  const outflow = allOutflow.slice(0, 10);

  function renderColumn(items, label, colorClass, total) {
    if (items.length === 0) {
      return '<div class="concept-column">' +
        '<h3 class="concept-column-title ' + colorClass + '">' + label + ' (0/' + total + ')</h3>' +
        '<p class="muted" style="padding:20px 0;text-align:center;">暂无数据</p>' +
      '</div>';
    }
    let idx = 0;
    return '<div class="concept-column">' +
      '<h3 class="concept-column-title ' + colorClass + '">' + label + ' (' + items.length + '/' + total + ')</h3>' +
      items.map((item) => {
        idx += 1;
        const flowClass = item.mainFundDiff >= 0 ? "flow-in" : "flow-out";
        const valueClass = item.mainFundDiff >= 0 ? "up" : "down";
        const changeClass = item.change >= 0 ? "up" : "down";
        const sideLabel = item.mainFundDiff >= 0 ? "净流入" : "净流出";
        return '<article class="card concept-item group/item ' + flowClass + '" role="button" tabindex="0" data-concept-code="' + escapeHtmlText(item.code) + '" data-tooltip="' + escapeHtmlText(item.name) + ' · ' + sideLabel + '" data-side="top">' +
          '<header class="concept-top">' +
            '<div><div class="concept-rank">#' + String(idx).padStart(2, "0") + '</div><h2 class="concept-name">' + escapeHtmlText(item.name) + '</h2></div>' +
            '<span class="' + valueClass + '" style="font-weight:600;font-size:11px;">' + sideLabel + '</span>' +
          '</header>' +
          '<section>' +
            '<div class="concept-flow ' + valueClass + '">' + formatFund(item.mainFundDiff) + '</div>' +
            '<div class="' + changeClass + '" style="font-size:12px;">涨跌幅 ' + formatPercent(item.change) + '</div>' +
          '</section>' +
          '<footer class="concept-foot">' +
            '<p class="muted">代表股 ' + escapeHtmlText(item.leaderStock) + '</p>' +
            '<span class="concept-action">查看个股分时</span>' +
          '</footer>' +
        '</article>';
      }).join("") +
    '</div>';
  }

  document.getElementById("concepts-grid").innerHTML =
    renderColumn(inflow, "📈 净流入", "up", allInflow.length) +
    renderColumn(outflow, "📉 净流出", "down", allOutflow.length);

  document.getElementById("concepts-grid").classList.toggle("has-two-columns", inflow.length > 0 && outflow.length > 0);
}

function renderMetrics(sample) {
  const concentration = concentrationMeta(sample);
  document.getElementById("current-time").textContent = state.data.sampleTimes[state.index] || "--:--:--";
  document.getElementById("updated-at").textContent = new Intl.DateTimeFormat("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date(state.data.updatedAt));
  document.getElementById("selected-date").textContent = state.data.requestedDate;
  const infCnt = sample.concepts?.filter((c) => c.mainFundDiff > 0).length || 0;
  const outfCnt = sample.concepts?.filter((c) => c.mainFundDiff < 0).length || 0;
  document.getElementById("positive-count").textContent = infCnt + " / " + outfCnt;
  document.getElementById("positive-sub").textContent = "流入 " + infCnt + " 个 · 流出 " + outfCnt + " 个";
  document.getElementById("inflow-top3-card").textContent = formatFund(concentration.inflowTop3Abs);
  document.getElementById("outflow-top3-card").textContent = formatFund(concentration.outflowTop3Abs);
  document.getElementById("top-three-share").textContent = formatPercent(concentration.inflowShare) + " " + concentration.inflowLabel;
  document.getElementById("concentration-badge").textContent = formatPercent(concentration.outflowShare) + " " + concentration.outflowLabel;
  // Net flow
  const all = [...sample.leaders, ...sample.laggards];
  const netFlow = all.reduce((sum, item) => sum + (item.mainFundDiff || 0), 0);
  const netEl = document.getElementById("net-flow-stat");
  netEl.textContent = formatFund(netFlow);
  netEl.className = "metric-value " + (netFlow >= 0 ? "up" : "down");
  document.getElementById("sample-progress").textContent = (state.index + 1) + " / " + state.data.samples.length;
  renderEmotion(state.data);
}

function renderEmotion(data) {
  const emo = data.emotion || {};
  document.getElementById("emotion-degree").textContent = "温度 " + (emo.degree || "--") + "°";
  document.getElementById("emotion-balance").textContent = emo.balanceStr || "--";
  const chgEl = document.getElementById("emotion-balchg");
  const chg = emo.balanceChange || 0;
  chgEl.textContent = (chg >= 0 ? "+" : "") + formatFund(chg);
  chgEl.className = chg >= 0 ? "up" : "down";
  document.getElementById("emotion-preview").textContent = emo.previewBalanceStr || "--";
  document.getElementById("emotion-updown").textContent = (emo.riseNum || "--") + " / " + (emo.fallNum || "--");
  document.getElementById("emotion-ratio").textContent = (emo.upRatio ? emo.upRatio + "%" : "--");
  document.getElementById("emotion-perf").textContent = emo.performance ? emo.performance + "%" : "--";
  document.getElementById("emotion-open").textContent = emo.upOpenRatio ? emo.upOpenRatio + "%" : "--";
  document.getElementById("emotion-profit").textContent = emo.profitRatio ? emo.profitRatio + "%" : "--";
  document.getElementById("emotion-risefall").textContent = (emo.riseNum || "--") + " / " + (emo.fallNum || "--");
  document.getElementById("emotion-up").textContent = emo.upNum || "--";
  document.getElementById("emotion-down").textContent = emo.downNum || "--";
}

function setIndex(index) {
  if (!state.data) return;
  state.index = Math.max(0, Math.min(index, state.data.samples.length - 1));
  timeline.value = String(state.index);
  updateSliderPaint();
  const sample = state.data.samples[state.index];
  renderChart(state.data);
  renderMetrics(sample);
  renderConceptGrid(sample);
  renderAnchorStream(state.data);
  if (state.selectedConceptCode) {
    renderStockDrawer();
  }
}

async function fetchDay(date, options = {}) {
  const { showLoading = false, preserveIndex = false } = options;
  if (showLoading) setPageLoading(true);

  try {
    const previousIndex = state.index;
    const query = date ? "?date=" + encodeURIComponent(date) : "";
    const response = await fetch("/api/finance" + query, { cache: "no-store" });
    if (!response.ok) {
      throw new Error("加载交易日数据失败");
    }

    const data = await response.json();
    buildColorMap(data);
    state.data = data;
    state.index = preserveIndex
      ? Math.min(previousIndex, Math.max(0, data.samples.length - 1))
      : data.initialIndex;

    if (data.availableDates.length > 0) {
      renderDateOptions(data.availableDates, data.requestedDate);
    }
    syncUrl();

    timeline.max = String(Math.max(0, data.samples.length - 1));
    if (state.selectedConceptCode) {
      try {
        await fetchStockDrawerData(state.selectedConceptCode, { force: true });
      } catch {
        state.stockDrawerData = {
          code: state.selectedConceptCode,
          name: currentConcept()?.name || state.selectedConceptCode,
          series: [],
          samples: [],
        };
      }
    }
    renderChart(data);
    setIndex(state.index);
    updateSliderPaint();
    return true;
  } catch {
    return false;
  } finally {
    if (showLoading) setPageLoading(false);
  }
}

async function refreshLiveIfNeeded() {
  if (!state.data) return;
  if (!shouldPollLiveData()) return;
  if (state.data.requestedDate !== state.data.latestDate) return;
  if (state.playing) return;

  const keepAtEnd = state.index >= state.data.samples.length - 1;
  await fetchDay(undefined, { preserveIndex: !keepAtEnd });
}

async function refreshOnForeground() {
  if (!shouldPollLiveData()) return;
  if (state.foregroundRefreshing) return;

  const now = Date.now();
  if (now - state.foregroundRefreshAt < FOREGROUND_REFRESH_DEBOUNCE_MS) return;

  state.foregroundRefreshAt = now;
  state.foregroundRefreshing = true;

  try {
    await Promise.all([
      refreshLiveIfNeeded(),
      fetchStatus(),
    ]);
  } finally {
    state.foregroundRefreshing = false;
  }
}

dateController = initCombobox({
  trigger: dateTrigger,
  popover: datePopover,
  listbox: dateListbox,
  valueInput: dateValueInput,
  filterInput: dateFilterInput,
  onSelect: async (value) => {
    stopPlayback();
    await fetchDay(value, { showLoading: true });
    syncUrl();
  },
});

playBtn.addEventListener("click", togglePlayback);
latestBtn.addEventListener("click", async () => {
  stopPlayback();
  await fetchDay(undefined, { showLoading: true });
});
timeline.addEventListener("input", () => {
  stopPlayback();
  setIndex(Number(timeline.value));
  updateSliderPaint();
});
speedButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const nextSpeed = Number(button.dataset.speed) || 1;
    state.playbackSpeed = nextSpeed;
    updateSpeedButtons();
    if (state.playing) {
      startPlayback();
    }
  });
});


const filterButtons = Array.from(document.querySelectorAll(".chart-filter-btn"));
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    state.chartFilter = btn.dataset.filter;
    filterButtons.forEach((b) => b.classList.toggle("is-active", b.dataset.filter === state.chartFilter));
    if (state.data) setIndex(state.index);
  });
});

/**
 * Build time labels for tline data (271 entries: 9:30-11:30 + 13:00-15:30).
 */
function buildTlineTimeLabels(count) {
  const labels = [];
  // Morning: 9:30 (570 min from midnight) to 11:30 (690 min) = 121 entries
  for (let m = 570; m <= 690 && labels.length < count; m++) {
    labels.push(String(Math.floor(m / 60)).padStart(2, "0") + ":" + String(m % 60).padStart(2, "0"));
  }
  // Afternoon: 13:00 (780 min) to 15:30 (930 min) = 151 entries (total 272, API returns 271)
  for (let m = 780; m <= 930 && labels.length < count; m++) {
    labels.push(String(Math.floor(m / 60)).padStart(2, "0") + ":" + String(m % 60).padStart(2, "0"));
  }
  return labels.slice(0, count);
}

window.__finFlowOpenStockDrawer = openStockDrawer;

document.addEventListener("click", (event) => {
  const item = event.target.closest(".concept-item[data-concept-code]");
  const grid = document.getElementById("concepts-grid");
  if (!grid || !item || !grid.contains(item)) return;
  openStockDrawer(item.dataset.conceptCode);
});

document.addEventListener("finflow:open-stock-drawer", (event) => {
  const conceptCode = event.detail?.code;
  if (!conceptCode) return;
  openStockDrawer(conceptCode);
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== " ") return;
  const item = event.target.closest(".concept-item[data-concept-code]");
  const grid = document.getElementById("concepts-grid");
  if (!grid || !item || !grid.contains(item)) return;
  event.preventDefault();
  openStockDrawer(item.dataset.conceptCode);
});

stockDrawerClose.addEventListener("click", closeStockDrawer);
stockDrawerBackdrop.addEventListener("click", closeStockDrawer);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && state.selectedConceptCode) {
    closeStockDrawer();
  }
});

fetchDay(undefined, { showLoading: true }).then((ok) => {
  fetchStatus();
  updateSpeedButtons();
  updateSliderPaint();
  if (ok) {
    setInterval(refreshLiveIfNeeded, REFRESH_MS);
    setInterval(fetchStatus, REFRESH_MS);
  }
});

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    refreshOnForeground();
  }
});
window.addEventListener("focus", refreshOnForeground);
window.addEventListener("pageshow", refreshOnForeground);
`,ge=!1,_e=null,ve=[`https://cdn.jsdelivr.net/npm/highcharts@12/highcharts.js`,`https://code.highcharts.com/12/highcharts.js`];async function ye(){ge||(ge=!0,await be(),Function(he)())}function be(){return window.Highcharts?Promise.resolve():_e||(_e=xe(ve),_e)}function xe(e,t=0){return new Promise((n,r)=>{let i=e[t];if(!i){r(Error(`Highcharts 加载失败`));return}let a=document.querySelector(`script[data-finflow-highcharts="true"]`);if(a){a.addEventListener(`load`,n,{once:!0}),a.addEventListener(`error`,()=>xe(e,t+1).then(n,r),{once:!0});return}let o=document.createElement(`script`);o.src=i,o.async=!0,o.dataset.finflowHighcharts=`true`,o.addEventListener(`load`,n,{once:!0}),o.addEventListener(`error`,()=>{o.remove(),xe(e,t+1).then(n,r)},{once:!0}),document.head.appendChild(o)})}async function Se(){let e=await fetch(`/api/status`,{cache:`no-store`});if(!e.ok)throw Error(`加载状态失败`);return e.json()}async function Ce(e){let t=e?`?date=${encodeURIComponent(e)}`:``,n=await fetch(`/api/finance${t}`,{cache:`no-store`});if(!n.ok)throw Error(`加载交易日数据失败`);return n.json()}function we(){let[e,t]=(0,l.useState)(null),[n,r]=(0,l.useState)(null);(0,l.useEffect)(()=>{let e=!1;async function n(){try{let n=await Ce();e||(t(n),r(null))}catch(t){e||r(t)}}return n(),()=>{e=!0}},[]);let i=e?Math.max(0,Math.min(e.initialIndex||0,e.samples.length-1)):0,a=e?.samples?.[i]||null;return(0,l.useMemo)(()=>({data:e,error:n,index:i,sample:a,loading:!e&&!n}),[e,n,i,a])}var Te=3e4;function Ee(){let[e,t]=(0,l.useState)(null);return(0,l.useEffect)(()=>{let e=!1;async function n(){if(document.visibilityState===`visible`)try{let n=await Se();e||t(n)}catch{}}n();let r=setInterval(n,Te);return document.addEventListener(`visibilitychange`,n),window.addEventListener(`focus`,n),window.addEventListener(`pageshow`,n),()=>{e=!0,clearInterval(r),document.removeEventListener(`visibilitychange`,n),window.removeEventListener(`focus`,n),window.removeEventListener(`pageshow`,n)}},[]),(0,l.useEffect)(()=>{e&&(De(`status-now`,e.chinaNow?.isoLike||`--`),De(`status-session`,ne(e.currentTradingSession)),De(`status-next-run`,re(e.nextRunAt)),De(`status-samples`,String(e.samplesToday??`--`)))},[e]),e}function De(e,t){let n=document.getElementById(e);n&&(n.textContent=t)}function Oe(){let e=Ee(),t=we();return(0,l.useEffect)(()=>{ye().catch(e=>{console.error(e)})},[]),(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(`style`,{children:d}),(0,p.jsxs)(`main`,{className:`page`,children:[(0,p.jsx)(ue,{status:e}),(0,p.jsx)(se,{}),(0,p.jsx)(fe,{data:t.data,sample:t.sample,loading:t.loading}),(0,p.jsx)(g,{loading:t.loading}),(0,p.jsx)(w,{sample:t.sample,loading:t.loading})]}),(0,p.jsx)(k,{})]})}var ke=1e4;function Ae(){let e=new Date(new Date().toLocaleString(`en-US`,{timeZone:`Asia/Shanghai`})),t=e.getHours(),n=e.getMinutes(),r=e.getDay();if(r===0||r===6)return!1;let i=t*60+n;return i>=540&&i<=695||i>=780&&i<=930}async function je(e){let t=await Promise.allSettled(e.map(async e=>{let t=`/api/tline?code=${encodeURIComponent(e)}`,n=await fetch(t,{cache:`no-store`});if(!n.ok)throw Error(`HTTP ${n.status} for ${e}`);return{code:e,data:await n.json()}})),n=new Map;for(let e of t)e.status===`fulfilled`&&n.set(e.value.code,e.value.data);return n}function Me(e){let t=new URLSearchParams(e),n={};for(let[e,r]of t.entries()){if(!e.startsWith(`group`))continue;let t=r.replace(/^\[|\]$/g,``).trim();if(!t)continue;let i=t.split(`,`).map(e=>e.trim()).filter(Boolean);i.length>0&&(n[e]=i)}return n}function Ne(e){if(!e)return[];let t=e?.data?.line;return Array.isArray(t)?t.map(e=>({time:e.minute,price:e.last_px,avg:e.av_px,volume:e.business_amount,amount:e.business_balance,change:e.change,changePx:e.change_px})):[]}function Pe(e){return e?.data?.name||e?.data?.secu_name||``}function Fe(e){return e?.data?.preclose_px??null}function Ie(e){let[t,n]=(0,l.useState)(new Map),[r,i]=(0,l.useState)(new Map),[a,o]=(0,l.useState)(!0),[s,c]=(0,l.useState)(null),[u,d]=(0,l.useState)(Ae()),f=(0,l.useRef)(null),p=(0,l.useCallback)(async()=>{if(e.length!==0)try{let t=await je(e);n(e=>{let n=new Map(e);for(let[e,r]of t)n.set(e,Ne(r));return n}),i(e=>{let n=new Map(e);for(let[e,r]of t)n.set(e,{name:Pe(r),prevClose:Fe(r)});return n}),c(null)}catch(e){c(e)}finally{o(!1)}},[e.join(`,`)]);return(0,l.useEffect)(()=>{if(e.length===0){o(!1);return}return o(!0),p(),u&&(f.current=setInterval(p,ke)),()=>{f.current&&clearInterval(f.current)}},[p,e.join(`,`),u]),(0,l.useEffect)(()=>{let e=setInterval(()=>{let e=Ae();e!==u&&d(e)},6e4);return()=>clearInterval(e)},[u]),{seriesMap:t,metaMap:r,loading:a,error:s,refresh:p,tradingTime:u}}var Le=[`#4f8cff`,`#ff6b6b`,`#51cf66`,`#ffd43b`,`#cc5de8`,`#20c997`,`#ff922b`,`#748ffc`],Re=960,A={top:24,right:80,bottom:36,left:64},ze=Re-A.left-A.right,Be=271;function Ve(){let e=(0,l.useMemo)(()=>Me(window.location.search),[]),{seriesMap:t,metaMap:n,loading:r,error:i,tradingTime:a}=Ie((0,l.useMemo)(()=>{let t=new Set;for(let n of Object.values(e))for(let e of n)t.add(e);return[...t]},[e]));if(Object.keys(e).length===0)return(0,p.jsx)(`main`,{className:`page`,children:(0,p.jsxs)(`section`,{className:`panel`,style:{maxWidth:560,margin:`80px auto`,textAlign:`center`},children:[(0,p.jsx)(`div`,{className:`eyebrow`,children:`Stock Tline Compare`}),(0,p.jsx)(`h1`,{style:{fontSize:28,marginBottom:16},children:`分时对比工具`}),(0,p.jsx)(`p`,{className:`lead`,style:{marginBottom:20},children:`通过 URL 参数指定股票分组，按组对比分时走势和成交量。`}),(0,p.jsx)(`div`,{style:{padding:14,background:`rgba(63,63,70,0.04)`,borderRadius:12,fontFamily:`monospace`,fontSize:13,color:`var(--muted)`},children:`/tline?group1=sz002008,sz300750&group2=sz600519`})]})});let o=Object.entries(e);return(0,p.jsxs)(`main`,{className:`page tline-page`,children:[(0,p.jsx)(He,{groups:e,loading:r,tradingTime:a}),o.map(([e,i],a)=>(0,p.jsx)(We,{groupName:e,codes:i,groupIndex:a,seriesMap:t,metaMap:n,loading:r},e)),(0,p.jsx)(qe,{groups:e,seriesMap:t,metaMap:n}),i&&(0,p.jsxs)(`div`,{className:`tline-error`,children:[`部分数据加载失败：`,i.message]})]})}function He({groups:e,loading:t,tradingTime:n}){let r=Object.values(e).reduce((e,t)=>e+t.length,0),i=n?`交易时段 · 每10秒刷新`:`非交易时段 · 仅加载一次`;return(0,p.jsxs)(`section`,{className:`panel hero-copy`,style:{marginBottom:16},children:[(0,p.jsxs)(`div`,{className:`eyebrow`,children:[`Stock Tline / `,r,` Symbols`]}),(0,p.jsx)(`h1`,{style:{fontSize:48,marginBottom:12},children:`分时走势对比`}),(0,p.jsx)(`p`,{className:`lead`,children:Object.entries(e).map(([e,t])=>(0,p.jsxs)(`span`,{children:[(0,p.jsx)(`strong`,{children:e}),`: `,t.join(`, `),` `]},e))}),(0,p.jsxs)(`div`,{className:`status-rail`,style:{marginTop:16},children:[(0,p.jsx)(Ue,{label:`股票数量`,value:`${r} 只`}),(0,p.jsx)(Ue,{label:`刷新状态`,value:t?`加载中...`:i}),(0,p.jsx)(Ue,{label:`数据状态`,value:n?`🟢 交易中`:`⚪ 休市`}),(0,p.jsx)(Ue,{label:`对比维度`,value:`涨跌幅 %`})]})]})}function Ue({label:e,value:t}){return(0,p.jsxs)(`div`,{className:`status-pill`,children:[(0,p.jsx)(`div`,{className:`label`,children:e}),(0,p.jsx)(`div`,{className:`value`,children:t})]})}function We({groupName:e,codes:t,groupIndex:n,seriesMap:r,metaMap:i,loading:a}){let{minPct:o,maxPct:s,lines:c}=(0,l.useMemo)(()=>{let a=1/0,o=-1/0,s=[];for(let c=0;c<t.length;c++){let l=t[c],u=r.get(l)||[],d=i.get(l)||{},f=Le[(n*5+c)%Le.length],p=c>0?`${3+c*2} ${2+c}`:void 0,m=d.prevClose,h=u.map(e=>{if(m&&e.price!=null){let t=(e.price-m)/m*100;return t<a&&(a=t),t>o&&(o=t),{...e,pct:t}}return{...e,pct:0}});s.push({code:l,name:d.name||l,groupName:e,series:h,color:f,dashArray:p})}isFinite(a)||(a=-1,o=1);let c=(o-a)*.1||.5;return{minPct:a-c,maxPct:o+c,lines:s}},[t,n,r,i]);return c.length===0?(0,p.jsx)(`section`,{className:`panel chart-panel`,children:(0,p.jsx)(`div`,{className:`chart-head`,children:(0,p.jsxs)(`div`,{children:[(0,p.jsx)(`div`,{className:`chart-title`,children:e}),(0,p.jsx)(`div`,{className:`chart-note`,children:`暂无数据`})]})})}):(0,p.jsxs)(`section`,{className:`panel chart-panel loading-dim`,"aria-busy":a?`true`:`false`,style:{marginBottom:16},children:[(0,p.jsx)(`div`,{className:`chart-head`,children:(0,p.jsxs)(`div`,{children:[(0,p.jsxs)(`div`,{className:`chart-title`,style:{display:`flex`,alignItems:`center`,gap:10},children:[(0,p.jsx)(`span`,{className:`badge`,style:{fontSize:14,padding:`2px 10px`},children:e}),(0,p.jsx)(`span`,{children:`分时走势 + 成交量`})]}),(0,p.jsx)(`div`,{className:`chart-stats`,style:{marginTop:6},children:c.map(e=>(0,p.jsxs)(`span`,{className:`chart-legend-item`,style:{color:e.color},children:[(0,p.jsx)(`span`,{className:`chart-legend-swatch`,style:{background:e.color}}),e.name]},e.code))})]})}),(0,p.jsx)(Ge,{lines:c,minPct:o,maxPct:s}),(0,p.jsx)(Ke,{lines:c,seriesMap:r,codes:t})]})}function Ge({lines:e,minPct:t,maxPct:n}){let[r,i]=(0,l.useState)(null),a=(0,l.useRef)(null),o=320-A.top-A.bottom,s=e.length>0?Math.max(...e.map(e=>e.series.length)):1,c=Math.max(s,Be),u=e=>A.left+e/Math.max(1,c-1)*ze,d=e=>A.top+(n-e)/(n-t)*o,f=(0,l.useCallback)(t=>{if(!a.current||e.length===0)return;let n=a.current.getBoundingClientRect(),r=(t.clientX-n.left)/n.width*Re,o=Math.round((r-A.left)/ze*(c-1));if(o<0||o>=c){i(null);return}let s=e.map(e=>{let t=e.series[o];return t?{name:e.name,color:e.color,price:t.price,pct:t.pct,time:t.time,amount:t.amount}:null}).filter(Boolean);if(s.length===0){i(null);return}i({x:u(o),time:s[0]?.time,items:s,side:u(o)>Re/2?`left`:`right`})},[e,c,Re,ze,u]),m=(0,l.useCallback)(()=>i(null),[]),h=[],g=(n-t)/5;for(let e=0;e<=5;e++)h.push(t+g*e);let _=t<=0&&n>=0?d(0):null,v=Je(c,u);return(0,p.jsxs)(`div`,{className:`tline-chart-wrapper`,style:{position:`relative`},children:[(0,p.jsx)(`div`,{style:{padding:`0 16px`,fontSize:12,color:`var(--muted)`,marginBottom:4},children:`涨跌幅 (%)`}),(0,p.jsxs)(`svg`,{ref:a,viewBox:`0 0 ${Re} 320`,className:`tline-svg`,preserveAspectRatio:`xMidYMid meet`,onMouseMove:f,onMouseLeave:m,style:{cursor:`crosshair`},children:[h.map(e=>(0,p.jsxs)(`g`,{children:[(0,p.jsx)(`line`,{x1:A.left,x2:Re-A.right,y1:d(e),y2:d(e),className:`tline-grid-line`}),(0,p.jsxs)(`text`,{x:A.left-8,y:d(e),textAnchor:`end`,dominantBaseline:`middle`,className:`tline-axis-label`,children:[e>=0?`+`:``,e.toFixed(2),`%`]})]},e)),_!=null&&(0,p.jsxs)(`g`,{children:[(0,p.jsx)(`line`,{x1:A.left,x2:Re-A.right,y1:_,y2:_,className:`tline-prev-close`}),(0,p.jsx)(`text`,{x:Re-A.right+6,y:_,dominantBaseline:`middle`,className:`tline-axis-label`,style:{fontSize:10},children:`0%`})]}),e.map(e=>e.series.length===0?null:(0,p.jsx)(`path`,{d:e.series.map((e,t)=>`${t===0?`M`:`L`}${u(t)},${d(e.pct)}`).join(` `),fill:`none`,stroke:e.color,strokeWidth:1.8,strokeDasharray:e.dashArray,className:`tline-path`},e.code)),e.map(e=>{if(e.series.length===0)return null;let t=e.series.length-1;return(0,p.jsx)(`circle`,{cx:u(t),cy:d(e.series[t].pct),r:4,fill:e.color,stroke:`rgba(24,24,27,0.9)`,strokeWidth:2},`dot-${e.code}`)}),v.map(e=>(0,p.jsx)(`text`,{x:e.x,y:314,textAnchor:`middle`,className:`tline-axis-label`,children:e.label},e.label)),r&&(0,p.jsxs)(`g`,{children:[(0,p.jsx)(`line`,{x1:r.x,x2:r.x,y1:A.top,y2:320-A.bottom,stroke:`rgba(244,244,245,0.3)`,strokeWidth:1,strokeDasharray:`4 4`,pointerEvents:`none`}),r.items.map((e,t)=>(0,p.jsx)(`circle`,{cx:r.x,cy:d(e.pct),r:5,fill:e.color,stroke:`rgba(24,24,27,0.9)`,strokeWidth:2,pointerEvents:`none`},t))]}),(0,p.jsx)(`rect`,{x:A.left,y:A.top,width:ze,height:o,fill:`transparent`})]}),r&&(0,p.jsxs)(`div`,{className:`tline-tooltip`,style:{position:`absolute`,top:10,[r.side===`left`?`right`:`left`]:90,pointerEvents:`none`},children:[(0,p.jsx)(`div`,{className:`tline-tooltip-time`,children:Ye(r.time)}),r.items.map((e,t)=>(0,p.jsxs)(`div`,{className:`tline-tooltip-row`,children:[(0,p.jsx)(`span`,{className:`tline-tooltip-dot`,style:{background:e.color}}),(0,p.jsx)(`span`,{className:`tline-tooltip-name`,children:e.name}),(0,p.jsxs)(`span`,{className:`tline-tooltip-pct`,style:{color:e.pct>=0?`var(--up)`:`var(--down)`},children:[e.pct>=0?`+`:``,e.pct.toFixed(2),`%`]}),(0,p.jsx)(`span`,{className:`tline-tooltip-price`,children:e.price?.toFixed(2)})]},t))]})]})}function Ke({lines:e,seriesMap:t,codes:n}){let r=160-A.top-A.bottom,i=e.length>0?Math.max(...e.map(e=>e.series.length)):1,a=Math.max(i,Be),o=e=>A.left+e/Math.max(1,a-1)*ze;if(e.length===0)return null;let s=Math.max(1,Math.ceil(a/100)),c=Math.ceil(a/s),l=Math.max(3,ze/c*.6/e.length),u=l*e.length,d=Je(a,o);return(0,p.jsxs)(`div`,{className:`tline-chart-wrapper`,style:{borderTop:`1px solid rgba(255,255,255,0.06)`,paddingTop:4},children:[(0,p.jsx)(`div`,{style:{padding:`0 16px`,fontSize:12,color:`var(--muted)`,marginBottom:4},children:`成交额`}),(0,p.jsxs)(`svg`,{viewBox:`0 0 ${Re} 160`,className:`tline-svg`,preserveAspectRatio:`xMidYMid meet`,children:[[0,.25,.5,.75,1].map(e=>{let t=A.top+(1-e)*r;return(0,p.jsxs)(`g`,{children:[(0,p.jsx)(`line`,{x1:A.left,x2:Re-A.right,y1:t,y2:t,className:`tline-grid-line`}),(0,p.jsxs)(`text`,{x:A.left-8,y:t,textAnchor:`end`,dominantBaseline:`middle`,className:`tline-axis-label`,children:[Math.round(e*100),`%`]})]},e)}),e.map((e,t)=>{if(e.series.length===0)return null;let n=Math.max(...e.series.map(e=>e.amount),1);return e.series.filter((e,t)=>t%s===0).map((i,a)=>{let c=o(a*s)-u/2+t*l,d=i.amount/n,f=Math.max(1.5,d*r);return(0,p.jsx)(`rect`,{x:c,y:A.top+r-f,width:Math.max(2,l-1),height:f,fill:e.color,opacity:.7,rx:0},`vol-${e.code}-${a}`)})}),d.map(e=>(0,p.jsx)(`text`,{x:e.x,y:154,textAnchor:`middle`,className:`tline-axis-label`,children:e.label},e.label))]})]})}function qe({groups:e,seriesMap:t,metaMap:n}){let r=[],i=Object.entries(e);for(let e=0;e<i.length;e++){let[a,o]=i[e];for(let e of o){let i=t.get(e)||[],o=i.length>0?i[i.length-1]:null;r.push({groupName:a,code:e,name:n.get(e)?.name||e,price:o?.price??null,changePct:o?.change??null,volume:o?.amount??null})}}return(0,p.jsxs)(`section`,{className:`panel`,style:{marginTop:16},children:[(0,p.jsx)(`div`,{className:`chart-head`,children:(0,p.jsxs)(`div`,{children:[(0,p.jsx)(`div`,{className:`chart-title`,style:{fontSize:22},children:`实时行情`}),(0,p.jsx)(`div`,{className:`chart-note`,children:`各股票最新价格和涨跌幅`})]})}),(0,p.jsxs)(`table`,{className:`tline-table`,children:[(0,p.jsx)(`thead`,{children:(0,p.jsxs)(`tr`,{children:[(0,p.jsx)(`th`,{children:`分组`}),(0,p.jsx)(`th`,{children:`代码`}),(0,p.jsx)(`th`,{children:`名称`}),(0,p.jsx)(`th`,{children:`最新价`}),(0,p.jsx)(`th`,{children:`涨跌幅`}),(0,p.jsx)(`th`,{children:`成交额`})]})}),(0,p.jsx)(`tbody`,{children:r.map(e=>{let t=e.changePct==null?``:e.changePct>=0?`up`:`down`;return(0,p.jsxs)(`tr`,{children:[(0,p.jsx)(`td`,{children:(0,p.jsx)(`span`,{className:`badge`,children:e.groupName})}),(0,p.jsx)(`td`,{className:`muted`,children:e.code}),(0,p.jsx)(`td`,{children:(0,p.jsx)(`strong`,{children:e.name})}),(0,p.jsx)(`td`,{children:e.price==null?`-`:e.price.toFixed(2)}),(0,p.jsx)(`td`,{className:t,children:e.changePct==null?`-`:Xe(e.changePct)}),(0,p.jsx)(`td`,{className:`muted`,children:e.volume==null?`-`:Ze(e.volume)})]},e.code)})})]})]})}function Je(e,t){let n=[930,1e3,1030,1100,1130,1300,1330,1400,1430,1500,1530],r=[];for(let i of n){let n;n=i<=1130?(Math.floor(i/100)-9)*60+i%100-30:121+(Math.floor(i/100)-13)*60+i%100,n>=0&&n<e&&r.push({x:t(n),label:Ye(i)})}return r}function Ye(e){if(e==null)return``;let t=String(e).padStart(4,`0`);return`${t.slice(0,2)}:${t.slice(2,4)}`}function Xe(e){return e==null?`-`:`${e>=0?`+`:``}${e.toFixed(2)}%`}function Ze(e){return e==null?`-`:e>=1e8?`${(e/1e8).toFixed(2)}亿`:e>=1e4?`${(e/1e4).toFixed(0)}万`:String(e)}function Qe(){let e=window.location.pathname;return e===`/tline`||e.startsWith(`/tline/`)?`tline`:`home`}function $e(){return Qe()===`tline`?(0,p.jsx)(Ve,{}):(0,p.jsx)(Oe,{})}(0,u.createRoot)(document.getElementById(`app`)).render((0,p.jsx)($e,{}));