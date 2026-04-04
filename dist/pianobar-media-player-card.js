function t(t,e,o,n){var i,s=arguments.length,a=s<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,o,n);else for(var r=t.length-1;r>=0;r--)(i=t[r])&&(a=(s<3?i(a):s>3?i(e,o,a):i(e,o))||a);return s>3&&a&&Object.defineProperty(e,o,a),a}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,o=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,n=Symbol(),i=new WeakMap;let s=class{constructor(t,e,o){if(this._$cssResult$=!0,o!==n)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(o&&void 0===t){const o=void 0!==e&&1===e.length;o&&(t=i.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),o&&i.set(e,t))}return t}toString(){return this.cssText}};const a=(t,...e)=>{const o=1===t.length?t[0]:e.reduce((e,o,n)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+t[n+1],t[0]);return new s(o,t,n)},r=o?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const o of t.cssRules)e+=o.cssText;return(t=>new s("string"==typeof t?t:t+"",void 0,n))(e)})(t):t,{is:c,defineProperty:d,getOwnPropertyDescriptor:l,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,g=globalThis,m=g.trustedTypes,b=m?m.emptyScript:"",_=g.reactiveElementPolyfillSupport,f=(t,e)=>t,v={toAttribute(t,e){switch(e){case Boolean:t=t?b:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let o=t;switch(e){case Boolean:o=null!==t;break;case Number:o=null===t?null:Number(t);break;case Object:case Array:try{o=JSON.parse(t)}catch(t){o=null}}return o}},y=(t,e)=>!c(t,e),x={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:y};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=x){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const o=Symbol(),n=this.getPropertyDescriptor(t,o,e);void 0!==n&&d(this.prototype,t,n)}}static getPropertyDescriptor(t,e,o){const{get:n,set:i}=l(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:n,set(e){const s=n?.call(this);i?.call(this,e),this.requestUpdate(t,s,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??x}static _$Ei(){if(this.hasOwnProperty(f("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(f("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(f("properties"))){const t=this.properties,e=[...h(t),...p(t)];for(const o of e)this.createProperty(o,t[o])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,o]of e)this.elementProperties.set(t,o)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const o=this._$Eu(t,e);void 0!==o&&this._$Eh.set(o,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const o=new Set(t.flat(1/0).reverse());for(const t of o)e.unshift(r(t))}else void 0!==t&&e.push(r(t));return e}static _$Eu(t,e){const o=e.attribute;return!1===o?void 0:"string"==typeof o?o:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const o of e.keys())this.hasOwnProperty(o)&&(t.set(o,this[o]),delete this[o]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,n)=>{if(o)t.adoptedStyleSheets=n.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const o of n){const n=document.createElement("style"),i=e.litNonce;void 0!==i&&n.setAttribute("nonce",i),n.textContent=o.cssText,t.appendChild(n)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,o){this._$AK(t,o)}_$ET(t,e){const o=this.constructor.elementProperties.get(t),n=this.constructor._$Eu(t,o);if(void 0!==n&&!0===o.reflect){const i=(void 0!==o.converter?.toAttribute?o.converter:v).toAttribute(e,o.type);this._$Em=t,null==i?this.removeAttribute(n):this.setAttribute(n,i),this._$Em=null}}_$AK(t,e){const o=this.constructor,n=o._$Eh.get(t);if(void 0!==n&&this._$Em!==n){const t=o.getPropertyOptions(n),i="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:v;this._$Em=n;const s=i.fromAttribute(e,t.type);this[n]=s??this._$Ej?.get(n)??s,this._$Em=null}}requestUpdate(t,e,o,n=!1,i){if(void 0!==t){const s=this.constructor;if(!1===n&&(i=this[t]),o??=s.getPropertyOptions(t),!((o.hasChanged??y)(i,e)||o.useDefault&&o.reflect&&i===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,o))))return;this.C(t,e,o)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:o,reflect:n,wrapped:i},s){o&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,s??e??this[t]),!0!==i||void 0!==s)||(this._$AL.has(t)||(this.hasUpdated||o||(e=void 0),this._$AL.set(t,e)),!0===n&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,o]of t){const{wrapped:t}=o,n=this[e];!0!==t||this._$AL.has(e)||void 0===n||this.C(e,void 0,o,n)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[f("elementProperties")]=new Map,w[f("finalized")]=new Map,_?.({ReactiveElement:w}),(g.reactiveElementVersions??=[]).push("2.1.2");const $=globalThis,k=t=>t,S=$.trustedTypes,C=S?S.createPolicy("lit-html",{createHTML:t=>t}):void 0,P="$lit$",A=`lit$${Math.random().toFixed(9).slice(2)}$`,E="?"+A,M=`<${E}>`,I=document,O=()=>I.createComment(""),D=t=>null===t||"object"!=typeof t&&"function"!=typeof t,T=Array.isArray,z="[ \t\n\f\r]",R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,L=/-->/g,N=/>/g,B=RegExp(`>|${z}(?:([^\\s"'>=/]+)(${z}*=${z}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),U=/'/g,q=/"/g,j=/^(?:script|style|textarea|title)$/i,V=(t=>(e,...o)=>({_$litType$:t,strings:e,values:o}))(1),F=Symbol.for("lit-noChange"),H=Symbol.for("lit-nothing"),Q=new WeakMap,W=I.createTreeWalker(I,129);function G(t,e){if(!T(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==C?C.createHTML(e):e}const X=(t,e)=>{const o=t.length-1,n=[];let i,s=2===e?"<svg>":3===e?"<math>":"",a=R;for(let e=0;e<o;e++){const o=t[e];let r,c,d=-1,l=0;for(;l<o.length&&(a.lastIndex=l,c=a.exec(o),null!==c);)l=a.lastIndex,a===R?"!--"===c[1]?a=L:void 0!==c[1]?a=N:void 0!==c[2]?(j.test(c[2])&&(i=RegExp("</"+c[2],"g")),a=B):void 0!==c[3]&&(a=B):a===B?">"===c[0]?(a=i??R,d=-1):void 0===c[1]?d=-2:(d=a.lastIndex-c[2].length,r=c[1],a=void 0===c[3]?B:'"'===c[3]?q:U):a===q||a===U?a=B:a===L||a===N?a=R:(a=B,i=void 0);const h=a===B&&t[e+1].startsWith("/>")?" ":"";s+=a===R?o+M:d>=0?(n.push(r),o.slice(0,d)+P+o.slice(d)+A+h):o+A+(-2===d?e:h)}return[G(t,s+(t[o]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),n]};class Y{constructor({strings:t,_$litType$:e},o){let n;this.parts=[];let i=0,s=0;const a=t.length-1,r=this.parts,[c,d]=X(t,e);if(this.el=Y.createElement(c,o),W.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(n=W.nextNode())&&r.length<a;){if(1===n.nodeType){if(n.hasAttributes())for(const t of n.getAttributeNames())if(t.endsWith(P)){const e=d[s++],o=n.getAttribute(t).split(A),a=/([.?@])?(.*)/.exec(e);r.push({type:1,index:i,name:a[2],strings:o,ctor:"."===a[1]?et:"?"===a[1]?ot:"@"===a[1]?nt:tt}),n.removeAttribute(t)}else t.startsWith(A)&&(r.push({type:6,index:i}),n.removeAttribute(t));if(j.test(n.tagName)){const t=n.textContent.split(A),e=t.length-1;if(e>0){n.textContent=S?S.emptyScript:"";for(let o=0;o<e;o++)n.append(t[o],O()),W.nextNode(),r.push({type:2,index:++i});n.append(t[e],O())}}}else if(8===n.nodeType)if(n.data===E)r.push({type:2,index:i});else{let t=-1;for(;-1!==(t=n.data.indexOf(A,t+1));)r.push({type:7,index:i}),t+=A.length-1}i++}}static createElement(t,e){const o=I.createElement("template");return o.innerHTML=t,o}}function J(t,e,o=t,n){if(e===F)return e;let i=void 0!==n?o._$Co?.[n]:o._$Cl;const s=D(e)?void 0:e._$litDirective$;return i?.constructor!==s&&(i?._$AO?.(!1),void 0===s?i=void 0:(i=new s(t),i._$AT(t,o,n)),void 0!==n?(o._$Co??=[])[n]=i:o._$Cl=i),void 0!==i&&(e=J(t,i._$AS(t,e.values),i,n)),e}class Z{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:o}=this._$AD,n=(t?.creationScope??I).importNode(e,!0);W.currentNode=n;let i=W.nextNode(),s=0,a=0,r=o[0];for(;void 0!==r;){if(s===r.index){let e;2===r.type?e=new K(i,i.nextSibling,this,t):1===r.type?e=new r.ctor(i,r.name,r.strings,this,t):6===r.type&&(e=new it(i,this,t)),this._$AV.push(e),r=o[++a]}s!==r?.index&&(i=W.nextNode(),s++)}return W.currentNode=I,n}p(t){let e=0;for(const o of this._$AV)void 0!==o&&(void 0!==o.strings?(o._$AI(t,o,e),e+=o.strings.length-2):o._$AI(t[e])),e++}}class K{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,o,n){this.type=2,this._$AH=H,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=o,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=J(this,t,e),D(t)?t===H||null==t||""===t?(this._$AH!==H&&this._$AR(),this._$AH=H):t!==this._$AH&&t!==F&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>T(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==H&&D(this._$AH)?this._$AA.nextSibling.data=t:this.T(I.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:o}=t,n="number"==typeof o?this._$AC(t):(void 0===o.el&&(o.el=Y.createElement(G(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===n)this._$AH.p(e);else{const t=new Z(n,this),o=t.u(this.options);t.p(e),this.T(o),this._$AH=t}}_$AC(t){let e=Q.get(t.strings);return void 0===e&&Q.set(t.strings,e=new Y(t)),e}k(t){T(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let o,n=0;for(const i of t)n===e.length?e.push(o=new K(this.O(O()),this.O(O()),this,this.options)):o=e[n],o._$AI(i),n++;n<e.length&&(this._$AR(o&&o._$AB.nextSibling,n),e.length=n)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=k(t).nextSibling;k(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,o,n,i){this.type=1,this._$AH=H,this._$AN=void 0,this.element=t,this.name=e,this._$AM=n,this.options=i,o.length>2||""!==o[0]||""!==o[1]?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=H}_$AI(t,e=this,o,n){const i=this.strings;let s=!1;if(void 0===i)t=J(this,t,e,0),s=!D(t)||t!==this._$AH&&t!==F,s&&(this._$AH=t);else{const n=t;let a,r;for(t=i[0],a=0;a<i.length-1;a++)r=J(this,n[o+a],e,a),r===F&&(r=this._$AH[a]),s||=!D(r)||r!==this._$AH[a],r===H?t=H:t!==H&&(t+=(r??"")+i[a+1]),this._$AH[a]=r}s&&!n&&this.j(t)}j(t){t===H?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===H?void 0:t}}class ot extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==H)}}class nt extends tt{constructor(t,e,o,n,i){super(t,e,o,n,i),this.type=5}_$AI(t,e=this){if((t=J(this,t,e,0)??H)===F)return;const o=this._$AH,n=t===H&&o!==H||t.capture!==o.capture||t.once!==o.once||t.passive!==o.passive,i=t!==H&&(o===H||n);n&&this.element.removeEventListener(this.name,this,o),i&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class it{constructor(t,e,o){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(t){J(this,t)}}const st=$.litHtmlPolyfillSupport;st?.(Y,K),($.litHtmlVersions??=[]).push("3.3.2");const at=(t,e,o)=>{const n=o?.renderBefore??e;let i=n._$litPart$;if(void 0===i){const t=o?.renderBefore??null;n._$litPart$=i=new K(e.insertBefore(O(),t),t,void 0,o??{})}return i._$AI(t),i},rt=globalThis;let ct=class extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=at(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return F}};ct._$litElement$=!0,ct.finalized=!0,rt.litElementHydrateSupport?.({LitElement:ct});const dt=rt.litElementPolyfillSupport;dt?.({LitElement:ct}),(rt.litElementVersions??=[]).push("4.2.2");const lt=t=>(e,o)=>{void 0!==o?o.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},ht={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:y},pt=(t=ht,e,o)=>{const{kind:n,metadata:i}=o;let s=globalThis.litPropertyMetadata.get(i);if(void 0===s&&globalThis.litPropertyMetadata.set(i,s=new Map),"setter"===n&&((t=Object.create(t)).wrapped=!0),s.set(o.name,t),"accessor"===n){const{name:n}=o;return{set(o){const i=e.get.call(this);e.set.call(this,o),this.requestUpdate(n,i,t,!0,o)},init(e){return void 0!==e&&this.C(n,void 0,t,e),e}}}if("setter"===n){const{name:n}=o;return function(o){const i=this[n];e.call(this,o),this.requestUpdate(n,i,t,!0,o)}}throw Error("Unsupported decorator location: "+n)};function ut(t){return(e,o)=>"object"==typeof o?pt(t,e,o):((t,e,o)=>{const n=e.hasOwnProperty(o);return e.constructor.createProperty(o,t),n?Object.getOwnPropertyDescriptor(e,o):void 0})(t,e,o)}function gt(t){return ut({...t,state:!0,attribute:!1})}const mt=1,bt=2,_t=t=>(...e)=>({_$litDirective$:t,values:e});let ft=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,o){this._$Ct=t,this._$AM=e,this._$Ci=o}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};const vt="important",yt=" !"+vt,xt=_t(class extends ft{constructor(t){if(super(t),t.type!==mt||"style"!==t.name||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,o)=>{const n=t[o];return null==n?e:e+`${o=o.includes("-")?o:o.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${n};`},"")}update(t,[e]){const{style:o}=t.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(e)),this.render(e);for(const t of this.ft)null==e[t]&&(this.ft.delete(t),t.includes("-")?o.removeProperty(t):o[t]=null);for(const t in e){const n=e[t];if(null!=n){this.ft.add(t);const e="string"==typeof n&&n.endsWith(yt);t.includes("-")||e?o.setProperty(t,e?n.slice(0,-11):n,e?vt:""):o[t]=n}}return F}}),wt=(t,e)=>{const o=t._$AN;if(void 0===o)return!1;for(const t of o)t._$AO?.(e,!1),wt(t,e);return!0},$t=t=>{let e,o;do{if(void 0===(e=t._$AM))break;o=e._$AN,o.delete(t),t=e}while(0===o?.size)},kt=t=>{for(let e;e=t._$AM;t=e){let o=e._$AN;if(void 0===o)e._$AN=o=new Set;else if(o.has(t))break;o.add(t),Pt(e)}};function St(t){void 0!==this._$AN?($t(this),this._$AM=t,kt(this)):this._$AM=t}function Ct(t,e=!1,o=0){const n=this._$AH,i=this._$AN;if(void 0!==i&&0!==i.size)if(e)if(Array.isArray(n))for(let t=o;t<n.length;t++)wt(n[t],!1),$t(n[t]);else null!=n&&(wt(n,!1),$t(n));else wt(this,t)}const Pt=t=>{t.type==bt&&(t._$AP??=Ct,t._$AQ??=St)};class At extends ft{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,e,o){super._$AT(t,e,o),kt(this),this.isConnected=t._$AU}_$AO(t,e=!0){t!==this.isConnected&&(this.isConnected=t,t?this.reconnected?.():this.disconnected?.()),e&&(wt(this,t),$t(this))}setValue(t){if((t=>void 0===t.strings)(this._$Ct))this._$Ct._$AI(t,this);else{const e=[...this._$Ct._$AH];e[this._$Ci]=t,this._$Ct._$AI(e,this,0)}}disconnected(){}reconnected(){}}class Et{}const Mt=new WeakMap,It=_t(class extends At{render(t){return H}update(t,[e]){const o=e!==this.G;return o&&void 0!==this.G&&this.rt(void 0),(o||this.lt!==this.ct)&&(this.G=e,this.ht=t.options?.host,this.rt(this.ct=t.element)),H}rt(t){if(this.isConnected||(t=void 0),"function"==typeof this.G){const e=this.ht??globalThis;let o=Mt.get(e);void 0===o&&(o=new WeakMap,Mt.set(e,o)),void 0!==o.get(this.G)&&this.G.call(this.ht,void 0),o.set(this.G,t),void 0!==t&&this.G.call(this.ht,t)}else this.G.value=t}get lt(){return"function"==typeof this.G?Mt.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}}),Ot=a`
  :host {
    --pmc-primary-color: var(--primary-color, #03a9f4);
    --pmc-primary-text-color: var(--primary-text-color, #212121);
    --pmc-secondary-text-color: var(--secondary-text-color, #727272);
    --pmc-disabled-text-color: var(--disabled-text-color, #bdbdbd);
    --pmc-background-color: var(--card-background-color, #fff);
    --pmc-border-radius: var(--ha-card-border-radius, 12px);
    --pmc-card-background: var(--card-background-color, #fff);
    --pmc-secondary-background: var(--secondary-background-color, rgba(0, 0, 0, 0.05));
    --pmc-text-primary: var(--text-primary-color, #fff);
    --pmc-divider: var(--divider-color, rgba(0, 0, 0, 0.1));
    --pmc-artwork-size: 80px;
    --pmc-icon-size: 24px;
    --pmc-button-size: 40px;
    --pmc-card-height: 120px;
    --pmc-progress-height: 6px;
  }

  ha-card {
    position: relative;
    overflow: hidden;
    border-radius: var(--pmc-border-radius);
    min-height: var(--pmc-card-height);
  }

  /* Add padding at bottom when progress bar is shown */
  ha-card.has-progress {
    padding-bottom: var(--pmc-progress-height);
  }

  /* Extra padding when showing time text */
  ha-card.has-progress.show-time {
    padding-bottom: calc(var(--pmc-progress-height) + 20px);
  }

  /* Shrink card when reserve space is off - let content determine height */
  ha-card.no-reserve {
    min-height: auto;
  }

  ha-card.no-reserve .card-content {
    min-height: auto !important;
    justify-content: flex-start;
    padding-top: 12px;
    padding-bottom: 4px;
  }

  /* Artwork container - positioned on right, scales to card height */
  .artwork-container {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
    display: flex;
    justify-content: flex-end;
  }

  /* Artwork image - fills height, maintains aspect ratio */
  .artwork-image {
    height: 100%;
    width: auto;
    object-fit: cover;
    object-position: center;
  }

  /* Gradient overlay - fades artwork into background color */
  /* Covers the FULL card (like mini-media-player), gradient goes from right (transparent) to left (solid) */
  .artwork-gradient {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
    pointer-events: none;
  }

  /* Default layout: content on left, artwork faded on right */
  .card-content {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    padding: 16px 16px 8px 16px;
    /* Keep content out of artwork area */
    padding-right: 36%;
    min-height: calc(var(--pmc-card-height) - 32px);
    justify-content: center;
  }

  .media-info {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  /* Full-cover artwork mode */
  .fullcover-background {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    z-index: 0;
  }

  .fullcover-overlay {
    position: absolute;
    inset: 0;
    /* Removed gradient overlay to show artwork naturally */
    background: none;
    z-index: 1;
  }

  :host([artwork-mode="full-cover"]) ha-card {
    min-height: 200px;
    aspect-ratio: 1 / 1;
    display: flex;
    flex-direction: column;
  }

  :host([artwork-mode="full-cover"]) .card-content {
    padding-right: 16px;
    min-height: 120px;
    justify-content: flex-start;
    /* Color is set via inline style using extracted fgColor */
  }

  :host([artwork-mode="full-cover"]) .fullcover-background {
    width: 100%;
    height: 100%;
  }

  /* Title, artist, album inherit color from card-content's inline style */
  :host([artwork-mode="full-cover"]) .title {
    color: inherit;
  }

  :host([artwork-mode="full-cover"]) .artist,
  :host([artwork-mode="full-cover"]) .album {
    color: inherit;
    opacity: 0.8;
  }

  /* Minimal mode */
  :host([mode="minimal"]) ha-card {
    min-height: 80px;
    --pmc-card-height: 80px;
  }

  :host([mode="minimal"]) .card-content {
    padding: 12px 16px;
    min-height: 56px;
  }

  /* Media info text - sizes match standard HA media player card */
  .title {
    font-size: 16.8px;
    font-weight: 400;
    line-height: 26.88px;
    color: inherit;
    margin: 0 0 4px 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .artist {
    font-size: 16.8px;
    font-weight: 400;
    line-height: 26.88px;
    color: inherit;
    opacity: 0.8;
    margin: 0 0 4px 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .album {
    font-size: 16.8px;
    font-weight: 400;
    line-height: 26.88px;
    color: inherit;
    opacity: 0.6;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .station-info {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 0.85rem;
    opacity: 0.8;
    margin: 4px 0 0 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .station-info ha-icon {
    --mdc-icon-size: 16px;
    flex-shrink: 0;
  }

  .station-info span {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .station-info.clickable {
    cursor: pointer;
    transition: opacity 0.2s;
  }

  .station-info.clickable:hover {
    opacity: 1;
  }

  /* Overflow menu positioning */
  .overflow-menu {
    position: absolute;
    top: 8px;
    right: 8px;
    z-index: 3;
  }

  /* Controls section */
  .controls-section {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 0 16px 8px;
  }

  :host([artwork-mode="full-cover"]) .controls-section {
    padding: 8px 16px 16px;
    /* Color is set via inline style using extracted fgColor */
    margin-top: auto;
  }

  .controls-row {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .controls-spacer {
    flex: 1;
  }

  /* Unavailable state */
  .unavailable {
    opacity: 0.5;
    pointer-events: none;
  }

  .unavailable-text {
    font-size: 0.875rem;
    color: var(--pmc-secondary-text-color);
    text-align: center;
    padding: 16px;
  }

  /* Icon button base */
  .icon-button {
    background: none;
    border: none;
    padding: 8px;
    cursor: pointer;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s;
    color: inherit;
  }

  .icon-button:hover {
    background-color: rgba(128, 128, 128, 0.2);
  }

  .icon-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .icon-button ha-icon {
    --mdc-icon-size: var(--pmc-icon-size);
  }

  /* Has artwork state - use extracted colors */
  ha-card.has-artwork {
    transition: background-color 0.3s ease;
  }

  ha-card.has-artwork .icon-button:hover {
    background-color: rgba(255, 255, 255, 0.15);
  }

  /* Tall artwork style - vertical layout like webui */
  :host([artwork-mode="tall"]) ha-card {
    min-height: auto;
    display: flex;
    flex-direction: column;
  }

  :host([artwork-mode="tall"]) .artwork-container {
    position: relative;
    top: auto;
    right: auto;
    bottom: auto;
    width: var(--pmc-tall-artwork-width, 80%);
    max-width: none;
    aspect-ratio: 1 / 1;
    margin: 16px auto 0;
  }

  :host([artwork-mode="tall"]) .artwork-image {
    width: 100%;
    height: 100%;
    border-radius: 8px;
  }

  :host([artwork-mode="tall"]) .artwork-gradient {
    display: none;
  }

  :host([artwork-mode="tall"]) .card-content {
    padding: 16px;
    padding-right: 16px;
    min-height: auto;
    text-align: center;
  }

  :host([artwork-mode="tall"]) .media-info {
    align-items: center;
  }

  :host([artwork-mode="tall"]) .title,
  :host([artwork-mode="tall"]) .artist,
  :host([artwork-mode="tall"]) .album {
    text-align: center;
    white-space: normal;
    overflow: visible;
    text-overflow: clip;
  }

  :host([artwork-mode="tall"]) .station-info {
    justify-content: center;
  }

  :host([artwork-mode="tall"]) .controls-section {
    align-items: center;
    padding: 8px 16px 16px;
  }

  :host([artwork-mode="tall"]) .controls-row {
    justify-content: center;
  }

  :host([artwork-mode="tall"]) .controls-spacer {
    display: none;
  }

  :host([artwork-mode="tall"]) pmc-volume-slider {
    width: 100%;
    max-width: 280px;
  }

  :host([artwork-mode="tall"]) pmc-progress-bar {
    max-width: 100%;
  }

  /* Station pill button for tall artwork */
  :host([artwork-mode="tall"]) .station-pill {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-top: 16px;
    padding: 10px 20px;
    border-radius: 24px;
    background: var(--pmc-secondary-background);
    cursor: pointer;
    transition: background 0.2s;
    max-width: 280px;
    width: fit-content;
  }

  :host([artwork-mode="tall"]) .station-pill:hover {
    background: var(--pmc-primary-color);
    opacity: 0.9;
  }

  :host([artwork-mode="tall"]) .station-pill ha-icon {
    --mdc-icon-size: 20px;
  }

  :host([artwork-mode="tall"]) .station-pill span {
    font-size: 0.9rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 200px;
  }

  /* Artwork placeholder for tall artwork */
  :host([artwork-mode="tall"]) .artwork-placeholder-tall {
    width: var(--pmc-tall-artwork-width, 80%);
    max-width: none;
    aspect-ratio: 1 / 1;
    margin: 16px auto 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--pmc-secondary-background);
    border-radius: 8px;
  }

  :host([artwork-mode="tall"]) .artwork-placeholder-tall ha-icon {
    --mdc-icon-size: 80px;
    opacity: 0.4;
  }
`;function Dt(t){return Math.min(100,Math.max(50,t??80))}a`
  :host {
    display: block;
  }

  .card-config {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .tabs {
    display: flex;
    border-bottom: 1px solid var(--divider-color);
    margin-bottom: 16px;
  }

  .tab {
    padding: 8px 16px;
    cursor: pointer;
    border: none;
    background: none;
    font-size: 0.875rem;
    color: var(--secondary-text-color);
    border-bottom: 2px solid transparent;
    transition: all 0.2s;
  }

  .tab:hover {
    color: var(--primary-text-color);
  }

  .tab.active {
    color: var(--primary-color);
    border-bottom-color: var(--primary-color);
  }

  .tab-content {
    display: none;
  }

  .tab-content.active {
    display: block;
  }

  .form-row {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-bottom: 16px;
  }

  .form-row label {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--primary-text-color);
  }

  .form-row .helper-text {
    font-size: 0.75rem;
    color: var(--secondary-text-color);
  }

  ha-entity-picker,
  ha-select,
  ha-textfield {
    width: 100%;
  }

  ha-formfield {
    display: block;
    padding: 8px 0;
  }

  .mode-cards {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
    margin-bottom: 16px;
  }

  .mode-card {
    padding: 12px;
    border: 2px solid var(--divider-color);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
    background: none;
    text-align: left;
  }

  .mode-card:hover {
    border-color: var(--primary-color);
  }

  .mode-card.selected {
    border-color: var(--primary-color);
    background: rgba(var(--rgb-primary-color), 0.1);
  }

  .mode-card .mode-name {
    font-weight: 500;
    margin-bottom: 4px;
  }

  .mode-card .mode-description {
    font-size: 0.75rem;
    color: var(--secondary-text-color);
  }
`;const Tt={default:{artwork:"default",showDetails:!0,showTitle:!0,showArtist:!0,showAlbum:!0,reserveDetailsSpace:!0,showVolumeControl:!0,showSongActions:!0,showProgressBar:!0,showProgressTime:!1,showPlaybackControls:!0,showPowerButton:!1,stationDisplay:"hidden"},full:{artwork:"full-cover",showDetails:!0,showTitle:!0,showArtist:!1,showAlbum:!1,reserveDetailsSpace:!0,showVolumeControl:!0,showSongActions:!0,showProgressBar:!0,showProgressTime:!1,showPlaybackControls:!0,showPowerButton:!1,stationDisplay:"normal"},minimal:{artwork:"default",showDetails:!0,showTitle:!0,showArtist:!1,showAlbum:!1,reserveDetailsSpace:!1,showVolumeControl:!1,showSongActions:!1,showProgressBar:!0,showProgressTime:!1,showPlaybackControls:!0,showPowerButton:!1,stationDisplay:"hidden"},tall:{artwork:"tall",showDetails:!0,showTitle:!0,showArtist:!0,showAlbum:!0,reserveDetailsSpace:!0,showVolumeControl:!0,showSongActions:!0,showProgressBar:!0,showProgressTime:!0,showPlaybackControls:!0,showPowerButton:!1,stationDisplay:"normal",tallArtworkSize:80},custom:{artwork:"default",showDetails:!0,showTitle:!0,showArtist:!0,showAlbum:!0,reserveDetailsSpace:!0,showVolumeControl:!0,showSongActions:!0,showProgressBar:!0,showProgressTime:!1,showPlaybackControls:!0,showPowerButton:!1,stationDisplay:"hidden"}};function zt(t){return Tt[t]}function Rt(t){const e=["default","full","minimal","tall"];for(const o of e){const e=Tt[o];if((t.artwork??"default")===e.artwork&&(t.showDetails??!0)===e.showDetails&&(t.showTitle??!0)===e.showTitle&&(t.showArtist??!0)===e.showArtist&&(t.showAlbum??!0)===e.showAlbum&&(t.reserveDetailsSpace??!0)===e.reserveDetailsSpace&&(t.showPlaybackControls??!0)===e.showPlaybackControls&&(t.showVolumeControl??!0)===e.showVolumeControl&&(t.showSongActions??!0)===e.showSongActions&&(t.showProgressBar??!0)===e.showProgressBar&&(t.showProgressTime??!1)===e.showProgressTime&&(t.showPowerButton??!1)===e.showPowerButton&&!1!==t.showAccountSwitch&&(t.stationDisplay??"hidden")===e.stationDisplay&&(t.tallArtworkSize??80)===(e.tallArtworkSize??80))return o}return"custom"}function Lt(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var Nt,Bt={exports:{}};window,Nt=function(){return function(t){var e={};function o(n){if(e[n])return e[n].exports;var i=e[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,o),i.l=!0,i.exports}return o.m=t,o.c=e,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)o.d(n,i,function(e){return t[e]}.bind(null,i));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="",o(o.s=10)}([function(t,e,o){Object.defineProperty(e,"__esModule",{value:!0}),e.assignDeep=e.mapValues=void 0,e.mapValues=function(t,e){var o={};for(var n in t)if(t.hasOwnProperty(n)){var i=t[n];o[n]=e(i)}return o},e.assignDeep=function t(e){for(var o=[],n=1;n<arguments.length;n++)o[n-1]=arguments[n];return o.forEach(function(o){if(o)for(var n in o)if(o.hasOwnProperty(n)){var i=o[n];Array.isArray(i)?e[n]=i.slice(0):"object"==typeof i?(e[n]||(e[n]={}),t(e[n],i)):e[n]=i}}),e}},function(t,e,o){var n=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var i=o(7),s=n(o(8)),a=o(0),r=function(){function t(e,o){this._src=e,this.opts=a.assignDeep({},t.DefaultOpts,o)}return t.use=function(t){this._pipeline=t},t.from=function(t){return new s.default(t)},Object.defineProperty(t.prototype,"result",{get:function(){return this._result},enumerable:!1,configurable:!0}),t.prototype._process=function(e,o){this.opts.quantizer,e.scaleDown(this.opts);var n=i.buildProcessOptions(this.opts,o);return t._pipeline.process(e.getImageData(),n)},t.prototype.palette=function(){return this.swatches()},t.prototype.swatches=function(){throw new Error("Method deprecated. Use `Vibrant.result.palettes[name]` instead")},t.prototype.getPalette=function(){var t=this,e=arguments[0],o="string"==typeof e?e:"default",n="string"==typeof e?arguments[1]:e,i=new this.opts.ImageClass;return i.load(this._src).then(function(e){return t._process(e,{generators:[o]})}).then(function(e){return t._result=e,e.palettes[o]}).then(function(t){return i.remove(),n&&n(void 0,t),t}).catch(function(t){return i.remove(),n&&n(t),Promise.reject(t)})},t.prototype.getPalettes=function(){var t=this,e=arguments[0],o=arguments[1],n=Array.isArray(e)?e:["*"],i=Array.isArray(e)?o:e,s=new this.opts.ImageClass;return s.load(this._src).then(function(e){return t._process(e,{generators:n})}).then(function(e){return t._result=e,e.palettes}).then(function(t){return s.remove(),i&&i(void 0,t),t}).catch(function(t){return s.remove(),i&&i(t),Promise.reject(t)})},t.DefaultOpts={colorCount:64,quality:5,filters:[]},t}();e.default=r},function(t,e,o){Object.defineProperty(e,"__esModule",{value:!0}),e.applyFilters=e.ImageBase=void 0;var n=function(){function t(){}return t.prototype.scaleDown=function(t){var e=this.getWidth(),o=this.getHeight(),n=1;if(t.maxDimension>0){var i=Math.max(e,o);i>t.maxDimension&&(n=t.maxDimension/i)}else n=1/t.quality;n<1&&this.resize(e*n,o*n,n)},t}();e.ImageBase=n,e.applyFilters=function(t,e){if(e.length>0)for(var o=t.data,n=o.length/4,i=void 0,s=void 0,a=void 0,r=void 0,c=void 0,d=0;d<n;d++){s=o[0+(i=4*d)],a=o[i+1],r=o[i+2],c=o[i+3];for(var l=0;l<e.length;l++)if(!e[l](s,a,r,c)){o[i+3]=0;break}}return t}},function(t,e,o){Object.defineProperty(e,"__esModule",{value:!0}),e.Swatch=void 0;var n=o(4),i=function(){function t(t,e){this._rgb=t,this._population=e}return t.applyFilters=function(t,e){return e.length>0?t.filter(function(t){for(var o=t.r,n=t.g,i=t.b,s=0;s<e.length;s++)if(!e[s](o,n,i,255))return!1;return!0}):t},t.clone=function(e){return new t(e._rgb,e._population)},Object.defineProperty(t.prototype,"r",{get:function(){return this._rgb[0]},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"g",{get:function(){return this._rgb[1]},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"b",{get:function(){return this._rgb[2]},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"rgb",{get:function(){return this._rgb},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"hsl",{get:function(){if(!this._hsl){var t=this._rgb,e=t[0],o=t[1],i=t[2];this._hsl=n.rgbToHsl(e,o,i)}return this._hsl},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"hex",{get:function(){if(!this._hex){var t=this._rgb,e=t[0],o=t[1],i=t[2];this._hex=n.rgbToHex(e,o,i)}return this._hex},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"population",{get:function(){return this._population},enumerable:!1,configurable:!0}),t.prototype.toJSON=function(){return{rgb:this.rgb,population:this.population}},t.prototype.getRgb=function(){return this._rgb},t.prototype.getHsl=function(){return this.hsl},t.prototype.getPopulation=function(){return this._population},t.prototype.getHex=function(){return this.hex},t.prototype.getYiq=function(){if(!this._yiq){var t=this._rgb;this._yiq=(299*t[0]+587*t[1]+114*t[2])/1e3}return this._yiq},Object.defineProperty(t.prototype,"titleTextColor",{get:function(){return this._titleTextColor&&(this._titleTextColor=this.getYiq()<200?"#fff":"#000"),this._titleTextColor},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"bodyTextColor",{get:function(){return this._bodyTextColor&&(this._bodyTextColor=this.getYiq()<150?"#fff":"#000"),this._bodyTextColor},enumerable:!1,configurable:!0}),t.prototype.getTitleTextColor=function(){return this.titleTextColor},t.prototype.getBodyTextColor=function(){return this.bodyTextColor},t}();e.Swatch=i},function(t,e,o){function n(t){var e=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);if(!e)throw new RangeError("'"+t+"' is not a valid hex color");return[e[1],e[2],e[3]].map(function(t){return parseInt(t,16)})}function i(t,e,o){return e/=255,o/=255,t=(t/=255)>.04045?Math.pow((t+.005)/1.055,2.4):t/12.92,e=e>.04045?Math.pow((e+.005)/1.055,2.4):e/12.92,o=o>.04045?Math.pow((o+.005)/1.055,2.4):o/12.92,[.4124*(t*=100)+.3576*(e*=100)+.1805*(o*=100),.2126*t+.7152*e+.0722*o,.0193*t+.1192*e+.9505*o]}function s(t,e,o){return e/=100,o/=108.883,t=(t/=95.047)>.008856?Math.pow(t,1/3):7.787*t+16/116,[116*(e=e>.008856?Math.pow(e,1/3):7.787*e+16/116)-16,500*(t-e),200*(e-(o=o>.008856?Math.pow(o,1/3):7.787*o+16/116))]}function a(t,e,o){var n=i(t,e,o);return s(n[0],n[1],n[2])}function r(t,e){var o=t[0],n=t[1],i=t[2],s=e[0],a=e[1],r=e[2],c=o-s,d=n-a,l=i-r,h=Math.sqrt(n*n+i*i),p=s-o,u=Math.sqrt(a*a+r*r)-h,g=Math.sqrt(c*c+d*d+l*l),m=Math.sqrt(g)>Math.sqrt(Math.abs(p))+Math.sqrt(Math.abs(u))?Math.sqrt(g*g-p*p-u*u):0;return p/=1,u/=1*(1+.045*h),m/=1*(1+.015*h),Math.sqrt(p*p+u*u+m*m)}function c(t,e){return r(a.apply(void 0,t),a.apply(void 0,e))}Object.defineProperty(e,"__esModule",{value:!0}),e.getColorDiffStatus=e.hexDiff=e.rgbDiff=e.deltaE94=e.rgbToCIELab=e.xyzToCIELab=e.rgbToXyz=e.hslToRgb=e.rgbToHsl=e.rgbToHex=e.hexToRgb=e.DELTAE94_DIFF_STATUS=void 0,e.DELTAE94_DIFF_STATUS={NA:0,PERFECT:1,CLOSE:2,GOOD:10,SIMILAR:50},e.hexToRgb=n,e.rgbToHex=function(t,e,o){return"#"+((1<<24)+(t<<16)+(e<<8)+o).toString(16).slice(1,7)},e.rgbToHsl=function(t,e,o){t/=255,e/=255,o/=255;var n=Math.max(t,e,o),i=Math.min(t,e,o),s=0,a=0,r=(n+i)/2;if(n!==i){var c=n-i;switch(a=r>.5?c/(2-n-i):c/(n+i),n){case t:s=(e-o)/c+(e<o?6:0);break;case e:s=(o-t)/c+2;break;case o:s=(t-e)/c+4}s/=6}return[s,a,r]},e.hslToRgb=function(t,e,o){var n,i,s;function a(t,e,o){return o<0&&(o+=1),o>1&&(o-=1),o<1/6?t+6*(e-t)*o:o<.5?e:o<2/3?t+(e-t)*(2/3-o)*6:t}if(0===e)n=i=s=o;else{var r=o<.5?o*(1+e):o+e-o*e,c=2*o-r;n=a(c,r,t+1/3),i=a(c,r,t),s=a(c,r,t-1/3)}return[255*n,255*i,255*s]},e.rgbToXyz=i,e.xyzToCIELab=s,e.rgbToCIELab=a,e.deltaE94=r,e.rgbDiff=c,e.hexDiff=function(t,e){return c(n(t),n(e))},e.getColorDiffStatus=function(t){return t<e.DELTAE94_DIFF_STATUS.NA?"N/A":t<=e.DELTAE94_DIFF_STATUS.PERFECT?"Perfect":t<=e.DELTAE94_DIFF_STATUS.CLOSE?"Close":t<=e.DELTAE94_DIFF_STATUS.GOOD?"Good":t<e.DELTAE94_DIFF_STATUS.SIMILAR?"Similar":"Wrong"}},function(t,e,o){var n=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}},i=n(o(6)),s=n(o(9));i.default.DefaultOpts.ImageClass=s.default,t.exports=i.default},function(t,e,o){var n=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var i=n(o(1));i.default.DefaultOpts.quantizer="mmcq",i.default.DefaultOpts.generators=["default"],i.default.DefaultOpts.filters=["default"],e.default=i.default},function(t,e,o){Object.defineProperty(e,"__esModule",{value:!0}),e.buildProcessOptions=void 0;var n=o(0);e.buildProcessOptions=function(t,e){var o=t.colorCount,i=t.quantizer,s=t.generators,a=t.filters,r={colorCount:o},c="string"==typeof i?{name:i,options:{}}:i;return c.options=n.assignDeep({},r,c.options),n.assignDeep({},{quantizer:c,generators:s,filters:a},e)}},function(t,e,o){var n=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var i=n(o(1)),s=o(0),a=function(){function t(t,e){void 0===e&&(e={}),this._src=t,this._opts=s.assignDeep({},i.default.DefaultOpts,e)}return t.prototype.maxColorCount=function(t){return this._opts.colorCount=t,this},t.prototype.maxDimension=function(t){return this._opts.maxDimension=t,this},t.prototype.addFilter=function(t){return this._opts.filters?this._opts.filters.push(t):this._opts.filters=[t],this},t.prototype.removeFilter=function(t){if(this._opts.filters){var e=this._opts.filters.indexOf(t);e>0&&this._opts.filters.splice(e)}return this},t.prototype.clearFilters=function(){return this._opts.filters=[],this},t.prototype.quality=function(t){return this._opts.quality=t,this},t.prototype.useImageClass=function(t){return this._opts.ImageClass=t,this},t.prototype.useGenerator=function(t,e){return this._opts.generators||(this._opts.generators=[]),this._opts.generators.push(e?{name:t,options:e}:t),this},t.prototype.useQuantizer=function(t,e){return this._opts.quantizer=e?{name:t,options:e}:t,this},t.prototype.build=function(){return new i.default(this._src,this._opts)},t.prototype.getPalette=function(t){return this.build().getPalette(t)},t.prototype.getSwatches=function(t){return this.build().getPalette(t)},t}();e.default=a},function(t,e,o){var n,i=this&&this.__extends||(n=function(t,e){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o])},n(t,e)},function(t,e){function o(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)});Object.defineProperty(e,"__esModule",{value:!0});var s=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return i(e,t),e.prototype._initCanvas=function(){var t=this.image,e=this._canvas=document.createElement("canvas"),o=e.getContext("2d");if(!o)throw new ReferenceError("Failed to create canvas context");this._context=o,e.className="@vibrant/canvas",e.style.display="none",this._width=e.width=t.width,this._height=e.height=t.height,o.drawImage(t,0,0),document.body.appendChild(e)},e.prototype.load=function(t){var e,o,n=this;if("string"==typeof t)e=document.createElement("img"),function(t){var e=new URL(t,location.href);return e.protocol===location.protocol&&e.host===location.host&&e.port===location.port}(o=t)||function(t,e){var o=new URL(t),n=new URL(e);return o.protocol===n.protocol&&o.hostname===n.hostname&&o.port===n.port}(window.location.href,o)||(e.crossOrigin="anonymous"),e.src=o;else{if(!(t instanceof HTMLImageElement))return Promise.reject(new Error("Cannot load buffer as an image in browser"));e=t,o=t.src}return this.image=e,new Promise(function(t,i){var s=function(){n._initCanvas(),t(n)};e.complete?s():(e.onload=s,e.onerror=function(t){return i(new Error("Fail to load image: "+o))})})},e.prototype.clear=function(){this._context.clearRect(0,0,this._width,this._height)},e.prototype.update=function(t){this._context.putImageData(t,0,0)},e.prototype.getWidth=function(){return this._width},e.prototype.getHeight=function(){return this._height},e.prototype.resize=function(t,e,o){var n=this,i=n._canvas,s=n._context,a=n.image;this._width=i.width=t,this._height=i.height=e,s.scale(o,o),s.drawImage(a,0,0)},e.prototype.getPixelCount=function(){return this._width*this._height},e.prototype.getImageData=function(){return this._context.getImageData(0,0,this._width,this._height)},e.prototype.remove=function(){this._canvas&&this._canvas.parentNode&&this._canvas.parentNode.removeChild(this._canvas)},e}(o(2).ImageBase);e.default=s},function(t,e,o){var n=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}},i=o(5),s=n(o(11));i.use(s.default),t.exports=i},function(t,e,o){var n=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var i=n(o(12)),s=n(o(16)),a=(new(o(17).BasicPipeline)).filter.register("default",function(t,e,o,n){return n>=125&&!(t>250&&e>250&&o>250)}).quantizer.register("mmcq",i.default).generator.register("default",s.default);e.default=a},function(t,e,o){var n=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var i=o(3),s=n(o(13)),a=n(o(15));function r(t,e){for(var o=t.size();t.size()<e;){var n=t.pop();if(!(n&&n.count()>0))break;var i=n.split(),s=i[0],a=i[1];if(t.push(s),a&&a.count()>0&&t.push(a),t.size()===o)break;o=t.size()}}e.default=function(t,e){if(0===t.length||e.colorCount<2||e.colorCount>256)throw new Error("Wrong MMCQ parameters");var o=s.default.build(t);o.histogram.colorCount;var n=new a.default(function(t,e){return t.count()-e.count()});n.push(o),r(n,.75*e.colorCount);var c=new a.default(function(t,e){return t.count()*t.volume()-e.count()*e.volume()});return c.contents=n.contents,r(c,e.colorCount-c.size()),function(t){for(var e=[];t.size();){var o=t.pop(),n=o.avg();n[0],n[1],n[2],e.push(new i.Swatch(n,o.count()))}return e}(c)}},function(t,e,o){var n=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var i=n(o(14)),s=function(){function t(t,e,o,n,i,s,a){this.histogram=a,this._volume=-1,this._count=-1,this.dimension={r1:t,r2:e,g1:o,g2:n,b1:i,b2:s}}return t.build=function(e){var o=new i.default(e,{sigBits:5});return new t(o.rmin,o.rmax,o.gmin,o.gmax,o.bmin,o.bmax,o)},t.prototype.invalidate=function(){this._volume=this._count=-1,this._avg=null},t.prototype.volume=function(){if(this._volume<0){var t=this.dimension,e=t.r1,o=t.r2,n=t.g1,i=t.g2,s=t.b1,a=t.b2;this._volume=(o-e+1)*(i-n+1)*(a-s+1)}return this._volume},t.prototype.count=function(){if(this._count<0){for(var t=this.histogram,e=t.hist,o=t.getColorIndex,n=this.dimension,i=n.r1,s=n.r2,a=n.g1,r=n.g2,c=n.b1,d=n.b2,l=0,h=i;h<=s;h++)for(var p=a;p<=r;p++)for(var u=c;u<=d;u++)l+=e[o(h,p,u)];this._count=l}return this._count},t.prototype.clone=function(){var e=this.histogram,o=this.dimension;return new t(o.r1,o.r2,o.g1,o.g2,o.b1,o.b2,e)},t.prototype.avg=function(){if(!this._avg){var t=this.histogram,e=t.hist,o=t.getColorIndex,n=this.dimension,i=n.r1,s=n.r2,a=n.g1,r=n.g2,c=n.b1,d=n.b2,l=0,h=void 0,p=void 0,u=void 0;h=p=u=0;for(var g=i;g<=s;g++)for(var m=a;m<=r;m++)for(var b=c;b<=d;b++){var _=e[o(g,m,b)];l+=_,h+=_*(g+.5)*8,p+=_*(m+.5)*8,u+=_*(b+.5)*8}this._avg=l?[~~(h/l),~~(p/l),~~(u/l)]:[~~(8*(i+s+1)/2),~~(8*(a+r+1)/2),~~(8*(c+d+1)/2)]}return this._avg},t.prototype.contains=function(t){var e=t[0],o=t[1],n=t[2],i=this.dimension,s=i.r1,a=i.r2,r=i.g1,c=i.g2,d=i.b1,l=i.b2;return o>>=3,n>>=3,(e>>=3)>=s&&e<=a&&o>=r&&o<=c&&n>=d&&n<=l},t.prototype.split=function(){var t=this.histogram,e=t.hist,o=t.getColorIndex,n=this.dimension,i=n.r1,s=n.r2,a=n.g1,r=n.g2,c=n.b1,d=n.b2,l=this.count();if(!l)return[];if(1===l)return[this.clone()];var h,p,u=s-i+1,g=r-a+1,m=d-c+1,b=Math.max(u,g,m),_=null;h=p=0;var f=null;if(b===u){f="r",_=new Uint32Array(s+1);for(var v=i;v<=s;v++){h=0;for(var y=a;y<=r;y++)for(var x=c;x<=d;x++)h+=e[o(v,y,x)];p+=h,_[v]=p}}else if(b===g)for(f="g",_=new Uint32Array(r+1),y=a;y<=r;y++){for(h=0,v=i;v<=s;v++)for(x=c;x<=d;x++)h+=e[o(v,y,x)];p+=h,_[y]=p}else for(f="b",_=new Uint32Array(d+1),x=c;x<=d;x++){for(h=0,v=i;v<=s;v++)for(y=a;y<=r;y++)h+=e[o(v,y,x)];p+=h,_[x]=p}for(var w=-1,$=new Uint32Array(_.length),k=0;k<_.length;k++){var S=_[k];w<0&&S>p/2&&(w=k),$[k]=p-S}var C=this;return function(t){var e=t+"1",o=t+"2",n=C.dimension[e],i=C.dimension[o],s=C.clone(),a=C.clone(),r=w-n,c=i-w;for(r<=c?(i=Math.min(i-1,~~(w+c/2)),i=Math.max(0,i)):(i=Math.max(n,~~(w-1-r/2)),i=Math.min(C.dimension[o],i));!_[i];)i++;for(var d=$[i];!d&&_[i-1];)d=$[--i];return s.dimension[o]=i,a.dimension[e]=i+1,[s,a]}(f)},t}();e.default=s},function(t,e,o){Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function t(t,e){this.pixels=t,this.opts=e;var o=e.sigBits,n=function(t,e,n){return(t<<2*o)+(e<<o)+n};this.getColorIndex=n;var i,s,a,r,c,d,l,h,p,u=8-o,g=new Uint32Array(1<<3*o);i=a=c=0,s=r=d=Number.MAX_VALUE;for(var m=t.length/4,b=0;b<m;){var _=4*b;b++,l=t[_+0],h=t[_+1],p=t[_+2],0!==t[_+3]&&(g[n(l>>=u,h>>=u,p>>=u)]+=1,l>i&&(i=l),l<s&&(s=l),h>a&&(a=h),h<r&&(r=h),p>c&&(c=p),p<d&&(d=p))}this._colorCount=g.reduce(function(t,e){return e>0?t+1:t},0),this.hist=g,this.rmax=i,this.rmin=s,this.gmax=a,this.gmin=r,this.bmax=c,this.bmin=d}return Object.defineProperty(t.prototype,"colorCount",{get:function(){return this._colorCount},enumerable:!1,configurable:!0}),t}();e.default=n},function(t,e,o){Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function t(t){this._comparator=t,this.contents=[],this._sorted=!1}return t.prototype._sort=function(){this._sorted||(this.contents.sort(this._comparator),this._sorted=!0)},t.prototype.push=function(t){this.contents.push(t),this._sorted=!1},t.prototype.peek=function(t){return this._sort(),t="number"==typeof t?t:this.contents.length-1,this.contents[t]},t.prototype.pop=function(){return this._sort(),this.contents.pop()},t.prototype.size=function(){return this.contents.length},t.prototype.map=function(t){return this._sort(),this.contents.map(t)},t}();e.default=n},function(t,e,o){Object.defineProperty(e,"__esModule",{value:!0});var n=o(3),i=o(4),s={targetDarkLuma:.26,maxDarkLuma:.45,minLightLuma:.55,targetLightLuma:.74,minNormalLuma:.3,targetNormalLuma:.5,maxNormalLuma:.7,targetMutesSaturation:.3,maxMutesSaturation:.4,targetVibrantSaturation:1,minVibrantSaturation:.35,weightSaturation:3,weightLuma:6.5,weightPopulation:.5};function a(t,e,o,n,i,s,a,r,c,d){var l=null,h=0;return e.forEach(function(e){var p=e.hsl,u=p[1],g=p[2];if(u>=r&&u<=c&&g>=i&&g<=s&&!function(t,e){return t.Vibrant===e||t.DarkVibrant===e||t.LightVibrant===e||t.Muted===e||t.DarkMuted===e||t.LightMuted===e}(t,e)){var m=function(t,e,o,n,i,s,a){function r(t,e){return 1-Math.abs(t-e)}return function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];for(var o=0,n=0,i=0;i<t.length;i+=2){var s=t[i],a=t[i+1];o+=s*a,n+=a}return o/n}(r(t,e),a.weightSaturation,r(o,n),a.weightLuma,i/s,a.weightPopulation)}(u,a,g,n,e.population,o,d);(null===l||m>h)&&(l=e,h=m)}}),l}e.default=function(t,e){e=Object.assign({},s,e);var o=function(t){var e=0;return t.forEach(function(t){e=Math.max(e,t.population)}),e}(t),r=function(t,e,o){var n={Vibrant:null,DarkVibrant:null,LightVibrant:null,Muted:null,DarkMuted:null,LightMuted:null};return n.Vibrant=a(n,t,e,o.targetNormalLuma,o.minNormalLuma,o.maxNormalLuma,o.targetVibrantSaturation,o.minVibrantSaturation,1,o),n.LightVibrant=a(n,t,e,o.targetLightLuma,o.minLightLuma,1,o.targetVibrantSaturation,o.minVibrantSaturation,1,o),n.DarkVibrant=a(n,t,e,o.targetDarkLuma,0,o.maxDarkLuma,o.targetVibrantSaturation,o.minVibrantSaturation,1,o),n.Muted=a(n,t,e,o.targetNormalLuma,o.minNormalLuma,o.maxNormalLuma,o.targetMutesSaturation,0,o.maxMutesSaturation,o),n.LightMuted=a(n,t,e,o.targetLightLuma,o.minLightLuma,1,o.targetMutesSaturation,0,o.maxMutesSaturation,o),n.DarkMuted=a(n,t,e,o.targetDarkLuma,0,o.maxDarkLuma,o.targetMutesSaturation,0,o.maxMutesSaturation,o),n}(t,o,e);return function(t,e,o){if(!t.Vibrant&&!t.DarkVibrant&&!t.LightVibrant){if(!t.DarkVibrant&&t.DarkMuted){var s=t.DarkMuted.hsl,a=s[0],r=s[1],c=s[2];c=o.targetDarkLuma,t.DarkVibrant=new n.Swatch(i.hslToRgb(a,r,c),0)}if(!t.LightVibrant&&t.LightMuted){var d=t.LightMuted.hsl;a=d[0],r=d[1],c=d[2],c=o.targetDarkLuma,t.DarkVibrant=new n.Swatch(i.hslToRgb(a,r,c),0)}}if(!t.Vibrant&&t.DarkVibrant){var l=t.DarkVibrant.hsl;a=l[0],r=l[1],c=l[2],c=o.targetNormalLuma,t.Vibrant=new n.Swatch(i.hslToRgb(a,r,c),0)}else if(!t.Vibrant&&t.LightVibrant){var h=t.LightVibrant.hsl;a=h[0],r=h[1],c=h[2],c=o.targetNormalLuma,t.Vibrant=new n.Swatch(i.hslToRgb(a,r,c),0)}if(!t.DarkVibrant&&t.Vibrant){var p=t.Vibrant.hsl;a=p[0],r=p[1],c=p[2],c=o.targetDarkLuma,t.DarkVibrant=new n.Swatch(i.hslToRgb(a,r,c),0)}if(!t.LightVibrant&&t.Vibrant){var u=t.Vibrant.hsl;a=u[0],r=u[1],c=u[2],c=o.targetLightLuma,t.LightVibrant=new n.Swatch(i.hslToRgb(a,r,c),0)}if(!t.Muted&&t.Vibrant){var g=t.Vibrant.hsl;a=g[0],r=g[1],c=g[2],c=o.targetMutesSaturation,t.Muted=new n.Swatch(i.hslToRgb(a,r,c),0)}if(!t.DarkMuted&&t.DarkVibrant){var m=t.DarkVibrant.hsl;a=m[0],r=m[1],c=m[2],c=o.targetMutesSaturation,t.DarkMuted=new n.Swatch(i.hslToRgb(a,r,c),0)}if(!t.LightMuted&&t.LightVibrant){var b=t.LightVibrant.hsl;a=b[0],r=b[1],c=b[2],c=o.targetMutesSaturation,t.LightMuted=new n.Swatch(i.hslToRgb(a,r,c),0)}}(r,0,e),r}},function(t,e,o){var n=this&&this.__awaiter||function(t,e,o,n){return new(o||(o=Promise))(function(i,s){function a(t){try{c(n.next(t))}catch(t){s(t)}}function r(t){try{c(n.throw(t))}catch(t){s(t)}}function c(t){var e;t.done?i(t.value):(e=t.value,e instanceof o?e:new o(function(t){t(e)})).then(a,r)}c((n=n.apply(t,e||[])).next())})},i=this&&this.__generator||function(t,e){var o,n,i,s,a={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return s={next:r(0),throw:r(1),return:r(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function r(s){return function(r){return function(s){if(o)throw new TypeError("Generator is already executing.");for(;a;)try{if(o=1,n&&(i=2&s[0]?n.return:s[0]?n.throw||((i=n.return)&&i.call(n),0):n.next)&&!(i=i.call(n,s[1])).done)return i;switch(n=0,i&&(s=[2&s[0],i.value]),s[0]){case 0:case 1:i=s;break;case 4:return a.label++,{value:s[1],done:!1};case 5:a.label++,n=s[1],s=[0];continue;case 7:s=a.ops.pop(),a.trys.pop();continue;default:if(!((i=(i=a.trys).length>0&&i[i.length-1])||6!==s[0]&&2!==s[0])){a=0;continue}if(3===s[0]&&(!i||s[1]>i[0]&&s[1]<i[3])){a.label=s[1];break}if(6===s[0]&&a.label<i[1]){a.label=i[1],i=s;break}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(s);break}i[2]&&a.ops.pop(),a.trys.pop();continue}s=e.call(t,a)}catch(t){s=[6,t],n=0}finally{o=i=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,r])}}};Object.defineProperty(e,"__esModule",{value:!0}),e.BasicPipeline=e.Stage=void 0;var s=o(2),a=function(){function t(t){this.pipeline=t,this._map={}}return t.prototype.names=function(){return Object.keys(this._map)},t.prototype.has=function(t){return!!this._map[t]},t.prototype.get=function(t){return this._map[t]},t.prototype.register=function(t,e){return this._map[t]=e,this.pipeline},t}();e.Stage=a;var r=function(){function t(){this.filter=new a(this),this.quantizer=new a(this),this.generator=new a(this)}return t.prototype._buildProcessTasks=function(t){var e=this,o=t.filters,n=t.quantizer,i=t.generators;return 1===i.length&&"*"===i[0]&&(i=this.generator.names()),{filters:o.map(function(t){return s(e.filter,t)}),quantizer:s(this.quantizer,n),generators:i.map(function(t){return s(e.generator,t)})};function s(t,e){var o,n;return"string"==typeof e?o=e:(o=e.name,n=e.options),{name:o,fn:t.get(o),options:n}}},t.prototype.process=function(t,e){return n(this,void 0,void 0,function(){var o,n,s,a,r,c,d;return i(this,function(i){switch(i.label){case 0:return o=this._buildProcessTasks(e),n=o.filters,s=o.quantizer,a=o.generators,[4,this._filterColors(n,t)];case 1:return r=i.sent(),[4,this._generateColors(s,r)];case 2:return c=i.sent(),[4,this._generatePalettes(a,c)];case 3:return d=i.sent(),[2,{colors:c,palettes:d}]}})})},t.prototype._filterColors=function(t,e){return Promise.resolve(s.applyFilters(e,t.map(function(t){return t.fn})))},t.prototype._generateColors=function(t,e){return Promise.resolve(t.fn(e.data,t.options))},t.prototype._generatePalettes=function(t,e){return n(this,void 0,void 0,function(){var o;return i(this,function(n){switch(n.label){case 0:return[4,Promise.all(t.map(function(t){var o=t.fn,n=t.options;return Promise.resolve(o(e,n))}))];case 1:return o=n.sent(),[2,Promise.resolve(o.reduce(function(e,o,n){return e[t[n].name]=o,e},{}))]}})})},t}();e.BasicPipeline=r}])};var Ut=Lt(Bt.exports=Nt());const qt=4.5,jt={background:"#1c1c1c",foreground:"#ffffff"},Vt=new Map,Ft=(t,e,o)=>{const n=[t,e,o].map(t=>{const e=t/255;return e<=.03928?e/12.92:((e+.055)/1.055)**2.4});return.2126*n[0]+.7152*n[1]+.0722*n[2]},Ht=(t,e)=>Math.round(100*(((t,e)=>{const o=Ft(t[0],t[1],t[2]),n=Ft(e[0],e[1],e[2]);return(Math.max(o,n)+.05)/(Math.min(o,n)+.05)})(t,e)+Number.EPSILON))/100;Ut._pipeline.generator.register("default",t=>{t.sort((t,e)=>e.population-t.population);const e=t[0];let o;const n=new Map,i=(t,o)=>(n.has(t)||n.set(t,Ht(e.rgb,o)),(n.get(t)||0)>qt);for(let e=1;e<t.length&&void 0===o;e++){if(i(t[e].hex,t[e].rgb)){o=t[e].rgb;break}const n=t[e];for(let s=e+1;s<t.length;s++){const e=t[s];if(!(Math.abs(n.rgb[0]-e.rgb[0])+Math.abs(n.rgb[1]-e.rgb[1])+Math.abs(n.rgb[2]-e.rgb[2])>150)&&i(e.hex,e.rgb)){o=e.rgb;break}}}return void 0===o&&(o=e.getYiq()<200?[255,255,255]:[0,0,0]),[new e.constructor(o,0).hex,e.hex]});const Qt=async t=>new Ut(t,{colorCount:16}).getPalette();async function Wt(t,e){const o=document.createElement("canvas"),n=o.getContext("2d");if(!n)throw new Error("Failed to get canvas context");const i=Math.floor(e.x*t.width),s=Math.floor(e.y*t.height),a=Math.floor(e.width*t.width),r=Math.floor(e.height*t.height);if(a<1||r<1)throw new Error("Region too small");o.width=a,o.height=r;const c=t.getContext("2d");if(!c)throw new Error("Failed to get source canvas context");const d=c.getImageData(i,s,a,r);n.putImageData(d,0,0);const l=o.toDataURL();return await Qt(l)}async function Gt(t){if(!t)return jt;const e=Vt.get(t);if(e)return e;try{const[e,o]=await Qt(t),n={background:o,foreground:e};if(Vt.set(t,n),Vt.size>50){const t=Vt.keys().next().value;t&&Vt.delete(t)}return n}catch(t){return console.error("Error extracting colors:",t),jt}}const Xt={x:0,y:0,width:.4,height:.5},Yt={x:0,y:.7,width:1,height:.3};function Jt(t,e,o,n){const i=Math.floor(e.x*o),s=Math.floor(e.y*n),a=Math.floor((e.x+e.width)*o),r=Math.floor((e.y+e.height)*n);let c=0,d=0,l=0,h=0;for(let e=s;e<r;e+=4)for(let n=i;n<a;n+=4){const i=4*(e*o+n);c+=t.data[i],d+=t.data[i+1],l+=t.data[i+2],h++}return 0===h?[128,128,128]:[Math.round(c/h),Math.round(d/h),Math.round(l/h)]}function Zt(t,e=null,o=0){const n=function(t,e){const o=1-e;return[Math.round(t[0]*o),Math.round(t[1]*o),Math.round(t[2]*o)]}(t,o);if(e){const t=function(t){const e=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);return e?[parseInt(e[1],16),parseInt(e[2],16),parseInt(e[3],16)]:[0,0,0]}(e);if(Ht(t,n)>=qt)return e;const o=function(t,e,o=4.5){if(Ht(t,e)>=o)return t;const n=Ft(e[0],e[1],e[2])<.5;let i=[...t];for(let t=0;t<20;t++){const t=n?1.1:.9;if(i=i.map(e=>Math.min(255,Math.max(0,Math.round(e*t)))),Ht(i,e)>=o)return i;if(n&&i.every(t=>t>=255))break;if(!n&&i.every(t=>t<=0))break}return null}(t,n);if(o){const t="#"+o.map(t=>t.toString(16).padStart(2,"0")).join("");if(Ht(o,n)>=qt)return t}}return Ht([255,255,255],n)>Ht([26,26,26],n)?"#ffffff":"#1a1a1a"}const Kt={"editor.tab_general":"General","editor.tab_appearance":"Appearance","editor.tab_controls":"Controls","editor.tab_advanced":"Advanced","editor.mode_default":"Default - Standard layout with artwork on right","editor.mode_minimal":"Minimal - Compact view with minimal controls","editor.mode_full":"Full - Full-cover artwork background","editor.mode_tall":"Tall - Vertical layout with artwork on top","editor.mode_custom":"Custom - Full control over all options","editor.artwork_default":"Compact (right side)","editor.artwork_full_cover":"Full Cover (background)","editor.artwork_tall":"Tall (artwork on top)","editor.station_hidden":"Hidden","editor.station_compact":"Compact (icon only)","editor.station_normal":"Full (icon + station name)","editor.section_mode":"Mode","editor.section_station_selector":"Station Selector","editor.helper_station_pianobar":"Station selector requires a Pianobar media player entity","editor.helper_switch_account_multi":"Switch Account appears when the player has multiple Pandora accounts.","editor.label_entity":"Entity","editor.label_custom_name":"Custom Name","editor.label_volume_entity":"Volume Entity","editor.label_artwork":"Artwork Style","editor.label_tall_artwork_size":"Tall artwork size (%)","editor.label_station_display":"Station Selector","editor.helper_entity":"Select any media player entity","editor.helper_name":"Leave empty to use entity name","editor.helper_volume_entity":"Override volume control to a different media player (e.g., Sonos speaker)","editor.checkbox_show_playback":"Show playback controls","editor.checkbox_show_power":"Show power button","editor.checkbox_show_thumbs":"Show song actions (thumbs)","editor.checkbox_show_progress":"Show progress bar","editor.checkbox_show_progress_time":"Show progress time","editor.checkbox_show_volume":"Show volume control","editor.checkbox_show_account_switch":"Show Switch Account in menu","editor.checkbox_show_details":"Show details","editor.checkbox_show_title":"Show title","editor.checkbox_show_artist":"Show artist","editor.checkbox_show_album":"Show album","editor.checkbox_reserve_space":"Reserve space on card","editor.build":"Build","editor.debug_help":"Temporary tab for debugging. Compare new API vs entity attributes.","editor.debug_new_way":"From get_services_for_target (new way)","editor.debug_old_way":"From entity.attributes (old way)","editor.debug_error":"Error","editor.debug_raw":"Raw","editor.debug_none":"(none)","overflow.why_song":"Why this song?","overflow.show_upcoming":"Show Upcoming Songs","overflow.song_ratings":"Song Ratings","overflow.station_mode":"Station Mode","overflow.manage_seeds":"Manage Seeds & Feedback","overflow.create_station":"Create Station","overflow.add_music":"Add Music to Station","overflow.rename_station":"Rename Station","overflow.delete_station":"Delete Station","overflow.select_station":"Select Station","overflow.quickmix_settings":"QuickMix Settings","overflow.switch_account":"Switch Account","overflow.more_information":"More Information","overflow.disconnect":"Disconnect","overflow.connect":"Connect","overflow.more_options":"More options","overflow.entity_fallback":" (entity fallback)","song.love":"Love Song","song.ban":"Ban Song","song.tired":"Snooze (1 month)","song.title_loved":"Loved","song.title_menu":"Song actions","station_selector.tooltip":"Select Station","playback.turn_off":"Turn off","playback.turn_on":"Turn on","playback.pause":"Pause","playback.play":"Play","playback.next":"Next track","volume.mute":"Mute","volume.unmute":"Unmute","card.select_station":"Select station","card.album_art_alt":"Album artwork","card.error_station_info":"Error loading station info","card.error_genres":"Error loading genres","card.no_media":"No media","card.no_explanation":"No explanation available","card.error_quickmix":"Error updating QuickMix settings","card.error_rename":"Error renaming station","card.error_delete_station":"Error deleting station","card.error_delete_seed":"Error deleting seed","card.error_delete_feedback":"Error deleting feedback","card.error_search_music":"Error searching for music","card.error_add_music":"Error adding music to station","card.error_create_station":"Error creating station","card.error_add_shared":"Error adding shared station","card.toast_failed_explain":"Failed to get song explanation","card.toast_failed_upcoming":"Failed to get upcoming songs","card.toast_failed_station_modes":"Failed to get station modes","card.toast_station_mode_updated":"Station mode updated","card.toast_failed_set_station_mode":"Failed to set station mode","card.toast_failed_switch_account":"Failed to switch account","card.toast_quickmix_updated":"QuickMix settings updated","card.toast_seed_deleted":"Seed deleted","card.toast_feedback_deleted":"Feedback deleted","card.toast_music_added":"Music added to station","card.toast_station_created_song":"Station created from current song","card.toast_station_created_artist":"Station created from current artist","card.toast_station_created":"Station created","card.toast_shared_station_added":"Shared station added","upcoming.title":"Upcoming Songs","upcoming.none":"No upcoming songs","upcoming.artwork_alt":"Album cover","quickmix.title":"Select QuickMix Stations","quickmix.no_stations":"No stations available","quickmix.save":"Save","station_mode.title":"Station Mode","station_mode.title_named":"Station Mode: {name}","station_mode.station_id":"Station ID","station_mode.loading":"Loading modes...","station_mode.no_modes":"No modes available","station_mode.note":"Note: Changing the station mode will restart playback.","station_mode.active":"Active","station_mode.cancel":"Cancel","station_mode.set_mode":"Set Mode","station_info.loading":"Loading station info...","station_info.none":"No seeds or feedback available for this station.","station_info.seeds_header":"Seeds: {name}","station_info.section_artist_seeds":"Artist Seeds","station_info.section_song_seeds":"Song Seeds","station_info.section_station_seeds":"Station Seeds","station_info.section_feedback":"Feedback","station_info.delete":"Delete","station_info.close":"Close","rename.title":"Rename Station","rename.title_named":"Rename: {name}","rename.no_stations":"No stations available to rename","delete.title":"Delete Station","delete.warning":"Warning:","delete.confirm_text":"This will permanently delete the selected station.","delete.no_stations":"No stations available to delete","account.title":"Switch Account","account.active":"Active","account.switch_button":"Switch","common.cancel":"Cancel","common.back":"Back","common.save":"Save","common.search":"Search","common.searching":"Searching...","common.by_artist":"by {artist}","create_station.title":"Create Station","create_station.placeholder_search":"Search for artist or song...","create_station.placeholder_shared":"Enter shared station ID (digits only)","create_station.section_or_create":"Or create from:","create_station.option_artist":"The current Artist","create_station.option_song":"The current Song","create_station.option_genre":"Genre","create_station.genre_detail":"Select a genre","create_station.placeholder_search_long":"Search for artists or songs...","create_station.loading_genres":"Loading genres...","create_station.no_genres":"No genres available","create_station.searching":"Searching...","create_station.no_results":'No results found for "{query}"',"create_station.create":"Create Station","create_station.add_shared":"Add shared station","create_station.add_short":"Add","create_station.searching_for":'Searching for "{query}"...',"add_music.title":"Add Music to Station","add_music.title_with_station":"Add Music to {name}","add_music.add_button":"Add Music","add_music.no_stations":"No stations available","add_music.searching":"Searching...","add_music.enter_query":"Enter a search query to find music","add_music.no_results":'No results found for "{query}"',"rename.cancel":"Cancel","rename.rename":"Rename","rename.next":"Next","rename.current_name":"Current name:","rename.placeholder_new_name":"Enter new station name","rename.note_pandora":"Note: Pandora may not allow some stations to be renamed.","delete.cannot_undo":"This action cannot be undone.","delete.delete_station_button":"Delete Station","delete.cancel":"Cancel","delete.delete":"Delete","overflow.built_prefix":"Built:"};function te(t,e){return Kt[e]??e}function ee(t,e,o){let n=te(0,e);for(const[t,e]of Object.entries(o))n=n.replaceAll(`{${t}}`,String(e));return n}let oe=class extends ct{constructor(){super(...arguments),this.playing=!1,this.disabled=!1,this.showPower=!1,this.isOn=!0}_handlePower(){this.dispatchEvent(new CustomEvent("power-toggle",{bubbles:!0,composed:!0}))}_handlePlayPause(){this.dispatchEvent(new CustomEvent("play-pause",{bubbles:!0,composed:!0}))}_handleNext(){this.dispatchEvent(new CustomEvent("next-track",{bubbles:!0,composed:!0}))}render(){return V`
      ${this.showPower?V`
            <button
              class="control-button ${this.isOn?"":"power-off"}"
              @click=${this._handlePower}
              title=${this.isOn?te(this.hass,"playback.turn_off"):te(this.hass,"playback.turn_on")}
            >
              <ha-icon icon="mdi:power"></ha-icon>
            </button>
          `:H}
      <button
        class="control-button"
        @click=${this._handlePlayPause}
        ?disabled=${this.disabled}
        title=${this.playing?te(this.hass,"playback.pause"):te(this.hass,"playback.play")}
      >
        <ha-icon .icon=${this.playing?"mdi:pause":"mdi:play"}></ha-icon>
      </button>
      <button
        class="control-button"
        @click=${this._handleNext}
        ?disabled=${this.disabled}
        title=${te(this.hass,"playback.next")}
      >
        <ha-icon icon="mdi:skip-next"></ha-icon>
      </button>
    `}};oe.styles=a`
    :host {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .control-button {
      background: none;
      border: none;
      padding: 8px;
      cursor: pointer;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.2s;
      color: inherit;
    }

    .control-button:hover:not(:disabled) {
      background-color: rgba(255, 255, 255, 0.1);
    }

    .control-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .control-button ha-icon {
      --mdc-icon-size: 24px;
    }

    .control-button.power-off {
      opacity: 0.5;
    }
  `,t([ut({attribute:!1})],oe.prototype,"hass",void 0),t([ut({type:Boolean})],oe.prototype,"playing",void 0),t([ut({type:Boolean})],oe.prototype,"disabled",void 0),t([ut({type:Boolean})],oe.prototype,"showPower",void 0),t([ut({type:Boolean})],oe.prototype,"isOn",void 0),oe=t([lt("pmc-playback-controls")],oe);let ne=class extends ct{constructor(){super(...arguments),this.duration=0,this.position=0,this.positionUpdatedAt="",this.showTime=!1,this.isPlaying=!1,this._animationFrameId=null,this._currentPosition=0}connectedCallback(){super.connectedCallback(),this._startAnimation()}disconnectedCallback(){super.disconnectedCallback(),this._stopAnimation()}updated(t){(t.has("position")||t.has("positionUpdatedAt"))&&(this._currentPosition=this.position)}_startAnimation(){const t=()=>{if(this.duration>0&&this.positionUpdatedAt){if(this.isPlaying){const t=new Date(this.positionUpdatedAt).getTime(),e=(Date.now()-t)/1e3;this._currentPosition=Math.min(this.position+e,this.duration)}else this._currentPosition=this.position;this.requestUpdate()}this._animationFrameId=requestAnimationFrame(t)};this._animationFrameId=requestAnimationFrame(t)}_stopAnimation(){this._animationFrameId&&(cancelAnimationFrame(this._animationFrameId),this._animationFrameId=null)}_formatTime(t){return`${Math.floor(t/60)}:${Math.floor(t%60).toString().padStart(2,"0")}`}render(){const t=this.duration>0?this._currentPosition/this.duration*100:0;return V`
      <div class="progress-container">
        ${this.showTime?V`
              <div class="time-display">
                <span>${this._formatTime(this._currentPosition)}</span>
                <span>${this._formatTime(this.duration)}</span>
              </div>
            `:H}
        <div class="progress-bar-wrapper">
          <div class="progress-track"></div>
          <div class="progress-fill" style="width: ${t}%"></div>
        </div>
      </div>
    `}};ne.styles=a`
    @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400&display=swap');

    :host {
      display: block;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: auto;
      z-index: 3;
    }

    .progress-container {
      position: relative;
      width: 100%;
    }

    /* Time display above progress bar */
    .time-display {
      display: flex;
      justify-content: space-between;
      font-family: 'Roboto Mono', ui-monospace, 'SF Mono', Monaco, monospace;
      font-variant-numeric: tabular-nums;
      font-size: 0.75rem;
      color: inherit;
      padding: 0 8px 4px;
    }

    /* Progress bar wrapper */
    .progress-bar-wrapper {
      position: relative;
      height: var(--pmc-progress-height);
    }

    /* Progress bar track (background) */
    .progress-track {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: currentColor;
      opacity: 0.2;
    }

    /* Progress bar fill */
    .progress-fill {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      background: currentColor;
      width: 0;
      transition: width 0.1s linear;
      z-index: 1;
    }
  `,t([ut({type:Number})],ne.prototype,"duration",void 0),t([ut({type:Number})],ne.prototype,"position",void 0),t([ut({type:String})],ne.prototype,"positionUpdatedAt",void 0),t([ut({type:Boolean})],ne.prototype,"showTime",void 0),t([ut({type:Boolean})],ne.prototype,"isPlaying",void 0),ne=t([lt("pmc-progress-bar")],ne);let ie=class extends ct{constructor(){super(...arguments),this.volume=.5,this.muted=!1,this.disabled=!1,this.sliderColor="currentColor",this._dragging=!1}_getVolumeIcon(){return this.muted||0===this.volume?"mdi:volume-off":this.volume<.3?"mdi:volume-low":this.volume<.7?"mdi:volume-medium":"mdi:volume-high"}_handleVolumeChange(t){const e=t.target,o=parseFloat(e.value);this.dispatchEvent(new CustomEvent("volume-change",{detail:{volume:o},bubbles:!0,composed:!0}))}_handleMuteToggle(){this.dispatchEvent(new CustomEvent("mute-toggle",{bubbles:!0,composed:!0}))}render(){const t=Math.round(100*this.volume),e=100*this.volume+"%";return V`
      <button
        class="volume-button"
        @click=${this._handleMuteToggle}
        ?disabled=${this.disabled}
        title=${this.muted?te(this.hass,"volume.unmute"):te(this.hass,"volume.mute")}
      >
        <ha-icon .icon=${this._getVolumeIcon()}></ha-icon>
      </button>
      <div class="slider-container ${this.disabled?"disabled":""}">
        <div class="slider-track" style="background: ${this.sliderColor}"></div>
        <div class="slider-fill" style="background: ${this.sliderColor}; width: ${e}"></div>
        <div class="slider-thumb" style="background: ${this.sliderColor}; left: ${e}"></div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          .value=${String(this.volume)}
          @input=${this._handleVolumeChange}
          ?disabled=${this.disabled}
        />
      </div>
      <span class="volume-value">${t}%</span>
    `}};ie.styles=a`
    :host {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
    }

    .volume-button {
      background: none;
      border: none;
      padding: 8px;
      cursor: pointer;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.2s;
      color: inherit;
      flex-shrink: 0;
    }

    .volume-button:hover:not(:disabled) {
      background-color: rgba(255, 255, 255, 0.1);
    }

    .volume-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .volume-button ha-icon {
      --mdc-icon-size: 24px;
    }

    .slider-container {
      flex: 1;
      position: relative;
      height: 24px;
      display: flex;
      align-items: center;
    }

    /* Custom slider track */
    .slider-track {
      position: absolute;
      left: 0;
      right: 0;
      height: 4px;
      border-radius: 2px;
      opacity: 0.3;
    }

    /* Custom slider fill (progress) */
    .slider-fill {
      position: absolute;
      left: 0;
      height: 4px;
      border-radius: 2px;
    }

    /* Custom slider thumb */
    .slider-thumb {
      position: absolute;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      transform: translateX(-50%);
      pointer-events: none;
      transition: transform 0.1s;
    }

    .slider-container:hover .slider-thumb {
      transform: translateX(-50%) scale(1.2);
    }

    /* Invisible native input for interaction */
    input[type="range"] {
      position: absolute;
      width: 100%;
      height: 24px;
      margin: 0;
      opacity: 0;
      cursor: pointer;
      z-index: 1;
    }

    input[type="range"]:disabled {
      cursor: not-allowed;
    }

    .slider-container.disabled {
      opacity: 0.5;
    }

    .volume-value {
      font-size: 0.75rem;
      color: inherit;
      min-width: 36px;
      text-align: right;
      flex-shrink: 0;
    }
  `,t([ut({attribute:!1})],ie.prototype,"hass",void 0),t([ut({type:Number})],ie.prototype,"volume",void 0),t([ut({type:Boolean})],ie.prototype,"muted",void 0),t([ut({type:Boolean})],ie.prototype,"disabled",void 0),t([ut({type:String})],ie.prototype,"sliderColor",void 0),t([gt()],ie.prototype,"_dragging",void 0),ie=t([lt("pmc-volume-slider")],ie);class se extends ct{constructor(){super(...arguments),this.disabled=!1,this.externalOpen=!1,this.isOpen=!1,this.top=0,this.left=0,this.ignoreNextClickOutside=!1,this._portalContainer=null}static get baseStyles(){return a`
      :host {
        position: relative;
        display: contents;
      }

      .backdrop {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 99998;
      }

      .popup-container {
        position: fixed;
        background: var(--pmc-card-background);
        border-radius: 12px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
        z-index: 99999;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.2s, visibility 0.2s;
      }

      .popup-container.open {
        opacity: 1;
        visibility: visible;
      }
    `}connectedCallback(){super.connectedCallback(),this.handleClickOutside=this.handleClickOutside.bind(this),document.addEventListener("click",this.handleClickOutside)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this.handleClickOutside),this._removePortal()}_createPortal(){this._portalContainer||(this._portalContainer=document.createElement("div"),this._portalContainer.className="pmc-popup-portal",document.body.appendChild(this._portalContainer))}_removePortal(){this._portalContainer&&(this._portalContainer.remove(),this._portalContainer=null)}firstUpdated(){this.externalOpen&&!this.isOpen&&this.openPopupExternal()}updated(t){if(t.has("externalOpen")&&this.externalOpen&&!this.isOpen&&this.openPopupExternal(),t.has("anchorPosition")&&this.isOpen&&this.anchorPosition&&this.updatePosition(),t.has("isOpen")&&this._updatePortalContent(),this.isOpen&&t.size>0&&!t.has("isOpen")){const e=[...t.keys()];1===e.length&&"hass"===e[0]||this._updatePortalContent()}}handleClickOutside(t){if(this.ignoreNextClickOutside)return void(this.ignoreNextClickOutside=!1);const e=t.composedPath(),o=e.includes(this),n=!!this._portalContainer&&e.includes(this._portalContainer);!this.isOpen||o||n||this.closePopup()}openPopupExternal(){this.ignoreNextClickOutside=!0,requestAnimationFrame(()=>{this.openPopup()})}openPopup(){this.disabled||(this.updatePosition(),this._createPortal(),this.isOpen=!0,this._updatePortalContent())}closePopup(){this.isOpen=!1,this._updatePortalContent(),this.dispatchEvent(new CustomEvent("popup-closed",{bubbles:!0,composed:!0}))}updatePosition(){if(this.anchorPosition){const t=this.getPopupDimensions(),e=this.calculatePosition(t);this.left=e.left,this.top=e.top}}calculatePosition(t){if(!this.anchorPosition)return{left:0,top:0};const{width:e,height:o}=t;let n=this.anchorPosition.left,i=this.anchorPosition.bottom+4;return n=Math.max(8,Math.min(n,window.innerWidth-e-8)),i+o>window.innerHeight-8?(i=this.anchorPosition.top-4-o,i=Math.max(8,i)):i=Math.min(i,window.innerHeight-o-8),{left:n,top:i}}getPopupDimensions(){return{width:350,height:Math.min(400,window.innerHeight-100)}}getPopupClasses(){return""}getPopupStyles(){return{left:`${this.left}px`,top:`${this.top}px`}}getBaseStylesString(){return"\n      .pmc-popup-backdrop {\n        position: fixed;\n        top: 0;\n        left: 0;\n        right: 0;\n        bottom: 0;\n        z-index: 99998;\n      }\n\n      .pmc-popup-container {\n        position: fixed;\n        background: var(--card-background-color, #fff);\n        border-radius: 12px;\n        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);\n        z-index: 99999;\n        opacity: 0;\n        visibility: hidden;\n        transition: opacity 0.2s, visibility 0.2s;\n      }\n\n      .pmc-popup-container.open {\n        opacity: 1;\n        visibility: visible;\n      }\n    "}getComponentStylesString(){return""}_updatePortalContent(){if(!this._portalContainer)return;if(!this.isOpen)return void(this._portalContainer.innerHTML="");const t=document.createElement("div");t.className="pmc-popup-backdrop",t.addEventListener("click",()=>this.closePopup());const e=document.createElement("div"),o=`pmc-popup-container ${this.isOpen?"open":""} ${this.getPopupClasses()}`.trim();e.className=o;const n=this.getPopupStyles();Object.entries(n).forEach(([t,o])=>{e.style.setProperty(t,o)});const i=this.renderPopupContent();at(i,e);const s=document.createElement("style"),a=this.getComponentStylesString();s.textContent=this.getBaseStylesString()+a,this._portalContainer.innerHTML="",this._portalContainer.appendChild(s),this._portalContainer.appendChild(t),this._portalContainer.appendChild(e)}render(){return H}}t([ut({attribute:!1})],se.prototype,"hass",void 0),t([ut({type:Boolean})],se.prototype,"disabled",void 0),t([ut({type:Boolean})],se.prototype,"externalOpen",void 0),t([ut({type:Object})],se.prototype,"anchorPosition",void 0),t([gt()],se.prototype,"isOpen",void 0),t([gt()],se.prototype,"top",void 0),t([gt()],se.prototype,"left",void 0);let ae=class extends se{constructor(){super(...arguments),this.rating=0,this.showLove=!0,this.showBan=!0,this.showTired=!0,this.popupOnly=!1}static get styles(){return[se.baseStyles,a`
        .trigger-button {
          background: none;
          border: none;
          padding: 8px;
          cursor: pointer;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.2s;
          color: inherit;
        }

        .trigger-button:hover:not(:disabled) {
          background-color: rgba(128, 128, 128, 0.2);
        }

        .trigger-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .trigger-button.loved {
          color: #4caf50;
        }

        .trigger-button ha-icon {
          --mdc-icon-size: 24px;
        }

        .popup-container {
          padding: 4px;
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 160px;
          max-height: calc(100vh - 100px);
          overflow-y: auto;
          transform: translateX(-50%);
        }

        .action-button {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 6px 16px;
          border: none;
          border-radius: 8px;
          background: transparent;
          color: var(--primary-text-color);
          cursor: pointer;
          transition: all 0.2s;
          text-align: left;
          font-size: 14px;
          width: 100%;
        }

        .action-button:hover {
          background: var(--pmc-secondary-background);
        }

        .action-button.love:hover {
          background: rgba(76, 175, 80, 0.15);
          color: #4caf50;
        }

        .action-button.love.active {
          background: rgba(76, 175, 80, 0.15);
          color: #4caf50;
        }

        .action-button.ban:hover {
          background: rgba(244, 67, 54, 0.15);
          color: #f44336;
        }

        .action-button.tired:hover {
          background: rgba(255, 152, 0, 0.15);
          color: #ff9800;
        }

        .action-button ha-icon {
          --mdc-icon-size: 20px;
        }
      `]}getPopupDimensions(){let t=0;this.showLove&&t++,this.showBan&&t++,this.showTired&&t++;return{width:180,height:Math.min(36*t+8,window.innerHeight-100)}}getComponentStylesString(){return"\n      .pmc-popup-container {\n        padding: 4px;\n        display: flex;\n        flex-direction: column;\n        gap: 2px;\n        min-width: 160px;\n        max-height: calc(100vh - 100px);\n        overflow-y: auto;\n        transform: translateX(-50%);\n      }\n\n      .action-button {\n        display: flex;\n        align-items: center;\n        gap: 12px;\n        padding: 6px 16px;\n        border: none;\n        border-radius: 8px;\n        background: transparent;\n        color: var(--primary-text-color);\n        cursor: pointer;\n        transition: all 0.2s;\n        text-align: left;\n        font-size: 14px;\n        width: 100%;\n      }\n\n      .action-button:hover {\n        background: var(--secondary-background-color, rgba(0, 0, 0, 0.05));\n      }\n\n      .action-button.love:hover {\n        background: rgba(76, 175, 80, 0.15);\n        color: #4caf50;\n      }\n\n      .action-button.love.active {\n        background: rgba(76, 175, 80, 0.15);\n        color: #4caf50;\n      }\n\n      .action-button.ban:hover {\n        background: rgba(244, 67, 54, 0.15);\n        color: #f44336;\n      }\n\n      .action-button.tired:hover {\n        background: rgba(255, 152, 0, 0.15);\n        color: #ff9800;\n      }\n\n      .action-button ha-icon {\n        --mdc-icon-size: 20px;\n      }\n    "}toggleMenu(t){if(t.stopPropagation(),this.isOpen)this.closePopup();else{const e=t.currentTarget.getBoundingClientRect();this.anchorPosition={left:e.left+e.width/2,top:e.top,bottom:e.bottom,right:e.right},this.ignoreNextClickOutside=!0,requestAnimationFrame(()=>{this.openPopup()})}}handleLove(){this.dispatchEvent(new CustomEvent("love-song",{bubbles:!0,composed:!0})),this.closePopup()}handleBan(){this.dispatchEvent(new CustomEvent("ban-song",{bubbles:!0,composed:!0})),this.closePopup()}handleTired(){this.dispatchEvent(new CustomEvent("tired-song",{bubbles:!0,composed:!0})),this.closePopup()}renderPopupContent(){const t=1===this.rating;return V`
      ${this.showLove?V`
        <button
          class="action-button love ${t?"active":""}"
          @click=${()=>this.handleLove()}
        >
          <ha-icon icon="mdi:thumb-up"></ha-icon>
          <span>${te(this.hass,"song.love")}</span>
        </button>
      `:H}
      ${this.showBan?V`
        <button class="action-button ban" @click=${()=>this.handleBan()}>
          <ha-icon icon="mdi:thumb-down"></ha-icon>
          <span>${te(this.hass,"song.ban")}</span>
        </button>
      `:H}
      ${this.showTired?V`
        <button class="action-button tired" @click=${()=>this.handleTired()}>
          <ha-icon icon="mdi:sleep"></ha-icon>
          <span>${te(this.hass,"song.tired")}</span>
        </button>
      `:H}
    `}render(){const t=1===this.rating;return this.popupOnly?super.render():V`
      <button
        class="trigger-button ${t?"loved":""}"
        @click=${this.toggleMenu}
        ?disabled=${this.disabled}
        title="${te(this.hass,t?"song.title_loved":"song.title_menu")}"
      >
        <ha-icon icon="${t?"mdi:thumb-up":"mdi:thumbs-up-down-outline"}"></ha-icon>
      </button>
    `}};t([ut({type:Number})],ae.prototype,"rating",void 0),t([ut({type:Boolean})],ae.prototype,"showLove",void 0),t([ut({type:Boolean})],ae.prototype,"showBan",void 0),t([ut({type:Boolean})],ae.prototype,"showTired",void 0),t([ut({type:Boolean})],ae.prototype,"popupOnly",void 0),ae=t([lt("pmc-song-actions-menu")],ae);let re=class extends se{constructor(){super(...arguments),this.stations=[],this.currentStationId="",this.currentStationName="",this.songStationName="",this.popupOnly=!1}static get styles(){return[se.baseStyles,a`
        .trigger-button {
          background: none;
          border: none;
          padding: 8px;
          cursor: pointer;
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: background-color 0.2s;
          color: inherit;
          font-size: 14px;
          font-weight: 500;
        }

        .trigger-button:hover:not(:disabled) {
          background-color: rgba(128, 128, 128, 0.2);
        }

        .trigger-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .trigger-button ha-icon {
          --mdc-icon-size: 24px;
        }

        .popup-container {
          padding: 4px;
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 200px;
          max-width: 300px;
          max-height: calc(100vh - 100px);
          overflow-y: auto;
        }

        .station-button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          border: none;
          border-radius: 8px;
          background: transparent;
          color: var(--primary-text-color);
          cursor: pointer;
          transition: all 0.2s;
          text-align: left;
          font-size: 14px;
          width: 100%;
        }

        .station-button:hover {
          background: var(--pmc-secondary-background);
        }

        .station-button.active {
          background: var(--pmc-primary-color);
          color: var(--pmc-text-primary);
        }

        .station-button.active:hover {
          background: var(--pmc-primary-color);
        }

        .station-button ha-icon {
          --mdc-icon-size: 20px;
          flex-shrink: 0;
        }

        .station-button .station-text {
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .station-button .quickmix-badge {
          --mdc-icon-size: 16px;
          flex-shrink: 0;
          color: var(--pmc-primary-color);
        }

        .station-button.active .quickmix-badge {
          color: var(--pmc-text-primary);
        }
      `]}getPopupDimensions(){return{width:250,height:Math.min(36*this.stations.length+8,window.innerHeight-100)}}calculatePosition(t){if(!this.anchorPosition)return{left:0,top:0};const{width:e,height:o}=t;let n=this.anchorPosition.left-e/2;n=Math.max(8,Math.min(n,window.innerWidth-e-8));let i=this.anchorPosition.bottom+4;return i+o>window.innerHeight-8?(i=this.anchorPosition.top-4-o,i=Math.max(8,i)):i=Math.min(i,window.innerHeight-o-8),{left:n,top:i}}getComponentStylesString(){return"\n      .pmc-popup-container {\n        padding: 4px;\n        display: flex;\n        flex-direction: column;\n        gap: 2px;\n        min-width: 200px;\n        max-width: 300px;\n        max-height: calc(100vh - 100px);\n        overflow-y: auto;\n      }\n\n      .station-button {\n        display: flex;\n        align-items: center;\n        gap: 8px;\n        padding: 8px 12px;\n        border: none;\n        border-radius: 8px;\n        background: transparent;\n        color: var(--primary-text-color);\n        cursor: pointer;\n        transition: all 0.2s;\n        text-align: left;\n        font-size: 14px;\n        width: 100%;\n      }\n\n      .station-button:hover {\n        background: var(--secondary-background-color, rgba(0, 0, 0, 0.05));\n      }\n\n      .station-button.active {\n        background: var(--primary-color);\n        color: var(--text-primary-color, #fff);\n      }\n\n      .station-button.active:hover {\n        background: var(--primary-color);\n      }\n\n      .station-button ha-icon {\n        --mdc-icon-size: 20px;\n        flex-shrink: 0;\n      }\n\n      .station-button .station-text {\n        flex: 1;\n        overflow: hidden;\n        text-overflow: ellipsis;\n        white-space: nowrap;\n      }\n\n      .station-button .quickmix-badge {\n        --mdc-icon-size: 16px;\n        flex-shrink: 0;\n        color: var(--primary-color);\n      }\n\n      .station-button.active .quickmix-badge {\n        color: var(--text-primary-color, #fff);\n      }\n    "}toggleMenu(t){if(t.stopPropagation(),this.isOpen)this.closePopup();else{const e=t.currentTarget.getBoundingClientRect();this.anchorPosition={left:e.left+e.width/2,top:e.top,bottom:e.bottom,right:e.right},this.ignoreNextClickOutside=!0,requestAnimationFrame(()=>{this.openPopup()})}}handleStationClick(t){this.dispatchEvent(new CustomEvent("station-change",{detail:{stationId:t.id,stationName:t.name},bubbles:!0,composed:!0})),this.closePopup()}getCurrentStation(){return this.stations.find(t=>t.id===this.currentStationId)}renderPopupContent(){return V`
      ${this.stations.map(t=>{const e=t.id===this.currentStationId,o=t.isQuickMix?"mdi:shuffle":"mdi:play-circle-outline",n=t.isQuickMixed&&!t.isQuickMix;return V`
          <button
            class="station-button ${e?"active":""}"
            @click=${()=>this.handleStationClick(t)}
          >
            <ha-icon icon="${o}"></ha-icon>
            <span class="station-text">${t.name}</span>
            ${n?V`<ha-icon class="quickmix-badge" icon="mdi:shuffle"></ha-icon>`:H}
          </button>
        `})}
    `}render(){const t=this.getCurrentStation(),e=t?.isQuickMix??!1;let o=this.currentStationName||te(this.hass,"overflow.select_station");e&&this.songStationName&&(o=this.songStationName);const n=e?"mdi:shuffle":"mdi:radio";return this.popupOnly?super.render():V`
      <button
        class="trigger-button"
        @click=${this.toggleMenu}
        ?disabled=${this.disabled||0===this.stations.length}
        title="${o}"
      >
        <ha-icon icon="${n}"></ha-icon>
      </button>
    `}};t([ut({type:Array})],re.prototype,"stations",void 0),t([ut({type:String})],re.prototype,"currentStationId",void 0),t([ut({type:String})],re.prototype,"currentStationName",void 0),t([ut({type:String})],re.prototype,"songStationName",void 0),t([ut({type:Boolean})],re.prototype,"popupOnly",void 0),re=t([lt("pmc-station-selector")],re);let ce=class extends ct{constructor(){super(...arguments),this.entityId="",this.showStationOption=!1,this.showRatingsOption=!1,this.showExplainOption=!1,this.showUpcomingOption=!1,this.showStationModeOption=!1,this.showQuickMixOption=!1,this.showStationInfoOption=!1,this.showAddMusicOption=!1,this.showCreateStationOption=!1,this.showRenameOption=!1,this.showDeleteOption=!1,this.showAccountSwitch=!1,this.isOn=!0,this.disabled=!1,this.buildTime="",this.usingSupportedActionsFallback=!1,this._menuOpen=!1,this._menuTop=0,this._menuLeft=0,this._portalContainer=null}connectedCallback(){super.connectedCallback(),this._handleClickOutside=this._handleClickOutside.bind(this),document.addEventListener("click",this._handleClickOutside)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._handleClickOutside),this._removePortal()}_createPortal(){this._portalContainer||(this._portalContainer=document.createElement("div"),this._portalContainer.className="pmc-overflow-menu-portal",document.body.appendChild(this._portalContainer))}_removePortal(){this._portalContainer&&(this._portalContainer.remove(),this._portalContainer=null)}_handleClickOutside(t){const e=t.composedPath(),o=e.includes(this),n=!!this._portalContainer&&e.includes(this._portalContainer);!this._menuOpen||o||n||(this._menuOpen=!1)}_toggleMenu(t){t.stopPropagation(),this.disabled||(this._menuOpen||(this._updateMenuPosition(),this._createPortal()),this._menuOpen=!this._menuOpen,this._updatePortalContent())}_updateMenuPosition(){const t=this.getBoundingClientRect();let e=2;this.showStationOption&&e++,this.showRatingsOption&&e++,this.showExplainOption&&e++,this.showUpcomingOption&&e++,this.showStationModeOption&&e++,this.showQuickMixOption&&e++,this.showStationInfoOption&&e++,this.showAddMusicOption&&e++,this.showCreateStationOption&&e++,this.showRenameOption&&e++,this.showDeleteOption&&e++,this.showAccountSwitch&&e++;const o=44*e+(this.buildTime?40:0),n=window.innerHeight-16,i=Math.min(o,n);let s=t.right-180,a=t.bottom+4;s=Math.max(8,Math.min(s,window.innerWidth-180-8)),a+i>window.innerHeight-8?(a=t.top-4-i,a=Math.max(8,a)):a=Math.min(a,window.innerHeight-i-8),this._menuLeft=s,this._menuTop=a}_handleMoreInfo(){this.dispatchEvent(new CustomEvent("more-info",{bubbles:!0,composed:!0,detail:{entityId:this.entityId}})),this._menuOpen=!1}_getElementPosition(t){const e=t.getBoundingClientRect();return{left:e.left,top:e.top,bottom:e.bottom,right:e.right}}_handleSelectStation(t){const e=t.currentTarget;this.dispatchEvent(new CustomEvent("select-station",{bubbles:!0,composed:!0,detail:{anchorPosition:this._getElementPosition(e)}})),this._menuOpen=!1}_handleSelectRatings(t){const e=t.currentTarget;this.dispatchEvent(new CustomEvent("select-ratings",{bubbles:!0,composed:!0,detail:{anchorPosition:this._getElementPosition(e)}})),this._menuOpen=!1}_closeMenu(){this._menuOpen=!1,this._updatePortalContent()}_updatePortalContent(){if(!this._portalContainer)return;if(!this._menuOpen)return void(this._portalContainer.innerHTML="");const t=t=>te(this.hass,t);let e="";this.showExplainOption&&(e+=`\n        <button class="menu-item" data-action="explain-song">\n          <ha-icon icon="mdi:comment-question-outline"></ha-icon>\n          <span>${t("overflow.why_song")}</span>\n        </button>\n      `),this.showUpcomingOption&&(e+=`\n        <button class="menu-item" data-action="show-upcoming">\n          <ha-icon icon="mdi:playlist-music"></ha-icon>\n          <span>${t("overflow.show_upcoming")}</span>\n        </button>\n      `),this.showRatingsOption&&(e+=`\n        <button class="menu-item" data-action="select-ratings">\n          <ha-icon icon="mdi:thumbs-up-down-outline"></ha-icon>\n          <span>${t("overflow.song_ratings")}</span>\n        </button>\n      `),this.showStationModeOption&&(e+=`\n        <button class="menu-item" data-action="station-mode">\n          <ha-icon icon="mdi:tune-variant"></ha-icon>\n          <span>${t("overflow.station_mode")}</span>\n        </button>\n      `),this.showStationInfoOption&&(e+=`\n        <button class="menu-item" data-action="station-info">\n          <ha-icon icon="mdi:information"></ha-icon>\n          <span>${t("overflow.manage_seeds")}</span>\n        </button>\n      `),(this.showStationModeOption||this.showStationInfoOption)&&(e+='<div style="height: 1px; background: var(--divider-color, rgba(0, 0, 0, 0.1)); margin: 4px 0;"></div>'),this.showCreateStationOption&&(e+=`\n        <button class="menu-item" data-action="create-station">\n          <ha-icon icon="mdi:plus-circle"></ha-icon>\n          <span>${t("overflow.create_station")}</span>\n        </button>\n      `),this.showAddMusicOption&&(e+=`\n        <button class="menu-item" data-action="add-music">\n          <ha-icon icon="mdi:playlist-plus"></ha-icon>\n          <span>${t("overflow.add_music")}</span>\n        </button>\n      `),this.showRenameOption&&(e+=`\n        <button class="menu-item" data-action="rename-station">\n          <ha-icon icon="mdi:pencil"></ha-icon>\n          <span>${t("overflow.rename_station")}</span>\n        </button>\n      `),this.showDeleteOption&&(e+=`\n        <button class="menu-item destructive" data-action="delete-station">\n          <ha-icon icon="mdi:delete"></ha-icon>\n          <span>${t("overflow.delete_station")}</span>\n        </button>\n      `),(this.showStationOption||this.showRenameOption||this.showDeleteOption)&&(e+='<div style="height: 1px; background: var(--divider-color, rgba(0, 0, 0, 0.1)); margin: 4px 0;"></div>'),this.showStationOption&&(e+=`\n        <button class="menu-item" data-action="select-station">\n          <ha-icon icon="mdi:radio"></ha-icon>\n          <span>${t("overflow.select_station")}</span>\n        </button>\n      `),this.showQuickMixOption&&(e+=`\n        <button class="menu-item" data-action="quickmix">\n          <ha-icon icon="mdi:playlist-music"></ha-icon>\n          <span>${t("overflow.quickmix_settings")}</span>\n        </button>\n      `),this.showAccountSwitch&&(e+=`\n        <button class="menu-item" data-action="switch-account">\n          <ha-icon icon="mdi:account-switch"></ha-icon>\n          <span>${t("overflow.switch_account")}</span>\n        </button>\n      `);const o=this.isOn?t("overflow.disconnect"):t("overflow.connect");if(e+=`\n      <button class="menu-item" data-action="more-info">\n        <ha-icon icon="mdi:information-outline"></ha-icon>\n        <span>${t("overflow.more_information")}</span>\n      </button>\n      <button class="menu-item" data-action="power-toggle">\n        <ha-icon icon="mdi:power"></ha-icon>\n        <span>${o}</span>\n      </button>\n    `,this.buildTime){const o=this.usingSupportedActionsFallback?t("overflow.entity_fallback"):"";e+=`<div class="build-time">${this._formatBuildTime(this.buildTime)}${o}</div>`}this._portalContainer.innerHTML=`\n      <style>\n      .pmc-portal-backdrop {\n        position: fixed;\n        top: 0;\n        left: 0;\n        right: 0;\n        bottom: 0;\n        z-index: 99998;\n      }\n      .pmc-portal-menu {\n        position: fixed;\n        background: var(--card-background-color, #fff);\n        border-radius: 12px;\n        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);\n        padding: 4px;\n        display: flex;\n        flex-direction: column;\n        gap: 2px;\n        z-index: 99999;\n        min-width: 180px;\n        max-height: calc(100vh - 16px);\n        overflow-y: auto;\n      }\n      .pmc-portal-menu .menu-item {\n        display: flex;\n        align-items: center;\n        gap: 12px;\n        padding: 10px 16px;\n        border: none;\n        border-radius: 8px;\n        background: transparent;\n        color: var(--primary-text-color);\n        cursor: pointer;\n        transition: all 0.2s;\n        text-align: left;\n        font-size: 14px;\n        width: 100%;\n      }\n      .pmc-portal-menu .menu-item:hover {\n        background: var(--secondary-background-color, rgba(0, 0, 0, 0.05));\n      }\n      .pmc-portal-menu .menu-item ha-icon {\n        --mdc-icon-size: 20px;\n      }\n      .pmc-portal-menu .build-time {\n        padding: 8px 16px;\n        font-size: 11px;\n        color: var(--secondary-text-color, rgba(0, 0, 0, 0.5));\n        text-align: center;\n        border-top: 1px solid var(--divider-color, rgba(0, 0, 0, 0.1));\n        margin-top: 4px;\n        pointer-events: none;\n        user-select: text;\n      }\n    </style>\n      <div class="pmc-portal-backdrop"></div>\n      <div class="pmc-portal-menu" style="left: ${this._menuLeft}px; top: ${this._menuTop}px;">\n        ${e}\n      </div>\n    `;const n=this._portalContainer.querySelector(".pmc-portal-backdrop");n?.addEventListener("click",()=>{this._menuOpen=!1,this._updatePortalContent()});this._portalContainer.querySelectorAll(".menu-item").forEach(t=>{t.addEventListener("click",e=>{const o=t.dataset.action;if("more-info"===o)this.dispatchEvent(new CustomEvent("more-info",{bubbles:!0,composed:!0,detail:{entityId:this.entityId}}));else if("power-toggle"===o)this.dispatchEvent(new CustomEvent("power-toggle",{bubbles:!0,composed:!0}));else if("select-station"===o){const e=t.getBoundingClientRect();this.dispatchEvent(new CustomEvent("select-station",{bubbles:!0,composed:!0,detail:{anchorPosition:{left:e.left,top:e.top,bottom:e.bottom,right:e.right}}}))}else if("select-ratings"===o){const e=t.getBoundingClientRect();this.dispatchEvent(new CustomEvent("select-ratings",{bubbles:!0,composed:!0,detail:{anchorPosition:{left:e.left,top:e.top,bottom:e.bottom,right:e.right}}}))}else if("explain-song"===o)this.dispatchEvent(new CustomEvent("explain-song",{bubbles:!0,composed:!0}));else if("show-upcoming"===o){const e=t.getBoundingClientRect();this.dispatchEvent(new CustomEvent("show-upcoming",{bubbles:!0,composed:!0,detail:{anchorPosition:{left:e.left,top:e.top,bottom:e.bottom,right:e.right}}}))}else if("station-mode"===o){const e=t.getBoundingClientRect();this.dispatchEvent(new CustomEvent("station-mode",{bubbles:!0,composed:!0,detail:{anchorPosition:{left:e.left,top:e.top,bottom:e.bottom,right:e.right}}}))}else if("station-info"===o){const e=t.getBoundingClientRect();this.dispatchEvent(new CustomEvent("station-info",{bubbles:!0,composed:!0,detail:{anchorPosition:{left:e.left,top:e.top,bottom:e.bottom,right:e.right}}}))}else if("quickmix"===o){const e=t.getBoundingClientRect();this.dispatchEvent(new CustomEvent("quickmix",{bubbles:!0,composed:!0,detail:{anchorPosition:{left:e.left,top:e.top,bottom:e.bottom,right:e.right}}}))}else if("add-music"===o){const e=t.getBoundingClientRect();this.dispatchEvent(new CustomEvent("add-music",{bubbles:!0,composed:!0,detail:{anchorPosition:{left:e.left,top:e.top,bottom:e.bottom,right:e.right}}}))}else if("create-station"===o){const e=t.getBoundingClientRect();this.dispatchEvent(new CustomEvent("create-station",{bubbles:!0,composed:!0,detail:{anchorPosition:{left:e.left,top:e.top,bottom:e.bottom,right:e.right}}}))}else if("rename-station"===o){const e=t.getBoundingClientRect();this.dispatchEvent(new CustomEvent("rename-station",{bubbles:!0,composed:!0,detail:{anchorPosition:{left:e.left,top:e.top,bottom:e.bottom,right:e.right}}}))}else if("delete-station"===o){const e=t.getBoundingClientRect();this.dispatchEvent(new CustomEvent("delete-station",{bubbles:!0,composed:!0,detail:{anchorPosition:{left:e.left,top:e.top,bottom:e.bottom,right:e.right}}}))}else if("switch-account"===o){const e=t.getBoundingClientRect();this.dispatchEvent(new CustomEvent("switch-account",{bubbles:!0,composed:!0,detail:{anchorPosition:{left:e.left,top:e.top,bottom:e.bottom,right:e.right}}}))}this._menuOpen=!1,this._updatePortalContent()})})}render(){return V`
      <button
        class="trigger-button"
        @click=${this._toggleMenu}
        ?disabled=${this.disabled}
        title=${te(this.hass,"overflow.more_options")}
      >
        <ha-icon icon="mdi:dots-vertical"></ha-icon>
      </button>
    `}_formatBuildTime(t){const e=te(this.hass,"overflow.built_prefix");try{const o=new Date(t),n=o.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"});return`${e} ${n} ${o.toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit",hour12:!0})}`}catch{return`${e} ${t}`}}};ce.styles=a`
    :host {
      position: relative;
      display: inline-block;
    }

    .trigger-button {
      background: none;
      border: none;
      padding: 8px;
      cursor: pointer;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.2s;
      color: inherit;
    }

    .trigger-button:hover:not(:disabled) {
      background-color: rgba(128, 128, 128, 0.2);
    }

    .trigger-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .trigger-button ha-icon {
      --mdc-icon-size: 24px;
    }

    .menu-popup {
      position: fixed;
      background: var(--pmc-card-background);
      border-radius: 12px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
      padding: 4px;
      display: flex;
      flex-direction: column;
      gap: 2px;
      z-index: 99999;
      min-width: 180px;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.2s, visibility 0.2s;
    }

    .menu-popup.open {
      opacity: 1;
      visibility: visible;
    }

    .menu-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 16px;
      border: none;
      border-radius: 8px;
      background: transparent;
      color: var(--primary-text-color);
      cursor: pointer;
      transition: all 0.2s;
      text-align: left;
      font-size: 14px;
      width: 100%;
    }

    .menu-item:hover {
      background: var(--pmc-secondary-background);
    }

    .menu-item.destructive {
      color: #f44336;
    }

    .menu-item.destructive:hover {
      background: rgba(244, 67, 54, 0.1);
    }

    .menu-item ha-icon {
      --mdc-icon-size: 20px;
    }

    .backdrop {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 99998;
    }

    .build-time {
      padding: 8px 16px;
      font-size: 11px;
      color: var(--pmc-secondary-text-color);
      text-align: center;
      border-top: 1px solid var(--pmc-divider);
      margin-top: 4px;
      pointer-events: none;
      user-select: text;
    }
  `,t([ut({attribute:!1})],ce.prototype,"hass",void 0),t([ut({type:String})],ce.prototype,"entityId",void 0),t([ut({type:Boolean})],ce.prototype,"showStationOption",void 0),t([ut({type:Boolean})],ce.prototype,"showRatingsOption",void 0),t([ut({type:Boolean})],ce.prototype,"showExplainOption",void 0),t([ut({type:Boolean})],ce.prototype,"showUpcomingOption",void 0),t([ut({type:Boolean})],ce.prototype,"showStationModeOption",void 0),t([ut({type:Boolean})],ce.prototype,"showQuickMixOption",void 0),t([ut({type:Boolean})],ce.prototype,"showStationInfoOption",void 0),t([ut({type:Boolean})],ce.prototype,"showAddMusicOption",void 0),t([ut({type:Boolean})],ce.prototype,"showCreateStationOption",void 0),t([ut({type:Boolean})],ce.prototype,"showRenameOption",void 0),t([ut({type:Boolean})],ce.prototype,"showDeleteOption",void 0),t([ut({type:Boolean})],ce.prototype,"showAccountSwitch",void 0),t([ut({type:Boolean})],ce.prototype,"isOn",void 0),t([ut({type:Boolean})],ce.prototype,"disabled",void 0),t([ut({type:String})],ce.prototype,"buildTime",void 0),t([ut({type:Boolean})],ce.prototype,"usingSupportedActionsFallback",void 0),t([gt()],ce.prototype,"_menuOpen",void 0),t([gt()],ce.prototype,"_menuTop",void 0),t([gt()],ce.prototype,"_menuLeft",void 0),ce=t([lt("pmc-overflow-menu")],ce);let de=class extends se{constructor(){super(...arguments),this.songs=[]}static get styles(){return[se.baseStyles,a`
        .popup-container {
          padding: 8px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          min-width: 300px;
          max-width: 400px;
          max-height: calc(100vh - 100px);
          overflow-y: auto;
        }

        .popup-header {
          padding: 8px 12px;
          font-size: 16px;
          font-weight: 600;
          color: var(--primary-text-color);
          border-bottom: 1px solid var(--pmc-divider);
          margin-bottom: 4px;
        }

        .song-item {
          display: flex;
          gap: 12px;
          padding: 8px;
          border-radius: 8px;
          transition: background-color 0.2s;
        }

        .song-item:hover {
          background: var(--pmc-secondary-background);
        }

        .song-artwork {
          width: 48px;
          height: 48px;
          border-radius: 4px;
          object-fit: cover;
          flex-shrink: 0;
          background: var(--pmc-secondary-background);
        }

        .song-artwork-placeholder {
          width: 48px;
          height: 48px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--pmc-secondary-background);
          color: var(--secondary-text-color);
          flex-shrink: 0;
        }

        .song-artwork-placeholder ha-icon {
          --mdc-icon-size: 24px;
        }

        .song-info {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .song-title {
          font-size: 14px;
          font-weight: 500;
          color: var(--primary-text-color);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .song-artist {
          font-size: 12px;
          color: var(--secondary-text-color);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .song-station {
          font-size: 11px;
          color: var(--secondary-text-color);
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .song-station ha-icon {
          --mdc-icon-size: 12px;
        }

        .song-rating {
          display: flex;
          align-items: center;
          margin-top: 2px;
        }

        .song-rating ha-icon {
          --mdc-icon-size: 16px;
          color: var(--pmc-primary-color);
        }

        .no-songs {
          padding: 24px;
          text-align: center;
          color: var(--secondary-text-color);
          font-size: 14px;
        }
      `]}getPopupDimensions(){const t=64*this.songs.length+50,e=window.innerHeight-100;return{width:350,height:Math.min(t,e)}}getComponentStylesString(){return"\n      .pmc-popup-container {\n        padding: 8px;\n        display: flex;\n        flex-direction: column;\n        gap: 4px;\n        min-width: 300px;\n        max-width: 400px;\n        max-height: calc(100vh - 100px);\n        overflow-y: auto;\n      }\n\n      .popup-header {\n        padding: 8px 12px;\n        font-size: 16px;\n        font-weight: 600;\n        color: var(--primary-text-color);\n        border-bottom: 1px solid var(--divider-color, rgba(0, 0, 0, 0.1));\n        margin-bottom: 4px;\n      }\n\n      .song-item {\n        display: flex;\n        gap: 12px;\n        padding: 8px;\n        border-radius: 8px;\n        transition: background-color 0.2s;\n      }\n\n      .song-item:hover {\n        background: var(--secondary-background-color, rgba(0, 0, 0, 0.05));\n      }\n\n      .song-artwork {\n        width: 48px;\n        height: 48px;\n        border-radius: 4px;\n        object-fit: cover;\n        flex-shrink: 0;\n        background: var(--secondary-background-color, rgba(0, 0, 0, 0.05));\n      }\n\n      .song-artwork-placeholder {\n        width: 48px;\n        height: 48px;\n        border-radius: 4px;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        background: var(--secondary-background-color, rgba(0, 0, 0, 0.05));\n        color: var(--secondary-text-color);\n        flex-shrink: 0;\n      }\n\n      .song-artwork-placeholder ha-icon {\n        --mdc-icon-size: 24px;\n      }\n\n      .song-info {\n        flex: 1;\n        min-width: 0;\n        display: flex;\n        flex-direction: column;\n        gap: 2px;\n      }\n\n      .song-title {\n        font-size: 14px;\n        font-weight: 500;\n        color: var(--primary-text-color);\n        overflow: hidden;\n        text-overflow: ellipsis;\n        white-space: nowrap;\n      }\n\n      .song-artist {\n        font-size: 12px;\n        color: var(--secondary-text-color);\n        overflow: hidden;\n        text-overflow: ellipsis;\n        white-space: nowrap;\n      }\n\n      .song-station {\n        font-size: 11px;\n        color: var(--secondary-text-color);\n        display: flex;\n        align-items: center;\n        gap: 4px;\n      }\n\n      .song-station ha-icon {\n        --mdc-icon-size: 12px;\n      }\n\n      .song-rating {\n        display: flex;\n        align-items: center;\n        margin-top: 2px;\n      }\n\n      .song-rating ha-icon {\n        --mdc-icon-size: 16px;\n        color: var(--primary-color);\n      }\n\n      .no-songs {\n        padding: 24px;\n        text-align: center;\n        color: var(--secondary-text-color);\n        font-size: 14px;\n      }\n    "}renderPopupContent(){return V`
      <div class="popup-header">${te(this.hass,"upcoming.title")}</div>
      ${this.songs.length>0?this.songs.map(t=>this.renderSongItem(t)):V`<div class="no-songs">${te(this.hass,"upcoming.none")}</div>`}
    `}renderSongItem(t){return V`
      <div class="song-item">
        ${t.coverArt?V`<img class="song-artwork" src="${t.coverArt}" alt=${te(this.hass,"upcoming.artwork_alt")} />`:V`
              <div class="song-artwork-placeholder">
                <ha-icon icon="mdi:music"></ha-icon>
              </div>
            `}
        <div class="song-info">
          <div class="song-title">${t.title}</div>
          <div class="song-artist">${t.artist}</div>
          ${t.stationName?V`
                <div class="song-station">
                  <ha-icon icon="mdi:radio"></ha-icon>
                  <span>${t.stationName}</span>
                </div>
              `:H}
          ${1===t.rating?V`
                <div class="song-rating">
                  <ha-icon icon="mdi:thumb-up"></ha-icon>
                </div>
              `:H}
        </div>
      </div>
    `}};t([ut({type:Array})],de.prototype,"songs",void 0),de=t([lt("pmc-upcoming-songs-popup")],de);let le=class extends se{constructor(){super(...arguments),this.currentStationId="",this.currentStationName="",this.modes=[],this.loading=!1,this._selectedModeId=null}static get styles(){return[se.baseStyles,a`
    :host {
      position: relative;
      display: inline-block;
    }

    .menu-popup {
      position: fixed;
      background: var(--pmc-card-background);
      border-radius: 12px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
      padding: 8px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      z-index: 99999;
      min-width: 350px;
      max-width: 500px;
      max-height: calc(100vh - 100px);
      overflow-y: auto;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.2s, visibility 0.2s;
    }

    .menu-popup.open {
      opacity: 1;
      visibility: visible;
    }

    .popup-head {
      display: flex;
      flex-direction: column;
    }

    .popup-header {
      padding: 12px 16px 0;
      font-size: 16px;
      font-weight: 600;
      color: var(--primary-text-color);
    }

    .station-id-compact {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 10px;
      color: var(--secondary-text-color);
      line-height: 1.4;
      padding: 0 16px;
      margin-top: 8px;
      word-break: break-all;
    }

    .popup-head-separator {
      height: 1px;
      margin: 12px 0 8px;
      background: var(--pmc-divider);
      border: 0;
    }

    .info-note {
      padding: 12px;
      background: var(--pmc-secondary-background);
      border-radius: 8px;
      font-size: 13px;
      color: var(--secondary-text-color);
      line-height: 1.4;
      margin-bottom: 12px;
    }

    .modes-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-bottom: 12px;
    }

    .mode-item {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 12px;
      background: transparent;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s;
      user-select: none;
      border: 2px solid transparent;
    }

    .mode-item:hover {
      background: var(--pmc-secondary-background);
    }

    .mode-item.active {
      border-color: var(--pmc-primary-color);
      background: rgba(var(--pmc-primary-color-rgb, 118, 75, 162), 0.1);
    }

    .mode-item.selected {
      border-color: var(--pmc-primary-color);
    }

    .mode-header {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .mode-header input[type="radio"] {
      margin: 0;
      cursor: pointer;
    }

    .mode-name {
      font-size: 15px;
      font-weight: 500;
      color: var(--primary-text-color);
      flex: 1;
    }

    .mode-active-badge {
      padding: 4px 10px;
      background: var(--pmc-primary-color);
      color: white;
      border-radius: 12px;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
    }

    .mode-description {
      font-size: 13px;
      color: var(--secondary-text-color);
      line-height: 1.4;
      margin-left: 32px;
    }

    .popup-footer {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      padding-top: 8px;
      border-top: 1px solid var(--pmc-divider);
    }

    .popup-footer button {
      padding: 8px 16px;
      border: none;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
    }

    .popup-footer button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .button-cancel {
      background: transparent;
      color: var(--primary-text-color);
    }

    .button-cancel:hover:not(:disabled) {
      background: var(--pmc-secondary-background);
    }

    .button-confirm {
      background: var(--pmc-primary-color);
      color: white;
    }

    .button-confirm:hover:not(:disabled) {
      opacity: 0.9;
    }

    .loading {
      padding: 24px;
      text-align: center;
      color: var(--secondary-text-color);
      font-size: 14px;
    }

    .no-modes {
      padding: 24px;
      text-align: center;
        color: var(--secondary-text-color);
        font-size: 14px;
      }

      .backdrop {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 99998;
      }
    `]}getPopupDimensions(){const t=80*this.modes.length+150,e=window.innerHeight-100;return{width:400,height:Math.min(t,e)}}openPopup(){const t=this.modes.find(t=>t.active);t&&null===this._selectedModeId&&(this._selectedModeId=t.id),super.openPopup()}closePopup(){this._selectedModeId=null,super.closePopup()}updated(t){if(super.updated(t),t.has("modes")&&this.modes.length>0){const t=this.modes.find(t=>t.active);t&&null===this._selectedModeId&&(this._selectedModeId=t.id)}}getComponentStylesString(){return'\n      .pmc-popup-container {\n        min-width: 350px;\n        max-width: 500px;\n        max-height: calc(100vh - 100px);\n        overflow-y: auto;\n        padding: 8px;\n        display: flex;\n        flex-direction: column;\n        gap: 4px;\n      }\n\n      .popup-head {\n        display: flex;\n        flex-direction: column;\n      }\n\n      .popup-header {\n        padding: 12px 16px 0;\n        font-size: 16px;\n        font-weight: 600;\n        color: var(--primary-text-color);\n      }\n\n      .station-id-compact {\n        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;\n        font-size: 10px;\n        color: var(--secondary-text-color);\n        line-height: 1.4;\n        padding: 0 16px;\n        margin-top: 8px;\n        word-break: break-all;\n      }\n\n      .popup-head-separator {\n        height: 1px;\n        margin: 12px 0 8px;\n        background: var(--divider-color, rgba(0, 0, 0, 0.12));\n        border: 0;\n      }\n\n      .info-note {\n        padding: 12px;\n        background: var(--secondary-background-color, rgba(0, 0, 0, 0.05));\n        border-radius: 8px;\n        font-size: 13px;\n        color: var(--secondary-text-color);\n        line-height: 1.4;\n        margin-bottom: 12px;\n      }\n\n      .modes-list {\n        display: flex;\n        flex-direction: column;\n        gap: 8px;\n        margin-bottom: 12px;\n      }\n\n      .mode-item {\n        display: flex;\n        flex-direction: column;\n        gap: 8px;\n        padding: 12px;\n        background: transparent;\n        border-radius: 8px;\n        cursor: pointer;\n        transition: all 0.2s;\n        user-select: none;\n        border: 2px solid transparent;\n      }\n\n      .mode-item:hover {\n        background: var(--secondary-background-color, rgba(0, 0, 0, 0.05));\n      }\n\n      .mode-item.active {\n        border-color: var(--primary-color);\n        background: rgba(118, 75, 162, 0.1);\n      }\n\n      .mode-item.selected {\n        border-color: var(--primary-color);\n      }\n\n      .mode-header {\n        display: flex;\n        align-items: center;\n        gap: 12px;\n      }\n\n      .mode-header input[type="radio"] {\n        margin: 0;\n        cursor: pointer;\n      }\n\n      .mode-name {\n        font-size: 15px;\n        font-weight: 500;\n        color: var(--primary-text-color);\n        flex: 1;\n      }\n\n      .mode-active-badge {\n        padding: 4px 10px;\n        background: var(--primary-color);\n        color: white;\n        border-radius: 12px;\n        font-size: 11px;\n        font-weight: 600;\n        text-transform: uppercase;\n      }\n\n      .mode-description {\n        font-size: 13px;\n        color: var(--secondary-text-color);\n        line-height: 1.4;\n        margin-left: 32px;\n      }\n\n      .popup-footer {\n        display: flex;\n        justify-content: flex-end;\n        gap: 8px;\n        padding-top: 8px;\n        border-top: 1px solid var(--divider-color, rgba(0, 0, 0, 0.1));\n      }\n\n      .popup-footer button {\n        padding: 8px 16px;\n        border: none;\n        border-radius: 8px;\n        font-size: 14px;\n        font-weight: 500;\n        cursor: pointer;\n        transition: all 0.2s;\n      }\n\n      .popup-footer button:disabled {\n        opacity: 0.5;\n        cursor: not-allowed;\n      }\n\n      .button-cancel {\n        background: transparent;\n        color: var(--primary-text-color);\n      }\n\n      .button-cancel:hover:not(:disabled) {\n        background: var(--secondary-background-color, rgba(0, 0, 0, 0.05));\n      }\n\n      .button-confirm {\n        background: var(--primary-color);\n        color: white;\n      }\n\n      .button-confirm:hover:not(:disabled) {\n        opacity: 0.9;\n      }\n\n      .loading {\n        padding: 24px;\n        text-align: center;\n        color: var(--secondary-text-color);\n        font-size: 14px;\n      }\n\n      .no-modes {\n        padding: 24px;\n        text-align: center;\n        color: var(--secondary-text-color);\n        font-size: 14px;\n      }\n    '}_handleModeSelect(t){this._selectedModeId=t}_handleSetMode(){this.currentStationId&&null!==this._selectedModeId&&(this.dispatchEvent(new CustomEvent("set-mode",{bubbles:!0,composed:!0,detail:{stationId:this.currentStationId,modeId:this._selectedModeId}})),this.closePopup())}renderPopupContent(){return V`
      <div class="popup-head">
        <div class="popup-header">
          ${this.currentStationName?ee(this.hass,"station_mode.title_named",{name:this.currentStationName}):te(this.hass,"station_mode.title")}
        </div>
        ${this.currentStationId?V`<div class="station-id-compact" title=${te(this.hass,"station_mode.station_id")}>${this.currentStationId}</div>`:H}
        <div class="popup-head-separator" role="presentation"></div>
      </div>

      ${this.loading?V`<div class="loading">${te(this.hass,"station_mode.loading")}</div>`:0===this.modes.length?V`<div class="no-modes">${te(this.hass,"station_mode.no_modes")}</div>`:V`
              <div class="info-note">
                ${te(this.hass,"station_mode.note")}
              </div>

              <div class="modes-list">
                ${this.modes.map(t=>V`
                  <div 
                    class="mode-item ${t.active?"active":""} ${this._selectedModeId===t.id?"selected":""}"
                    @click=${()=>this._handleModeSelect(t.id)}
                  >
                    <div class="mode-header">
                      <input
                        type="radio"
                        name="mode-select"
                        .value=${t.id}
                        .checked=${this._selectedModeId===t.id}
                        @change=${()=>this._handleModeSelect(t.id)}
                      >
                      <span class="mode-name">${t.name}</span>
                      ${t.active?V`<span class="mode-active-badge">${te(this.hass,"station_mode.active")}</span>`:H}
                    </div>
                    <div class="mode-description">${t.description}</div>
                  </div>
                `)}
              </div>

              <div class="popup-footer">
                <button class="button-cancel" @click=${()=>this.closePopup()}>
                  ${te(this.hass,"station_mode.cancel")}
                </button>
                <button 
                  class="button-confirm"
                  ?disabled=${null===this._selectedModeId}
                  @click=${()=>this._handleSetMode()}
                >
                  ${te(this.hass,"station_mode.set_mode")}
                </button>
              </div>
            `}
    `}};t([ut({type:String})],le.prototype,"currentStationId",void 0),t([ut({type:String})],le.prototype,"currentStationName",void 0),t([ut({type:Array})],le.prototype,"modes",void 0),t([ut({type:Boolean})],le.prototype,"loading",void 0),t([gt()],le.prototype,"_selectedModeId",void 0),le=t([lt("pmc-station-mode-popup")],le);let he=class extends se{constructor(){super(...arguments),this.stations=[],this.selectedStationIds=new Set}static get styles(){return[se.baseStyles,a`
        .popup-container {
          padding: 8px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          min-width: 280px;
          max-width: 350px;
          max-height: calc(100vh - 100px);
          overflow-y: auto;
          transform: translateX(-50%);
        }

        .header {
          padding: 12px 8px 8px;
          font-weight: 600;
          font-size: 16px;
          color: var(--primary-text-color);
          border-bottom: 1px solid var(--pmc-divider);
        }

        .list-container {
          display: flex;
          flex-direction: column;
          gap: 2px;
          padding: 4px 0;
        }

        .list-item {
          display: flex;
          align-items: center;
          padding: 10px 12px;
          border-radius: 8px;
          background: transparent;
          transition: background 0.2s;
          cursor: pointer;
        }

        .list-item:hover:not(.disabled) {
          background: var(--pmc-secondary-background);
        }

        .list-item.disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .list-item label {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          cursor: pointer;
        }

        .list-item.disabled label {
          cursor: not-allowed;
        }

        .list-item input[type="checkbox"] {
          width: 20px;
          height: 20px;
          cursor: pointer;
          margin: 0;
          flex-shrink: 0;
        }

        .list-item.disabled input[type="checkbox"] {
          cursor: not-allowed;
        }

        .item-name {
          flex: 1;
          font-size: 14px;
          color: var(--primary-text-color);
        }

        .footer {
          display: flex;
          gap: 8px;
          padding: 8px;
          border-top: 1px solid var(--pmc-divider);
          justify-content: flex-end;
        }

        .footer button {
          padding: 8px 16px;
          border-radius: 8px;
          border: none;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .footer button.cancel {
          background: transparent;
          color: var(--primary-text-color);
        }

        .footer button.cancel:hover {
          background: var(--pmc-secondary-background);
        }

        .footer button.save {
          background: var(--primary-color);
          color: var(--text-primary-color);
        }

        .footer button.save:hover {
          opacity: 0.9;
        }

        .footer button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .no-stations {
          padding: 16px;
          text-align: center;
          color: var(--secondary-text-color);
        }
      `]}openPopup(){this.initializeSelection(),super.openPopup()}getPopupDimensions(){const t=this.stations.filter(t=>!t.isQuickMix).length,e=50*t+120,o=window.innerHeight-100;return{width:315,height:Math.min(e,o)}}getComponentStylesString(){return'\n      .pmc-popup-container {\n        padding: 8px;\n        display: flex;\n        flex-direction: column;\n        gap: 4px;\n        min-width: 280px;\n        max-width: 350px;\n        max-height: calc(100vh - 100px);\n        overflow-y: auto;\n        transform: translateX(-50%);\n      }\n\n      .header {\n        padding: 12px 8px 8px;\n        font-weight: 600;\n        font-size: 16px;\n        color: var(--primary-text-color);\n        border-bottom: 1px solid var(--divider-color, rgba(0, 0, 0, 0.1));\n      }\n\n      .list-container {\n        display: flex;\n        flex-direction: column;\n        gap: 2px;\n        padding: 4px 0;\n      }\n\n      .list-item {\n        display: flex;\n        align-items: center;\n        padding: 10px 12px;\n        border-radius: 8px;\n        background: transparent;\n        transition: background 0.2s;\n        cursor: pointer;\n      }\n\n      .list-item:hover:not(.disabled) {\n        background: var(--secondary-background-color, rgba(0, 0, 0, 0.05));\n      }\n\n      .list-item.disabled {\n        opacity: 0.6;\n        cursor: not-allowed;\n      }\n\n      .list-item label {\n        display: flex;\n        align-items: center;\n        gap: 12px;\n        width: 100%;\n        cursor: pointer;\n      }\n\n      .list-item.disabled label {\n        cursor: not-allowed;\n      }\n\n      .list-item input[type="checkbox"] {\n        width: 20px;\n        height: 20px;\n        cursor: pointer;\n        margin: 0;\n        flex-shrink: 0;\n      }\n\n      .list-item.disabled input[type="checkbox"] {\n        cursor: not-allowed;\n      }\n\n      .item-name {\n        flex: 1;\n        font-size: 14px;\n        color: var(--primary-text-color);\n      }\n\n      .footer {\n        display: flex;\n        gap: 8px;\n        padding: 8px;\n        border-top: 1px solid var(--divider-color, rgba(0, 0, 0, 0.1));\n        justify-content: flex-end;\n      }\n\n      .footer button {\n        padding: 8px 16px;\n        border-radius: 8px;\n        border: none;\n        font-size: 14px;\n        font-weight: 500;\n        cursor: pointer;\n        transition: all 0.2s;\n      }\n\n      .footer button.cancel {\n        background: transparent;\n        color: var(--primary-text-color);\n      }\n\n      .footer button.cancel:hover {\n        background: var(--secondary-background-color, rgba(0, 0, 0, 0.05));\n      }\n\n      .footer button.save {\n        background: var(--primary-color);\n        color: var(--text-primary-color, #fff);\n      }\n\n      .footer button.save:hover {\n        opacity: 0.9;\n      }\n\n      .footer button:disabled {\n        opacity: 0.6;\n        cursor: not-allowed;\n      }\n\n      .no-stations {\n        padding: 16px;\n        text-align: center;\n        color: var(--secondary-text-color);\n      }\n    '}initializeSelection(){this.selectedStationIds=new Set(this.stations.filter(t=>t.isQuickMixed&&!t.isQuickMix).map(t=>t.id))}handleCheckboxChange(t,e){e?this.selectedStationIds.add(t):this.selectedStationIds.delete(t),this.requestUpdate()}handleSave(){const t=Array.from(this.selectedStationIds);this.dispatchEvent(new CustomEvent("save",{bubbles:!0,composed:!0,detail:{stationIds:t}})),this.closePopup()}handleCancel(){this.closePopup()}renderPopupContent(){const t=this.stations.filter(t=>!t.isQuickMix);return V`
      <div class="header">${te(this.hass,"quickmix.title")}</div>
      
      ${0===t.length?V`<div class="no-stations">${te(this.hass,"quickmix.no_stations")}</div>`:V`
            <div class="list-container">
              ${t.map(t=>V`
                  <div class="list-item ${this.disabled?"disabled":""}">
                    <label>
                      <input
                        type="checkbox"
                        .checked=${this.selectedStationIds.has(t.id)}
                        ?disabled=${this.disabled}
                        @change=${e=>this.handleCheckboxChange(t.id,e.target.checked)}
                      />
                      <span class="item-name">${t.name}</span>
                    </label>
                  </div>
                `)}
            </div>
            
            <div class="footer">
              <button class="cancel" @click=${()=>this.handleCancel()} ?disabled=${this.disabled}>
                ${te(this.hass,"common.cancel")}
              </button>
              <button class="save" @click=${()=>this.handleSave()} ?disabled=${this.disabled}>
                ${te(this.hass,"quickmix.save")}
              </button>
            </div>
          `}
    `}};t([ut({type:Array})],he.prototype,"stations",void 0),t([gt()],he.prototype,"selectedStationIds",void 0),he=t([lt("pmc-quickmix-popup")],he);class pe extends se{calculatePosition(t){return{left:window.innerWidth/2,top:window.innerHeight/2}}getPopupStyles(){return{left:`${this.left}px`,top:`${this.top}px`,transform:"translate(-50%, -50%)"}}updatePosition(){const t=this.getPopupDimensions(),e=this.calculatePosition(t);this.left=e.left,this.top=e.top}openPopup(){this.disabled||(this.updatePosition(),this._createPortal(),this.isOpen=!0,this._updatePortalContent())}}let ue=class extends pe{constructor(){super(...arguments),this.stations=[],this._stage="select-station",this._selectedStationId=null,this._selectedStationName="",this._newName=""}static get styles(){return[a`
        :host {
          position: relative;
          display: inline-block;
        }
      `]}getComponentStylesString(){return'\n      .pmc-popup-container {\n        padding: 0;\n        display: flex;\n        flex-direction: column;\n        min-width: 320px;\n        max-width: 450px;\n        max-height: calc(100vh - 100px);\n      }\n\n      .dialog-header {\n        padding: 16px 20px;\n        font-weight: 600;\n        font-size: 18px;\n        color: var(--primary-text-color);\n        border-bottom: 1px solid var(--pmc-divider);\n      }\n\n      .dialog-body {\n        padding: 20px;\n        overflow-y: auto;\n        flex: 1;\n        min-height: 0;\n      }\n\n      .station-list {\n        display: flex;\n        flex-direction: column;\n        gap: 8px;\n      }\n\n      .station-item {\n        display: flex;\n        align-items: center;\n        padding: 12px;\n        border-radius: 8px;\n        background: transparent;\n        transition: background 0.2s;\n        cursor: pointer;\n      }\n\n      .station-item:hover:not(.disabled) {\n        background: var(--pmc-secondary-background);\n      }\n\n      .station-item.disabled {\n        opacity: 0.6;\n        cursor: not-allowed;\n      }\n\n      .station-item label {\n        display: flex;\n        align-items: center;\n        gap: 12px;\n        width: 100%;\n        cursor: pointer;\n      }\n\n      .station-item.disabled label {\n        cursor: not-allowed;\n      }\n\n      .station-item input[type="radio"] {\n        width: 20px;\n        height: 20px;\n        cursor: pointer;\n        margin: 0;\n        flex-shrink: 0;\n      }\n\n      .station-item.disabled input[type="radio"] {\n        cursor: not-allowed;\n      }\n\n      .station-name {\n        flex: 1;\n        font-size: 14px;\n        color: var(--primary-text-color);\n      }\n\n      .name-input-section {\n        display: flex;\n        flex-direction: column;\n        gap: 16px;\n      }\n\n      .current-station {\n        font-size: 14px;\n        color: var(--secondary-text-color);\n      }\n\n      .current-station strong {\n        color: var(--primary-text-color);\n      }\n\n      .name-input {\n        width: 100%;\n        padding: 12px 16px;\n        border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));\n        border-radius: 8px;\n        background: var(--secondary-background-color, rgba(128, 128, 128, 0.1));\n        color: var(--primary-text-color);\n        font-size: 16px;\n        font-family: inherit;\n        box-sizing: border-box;\n      }\n\n      .name-input:focus {\n        outline: none;\n        border-color: var(--primary-color);\n      }\n\n      .info-note {\n        padding: 12px;\n        background: var(--pmc-secondary-background);\n        border-radius: 8px;\n        font-size: 13px;\n        color: var(--secondary-text-color);\n        line-height: 1.4;\n      }\n\n      .dialog-footer {\n        display: flex;\n        gap: 8px;\n        padding: 16px 20px;\n        border-top: 1px solid var(--pmc-divider);\n        justify-content: flex-end;\n      }\n\n      .dialog-footer button {\n        padding: 8px 16px;\n        border-radius: 8px;\n        border: none;\n        font-size: 14px;\n        font-weight: 500;\n        cursor: pointer;\n        transition: all 0.2s;\n      }\n\n      .dialog-footer button.back {\n        margin-right: auto;\n        background: transparent;\n        color: var(--primary-text-color);\n      }\n\n      .dialog-footer button.back:hover {\n        background: var(--pmc-secondary-background);\n      }\n\n      .dialog-footer button.cancel {\n        background: transparent;\n        color: var(--primary-text-color);\n      }\n\n      .dialog-footer button.cancel:hover {\n        background: var(--pmc-secondary-background);\n      }\n\n      .dialog-footer button.confirm {\n        background: var(--primary-color);\n        color: var(--text-primary-color);\n      }\n\n      .dialog-footer button.confirm:hover {\n        opacity: 0.9;\n      }\n\n      .dialog-footer button:disabled {\n        opacity: 0.6;\n        cursor: not-allowed;\n      }\n\n      .no-stations {\n        padding: 16px;\n        text-align: center;\n        color: var(--secondary-text-color);\n      }\n    '}getPopupDimensions(){return{width:Math.min(450,.9*window.innerWidth),height:Math.min(window.innerHeight-100,600)}}closePopup(){this._stage="select-station",this._selectedStationId=null,this._selectedStationName="",this._newName="",super.closePopup()}_handleStationSelect(t,e){this._selectedStationId=t,this._selectedStationName=e,this.requestUpdate()}_handleNext(){this._selectedStationId&&(this._stage="enter-name",this._newName=this._selectedStationName,this.requestUpdate())}_handleBack(){this._stage="select-station",this._newName="",this.requestUpdate()}_handleRename(){this._selectedStationId&&this._newName.trim()&&this._newName!==this._selectedStationName&&(this.dispatchEvent(new CustomEvent("rename-station",{bubbles:!0,composed:!0,detail:{stationId:this._selectedStationId,newName:this._newName.trim()}})),this.closePopup())}_handleCancel(){this.closePopup()}_renderSelectStation(){const t=this.stations.filter(t=>!t.isQuickMix);return V`
      <div class="dialog-header">${te(this.hass,"rename.title")}</div>
      <div class="dialog-body">
        ${0===t.length?V`<div class="no-stations">${te(this.hass,"rename.no_stations")}</div>`:V`
              <div class="station-list">
                ${t.map(t=>V`
                    <div class="station-item ${this.disabled?"disabled":""}">
                      <label>
                        <input
                          type="radio"
                          name="station-select"
                          .value=${t.id}
                          .checked=${this._selectedStationId===t.id}
                          ?disabled=${this.disabled}
                          @change=${()=>this._handleStationSelect(t.id,t.name)}
                        />
                        <span class="station-name">${t.name}</span>
                      </label>
                    </div>
                  `)}
              </div>
            `}
      </div>
      <div class="dialog-footer">
        <button class="cancel" @click=${()=>this._handleCancel()} ?disabled=${this.disabled}>
          ${te(this.hass,"rename.cancel")}
        </button>
        <button class="confirm" @click=${()=>this._handleNext()} ?disabled=${!this._selectedStationId||this.disabled}>
          ${te(this.hass,"rename.next")}
        </button>
      </div>
    `}_renderEnterName(){const t=this._newName.trim()&&this._newName!==this._selectedStationName;return V`
      <div class="dialog-header">${ee(this.hass,"rename.title_named",{name:this._selectedStationName})}</div>
      <div class="dialog-body">
        <div class="name-input-section">
          <div class="current-station">
            ${te(this.hass,"rename.current_name")} <strong>${this._selectedStationName}</strong>
          </div>
          
          <input
            type="text"
            class="name-input"
            id="rename-input"
            placeholder=${te(this.hass,"rename.placeholder_new_name")}
            .value=${this._newName}
            ?disabled=${this.disabled}
            @input=${t=>{const e=t.target,o=e.selectionStart;this._newName=e.value,this.requestUpdate(),this.updateComplete.then(()=>{const t=document.querySelector(".pmc-popup-container #rename-input");t&&(t.focus(),null!==o&&t.setSelectionRange(o,o))})}}
            @keydown=${e=>{"Enter"===e.key&&t&&!this.disabled&&this._handleRename()}}
            autofocus
          />
          
          <div class="info-note">
            ${te(this.hass,"rename.note_pandora")}
          </div>
        </div>
      </div>
      <div class="dialog-footer">
        <button class="back" @click=${()=>this._handleBack()} ?disabled=${this.disabled}>
          ${te(this.hass,"common.back")}
        </button>
        <button class="cancel" @click=${()=>this._handleCancel()} ?disabled=${this.disabled}>
          ${te(this.hass,"rename.cancel")}
        </button>
        <button class="confirm" @click=${()=>this._handleRename()} ?disabled=${!t||this.disabled}>
          ${te(this.hass,"rename.rename")}
        </button>
      </div>
    `}renderPopupContent(){return"select-station"===this._stage?this._renderSelectStation():this._renderEnterName()}};t([ut({type:Array})],ue.prototype,"stations",void 0),t([gt()],ue.prototype,"_stage",void 0),t([gt()],ue.prototype,"_selectedStationId",void 0),t([gt()],ue.prototype,"_selectedStationName",void 0),t([gt()],ue.prototype,"_newName",void 0),ue=t([lt("pmc-rename-dialog")],ue);let ge=class extends pe{constructor(){super(...arguments),this.stations=[],this._selectedStationId=null,this._selectedStationName=""}static get styles(){return[a`
        :host {
          position: relative;
          display: inline-block;
        }
      `]}getComponentStylesString(){return'\n      .pmc-popup-container {\n        padding: 0;\n        display: flex;\n        flex-direction: column;\n        min-width: 320px;\n        max-width: 450px;\n        max-height: calc(100vh - 100px);\n      }\n\n      .dialog-header {\n        padding: 16px 20px;\n        font-weight: 600;\n        font-size: 18px;\n        color: var(--primary-text-color);\n        border-bottom: 1px solid var(--pmc-divider);\n      }\n\n      .dialog-body {\n        padding: 20px;\n        overflow-y: auto;\n        flex: 1;\n        min-height: 0;\n      }\n\n      .station-list {\n        display: flex;\n        flex-direction: column;\n        gap: 8px;\n      }\n\n      .station-item {\n        display: flex;\n        align-items: center;\n        padding: 12px;\n        border-radius: 8px;\n        background: transparent;\n        transition: background 0.2s;\n        cursor: pointer;\n      }\n\n      .station-item:hover:not(.disabled) {\n        background: var(--pmc-secondary-background);\n      }\n\n      .station-item.disabled {\n        opacity: 0.6;\n        cursor: not-allowed;\n      }\n\n      .station-item label {\n        display: flex;\n        align-items: center;\n        gap: 12px;\n        width: 100%;\n        cursor: pointer;\n      }\n\n      .station-item.disabled label {\n        cursor: not-allowed;\n      }\n\n      .station-item input[type="radio"] {\n        width: 20px;\n        height: 20px;\n        cursor: pointer;\n        margin: 0;\n        flex-shrink: 0;\n      }\n\n      .station-item.disabled input[type="radio"] {\n        cursor: not-allowed;\n      }\n\n      .station-name {\n        flex: 1;\n        font-size: 14px;\n        color: var(--primary-text-color);\n      }\n\n      .warning-message {\n        padding: 16px;\n        background: rgba(244, 67, 54, 0.1);\n        border-left: 4px solid #f44336;\n        border-radius: 4px;\n        margin-bottom: 16px;\n      }\n\n      .warning-message p {\n        margin: 0;\n        font-size: 14px;\n        color: var(--primary-text-color);\n        line-height: 1.4;\n      }\n\n      .warning-message strong {\n        color: #f44336;\n      }\n\n      .dialog-footer {\n        display: flex;\n        gap: 8px;\n        padding: 16px 20px;\n        border-top: 1px solid var(--pmc-divider);\n        justify-content: flex-end;\n      }\n\n      .dialog-footer button {\n        padding: 8px 16px;\n        border-radius: 8px;\n        border: none;\n        font-size: 14px;\n        font-weight: 500;\n        cursor: pointer;\n        transition: all 0.2s;\n      }\n\n      .dialog-footer button.cancel {\n        background: transparent;\n        color: var(--primary-text-color);\n      }\n\n      .dialog-footer button.cancel:hover {\n        background: var(--pmc-secondary-background);\n      }\n\n      .dialog-footer button.delete {\n        background: #f44336;\n        color: #fff;\n      }\n\n      .dialog-footer button.delete:hover {\n        background: #d32f2f;\n      }\n\n      .dialog-footer button:disabled {\n        opacity: 0.6;\n        cursor: not-allowed;\n      }\n\n      .no-stations {\n        padding: 16px;\n        text-align: center;\n        color: var(--secondary-text-color);\n      }\n    '}getPopupDimensions(){return{width:Math.min(450,.9*window.innerWidth),height:Math.min(window.innerHeight-100,600)}}closePopup(){this._selectedStationId=null,this._selectedStationName="",super.closePopup()}_handleStationSelect(t,e){this._selectedStationId=t,this._selectedStationName=e,this.requestUpdate()}_handleDelete(){this._selectedStationId&&this._selectedStationName&&(this.dispatchEvent(new CustomEvent("delete-station",{bubbles:!0,composed:!0,detail:{stationId:this._selectedStationId,stationName:this._selectedStationName}})),this.closePopup())}_handleCancel(){this.closePopup()}renderPopupContent(){const t=this.stations.filter(t=>!t.isQuickMix);return V`
      <div class="dialog-header">${te(this.hass,"delete.title")}</div>
      <div class="dialog-body">
        <div class="warning-message">
          <p>
            <strong>${te(this.hass,"delete.warning")}</strong> ${te(this.hass,"delete.confirm_text")}
            ${te(this.hass,"delete.cannot_undo")}
          </p>
        </div>
        
        ${0===t.length?V`<div class="no-stations">${te(this.hass,"delete.no_stations")}</div>`:V`
              <div class="station-list">
                ${t.map(t=>V`
                    <div class="station-item ${this.disabled?"disabled":""}">
                      <label>
                        <input
                          type="radio"
                          name="station-select"
                          .value=${t.id}
                          .checked=${this._selectedStationId===t.id}
                          ?disabled=${this.disabled}
                          @change=${()=>this._handleStationSelect(t.id,t.name)}
                        />
                        <span class="station-name">${t.name}</span>
                      </label>
                    </div>
                  `)}
              </div>
            `}
      </div>
      <div class="dialog-footer">
        <button class="cancel" @click=${()=>this._handleCancel()} ?disabled=${this.disabled}>
          ${te(this.hass,"delete.cancel")}
        </button>
        <button class="delete" @click=${()=>this._handleDelete()} ?disabled=${!this._selectedStationId||this.disabled}>
          ${te(this.hass,"delete.delete_station_button")}
        </button>
      </div>
    `}};t([ut({type:Array})],ge.prototype,"stations",void 0),t([gt()],ge.prototype,"_selectedStationId",void 0),t([gt()],ge.prototype,"_selectedStationName",void 0),ge=t([lt("pmc-delete-dialog")],ge);let me=class extends pe{constructor(){super(...arguments),this.currentStationId="",this.currentStationName="",this.stationInfo=null,this.infoLoading=!1,this._expandedSections=new Set(["artistSeeds","songSeeds","stationSeeds","feedback"])}static get styles(){return[a`
        :host {
          position: relative;
          display: inline-block;
        }
      `]}getComponentStylesString(){return"\n      .pmc-popup-container {\n        padding: 0;\n        display: flex;\n        flex-direction: column;\n        width: 90vw;\n        max-width: 650px;\n        max-height: 80vh;\n      }\n\n      .dialog-header {\n        padding: 16px 20px;\n        font-weight: 600;\n        font-size: 18px;\n        color: var(--primary-text-color);\n        border-bottom: 1px solid var(--pmc-divider);\n      }\n\n      .dialog-body {\n        padding: 12px;\n        overflow-y: auto;\n        flex: 1;\n      }\n\n      .seeds-container {\n        display: flex;\n        flex-direction: column;\n        gap: 8px;\n      }\n\n      .section {\n        border-radius: 8px;\n        overflow: hidden;\n      }\n\n      .section-header {\n        display: flex;\n        align-items: center;\n        padding: 12px;\n        cursor: pointer;\n        background: var(--pmc-secondary-background);\n        transition: background 0.2s;\n        user-select: none;\n      }\n\n      .section-header:hover {\n        background: rgba(128, 128, 128, 0.15);\n      }\n\n      .chevron {\n        margin-right: 8px;\n        transition: transform 0.2s;\n        font-size: 20px;\n        color: var(--secondary-text-color);\n      }\n\n      .chevron.expanded {\n        transform: rotate(90deg);\n      }\n\n      .section-title {\n        font-size: 15px;\n        font-weight: 500;\n        color: var(--primary-text-color);\n        flex: 1;\n      }\n\n      .section-count {\n        font-size: 13px;\n        color: var(--secondary-text-color);\n        margin-left: 8px;\n      }\n\n      .section-content {\n        padding: 8px;\n        display: flex;\n        flex-direction: column;\n        gap: 4px;\n      }\n\n      .seed-item, .feedback-item {\n        display: flex;\n        align-items: center;\n        gap: 12px;\n        padding: 10px 12px;\n        background: var(--pmc-secondary-background);\n        border-radius: 6px;\n      }\n\n      .seed-info {\n        flex: 1;\n        min-width: 0;\n      }\n\n      .seed-name, .feedback-title {\n        font-size: 14px;\n        color: var(--primary-text-color);\n        font-weight: 500;\n        white-space: nowrap;\n        overflow: hidden;\n        text-overflow: ellipsis;\n      }\n\n      .seed-artist, .feedback-artist {\n        font-size: 12px;\n        color: var(--secondary-text-color);\n        white-space: nowrap;\n        overflow: hidden;\n        text-overflow: ellipsis;\n      }\n\n      .feedback-icon {\n        font-size: 20px;\n        margin-right: 4px;\n      }\n\n      .feedback-icon.loved {\n        color: #4CAF50;\n      }\n\n      .feedback-icon.banned {\n        color: #F44336;\n      }\n\n      .delete-button {\n        padding: 6px 12px;\n        border: none;\n        border-radius: 6px;\n        background: rgba(244, 67, 54, 0.1);\n        color: #f44336;\n        cursor: pointer;\n        font-size: 12px;\n        font-weight: 500;\n        transition: all 0.2s;\n      }\n\n      .delete-button:hover:not(:disabled) {\n        background: #f44336;\n        color: #fff;\n      }\n\n      .delete-button:disabled {\n        opacity: 0.6;\n        cursor: not-allowed;\n      }\n\n      .no-items {\n        padding: 32px;\n        text-align: center;\n        color: var(--secondary-text-color);\n        font-size: 14px;\n      }\n\n      .loading {\n        padding: 32px;\n        text-align: center;\n        color: var(--secondary-text-color);\n      }\n\n      .dialog-footer {\n        display: flex;\n        gap: 8px;\n        padding: 16px 20px;\n        border-top: 1px solid var(--pmc-divider);\n        justify-content: flex-end;\n      }\n\n      .dialog-footer button {\n        padding: 8px 16px;\n        border-radius: 8px;\n        border: none;\n        font-size: 14px;\n        font-weight: 500;\n        cursor: pointer;\n        transition: all 0.2s;\n      }\n\n      .dialog-footer button.close {\n        background: var(--primary-color);\n        color: var(--text-primary-color);\n      }\n\n      .dialog-footer button.close:hover {\n        opacity: 0.9;\n      }\n    "}getPopupDimensions(){return{width:Math.min(650,.9*window.innerWidth),height:Math.min(.8*window.innerHeight,800)}}closePopup(){this._expandedSections=new Set(["artistSeeds","songSeeds","stationSeeds","feedback"]),super.closePopup()}_toggleSection(t){const e=new Set(this._expandedSections);e.has(t)?e.delete(t):e.add(t),this._expandedSections=e}_handleDeleteSeed(t,e){this.dispatchEvent(new CustomEvent("delete-seed",{bubbles:!0,composed:!0,detail:{seedId:t,seedType:e,stationId:this.currentStationId}}))}_handleDeleteFeedback(t){this.dispatchEvent(new CustomEvent("delete-feedback",{bubbles:!0,composed:!0,detail:{feedbackId:t,stationId:this.currentStationId}}))}_handleClose(){this.closePopup()}_renderSection(t,e,o,n){const i=this._expandedSections.has(t);return V`
      <div class="section">
        <div class="section-header" @click=${()=>this._toggleSection(t)}>
          <span class="chevron ${i?"expanded":""}">▶</span>
          <span class="section-title">${e}</span>
          <span class="section-count">(${o.length})</span>
        </div>
        ${i&&o.length>0?V`<div class="section-content">${o.map(n)}</div>`:H}
      </div>
    `}renderPopupContent(){const t=this.stationInfo&&(this.stationInfo.artistSeeds.length>0||this.stationInfo.songSeeds.length>0||this.stationInfo.stationSeeds.length>0||this.stationInfo.feedback.length>0);return V`
      <div class="dialog-header">${ee(this.hass,"station_info.seeds_header",{name:this.currentStationName})}</div>
      <div class="dialog-body">
        ${this.infoLoading?V`<div class="loading">${te(this.hass,"station_info.loading")}</div>`:t?V`
                <div class="seeds-container">
                  ${this._renderSection("artistSeeds",te(this.hass,"station_info.section_artist_seeds"),this.stationInfo?.artistSeeds||[],t=>V`
                      <div class="seed-item">
                        <div class="seed-info">
                          <div class="seed-name">${t.name}</div>
                        </div>
                        <button
                          class="delete-button"
                          ?disabled=${this.disabled}
                          @click=${()=>this._handleDeleteSeed(t.seedId,"artist")}
                        >
                          ${te(this.hass,"station_info.delete")}
                        </button>
                      </div>
                    `)}
                  
                  ${this._renderSection("songSeeds",te(this.hass,"station_info.section_song_seeds"),this.stationInfo?.songSeeds||[],t=>V`
                      <div class="seed-item">
                        <div class="seed-info">
                          <div class="seed-name">${t.title}</div>
                          <div class="seed-artist">${t.artist}</div>
                        </div>
                        <button
                          class="delete-button"
                          ?disabled=${this.disabled}
                          @click=${()=>this._handleDeleteSeed(t.seedId,"song")}
                        >
                          ${te(this.hass,"station_info.delete")}
                        </button>
                      </div>
                    `)}
                  
                  ${this._renderSection("stationSeeds",te(this.hass,"station_info.section_station_seeds"),this.stationInfo?.stationSeeds||[],t=>V`
                      <div class="seed-item">
                        <div class="seed-info">
                          <div class="seed-name">${t.name}</div>
                        </div>
                        <button
                          class="delete-button"
                          ?disabled=${this.disabled}
                          @click=${()=>this._handleDeleteSeed(t.seedId,"station")}
                        >
                          ${te(this.hass,"station_info.delete")}
                        </button>
                      </div>
                    `)}
                  
                  ${this._renderSection("feedback",te(this.hass,"station_info.section_feedback"),this.stationInfo?.feedback||[],t=>V`
                      <div class="feedback-item">
                        <span class="feedback-icon ${1===t.rating?"loved":"banned"}">
                          ${1===t.rating?"❤️":"🚫"}
                        </span>
                        <div class="seed-info">
                          <div class="feedback-title">${t.title}</div>
                          <div class="feedback-artist">${t.artist}</div>
                        </div>
                        <button
                          class="delete-button"
                          ?disabled=${this.disabled}
                          @click=${()=>this._handleDeleteFeedback(t.feedbackId)}
                        >
                          ${te(this.hass,"station_info.delete")}
                        </button>
                      </div>
                    `)}
                </div>
              `:V`<div class="no-items">${te(this.hass,"station_info.none")}</div>`}
      </div>
      <div class="dialog-footer">
        <button class="close" @click=${()=>this._handleClose()}>${te(this.hass,"station_info.close")}</button>
      </div>
    `}};t([ut({type:String})],me.prototype,"currentStationId",void 0),t([ut({type:String})],me.prototype,"currentStationName",void 0),t([ut({type:Object})],me.prototype,"stationInfo",void 0),t([ut({type:Boolean})],me.prototype,"infoLoading",void 0),t([gt()],me.prototype,"_expandedSections",void 0),me=t([lt("pmc-station-info-popup")],me);let be=class extends pe{constructor(){super(...arguments),this.stations=[],this.searchLoading=!1,this.searchResults={categories:[]},this._stage="select-station",this._selectedStationId=null,this._selectedStationName="",this._searchQuery="",this._expandedCategories=new Set,this._selectedMusicId=null,this._searchPerformed=!1}static get styles(){return[a`
        :host {
          position: relative;
          display: inline-block;
        }
      `]}getComponentStylesString(){return'\n      .dialog {\n        background: var(--pmc-card-background);\n        border-radius: 12px;\n        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);\n        padding: 0;\n        display: flex;\n        flex-direction: column;\n        width: 90vw;\n        min-width: 400px;\n        max-width: 500px;\n        max-height: 85vh;\n      }\n\n      .dialog-header {\n        padding: 16px 20px;\n        font-weight: 600;\n        font-size: 18px;\n        color: var(--primary-text-color);\n        border-bottom: 1px solid var(--pmc-divider);\n      }\n\n      .dialog-body {\n        padding: 20px;\n        overflow-y: auto;\n        flex: 1;\n        min-height: 0;\n      }\n\n      .station-list {\n        display: flex;\n        flex-direction: column;\n        gap: 8px;\n      }\n\n      .station-item {\n        display: flex;\n        align-items: center;\n        padding: 12px;\n        border-radius: 8px;\n        background: transparent;\n        transition: background 0.2s;\n        cursor: pointer;\n      }\n\n      .station-item:hover:not(.disabled) {\n        background: var(--pmc-secondary-background);\n      }\n\n      .station-item.disabled {\n        opacity: 0.6;\n        cursor: not-allowed;\n      }\n\n      .station-item label {\n        display: flex;\n        align-items: center;\n        gap: 12px;\n        width: 100%;\n        cursor: pointer;\n      }\n\n      .station-item.disabled label {\n        cursor: not-allowed;\n      }\n\n      .station-item input[type="radio"] {\n        width: 20px;\n        height: 20px;\n        cursor: pointer;\n        margin: 0;\n        flex-shrink: 0;\n      }\n\n      .station-item.disabled input[type="radio"] {\n        cursor: not-allowed;\n      }\n\n      .station-name {\n        flex: 1;\n        font-size: 14px;\n        color: var(--primary-text-color);\n      }\n\n      .search-section {\n        margin-bottom: 16px;\n      }\n\n      .search-input-container {\n        display: flex;\n        gap: 12px;\n      }\n\n      .search-input {\n        flex: 1;\n        padding: 12px 16px;\n        border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));\n        border-radius: 8px;\n        background: var(--secondary-background-color, rgba(128, 128, 128, 0.1));\n        color: var(--primary-text-color);\n        font-size: 16px;\n        font-family: inherit;\n      }\n\n      .search-input:focus {\n        outline: none;\n        border-color: var(--primary-color);\n      }\n\n      .search-button {\n        padding: 12px 20px;\n        border: none;\n        border-radius: 8px;\n        background: var(--primary-color);\n        color: var(--text-primary-color);\n        cursor: pointer;\n        font-size: 14px;\n        font-weight: 500;\n        transition: all 0.2s;\n        white-space: nowrap;\n      }\n\n      .search-button:hover:not(:disabled) {\n        opacity: 0.9;\n      }\n\n      .search-button:disabled {\n        opacity: 0.6;\n        cursor: not-allowed;\n      }\n\n      .category-list {\n        display: flex;\n        flex-direction: column;\n        gap: 8px;\n      }\n\n      .category {\n        border-radius: 8px;\n        overflow: hidden;\n      }\n\n      .category-header {\n        display: flex;\n        align-items: center;\n        padding: 12px;\n        cursor: pointer;\n        background: var(--pmc-secondary-background);\n        transition: background 0.2s;\n        user-select: none;\n      }\n\n      .category-header:hover {\n        background: rgba(128, 128, 128, 0.15);\n      }\n\n      .chevron {\n        margin-right: 8px;\n        transition: transform 0.2s;\n        font-size: 16px;\n        color: var(--secondary-text-color);\n      }\n\n      .chevron.expanded {\n        transform: rotate(90deg);\n      }\n\n      .category-title {\n        font-size: 14px;\n        font-weight: 500;\n        color: var(--primary-text-color);\n        flex: 1;\n      }\n\n      .category-count {\n        font-size: 12px;\n        color: var(--secondary-text-color);\n      }\n\n      .category-results {\n        padding: 8px;\n        display: flex;\n        flex-direction: column;\n        gap: 4px;\n      }\n\n      .result-item {\n        display: flex;\n        align-items: center;\n        gap: 12px;\n        padding: 10px 12px;\n        background: var(--pmc-secondary-background);\n        border-radius: 6px;\n        cursor: pointer;\n        transition: all 0.2s;\n      }\n\n      .result-item:hover:not(.disabled) {\n        background: rgba(128, 128, 128, 0.15);\n      }\n\n      .result-item.selected {\n        background: var(--primary-color);\n        color: var(--text-primary-color);\n      }\n\n      .result-item.disabled {\n        opacity: 0.6;\n        cursor: not-allowed;\n      }\n\n      .result-item input[type="radio"] {\n        width: 16px;\n        height: 16px;\n        cursor: pointer;\n        margin: 0;\n        flex-shrink: 0;\n      }\n\n      .result-info {\n        flex: 1;\n        min-width: 0;\n      }\n\n      .result-name {\n        font-size: 14px;\n        font-weight: 500;\n        white-space: nowrap;\n        overflow: hidden;\n        text-overflow: ellipsis;\n      }\n\n      .result-artist {\n        font-size: 12px;\n        opacity: 0.8;\n        white-space: nowrap;\n        overflow: hidden;\n        text-overflow: ellipsis;\n      }\n\n      .no-results {\n        padding: 32px;\n        text-align: center;\n        color: var(--secondary-text-color);\n        font-size: 14px;\n      }\n\n      .loading {\n        padding: 32px;\n        text-align: center;\n        color: var(--secondary-text-color);\n      }\n\n      .dialog-footer {\n        display: flex;\n        gap: 8px;\n        padding: 16px 20px;\n        border-top: 1px solid var(--pmc-divider);\n        justify-content: flex-end;\n      }\n\n      .dialog-footer button {\n        padding: 8px 16px;\n        border-radius: 8px;\n        border: none;\n        font-size: 14px;\n        font-weight: 500;\n        cursor: pointer;\n        transition: all 0.2s;\n      }\n\n      .dialog-footer button.back {\n        margin-right: auto;\n        background: transparent;\n        color: var(--primary-text-color);\n      }\n\n      .dialog-footer button.back:hover {\n        background: var(--pmc-secondary-background);\n      }\n\n      .dialog-footer button.cancel {\n        background: transparent;\n        color: var(--primary-text-color);\n      }\n\n      .dialog-footer button.cancel:hover {\n        background: var(--pmc-secondary-background);\n      }\n\n      .dialog-footer button.confirm {\n        background: var(--primary-color);\n        color: var(--text-primary-color);\n      }\n\n      .dialog-footer button.confirm:hover {\n        opacity: 0.9;\n      }\n\n      .dialog-footer button:disabled {\n        opacity: 0.6;\n        cursor: not-allowed;\n      }\n\n      .no-stations {\n        padding: 16px;\n        text-align: center;\n        color: var(--secondary-text-color);\n      }\n    '}getPopupDimensions(){return{width:Math.min(500,.9*window.innerWidth),height:Math.min(.85*window.innerHeight,750)}}closePopup(){this._stage="select-station",this._selectedStationId=null,this._selectedStationName="",this._selectedMusicId=null,this._expandedCategories.clear(),this._searchQuery="",this._searchPerformed=!1,super.closePopup()}_handleStationSelect(t,e){this._selectedStationId=t,this._selectedStationName=e,this.requestUpdate()}_handleNext(){this._selectedStationId&&(this._stage="search",this.requestUpdate())}_handleBack(){this._stage="select-station",this._searchQuery="",this._selectedMusicId=null,this._expandedCategories.clear(),this._searchPerformed=!1,this.requestUpdate()}_handleSearch(){this._searchQuery.trim()&&(this._selectedMusicId=null,this._expandedCategories.clear(),this._searchPerformed=!0,this.dispatchEvent(new CustomEvent("search",{bubbles:!0,composed:!0,detail:{query:this._searchQuery.trim()}})))}_toggleCategory(t){const e=new Set(this._expandedCategories);e.has(t)?e.delete(t):e.add(t),this._expandedCategories=e}_handleResultSelect(t){this._selectedMusicId=t,this.requestUpdate()}_handleAddMusic(){this._selectedMusicId&&this._selectedStationId&&(this.dispatchEvent(new CustomEvent("add-music",{bubbles:!0,composed:!0,detail:{musicId:this._selectedMusicId,stationId:this._selectedStationId}})),this.closePopup())}_handleCancel(){this.closePopup()}_renderSelectStation(){const t=this.stations.filter(t=>!t.isQuickMix);return V`
      <div class="dialog-header">${te(this.hass,"add_music.title")}</div>
      <div class="dialog-body">
        ${0===t.length?V`<div class="no-stations">${te(this.hass,"add_music.no_stations")}</div>`:V`
              <div class="station-list">
                ${t.map(t=>V`
                    <div class="station-item ${this.disabled?"disabled":""}">
                      <label>
                        <input
                          type="radio"
                          name="station-select"
                          .value=${t.id}
                          .checked=${this._selectedStationId===t.id}
                          ?disabled=${this.disabled}
                          @change=${()=>this._handleStationSelect(t.id,t.name)}
                        />
                        <span class="station-name">${t.name}</span>
                      </label>
                    </div>
                  `)}
              </div>
            `}
      </div>
      <div class="dialog-footer">
        <button class="cancel" @click=${()=>this._handleCancel()} ?disabled=${this.disabled}>
          ${te(this.hass,"common.cancel")}
        </button>
        <button class="confirm" @click=${()=>this._handleNext()} ?disabled=${!this._selectedStationId||this.disabled}>
          ${te(this.hass,"rename.next")}
        </button>
      </div>
    `}_renderSearch(){const t=this.searchResults.categories.length>0;return V`
      <div class="dialog-header">${ee(this.hass,"add_music.title_with_station",{name:this._selectedStationName})}</div>
      <div class="dialog-body">
        <div class="search-section">
          <div class="search-input-container">
            <input
              type="text"
              class="search-input"
              id="add-music-search-input"
              placeholder=${te(this.hass,"create_station.placeholder_search_long")}
              .value=${this._searchQuery}
              ?disabled=${this.disabled||this.searchLoading}
              @input=${t=>{const e=t.target,o=e.selectionStart;this._searchQuery=e.value,this.requestUpdate(),this.updateComplete.then(()=>{const t=document.querySelector(".pmc-popup-container #add-music-search-input");t&&(t.focus(),null!==o&&t.setSelectionRange(o,o))})}}
              @keydown=${t=>{"Enter"===t.key&&this._searchQuery.trim()&&!this.searchLoading&&this._handleSearch()}}
              autofocus
            />
            <button
              class="search-button"
              ?disabled=${!this._searchQuery.trim()||this.disabled||this.searchLoading}
              @click=${()=>this._handleSearch()}
            >
              ${this.searchLoading?te(this.hass,"common.searching"):te(this.hass,"common.search")}
            </button>
          </div>
        </div>

        ${this.searchLoading?V`<div class="loading">${te(this.hass,"add_music.searching")}</div>`:this._searchPerformed?t?V`
              <div class="category-list">
                ${this.searchResults.categories.map(t=>{const e=this._expandedCategories.has(t.name);return V`
                      <div class="category">
                        <div class="category-header" @click=${()=>this._toggleCategory(t.name)}>
                          <span class="chevron ${e?"expanded":""}">▶</span>
                          <span class="category-title">${t.name}</span>
                          <span class="category-count">(${t.results.length})</span>
                        </div>
                        ${e?V`
                              <div class="category-results">
                                ${t.results.map(t=>{const e=this._selectedMusicId===t.musicId,o=t.title||t.name||"";return V`
                                      <div
                                        class="result-item ${e?"selected":""} ${this.disabled?"disabled":""}"
                                        @click=${()=>!this.disabled&&this._handleResultSelect(t.musicId)}
                                      >
                                        <input
                                          type="radio"
                                          name="result-select"
                                          .value=${t.musicId}
                                          .checked=${e}
                                          ?disabled=${this.disabled}
                                          @change=${()=>this._handleResultSelect(t.musicId)}
                                        />
                                        <div class="result-info">
                                          <div class="result-name">${o}</div>
                                          ${t.artist?V`<div class="result-artist">${t.artist}</div>`:H}
                                        </div>
                                      </div>
                                    `})}
                              </div>
                            `:H}
                      </div>
                    `})}
              </div>
            `:V`<div class="no-results">${ee(this.hass,"add_music.no_results",{query:this._searchQuery})}</div>`:V`<div class="no-results">${te(this.hass,"add_music.enter_query")}</div>`}
      </div>
      <div class="dialog-footer">
        <button class="back" @click=${()=>this._handleBack()} ?disabled=${this.disabled}>
          ${te(this.hass,"common.back")}
        </button>
        <button class="cancel" @click=${()=>this._handleCancel()} ?disabled=${this.disabled}>
          ${te(this.hass,"common.cancel")}
        </button>
        <button class="confirm" @click=${()=>this._handleAddMusic()} ?disabled=${!this._selectedMusicId||this.disabled}>
          ${te(this.hass,"add_music.add_button")}
        </button>
      </div>
    `}renderPopupContent(){const t="select-station"===this._stage?this._renderSelectStation():this._renderSearch();return V`
      <div class="dialog">
        ${t}
      </div>
    `}};t([ut({type:Array})],be.prototype,"stations",void 0),t([ut({type:Boolean})],be.prototype,"searchLoading",void 0),t([ut({type:Object})],be.prototype,"searchResults",void 0),t([gt()],be.prototype,"_stage",void 0),t([gt()],be.prototype,"_selectedStationId",void 0),t([gt()],be.prototype,"_selectedStationName",void 0),t([gt()],be.prototype,"_searchQuery",void 0),t([gt()],be.prototype,"_expandedCategories",void 0),t([gt()],be.prototype,"_selectedMusicId",void 0),t([gt()],be.prototype,"_searchPerformed",void 0),be=t([lt("pmc-add-music-popup")],be);let _e=class extends pe{constructor(){super(...arguments),this.currentSongName="",this.currentArtistName="",this.currentTrackToken="",this.searchResults={categories:[]},this.genreCategories=[],this.searchLoading=!1,this.genreLoading=!1,this._mode="select",this._searchQuery="",this._expandedCategories=new Set,this._selectedMusicId=null,this._sharedStationId=""}static get styles(){return[a`
        :host {
          position: relative;
          display: inline-block;
        }
      `]}getComponentStylesString(){return'\n      .dialog {\n        background: var(--pmc-card-background);\n        border-radius: 12px;\n        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);\n        padding: 0;\n        display: flex;\n        flex-direction: column;\n        width: 90vw;\n        min-width: 400px;\n        max-width: 420px;\n        max-height: 85vh;\n      }\n\n      .dialog-header {\n        padding: 16px 20px;\n        font-weight: 600;\n        font-size: 18px;\n        color: var(--primary-text-color);\n        border-bottom: 1px solid var(--pmc-divider);\n      }\n\n      .dialog-body {\n        padding: 20px;\n        overflow-y: auto;\n        flex: 1;\n        min-height: 0;\n      }\n\n      .select-options {\n        display: flex;\n        flex-direction: column;\n        gap: 12px;\n      }\n\n      .option-button {\n        display: flex;\n        flex-direction: column;\n        align-items: flex-start;\n        gap: 4px;\n        padding: 14px 16px;\n        border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));\n        border-radius: 8px;\n        background: var(--pmc-secondary-background);\n        cursor: pointer;\n        transition: all 0.2s;\n        text-align: left;\n        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n      }\n\n      .option-button:hover:not(:disabled) {\n        background: rgba(128, 128, 128, 0.15);\n        transform: translateY(-1px);\n        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);\n      }\n\n      .option-button:disabled {\n        opacity: 0.6;\n        cursor: not-allowed;\n      }\n\n      .option-main {\n        display: flex;\n        align-items: center;\n        gap: 12px;\n        font-weight: 500;\n        font-size: 15px;\n        color: var(--primary-text-color);\n      }\n\n      .option-detail {\n        font-size: 13px;\n        color: var(--secondary-text-color);\n        margin-left: 32px;\n      }\n\n      .divider {\n        height: 1px;\n        background: var(--pmc-divider);\n        margin: 16px 0;\n      }\n\n      .section-label {\n        font-size: 17px;\n        font-weight: 500;\n        color: var(--primary-text-color);\n        margin-bottom: 12px;\n        margin-top: 8px;\n      }\n\n      .search-section, .shared-section {\n        margin-top: 16px;\n      }\n\n      .search-input-container {\n        display: flex;\n        gap: 12px;\n        margin-bottom: 12px;\n      }\n\n      .shared-input-container {\n        display: flex;\n        gap: 12px;\n      }\n\n      .search-input, .shared-input {\n        flex: 1;\n        padding: 12px 16px;\n        border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));\n        border-radius: 8px;\n        background: var(--secondary-background-color, rgba(128, 128, 128, 0.1));\n        color: var(--primary-text-color);\n        font-size: 14px;\n        font-family: inherit;\n      }\n\n      .search-input:focus, .shared-input:focus {\n        outline: none;\n        border-color: var(--primary-color);\n      }\n\n      .search-button, .shared-button {\n        padding: 12px 20px;\n        border: none;\n        border-radius: 8px;\n        background: var(--primary-color);\n        color: var(--text-primary-color);\n        cursor: pointer;\n        font-size: 14px;\n        font-weight: 500;\n        transition: all 0.2s;\n        white-space: nowrap;\n        min-width: 80px;\n      }\n\n      .search-button:hover:not(:disabled), .shared-button:hover:not(:disabled) {\n        opacity: 0.9;\n      }\n\n      .search-button:disabled, .shared-button:disabled {\n        opacity: 0.6;\n        cursor: not-allowed;\n      }\n\n      .category-list, .genre-list {\n        display: flex;\n        flex-direction: column;\n        gap: 8px;\n      }\n\n      .category, .genre-category {\n        border-radius: 8px;\n        overflow: hidden;\n      }\n\n      .category-header, .genre-header {\n        display: flex;\n        align-items: center;\n        padding: 12px;\n        cursor: pointer;\n        background: var(--pmc-secondary-background);\n        transition: background 0.2s;\n        user-select: none;\n      }\n\n      .category-header:hover, .genre-header:hover {\n        background: rgba(128, 128, 128, 0.15);\n      }\n\n      .chevron {\n        margin-right: 8px;\n        transition: transform 0.2s;\n        font-size: 16px;\n        color: var(--secondary-text-color);\n      }\n\n      .chevron.expanded {\n        transform: rotate(90deg);\n      }\n\n      .category-title, .genre-category-title {\n        font-size: 14px;\n        font-weight: 500;\n        color: var(--primary-text-color);\n        flex: 1;\n      }\n\n      .category-count, .genre-count {\n        font-size: 12px;\n        color: var(--secondary-text-color);\n      }\n\n      .category-results, .genre-items {\n        margin-left: 32px;\n        margin-top: 8px;\n        margin-bottom: 8px;\n        display: flex;\n        flex-direction: column;\n        gap: 4px;\n      }\n\n      .list-item {\n        display: flex;\n        align-items: center;\n        padding: 12px;\n        background: var(--secondary-background-color, rgba(0, 0, 0, 0.05));\n        border-radius: 8px;\n        cursor: pointer;\n        transition: background 0.2s;\n        user-select: none;\n      }\n\n      .list-item:hover {\n        background: var(--primary-background-color, rgba(128, 128, 128, 0.15));\n      }\n\n      .list-item.selected {\n        background: var(--primary-color);\n        color: var(--text-primary-color, #fff);\n      }\n\n      .list-item label {\n        display: flex;\n        align-items: center;\n        gap: 12px;\n        cursor: pointer;\n        flex: 1;\n        user-select: none;\n      }\n\n      .list-item input[type="radio"] {\n        width: 15px;\n        height: 15px;\n        cursor: pointer;\n        margin: 0;\n        flex-shrink: 0;\n        accent-color: var(--primary-color);\n      }\n\n      .result-item-name,\n      .genre-name {\n        font-size: 14px;\n        color: var(--primary-text-color);\n      }\n\n      .list-item.selected .result-item-name,\n      .list-item.selected .genre-name {\n        color: var(--text-primary-color, #fff);\n      }\n\n      .result-item-artist {\n        font-size: 12px;\n        color: var(--secondary-text-color);\n        margin-left: 4px;\n      }\n\n      .list-item.selected .result-item-artist {\n        color: var(--text-primary-color, #fff);\n        opacity: 0.9;\n      }\n\n      .no-results {\n        padding: 32px;\n        text-align: center;\n        color: var(--secondary-text-color);\n        font-size: 14px;\n      }\n\n      .loading {\n        padding: 32px;\n        text-align: center;\n        color: var(--secondary-text-color);\n        display: flex;\n        flex-direction: column;\n        align-items: center;\n        gap: 16px;\n      }\n\n      .loading-spinner {\n        width: 32px;\n        height: 32px;\n        border: 3px solid var(--pmc-divider);\n        border-top-color: var(--primary-color);\n        border-radius: 50%;\n        animation: spin 1s linear infinite;\n      }\n\n      @keyframes spin {\n        to { transform: rotate(360deg); }\n      }\n\n      .dialog-footer {\n        display: flex;\n        gap: 8px;\n        padding: 16px 20px;\n        border-top: 1px solid var(--pmc-divider);\n        justify-content: flex-end;\n      }\n\n      .dialog-footer button {\n        padding: 8px 16px;\n        border-radius: 8px;\n        border: none;\n        font-size: 14px;\n        font-weight: 500;\n        cursor: pointer;\n        transition: all 0.2s;\n      }\n\n      .dialog-footer button.back {\n        margin-right: auto;\n        background: transparent;\n        color: var(--primary-text-color);\n      }\n\n      .dialog-footer button.back:hover {\n        background: var(--pmc-secondary-background);\n      }\n\n      .dialog-footer button.cancel {\n        background: transparent;\n        color: var(--primary-text-color);\n      }\n\n      .dialog-footer button.cancel:hover {\n        background: var(--pmc-secondary-background);\n      }\n\n      .dialog-footer button.create {\n        background: var(--primary-color);\n        color: var(--text-primary-color);\n      }\n\n      .dialog-footer button.create:hover {\n        opacity: 0.9;\n      }\n\n      .dialog-footer button:disabled {\n        opacity: 0.6;\n        cursor: not-allowed;\n      }\n    '}getPopupDimensions(){return{width:Math.min(500,.9*window.innerWidth),height:Math.min(.85*window.innerHeight,750)}}closePopup(){this._mode="select",this._selectedMusicId=null,this._expandedCategories.clear(),this._searchQuery="",this._sharedStationId="",super.closePopup()}_handleSelectArtist(){this.dispatchEvent(new CustomEvent("create-from-artist",{bubbles:!0,composed:!0})),this.closePopup()}_handleSelectSong(){this.dispatchEvent(new CustomEvent("create-from-song",{bubbles:!0,composed:!0})),this.closePopup()}_handleSearch(){this._searchQuery.trim()&&(console.log("[SEARCH] Dispatching search event:",{query:this._searchQuery.trim(),mode:"searching"}),this._mode="searching",this._selectedMusicId=null,this._expandedCategories.clear(),this.dispatchEvent(new CustomEvent("search",{bubbles:!0,composed:!0,detail:{query:this._searchQuery.trim()}})))}_toggleCategory(t){const e=new Set(this._expandedCategories);e.has(t)?e.delete(t):e.add(t),this._expandedCategories=e}_handleResultSelect(t){this._selectedMusicId=t,this.requestUpdate()}_handleCreateFromSearch(){this._selectedMusicId&&(this.dispatchEvent(new CustomEvent("create-from-music-id",{bubbles:!0,composed:!0,detail:{musicId:this._selectedMusicId}})),this.closePopup())}_handleBrowseGenres(){this._mode="browse-genres",this._selectedMusicId=null,this._expandedCategories.clear(),this.dispatchEvent(new CustomEvent("browse-genres",{bubbles:!0,composed:!0}))}_handleGenreSelect(t){this._selectedMusicId=t,this.requestUpdate()}_handleCreateFromGenre(){this._selectedMusicId&&(this.dispatchEvent(new CustomEvent("create-from-music-id",{bubbles:!0,composed:!0,detail:{musicId:this._selectedMusicId}})),this.closePopup())}_handleAddSharedStation(){this._sharedStationId.trim()&&(this.dispatchEvent(new CustomEvent("create-from-shared",{bubbles:!0,composed:!0,detail:{stationId:this._sharedStationId.trim()}})),this.closePopup())}_handleBackToSelect(){this._mode="select",this._selectedMusicId=null,this._expandedCategories.clear(),this.requestUpdate()}_handleCancel(t){t.stopPropagation(),this.closePopup()}_renderSelectMode(){const t=!this._searchQuery.trim()||this.disabled||this.searchLoading;return V`
      <div class="dialog-body">
        <div class="search-input-container">
          <input
            type="text"
            class="search-input"
            id="search-input"
            placeholder=${te(this.hass,"create_station.placeholder_search")}
            .value=${this._searchQuery}
            ?disabled=${this.disabled||this.searchLoading}
            @input=${t=>{const e=t.target,o=e.selectionStart;this._searchQuery=e.value,this.requestUpdate("_searchQuery"),this.updateComplete.then(()=>{const t=document.querySelector(".pmc-popup-container #search-input");t&&(t.focus(),null!==o&&t.setSelectionRange(o,o))})}}
            @keydown=${t=>{"Enter"===t.key&&this._searchQuery.trim()&&!this.searchLoading&&this._handleSearch()}}
          />
          <button
            class="search-button"
            ?disabled=${t}
            @click=${()=>this._handleSearch()}
          >
            ${this.searchLoading?te(this.hass,"create_station.searching"):te(this.hass,"common.search")}
          </button>
        </div>

        <div class="shared-input-container">
          <input
            type="text"
            class="shared-input"
            id="shared-input"
            placeholder=${te(this.hass,"create_station.placeholder_shared")}
            .value=${this._sharedStationId}
            ?disabled=${this.disabled}
            @input=${t=>{const e=t.target,o=e.selectionStart,n=e.value.replace(/[^0-9]/g,"");this._sharedStationId=n,e.value=n,this.requestUpdate("_sharedStationId"),this.updateComplete.then(()=>{const t=document.querySelector(".pmc-popup-container #shared-input");t&&(t.focus(),null!==o&&t.setSelectionRange(o,o))})}}
            @keydown=${t=>{"Enter"===t.key&&this._sharedStationId.trim()&&this._handleAddSharedStation()}}
          />
          <button
            class="shared-button"
            ?disabled=${!this._sharedStationId.trim()||this.disabled}
            @click=${()=>this._handleAddSharedStation()}
          >
            ${te(this.hass,"create_station.add_short")}
          </button>
        </div>

        <div class="divider"></div>

        <div class="section-label">${te(this.hass,"create_station.section_or_create")}</div>

        <div class="select-options">
          ${this.currentTrackToken?V`
            <button class="option-button" @click=${()=>this._handleSelectArtist()} ?disabled=${this.disabled}>
              <div class="option-main">
                <ha-icon icon="mdi:account-music"></ha-icon>
                <span>${te(this.hass,"create_station.option_artist")}</span>
              </div>
              ${this.currentArtistName?V`<div class="option-detail">${this.currentArtistName}</div>`:H}
            </button>

            <button class="option-button" @click=${()=>this._handleSelectSong()} ?disabled=${this.disabled}>
              <div class="option-main">
                <ha-icon icon="mdi:music-note"></ha-icon>
                <span>${te(this.hass,"create_station.option_song")}</span>
              </div>
              ${this.currentSongName?V`<div class="option-detail">${this.currentSongName}</div>`:H}
            </button>
          `:H}

          <button class="option-button" @click=${()=>this._handleBrowseGenres()} ?disabled=${this.disabled}>
            <div class="option-main">
              <ha-icon icon="mdi:bookshelf"></ha-icon>
              <span>${te(this.hass,"create_station.option_genre")}</span>
            </div>
            <div class="option-detail">${te(this.hass,"create_station.genre_detail")}</div>
          </button>
        </div>
      </div>
    `}_renderSearching(){return V`
      <div class="dialog-body">
        <div class="search-section">
          <div class="search-input-container">
            <input
              type="text"
              class="search-input"
              placeholder=${te(this.hass,"create_station.placeholder_search_long")}
              .value=${this._searchQuery}
              disabled
            />
            <button class="search-button" disabled>
              ${te(this.hass,"create_station.searching")}
            </button>
          </div>
        </div>
        <div class="loading">
          <div class="loading-spinner"></div>
          <div>${ee(this.hass,"create_station.searching_for",{query:this._searchQuery})}</div>
        </div>
      </div>
      <div class="dialog-footer">
        <button class="back" @click=${()=>this._handleBackToSelect()}>
          ${te(this.hass,"common.back")}
        </button>
        <button class="cancel" @click=${t=>this._handleCancel(t)}>
          ${te(this.hass,"common.cancel")}
        </button>
      </div>
    `}_renderSearchResults(){const t=this.searchResults.categories.length>0;return console.log("[SEARCH RESULTS]",{searchQuery:this._searchQuery,searchResults:this.searchResults,categoriesCount:this.searchResults.categories.length,hasResults:t,rawResults:JSON.stringify(this.searchResults,null,2)}),V`
      <div class="dialog-body">
        ${this.searchLoading?V`<div class="loading">${te(this.hass,"create_station.searching")}</div>`:t?V`
              <div class="category-list">
                ${this.searchResults.categories.map(t=>{const e=this._expandedCategories.has(t.name);return V`
                      <div class="category">
                        <div class="category-header" @click=${()=>this._toggleCategory(t.name)}>
                          <span class="chevron ${e?"expanded":""}">▶</span>
                          <span class="category-title">${t.name}</span>
                          <span class="category-count">(${t.results.length})</span>
                        </div>
                        ${e?V`
                              <div class="category-results">
                                ${t.results.map(t=>{const e=this._selectedMusicId===t.musicId,o=t.title||t.name||"";return V`
                                      <div class="list-item ${e?"selected":""}">
                                        <label>
                                          <input
                                            type="radio"
                                            name="result-select"
                                            .value=${t.musicId}
                                            .checked=${e}
                                            ?disabled=${this.disabled}
                                            @change=${()=>this._handleResultSelect(t.musicId)}
                                          >
                                          <span class="result-item-name">
                                            ${o}${t.artist?V` <span class="result-item-artist">${ee(this.hass,"common.by_artist",{artist:t.artist})}</span>`:H}
                                          </span>
                                        </label>
                                      </div>
                                    `})}
                              </div>
                            `:H}
                      </div>
                    `})}
              </div>
            `:V`<div class="no-results">${ee(this.hass,"create_station.no_results",{query:this._searchQuery})}</div>`}
      </div>
      <div class="dialog-footer">
        <button class="back" @click=${()=>this._handleBackToSelect()} ?disabled=${this.disabled}>
          ${te(this.hass,"common.back")}
        </button>
        <button class="cancel" @click=${t=>this._handleCancel(t)} ?disabled=${this.disabled}>
          ${te(this.hass,"common.cancel")}
        </button>
        <button class="create" @click=${()=>this._handleCreateFromSearch()} ?disabled=${!this._selectedMusicId||this.disabled}>
          ${te(this.hass,"create_station.create")}
        </button>
      </div>
    `}_renderBrowseGenres(){const t=this.genreCategories.length>0;return V`
      <div class="dialog-body">
        ${this.genreLoading?V`<div class="loading">${te(this.hass,"create_station.loading_genres")}</div>`:t?V`
              <div class="genre-list">
                ${this.genreCategories.map(t=>{const e=this._expandedCategories.has(t.name);return V`
                      <div class="genre-category">
                        <div class="genre-header" @click=${()=>this._toggleCategory(t.name)}>
                          <span class="chevron ${e?"expanded":""}">▶</span>
                          <span class="genre-category-title">${t.name}</span>
                          <span class="genre-count">(${t.genres.length})</span>
                        </div>
                        ${e?V`
                              <div class="genre-items">
                                ${t.genres.map(t=>{const e=this._selectedMusicId===t.musicId;return V`
                                      <div class="list-item ${e?"selected":""}">
                                        <label>
                                          <input
                                            type="radio"
                                            name="genre-select"
                                            .value=${t.musicId}
                                            .checked=${e}
                                            ?disabled=${this.disabled}
                                            @change=${()=>this._handleGenreSelect(t.musicId)}
                                          >
                                          <span class="genre-name">${t.name}</span>
                                        </label>
                                      </div>
                                    `})}
                              </div>
                            `:H}
                      </div>
                    `})}
              </div>
            `:V`<div class="no-results">${te(this.hass,"create_station.no_genres")}</div>`}
      </div>
      <div class="dialog-footer">
        <button class="back" @click=${()=>this._handleBackToSelect()} ?disabled=${this.disabled}>
          ${te(this.hass,"common.back")}
        </button>
        <button class="cancel" @click=${t=>this._handleCancel(t)} ?disabled=${this.disabled}>
          ${te(this.hass,"common.cancel")}
        </button>
        <button class="create" @click=${()=>this._handleCreateFromGenre()} ?disabled=${!this._selectedMusicId||this.disabled}>
          ${te(this.hass,"create_station.create")}
        </button>
      </div>
    `}renderPopupContent(){let t;return t="searching"===this._mode?this._renderSearching():"search-results"===this._mode?this._renderSearchResults():"browse-genres"===this._mode?this._renderBrowseGenres():this._renderSelectMode(),V`
      <div class="dialog">
        <div class="dialog-header">${te(this.hass,"create_station.title")}</div>
        ${t}
      </div>
    `}};t([ut({type:String})],_e.prototype,"currentSongName",void 0),t([ut({type:String})],_e.prototype,"currentArtistName",void 0),t([ut({type:String})],_e.prototype,"currentTrackToken",void 0),t([ut({type:Object})],_e.prototype,"searchResults",void 0),t([ut({type:Array})],_e.prototype,"genreCategories",void 0),t([ut({type:Boolean})],_e.prototype,"searchLoading",void 0),t([ut({type:Boolean})],_e.prototype,"genreLoading",void 0),t([gt()],_e.prototype,"_mode",void 0),t([gt()],_e.prototype,"_searchQuery",void 0),t([gt()],_e.prototype,"_expandedCategories",void 0),t([gt()],_e.prototype,"_selectedMusicId",void 0),t([gt()],_e.prototype,"_sharedStationId",void 0),_e=t([lt("pmc-create-station-modal")],_e);let fe=class extends se{constructor(){super(...arguments),this.accounts=[],this.currentAccountId="",this._selectedAccountId=null}static get styles(){return[se.baseStyles,a`
    :host {
      position: relative;
      display: inline-block;
    }
    `]}getPopupDimensions(){const t=52*this.accounts.length+120,e=window.innerHeight-100;return{width:320,height:Math.min(t,e)}}openPopup(){this._selectedAccountId=this.currentAccountId||null,super.openPopup()}closePopup(){this._selectedAccountId=null,super.closePopup()}updated(t){super.updated(t),t.has("currentAccountId")&&this.isOpen&&(this._selectedAccountId=this.currentAccountId)}getComponentStylesString(){return'\n      .pmc-popup-container {\n        min-width: 280px;\n        max-width: 400px;\n        max-height: calc(100vh - 100px);\n        overflow-y: auto;\n        padding: 8px;\n        display: flex;\n        flex-direction: column;\n        gap: 4px;\n      }\n\n      .popup-header {\n        padding: 12px 16px;\n        font-size: 16px;\n        font-weight: 600;\n        color: var(--primary-text-color);\n        border-bottom: 1px solid var(--divider-color, rgba(0, 0, 0, 0.1));\n        margin-bottom: 8px;\n      }\n\n      .accounts-list {\n        display: flex;\n        flex-direction: column;\n        gap: 4px;\n        margin-bottom: 12px;\n      }\n\n      .account-item {\n        display: flex;\n        align-items: center;\n        gap: 12px;\n        padding: 12px;\n        background: transparent;\n        border-radius: 8px;\n        cursor: pointer;\n        transition: all 0.2s;\n        user-select: none;\n        border: 2px solid transparent;\n      }\n\n      .account-item:hover {\n        background: var(--secondary-background-color, rgba(0, 0, 0, 0.05));\n      }\n\n      .account-item.active {\n        border-color: var(--primary-color);\n        background: rgba(118, 75, 162, 0.1);\n      }\n\n      .account-item.selected {\n        border-color: var(--primary-color);\n      }\n\n      .account-item input[type="radio"] {\n        margin: 0;\n        cursor: pointer;\n      }\n\n      .account-icon {\n        --mdc-icon-size: 20px;\n        color: var(--secondary-text-color);\n      }\n\n      .account-name {\n        font-size: 15px;\n        font-weight: 500;\n        color: var(--primary-text-color);\n        flex: 1;\n      }\n\n      .account-active-badge {\n        padding: 4px 10px;\n        background: var(--primary-color);\n        color: white;\n        border-radius: 12px;\n        font-size: 11px;\n        font-weight: 600;\n        text-transform: uppercase;\n      }\n\n      .popup-footer {\n        display: flex;\n        justify-content: flex-end;\n        gap: 8px;\n        padding-top: 8px;\n        border-top: 1px solid var(--divider-color, rgba(0, 0, 0, 0.1));\n      }\n\n      .popup-footer button {\n        padding: 8px 16px;\n        border: none;\n        border-radius: 8px;\n        font-size: 14px;\n        font-weight: 500;\n        cursor: pointer;\n        transition: all 0.2s;\n      }\n\n      .popup-footer button:disabled {\n        opacity: 0.5;\n        cursor: not-allowed;\n      }\n\n      .button-cancel {\n        background: transparent;\n        color: var(--primary-text-color);\n      }\n\n      .button-cancel:hover:not(:disabled) {\n        background: var(--secondary-background-color, rgba(0, 0, 0, 0.05));\n      }\n\n      .button-confirm {\n        background: var(--primary-color);\n        color: white;\n      }\n\n      .button-confirm:hover:not(:disabled) {\n        opacity: 0.9;\n      }\n    '}_handleAccountSelect(t){this._selectedAccountId=t}_handleConfirm(){this._selectedAccountId&&this._selectedAccountId!==this.currentAccountId&&(this.dispatchEvent(new CustomEvent("account-select",{bubbles:!0,composed:!0,detail:{accountId:this._selectedAccountId}})),this.closePopup())}renderPopupContent(){const t=!this._selectedAccountId||this._selectedAccountId===this.currentAccountId;return V`
      <div class="popup-header">${te(this.hass,"account.title")}</div>
      
      <div class="accounts-list">
        ${this.accounts.map(t=>V`
          <div 
            class="account-item ${t.id===this.currentAccountId?"active":""} ${this._selectedAccountId===t.id?"selected":""}"
            @click=${()=>this._handleAccountSelect(t.id)}
          >
            <input
              type="radio"
              name="account-select"
              .value=${t.id}
              .checked=${this._selectedAccountId===t.id}
              @change=${()=>this._handleAccountSelect(t.id)}
            >
            <ha-icon class="account-icon" icon="mdi:account-circle"></ha-icon>
            <span class="account-name">${t.label}</span>
            ${t.id===this.currentAccountId?V`<span class="account-active-badge">${te(this.hass,"account.active")}</span>`:H}
          </div>
        `)}
      </div>
      
      <div class="popup-footer">
        <button class="button-cancel" @click=${()=>this.closePopup()}>
          ${te(this.hass,"common.cancel")}
        </button>
        <button 
          class="button-confirm"
          ?disabled=${t}
          @click=${()=>this._handleConfirm()}
        >
          ${te(this.hass,"account.switch_button")}
        </button>
      </div>
    `}};t([ut({type:Array})],fe.prototype,"accounts",void 0),t([ut({type:String})],fe.prototype,"currentAccountId",void 0),t([gt()],fe.prototype,"_selectedAccountId",void 0),fe=t([lt("pmc-account-selector-popup")],fe);const ve=function(t){try{return new Date(t).toLocaleString()}catch{return t}}("2026-04-04T19:37:05.050Z"),ye=[{name:"entity",required:!0,selector:{entity:{domain:"media_player"}}}],xe=[{name:"name",selector:{text:{}}},{name:"volume_entity",selector:{entity:{domain:"media_player"}}}],we=[{name:"tallArtworkSize",selector:{number:{min:50,max:100,step:5}}}];let $e=class extends ct{constructor(){super(...arguments),this._activeTab="general",this._supportedActions=[],this._supportsRating=!0,this._newWayActions=[],this._newWayError=null,this._newWayRawResponseStr=null,this._oldWayActions=[],this._fetchedEntityId=null,this._computeLabel=t=>{const e={entity:"editor.label_entity",name:"editor.label_custom_name",volume_entity:"editor.label_volume_entity",artwork:"editor.label_artwork",tallArtworkSize:"editor.label_tall_artwork_size",stationDisplay:"editor.label_station_display"}[t.name];return e?te(this.hass,e):t.name},this._computeHelper=t=>{const e={entity:"editor.helper_entity",name:"editor.helper_name",volume_entity:"editor.helper_volume_entity"}[t.name];return e?te(this.hass,e):""}}setConfig(t){this._config=t,t.entity!==this._fetchedEntityId&&(this._fetchedEntityId=null)}_updateConfig(t,e){if(!this._config)return;const o={...this._config};""===e||null==e?delete o[t]:o[t]=e,this._config=o,this._fireConfigChanged()}_fireConfigChanged(){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0}))}_valueChanged(t){const e=t.detail;if(e.value){if("mode"in e.value&&this._config){const t=e.value.mode;if("custom"!==t){const o=e.value.entity??this._config.entity,n=e.value.volume_entity??this._config.volume_entity,i=e.value.name??this._config.name,s={type:this._config.type,entity:o,mode:t,...n&&{volume_entity:n},...i&&{name:i}};return this._config=s,void this._fireConfigChanged()}}Object.entries(e.value).forEach(([t,e])=>{this._updateConfig(t,e)})}}_handleAppearanceChange(t){const e=t.detail;if(!e.value||!this._config)return;const o=this._config?.mode||"default",n=zt(o),i="custom"===o,s="tall"===o||i?this._config?.tallArtworkSize??80:80,a={...{...this._config,artwork:i?this._config?.artwork??n.artwork:n.artwork,showDetails:i?this._config?.showDetails??n.showDetails:n.showDetails,showTitle:i?this._config?.showTitle??n.showTitle:n.showTitle,showArtist:i?this._config?.showArtist??n.showArtist:n.showArtist,showAlbum:i?this._config?.showAlbum??n.showAlbum:n.showAlbum,reserveDetailsSpace:i?this._config?.reserveDetailsSpace??n.reserveDetailsSpace:n.reserveDetailsSpace,showPlaybackControls:i?this._config?.showPlaybackControls??n.showPlaybackControls:n.showPlaybackControls,showPowerButton:i?this._config?.showPowerButton??n.showPowerButton:n.showPowerButton,showVolumeControl:i?this._config?.showVolumeControl??n.showVolumeControl:n.showVolumeControl,showSongActions:i?this._config?.showSongActions??n.showSongActions:n.showSongActions,showProgressBar:i?this._config?.showProgressBar??n.showProgressBar:n.showProgressBar,showProgressTime:i?this._config?.showProgressTime??n.showProgressTime:n.showProgressTime,showAccountSwitch:!1!==this._config?.showAccountSwitch,stationDisplay:i?this._config?.stationDisplay??n.stationDisplay:n.stationDisplay,tallArtworkSize:s},...e.value};"number"==typeof a.tallArtworkSize&&(a.tallArtworkSize=Math.min(100,Math.max(50,a.tallArtworkSize)));const r=Rt(a);a.mode=r,"tall"===r&&80===a.tallArtworkSize&&delete a.tallArtworkSize,this._config=a,this._fireConfigChanged()}_handleControlsChange(t){const e=t.detail;if(!e.value||!this._config)return;const o={...this._config,...e.value},n=Rt(o);o.mode=n,this._config=o,this._fireConfigChanged()}_setActiveTab(t){this._activeTab=t}updated(t){super.updated(t);const e=this._config?.entity;e&&this.hass&&e!==this._fetchedEntityId&&(this._fetchedEntityId=e,this._fetchSupportedActions(e).then(t=>{if(this._config?.entity!==e)return;this._supportedActions=t;const o=this._supportsAnyRatingFromList(t);this._supportsRating=o;const n={...this._config};n.supported_actions=t.length>0?t:void 0,o||(n.showSongActions=!1),this._config=n,this._fireConfigChanged()}))}_modeSchema(){const t=t=>te(this.hass,t);return[{name:"mode",selector:{select:{mode:"dropdown",options:[{value:"default",label:t("editor.mode_default")},{value:"minimal",label:t("editor.mode_minimal")},{value:"full",label:t("editor.mode_full")},{value:"tall",label:t("editor.mode_tall")},{value:"custom",label:t("editor.mode_custom")}]}}}]}_customAppearanceSchema(){const t=t=>te(this.hass,t);return[{name:"artwork",selector:{select:{mode:"dropdown",options:[{value:"default",label:t("editor.artwork_default")},{value:"full-cover",label:t("editor.artwork_full_cover")},{value:"tall",label:t("editor.artwork_tall")}]}}}]}_stationDisplaySchema(){const t=t=>te(this.hass,t);return[{name:"stationDisplay",selector:{select:{mode:"dropdown",options:[{value:"hidden",label:t("editor.station_hidden")},{value:"compact",label:t("editor.station_compact")},{value:"normal",label:t("editor.station_normal")}]}}}]}async _fetchSupportedActions(t){const e=this.hass?.states[t],o=e?.attributes?.supported_actions||[];if(this._oldWayActions=o,!this.hass?.connection?.sendMessagePromise)return this._newWayActions=[],this._newWayError="No sendMessagePromise",this._newWayRawResponseStr=null,o;try{const e=await this.hass.connection.sendMessagePromise({type:"get_services_for_target",target:{entity_id:[t]},expand_group:!0}),n=Array.isArray(e)?e:e&&"object"==typeof e&&e.result;if(!Array.isArray(n)){this._newWayActions=[],this._newWayError="No result in response";try{this._newWayRawResponseStr=JSON.stringify(e).slice(0,600)}catch{this._newWayRawResponseStr=String(e).slice(0,600)}return o}this._newWayRawResponseStr=null;const i=n.filter(t=>"string"==typeof t&&t.startsWith("pianobar.")).map(t=>t.slice(9));return this._newWayActions=i,this._newWayError=null,i.length>0?i:o}catch(t){const e=t?.message??t?.code??String(t);return this._newWayActions=[],this._newWayError=e,this._newWayRawResponseStr=null,o}}_supportsAnyRatingFromList(t){return t.includes("love_song")||t.includes("ban_song")||t.includes("tired_of_song")}_renderGeneralTab(){return V`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${ye}
        .computeLabel=${this._computeLabel}
        .computeHelper=${this._computeHelper}
        @value-changed=${this._valueChanged}
      ></ha-form>

      <div class="section-title">${te(this.hass,"editor.section_mode")}</div>
      <ha-form
        .hass=${this.hass}
        .data=${{mode:this._config?.mode||"default"}}
        .schema=${this._modeSchema()}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `}_renderAppearanceTab(){const t=this._config?.mode||"default",e=zt(t),o="custom"===t,n=o?this._config?.artwork??e.artwork:e.artwork,i="tall"===t||o&&"tall"===n,s="tall"===t||o?this._config?.tallArtworkSize??80:80,a=i?[...this._customAppearanceSchema(),...we]:this._customAppearanceSchema(),r={...this._config,artwork:n,...i?{tallArtworkSize:s}:{}},c=o?this._config?.stationDisplay??e.stationDisplay:e.stationDisplay,d=this._supportsStations();return V`
      <ha-form
        .hass=${this.hass}
        .data=${r}
        .schema=${a}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._handleAppearanceChange}
      ></ha-form>

      <div class="section-title">${te(this.hass,"editor.section_station_selector")}</div>
      ${d?V`
            <ha-form
              .hass=${this.hass}
              .data=${{stationDisplay:c}}
              .schema=${this._stationDisplaySchema()}
              .computeLabel=${this._computeLabel}
              @value-changed=${this._handleAppearanceChange}
            ></ha-form>
          `:V`<p class="helper-text">${te(this.hass,"editor.helper_station_pianobar")}</p>`}
    `}_handleCheckboxChange(t,e){const o=e.target,n=this._config?.mode||"default",i=zt(n),s="custom"===n,a={...{...this._config,artwork:s?this._config?.artwork??i.artwork:i.artwork,showDetails:s?this._config?.showDetails??i.showDetails:i.showDetails,showTitle:s?this._config?.showTitle??i.showTitle:i.showTitle,showArtist:s?this._config?.showArtist??i.showArtist:i.showArtist,showAlbum:s?this._config?.showAlbum??i.showAlbum:i.showAlbum,reserveDetailsSpace:s?this._config?.reserveDetailsSpace??i.reserveDetailsSpace:i.reserveDetailsSpace,showPlaybackControls:s?this._config?.showPlaybackControls??i.showPlaybackControls:i.showPlaybackControls,showPowerButton:s?this._config?.showPowerButton??i.showPowerButton:i.showPowerButton,showVolumeControl:s?this._config?.showVolumeControl??i.showVolumeControl:i.showVolumeControl,showSongActions:s?this._config?.showSongActions??i.showSongActions:i.showSongActions,showProgressBar:s?this._config?.showProgressBar??i.showProgressBar:i.showProgressBar,showProgressTime:s?this._config?.showProgressTime??i.showProgressTime:i.showProgressTime,showAccountSwitch:!1!==this._config?.showAccountSwitch,stationDisplay:s?this._config?.stationDisplay??i.stationDisplay:i.stationDisplay},[t]:o.checked},r=Rt(a);a.mode=r,this._config=a,this._fireConfigChanged()}_renderCheckbox(t,e,o,n=!1,i=!1){return V`
      <div class="checkbox-row ${n?"indent":""} ${i?"disabled":""}">
        <ha-checkbox
          .checked=${o}
          .disabled=${i}
          @change=${e=>this._handleCheckboxChange(t,e)}
        ></ha-checkbox>
        <span 
          class="checkbox-label"
          @click=${()=>{if(i)return;const e=this.shadowRoot?.querySelector(`ha-checkbox[data-key="${t}"]`);e&&e.click()}}
        >${e}</span>
      </div>
    `}_supportsStations(){if(!this.hass||!this._config?.entity)return!1;const t=this.hass.states[this._config.entity],e=t?.attributes?.stations;return Array.isArray(e)&&e.length>0}_supportsMultipleAccounts(){if(!this.hass||!this._config?.entity)return!1;const t=this.hass.states[this._config.entity],e=t?.attributes?.accounts;return Array.isArray(e)&&e.length>1}_renderControlsTab(){const t=this._config?.mode||"default",e=zt(t),o="custom"===t,n=o?this._config?.showPlaybackControls??e.showPlaybackControls:e.showPlaybackControls,i=o?this._config?.showPowerButton??e.showPowerButton:e.showPowerButton,s=o?this._config?.showSongActions??e.showSongActions:e.showSongActions,a=o?this._config?.showProgressBar??e.showProgressBar:e.showProgressBar,r=o?this._config?.showProgressTime??e.showProgressTime:e.showProgressTime,c=o?this._config?.showVolumeControl??e.showVolumeControl:e.showVolumeControl,d=o?this._config?.showDetails??e.showDetails:e.showDetails,l=o?this._config?.showTitle??e.showTitle:e.showTitle,h=o?this._config?.showArtist??e.showArtist:e.showArtist,p=o?this._config?.showAlbum??e.showAlbum:e.showAlbum,u=o?this._config?.reserveDetailsSpace??e.reserveDetailsSpace:e.reserveDetailsSpace,g=!1!==this._config?.showAccountSwitch,m=this._supportsRating,b=this._supportsMultipleAccounts(),_=t=>te(this.hass,t);return V`
      ${this._renderCheckbox("showPlaybackControls",_("editor.checkbox_show_playback"),n)}
      ${this._renderCheckbox("showPowerButton",_("editor.checkbox_show_power"),i,!0,!n)}
      ${this._renderCheckbox("showSongActions",_("editor.checkbox_show_thumbs"),!!m&&s,!0,!n||!m)}

      ${this._renderCheckbox("showProgressBar",_("editor.checkbox_show_progress"),a)}
      ${this._renderCheckbox("showProgressTime",_("editor.checkbox_show_progress_time"),r,!0,!a)}

      ${this._renderCheckbox("showVolumeControl",_("editor.checkbox_show_volume"),c)}

      ${b?this._renderCheckbox("showAccountSwitch",_("editor.checkbox_show_account_switch"),g):V`<p class="helper-text">${_("editor.helper_switch_account_multi")}</p>`}

      ${this._renderCheckbox("showDetails",_("editor.checkbox_show_details"),d)}
      ${this._renderCheckbox("showTitle",_("editor.checkbox_show_title"),l,!0,!d)}
      ${this._renderCheckbox("showArtist",_("editor.checkbox_show_artist"),h,!0,!d)}
      ${this._renderCheckbox("showAlbum",_("editor.checkbox_show_album"),p,!0,!d)}
      ${this._renderCheckbox("reserveDetailsSpace",_("editor.checkbox_reserve_space"),u,!0,!d)}
    `}_renderAdvancedTab(){return V`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${xe}
        .computeLabel=${this._computeLabel}
        .computeHelper=${this._computeHelper}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `}_renderDebugActionsTab(){const t=t=>te(this.hass,t);return V`
      <p class="helper-text">${t("editor.debug_help")}</p>
      <div class="section-title">${t("editor.debug_new_way")}</div>
      ${this._newWayError?V`<div class="debug-error">${t("editor.debug_error")}: ${this._newWayError}</div>
      ${this._newWayRawResponseStr?V`<div class="debug-raw">${t("editor.debug_raw")}: ${this._newWayRawResponseStr}${this._newWayRawResponseStr.length>=600?"…":""}</div>`:H}`:H}
      <div class="debug-list">
        ${this._newWayActions.length>0?this._newWayActions.join(", "):t("editor.debug_none")}
      </div>
      <div class="section-title">${t("editor.debug_old_way")}</div>
      <div class="debug-list">
        ${this._oldWayActions.length>0?this._oldWayActions.join(", "):t("editor.debug_none")}
      </div>
    `}render(){if(!this.hass||!this._config)return V``;const t=t=>te(this.hass,t),e=[{id:"general",label:t("editor.tab_general")},{id:"appearance",label:t("editor.tab_appearance")},{id:"controls",label:t("editor.tab_controls")},{id:"advanced",label:t("editor.tab_advanced")}];return V`
      <div class="card-config">
        <div class="tabs">
          ${e.map(t=>V`
              <button
                class="tab ${this._activeTab===t.id?"active":""}"
                @click=${()=>this._setActiveTab(t.id)}
                type="button"
              >
                ${t.label}
              </button>
            `)}
        </div>

        <div class="tab-content ${"general"===this._activeTab?"active":""}">
          ${this._renderGeneralTab()}
        </div>
        <div class="tab-content ${"appearance"===this._activeTab?"active":""}">
          ${this._renderAppearanceTab()}
        </div>
        <div class="tab-content ${"controls"===this._activeTab?"active":""}">
          ${this._renderControlsTab()}
        </div>
        <div class="tab-content ${"advanced"===this._activeTab?"active":""}">
          ${this._renderAdvancedTab()}
        </div>
        ${H}

        <div class="version-info">
          ${te(this.hass,"editor.build")}: ${ve}
        </div>
      </div>
    `}};$e.styles=a`
    :host {
      display: block;
    }
    .card-config {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .tabs {
      display: flex;
      border-bottom: 1px solid var(--divider-color);
      margin-bottom: 8px;
    }
    .tab {
      padding: 8px 16px;
      cursor: pointer;
      border: none;
      background: none;
      font-size: 0.875rem;
      color: var(--secondary-text-color);
      border-bottom: 2px solid transparent;
      transition: all 0.2s;
    }
    .tab:hover {
      color: var(--primary-text-color);
    }
    .tab.active {
      color: var(--primary-color);
      border-bottom-color: var(--primary-color);
    }
    .tab-content {
      display: none;
    }
    .tab-content.active {
      display: block;
    }
    .section-title {
      font-weight: 500;
      margin-bottom: 4px;
      margin-top: 8px;
      color: var(--primary-text-color);
      font-size: 0.875rem;
    }
    .helper-text {
      font-size: 0.75rem;
      color: var(--secondary-text-color);
      margin-top: 2px;
    }
    ha-form {
      display: block;
    }
    .version-info {
      margin-top: 8px;
      padding-top: 8px;
      border-top: 1px solid var(--divider-color);
      font-size: 0.7rem;
      color: var(--secondary-text-color);
      opacity: 0.7;
    }
    .options-group {
      margin-bottom: 12px;
    }
    .options-group-title {
      font-size: 0.8rem;
      font-weight: 500;
      margin-bottom: 4px;
      color: var(--secondary-text-color);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .checkbox-row {
      display: flex;
      align-items: center;
      padding: 2px 0;
    }
    .checkbox-row.indent {
      padding-left: 24px;
    }
    .checkbox-row ha-checkbox {
      margin-right: 4px;
    }
    .checkbox-label {
      font-size: 0.875rem;
      color: var(--primary-text-color);
      cursor: pointer;
      flex: 1;
    }
    .checkbox-row.indent .checkbox-label {
      color: var(--secondary-text-color);
    }
    .checkbox-row.disabled {
      opacity: 0.5;
      pointer-events: none;
    }
    .debug-error {
      font-size: 0.75rem;
      color: var(--error-color);
      background: var(--ha-card-background);
      border: 1px solid var(--divider-color);
      border-radius: 4px;
      padding: 8px;
      margin: 4px 0;
      word-break: break-word;
    }
    .debug-list {
      font-size: 0.8rem;
      font-family: var(--code-font-family, monospace);
      color: var(--secondary-text-color);
      margin: 4px 0;
    }
    .debug-raw {
      font-size: 0.7rem;
      font-family: var(--code-font-family, monospace);
      color: var(--secondary-text-color);
      background: var(--ha-card-background);
      border: 1px solid var(--divider-color);
      border-radius: 4px;
      padding: 6px;
      margin: 4px 0;
      word-break: break-all;
    }
  `,t([ut({attribute:!1})],$e.prototype,"hass",void 0),t([ut({attribute:!1})],$e.prototype,"lovelace",void 0),t([gt()],$e.prototype,"_config",void 0),t([gt()],$e.prototype,"_activeTab",void 0),t([gt()],$e.prototype,"_supportedActions",void 0),t([gt()],$e.prototype,"_supportsRating",void 0),t([gt()],$e.prototype,"_newWayActions",void 0),t([gt()],$e.prototype,"_newWayError",void 0),t([gt()],$e.prototype,"_newWayRawResponseStr",void 0),t([gt()],$e.prototype,"_oldWayActions",void 0),$e=t([lt("pianobar-card-editor")],$e);console.info("%c PIANOBAR-MEDIA-PLAYER-CARD %c 1.0.0 ","color: white; background: #764ba2; font-weight: bold;","color: #764ba2; background: white; font-weight: bold;"),window.customCards=window.customCards||[],window.customCards.push({type:"pianobar-media-player-card",name:"Pianobar Media Player Card",description:"A custom media player card for Pianobar with thumbs up/down and volume override",preview:!0});let ke=class extends ct{constructor(){super(...arguments),this._cardHeight=0,this._stationPopupOpen=!1,this._ratingsPopupOpen=!1,this._upcomingPopupOpen=!1,this._stationModePopupOpen=!1,this._upcomingSongs=[],this._stationModes=[],this._stationModesLoading=!1,this._openQuickMixPopup=!1,this._openRenameDialog=!1,this._openDeleteDialog=!1,this._openStationInfoPopup=!1,this._stationInfo=null,this._stationInfoLoading=!1,this._openAddMusicPopup=!1,this._searchResults={categories:[]},this._searchLoading=!1,this._openCreateStationModal=!1,this._genreCategories=[],this._genreLoading=!1,this._openAccountPopup=!1,this._createStationModalRef=new Et,this._tallArtworkError=!1}static getConfigElement(){return document.createElement("pianobar-card-editor")}static getStubConfig(){return{type:"custom:pianobar-media-player-card",entity:"",mode:"default"}}setConfig(t){if(!t.entity)throw new Error("Please define an entity");this._config=t,this._resolvedConfig=function(t){const e=t.mode||"default",o=Tt[e];if("custom"===e)return{entity:t.entity,mode:e,artwork:t.artwork??o.artwork,showDetails:t.showDetails??o.showDetails,showTitle:t.showTitle??o.showTitle,showArtist:t.showArtist??o.showArtist,showAlbum:t.showAlbum??o.showAlbum,reserveDetailsSpace:t.reserveDetailsSpace??o.reserveDetailsSpace,showVolumeControl:t.showVolumeControl??o.showVolumeControl,showSongActions:t.showSongActions??o.showSongActions,showProgressBar:t.showProgressBar??o.showProgressBar,showProgressTime:t.showProgressTime??o.showProgressTime,showPlaybackControls:t.showPlaybackControls??o.showPlaybackControls,showPowerButton:t.showPowerButton??o.showPowerButton,showAccountSwitch:!1!==t.showAccountSwitch,stationDisplay:t.stationDisplay??o.stationDisplay,tallArtworkSize:Dt(t.tallArtworkSize),volume_entity:t.volume_entity,name:t.name,supported_actions:t.supported_actions};const n="tall"===e?Dt(t.tallArtworkSize):80;return{entity:t.entity,mode:e,artwork:o.artwork,showDetails:o.showDetails,showTitle:o.showTitle,showArtist:o.showArtist,showAlbum:o.showAlbum,reserveDetailsSpace:o.reserveDetailsSpace,showVolumeControl:o.showVolumeControl,showSongActions:o.showSongActions,showProgressBar:o.showProgressBar,showProgressTime:o.showProgressTime,showPlaybackControls:o.showPlaybackControls,showPowerButton:o.showPowerButton,showAccountSwitch:!1!==t.showAccountSwitch,stationDisplay:o.stationDisplay,tallArtworkSize:n,volume_entity:t.volume_entity,name:t.name,supported_actions:t.supported_actions}}(t)}disconnectedCallback(){super.disconnectedCallback(),this._resizeObserver?.disconnect()}firstUpdated(){this._setupResizeObserver()}_setupResizeObserver(){this._resizeObserver=new ResizeObserver(t=>{for(const e of t){const t=e.contentRect.height;t!==this._cardHeight&&(this._cardHeight=t)}});const t=this.shadowRoot?.querySelector("ha-card");t?this._resizeObserver.observe(t):this._resizeObserver.observe(this)}getCardSize(){return"minimal"===this._resolvedConfig?.mode?2:"full-cover"===this._resolvedConfig?.artwork?4:3}updated(t){if(super.updated(t),this._resolvedConfig)if(this.setAttribute("artwork-mode",this._resolvedConfig.artwork),this.setAttribute("mode",this._resolvedConfig.mode),"tall"===this._resolvedConfig.artwork){const t=this._resolvedConfig.tallArtworkSize??80;this.style.setProperty("--pmc-tall-artwork-width",`${t}%`)}else this.style.removeProperty("--pmc-tall-artwork-width");if(t.has("hass")&&this.hass&&this._config?.entity){const t=this.hass.states[this._config.entity];if(t){const e=t.attributes.entity_picture;e&&e!==this._lastImageUrl&&(this._lastImageUrl=e,this._tallArtworkError=!1,this._updateColors(e))}}}async _updateColors(t){const e="full-cover"===this._resolvedConfig?.artwork?await async function(t){const e=await Gt(t);if(!t)return e;const o=`regional:${t}`,n=Vt.get(o);if(n)return n;try{const n=new Image;n.crossOrigin="anonymous",await new Promise((e,o)=>{n.onload=()=>e(),n.onerror=()=>o(new Error("Failed to load image")),n.src=t});const i=document.createElement("canvas"),s=i.getContext("2d");if(!s)return e;const a=100,r=Math.min(a/n.width,a/n.height);i.width=Math.floor(n.width*r),i.height=Math.floor(n.height*r),s.drawImage(n,0,0,i.width,i.height);const c=s.getImageData(0,0,i.width,i.height);let d,l;try{const[t,e]=await Wt(i,Xt);d=Zt(Jt(c,Xt,i.width,i.height),t,0)}catch(t){console.warn("Failed to extract vibrant colors from metadata region:",t),d=Zt(Jt(c,Xt,i.width,i.height),null,0)}try{const[t,e]=await Wt(i,Yt);l=Zt(Jt(c,Yt,i.width,i.height),t,0)}catch(t){console.warn("Failed to extract vibrant colors from controls region:",t),l=Zt(Jt(c,Yt,i.width,i.height),null,0)}const h={...e,metadataForeground:d,controlsForeground:l};return Vt.set(o,h),h}catch(t){return console.error("Error extracting regional colors:",t),e}}(t):await Gt(t);this._extractedColors=e}_getEntity(){if(this.hass&&this._config?.entity)return this.hass.states[this._config.entity]}_getVolumeEntity(){if(!this.hass)return;const t=this._resolvedConfig?.volume_entity||this._config?.entity;return t?this.hass.states[t]:void 0}_isPlaying(t){return"playing"===t.state}_isUnavailable(t){return"unavailable"===t.state||"unknown"===t.state}_getEffectiveSupportedActions(){const t=this._resolvedConfig?.supported_actions??this._config?.supported_actions;if(t&&t.length>0)return t;const e=this._getEntity();return e?.attributes?.supported_actions||[]}_isUsingSupportedActionsFallback(){const t=this._resolvedConfig?.supported_actions??this._config?.supported_actions;if(t&&t.length>0)return!1;const e=this._getEntity();return(e?.attributes?.supported_actions||[]).length>0}_supportsLove(){return this._getEffectiveSupportedActions().includes("love_song")}_supportsBan(){return this._getEffectiveSupportedActions().includes("ban_song")}_supportsTired(){return this._getEffectiveSupportedActions().includes("tired_of_song")}_supportsAnyRating(){const t=this._getEffectiveSupportedActions();return t.includes("love_song")||t.includes("ban_song")||t.includes("tired_of_song")}async _handlePlayPause(){const t=this._getEntity();t&&this.hass&&await this.hass.callService("media_player","media_play_pause",void 0,{entity_id:t.entity_id})}async _handleNextTrack(){const t=this._getEntity();t&&this.hass&&await this.hass.callService("media_player","media_next_track",void 0,{entity_id:t.entity_id})}async _handlePowerToggle(){const t=this._getEntity();if(!t||!this.hass)return;const e="off"!==t.state&&"unavailable"!==t.state?"turn_off":"turn_on";await this.hass.callService("media_player",e,void 0,{entity_id:t.entity_id})}async _handleVolumeChange(t){const e=this._getVolumeEntity();if(!e||!this.hass)return;const o=t.detail.volume;await this.hass.callService("media_player","volume_set",{volume_level:o},{entity_id:e.entity_id})}async _handleMuteToggle(){const t=this._getVolumeEntity();t&&this.hass&&await this.hass.callService("media_player","volume_mute",{is_volume_muted:!t.attributes.is_volume_muted},{entity_id:t.entity_id})}async _handleLoveSong(){const t=this._getEntity();t&&this.hass&&await this.hass.callService("pianobar","love_song",{entity_id:t.entity_id})}async _handleBanSong(){const t=this._getEntity();t&&this.hass&&await this.hass.callService("pianobar","ban_song",{entity_id:t.entity_id})}async _handleTiredSong(){const t=this._getEntity();t&&this.hass&&await this.hass.callService("pianobar","tired_of_song",{entity_id:t.entity_id})}async _handleStationChange(t){const e=this._getEntity();if(!e||!this.hass)return;const{stationName:o}=t.detail;await this.hass.callService("media_player","select_source",{source:o},{entity_id:e.entity_id})}_renderArtwork(t){const e=t.attributes.media_image_url||t.attributes.entity_picture;return e?V`<img class="artwork" src="${e}" alt=${te(this.hass,"card.album_art_alt")} />`:V`
      <div class="artwork-placeholder">
        <ha-icon icon="mdi:music"></ha-icon>
      </div>
    `}_renderMediaInfo(t){if(!(this._resolvedConfig?.showDetails??!0))return H;const e=t.attributes.media_title||te(this.hass,"card.no_media"),o=t.attributes.media_artist||"",n=t.attributes.media_album_name||"",i=this._resolvedConfig?.showTitle??!0,s=this._resolvedConfig?.showArtist??!0,a=this._resolvedConfig?.showAlbum??!0,r="tall"===this._resolvedConfig?.artwork,c="normal"===(this._resolvedConfig?.stationDisplay??"hidden")&&!r,d=t.attributes.stations||[],l=t.attributes.source||"",h=d.find(t=>t.name===l),p=h?.isQuickMix??!1,u=t.attributes.song_station_name||"",g=p&&u?u:l,m=p?"mdi:shuffle":"mdi:radio";return i||s||a||c?V`
      <div class="media-info">
        ${i?V`<p class="title">${e}</p>`:H}
        ${s&&o?V`<p class="artist">${o}</p>`:H}
        ${a&&n?V`<p class="album">${n}</p>`:H}
        ${c&&(g||d.length>0)?V`
          <p class="station-info clickable" @click=${this._handleOpenStationPopup}>
            <ha-icon icon="${g?m:"mdi:radio"}"></ha-icon>
            <span>${g||te(this.hass,"card.select_station")}</span>
          </p>
        `:H}
      </div>
    `:H}_renderProgressBar(t){if(!this._resolvedConfig?.showProgressBar)return H;const e=t.attributes.media_duration||0,o=t.attributes.media_position||0,n=t.attributes.media_position_updated_at||"",i=t.attributes.entity_picture,s="tall"===this._resolvedConfig?.artwork,a=!!i&&!s,r="full-cover"===this._resolvedConfig?.artwork?this._extractedColors?.controlsForeground||this._extractedColors?.foreground||"var(--pmc-primary-text-color)":this._extractedColors?.foreground||"var(--pmc-primary-text-color)",c=this._resolvedConfig?.showProgressTime??!1,d=this._isPlaying(t);return V`
      <pmc-progress-bar
        .duration=${e}
        .position=${o}
        .positionUpdatedAt=${n}
        .showTime=${c}
        .isPlaying=${d}
        style="color: ${a?r:"inherit"}"
      ></pmc-progress-bar>
    `}_renderVolumeControl(){if(!this._resolvedConfig?.showVolumeControl)return H;const t=this._getVolumeEntity();if(!t)return H;const e=t.attributes.volume_level??.5,o=t.attributes.is_volume_muted??!1,n=this._isUnavailable(t),i=this._getEntity(),s="tall"===this._resolvedConfig?.artwork,a="full-cover"===this._resolvedConfig?.artwork,r=!!i?.attributes.entity_picture&&!s,c=a?this._extractedColors?.controlsForeground||this._extractedColors?.foreground||"var(--pmc-primary-text-color)":this._extractedColors?.foreground||"var(--pmc-primary-text-color)";return V`
      <pmc-volume-slider
        .hass=${this.hass}
        .volume=${e}
        .muted=${o}
        .disabled=${n}
        .sliderColor=${r?c:"var(--pmc-primary-text-color)"}
        style="color: ${r?c:"inherit"}"
        @volume-change=${this._handleVolumeChange}
        @mute-toggle=${this._handleMuteToggle}
      ></pmc-volume-slider>
    `}_renderPlaybackControls(t){if(!this._resolvedConfig?.showPlaybackControls)return H;const e=this._isPlaying(t),o=this._isUnavailable(t),n=this._resolvedConfig?.showPowerButton??!1,i="off"!==t.state&&"unavailable"!==t.state;return V`
      <pmc-playback-controls
        .hass=${this.hass}
        .playing=${e}
        .disabled=${o}
        .showPower=${n}
        .isOn=${i}
        @play-pause=${this._handlePlayPause}
        @next-track=${this._handleNextTrack}
        @power-toggle=${this._handlePowerToggle}
      ></pmc-playback-controls>
    `}_renderSongActions(t){if(!this._resolvedConfig?.showSongActions)return H;if(!!!t.attributes.media_title)return H;const e=this._supportsLove(),o=this._supportsBan(),n=this._supportsTired();if(!e&&!o&&!n)return H;const i=t.attributes.rating||0,s=this._isUnavailable(t);return V`
      <pmc-song-actions-menu
        .hass=${this.hass}
        .rating=${i}
        .disabled=${s}
        .showLove=${e}
        .showBan=${o}
        .showTired=${n}
        @love-song=${this._handleLoveSong}
        @ban-song=${this._handleBanSong}
        @tired-song=${this._handleTiredSong}
      ></pmc-song-actions-menu>
    `}_renderStationSelector(t){if("compact"!==(this._resolvedConfig?.stationDisplay??"hidden"))return H;const e=t.attributes.stations||[];if(0===e.length)return H;const o=t.attributes.source||"",n=e.find(t=>t.name===o),i=n?.id||"",s=t.attributes.song_station_name||"",a=this._isUnavailable(t);return V`
      <pmc-station-selector
        .hass=${this.hass}
        .stations=${e}
        .currentStationId=${i}
        .currentStationName=${o}
        .songStationName=${s}
        .disabled=${a}
        @station-change=${this._handleStationChange}
      ></pmc-station-selector>
    `}_renderOverflowMenu(t){const e=this._getEffectiveSupportedActions(),o=t.attributes.stations||[],n=o.length>0,i=!!t.attributes.media_title,s=this._supportsAnyRating()&&i,a="off"!==t.state&&"unavailable"!==t.state,r=o.find(e=>e.id===t.attributes.media_content_id),c=a&&n&&r&&!r.isQuickMix&&(e.includes("get_station_modes")||e.includes("set_station_mode")),d=a&&n&&e.includes("set_quick_mix"),l=a&&n&&r&&e.includes("get_station_info"),h=a&&n&&r&&e.includes("add_seed"),p=n&&e.includes("create_station"),u=a&&n&&e.includes("rename_station"),g=a&&n&&e.includes("delete_station"),m=i&&e.includes("explain_song"),b=a&&e.includes("get_upcoming"),_=(t.attributes.accounts||[]).length>1&&!1!==this._resolvedConfig?.showAccountSwitch;return V`
      <pmc-overflow-menu
        class="overflow-menu"
        .hass=${this.hass}
        .entityId=${t.entity_id}
        .showStationOption=${n}
        .showRatingsOption=${s}
        .showExplainOption=${m}
        .showUpcomingOption=${b}
        .showStationModeOption=${c}
        .showQuickMixOption=${d}
        .showStationInfoOption=${l}
        .showAddMusicOption=${h}
        .showCreateStationOption=${p}
        .showRenameOption=${u}
        .showDeleteOption=${g}
        .showAccountSwitch=${_}
        .isOn=${a}
        .disabled=${this._isUnavailable(t)}
        .buildTime=${"2026-04-04T19:37:05.050Z"}
        .usingSupportedActionsFallback=${this._isUsingSupportedActionsFallback()}
        @more-info=${this._handleMoreInfo}
        @power-toggle=${this._handlePowerToggle}
        @select-station=${this._handleOpenStationPopup}
        @select-ratings=${this._handleOpenRatingsPopup}
        @explain-song=${this._handleExplainSong}
        @show-upcoming=${this._handleShowUpcoming}
        @station-mode=${this._handleStationMode}
        @quickmix=${this._handleQuickMix}
        @rename-station=${this._handleRenameStation}
        @delete-station=${this._handleDeleteStation}
        @station-info=${this._handleStationInfo}
        @add-music=${this._handleAddMusic}
        @create-station=${this._handleCreateStation}
        @switch-account=${this._handleOpenAccountPopup}
      ></pmc-overflow-menu>
    `}_handleMoreInfo(t){const e=new Event("hass-more-info",{composed:!0});e.detail={entityId:t.detail?.entityId},this.dispatchEvent(e)}async _handleExplainSong(){const t=this._getEntity();if(t&&this.hass)try{const e=await this.hass.connection.sendMessagePromise({type:"call_service",domain:"pianobar",service:"explain_song",service_data:{entity_id:t.entity_id},return_response:!0}),o=e?.response?.explanation||te(this.hass,"card.no_explanation"),n=new CustomEvent("hass-notification",{detail:{message:o,duration:8e3},bubbles:!0,composed:!0});this.dispatchEvent(n)}catch(t){console.error("Error explaining song:",t);const e=new CustomEvent("hass-notification",{detail:{message:te(this.hass,"card.toast_failed_explain"),duration:3e3},bubbles:!0,composed:!0});this.dispatchEvent(e)}}_handleOpenStationPopup(t){let e=t.detail?.anchorPosition;if(!e&&t.currentTarget){const o=t.currentTarget.getBoundingClientRect();e={left:o.left,top:o.top,bottom:o.bottom,right:o.right}}this._popupAnchorPosition=e,this._stationPopupOpen=!0}_handleStationPopupClosed(){this._stationPopupOpen=!1,this._popupAnchorPosition=void 0}_handleOpenRatingsPopup(t){this._popupAnchorPosition=t.detail?.anchorPosition,this._ratingsPopupOpen=!0}_handleRatingsPopupClosed(){this._ratingsPopupOpen=!1,this._popupAnchorPosition=void 0}async _handleShowUpcoming(t){const e=this._getEntity();if(e&&this.hass){this._upcomingPopupOpen=!1,await this.updateComplete,this._popupAnchorPosition=t.detail?.anchorPosition;try{const t=await this.hass.connection.sendMessagePromise({type:"call_service",domain:"pianobar",service:"get_upcoming",service_data:{entity_id:e.entity_id},return_response:!0});this._upcomingSongs=t?.response?.songs||[],this._upcomingPopupOpen=!0}catch(t){console.error("Error getting upcoming songs:",t);const e=new CustomEvent("hass-notification",{detail:{message:te(this.hass,"card.toast_failed_upcoming"),duration:3e3},bubbles:!0,composed:!0});this.dispatchEvent(e)}}}_handleUpcomingPopupClosed(){this._upcomingPopupOpen=!1,this._popupAnchorPosition=void 0}async _handleStationMode(t){const e=this._getEntity();if(e&&this.hass){this._stationModePopupOpen=!1,await this.updateComplete,this._popupAnchorPosition=t.detail?.anchorPosition,this._stationModesLoading=!0,this._stationModePopupOpen=!0;try{const t=e.attributes.media_content_id;if(!t)throw new Error("No station selected");const o=await this.hass.connection.sendMessagePromise({type:"call_service",domain:"pianobar",service:"get_station_modes",service_data:{entity_id:e.entity_id,station_id:t},return_response:!0});this._stationModes=o?.response?.modes||[]}catch(t){console.error("Error getting station modes:",t);const e=new CustomEvent("hass-notification",{detail:{message:te(this.hass,"card.toast_failed_station_modes"),duration:3e3},bubbles:!0,composed:!0});this.dispatchEvent(e),this._stationModePopupOpen=!1}finally{this._stationModesLoading=!1}}}_handleStationModePopupClosed(){this._stationModePopupOpen=!1,this._popupAnchorPosition=void 0,this._stationModes=[]}async _handleSetStationMode(t){const e=this._getEntity();if(!e||!this.hass)return;const{stationId:o,modeId:n}=t.detail;try{await this.hass.callService("pianobar","set_station_mode",{entity_id:e.entity_id,station_id:o,mode_id:n});const t=new CustomEvent("hass-notification",{detail:{message:te(this.hass,"card.toast_station_mode_updated"),duration:2e3},bubbles:!0,composed:!0});this.dispatchEvent(t)}catch(t){console.error("Error setting station mode:",t);const e=new CustomEvent("hass-notification",{detail:{message:te(this.hass,"card.toast_failed_set_station_mode"),duration:3e3},bubbles:!0,composed:!0});this.dispatchEvent(e)}}async _handleOpenAccountPopup(t){!1!==this._resolvedConfig?.showAccountSwitch&&(this._openAccountPopup=!1,await this.updateComplete,this._popupAnchorPosition=t.detail?.anchorPosition,this._openAccountPopup=!0)}_handleAccountPopupClosed(){this._openAccountPopup=!1,this._popupAnchorPosition=void 0}async _handleAccountSelect(t){const e=this._getEntity();if(!e||!this.hass)return;const{accountId:o}=t.detail;try{await this.hass.callService("pianobar","switch_account",{entity_id:e.entity_id,account_id:o})}catch(t){console.error("Error switching account:",t);const e=new CustomEvent("hass-notification",{detail:{message:te(this.hass,"card.toast_failed_switch_account"),duration:3e3},bubbles:!0,composed:!0});this.dispatchEvent(e)}}async _handleQuickMix(t){this._openQuickMixPopup=!1,await this.updateComplete,this._popupAnchorPosition=t.detail?.anchorPosition,this._openQuickMixPopup=!0}_handleQuickMixPopupClosed(){this._openQuickMixPopup=!1,this._popupAnchorPosition=void 0}async _handleQuickMixSave(t){const e=this._getEntity();if(!e||!this.hass)return;const{stationIds:o}=t.detail;try{await this.hass.callService("pianobar","set_quick_mix",{entity_id:e.entity_id,station_ids:o});const t=new CustomEvent("hass-notification",{detail:{message:te(this.hass,"card.toast_quickmix_updated"),duration:2e3},bubbles:!0,composed:!0});this.dispatchEvent(t),this._handleQuickMixPopupClosed()}catch(t){console.error("Error updating QuickMix:",t);const e=new CustomEvent("hass-notification",{detail:{message:te(this.hass,"card.error_quickmix"),duration:3e3},bubbles:!0,composed:!0});this.dispatchEvent(e)}}async _handleRenameStation(t){this._openRenameDialog=!1,await this.updateComplete,this._popupAnchorPosition=t.detail?.anchorPosition,this._openRenameDialog=!0}_handleRenameDialogClosed(){this._openRenameDialog=!1,this._popupAnchorPosition=void 0}async _handleRenameStationSubmit(t){const e=this._getEntity();if(!e||!this.hass)return;const{stationId:o,newName:n}=t.detail;try{await this.hass.callService("pianobar","rename_station",{entity_id:e.entity_id,station_id:o,name:n});const t=new CustomEvent("hass-notification",{detail:{message:`Station renamed to "${n}"`,duration:2e3},bubbles:!0,composed:!0});this.dispatchEvent(t),this._handleRenameDialogClosed(),setTimeout(()=>{this.requestUpdate()},500)}catch(t){console.error("Error renaming station:",t);const e=new CustomEvent("hass-notification",{detail:{message:te(this.hass,"card.error_rename"),duration:3e3},bubbles:!0,composed:!0});this.dispatchEvent(e)}}async _handleDeleteStation(t){this._openDeleteDialog=!1,await this.updateComplete,this._popupAnchorPosition=t.detail?.anchorPosition,this._openDeleteDialog=!0}_handleDeleteDialogClosed(){this._openDeleteDialog=!1,this._popupAnchorPosition=void 0}async _handleDeleteStationSubmit(t){const e=this._getEntity();if(!e||!this.hass)return;const{stationId:o,stationName:n}=t.detail;try{await this.hass.callService("pianobar","delete_station",{entity_id:e.entity_id,station_id:o});const t=new CustomEvent("hass-notification",{detail:{message:`Station "${n}" deleted`,duration:2e3},bubbles:!0,composed:!0});this.dispatchEvent(t),this._handleDeleteDialogClosed()}catch(t){console.error("Error deleting station:",t);const e=new CustomEvent("hass-notification",{detail:{message:te(this.hass,"card.error_delete_station"),duration:3e3},bubbles:!0,composed:!0});this.dispatchEvent(e)}}async _handleStationInfo(t){const e=this._getEntity();if(e&&this.hass){this._stationInfo=null,this._stationInfoLoading=!0,this._popupAnchorPosition=t.detail?.anchorPosition,this._openStationInfoPopup=!0;try{const t=e.attributes.media_content_id;if(!t)throw new Error("No station selected");const o=await this.hass.connection.sendMessagePromise({type:"call_service",domain:"pianobar",service:"get_station_info",service_data:{entity_id:e.entity_id,station_id:t},return_response:!0});this._stationInfo={artistSeeds:o?.response?.artistSeeds||[],songSeeds:o?.response?.songSeeds||[],stationSeeds:o?.response?.stationSeeds||[],feedback:o?.response?.feedback||[]}}catch(t){console.error("Error fetching station info:",t),this._stationInfo=null;const e=new CustomEvent("hass-notification",{detail:{message:te(this.hass,"card.error_station_info"),duration:3e3},bubbles:!0,composed:!0});this.dispatchEvent(e)}finally{this._stationInfoLoading=!1}}}_handleStationInfoPopupClosed(){this._openStationInfoPopup=!1,this._stationInfo=null,this._popupAnchorPosition=void 0}async _handleDeleteSeed(t){const e=this._getEntity();if(!e||!this.hass)return;const{seedId:o,seedType:n,stationId:i}=t.detail;try{await this.hass.callService("pianobar","delete_seed",{entity_id:e.entity_id,seed_id:o,seed_type:n,station_id:i});const t=new CustomEvent("hass-notification",{detail:{message:te(this.hass,"card.toast_seed_deleted"),duration:2e3},bubbles:!0,composed:!0});this.dispatchEvent(t),this._handleStationInfo({detail:{}})}catch(t){console.error("Error deleting seed:",t);const e=new CustomEvent("hass-notification",{detail:{message:te(this.hass,"card.error_delete_seed"),duration:3e3},bubbles:!0,composed:!0});this.dispatchEvent(e)}}async _handleDeleteFeedback(t){const e=this._getEntity();if(!e||!this.hass)return;const{feedbackId:o,stationId:n}=t.detail;try{await this.hass.callService("pianobar","delete_feedback",{entity_id:e.entity_id,feedback_id:o,station_id:n});const t=new CustomEvent("hass-notification",{detail:{message:te(this.hass,"card.toast_feedback_deleted"),duration:2e3},bubbles:!0,composed:!0});this.dispatchEvent(t),this._handleStationInfo({detail:{}})}catch(t){console.error("Error deleting feedback:",t);const e=new CustomEvent("hass-notification",{detail:{message:te(this.hass,"card.error_delete_feedback"),duration:3e3},bubbles:!0,composed:!0});this.dispatchEvent(e)}}async _handleAddMusic(t){this._openAddMusicPopup=!1,await this.updateComplete,this._popupAnchorPosition=t.detail?.anchorPosition,this._openAddMusicPopup=!0,this._searchResults={categories:[]},this._searchLoading=!1}_handleAddMusicPopupClosed(){this._openAddMusicPopup=!1,this._searchResults={categories:[]},this._searchLoading=!1,this._popupAnchorPosition=void 0}async _handleMusicSearch(t){const e=this._getEntity();if(!e||!this.hass)return;const{query:o}=t.detail;this._searchLoading=!0;try{const t=await this.hass.connection.sendMessagePromise({type:"call_service",domain:"pianobar",service:"search",service_data:{entity_id:e.entity_id,query:o},return_response:!0});console.log("Music search response:",t),console.log("Response.response:",t?.response),console.log("Categories:",t?.response?.categories),this._searchResults={categories:t?.response?.categories||[]}}catch(t){console.error("Error searching:",t),this._searchResults={categories:[]};const e=new CustomEvent("hass-notification",{detail:{message:te(this.hass,"card.error_search_music"),duration:3e3},bubbles:!0,composed:!0});this.dispatchEvent(e)}finally{this._searchLoading=!1}}async _handleAddMusicSubmit(t){const e=this._getEntity();if(!e||!this.hass)return;const{musicId:o,stationId:n}=t.detail;try{await this.hass.callService("pianobar","add_seed",{entity_id:e.entity_id,music_id:o,station_id:n});const t=new CustomEvent("hass-notification",{detail:{message:te(this.hass,"card.toast_music_added"),duration:2e3},bubbles:!0,composed:!0});this.dispatchEvent(t),this._handleAddMusicPopupClosed()}catch(t){console.error("Error adding music:",t);const e=new CustomEvent("hass-notification",{detail:{message:te(this.hass,"card.error_add_music"),duration:3e3},bubbles:!0,composed:!0});this.dispatchEvent(e)}}async _handleCreateStation(t){this._openCreateStationModal=!1,await this.updateComplete,this._popupAnchorPosition=t.detail?.anchorPosition,this._openCreateStationModal=!0,this._searchResults={categories:[]},this._genreCategories=[],this._searchLoading=!1,this._genreLoading=!1}_handleCreateStationModalClosed(){this._openCreateStationModal=!1,this._searchResults={categories:[]},this._genreCategories=[],this._searchLoading=!1,this._genreLoading=!1,this._popupAnchorPosition=void 0}async _handleCreateFromSong(){const t=this._getEntity();if(!t||!this.hass)return;if(t.attributes.media_content_id)try{await this.hass.callService("pianobar","create_station",{entity_id:t.entity_id,type:"song"}),this.dispatchEvent(new CustomEvent("hass-notification",{detail:{message:te(this.hass,"card.toast_station_created_song"),duration:2e3},bubbles:!0,composed:!0}))}catch(t){console.error("Error creating station:",t),this.dispatchEvent(new CustomEvent("hass-notification",{detail:{message:te(this.hass,"card.error_create_station"),duration:3e3},bubbles:!0,composed:!0}))}}async _handleCreateFromArtist(){const t=this._getEntity();if(!t||!this.hass)return;if(t.attributes.media_content_id)try{await this.hass.callService("pianobar","create_station",{entity_id:t.entity_id,type:"artist"}),this.dispatchEvent(new CustomEvent("hass-notification",{detail:{message:te(this.hass,"card.toast_station_created_artist"),duration:2e3},bubbles:!0,composed:!0}))}catch(t){console.error("Error creating station:",t),this.dispatchEvent(new CustomEvent("hass-notification",{detail:{message:te(this.hass,"card.error_create_station"),duration:3e3},bubbles:!0,composed:!0}))}}async _handleCreateStationSearch(t){console.log("[CARD] _handleCreateStationSearch called with:",t.detail);const e=this._getEntity();if(!e||!this.hass)return void console.log("[CARD] No entity or hass, returning");const{query:o}=t.detail;console.log("[CARD] Starting search for query:",o),this._searchLoading=!0;try{console.log("[CARD] Calling service with entity_id:",e.entity_id);const t=await this.hass.connection.sendMessagePromise({type:"call_service",domain:"pianobar",service:"search",service_data:{entity_id:e.entity_id,query:o},return_response:!0});console.log("[CARD] Create station search response:",t),console.log("[CARD] Response.response:",t?.response),console.log("[CARD] Categories:",t?.response?.categories),this._searchResults={categories:t?.response?.categories||[]},console.log("[CARD] Set _searchResults to:",this._searchResults),console.log("[CARD] Triggering update..."),this._createStationModalRef.value?(console.log("[CARD] Modal ref exists, updating searchResults and mode"),this._createStationModalRef.value.searchResults=this._searchResults,this._createStationModalRef.value._mode="search-results",this._createStationModalRef.value.requestUpdate()):(console.log("[CARD] No modal ref, using requestUpdate on card"),this.requestUpdate()),console.log("[CARD] After update, _searchResults is:",this._searchResults)}catch(t){console.error("[CARD] Error searching:",t),this._searchResults={categories:[]},this.dispatchEvent(new CustomEvent("hass-notification",{detail:{message:te(this.hass,"card.error_search_music"),duration:3e3},bubbles:!0,composed:!0}))}finally{this._searchLoading=!1,console.log("[CARD] Search loading finished")}}async _handleBrowseGenres(){const t=this._getEntity();if(t&&this.hass){this._genreLoading=!0;try{const e=await this.hass.connection.sendMessagePromise({type:"call_service",domain:"pianobar",service:"get_genres",service_data:{entity_id:t.entity_id},return_response:!0});this._genreCategories=e?.response?.categories||[]}catch(t){console.error("Error fetching genres:",t),this._genreCategories=[],this.dispatchEvent(new CustomEvent("hass-notification",{detail:{message:te(this.hass,"card.error_genres"),duration:3e3},bubbles:!0,composed:!0}))}finally{this._genreLoading=!1}}}async _handleCreateFromMusicId(t){const e=this._getEntity();if(!e||!this.hass)return;const{musicId:o}=t.detail;try{await this.hass.callService("pianobar","create_station_from_music_id",{entity_id:e.entity_id,music_id:o}),this.dispatchEvent(new CustomEvent("hass-notification",{detail:{message:te(this.hass,"card.toast_station_created"),duration:2e3},bubbles:!0,composed:!0}))}catch(t){console.error("Error creating station:",t),this.dispatchEvent(new CustomEvent("hass-notification",{detail:{message:te(this.hass,"card.error_create_station"),duration:3e3},bubbles:!0,composed:!0}))}}async _handleCreateFromShared(t){const e=this._getEntity();if(!e||!this.hass)return;const{stationId:o}=t.detail;try{await this.hass.callService("pianobar","add_shared_station",{entity_id:e.entity_id,station_id:o}),this.dispatchEvent(new CustomEvent("hass-notification",{detail:{message:te(this.hass,"card.toast_shared_station_added"),duration:2e3},bubbles:!0,composed:!0}))}catch(t){console.error("Error adding shared station:",t),this.dispatchEvent(new CustomEvent("hass-notification",{detail:{message:te(this.hass,"card.error_add_shared"),duration:3e3},bubbles:!0,composed:!0}))}}_renderStationPopup(t){if(!("normal"===(this._resolvedConfig?.stationDisplay??"hidden")||this._stationPopupOpen))return H;const e=t.attributes.stations||[];if(0===e.length)return H;const o=t.attributes.source||"",n=e.find(t=>t.name===o),i=n?.id||"",s=t.attributes.song_station_name||"",a=this._isUnavailable(t);return V`
      <pmc-station-selector
        .hass=${this.hass}
        .stations=${e}
        .currentStationId=${i}
        .currentStationName=${o}
        .songStationName=${s}
        .disabled=${a}
        .popupOnly=${!0}
        .externalOpen=${this._stationPopupOpen}
        .anchorPosition=${this._popupAnchorPosition}
        @station-change=${this._handleStationChange}
        @popup-closed=${this._handleStationPopupClosed}
      ></pmc-station-selector>
    `}_renderRatingsPopup(t){if(!this._ratingsPopupOpen)return H;const e=this._supportsLove(),o=this._supportsBan(),n=this._supportsTired();if(!e&&!o&&!n)return H;const i=t.attributes.rating||0,s=this._isUnavailable(t);return V`
      <pmc-song-actions-menu
        .hass=${this.hass}
        .rating=${i}
        .disabled=${s}
        .showLove=${e}
        .showBan=${o}
        .showTired=${n}
        .popupOnly=${!0}
        .externalOpen=${this._ratingsPopupOpen}
        .anchorPosition=${this._popupAnchorPosition}
        @love-song=${this._handleLoveSong}
        @ban-song=${this._handleBanSong}
        @tired-song=${this._handleTiredSong}
        @popup-closed=${this._handleRatingsPopupClosed}
      ></pmc-song-actions-menu>
    `}_renderUpcomingPopup(){return this._upcomingPopupOpen?V`
      <pmc-upcoming-songs-popup
        .hass=${this.hass}
        .externalOpen=${this._upcomingPopupOpen}
        .anchorPosition=${this._popupAnchorPosition}
        .songs=${this._upcomingSongs}
        @popup-closed=${this._handleUpcomingPopupClosed}
      ></pmc-upcoming-songs-popup>
    `:H}_renderStationModePopup(t){if(!this._stationModePopupOpen)return H;const e=t.attributes.stations||[],o=t.attributes.media_content_id,n=e.find(t=>t.id===o),i=n?.name||"";return V`
      <pmc-station-mode-popup
        .hass=${this.hass}
        .externalOpen=${this._stationModePopupOpen}
        .anchorPosition=${this._popupAnchorPosition}
        .currentStationId=${o}
        .currentStationName=${i}
        .modes=${this._stationModes}
        .loading=${this._stationModesLoading}
        @set-mode=${this._handleSetStationMode}
        @popup-closed=${this._handleStationModePopupClosed}
      ></pmc-station-mode-popup>
    `}_renderQuickMixPopup(t){if(!this._openQuickMixPopup)return H;const e=t.attributes.stations||[],o=this._isUnavailable(t);return V`
      <pmc-quickmix-popup
        .hass=${this.hass}
        .stations=${e}
        .disabled=${o}
        .externalOpen=${this._openQuickMixPopup}
        .anchorPosition=${this._popupAnchorPosition}
        @save=${this._handleQuickMixSave}
        @popup-closed=${this._handleQuickMixPopupClosed}
      ></pmc-quickmix-popup>
    `}_renderRenameDialog(t){if(!this._openRenameDialog)return H;const e=t.attributes.stations||[],o=this._isUnavailable(t);return V`
      <pmc-rename-dialog
        .hass=${this.hass}
        .stations=${e}
        .disabled=${o}
        .externalOpen=${this._openRenameDialog}
        .anchorPosition=${this._popupAnchorPosition}
        @rename-station=${this._handleRenameStationSubmit}
        @dialog-closed=${this._handleRenameDialogClosed}
      ></pmc-rename-dialog>
    `}_renderDeleteDialog(t){if(!this._openDeleteDialog)return H;const e=t.attributes.stations||[],o=this._isUnavailable(t);return V`
      <pmc-delete-dialog
        .hass=${this.hass}
        .stations=${e}
        .disabled=${o}
        .externalOpen=${this._openDeleteDialog}
        .anchorPosition=${this._popupAnchorPosition}
        @delete-station=${this._handleDeleteStationSubmit}
        @dialog-closed=${this._handleDeleteDialogClosed}
      ></pmc-delete-dialog>
    `}_renderStationInfoPopup(t){const e=t.attributes.stations||[],o=t.attributes.media_content_id,n=e.find(t=>t.id===o),i=n?.name||"",s=this._isUnavailable(t);return V`
      <pmc-station-info-popup
        .hass=${this.hass}
        .currentStationId=${o}
        .currentStationName=${i}
        .stationInfo=${this._stationInfo}
        .infoLoading=${this._stationInfoLoading}
        .disabled=${s}
        .externalOpen=${this._openStationInfoPopup}
        .anchorPosition=${this._popupAnchorPosition}
        @delete-seed=${this._handleDeleteSeed}
        @delete-feedback=${this._handleDeleteFeedback}
        @popup-closed=${this._handleStationInfoPopupClosed}
      ></pmc-station-info-popup>
    `}_renderAddMusicPopup(t){if(!this._openAddMusicPopup)return H;const e=t.attributes.stations||[],o=this._isUnavailable(t);return V`
      <pmc-add-music-popup
        .hass=${this.hass}
        .stations=${e}
        .searchResults=${this._searchResults}
        .searchLoading=${this._searchLoading}
        .disabled=${o}
        .externalOpen=${this._openAddMusicPopup}
        .anchorPosition=${this._popupAnchorPosition}
        @search=${this._handleMusicSearch}
        @add-music=${this._handleAddMusicSubmit}
        @popup-closed=${this._handleAddMusicPopupClosed}
      ></pmc-add-music-popup>
    `}_renderAccountPopup(t){if(!this._openAccountPopup)return H;if(!1===this._resolvedConfig?.showAccountSwitch)return H;const e=t.attributes.accounts||[],o=t.attributes.current_account,n=o?.id||"";return V`
      <pmc-account-selector-popup
        .hass=${this.hass}
        .externalOpen=${this._openAccountPopup}
        .anchorPosition=${this._popupAnchorPosition}
        .accounts=${e}
        .currentAccountId=${n}
        @account-select=${this._handleAccountSelect}
        @popup-closed=${this._handleAccountPopupClosed}
      ></pmc-account-selector-popup>
    `}_renderCreateStationModal(t){if(!this._openCreateStationModal)return H;this._isUnavailable(t);const e=t.attributes.media_title||"",o=t.attributes.media_artist||"",n=t.attributes.media_content_id||"";return V`
      <pmc-create-station-modal
        ${It(this._createStationModalRef)}
        .hass=${this.hass}
        .currentSongName=${e}
        .currentArtistName=${o}
        .currentTrackToken=${n}
        .searchResults=${this._searchResults}
        .genreCategories=${this._genreCategories}
        .searchLoading=${this._searchLoading}
        .genreLoading=${this._genreLoading}
        .externalOpen=${this._openCreateStationModal}
        .anchorPosition=${this._popupAnchorPosition}
        @create-from-song=${this._handleCreateFromSong}
        @create-from-artist=${this._handleCreateFromArtist}
        @search=${this._handleCreateStationSearch}
        @browse-genres=${this._handleBrowseGenres}
        @create-from-music-id=${this._handleCreateFromMusicId}
        @create-from-shared=${this._handleCreateFromShared}
        @popup-closed=${this._handleCreateStationModalClosed}
      ></pmc-create-station-modal>
    `}_renderStationPill(t){if("hidden"===(this._resolvedConfig?.stationDisplay??"hidden"))return H;const e=t.attributes.stations||[];if(0===e.length)return H;const o=t.attributes.source||"",n=e.find(t=>t.name===o),i=n?.isQuickMix??!1,s=t.attributes.song_station_name||"",a=i&&s?s:o,r=i?"mdi:shuffle":"mdi:radio";return V`
      <div class="station-pill" @click=${this._handleOpenStationPopup}>
        <ha-icon icon="${a?r:"mdi:radio"}"></ha-icon>
        <span>${a||te(this.hass,"card.select_station")}</span>
      </div>
    `}_handleTallArtworkError(){this._tallArtworkError=!0}render(){if(!this._config||!this.hass)return V``;const t=this._getEntity();if(!t)return V`
        <ha-card>
          <div class="unavailable-text">
            Entity not found: ${this._config.entity}
          </div>
        </ha-card>
      `;const e="tall"===this._resolvedConfig?.artwork,o=this._isUnavailable(t),n="full-cover"===this._resolvedConfig?.artwork,i=t.attributes.entity_picture,s=e?!!i&&"string"==typeof i&&i.length>0&&!this._tallArtworkError:!!i,a=this._extractedColors?.background||"var(--pmc-card-background)",r=this._extractedColors?.foreground||"var(--pmc-primary-text-color)",c=n&&this._extractedColors?.metadataForeground||r,d=n&&this._extractedColors?.controlsForeground||r,l=xt({"--pmc-extracted-bg":a,"--pmc-extracted-fg":r,backgroundColor:!e&&s?a:void 0}),h=xt({background:`linear-gradient(to left, transparent 0, ${a} ${this._cardHeight}px, ${a} 100%)`}),p=this._resolvedConfig?.showProgressBar,u=this._resolvedConfig?.showProgressTime,g=[s&&!e?"has-artwork":"",p?"has-progress":"",p&&u?"show-time":"",this._resolvedConfig?.reserveDetailsSpace??!0?"":"no-reserve"].filter(Boolean).join(" ");return V`
      <ha-card 
        style=${e?H:l} 
        class="${g}"
      >
        ${this._renderOverflowMenu(t)}

        ${e?V`
              ${s?V`
                    <div class="artwork-container">
                      <img 
                        class="artwork-image" 
                        src="${i}" 
                        alt=""
                        @error=${this._handleTallArtworkError}
                      />
                    </div>
                  `:V`
                    <div class="artwork-placeholder-tall">
                      <ha-icon icon="mdi:music"></ha-icon>
                    </div>
                  `}
            `:H}
        
        ${e||!s||n?H:V`
              <div class="artwork-container">
                <img class="artwork-image" src="${i}" alt="" />
              </div>
              <div class="artwork-gradient" style=${h}></div>
            `}
        
        ${!e&&n&&i?V`
              <div class="fullcover-background" style="background-image: url('${i}')"></div>
              <div class="fullcover-overlay"></div>
            `:H}

        <div class="card-content ${o?"unavailable":""}" 
             style="color: ${s&&!e?c:"inherit"}">
          ${this._renderMediaInfo(t)}
        </div>

        ${p?this._renderProgressBar(t):H}

        ${this._resolvedConfig?.showPlaybackControls||this._resolvedConfig?.showVolumeControl||this._resolvedConfig?.showSongActions||"compact"===this._resolvedConfig?.stationDisplay?V`
                <div class="controls-section" 
                     style="color: ${s&&!e?d:"inherit"}">
                  ${e?V`
                        ${this._renderVolumeControl()}
                        <div class="controls-row">
                          ${this._renderSongActions(t)}
                          ${this._renderPlaybackControls(t)}
                        </div>
                        ${this._renderStationPill(t)}
                      `:V`
                        <div class="controls-row">
                          ${this._renderPlaybackControls(t)}
                          <div class="controls-spacer"></div>
                          ${this._renderSongActions(t)}
                          ${this._renderStationSelector(t)}
                        </div>
                        ${this._renderVolumeControl()}
                      `}
                </div>
              `:H}

        ${this._renderStationPopup(t)}
        ${this._renderRatingsPopup(t)}
        ${this._renderUpcomingPopup()}
        ${this._renderStationModePopup(t)}
        ${this._renderQuickMixPopup(t)}
        ${this._renderRenameDialog(t)}
        ${this._renderDeleteDialog(t)}
        ${this._renderStationInfoPopup(t)}
        ${this._renderAddMusicPopup(t)}
        ${this._renderCreateStationModal(t)}
        ${this._renderAccountPopup(t)}
      </ha-card>
    `}};ke.styles=Ot,t([ut({attribute:!1})],ke.prototype,"hass",void 0),t([gt()],ke.prototype,"_config",void 0),t([gt()],ke.prototype,"_resolvedConfig",void 0),t([gt()],ke.prototype,"_extractedColors",void 0),t([gt()],ke.prototype,"_lastImageUrl",void 0),t([gt()],ke.prototype,"_cardHeight",void 0),t([gt()],ke.prototype,"_stationPopupOpen",void 0),t([gt()],ke.prototype,"_ratingsPopupOpen",void 0),t([gt()],ke.prototype,"_upcomingPopupOpen",void 0),t([gt()],ke.prototype,"_stationModePopupOpen",void 0),t([gt()],ke.prototype,"_popupAnchorPosition",void 0),t([gt()],ke.prototype,"_upcomingSongs",void 0),t([gt()],ke.prototype,"_stationModes",void 0),t([gt()],ke.prototype,"_stationModesLoading",void 0),t([gt()],ke.prototype,"_openQuickMixPopup",void 0),t([gt()],ke.prototype,"_openRenameDialog",void 0),t([gt()],ke.prototype,"_openDeleteDialog",void 0),t([gt()],ke.prototype,"_openStationInfoPopup",void 0),t([gt()],ke.prototype,"_stationInfo",void 0),t([gt()],ke.prototype,"_stationInfoLoading",void 0),t([gt()],ke.prototype,"_openAddMusicPopup",void 0),t([gt()],ke.prototype,"_searchResults",void 0),t([gt()],ke.prototype,"_searchLoading",void 0),t([gt()],ke.prototype,"_openCreateStationModal",void 0),t([gt()],ke.prototype,"_genreCategories",void 0),t([gt()],ke.prototype,"_genreLoading",void 0),t([gt()],ke.prototype,"_openAccountPopup",void 0),t([gt()],ke.prototype,"_tallArtworkError",void 0),ke=t([lt("pianobar-media-player-card")],ke);export{ke as PianobarMediaPlayerCard};
