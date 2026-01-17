function t(t,e,n,o){var i,s=arguments.length,r=s<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,n,o);else for(var a=t.length-1;a>=0;a--)(i=t[a])&&(r=(s<3?i(r):s>3?i(e,n,r):i(e,n))||r);return s>3&&r&&Object.defineProperty(e,n,r),r}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,n=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,o=Symbol(),i=new WeakMap;let s=class{constructor(t,e,n){if(this._$cssResult$=!0,n!==o)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(n&&void 0===t){const n=void 0!==e&&1===e.length;n&&(t=i.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),n&&i.set(e,t))}return t}toString(){return this.cssText}};const r=(t,...e)=>{const n=1===t.length?t[0]:e.reduce((e,n,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+t[o+1],t[0]);return new s(n,t,o)},a=n?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const n of t.cssRules)e+=n.cssText;return(t=>new s("string"==typeof t?t:t+"",void 0,o))(e)})(t):t,{is:l,defineProperty:d,getOwnPropertyDescriptor:c,getOwnPropertyNames:p,getOwnPropertySymbols:h,getPrototypeOf:u}=Object,g=globalThis,m=g.trustedTypes,b=m?m.emptyScript:"",f=g.reactiveElementPolyfillSupport,v=(t,e)=>t,_={toAttribute(t,e){switch(e){case Boolean:t=t?b:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let n=t;switch(e){case Boolean:n=null!==t;break;case Number:n=null===t?null:Number(t);break;case Object:case Array:try{n=JSON.parse(t)}catch(t){n=null}}return n}},y=(t,e)=>!l(t,e),x={attribute:!0,type:String,converter:_,reflect:!1,useDefault:!1,hasChanged:y};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=x){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const n=Symbol(),o=this.getPropertyDescriptor(t,n,e);void 0!==o&&d(this.prototype,t,o)}}static getPropertyDescriptor(t,e,n){const{get:o,set:i}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:o,set(e){const s=o?.call(this);i?.call(this,e),this.requestUpdate(t,s,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??x}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const t=this.properties,e=[...p(t),...h(t)];for(const n of e)this.createProperty(n,t[n])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,n]of e)this.elementProperties.set(t,n)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const n=this._$Eu(t,e);void 0!==n&&this._$Eh.set(n,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const n=new Set(t.flat(1/0).reverse());for(const t of n)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const n=e.attribute;return!1===n?void 0:"string"==typeof n?n:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const n of e.keys())this.hasOwnProperty(n)&&(t.set(n,this[n]),delete this[n]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,o)=>{if(n)t.adoptedStyleSheets=o.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const n of o){const o=document.createElement("style"),i=e.litNonce;void 0!==i&&o.setAttribute("nonce",i),o.textContent=n.cssText,t.appendChild(o)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,n){this._$AK(t,n)}_$ET(t,e){const n=this.constructor.elementProperties.get(t),o=this.constructor._$Eu(t,n);if(void 0!==o&&!0===n.reflect){const i=(void 0!==n.converter?.toAttribute?n.converter:_).toAttribute(e,n.type);this._$Em=t,null==i?this.removeAttribute(o):this.setAttribute(o,i),this._$Em=null}}_$AK(t,e){const n=this.constructor,o=n._$Eh.get(t);if(void 0!==o&&this._$Em!==o){const t=n.getPropertyOptions(o),i="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:_;this._$Em=o;const s=i.fromAttribute(e,t.type);this[o]=s??this._$Ej?.get(o)??s,this._$Em=null}}requestUpdate(t,e,n,o=!1,i){if(void 0!==t){const s=this.constructor;if(!1===o&&(i=this[t]),n??=s.getPropertyOptions(t),!((n.hasChanged??y)(i,e)||n.useDefault&&n.reflect&&i===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,n))))return;this.C(t,e,n)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:n,reflect:o,wrapped:i},s){n&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,s??e??this[t]),!0!==i||void 0!==s)||(this._$AL.has(t)||(this.hasUpdated||n||(e=void 0),this._$AL.set(t,e)),!0===o&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,n]of t){const{wrapped:t}=n,o=this[e];!0!==t||this._$AL.has(e)||void 0===o||this.C(e,void 0,n,o)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[v("elementProperties")]=new Map,w[v("finalized")]=new Map,f?.({ReactiveElement:w}),(g.reactiveElementVersions??=[]).push("2.1.2");const k=globalThis,$=t=>t,S=k.trustedTypes,C=S?S.createPolicy("lit-html",{createHTML:t=>t}):void 0,P="$lit$",A=`lit$${Math.random().toFixed(9).slice(2)}$`,M="?"+A,E=`<${M}>`,O=document,D=()=>O.createComment(""),I=t=>null===t||"object"!=typeof t&&"function"!=typeof t,T=Array.isArray,z="[ \t\n\f\r]",R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,L=/-->/g,N=/>/g,B=RegExp(`>|${z}(?:([^\\s"'>=/]+)(${z}*=${z}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),U=/'/g,j=/"/g,q=/^(?:script|style|textarea|title)$/i,V=(t=>(e,...n)=>({_$litType$:t,strings:e,values:n}))(1),H=Symbol.for("lit-noChange"),F=Symbol.for("lit-nothing"),Q=new WeakMap,G=O.createTreeWalker(O,129);function W(t,e){if(!T(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==C?C.createHTML(e):e}const X=(t,e)=>{const n=t.length-1,o=[];let i,s=2===e?"<svg>":3===e?"<math>":"",r=R;for(let e=0;e<n;e++){const n=t[e];let a,l,d=-1,c=0;for(;c<n.length&&(r.lastIndex=c,l=r.exec(n),null!==l);)c=r.lastIndex,r===R?"!--"===l[1]?r=L:void 0!==l[1]?r=N:void 0!==l[2]?(q.test(l[2])&&(i=RegExp("</"+l[2],"g")),r=B):void 0!==l[3]&&(r=B):r===B?">"===l[0]?(r=i??R,d=-1):void 0===l[1]?d=-2:(d=r.lastIndex-l[2].length,a=l[1],r=void 0===l[3]?B:'"'===l[3]?j:U):r===j||r===U?r=B:r===L||r===N?r=R:(r=B,i=void 0);const p=r===B&&t[e+1].startsWith("/>")?" ":"";s+=r===R?n+E:d>=0?(o.push(a),n.slice(0,d)+P+n.slice(d)+A+p):n+A+(-2===d?e:p)}return[W(t,s+(t[n]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),o]};class Y{constructor({strings:t,_$litType$:e},n){let o;this.parts=[];let i=0,s=0;const r=t.length-1,a=this.parts,[l,d]=X(t,e);if(this.el=Y.createElement(l,n),G.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(o=G.nextNode())&&a.length<r;){if(1===o.nodeType){if(o.hasAttributes())for(const t of o.getAttributeNames())if(t.endsWith(P)){const e=d[s++],n=o.getAttribute(t).split(A),r=/([.?@])?(.*)/.exec(e);a.push({type:1,index:i,name:r[2],strings:n,ctor:"."===r[1]?et:"?"===r[1]?nt:"@"===r[1]?ot:tt}),o.removeAttribute(t)}else t.startsWith(A)&&(a.push({type:6,index:i}),o.removeAttribute(t));if(q.test(o.tagName)){const t=o.textContent.split(A),e=t.length-1;if(e>0){o.textContent=S?S.emptyScript:"";for(let n=0;n<e;n++)o.append(t[n],D()),G.nextNode(),a.push({type:2,index:++i});o.append(t[e],D())}}}else if(8===o.nodeType)if(o.data===M)a.push({type:2,index:i});else{let t=-1;for(;-1!==(t=o.data.indexOf(A,t+1));)a.push({type:7,index:i}),t+=A.length-1}i++}}static createElement(t,e){const n=O.createElement("template");return n.innerHTML=t,n}}function Z(t,e,n=t,o){if(e===H)return e;let i=void 0!==o?n._$Co?.[o]:n._$Cl;const s=I(e)?void 0:e._$litDirective$;return i?.constructor!==s&&(i?._$AO?.(!1),void 0===s?i=void 0:(i=new s(t),i._$AT(t,n,o)),void 0!==o?(n._$Co??=[])[o]=i:n._$Cl=i),void 0!==i&&(e=Z(t,i._$AS(t,e.values),i,o)),e}class J{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:n}=this._$AD,o=(t?.creationScope??O).importNode(e,!0);G.currentNode=o;let i=G.nextNode(),s=0,r=0,a=n[0];for(;void 0!==a;){if(s===a.index){let e;2===a.type?e=new K(i,i.nextSibling,this,t):1===a.type?e=new a.ctor(i,a.name,a.strings,this,t):6===a.type&&(e=new it(i,this,t)),this._$AV.push(e),a=n[++r]}s!==a?.index&&(i=G.nextNode(),s++)}return G.currentNode=O,o}p(t){let e=0;for(const n of this._$AV)void 0!==n&&(void 0!==n.strings?(n._$AI(t,n,e),e+=n.strings.length-2):n._$AI(t[e])),e++}}class K{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,n,o){this.type=2,this._$AH=F,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=n,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Z(this,t,e),I(t)?t===F||null==t||""===t?(this._$AH!==F&&this._$AR(),this._$AH=F):t!==this._$AH&&t!==H&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>T(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==F&&I(this._$AH)?this._$AA.nextSibling.data=t:this.T(O.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:n}=t,o="number"==typeof n?this._$AC(t):(void 0===n.el&&(n.el=Y.createElement(W(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===o)this._$AH.p(e);else{const t=new J(o,this),n=t.u(this.options);t.p(e),this.T(n),this._$AH=t}}_$AC(t){let e=Q.get(t.strings);return void 0===e&&Q.set(t.strings,e=new Y(t)),e}k(t){T(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let n,o=0;for(const i of t)o===e.length?e.push(n=new K(this.O(D()),this.O(D()),this,this.options)):n=e[o],n._$AI(i),o++;o<e.length&&(this._$AR(n&&n._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=$(t).nextSibling;$(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,n,o,i){this.type=1,this._$AH=F,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=i,n.length>2||""!==n[0]||""!==n[1]?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=F}_$AI(t,e=this,n,o){const i=this.strings;let s=!1;if(void 0===i)t=Z(this,t,e,0),s=!I(t)||t!==this._$AH&&t!==H,s&&(this._$AH=t);else{const o=t;let r,a;for(t=i[0],r=0;r<i.length-1;r++)a=Z(this,o[n+r],e,r),a===H&&(a=this._$AH[r]),s||=!I(a)||a!==this._$AH[r],a===F?t=F:t!==F&&(t+=(a??"")+i[r+1]),this._$AH[r]=a}s&&!o&&this.j(t)}j(t){t===F?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===F?void 0:t}}class nt extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==F)}}class ot extends tt{constructor(t,e,n,o,i){super(t,e,n,o,i),this.type=5}_$AI(t,e=this){if((t=Z(this,t,e,0)??F)===H)return;const n=this._$AH,o=t===F&&n!==F||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,i=t!==F&&(n===F||o);o&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class it{constructor(t,e,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}}const st=k.litHtmlPolyfillSupport;st?.(Y,K),(k.litHtmlVersions??=[]).push("3.3.2");const rt=(t,e,n)=>{const o=n?.renderBefore??e;let i=o._$litPart$;if(void 0===i){const t=n?.renderBefore??null;o._$litPart$=i=new K(e.insertBefore(D(),t),t,void 0,n??{})}return i._$AI(t),i},at=globalThis;let lt=class extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=rt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return H}};lt._$litElement$=!0,lt.finalized=!0,at.litElementHydrateSupport?.({LitElement:lt});const dt=at.litElementPolyfillSupport;dt?.({LitElement:lt}),(at.litElementVersions??=[]).push("4.2.2");const ct=t=>(e,n)=>{void 0!==n?n.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},pt={attribute:!0,type:String,converter:_,reflect:!1,hasChanged:y},ht=(t=pt,e,n)=>{const{kind:o,metadata:i}=n;let s=globalThis.litPropertyMetadata.get(i);if(void 0===s&&globalThis.litPropertyMetadata.set(i,s=new Map),"setter"===o&&((t=Object.create(t)).wrapped=!0),s.set(n.name,t),"accessor"===o){const{name:o}=n;return{set(n){const i=e.get.call(this);e.set.call(this,n),this.requestUpdate(o,i,t,!0,n)},init(e){return void 0!==e&&this.C(o,void 0,t,e),e}}}if("setter"===o){const{name:o}=n;return function(n){const i=this[o];e.call(this,n),this.requestUpdate(o,i,t,!0,n)}}throw Error("Unsupported decorator location: "+o)};function ut(t){return(e,n)=>"object"==typeof n?ht(t,e,n):((t,e,n)=>{const o=e.hasOwnProperty(n);return e.constructor.createProperty(n,t),o?Object.getOwnPropertyDescriptor(e,n):void 0})(t,e,n)}function gt(t){return ut({...t,state:!0,attribute:!1})}const mt=1,bt=2,ft=t=>(...e)=>({_$litDirective$:t,values:e});let vt=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,n){this._$Ct=t,this._$AM=e,this._$Ci=n}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};const _t="important",yt=" !"+_t,xt=ft(class extends vt{constructor(t){if(super(t),t.type!==mt||"style"!==t.name||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,n)=>{const o=t[n];return null==o?e:e+`${n=n.includes("-")?n:n.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${o};`},"")}update(t,[e]){const{style:n}=t.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(e)),this.render(e);for(const t of this.ft)null==e[t]&&(this.ft.delete(t),t.includes("-")?n.removeProperty(t):n[t]=null);for(const t in e){const o=e[t];if(null!=o){this.ft.add(t);const e="string"==typeof o&&o.endsWith(yt);t.includes("-")||e?n.setProperty(t,e?o.slice(0,-11):o,e?_t:""):n[t]=o}}return H}}),wt=(t,e)=>{const n=t._$AN;if(void 0===n)return!1;for(const t of n)t._$AO?.(e,!1),wt(t,e);return!0},kt=t=>{let e,n;do{if(void 0===(e=t._$AM))break;n=e._$AN,n.delete(t),t=e}while(0===n?.size)},$t=t=>{for(let e;e=t._$AM;t=e){let n=e._$AN;if(void 0===n)e._$AN=n=new Set;else if(n.has(t))break;n.add(t),Pt(e)}};function St(t){void 0!==this._$AN?(kt(this),this._$AM=t,$t(this)):this._$AM=t}function Ct(t,e=!1,n=0){const o=this._$AH,i=this._$AN;if(void 0!==i&&0!==i.size)if(e)if(Array.isArray(o))for(let t=n;t<o.length;t++)wt(o[t],!1),kt(o[t]);else null!=o&&(wt(o,!1),kt(o));else wt(this,t)}const Pt=t=>{t.type==bt&&(t._$AP??=Ct,t._$AQ??=St)};class At extends vt{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,e,n){super._$AT(t,e,n),$t(this),this.isConnected=t._$AU}_$AO(t,e=!0){t!==this.isConnected&&(this.isConnected=t,t?this.reconnected?.():this.disconnected?.()),e&&(wt(this,t),kt(this))}setValue(t){if((t=>void 0===t.strings)(this._$Ct))this._$Ct._$AI(t,this);else{const e=[...this._$Ct._$AH];e[this._$Ci]=t,this._$Ct._$AI(e,this,0)}}disconnected(){}reconnected(){}}class Mt{}const Et=new WeakMap,Ot=ft(class extends At{render(t){return F}update(t,[e]){const n=e!==this.G;return n&&void 0!==this.G&&this.rt(void 0),(n||this.lt!==this.ct)&&(this.G=e,this.ht=t.options?.host,this.rt(this.ct=t.element)),F}rt(t){if(this.isConnected||(t=void 0),"function"==typeof this.G){const e=this.ht??globalThis;let n=Et.get(e);void 0===n&&(n=new WeakMap,Et.set(e,n)),void 0!==n.get(this.G)&&this.G.call(this.ht,void 0),n.set(this.G,t),void 0!==t&&this.G.call(this.ht,t)}else this.G.value=t}get lt(){return"function"==typeof this.G?Et.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}}),Dt=r`
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
    width: 80%;
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
    width: 80%;
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
`;r`
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
`;const It={default:{artwork:"default",showDetails:!0,showTitle:!0,showArtist:!0,showAlbum:!0,reserveDetailsSpace:!0,showVolumeControl:!0,showSongActions:!0,showProgressBar:!0,showProgressTime:!1,showPlaybackControls:!0,showPowerButton:!1,stationDisplay:"hidden"},full:{artwork:"full-cover",showDetails:!0,showTitle:!0,showArtist:!1,showAlbum:!1,reserveDetailsSpace:!0,showVolumeControl:!0,showSongActions:!0,showProgressBar:!0,showProgressTime:!1,showPlaybackControls:!0,showPowerButton:!1,stationDisplay:"normal"},minimal:{artwork:"default",showDetails:!0,showTitle:!0,showArtist:!1,showAlbum:!1,reserveDetailsSpace:!1,showVolumeControl:!1,showSongActions:!1,showProgressBar:!0,showProgressTime:!1,showPlaybackControls:!0,showPowerButton:!1,stationDisplay:"hidden"},tall:{artwork:"tall",showDetails:!0,showTitle:!0,showArtist:!0,showAlbum:!0,reserveDetailsSpace:!0,showVolumeControl:!0,showSongActions:!0,showProgressBar:!0,showProgressTime:!0,showPlaybackControls:!0,showPowerButton:!1,stationDisplay:"normal"},custom:{artwork:"default",showDetails:!0,showTitle:!0,showArtist:!0,showAlbum:!0,reserveDetailsSpace:!0,showVolumeControl:!0,showSongActions:!0,showProgressBar:!0,showProgressTime:!1,showPlaybackControls:!0,showPowerButton:!1,stationDisplay:"hidden"}};function Tt(t){return It[t]}function zt(t){const e=["default","full","minimal","tall"];for(const n of e){const e=It[n];if((t.artwork??"default")===e.artwork&&(t.showDetails??!0)===e.showDetails&&(t.showTitle??!0)===e.showTitle&&(t.showArtist??!0)===e.showArtist&&(t.showAlbum??!0)===e.showAlbum&&(t.reserveDetailsSpace??!0)===e.reserveDetailsSpace&&(t.showPlaybackControls??!0)===e.showPlaybackControls&&(t.showVolumeControl??!0)===e.showVolumeControl&&(t.showSongActions??!0)===e.showSongActions&&(t.showProgressBar??!0)===e.showProgressBar&&(t.showProgressTime??!1)===e.showProgressTime&&(t.showPowerButton??!1)===e.showPowerButton&&(t.stationDisplay??"hidden")===e.stationDisplay)return n}return"custom"}function Rt(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var Lt,Nt={exports:{}};window,Lt=function(){return function(t){var e={};function n(o){if(e[o])return e[o].exports;var i=e[o]={i:o,l:!1,exports:{}};return t[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(o,i,function(e){return t[e]}.bind(null,i));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=10)}([function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0}),e.assignDeep=e.mapValues=void 0,e.mapValues=function(t,e){var n={};for(var o in t)if(t.hasOwnProperty(o)){var i=t[o];n[o]=e(i)}return n},e.assignDeep=function t(e){for(var n=[],o=1;o<arguments.length;o++)n[o-1]=arguments[o];return n.forEach(function(n){if(n)for(var o in n)if(n.hasOwnProperty(o)){var i=n[o];Array.isArray(i)?e[o]=i.slice(0):"object"==typeof i?(e[o]||(e[o]={}),t(e[o],i)):e[o]=i}}),e}},function(t,e,n){var o=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var i=n(7),s=o(n(8)),r=n(0),a=function(){function t(e,n){this._src=e,this.opts=r.assignDeep({},t.DefaultOpts,n)}return t.use=function(t){this._pipeline=t},t.from=function(t){return new s.default(t)},Object.defineProperty(t.prototype,"result",{get:function(){return this._result},enumerable:!1,configurable:!0}),t.prototype._process=function(e,n){this.opts.quantizer,e.scaleDown(this.opts);var o=i.buildProcessOptions(this.opts,n);return t._pipeline.process(e.getImageData(),o)},t.prototype.palette=function(){return this.swatches()},t.prototype.swatches=function(){throw new Error("Method deprecated. Use `Vibrant.result.palettes[name]` instead")},t.prototype.getPalette=function(){var t=this,e=arguments[0],n="string"==typeof e?e:"default",o="string"==typeof e?arguments[1]:e,i=new this.opts.ImageClass;return i.load(this._src).then(function(e){return t._process(e,{generators:[n]})}).then(function(e){return t._result=e,e.palettes[n]}).then(function(t){return i.remove(),o&&o(void 0,t),t}).catch(function(t){return i.remove(),o&&o(t),Promise.reject(t)})},t.prototype.getPalettes=function(){var t=this,e=arguments[0],n=arguments[1],o=Array.isArray(e)?e:["*"],i=Array.isArray(e)?n:e,s=new this.opts.ImageClass;return s.load(this._src).then(function(e){return t._process(e,{generators:o})}).then(function(e){return t._result=e,e.palettes}).then(function(t){return s.remove(),i&&i(void 0,t),t}).catch(function(t){return s.remove(),i&&i(t),Promise.reject(t)})},t.DefaultOpts={colorCount:64,quality:5,filters:[]},t}();e.default=a},function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0}),e.applyFilters=e.ImageBase=void 0;var o=function(){function t(){}return t.prototype.scaleDown=function(t){var e=this.getWidth(),n=this.getHeight(),o=1;if(t.maxDimension>0){var i=Math.max(e,n);i>t.maxDimension&&(o=t.maxDimension/i)}else o=1/t.quality;o<1&&this.resize(e*o,n*o,o)},t}();e.ImageBase=o,e.applyFilters=function(t,e){if(e.length>0)for(var n=t.data,o=n.length/4,i=void 0,s=void 0,r=void 0,a=void 0,l=void 0,d=0;d<o;d++){s=n[0+(i=4*d)],r=n[i+1],a=n[i+2],l=n[i+3];for(var c=0;c<e.length;c++)if(!e[c](s,r,a,l)){n[i+3]=0;break}}return t}},function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0}),e.Swatch=void 0;var o=n(4),i=function(){function t(t,e){this._rgb=t,this._population=e}return t.applyFilters=function(t,e){return e.length>0?t.filter(function(t){for(var n=t.r,o=t.g,i=t.b,s=0;s<e.length;s++)if(!e[s](n,o,i,255))return!1;return!0}):t},t.clone=function(e){return new t(e._rgb,e._population)},Object.defineProperty(t.prototype,"r",{get:function(){return this._rgb[0]},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"g",{get:function(){return this._rgb[1]},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"b",{get:function(){return this._rgb[2]},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"rgb",{get:function(){return this._rgb},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"hsl",{get:function(){if(!this._hsl){var t=this._rgb,e=t[0],n=t[1],i=t[2];this._hsl=o.rgbToHsl(e,n,i)}return this._hsl},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"hex",{get:function(){if(!this._hex){var t=this._rgb,e=t[0],n=t[1],i=t[2];this._hex=o.rgbToHex(e,n,i)}return this._hex},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"population",{get:function(){return this._population},enumerable:!1,configurable:!0}),t.prototype.toJSON=function(){return{rgb:this.rgb,population:this.population}},t.prototype.getRgb=function(){return this._rgb},t.prototype.getHsl=function(){return this.hsl},t.prototype.getPopulation=function(){return this._population},t.prototype.getHex=function(){return this.hex},t.prototype.getYiq=function(){if(!this._yiq){var t=this._rgb;this._yiq=(299*t[0]+587*t[1]+114*t[2])/1e3}return this._yiq},Object.defineProperty(t.prototype,"titleTextColor",{get:function(){return this._titleTextColor&&(this._titleTextColor=this.getYiq()<200?"#fff":"#000"),this._titleTextColor},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"bodyTextColor",{get:function(){return this._bodyTextColor&&(this._bodyTextColor=this.getYiq()<150?"#fff":"#000"),this._bodyTextColor},enumerable:!1,configurable:!0}),t.prototype.getTitleTextColor=function(){return this.titleTextColor},t.prototype.getBodyTextColor=function(){return this.bodyTextColor},t}();e.Swatch=i},function(t,e,n){function o(t){var e=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);if(!e)throw new RangeError("'"+t+"' is not a valid hex color");return[e[1],e[2],e[3]].map(function(t){return parseInt(t,16)})}function i(t,e,n){return e/=255,n/=255,t=(t/=255)>.04045?Math.pow((t+.005)/1.055,2.4):t/12.92,e=e>.04045?Math.pow((e+.005)/1.055,2.4):e/12.92,n=n>.04045?Math.pow((n+.005)/1.055,2.4):n/12.92,[.4124*(t*=100)+.3576*(e*=100)+.1805*(n*=100),.2126*t+.7152*e+.0722*n,.0193*t+.1192*e+.9505*n]}function s(t,e,n){return e/=100,n/=108.883,t=(t/=95.047)>.008856?Math.pow(t,1/3):7.787*t+16/116,[116*(e=e>.008856?Math.pow(e,1/3):7.787*e+16/116)-16,500*(t-e),200*(e-(n=n>.008856?Math.pow(n,1/3):7.787*n+16/116))]}function r(t,e,n){var o=i(t,e,n);return s(o[0],o[1],o[2])}function a(t,e){var n=t[0],o=t[1],i=t[2],s=e[0],r=e[1],a=e[2],l=n-s,d=o-r,c=i-a,p=Math.sqrt(o*o+i*i),h=s-n,u=Math.sqrt(r*r+a*a)-p,g=Math.sqrt(l*l+d*d+c*c),m=Math.sqrt(g)>Math.sqrt(Math.abs(h))+Math.sqrt(Math.abs(u))?Math.sqrt(g*g-h*h-u*u):0;return h/=1,u/=1*(1+.045*p),m/=1*(1+.015*p),Math.sqrt(h*h+u*u+m*m)}function l(t,e){return a(r.apply(void 0,t),r.apply(void 0,e))}Object.defineProperty(e,"__esModule",{value:!0}),e.getColorDiffStatus=e.hexDiff=e.rgbDiff=e.deltaE94=e.rgbToCIELab=e.xyzToCIELab=e.rgbToXyz=e.hslToRgb=e.rgbToHsl=e.rgbToHex=e.hexToRgb=e.DELTAE94_DIFF_STATUS=void 0,e.DELTAE94_DIFF_STATUS={NA:0,PERFECT:1,CLOSE:2,GOOD:10,SIMILAR:50},e.hexToRgb=o,e.rgbToHex=function(t,e,n){return"#"+((1<<24)+(t<<16)+(e<<8)+n).toString(16).slice(1,7)},e.rgbToHsl=function(t,e,n){t/=255,e/=255,n/=255;var o=Math.max(t,e,n),i=Math.min(t,e,n),s=0,r=0,a=(o+i)/2;if(o!==i){var l=o-i;switch(r=a>.5?l/(2-o-i):l/(o+i),o){case t:s=(e-n)/l+(e<n?6:0);break;case e:s=(n-t)/l+2;break;case n:s=(t-e)/l+4}s/=6}return[s,r,a]},e.hslToRgb=function(t,e,n){var o,i,s;function r(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+6*(e-t)*n:n<.5?e:n<2/3?t+(e-t)*(2/3-n)*6:t}if(0===e)o=i=s=n;else{var a=n<.5?n*(1+e):n+e-n*e,l=2*n-a;o=r(l,a,t+1/3),i=r(l,a,t),s=r(l,a,t-1/3)}return[255*o,255*i,255*s]},e.rgbToXyz=i,e.xyzToCIELab=s,e.rgbToCIELab=r,e.deltaE94=a,e.rgbDiff=l,e.hexDiff=function(t,e){return l(o(t),o(e))},e.getColorDiffStatus=function(t){return t<e.DELTAE94_DIFF_STATUS.NA?"N/A":t<=e.DELTAE94_DIFF_STATUS.PERFECT?"Perfect":t<=e.DELTAE94_DIFF_STATUS.CLOSE?"Close":t<=e.DELTAE94_DIFF_STATUS.GOOD?"Good":t<e.DELTAE94_DIFF_STATUS.SIMILAR?"Similar":"Wrong"}},function(t,e,n){var o=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}},i=o(n(6)),s=o(n(9));i.default.DefaultOpts.ImageClass=s.default,t.exports=i.default},function(t,e,n){var o=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var i=o(n(1));i.default.DefaultOpts.quantizer="mmcq",i.default.DefaultOpts.generators=["default"],i.default.DefaultOpts.filters=["default"],e.default=i.default},function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0}),e.buildProcessOptions=void 0;var o=n(0);e.buildProcessOptions=function(t,e){var n=t.colorCount,i=t.quantizer,s=t.generators,r=t.filters,a={colorCount:n},l="string"==typeof i?{name:i,options:{}}:i;return l.options=o.assignDeep({},a,l.options),o.assignDeep({},{quantizer:l,generators:s,filters:r},e)}},function(t,e,n){var o=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var i=o(n(1)),s=n(0),r=function(){function t(t,e){void 0===e&&(e={}),this._src=t,this._opts=s.assignDeep({},i.default.DefaultOpts,e)}return t.prototype.maxColorCount=function(t){return this._opts.colorCount=t,this},t.prototype.maxDimension=function(t){return this._opts.maxDimension=t,this},t.prototype.addFilter=function(t){return this._opts.filters?this._opts.filters.push(t):this._opts.filters=[t],this},t.prototype.removeFilter=function(t){if(this._opts.filters){var e=this._opts.filters.indexOf(t);e>0&&this._opts.filters.splice(e)}return this},t.prototype.clearFilters=function(){return this._opts.filters=[],this},t.prototype.quality=function(t){return this._opts.quality=t,this},t.prototype.useImageClass=function(t){return this._opts.ImageClass=t,this},t.prototype.useGenerator=function(t,e){return this._opts.generators||(this._opts.generators=[]),this._opts.generators.push(e?{name:t,options:e}:t),this},t.prototype.useQuantizer=function(t,e){return this._opts.quantizer=e?{name:t,options:e}:t,this},t.prototype.build=function(){return new i.default(this._src,this._opts)},t.prototype.getPalette=function(t){return this.build().getPalette(t)},t.prototype.getSwatches=function(t){return this.build().getPalette(t)},t}();e.default=r},function(t,e,n){var o,i=this&&this.__extends||(o=function(t,e){return o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])},o(t,e)},function(t,e){function n(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)});Object.defineProperty(e,"__esModule",{value:!0});var s=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return i(e,t),e.prototype._initCanvas=function(){var t=this.image,e=this._canvas=document.createElement("canvas"),n=e.getContext("2d");if(!n)throw new ReferenceError("Failed to create canvas context");this._context=n,e.className="@vibrant/canvas",e.style.display="none",this._width=e.width=t.width,this._height=e.height=t.height,n.drawImage(t,0,0),document.body.appendChild(e)},e.prototype.load=function(t){var e,n,o=this;if("string"==typeof t)e=document.createElement("img"),function(t){var e=new URL(t,location.href);return e.protocol===location.protocol&&e.host===location.host&&e.port===location.port}(n=t)||function(t,e){var n=new URL(t),o=new URL(e);return n.protocol===o.protocol&&n.hostname===o.hostname&&n.port===o.port}(window.location.href,n)||(e.crossOrigin="anonymous"),e.src=n;else{if(!(t instanceof HTMLImageElement))return Promise.reject(new Error("Cannot load buffer as an image in browser"));e=t,n=t.src}return this.image=e,new Promise(function(t,i){var s=function(){o._initCanvas(),t(o)};e.complete?s():(e.onload=s,e.onerror=function(t){return i(new Error("Fail to load image: "+n))})})},e.prototype.clear=function(){this._context.clearRect(0,0,this._width,this._height)},e.prototype.update=function(t){this._context.putImageData(t,0,0)},e.prototype.getWidth=function(){return this._width},e.prototype.getHeight=function(){return this._height},e.prototype.resize=function(t,e,n){var o=this,i=o._canvas,s=o._context,r=o.image;this._width=i.width=t,this._height=i.height=e,s.scale(n,n),s.drawImage(r,0,0)},e.prototype.getPixelCount=function(){return this._width*this._height},e.prototype.getImageData=function(){return this._context.getImageData(0,0,this._width,this._height)},e.prototype.remove=function(){this._canvas&&this._canvas.parentNode&&this._canvas.parentNode.removeChild(this._canvas)},e}(n(2).ImageBase);e.default=s},function(t,e,n){var o=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}},i=n(5),s=o(n(11));i.use(s.default),t.exports=i},function(t,e,n){var o=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var i=o(n(12)),s=o(n(16)),r=(new(n(17).BasicPipeline)).filter.register("default",function(t,e,n,o){return o>=125&&!(t>250&&e>250&&n>250)}).quantizer.register("mmcq",i.default).generator.register("default",s.default);e.default=r},function(t,e,n){var o=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var i=n(3),s=o(n(13)),r=o(n(15));function a(t,e){for(var n=t.size();t.size()<e;){var o=t.pop();if(!(o&&o.count()>0))break;var i=o.split(),s=i[0],r=i[1];if(t.push(s),r&&r.count()>0&&t.push(r),t.size()===n)break;n=t.size()}}e.default=function(t,e){if(0===t.length||e.colorCount<2||e.colorCount>256)throw new Error("Wrong MMCQ parameters");var n=s.default.build(t);n.histogram.colorCount;var o=new r.default(function(t,e){return t.count()-e.count()});o.push(n),a(o,.75*e.colorCount);var l=new r.default(function(t,e){return t.count()*t.volume()-e.count()*e.volume()});return l.contents=o.contents,a(l,e.colorCount-l.size()),function(t){for(var e=[];t.size();){var n=t.pop(),o=n.avg();o[0],o[1],o[2],e.push(new i.Swatch(o,n.count()))}return e}(l)}},function(t,e,n){var o=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var i=o(n(14)),s=function(){function t(t,e,n,o,i,s,r){this.histogram=r,this._volume=-1,this._count=-1,this.dimension={r1:t,r2:e,g1:n,g2:o,b1:i,b2:s}}return t.build=function(e){var n=new i.default(e,{sigBits:5});return new t(n.rmin,n.rmax,n.gmin,n.gmax,n.bmin,n.bmax,n)},t.prototype.invalidate=function(){this._volume=this._count=-1,this._avg=null},t.prototype.volume=function(){if(this._volume<0){var t=this.dimension,e=t.r1,n=t.r2,o=t.g1,i=t.g2,s=t.b1,r=t.b2;this._volume=(n-e+1)*(i-o+1)*(r-s+1)}return this._volume},t.prototype.count=function(){if(this._count<0){for(var t=this.histogram,e=t.hist,n=t.getColorIndex,o=this.dimension,i=o.r1,s=o.r2,r=o.g1,a=o.g2,l=o.b1,d=o.b2,c=0,p=i;p<=s;p++)for(var h=r;h<=a;h++)for(var u=l;u<=d;u++)c+=e[n(p,h,u)];this._count=c}return this._count},t.prototype.clone=function(){var e=this.histogram,n=this.dimension;return new t(n.r1,n.r2,n.g1,n.g2,n.b1,n.b2,e)},t.prototype.avg=function(){if(!this._avg){var t=this.histogram,e=t.hist,n=t.getColorIndex,o=this.dimension,i=o.r1,s=o.r2,r=o.g1,a=o.g2,l=o.b1,d=o.b2,c=0,p=void 0,h=void 0,u=void 0;p=h=u=0;for(var g=i;g<=s;g++)for(var m=r;m<=a;m++)for(var b=l;b<=d;b++){var f=e[n(g,m,b)];c+=f,p+=f*(g+.5)*8,h+=f*(m+.5)*8,u+=f*(b+.5)*8}this._avg=c?[~~(p/c),~~(h/c),~~(u/c)]:[~~(8*(i+s+1)/2),~~(8*(r+a+1)/2),~~(8*(l+d+1)/2)]}return this._avg},t.prototype.contains=function(t){var e=t[0],n=t[1],o=t[2],i=this.dimension,s=i.r1,r=i.r2,a=i.g1,l=i.g2,d=i.b1,c=i.b2;return n>>=3,o>>=3,(e>>=3)>=s&&e<=r&&n>=a&&n<=l&&o>=d&&o<=c},t.prototype.split=function(){var t=this.histogram,e=t.hist,n=t.getColorIndex,o=this.dimension,i=o.r1,s=o.r2,r=o.g1,a=o.g2,l=o.b1,d=o.b2,c=this.count();if(!c)return[];if(1===c)return[this.clone()];var p,h,u=s-i+1,g=a-r+1,m=d-l+1,b=Math.max(u,g,m),f=null;p=h=0;var v=null;if(b===u){v="r",f=new Uint32Array(s+1);for(var _=i;_<=s;_++){p=0;for(var y=r;y<=a;y++)for(var x=l;x<=d;x++)p+=e[n(_,y,x)];h+=p,f[_]=h}}else if(b===g)for(v="g",f=new Uint32Array(a+1),y=r;y<=a;y++){for(p=0,_=i;_<=s;_++)for(x=l;x<=d;x++)p+=e[n(_,y,x)];h+=p,f[y]=h}else for(v="b",f=new Uint32Array(d+1),x=l;x<=d;x++){for(p=0,_=i;_<=s;_++)for(y=r;y<=a;y++)p+=e[n(_,y,x)];h+=p,f[x]=h}for(var w=-1,k=new Uint32Array(f.length),$=0;$<f.length;$++){var S=f[$];w<0&&S>h/2&&(w=$),k[$]=h-S}var C=this;return function(t){var e=t+"1",n=t+"2",o=C.dimension[e],i=C.dimension[n],s=C.clone(),r=C.clone(),a=w-o,l=i-w;for(a<=l?(i=Math.min(i-1,~~(w+l/2)),i=Math.max(0,i)):(i=Math.max(o,~~(w-1-a/2)),i=Math.min(C.dimension[n],i));!f[i];)i++;for(var d=k[i];!d&&f[i-1];)d=k[--i];return s.dimension[n]=i,r.dimension[e]=i+1,[s,r]}(v)},t}();e.default=s},function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var o=function(){function t(t,e){this.pixels=t,this.opts=e;var n=e.sigBits,o=function(t,e,o){return(t<<2*n)+(e<<n)+o};this.getColorIndex=o;var i,s,r,a,l,d,c,p,h,u=8-n,g=new Uint32Array(1<<3*n);i=r=l=0,s=a=d=Number.MAX_VALUE;for(var m=t.length/4,b=0;b<m;){var f=4*b;b++,c=t[f+0],p=t[f+1],h=t[f+2],0!==t[f+3]&&(g[o(c>>=u,p>>=u,h>>=u)]+=1,c>i&&(i=c),c<s&&(s=c),p>r&&(r=p),p<a&&(a=p),h>l&&(l=h),h<d&&(d=h))}this._colorCount=g.reduce(function(t,e){return e>0?t+1:t},0),this.hist=g,this.rmax=i,this.rmin=s,this.gmax=r,this.gmin=a,this.bmax=l,this.bmin=d}return Object.defineProperty(t.prototype,"colorCount",{get:function(){return this._colorCount},enumerable:!1,configurable:!0}),t}();e.default=o},function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var o=function(){function t(t){this._comparator=t,this.contents=[],this._sorted=!1}return t.prototype._sort=function(){this._sorted||(this.contents.sort(this._comparator),this._sorted=!0)},t.prototype.push=function(t){this.contents.push(t),this._sorted=!1},t.prototype.peek=function(t){return this._sort(),t="number"==typeof t?t:this.contents.length-1,this.contents[t]},t.prototype.pop=function(){return this._sort(),this.contents.pop()},t.prototype.size=function(){return this.contents.length},t.prototype.map=function(t){return this._sort(),this.contents.map(t)},t}();e.default=o},function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var o=n(3),i=n(4),s={targetDarkLuma:.26,maxDarkLuma:.45,minLightLuma:.55,targetLightLuma:.74,minNormalLuma:.3,targetNormalLuma:.5,maxNormalLuma:.7,targetMutesSaturation:.3,maxMutesSaturation:.4,targetVibrantSaturation:1,minVibrantSaturation:.35,weightSaturation:3,weightLuma:6.5,weightPopulation:.5};function r(t,e,n,o,i,s,r,a,l,d){var c=null,p=0;return e.forEach(function(e){var h=e.hsl,u=h[1],g=h[2];if(u>=a&&u<=l&&g>=i&&g<=s&&!function(t,e){return t.Vibrant===e||t.DarkVibrant===e||t.LightVibrant===e||t.Muted===e||t.DarkMuted===e||t.LightMuted===e}(t,e)){var m=function(t,e,n,o,i,s,r){function a(t,e){return 1-Math.abs(t-e)}return function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];for(var n=0,o=0,i=0;i<t.length;i+=2){var s=t[i],r=t[i+1];n+=s*r,o+=r}return n/o}(a(t,e),r.weightSaturation,a(n,o),r.weightLuma,i/s,r.weightPopulation)}(u,r,g,o,e.population,n,d);(null===c||m>p)&&(c=e,p=m)}}),c}e.default=function(t,e){e=Object.assign({},s,e);var n=function(t){var e=0;return t.forEach(function(t){e=Math.max(e,t.population)}),e}(t),a=function(t,e,n){var o={Vibrant:null,DarkVibrant:null,LightVibrant:null,Muted:null,DarkMuted:null,LightMuted:null};return o.Vibrant=r(o,t,e,n.targetNormalLuma,n.minNormalLuma,n.maxNormalLuma,n.targetVibrantSaturation,n.minVibrantSaturation,1,n),o.LightVibrant=r(o,t,e,n.targetLightLuma,n.minLightLuma,1,n.targetVibrantSaturation,n.minVibrantSaturation,1,n),o.DarkVibrant=r(o,t,e,n.targetDarkLuma,0,n.maxDarkLuma,n.targetVibrantSaturation,n.minVibrantSaturation,1,n),o.Muted=r(o,t,e,n.targetNormalLuma,n.minNormalLuma,n.maxNormalLuma,n.targetMutesSaturation,0,n.maxMutesSaturation,n),o.LightMuted=r(o,t,e,n.targetLightLuma,n.minLightLuma,1,n.targetMutesSaturation,0,n.maxMutesSaturation,n),o.DarkMuted=r(o,t,e,n.targetDarkLuma,0,n.maxDarkLuma,n.targetMutesSaturation,0,n.maxMutesSaturation,n),o}(t,n,e);return function(t,e,n){if(!t.Vibrant&&!t.DarkVibrant&&!t.LightVibrant){if(!t.DarkVibrant&&t.DarkMuted){var s=t.DarkMuted.hsl,r=s[0],a=s[1],l=s[2];l=n.targetDarkLuma,t.DarkVibrant=new o.Swatch(i.hslToRgb(r,a,l),0)}if(!t.LightVibrant&&t.LightMuted){var d=t.LightMuted.hsl;r=d[0],a=d[1],l=d[2],l=n.targetDarkLuma,t.DarkVibrant=new o.Swatch(i.hslToRgb(r,a,l),0)}}if(!t.Vibrant&&t.DarkVibrant){var c=t.DarkVibrant.hsl;r=c[0],a=c[1],l=c[2],l=n.targetNormalLuma,t.Vibrant=new o.Swatch(i.hslToRgb(r,a,l),0)}else if(!t.Vibrant&&t.LightVibrant){var p=t.LightVibrant.hsl;r=p[0],a=p[1],l=p[2],l=n.targetNormalLuma,t.Vibrant=new o.Swatch(i.hslToRgb(r,a,l),0)}if(!t.DarkVibrant&&t.Vibrant){var h=t.Vibrant.hsl;r=h[0],a=h[1],l=h[2],l=n.targetDarkLuma,t.DarkVibrant=new o.Swatch(i.hslToRgb(r,a,l),0)}if(!t.LightVibrant&&t.Vibrant){var u=t.Vibrant.hsl;r=u[0],a=u[1],l=u[2],l=n.targetLightLuma,t.LightVibrant=new o.Swatch(i.hslToRgb(r,a,l),0)}if(!t.Muted&&t.Vibrant){var g=t.Vibrant.hsl;r=g[0],a=g[1],l=g[2],l=n.targetMutesSaturation,t.Muted=new o.Swatch(i.hslToRgb(r,a,l),0)}if(!t.DarkMuted&&t.DarkVibrant){var m=t.DarkVibrant.hsl;r=m[0],a=m[1],l=m[2],l=n.targetMutesSaturation,t.DarkMuted=new o.Swatch(i.hslToRgb(r,a,l),0)}if(!t.LightMuted&&t.LightVibrant){var b=t.LightVibrant.hsl;r=b[0],a=b[1],l=b[2],l=n.targetMutesSaturation,t.LightMuted=new o.Swatch(i.hslToRgb(r,a,l),0)}}(a,0,e),a}},function(t,e,n){var o=this&&this.__awaiter||function(t,e,n,o){return new(n||(n=Promise))(function(i,s){function r(t){try{l(o.next(t))}catch(t){s(t)}}function a(t){try{l(o.throw(t))}catch(t){s(t)}}function l(t){var e;t.done?i(t.value):(e=t.value,e instanceof n?e:new n(function(t){t(e)})).then(r,a)}l((o=o.apply(t,e||[])).next())})},i=this&&this.__generator||function(t,e){var n,o,i,s,r={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return s={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function a(s){return function(a){return function(s){if(n)throw new TypeError("Generator is already executing.");for(;r;)try{if(n=1,o&&(i=2&s[0]?o.return:s[0]?o.throw||((i=o.return)&&i.call(o),0):o.next)&&!(i=i.call(o,s[1])).done)return i;switch(o=0,i&&(s=[2&s[0],i.value]),s[0]){case 0:case 1:i=s;break;case 4:return r.label++,{value:s[1],done:!1};case 5:r.label++,o=s[1],s=[0];continue;case 7:s=r.ops.pop(),r.trys.pop();continue;default:if(!((i=(i=r.trys).length>0&&i[i.length-1])||6!==s[0]&&2!==s[0])){r=0;continue}if(3===s[0]&&(!i||s[1]>i[0]&&s[1]<i[3])){r.label=s[1];break}if(6===s[0]&&r.label<i[1]){r.label=i[1],i=s;break}if(i&&r.label<i[2]){r.label=i[2],r.ops.push(s);break}i[2]&&r.ops.pop(),r.trys.pop();continue}s=e.call(t,r)}catch(t){s=[6,t],o=0}finally{n=i=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,a])}}};Object.defineProperty(e,"__esModule",{value:!0}),e.BasicPipeline=e.Stage=void 0;var s=n(2),r=function(){function t(t){this.pipeline=t,this._map={}}return t.prototype.names=function(){return Object.keys(this._map)},t.prototype.has=function(t){return!!this._map[t]},t.prototype.get=function(t){return this._map[t]},t.prototype.register=function(t,e){return this._map[t]=e,this.pipeline},t}();e.Stage=r;var a=function(){function t(){this.filter=new r(this),this.quantizer=new r(this),this.generator=new r(this)}return t.prototype._buildProcessTasks=function(t){var e=this,n=t.filters,o=t.quantizer,i=t.generators;return 1===i.length&&"*"===i[0]&&(i=this.generator.names()),{filters:n.map(function(t){return s(e.filter,t)}),quantizer:s(this.quantizer,o),generators:i.map(function(t){return s(e.generator,t)})};function s(t,e){var n,o;return"string"==typeof e?n=e:(n=e.name,o=e.options),{name:n,fn:t.get(n),options:o}}},t.prototype.process=function(t,e){return o(this,void 0,void 0,function(){var n,o,s,r,a,l,d;return i(this,function(i){switch(i.label){case 0:return n=this._buildProcessTasks(e),o=n.filters,s=n.quantizer,r=n.generators,[4,this._filterColors(o,t)];case 1:return a=i.sent(),[4,this._generateColors(s,a)];case 2:return l=i.sent(),[4,this._generatePalettes(r,l)];case 3:return d=i.sent(),[2,{colors:l,palettes:d}]}})})},t.prototype._filterColors=function(t,e){return Promise.resolve(s.applyFilters(e,t.map(function(t){return t.fn})))},t.prototype._generateColors=function(t,e){return Promise.resolve(t.fn(e.data,t.options))},t.prototype._generatePalettes=function(t,e){return o(this,void 0,void 0,function(){var n;return i(this,function(o){switch(o.label){case 0:return[4,Promise.all(t.map(function(t){var n=t.fn,o=t.options;return Promise.resolve(n(e,o))}))];case 1:return n=o.sent(),[2,Promise.resolve(n.reduce(function(e,n,o){return e[t[o].name]=n,e},{}))]}})})},t}();e.BasicPipeline=a}])};var Bt=Rt(Nt.exports=Lt());const Ut=4.5,jt={background:"#1c1c1c",foreground:"#ffffff"},qt=new Map,Vt=(t,e,n)=>{const o=[t,e,n].map(t=>{const e=t/255;return e<=.03928?e/12.92:((e+.055)/1.055)**2.4});return.2126*o[0]+.7152*o[1]+.0722*o[2]},Ht=(t,e)=>Math.round(100*(((t,e)=>{const n=Vt(t[0],t[1],t[2]),o=Vt(e[0],e[1],e[2]);return(Math.max(n,o)+.05)/(Math.min(n,o)+.05)})(t,e)+Number.EPSILON))/100;Bt._pipeline.generator.register("default",t=>{t.sort((t,e)=>e.population-t.population);const e=t[0];let n;const o=new Map,i=(t,n)=>(o.has(t)||o.set(t,Ht(e.rgb,n)),(o.get(t)||0)>Ut);for(let e=1;e<t.length&&void 0===n;e++){if(i(t[e].hex,t[e].rgb)){n=t[e].rgb;break}const o=t[e];for(let s=e+1;s<t.length;s++){const e=t[s];if(!(Math.abs(o.rgb[0]-e.rgb[0])+Math.abs(o.rgb[1]-e.rgb[1])+Math.abs(o.rgb[2]-e.rgb[2])>150)&&i(e.hex,e.rgb)){n=e.rgb;break}}}return void 0===n&&(n=e.getYiq()<200?[255,255,255]:[0,0,0]),[new e.constructor(n,0).hex,e.hex]});const Ft=async t=>new Bt(t,{colorCount:16}).getPalette();async function Qt(t,e){const n=document.createElement("canvas"),o=n.getContext("2d");if(!o)throw new Error("Failed to get canvas context");const i=Math.floor(e.x*t.width),s=Math.floor(e.y*t.height),r=Math.floor(e.width*t.width),a=Math.floor(e.height*t.height);if(r<1||a<1)throw new Error("Region too small");n.width=r,n.height=a;const l=t.getContext("2d");if(!l)throw new Error("Failed to get source canvas context");const d=l.getImageData(i,s,r,a);o.putImageData(d,0,0);const c=n.toDataURL();return await Ft(c)}async function Gt(t){if(!t)return jt;const e=qt.get(t);if(e)return e;try{const[e,n]=await Ft(t),o={background:n,foreground:e};if(qt.set(t,o),qt.size>50){const t=qt.keys().next().value;t&&qt.delete(t)}return o}catch(t){return console.error("Error extracting colors:",t),jt}}const Wt={x:0,y:0,width:.4,height:.5},Xt={x:0,y:.7,width:1,height:.3};function Yt(t,e,n,o){const i=Math.floor(e.x*n),s=Math.floor(e.y*o),r=Math.floor((e.x+e.width)*n),a=Math.floor((e.y+e.height)*o);let l=0,d=0,c=0,p=0;for(let e=s;e<a;e+=4)for(let o=i;o<r;o+=4){const i=4*(e*n+o);l+=t.data[i],d+=t.data[i+1],c+=t.data[i+2],p++}return 0===p?[128,128,128]:[Math.round(l/p),Math.round(d/p),Math.round(c/p)]}function Zt(t,e=null,n=0){const o=function(t,e){const n=1-e;return[Math.round(t[0]*n),Math.round(t[1]*n),Math.round(t[2]*n)]}(t,n);if(e){const t=function(t){const e=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);return e?[parseInt(e[1],16),parseInt(e[2],16),parseInt(e[3],16)]:[0,0,0]}(e);if(Ht(t,o)>=Ut)return e;const n=function(t,e,n=4.5){if(Ht(t,e)>=n)return t;const o=Vt(e[0],e[1],e[2])<.5;let i=[...t];for(let t=0;t<20;t++){const t=o?1.1:.9;if(i=i.map(e=>Math.min(255,Math.max(0,Math.round(e*t)))),Ht(i,e)>=n)return i;if(o&&i.every(t=>t>=255))break;if(!o&&i.every(t=>t<=0))break}return null}(t,o);if(n){const t="#"+n.map(t=>t.toString(16).padStart(2,"0")).join("");if(Ht(n,o)>=Ut)return t}}return Ht([255,255,255],o)>Ht([26,26,26],o)?"#ffffff":"#1a1a1a"}let Jt=class extends lt{constructor(){super(...arguments),this.playing=!1,this.disabled=!1,this.showPower=!1,this.isOn=!0}_handlePower(){this.dispatchEvent(new CustomEvent("power-toggle",{bubbles:!0,composed:!0}))}_handlePlayPause(){this.dispatchEvent(new CustomEvent("play-pause",{bubbles:!0,composed:!0}))}_handleNext(){this.dispatchEvent(new CustomEvent("next-track",{bubbles:!0,composed:!0}))}render(){return V`
      ${this.showPower?V`
            <button
              class="control-button ${this.isOn?"":"power-off"}"
              @click=${this._handlePower}
              title=${this.isOn?"Turn off":"Turn on"}
            >
              <ha-icon icon="mdi:power"></ha-icon>
            </button>
          `:F}
      <button
        class="control-button"
        @click=${this._handlePlayPause}
        ?disabled=${this.disabled}
        title=${this.playing?"Pause":"Play"}
      >
        <ha-icon .icon=${this.playing?"mdi:pause":"mdi:play"}></ha-icon>
      </button>
      <button
        class="control-button"
        @click=${this._handleNext}
        ?disabled=${this.disabled}
        title="Next track"
      >
        <ha-icon icon="mdi:skip-next"></ha-icon>
      </button>
    `}};Jt.styles=r`
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
  `,t([ut({type:Boolean})],Jt.prototype,"playing",void 0),t([ut({type:Boolean})],Jt.prototype,"disabled",void 0),t([ut({type:Boolean})],Jt.prototype,"showPower",void 0),t([ut({type:Boolean})],Jt.prototype,"isOn",void 0),Jt=t([ct("pmc-playback-controls")],Jt);let Kt=class extends lt{constructor(){super(...arguments),this.duration=0,this.position=0,this.positionUpdatedAt="",this.showTime=!1,this.isPlaying=!1,this._animationFrameId=null,this._currentPosition=0}connectedCallback(){super.connectedCallback(),this._startAnimation()}disconnectedCallback(){super.disconnectedCallback(),this._stopAnimation()}updated(t){(t.has("position")||t.has("positionUpdatedAt"))&&(this._currentPosition=this.position)}_startAnimation(){const t=()=>{if(this.duration>0&&this.positionUpdatedAt){if(this.isPlaying){const t=new Date(this.positionUpdatedAt).getTime(),e=(Date.now()-t)/1e3;this._currentPosition=Math.min(this.position+e,this.duration)}else this._currentPosition=this.position;this.requestUpdate()}this._animationFrameId=requestAnimationFrame(t)};this._animationFrameId=requestAnimationFrame(t)}_stopAnimation(){this._animationFrameId&&(cancelAnimationFrame(this._animationFrameId),this._animationFrameId=null)}_formatTime(t){return`${Math.floor(t/60)}:${Math.floor(t%60).toString().padStart(2,"0")}`}render(){const t=this.duration>0?this._currentPosition/this.duration*100:0;return V`
      <div class="progress-container">
        ${this.showTime?V`
              <div class="time-display">
                <span>${this._formatTime(this._currentPosition)}</span>
                <span>${this._formatTime(this.duration)}</span>
              </div>
            `:F}
        <div class="progress-bar-wrapper">
          <div class="progress-track"></div>
          <div class="progress-fill" style="width: ${t}%"></div>
        </div>
      </div>
    `}};Kt.styles=r`
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
  `,t([ut({type:Number})],Kt.prototype,"duration",void 0),t([ut({type:Number})],Kt.prototype,"position",void 0),t([ut({type:String})],Kt.prototype,"positionUpdatedAt",void 0),t([ut({type:Boolean})],Kt.prototype,"showTime",void 0),t([ut({type:Boolean})],Kt.prototype,"isPlaying",void 0),Kt=t([ct("pmc-progress-bar")],Kt);let te=class extends lt{constructor(){super(...arguments),this.volume=.5,this.muted=!1,this.disabled=!1,this.sliderColor="currentColor",this._dragging=!1}_getVolumeIcon(){return this.muted||0===this.volume?"mdi:volume-off":this.volume<.3?"mdi:volume-low":this.volume<.7?"mdi:volume-medium":"mdi:volume-high"}_handleVolumeChange(t){const e=t.target,n=parseFloat(e.value);this.dispatchEvent(new CustomEvent("volume-change",{detail:{volume:n},bubbles:!0,composed:!0}))}_handleMuteToggle(){this.dispatchEvent(new CustomEvent("mute-toggle",{bubbles:!0,composed:!0}))}render(){const t=Math.round(100*this.volume),e=100*this.volume+"%";return V`
      <button
        class="volume-button"
        @click=${this._handleMuteToggle}
        ?disabled=${this.disabled}
        title=${this.muted?"Unmute":"Mute"}
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
    `}};te.styles=r`
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
  `,t([ut({type:Number})],te.prototype,"volume",void 0),t([ut({type:Boolean})],te.prototype,"muted",void 0),t([ut({type:Boolean})],te.prototype,"disabled",void 0),t([ut({type:String})],te.prototype,"sliderColor",void 0),t([gt()],te.prototype,"_dragging",void 0),te=t([ct("pmc-volume-slider")],te);class ee extends lt{constructor(){super(...arguments),this.disabled=!1,this.externalOpen=!1,this.isOpen=!1,this.top=0,this.left=0,this.ignoreNextClickOutside=!1,this._portalContainer=null}static get baseStyles(){return r`
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
    `}connectedCallback(){super.connectedCallback(),this.handleClickOutside=this.handleClickOutside.bind(this),document.addEventListener("click",this.handleClickOutside)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this.handleClickOutside),this._removePortal()}_createPortal(){this._portalContainer||(this._portalContainer=document.createElement("div"),this._portalContainer.className="pmc-popup-portal",document.body.appendChild(this._portalContainer))}_removePortal(){this._portalContainer&&(this._portalContainer.remove(),this._portalContainer=null)}firstUpdated(){this.externalOpen&&!this.isOpen&&this.openPopupExternal()}updated(t){t.has("externalOpen")&&this.externalOpen&&!this.isOpen&&this.openPopupExternal(),t.has("anchorPosition")&&this.isOpen&&this.anchorPosition&&this.updatePosition(),t.has("isOpen")&&this._updatePortalContent(),this.isOpen&&t.size>0&&!t.has("isOpen")&&this._updatePortalContent()}handleClickOutside(t){if(this.ignoreNextClickOutside)return void(this.ignoreNextClickOutside=!1);const e=t.composedPath(),n=e.includes(this),o=!!this._portalContainer&&e.includes(this._portalContainer);!this.isOpen||n||o||this.closePopup()}openPopupExternal(){this.ignoreNextClickOutside=!0,requestAnimationFrame(()=>{this.openPopup()})}openPopup(){this.disabled||(this.updatePosition(),this._createPortal(),this.isOpen=!0,this._updatePortalContent())}closePopup(){this.isOpen=!1,this._updatePortalContent(),this.dispatchEvent(new CustomEvent("popup-closed",{bubbles:!0,composed:!0}))}updatePosition(){if(this.anchorPosition){const t=this.getPopupDimensions(),e=this.calculatePosition(t);this.left=e.left,this.top=e.top}}calculatePosition(t){if(!this.anchorPosition)return{left:0,top:0};const{width:e,height:n}=t;let o=this.anchorPosition.left,i=this.anchorPosition.bottom+4;return o=Math.max(8,Math.min(o,window.innerWidth-e-8)),i+n>window.innerHeight-8?(i=this.anchorPosition.top-4-n,i=Math.max(8,i)):i=Math.min(i,window.innerHeight-n-8),{left:o,top:i}}getPopupDimensions(){return{width:350,height:Math.min(400,window.innerHeight-100)}}getPopupClasses(){return""}getPopupStyles(){return{left:`${this.left}px`,top:`${this.top}px`}}getBaseStylesString(){return"\n      .pmc-popup-backdrop {\n        position: fixed;\n        top: 0;\n        left: 0;\n        right: 0;\n        bottom: 0;\n        z-index: 99998;\n      }\n\n      .pmc-popup-container {\n        position: fixed;\n        background: var(--card-background-color, #fff);\n        border-radius: 12px;\n        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);\n        z-index: 99999;\n        opacity: 0;\n        visibility: hidden;\n        transition: opacity 0.2s, visibility 0.2s;\n      }\n\n      .pmc-popup-container.open {\n        opacity: 1;\n        visibility: visible;\n      }\n    "}getComponentStylesString(){return""}_updatePortalContent(){if(!this._portalContainer)return;if(!this.isOpen)return void(this._portalContainer.innerHTML="");const t=document.createElement("div");t.className="pmc-popup-backdrop",t.addEventListener("click",()=>this.closePopup());const e=document.createElement("div"),n=`pmc-popup-container ${this.isOpen?"open":""} ${this.getPopupClasses()}`.trim();e.className=n;const o=this.getPopupStyles();Object.entries(o).forEach(([t,n])=>{e.style.setProperty(t,n)});const i=this.renderPopupContent();rt(i,e);const s=document.createElement("style"),r=this.getComponentStylesString();s.textContent=this.getBaseStylesString()+r,this._portalContainer.innerHTML="",this._portalContainer.appendChild(s),this._portalContainer.appendChild(t),this._portalContainer.appendChild(e)}render(){return F}}t([ut({type:Boolean})],ee.prototype,"disabled",void 0),t([ut({type:Boolean})],ee.prototype,"externalOpen",void 0),t([ut({type:Object})],ee.prototype,"anchorPosition",void 0),t([gt()],ee.prototype,"isOpen",void 0),t([gt()],ee.prototype,"top",void 0),t([gt()],ee.prototype,"left",void 0);let ne=class extends ee{constructor(){super(...arguments),this.rating=0,this.showLove=!0,this.showBan=!0,this.showTired=!0,this.popupOnly=!1}static get styles(){return[ee.baseStyles,r`
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
          <span>Love Song</span>
        </button>
      `:F}
      ${this.showBan?V`
        <button class="action-button ban" @click=${()=>this.handleBan()}>
          <ha-icon icon="mdi:thumb-down"></ha-icon>
          <span>Ban Song</span>
        </button>
      `:F}
      ${this.showTired?V`
        <button class="action-button tired" @click=${()=>this.handleTired()}>
          <ha-icon icon="mdi:sleep"></ha-icon>
          <span>Snooze (1 month)</span>
        </button>
      `:F}
    `}render(){const t=1===this.rating;return this.popupOnly?super.render():V`
      <button
        class="trigger-button ${t?"loved":""}"
        @click=${this.toggleMenu}
        ?disabled=${this.disabled}
        title="${t?"Loved":"Song actions"}"
      >
        <ha-icon icon="${t?"mdi:thumb-up":"mdi:thumbs-up-down-outline"}"></ha-icon>
      </button>
    `}};t([ut({type:Number})],ne.prototype,"rating",void 0),t([ut({type:Boolean})],ne.prototype,"showLove",void 0),t([ut({type:Boolean})],ne.prototype,"showBan",void 0),t([ut({type:Boolean})],ne.prototype,"showTired",void 0),t([ut({type:Boolean})],ne.prototype,"popupOnly",void 0),ne=t([ct("pmc-song-actions-menu")],ne);let oe=class extends ee{constructor(){super(...arguments),this.stations=[],this.currentStationId="",this.currentStationName="",this.songStationName="",this.popupOnly=!1}static get styles(){return[ee.baseStyles,r`
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
      `]}getPopupDimensions(){return{width:250,height:Math.min(36*this.stations.length+8,window.innerHeight-100)}}calculatePosition(t){if(!this.anchorPosition)return{left:0,top:0};const{width:e,height:n}=t;let o=this.anchorPosition.left-e/2;o=Math.max(8,Math.min(o,window.innerWidth-e-8));let i=this.anchorPosition.bottom+4;return i+n>window.innerHeight-8?(i=this.anchorPosition.top-4-n,i=Math.max(8,i)):i=Math.min(i,window.innerHeight-n-8),{left:o,top:i}}getComponentStylesString(){return"\n      .pmc-popup-container {\n        padding: 4px;\n        display: flex;\n        flex-direction: column;\n        gap: 2px;\n        min-width: 200px;\n        max-width: 300px;\n        max-height: calc(100vh - 100px);\n        overflow-y: auto;\n      }\n\n      .station-button {\n        display: flex;\n        align-items: center;\n        gap: 8px;\n        padding: 8px 12px;\n        border: none;\n        border-radius: 8px;\n        background: transparent;\n        color: var(--primary-text-color);\n        cursor: pointer;\n        transition: all 0.2s;\n        text-align: left;\n        font-size: 14px;\n        width: 100%;\n      }\n\n      .station-button:hover {\n        background: var(--secondary-background-color, rgba(0, 0, 0, 0.05));\n      }\n\n      .station-button.active {\n        background: var(--primary-color);\n        color: var(--text-primary-color, #fff);\n      }\n\n      .station-button.active:hover {\n        background: var(--primary-color);\n      }\n\n      .station-button ha-icon {\n        --mdc-icon-size: 20px;\n        flex-shrink: 0;\n      }\n\n      .station-button .station-text {\n        flex: 1;\n        overflow: hidden;\n        text-overflow: ellipsis;\n        white-space: nowrap;\n      }\n\n      .station-button .quickmix-badge {\n        --mdc-icon-size: 16px;\n        flex-shrink: 0;\n        color: var(--primary-color);\n      }\n\n      .station-button.active .quickmix-badge {\n        color: var(--text-primary-color, #fff);\n      }\n    "}toggleMenu(t){if(t.stopPropagation(),this.isOpen)this.closePopup();else{const e=t.currentTarget.getBoundingClientRect();this.anchorPosition={left:e.left+e.width/2,top:e.top,bottom:e.bottom,right:e.right},this.ignoreNextClickOutside=!0,requestAnimationFrame(()=>{this.openPopup()})}}handleStationClick(t){this.dispatchEvent(new CustomEvent("station-change",{detail:{stationId:t.id,stationName:t.name},bubbles:!0,composed:!0})),this.closePopup()}getCurrentStation(){return this.stations.find(t=>t.id===this.currentStationId)}renderPopupContent(){return V`
      ${this.stations.map(t=>{const e=t.id===this.currentStationId,n=t.isQuickMix?"mdi:shuffle":"mdi:play-circle-outline",o=t.isQuickMixed&&!t.isQuickMix;return V`
          <button
            class="station-button ${e?"active":""}"
            @click=${()=>this.handleStationClick(t)}
          >
            <ha-icon icon="${n}"></ha-icon>
            <span class="station-text">${t.name}</span>
            ${o?V`<ha-icon class="quickmix-badge" icon="mdi:shuffle"></ha-icon>`:F}
          </button>
        `})}
    `}render(){const t=this.getCurrentStation(),e=t?.isQuickMix??!1;let n=this.currentStationName||"Select Station";e&&this.songStationName&&(n=this.songStationName);const o=e?"mdi:shuffle":"mdi:radio";return this.popupOnly?super.render():V`
      <button
        class="trigger-button"
        @click=${this.toggleMenu}
        ?disabled=${this.disabled||0===this.stations.length}
        title="${n}"
      >
        <ha-icon icon="${o}"></ha-icon>
      </button>
    `}};t([ut({type:Array})],oe.prototype,"stations",void 0),t([ut({type:String})],oe.prototype,"currentStationId",void 0),t([ut({type:String})],oe.prototype,"currentStationName",void 0),t([ut({type:String})],oe.prototype,"songStationName",void 0),t([ut({type:Boolean})],oe.prototype,"popupOnly",void 0),oe=t([ct("pmc-station-selector")],oe);let ie=class extends lt{constructor(){super(...arguments),this.entityId="",this.showStationOption=!1,this.showRatingsOption=!1,this.showExplainOption=!1,this.showUpcomingOption=!1,this.showStationModeOption=!1,this.showQuickMixOption=!1,this.showStationInfoOption=!1,this.showAddMusicOption=!1,this.showCreateStationOption=!1,this.showRenameOption=!1,this.showDeleteOption=!1,this.isOn=!0,this.disabled=!1,this.buildTime="",this._menuOpen=!1,this._menuTop=0,this._menuLeft=0,this._portalContainer=null}connectedCallback(){super.connectedCallback(),this._handleClickOutside=this._handleClickOutside.bind(this),document.addEventListener("click",this._handleClickOutside)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._handleClickOutside),this._removePortal()}_createPortal(){this._portalContainer||(this._portalContainer=document.createElement("div"),this._portalContainer.className="pmc-overflow-menu-portal",document.body.appendChild(this._portalContainer))}_removePortal(){this._portalContainer&&(this._portalContainer.remove(),this._portalContainer=null)}_handleClickOutside(t){const e=t.composedPath(),n=e.includes(this),o=!!this._portalContainer&&e.includes(this._portalContainer);!this._menuOpen||n||o||(this._menuOpen=!1)}_toggleMenu(t){t.stopPropagation(),this.disabled||(this._menuOpen||(this._updateMenuPosition(),this._createPortal()),this._menuOpen=!this._menuOpen,this._updatePortalContent())}_updateMenuPosition(){const t=this.getBoundingClientRect();let e=2;this.showStationOption&&e++,this.showRatingsOption&&e++,this.showExplainOption&&e++,this.showUpcomingOption&&e++,this.showStationModeOption&&e++,this.showQuickMixOption&&e++,this.showStationInfoOption&&e++,this.showAddMusicOption&&e++,this.showCreateStationOption&&e++,this.showRenameOption&&e++,this.showDeleteOption&&e++;const n=44*e+(this.buildTime?40:0),o=window.innerHeight-16,i=Math.min(n,o);let s=t.right-180,r=t.bottom+4;s=Math.max(8,Math.min(s,window.innerWidth-180-8)),r+i>window.innerHeight-8?(r=t.top-4-i,r=Math.max(8,r)):r=Math.min(r,window.innerHeight-i-8),this._menuLeft=s,this._menuTop=r}_handleMoreInfo(){this.dispatchEvent(new CustomEvent("more-info",{bubbles:!0,composed:!0,detail:{entityId:this.entityId}})),this._menuOpen=!1}_getElementPosition(t){const e=t.getBoundingClientRect();return{left:e.left,top:e.top,bottom:e.bottom,right:e.right}}_handleSelectStation(t){const e=t.currentTarget;this.dispatchEvent(new CustomEvent("select-station",{bubbles:!0,composed:!0,detail:{anchorPosition:this._getElementPosition(e)}})),this._menuOpen=!1}_handleSelectRatings(t){const e=t.currentTarget;this.dispatchEvent(new CustomEvent("select-ratings",{bubbles:!0,composed:!0,detail:{anchorPosition:this._getElementPosition(e)}})),this._menuOpen=!1}_closeMenu(){this._menuOpen=!1,this._updatePortalContent()}_updatePortalContent(){if(!this._portalContainer)return;if(!this._menuOpen)return void(this._portalContainer.innerHTML="");let t="";this.showExplainOption&&(t+='\n        <button class="menu-item" data-action="explain-song">\n          <ha-icon icon="mdi:comment-question-outline"></ha-icon>\n          <span>Why this song?</span>\n        </button>\n      '),this.showUpcomingOption&&(t+='\n        <button class="menu-item" data-action="show-upcoming">\n          <ha-icon icon="mdi:playlist-music"></ha-icon>\n          <span>Show Upcoming Songs</span>\n        </button>\n      '),this.showRatingsOption&&(t+='\n        <button class="menu-item" data-action="select-ratings">\n          <ha-icon icon="mdi:thumbs-up-down-outline"></ha-icon>\n          <span>Song Ratings</span>\n        </button>\n      '),this.showStationModeOption&&(t+='\n        <button class="menu-item" data-action="station-mode">\n          <ha-icon icon="mdi:tune-variant"></ha-icon>\n          <span>Station Mode</span>\n        </button>\n      '),this.showStationInfoOption&&(t+='\n        <button class="menu-item" data-action="station-info">\n          <ha-icon icon="mdi:information"></ha-icon>\n          <span>Manage Seeds & Feedback</span>\n        </button>\n      '),(this.showStationModeOption||this.showStationInfoOption)&&(t+='<div style="height: 1px; background: var(--divider-color, rgba(0, 0, 0, 0.1)); margin: 4px 0;"></div>'),this.showCreateStationOption&&(t+='\n        <button class="menu-item" data-action="create-station">\n          <ha-icon icon="mdi:plus-circle"></ha-icon>\n          <span>Create Station</span>\n        </button>\n      '),this.showAddMusicOption&&(t+='\n        <button class="menu-item" data-action="add-music">\n          <ha-icon icon="mdi:playlist-plus"></ha-icon>\n          <span>Add Music to Station</span>\n        </button>\n      '),this.showRenameOption&&(t+='\n        <button class="menu-item" data-action="rename-station">\n          <ha-icon icon="mdi:pencil"></ha-icon>\n          <span>Rename Station</span>\n        </button>\n      '),this.showDeleteOption&&(t+='\n        <button class="menu-item destructive" data-action="delete-station">\n          <ha-icon icon="mdi:delete"></ha-icon>\n          <span>Delete Station</span>\n        </button>\n      '),(this.showStationOption||this.showRenameOption||this.showDeleteOption)&&(t+='<div style="height: 1px; background: var(--divider-color, rgba(0, 0, 0, 0.1)); margin: 4px 0;"></div>'),this.showStationOption&&(t+='\n        <button class="menu-item" data-action="select-station">\n          <ha-icon icon="mdi:radio"></ha-icon>\n          <span>Select Station</span>\n        </button>\n      '),this.showQuickMixOption&&(t+='\n        <button class="menu-item" data-action="quickmix">\n          <ha-icon icon="mdi:playlist-music"></ha-icon>\n          <span>QuickMix Settings</span>\n        </button>\n      '),t+=`\n      <button class="menu-item" data-action="more-info">\n        <ha-icon icon="mdi:information-outline"></ha-icon>\n        <span>More Information</span>\n      </button>\n      <button class="menu-item" data-action="power-toggle">\n        <ha-icon icon="mdi:power"></ha-icon>\n        <span>${this.isOn?"Disconnect":"Connect"}</span>\n      </button>\n    `,this.buildTime&&(t+=`<div class="build-time">${this._formatBuildTime(this.buildTime)}</div>`),this._portalContainer.innerHTML=`\n      <style>\n      .pmc-portal-backdrop {\n        position: fixed;\n        top: 0;\n        left: 0;\n        right: 0;\n        bottom: 0;\n        z-index: 99998;\n      }\n      .pmc-portal-menu {\n        position: fixed;\n        background: var(--card-background-color, #fff);\n        border-radius: 12px;\n        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);\n        padding: 4px;\n        display: flex;\n        flex-direction: column;\n        gap: 2px;\n        z-index: 99999;\n        min-width: 180px;\n        max-height: calc(100vh - 16px);\n        overflow-y: auto;\n      }\n      .pmc-portal-menu .menu-item {\n        display: flex;\n        align-items: center;\n        gap: 12px;\n        padding: 10px 16px;\n        border: none;\n        border-radius: 8px;\n        background: transparent;\n        color: var(--primary-text-color);\n        cursor: pointer;\n        transition: all 0.2s;\n        text-align: left;\n        font-size: 14px;\n        width: 100%;\n      }\n      .pmc-portal-menu .menu-item:hover {\n        background: var(--secondary-background-color, rgba(0, 0, 0, 0.05));\n      }\n      .pmc-portal-menu .menu-item ha-icon {\n        --mdc-icon-size: 20px;\n      }\n      .pmc-portal-menu .build-time {\n        padding: 8px 16px;\n        font-size: 11px;\n        color: var(--secondary-text-color, rgba(0, 0, 0, 0.5));\n        text-align: center;\n        border-top: 1px solid var(--divider-color, rgba(0, 0, 0, 0.1));\n        margin-top: 4px;\n        pointer-events: none;\n        user-select: text;\n      }\n    </style>\n      <div class="pmc-portal-backdrop"></div>\n      <div class="pmc-portal-menu" style="left: ${this._menuLeft}px; top: ${this._menuTop}px;">\n        ${t}\n      </div>\n    `;const e=this._portalContainer.querySelector(".pmc-portal-backdrop");e?.addEventListener("click",()=>{this._menuOpen=!1,this._updatePortalContent()});this._portalContainer.querySelectorAll(".menu-item").forEach(t=>{t.addEventListener("click",e=>{const n=t.dataset.action;if("more-info"===n)this.dispatchEvent(new CustomEvent("more-info",{bubbles:!0,composed:!0,detail:{entityId:this.entityId}}));else if("power-toggle"===n)this.dispatchEvent(new CustomEvent("power-toggle",{bubbles:!0,composed:!0}));else if("select-station"===n){const e=t.getBoundingClientRect();this.dispatchEvent(new CustomEvent("select-station",{bubbles:!0,composed:!0,detail:{anchorPosition:{left:e.left,top:e.top,bottom:e.bottom,right:e.right}}}))}else if("select-ratings"===n){const e=t.getBoundingClientRect();this.dispatchEvent(new CustomEvent("select-ratings",{bubbles:!0,composed:!0,detail:{anchorPosition:{left:e.left,top:e.top,bottom:e.bottom,right:e.right}}}))}else if("explain-song"===n)this.dispatchEvent(new CustomEvent("explain-song",{bubbles:!0,composed:!0}));else if("show-upcoming"===n){const e=t.getBoundingClientRect();this.dispatchEvent(new CustomEvent("show-upcoming",{bubbles:!0,composed:!0,detail:{anchorPosition:{left:e.left,top:e.top,bottom:e.bottom,right:e.right}}}))}else if("station-mode"===n){const e=t.getBoundingClientRect();this.dispatchEvent(new CustomEvent("station-mode",{bubbles:!0,composed:!0,detail:{anchorPosition:{left:e.left,top:e.top,bottom:e.bottom,right:e.right}}}))}else if("station-info"===n){const e=t.getBoundingClientRect();this.dispatchEvent(new CustomEvent("station-info",{bubbles:!0,composed:!0,detail:{anchorPosition:{left:e.left,top:e.top,bottom:e.bottom,right:e.right}}}))}else if("quickmix"===n){const e=t.getBoundingClientRect();this.dispatchEvent(new CustomEvent("quickmix",{bubbles:!0,composed:!0,detail:{anchorPosition:{left:e.left,top:e.top,bottom:e.bottom,right:e.right}}}))}else if("add-music"===n){const e=t.getBoundingClientRect();this.dispatchEvent(new CustomEvent("add-music",{bubbles:!0,composed:!0,detail:{anchorPosition:{left:e.left,top:e.top,bottom:e.bottom,right:e.right}}}))}else if("create-station"===n){const e=t.getBoundingClientRect();this.dispatchEvent(new CustomEvent("create-station",{bubbles:!0,composed:!0,detail:{anchorPosition:{left:e.left,top:e.top,bottom:e.bottom,right:e.right}}}))}else if("rename-station"===n){const e=t.getBoundingClientRect();this.dispatchEvent(new CustomEvent("rename-station",{bubbles:!0,composed:!0,detail:{anchorPosition:{left:e.left,top:e.top,bottom:e.bottom,right:e.right}}}))}else if("delete-station"===n){const e=t.getBoundingClientRect();this.dispatchEvent(new CustomEvent("delete-station",{bubbles:!0,composed:!0,detail:{anchorPosition:{left:e.left,top:e.top,bottom:e.bottom,right:e.right}}}))}this._menuOpen=!1,this._updatePortalContent()})})}render(){return V`
      <button
        class="trigger-button"
        @click=${this._toggleMenu}
        ?disabled=${this.disabled}
        title="More options"
      >
        <ha-icon icon="mdi:dots-vertical"></ha-icon>
      </button>
    `}_formatBuildTime(t){try{const e=new Date(t),n=e.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"});return`Built: ${n} ${e.toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit",hour12:!0})}`}catch{return`Built: ${t}`}}};ie.styles=r`
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
  `,t([ut({type:String})],ie.prototype,"entityId",void 0),t([ut({type:Boolean})],ie.prototype,"showStationOption",void 0),t([ut({type:Boolean})],ie.prototype,"showRatingsOption",void 0),t([ut({type:Boolean})],ie.prototype,"showExplainOption",void 0),t([ut({type:Boolean})],ie.prototype,"showUpcomingOption",void 0),t([ut({type:Boolean})],ie.prototype,"showStationModeOption",void 0),t([ut({type:Boolean})],ie.prototype,"showQuickMixOption",void 0),t([ut({type:Boolean})],ie.prototype,"showStationInfoOption",void 0),t([ut({type:Boolean})],ie.prototype,"showAddMusicOption",void 0),t([ut({type:Boolean})],ie.prototype,"showCreateStationOption",void 0),t([ut({type:Boolean})],ie.prototype,"showRenameOption",void 0),t([ut({type:Boolean})],ie.prototype,"showDeleteOption",void 0),t([ut({type:Boolean})],ie.prototype,"isOn",void 0),t([ut({type:Boolean})],ie.prototype,"disabled",void 0),t([ut({type:String})],ie.prototype,"buildTime",void 0),t([gt()],ie.prototype,"_menuOpen",void 0),t([gt()],ie.prototype,"_menuTop",void 0),t([gt()],ie.prototype,"_menuLeft",void 0),ie=t([ct("pmc-overflow-menu")],ie);let se=class extends ee{constructor(){super(...arguments),this.songs=[]}static get styles(){return[ee.baseStyles,r`
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
      <div class="popup-header">Upcoming Songs</div>
      ${this.songs.length>0?this.songs.map(t=>this.renderSongItem(t)):V`<div class="no-songs">No upcoming songs</div>`}
    `}renderSongItem(t){return V`
      <div class="song-item">
        ${t.coverArt?V`<img class="song-artwork" src="${t.coverArt}" alt="" />`:V`
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
              `:F}
          ${1===t.rating?V`
                <div class="song-rating">
                  <ha-icon icon="mdi:thumb-up"></ha-icon>
                </div>
              `:F}
        </div>
      </div>
    `}};t([ut({type:Array})],se.prototype,"songs",void 0),se=t([ct("pmc-upcoming-songs-popup")],se);let re=class extends ee{constructor(){super(...arguments),this.currentStationId="",this.currentStationName="",this.modes=[],this.loading=!1,this._selectedModeId=null}static get styles(){return[ee.baseStyles,r`
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

    .popup-header {
      padding: 12px 16px;
      font-size: 16px;
      font-weight: 600;
      color: var(--primary-text-color);
      border-bottom: 1px solid var(--pmc-divider);
      margin-bottom: 8px;
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
    `]}getPopupDimensions(){const t=80*this.modes.length+150,e=window.innerHeight-100;return{width:400,height:Math.min(t,e)}}openPopup(){const t=this.modes.find(t=>t.active);t&&null===this._selectedModeId&&(this._selectedModeId=t.id),super.openPopup()}closePopup(){this._selectedModeId=null,super.closePopup()}updated(t){if(super.updated(t),t.has("modes")&&this.modes.length>0){const t=this.modes.find(t=>t.active);t&&null===this._selectedModeId&&(this._selectedModeId=t.id)}}getComponentStylesString(){return'\n      .pmc-popup-container {\n        min-width: 350px;\n        max-width: 500px;\n        max-height: calc(100vh - 100px);\n        overflow-y: auto;\n        padding: 8px;\n        display: flex;\n        flex-direction: column;\n        gap: 4px;\n      }\n\n      .popup-header {\n        padding: 12px 16px;\n        font-size: 16px;\n        font-weight: 600;\n        color: var(--primary-text-color);\n        border-bottom: 1px solid var(--divider-color, rgba(0, 0, 0, 0.1));\n        margin-bottom: 8px;\n      }\n\n      .info-note {\n        padding: 12px;\n        background: var(--secondary-background-color, rgba(0, 0, 0, 0.05));\n        border-radius: 8px;\n        font-size: 13px;\n        color: var(--secondary-text-color);\n        line-height: 1.4;\n        margin-bottom: 12px;\n      }\n\n      .modes-list {\n        display: flex;\n        flex-direction: column;\n        gap: 8px;\n        margin-bottom: 12px;\n      }\n\n      .mode-item {\n        display: flex;\n        flex-direction: column;\n        gap: 8px;\n        padding: 12px;\n        background: transparent;\n        border-radius: 8px;\n        cursor: pointer;\n        transition: all 0.2s;\n        user-select: none;\n        border: 2px solid transparent;\n      }\n\n      .mode-item:hover {\n        background: var(--secondary-background-color, rgba(0, 0, 0, 0.05));\n      }\n\n      .mode-item.active {\n        border-color: var(--primary-color);\n        background: rgba(118, 75, 162, 0.1);\n      }\n\n      .mode-item.selected {\n        border-color: var(--primary-color);\n      }\n\n      .mode-header {\n        display: flex;\n        align-items: center;\n        gap: 12px;\n      }\n\n      .mode-header input[type="radio"] {\n        margin: 0;\n        cursor: pointer;\n      }\n\n      .mode-name {\n        font-size: 15px;\n        font-weight: 500;\n        color: var(--primary-text-color);\n        flex: 1;\n      }\n\n      .mode-active-badge {\n        padding: 4px 10px;\n        background: var(--primary-color);\n        color: white;\n        border-radius: 12px;\n        font-size: 11px;\n        font-weight: 600;\n        text-transform: uppercase;\n      }\n\n      .mode-description {\n        font-size: 13px;\n        color: var(--secondary-text-color);\n        line-height: 1.4;\n        margin-left: 32px;\n      }\n\n      .popup-footer {\n        display: flex;\n        justify-content: flex-end;\n        gap: 8px;\n        padding-top: 8px;\n        border-top: 1px solid var(--divider-color, rgba(0, 0, 0, 0.1));\n      }\n\n      .popup-footer button {\n        padding: 8px 16px;\n        border: none;\n        border-radius: 8px;\n        font-size: 14px;\n        font-weight: 500;\n        cursor: pointer;\n        transition: all 0.2s;\n      }\n\n      .popup-footer button:disabled {\n        opacity: 0.5;\n        cursor: not-allowed;\n      }\n\n      .button-cancel {\n        background: transparent;\n        color: var(--primary-text-color);\n      }\n\n      .button-cancel:hover:not(:disabled) {\n        background: var(--secondary-background-color, rgba(0, 0, 0, 0.05));\n      }\n\n      .button-confirm {\n        background: var(--primary-color);\n        color: white;\n      }\n\n      .button-confirm:hover:not(:disabled) {\n        opacity: 0.9;\n      }\n\n      .loading {\n        padding: 24px;\n        text-align: center;\n        color: var(--secondary-text-color);\n        font-size: 14px;\n      }\n\n      .no-modes {\n        padding: 24px;\n        text-align: center;\n        color: var(--secondary-text-color);\n        font-size: 14px;\n      }\n    '}_handleModeSelect(t){this._selectedModeId=t}_handleSetMode(){this.currentStationId&&null!==this._selectedModeId&&(this.dispatchEvent(new CustomEvent("set-mode",{bubbles:!0,composed:!0,detail:{stationId:this.currentStationId,modeId:this._selectedModeId}})),this.closePopup())}renderPopupContent(){return V`
      <div class="popup-header">
        ${this.currentStationName?`Station Mode: ${this.currentStationName}`:"Station Mode"}
      </div>
      
      ${this.loading?V`<div class="loading">Loading modes...</div>`:0===this.modes.length?V`<div class="no-modes">No modes available</div>`:V`
              <div class="info-note">
                Note: Changing the station mode will restart playback.
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
                      ${t.active?V`<span class="mode-active-badge">Active</span>`:F}
                    </div>
                    <div class="mode-description">${t.description}</div>
                  </div>
                `)}
              </div>
              
              <div class="popup-footer">
                <button class="button-cancel" @click=${()=>this.closePopup()}>
                  Cancel
                </button>
                <button 
                  class="button-confirm"
                  ?disabled=${null===this._selectedModeId}
                  @click=${()=>this._handleSetMode()}
                >
                  Set Mode
                </button>
              </div>
            `}
    `}};t([ut({type:String})],re.prototype,"currentStationId",void 0),t([ut({type:String})],re.prototype,"currentStationName",void 0),t([ut({type:Array})],re.prototype,"modes",void 0),t([ut({type:Boolean})],re.prototype,"loading",void 0),t([gt()],re.prototype,"_selectedModeId",void 0),re=t([ct("pmc-station-mode-popup")],re);let ae=class extends ee{constructor(){super(...arguments),this.stations=[],this.selectedStationIds=new Set}static get styles(){return[ee.baseStyles,r`
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
      `]}openPopup(){this.initializeSelection(),super.openPopup()}getPopupDimensions(){const t=this.stations.filter(t=>!t.isQuickMix).length,e=50*t+120,n=window.innerHeight-100;return{width:315,height:Math.min(e,n)}}getComponentStylesString(){return'\n      .pmc-popup-container {\n        padding: 8px;\n        display: flex;\n        flex-direction: column;\n        gap: 4px;\n        min-width: 280px;\n        max-width: 350px;\n        max-height: calc(100vh - 100px);\n        overflow-y: auto;\n        transform: translateX(-50%);\n      }\n\n      .header {\n        padding: 12px 8px 8px;\n        font-weight: 600;\n        font-size: 16px;\n        color: var(--primary-text-color);\n        border-bottom: 1px solid var(--divider-color, rgba(0, 0, 0, 0.1));\n      }\n\n      .list-container {\n        display: flex;\n        flex-direction: column;\n        gap: 2px;\n        padding: 4px 0;\n      }\n\n      .list-item {\n        display: flex;\n        align-items: center;\n        padding: 10px 12px;\n        border-radius: 8px;\n        background: transparent;\n        transition: background 0.2s;\n        cursor: pointer;\n      }\n\n      .list-item:hover:not(.disabled) {\n        background: var(--secondary-background-color, rgba(0, 0, 0, 0.05));\n      }\n\n      .list-item.disabled {\n        opacity: 0.6;\n        cursor: not-allowed;\n      }\n\n      .list-item label {\n        display: flex;\n        align-items: center;\n        gap: 12px;\n        width: 100%;\n        cursor: pointer;\n      }\n\n      .list-item.disabled label {\n        cursor: not-allowed;\n      }\n\n      .list-item input[type="checkbox"] {\n        width: 20px;\n        height: 20px;\n        cursor: pointer;\n        margin: 0;\n        flex-shrink: 0;\n      }\n\n      .list-item.disabled input[type="checkbox"] {\n        cursor: not-allowed;\n      }\n\n      .item-name {\n        flex: 1;\n        font-size: 14px;\n        color: var(--primary-text-color);\n      }\n\n      .footer {\n        display: flex;\n        gap: 8px;\n        padding: 8px;\n        border-top: 1px solid var(--divider-color, rgba(0, 0, 0, 0.1));\n        justify-content: flex-end;\n      }\n\n      .footer button {\n        padding: 8px 16px;\n        border-radius: 8px;\n        border: none;\n        font-size: 14px;\n        font-weight: 500;\n        cursor: pointer;\n        transition: all 0.2s;\n      }\n\n      .footer button.cancel {\n        background: transparent;\n        color: var(--primary-text-color);\n      }\n\n      .footer button.cancel:hover {\n        background: var(--secondary-background-color, rgba(0, 0, 0, 0.05));\n      }\n\n      .footer button.save {\n        background: var(--primary-color);\n        color: var(--text-primary-color, #fff);\n      }\n\n      .footer button.save:hover {\n        opacity: 0.9;\n      }\n\n      .footer button:disabled {\n        opacity: 0.6;\n        cursor: not-allowed;\n      }\n\n      .no-stations {\n        padding: 16px;\n        text-align: center;\n        color: var(--secondary-text-color);\n      }\n    '}initializeSelection(){this.selectedStationIds=new Set(this.stations.filter(t=>t.isQuickMixed&&!t.isQuickMix).map(t=>t.id))}handleCheckboxChange(t,e){e?this.selectedStationIds.add(t):this.selectedStationIds.delete(t),this.requestUpdate()}handleSave(){const t=Array.from(this.selectedStationIds);this.dispatchEvent(new CustomEvent("save",{bubbles:!0,composed:!0,detail:{stationIds:t}})),this.closePopup()}handleCancel(){this.closePopup()}renderPopupContent(){const t=this.stations.filter(t=>!t.isQuickMix);return V`
      <div class="header">Select QuickMix Stations</div>
      
      ${0===t.length?V`<div class="no-stations">No stations available</div>`:V`
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
                Cancel
              </button>
              <button class="save" @click=${()=>this.handleSave()} ?disabled=${this.disabled}>
                Save
              </button>
            </div>
          `}
    `}};t([ut({type:Array})],ae.prototype,"stations",void 0),t([gt()],ae.prototype,"selectedStationIds",void 0),ae=t([ct("pmc-quickmix-popup")],ae);class le extends ee{calculatePosition(t){return{left:window.innerWidth/2,top:window.innerHeight/2}}getPopupStyles(){return{left:`${this.left}px`,top:`${this.top}px`,transform:"translate(-50%, -50%)"}}updatePosition(){const t=this.getPopupDimensions(),e=this.calculatePosition(t);this.left=e.left,this.top=e.top}openPopup(){this.disabled||(this.updatePosition(),this._createPortal(),this.isOpen=!0,this._updatePortalContent())}}let de=class extends le{constructor(){super(...arguments),this.stations=[],this._stage="select-station",this._selectedStationId=null,this._selectedStationName="",this._newName=""}static get styles(){return[r`
        :host {
          position: relative;
          display: inline-block;
        }
      `]}getComponentStylesString(){return'\n      .dialog {\n        position: fixed;\n        background: var(--pmc-card-background);\n        border-radius: 12px;\n        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);\n        padding: 0;\n        display: flex;\n        flex-direction: column;\n        z-index: 99999;\n        min-width: 320px;\n        max-width: 450px;\n        max-height: calc(100vh - 100px);\n      }\n\n      .dialog-header {\n        padding: 16px 20px;\n        font-weight: 600;\n        font-size: 18px;\n        color: var(--primary-text-color);\n        border-bottom: 1px solid var(--pmc-divider);\n      }\n\n      .dialog-body {\n        padding: 20px;\n        overflow-y: auto;\n        flex: 1;\n        min-height: 0;\n      }\n\n      .station-list {\n        display: flex;\n        flex-direction: column;\n        gap: 8px;\n      }\n\n      .station-item {\n        display: flex;\n        align-items: center;\n        padding: 12px;\n        border-radius: 8px;\n        background: transparent;\n        transition: background 0.2s;\n        cursor: pointer;\n      }\n\n      .station-item:hover:not(.disabled) {\n        background: var(--pmc-secondary-background);\n      }\n\n      .station-item.disabled {\n        opacity: 0.6;\n        cursor: not-allowed;\n      }\n\n      .station-item label {\n        display: flex;\n        align-items: center;\n        gap: 12px;\n        width: 100%;\n        cursor: pointer;\n      }\n\n      .station-item.disabled label {\n        cursor: not-allowed;\n      }\n\n      .station-item input[type="radio"] {\n        width: 20px;\n        height: 20px;\n        cursor: pointer;\n        margin: 0;\n        flex-shrink: 0;\n      }\n\n      .station-item.disabled input[type="radio"] {\n        cursor: not-allowed;\n      }\n\n      .station-name {\n        flex: 1;\n        font-size: 14px;\n        color: var(--primary-text-color);\n      }\n\n      .name-input-section {\n        display: flex;\n        flex-direction: column;\n        gap: 16px;\n      }\n\n      .current-station {\n        font-size: 14px;\n        color: var(--secondary-text-color);\n      }\n\n      .current-station strong {\n        color: var(--primary-text-color);\n      }\n\n      .name-input {\n        width: 100%;\n        padding: 12px 16px;\n        border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));\n        border-radius: 8px;\n        background: var(--secondary-background-color, rgba(128, 128, 128, 0.1));\n        color: var(--primary-text-color);\n        font-size: 16px;\n        font-family: inherit;\n        box-sizing: border-box;\n      }\n\n      .name-input:focus {\n        outline: none;\n        border-color: var(--primary-color);\n      }\n\n      .info-note {\n        padding: 12px;\n        background: var(--pmc-secondary-background);\n        border-radius: 8px;\n        font-size: 13px;\n        color: var(--secondary-text-color);\n        line-height: 1.4;\n      }\n\n      .dialog-footer {\n        display: flex;\n        gap: 8px;\n        padding: 16px 20px;\n        border-top: 1px solid var(--pmc-divider);\n        justify-content: flex-end;\n      }\n\n      .dialog-footer button {\n        padding: 8px 16px;\n        border-radius: 8px;\n        border: none;\n        font-size: 14px;\n        font-weight: 500;\n        cursor: pointer;\n        transition: all 0.2s;\n      }\n\n      .dialog-footer button.back {\n        margin-right: auto;\n        background: transparent;\n        color: var(--primary-text-color);\n      }\n\n      .dialog-footer button.back:hover {\n        background: var(--pmc-secondary-background);\n      }\n\n      .dialog-footer button.cancel {\n        background: transparent;\n        color: var(--primary-text-color);\n      }\n\n      .dialog-footer button.cancel:hover {\n        background: var(--pmc-secondary-background);\n      }\n\n      .dialog-footer button.confirm {\n        background: var(--primary-color);\n        color: var(--text-primary-color);\n      }\n\n      .dialog-footer button.confirm:hover {\n        opacity: 0.9;\n      }\n\n      .dialog-footer button:disabled {\n        opacity: 0.6;\n        cursor: not-allowed;\n      }\n\n      .no-stations {\n        padding: 16px;\n        text-align: center;\n        color: var(--secondary-text-color);\n      }\n    '}getPopupDimensions(){return{width:Math.min(450,.9*window.innerWidth),height:Math.min(window.innerHeight-100,600)}}closePopup(){this._stage="select-station",this._selectedStationId=null,this._selectedStationName="",this._newName="",super.closePopup()}_handleStationSelect(t,e){this._selectedStationId=t,this._selectedStationName=e,this.requestUpdate()}_handleNext(){this._selectedStationId&&(this._stage="enter-name",this._newName=this._selectedStationName,this.requestUpdate())}_handleBack(){this._stage="select-station",this._newName="",this.requestUpdate()}_handleRename(){this._selectedStationId&&this._newName.trim()&&this._newName!==this._selectedStationName&&(this.dispatchEvent(new CustomEvent("rename-station",{bubbles:!0,composed:!0,detail:{stationId:this._selectedStationId,newName:this._newName.trim()}})),this.closePopup())}_handleCancel(){this.closePopup()}_renderSelectStation(){const t=this.stations.filter(t=>!t.isQuickMix);return V`
      <div class="dialog-header">Rename Station</div>
      <div class="dialog-body">
        ${0===t.length?V`<div class="no-stations">No stations available to rename</div>`:V`
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
          Cancel
        </button>
        <button class="confirm" @click=${()=>this._handleNext()} ?disabled=${!this._selectedStationId||this.disabled}>
          Next
        </button>
      </div>
    `}_renderEnterName(){const t=this._newName.trim()&&this._newName!==this._selectedStationName;return V`
      <div class="dialog-header">Rename: ${this._selectedStationName}</div>
      <div class="dialog-body">
        <div class="name-input-section">
          <div class="current-station">
            Current name: <strong>${this._selectedStationName}</strong>
          </div>
          
          <input
            type="text"
            class="name-input"
            id="rename-input"
            placeholder="Enter new station name"
            .value=${this._newName}
            ?disabled=${this.disabled}
            @input=${t=>{const e=t.target,n=e.selectionStart;this._newName=e.value,this.requestUpdate(),this.updateComplete.then(()=>{const t=document.querySelector(".pmc-popup-container #rename-input");t&&(t.focus(),null!==n&&t.setSelectionRange(n,n))})}}
            @keydown=${e=>{"Enter"===e.key&&t&&!this.disabled&&this._handleRename()}}
            autofocus
          />
          
          <div class="info-note">
            Note: Pandora may not allow some stations to be renamed.
          </div>
        </div>
      </div>
      <div class="dialog-footer">
        <button class="back" @click=${()=>this._handleBack()} ?disabled=${this.disabled}>
          Back
        </button>
        <button class="cancel" @click=${()=>this._handleCancel()} ?disabled=${this.disabled}>
          Cancel
        </button>
        <button class="confirm" @click=${()=>this._handleRename()} ?disabled=${!t||this.disabled}>
          Rename
        </button>
      </div>
    `}renderPopupContent(){return"select-station"===this._stage?this._renderSelectStation():this._renderEnterName()}};t([ut({type:Array})],de.prototype,"stations",void 0),t([gt()],de.prototype,"_stage",void 0),t([gt()],de.prototype,"_selectedStationId",void 0),t([gt()],de.prototype,"_selectedStationName",void 0),t([gt()],de.prototype,"_newName",void 0),de=t([ct("pmc-rename-dialog")],de);let ce=class extends le{constructor(){super(...arguments),this.stations=[],this._selectedStationId=null,this._selectedStationName=""}static get styles(){return[r`
        :host {
          position: relative;
          display: inline-block;
        }
      `]}getComponentStylesString(){return'\n      .dialog {\n        position: fixed;\n        background: var(--pmc-card-background);\n        border-radius: 12px;\n        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);\n        padding: 0;\n        display: flex;\n        flex-direction: column;\n        z-index: 99999;\n        min-width: 320px;\n        max-width: 450px;\n        max-height: calc(100vh - 100px);\n      }\n\n      .dialog-header {\n        padding: 16px 20px;\n        font-weight: 600;\n        font-size: 18px;\n        color: var(--primary-text-color);\n        border-bottom: 1px solid var(--pmc-divider);\n      }\n\n      .dialog-body {\n        padding: 20px;\n        overflow-y: auto;\n        flex: 1;\n        min-height: 0;\n      }\n\n      .station-list {\n        display: flex;\n        flex-direction: column;\n        gap: 8px;\n      }\n\n      .station-item {\n        display: flex;\n        align-items: center;\n        padding: 12px;\n        border-radius: 8px;\n        background: transparent;\n        transition: background 0.2s;\n        cursor: pointer;\n      }\n\n      .station-item:hover:not(.disabled) {\n        background: var(--pmc-secondary-background);\n      }\n\n      .station-item.disabled {\n        opacity: 0.6;\n        cursor: not-allowed;\n      }\n\n      .station-item label {\n        display: flex;\n        align-items: center;\n        gap: 12px;\n        width: 100%;\n        cursor: pointer;\n      }\n\n      .station-item.disabled label {\n        cursor: not-allowed;\n      }\n\n      .station-item input[type="radio"] {\n        width: 20px;\n        height: 20px;\n        cursor: pointer;\n        margin: 0;\n        flex-shrink: 0;\n      }\n\n      .station-item.disabled input[type="radio"] {\n        cursor: not-allowed;\n      }\n\n      .station-name {\n        flex: 1;\n        font-size: 14px;\n        color: var(--primary-text-color);\n      }\n\n      .warning-message {\n        padding: 16px;\n        background: rgba(244, 67, 54, 0.1);\n        border-left: 4px solid #f44336;\n        border-radius: 4px;\n        margin-bottom: 16px;\n      }\n\n      .warning-message p {\n        margin: 0;\n        font-size: 14px;\n        color: var(--primary-text-color);\n        line-height: 1.4;\n      }\n\n      .warning-message strong {\n        color: #f44336;\n      }\n\n      .dialog-footer {\n        display: flex;\n        gap: 8px;\n        padding: 16px 20px;\n        border-top: 1px solid var(--pmc-divider);\n        justify-content: flex-end;\n      }\n\n      .dialog-footer button {\n        padding: 8px 16px;\n        border-radius: 8px;\n        border: none;\n        font-size: 14px;\n        font-weight: 500;\n        cursor: pointer;\n        transition: all 0.2s;\n      }\n\n      .dialog-footer button.cancel {\n        background: transparent;\n        color: var(--primary-text-color);\n      }\n\n      .dialog-footer button.cancel:hover {\n        background: var(--pmc-secondary-background);\n      }\n\n      .dialog-footer button.delete {\n        background: #f44336;\n        color: #fff;\n      }\n\n      .dialog-footer button.delete:hover {\n        background: #d32f2f;\n      }\n\n      .dialog-footer button:disabled {\n        opacity: 0.6;\n        cursor: not-allowed;\n      }\n\n      .no-stations {\n        padding: 16px;\n        text-align: center;\n        color: var(--secondary-text-color);\n      }\n    '}getPopupDimensions(){return{width:Math.min(450,.9*window.innerWidth),height:Math.min(window.innerHeight-100,600)}}closePopup(){this._selectedStationId=null,this._selectedStationName="",super.closePopup()}_handleStationSelect(t,e){this._selectedStationId=t,this._selectedStationName=e,this.requestUpdate()}_handleDelete(){this._selectedStationId&&this._selectedStationName&&(this.dispatchEvent(new CustomEvent("delete-station",{bubbles:!0,composed:!0,detail:{stationId:this._selectedStationId,stationName:this._selectedStationName}})),this.closePopup())}_handleCancel(){this.closePopup()}renderPopupContent(){const t=this.stations.filter(t=>!t.isQuickMix);return V`
      <div class="dialog-header">Delete Station</div>
      <div class="dialog-body">
        <div class="warning-message">
          <p>
            <strong>Warning:</strong> This will permanently delete the selected station. 
            This action cannot be undone.
          </p>
        </div>
        
        ${0===t.length?V`<div class="no-stations">No stations available to delete</div>`:V`
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
          Cancel
        </button>
        <button class="delete" @click=${()=>this._handleDelete()} ?disabled=${!this._selectedStationId||this.disabled}>
          Delete Station
        </button>
      </div>
    `}};t([ut({type:Array})],ce.prototype,"stations",void 0),t([gt()],ce.prototype,"_selectedStationId",void 0),t([gt()],ce.prototype,"_selectedStationName",void 0),ce=t([ct("pmc-delete-dialog")],ce);let pe=class extends le{constructor(){super(...arguments),this.currentStationId="",this.currentStationName="",this.stationInfo=null,this.infoLoading=!1,this._expandedSections=new Set(["artistSeeds","songSeeds","stationSeeds","feedback"])}static get styles(){return[r`
        :host {
          position: relative;
          display: inline-block;
        }
      `]}getComponentStylesString(){return"\n      .dialog {\n        position: fixed;\n        background: var(--pmc-card-background);\n        border-radius: 12px;\n        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);\n        padding: 0;\n        display: flex;\n        flex-direction: column;\n        z-index: 99999;\n        width: 90vw;\n        max-width: 650px;\n        max-height: 80vh;\n      }\n\n      .dialog-header {\n        padding: 16px 20px;\n        font-weight: 600;\n        font-size: 18px;\n        color: var(--primary-text-color);\n        border-bottom: 1px solid var(--pmc-divider);\n      }\n\n      .dialog-body {\n        padding: 12px;\n        overflow-y: auto;\n        flex: 1;\n      }\n\n      .seeds-container {\n        display: flex;\n        flex-direction: column;\n        gap: 8px;\n      }\n\n      .section {\n        border-radius: 8px;\n        overflow: hidden;\n      }\n\n      .section-header {\n        display: flex;\n        align-items: center;\n        padding: 12px;\n        cursor: pointer;\n        background: var(--pmc-secondary-background);\n        transition: background 0.2s;\n        user-select: none;\n      }\n\n      .section-header:hover {\n        background: rgba(128, 128, 128, 0.15);\n      }\n\n      .chevron {\n        margin-right: 8px;\n        transition: transform 0.2s;\n        font-size: 20px;\n        color: var(--secondary-text-color);\n      }\n\n      .chevron.expanded {\n        transform: rotate(90deg);\n      }\n\n      .section-title {\n        font-size: 15px;\n        font-weight: 500;\n        color: var(--primary-text-color);\n        flex: 1;\n      }\n\n      .section-count {\n        font-size: 13px;\n        color: var(--secondary-text-color);\n        margin-left: 8px;\n      }\n\n      .section-content {\n        padding: 8px;\n        display: flex;\n        flex-direction: column;\n        gap: 4px;\n      }\n\n      .seed-item, .feedback-item {\n        display: flex;\n        align-items: center;\n        gap: 12px;\n        padding: 10px 12px;\n        background: var(--pmc-secondary-background);\n        border-radius: 6px;\n      }\n\n      .seed-info {\n        flex: 1;\n        min-width: 0;\n      }\n\n      .seed-name, .feedback-title {\n        font-size: 14px;\n        color: var(--primary-text-color);\n        font-weight: 500;\n        white-space: nowrap;\n        overflow: hidden;\n        text-overflow: ellipsis;\n      }\n\n      .seed-artist, .feedback-artist {\n        font-size: 12px;\n        color: var(--secondary-text-color);\n        white-space: nowrap;\n        overflow: hidden;\n        text-overflow: ellipsis;\n      }\n\n      .feedback-icon {\n        font-size: 20px;\n        margin-right: 4px;\n      }\n\n      .feedback-icon.loved {\n        color: #4CAF50;\n      }\n\n      .feedback-icon.banned {\n        color: #F44336;\n      }\n\n      .delete-button {\n        padding: 6px 12px;\n        border: none;\n        border-radius: 6px;\n        background: rgba(244, 67, 54, 0.1);\n        color: #f44336;\n        cursor: pointer;\n        font-size: 12px;\n        font-weight: 500;\n        transition: all 0.2s;\n      }\n\n      .delete-button:hover:not(:disabled) {\n        background: #f44336;\n        color: #fff;\n      }\n\n      .delete-button:disabled {\n        opacity: 0.6;\n        cursor: not-allowed;\n      }\n\n      .no-items {\n        padding: 32px;\n        text-align: center;\n        color: var(--secondary-text-color);\n        font-size: 14px;\n      }\n\n      .loading {\n        padding: 32px;\n        text-align: center;\n        color: var(--secondary-text-color);\n      }\n\n      .dialog-footer {\n        display: flex;\n        gap: 8px;\n        padding: 16px 20px;\n        border-top: 1px solid var(--pmc-divider);\n        justify-content: flex-end;\n      }\n\n      .dialog-footer button {\n        padding: 8px 16px;\n        border-radius: 8px;\n        border: none;\n        font-size: 14px;\n        font-weight: 500;\n        cursor: pointer;\n        transition: all 0.2s;\n      }\n\n      .dialog-footer button.close {\n        background: var(--primary-color);\n        color: var(--text-primary-color);\n      }\n\n      .dialog-footer button.close:hover {\n        opacity: 0.9;\n      }\n    "}getPopupDimensions(){return{width:Math.min(650,.9*window.innerWidth),height:Math.min(.8*window.innerHeight,800)}}closePopup(){this._expandedSections=new Set(["artistSeeds","songSeeds","stationSeeds","feedback"]),super.closePopup()}_toggleSection(t){const e=new Set(this._expandedSections);e.has(t)?e.delete(t):e.add(t),this._expandedSections=e}_handleDeleteSeed(t,e){this.dispatchEvent(new CustomEvent("delete-seed",{bubbles:!0,composed:!0,detail:{seedId:t,seedType:e,stationId:this.currentStationId}}))}_handleDeleteFeedback(t){this.dispatchEvent(new CustomEvent("delete-feedback",{bubbles:!0,composed:!0,detail:{feedbackId:t,stationId:this.currentStationId}}))}_handleClose(){this.closePopup()}_renderSection(t,e,n,o){const i=this._expandedSections.has(t);return V`
      <div class="section">
        <div class="section-header" @click=${()=>this._toggleSection(t)}>
          <span class="chevron ${i?"expanded":""}">▶</span>
          <span class="section-title">${e}</span>
          <span class="section-count">(${n.length})</span>
        </div>
        ${i&&n.length>0?V`<div class="section-content">${n.map(o)}</div>`:F}
      </div>
    `}renderPopupContent(){const t=this.stationInfo&&(this.stationInfo.artistSeeds.length>0||this.stationInfo.songSeeds.length>0||this.stationInfo.stationSeeds.length>0||this.stationInfo.feedback.length>0);return V`
      <div class="dialog-header">Seeds: ${this.currentStationName}</div>
      <div class="dialog-body">
        ${this.infoLoading?V`<div class="loading">Loading station info...</div>`:t?V`
                <div class="seeds-container">
                  ${this._renderSection("artistSeeds","Artist Seeds",this.stationInfo?.artistSeeds||[],t=>V`
                      <div class="seed-item">
                        <div class="seed-info">
                          <div class="seed-name">${t.name}</div>
                        </div>
                        <button
                          class="delete-button"
                          ?disabled=${this.disabled}
                          @click=${()=>this._handleDeleteSeed(t.seedId,"artist")}
                        >
                          Delete
                        </button>
                      </div>
                    `)}
                  
                  ${this._renderSection("songSeeds","Song Seeds",this.stationInfo?.songSeeds||[],t=>V`
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
                          Delete
                        </button>
                      </div>
                    `)}
                  
                  ${this._renderSection("stationSeeds","Station Seeds",this.stationInfo?.stationSeeds||[],t=>V`
                      <div class="seed-item">
                        <div class="seed-info">
                          <div class="seed-name">${t.name}</div>
                        </div>
                        <button
                          class="delete-button"
                          ?disabled=${this.disabled}
                          @click=${()=>this._handleDeleteSeed(t.seedId,"station")}
                        >
                          Delete
                        </button>
                      </div>
                    `)}
                  
                  ${this._renderSection("feedback","Feedback",this.stationInfo?.feedback||[],t=>V`
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
                          Delete
                        </button>
                      </div>
                    `)}
                </div>
              `:V`<div class="no-items">No seeds or feedback available for this station.</div>`}
      </div>
      <div class="dialog-footer">
        <button class="close" @click=${()=>this._handleClose()}>Close</button>
      </div>
    `}};t([ut({type:String})],pe.prototype,"currentStationId",void 0),t([ut({type:String})],pe.prototype,"currentStationName",void 0),t([ut({type:Object})],pe.prototype,"stationInfo",void 0),t([ut({type:Boolean})],pe.prototype,"infoLoading",void 0),t([gt()],pe.prototype,"_expandedSections",void 0),pe=t([ct("pmc-station-info-popup")],pe);let he=class extends le{constructor(){super(...arguments),this.stations=[],this.searchLoading=!1,this.searchResults={categories:[]},this._stage="select-station",this._selectedStationId=null,this._selectedStationName="",this._searchQuery="",this._expandedCategories=new Set,this._selectedMusicId=null,this._searchPerformed=!1}static get styles(){return[r`
        :host {
          position: relative;
          display: inline-block;
        }
      `]}getComponentStylesString(){return'\n      .dialog {\n        background: var(--pmc-card-background);\n        border-radius: 12px;\n        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);\n        padding: 0;\n        display: flex;\n        flex-direction: column;\n        width: 90vw;\n        min-width: 400px;\n        max-width: 500px;\n        max-height: 85vh;\n      }\n\n      .dialog-header {\n        padding: 16px 20px;\n        font-weight: 600;\n        font-size: 18px;\n        color: var(--primary-text-color);\n        border-bottom: 1px solid var(--pmc-divider);\n      }\n\n      .dialog-body {\n        padding: 20px;\n        overflow-y: auto;\n        flex: 1;\n        min-height: 0;\n      }\n\n      .station-list {\n        display: flex;\n        flex-direction: column;\n        gap: 8px;\n      }\n\n      .station-item {\n        display: flex;\n        align-items: center;\n        padding: 12px;\n        border-radius: 8px;\n        background: transparent;\n        transition: background 0.2s;\n        cursor: pointer;\n      }\n\n      .station-item:hover:not(.disabled) {\n        background: var(--pmc-secondary-background);\n      }\n\n      .station-item.disabled {\n        opacity: 0.6;\n        cursor: not-allowed;\n      }\n\n      .station-item label {\n        display: flex;\n        align-items: center;\n        gap: 12px;\n        width: 100%;\n        cursor: pointer;\n      }\n\n      .station-item.disabled label {\n        cursor: not-allowed;\n      }\n\n      .station-item input[type="radio"] {\n        width: 20px;\n        height: 20px;\n        cursor: pointer;\n        margin: 0;\n        flex-shrink: 0;\n      }\n\n      .station-item.disabled input[type="radio"] {\n        cursor: not-allowed;\n      }\n\n      .station-name {\n        flex: 1;\n        font-size: 14px;\n        color: var(--primary-text-color);\n      }\n\n      .search-section {\n        margin-bottom: 16px;\n      }\n\n      .search-input-container {\n        display: flex;\n        gap: 12px;\n      }\n\n      .search-input {\n        flex: 1;\n        padding: 12px 16px;\n        border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));\n        border-radius: 8px;\n        background: var(--secondary-background-color, rgba(128, 128, 128, 0.1));\n        color: var(--primary-text-color);\n        font-size: 16px;\n        font-family: inherit;\n      }\n\n      .search-input:focus {\n        outline: none;\n        border-color: var(--primary-color);\n      }\n\n      .search-button {\n        padding: 12px 20px;\n        border: none;\n        border-radius: 8px;\n        background: var(--primary-color);\n        color: var(--text-primary-color);\n        cursor: pointer;\n        font-size: 14px;\n        font-weight: 500;\n        transition: all 0.2s;\n        white-space: nowrap;\n      }\n\n      .search-button:hover:not(:disabled) {\n        opacity: 0.9;\n      }\n\n      .search-button:disabled {\n        opacity: 0.6;\n        cursor: not-allowed;\n      }\n\n      .category-list {\n        display: flex;\n        flex-direction: column;\n        gap: 8px;\n      }\n\n      .category {\n        border-radius: 8px;\n        overflow: hidden;\n      }\n\n      .category-header {\n        display: flex;\n        align-items: center;\n        padding: 12px;\n        cursor: pointer;\n        background: var(--pmc-secondary-background);\n        transition: background 0.2s;\n        user-select: none;\n      }\n\n      .category-header:hover {\n        background: rgba(128, 128, 128, 0.15);\n      }\n\n      .chevron {\n        margin-right: 8px;\n        transition: transform 0.2s;\n        font-size: 16px;\n        color: var(--secondary-text-color);\n      }\n\n      .chevron.expanded {\n        transform: rotate(90deg);\n      }\n\n      .category-title {\n        font-size: 14px;\n        font-weight: 500;\n        color: var(--primary-text-color);\n        flex: 1;\n      }\n\n      .category-count {\n        font-size: 12px;\n        color: var(--secondary-text-color);\n      }\n\n      .category-results {\n        padding: 8px;\n        display: flex;\n        flex-direction: column;\n        gap: 4px;\n      }\n\n      .result-item {\n        display: flex;\n        align-items: center;\n        gap: 12px;\n        padding: 10px 12px;\n        background: var(--pmc-secondary-background);\n        border-radius: 6px;\n        cursor: pointer;\n        transition: all 0.2s;\n      }\n\n      .result-item:hover:not(.disabled) {\n        background: rgba(128, 128, 128, 0.15);\n      }\n\n      .result-item.selected {\n        background: var(--primary-color);\n        color: var(--text-primary-color);\n      }\n\n      .result-item.disabled {\n        opacity: 0.6;\n        cursor: not-allowed;\n      }\n\n      .result-item input[type="radio"] {\n        width: 16px;\n        height: 16px;\n        cursor: pointer;\n        margin: 0;\n        flex-shrink: 0;\n      }\n\n      .result-info {\n        flex: 1;\n        min-width: 0;\n      }\n\n      .result-name {\n        font-size: 14px;\n        font-weight: 500;\n        white-space: nowrap;\n        overflow: hidden;\n        text-overflow: ellipsis;\n      }\n\n      .result-artist {\n        font-size: 12px;\n        opacity: 0.8;\n        white-space: nowrap;\n        overflow: hidden;\n        text-overflow: ellipsis;\n      }\n\n      .no-results {\n        padding: 32px;\n        text-align: center;\n        color: var(--secondary-text-color);\n        font-size: 14px;\n      }\n\n      .loading {\n        padding: 32px;\n        text-align: center;\n        color: var(--secondary-text-color);\n      }\n\n      .dialog-footer {\n        display: flex;\n        gap: 8px;\n        padding: 16px 20px;\n        border-top: 1px solid var(--pmc-divider);\n        justify-content: flex-end;\n      }\n\n      .dialog-footer button {\n        padding: 8px 16px;\n        border-radius: 8px;\n        border: none;\n        font-size: 14px;\n        font-weight: 500;\n        cursor: pointer;\n        transition: all 0.2s;\n      }\n\n      .dialog-footer button.back {\n        margin-right: auto;\n        background: transparent;\n        color: var(--primary-text-color);\n      }\n\n      .dialog-footer button.back:hover {\n        background: var(--pmc-secondary-background);\n      }\n\n      .dialog-footer button.cancel {\n        background: transparent;\n        color: var(--primary-text-color);\n      }\n\n      .dialog-footer button.cancel:hover {\n        background: var(--pmc-secondary-background);\n      }\n\n      .dialog-footer button.confirm {\n        background: var(--primary-color);\n        color: var(--text-primary-color);\n      }\n\n      .dialog-footer button.confirm:hover {\n        opacity: 0.9;\n      }\n\n      .dialog-footer button:disabled {\n        opacity: 0.6;\n        cursor: not-allowed;\n      }\n\n      .no-stations {\n        padding: 16px;\n        text-align: center;\n        color: var(--secondary-text-color);\n      }\n    '}getPopupDimensions(){return{width:Math.min(500,.9*window.innerWidth),height:Math.min(.85*window.innerHeight,750)}}closePopup(){this._stage="select-station",this._selectedStationId=null,this._selectedStationName="",this._selectedMusicId=null,this._expandedCategories.clear(),this._searchQuery="",this._searchPerformed=!1,super.closePopup()}_handleStationSelect(t,e){this._selectedStationId=t,this._selectedStationName=e,this.requestUpdate()}_handleNext(){this._selectedStationId&&(this._stage="search",this.requestUpdate())}_handleBack(){this._stage="select-station",this._searchQuery="",this._selectedMusicId=null,this._expandedCategories.clear(),this._searchPerformed=!1,this.requestUpdate()}_handleSearch(){this._searchQuery.trim()&&(this._selectedMusicId=null,this._expandedCategories.clear(),this._searchPerformed=!0,this.dispatchEvent(new CustomEvent("search",{bubbles:!0,composed:!0,detail:{query:this._searchQuery.trim()}})))}_toggleCategory(t){const e=new Set(this._expandedCategories);e.has(t)?e.delete(t):e.add(t),this._expandedCategories=e}_handleResultSelect(t){this._selectedMusicId=t,this.requestUpdate()}_handleAddMusic(){this._selectedMusicId&&this._selectedStationId&&(this.dispatchEvent(new CustomEvent("add-music",{bubbles:!0,composed:!0,detail:{musicId:this._selectedMusicId,stationId:this._selectedStationId}})),this.closePopup())}_handleCancel(){this.closePopup()}_renderSelectStation(){const t=this.stations.filter(t=>!t.isQuickMix);return V`
      <div class="dialog-header">Add Music to Station</div>
      <div class="dialog-body">
        ${0===t.length?V`<div class="no-stations">No stations available</div>`:V`
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
          Cancel
        </button>
        <button class="confirm" @click=${()=>this._handleNext()} ?disabled=${!this._selectedStationId||this.disabled}>
          Next
        </button>
      </div>
    `}_renderSearch(){const t=this.searchResults.categories.length>0;return V`
      <div class="dialog-header">Add Music to ${this._selectedStationName}</div>
      <div class="dialog-body">
        <div class="search-section">
          <div class="search-input-container">
            <input
              type="text"
              class="search-input"
              id="add-music-search-input"
              placeholder="Search for artists or songs..."
              .value=${this._searchQuery}
              ?disabled=${this.disabled||this.searchLoading}
              @input=${t=>{const e=t.target,n=e.selectionStart;this._searchQuery=e.value,this.requestUpdate(),this.updateComplete.then(()=>{const t=document.querySelector(".pmc-popup-container #add-music-search-input");t&&(t.focus(),null!==n&&t.setSelectionRange(n,n))})}}
              @keydown=${t=>{"Enter"===t.key&&this._searchQuery.trim()&&!this.searchLoading&&this._handleSearch()}}
              autofocus
            />
            <button
              class="search-button"
              ?disabled=${!this._searchQuery.trim()||this.disabled||this.searchLoading}
              @click=${()=>this._handleSearch()}
            >
              ${this.searchLoading?"Searching...":"Search"}
            </button>
          </div>
        </div>

        ${this.searchLoading?V`<div class="loading">Searching...</div>`:this._searchPerformed?t?V`
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
                                ${t.results.map(t=>{const e=this._selectedMusicId===t.musicId,n=t.title||t.name||"";return V`
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
                                          <div class="result-name">${n}</div>
                                          ${t.artist?V`<div class="result-artist">${t.artist}</div>`:F}
                                        </div>
                                      </div>
                                    `})}
                              </div>
                            `:F}
                      </div>
                    `})}
              </div>
            `:V`<div class="no-results">No results found for "${this._searchQuery}"</div>`:V`<div class="no-results">Enter a search query to find music</div>`}
      </div>
      <div class="dialog-footer">
        <button class="back" @click=${()=>this._handleBack()} ?disabled=${this.disabled}>
          Back
        </button>
        <button class="cancel" @click=${()=>this._handleCancel()} ?disabled=${this.disabled}>
          Cancel
        </button>
        <button class="confirm" @click=${()=>this._handleAddMusic()} ?disabled=${!this._selectedMusicId||this.disabled}>
          Add Music
        </button>
      </div>
    `}renderPopupContent(){const t="select-station"===this._stage?this._renderSelectStation():this._renderSearch();return V`
      <div class="dialog">
        ${t}
      </div>
    `}};t([ut({type:Array})],he.prototype,"stations",void 0),t([ut({type:Boolean})],he.prototype,"searchLoading",void 0),t([ut({type:Object})],he.prototype,"searchResults",void 0),t([gt()],he.prototype,"_stage",void 0),t([gt()],he.prototype,"_selectedStationId",void 0),t([gt()],he.prototype,"_selectedStationName",void 0),t([gt()],he.prototype,"_searchQuery",void 0),t([gt()],he.prototype,"_expandedCategories",void 0),t([gt()],he.prototype,"_selectedMusicId",void 0),t([gt()],he.prototype,"_searchPerformed",void 0),he=t([ct("pmc-add-music-popup")],he);let ue=class extends le{constructor(){super(...arguments),this.currentSongName="",this.currentArtistName="",this.currentTrackToken="",this.searchResults={categories:[]},this.genreCategories=[],this.searchLoading=!1,this.genreLoading=!1,this._mode="select",this._searchQuery="",this._expandedCategories=new Set,this._selectedMusicId=null,this._sharedStationId=""}static get styles(){return[r`
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
            placeholder="Search for artist or song..."
            .value=${this._searchQuery}
            ?disabled=${this.disabled||this.searchLoading}
            @input=${t=>{const e=t.target,n=e.selectionStart;this._searchQuery=e.value,this.requestUpdate("_searchQuery"),this.updateComplete.then(()=>{const t=document.querySelector(".pmc-popup-container #search-input");t&&(t.focus(),null!==n&&t.setSelectionRange(n,n))})}}
            @keydown=${t=>{"Enter"===t.key&&this._searchQuery.trim()&&!this.searchLoading&&this._handleSearch()}}
          />
          <button
            class="search-button"
            ?disabled=${t}
            @click=${()=>this._handleSearch()}
          >
            ${this.searchLoading?"Searching...":"Search"}
          </button>
        </div>

        <div class="shared-input-container">
          <input
            type="text"
            class="shared-input"
            id="shared-input"
            placeholder="Enter shared station ID (digits only)"
            .value=${this._sharedStationId}
            ?disabled=${this.disabled}
            @input=${t=>{const e=t.target,n=e.selectionStart,o=e.value.replace(/[^0-9]/g,"");this._sharedStationId=o,e.value=o,this.requestUpdate("_sharedStationId"),this.updateComplete.then(()=>{const t=document.querySelector(".pmc-popup-container #shared-input");t&&(t.focus(),null!==n&&t.setSelectionRange(n,n))})}}
            @keydown=${t=>{"Enter"===t.key&&this._sharedStationId.trim()&&this._handleAddSharedStation()}}
          />
          <button
            class="shared-button"
            ?disabled=${!this._sharedStationId.trim()||this.disabled}
            @click=${()=>this._handleAddSharedStation()}
          >
            Add
          </button>
        </div>

        <div class="divider"></div>

        <div class="section-label">Or create from:</div>

        <div class="select-options">
          ${this.currentTrackToken?V`
            <button class="option-button" @click=${()=>this._handleSelectArtist()} ?disabled=${this.disabled}>
              <div class="option-main">
                <ha-icon icon="mdi:account-music"></ha-icon>
                <span>The current Artist</span>
              </div>
              ${this.currentArtistName?V`<div class="option-detail">${this.currentArtistName}</div>`:F}
            </button>

            <button class="option-button" @click=${()=>this._handleSelectSong()} ?disabled=${this.disabled}>
              <div class="option-main">
                <ha-icon icon="mdi:music-note"></ha-icon>
                <span>The current Song</span>
              </div>
              ${this.currentSongName?V`<div class="option-detail">${this.currentSongName}</div>`:F}
            </button>
          `:F}

          <button class="option-button" @click=${()=>this._handleBrowseGenres()} ?disabled=${this.disabled}>
            <div class="option-main">
              <ha-icon icon="mdi:bookshelf"></ha-icon>
              <span>Genre</span>
            </div>
            <div class="option-detail">Select a genre</div>
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
              placeholder="Search for artists or songs..."
              .value=${this._searchQuery}
              disabled
            />
            <button class="search-button" disabled>
              Searching...
            </button>
          </div>
        </div>
        <div class="loading">
          <div class="loading-spinner"></div>
          <div>Searching for "${this._searchQuery}"...</div>
        </div>
      </div>
      <div class="dialog-footer">
        <button class="back" @click=${()=>this._handleBackToSelect()}>
          Back
        </button>
        <button class="cancel" @click=${t=>this._handleCancel(t)}>
          Cancel
        </button>
      </div>
    `}_renderSearchResults(){const t=this.searchResults.categories.length>0;return console.log("[SEARCH RESULTS]",{searchQuery:this._searchQuery,searchResults:this.searchResults,categoriesCount:this.searchResults.categories.length,hasResults:t,rawResults:JSON.stringify(this.searchResults,null,2)}),V`
      <div class="dialog-body">
        ${this.searchLoading?V`<div class="loading">Searching...</div>`:t?V`
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
                                ${t.results.map(t=>{const e=this._selectedMusicId===t.musicId,n=t.title||t.name||"";return V`
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
                                            ${n}${t.artist?V` <span class="result-item-artist">by ${t.artist}</span>`:F}
                                          </span>
                                        </label>
                                      </div>
                                    `})}
                              </div>
                            `:F}
                      </div>
                    `})}
              </div>
            `:V`<div class="no-results">No results found for "${this._searchQuery}"</div>`}
      </div>
      <div class="dialog-footer">
        <button class="back" @click=${()=>this._handleBackToSelect()} ?disabled=${this.disabled}>
          Back
        </button>
        <button class="cancel" @click=${t=>this._handleCancel(t)} ?disabled=${this.disabled}>
          Cancel
        </button>
        <button class="create" @click=${()=>this._handleCreateFromSearch()} ?disabled=${!this._selectedMusicId||this.disabled}>
          Create Station
        </button>
      </div>
    `}_renderBrowseGenres(){const t=this.genreCategories.length>0;return V`
      <div class="dialog-body">
        ${this.genreLoading?V`<div class="loading">Loading genres...</div>`:t?V`
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
                            `:F}
                      </div>
                    `})}
              </div>
            `:V`<div class="no-results">No genres available</div>`}
      </div>
      <div class="dialog-footer">
        <button class="back" @click=${()=>this._handleBackToSelect()} ?disabled=${this.disabled}>
          Back
        </button>
        <button class="cancel" @click=${t=>this._handleCancel(t)} ?disabled=${this.disabled}>
          Cancel
        </button>
        <button class="create" @click=${()=>this._handleCreateFromGenre()} ?disabled=${!this._selectedMusicId||this.disabled}>
          Create Station
        </button>
      </div>
    `}renderPopupContent(){let t;return t="searching"===this._mode?this._renderSearching():"search-results"===this._mode?this._renderSearchResults():"browse-genres"===this._mode?this._renderBrowseGenres():this._renderSelectMode(),V`
      <div class="dialog">
        <div class="dialog-header">Create Station</div>
        ${t}
      </div>
    `}};t([ut({type:String})],ue.prototype,"currentSongName",void 0),t([ut({type:String})],ue.prototype,"currentArtistName",void 0),t([ut({type:String})],ue.prototype,"currentTrackToken",void 0),t([ut({type:Object})],ue.prototype,"searchResults",void 0),t([ut({type:Array})],ue.prototype,"genreCategories",void 0),t([ut({type:Boolean})],ue.prototype,"searchLoading",void 0),t([ut({type:Boolean})],ue.prototype,"genreLoading",void 0),t([gt()],ue.prototype,"_mode",void 0),t([gt()],ue.prototype,"_searchQuery",void 0),t([gt()],ue.prototype,"_expandedCategories",void 0),t([gt()],ue.prototype,"_selectedMusicId",void 0),t([gt()],ue.prototype,"_sharedStationId",void 0),ue=t([ct("pmc-create-station-modal")],ue);const ge=function(t){try{return new Date(t).toLocaleString()}catch{return t}}("2026-01-17T23:35:18.285Z"),me=[{name:"entity",required:!0,selector:{entity:{domain:"media_player"}}}],be=[{name:"mode",selector:{select:{mode:"dropdown",options:[{value:"default",label:"Default - Standard layout with artwork on right"},{value:"minimal",label:"Minimal - Compact view with minimal controls"},{value:"full",label:"Full - Full-cover artwork background"},{value:"tall",label:"Tall - Vertical layout with artwork on top"},{value:"custom",label:"Custom - Full control over all options"}]}}}],fe=[{name:"name",selector:{text:{}}},{name:"volume_entity",selector:{entity:{domain:"media_player"}}}],ve=[{name:"artwork",selector:{select:{mode:"dropdown",options:[{value:"default",label:"Compact (right side)"},{value:"full-cover",label:"Full Cover (background)"},{value:"tall",label:"Tall (artwork on top)"}]}}}],_e=[{name:"stationDisplay",selector:{select:{mode:"dropdown",options:[{value:"hidden",label:"Hidden"},{value:"compact",label:"Compact (icon only)"},{value:"normal",label:"Full (icon + station name)"}]}}}];let ye=class extends lt{constructor(){super(...arguments),this._activeTab="general"}setConfig(t){this._config=t}_updateConfig(t,e){if(!this._config)return;const n={...this._config};""===e||null==e?delete n[t]:n[t]=e,this._config=n,this._fireConfigChanged()}_fireConfigChanged(){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0}))}_valueChanged(t){const e=t.detail;if(e.value){if("mode"in e.value&&this._config){const t=e.value.mode;if("custom"!==t){const e={type:this._config.type,entity:this._config.entity,mode:t,...this._config.volume_entity&&{volume_entity:this._config.volume_entity},...this._config.name&&{name:this._config.name}};return this._config=e,void this._fireConfigChanged()}}Object.entries(e.value).forEach(([t,e])=>{this._updateConfig(t,e)})}}_handleAppearanceChange(t){const e=t.detail;if(!e.value||!this._config)return;const n=this._config?.mode||"default",o=Tt(n),i="custom"===n,s={...{...this._config,artwork:i?this._config?.artwork??o.artwork:o.artwork,showDetails:i?this._config?.showDetails??o.showDetails:o.showDetails,showTitle:i?this._config?.showTitle??o.showTitle:o.showTitle,showArtist:i?this._config?.showArtist??o.showArtist:o.showArtist,showAlbum:i?this._config?.showAlbum??o.showAlbum:o.showAlbum,reserveDetailsSpace:i?this._config?.reserveDetailsSpace??o.reserveDetailsSpace:o.reserveDetailsSpace,showPlaybackControls:i?this._config?.showPlaybackControls??o.showPlaybackControls:o.showPlaybackControls,showPowerButton:i?this._config?.showPowerButton??o.showPowerButton:o.showPowerButton,showVolumeControl:i?this._config?.showVolumeControl??o.showVolumeControl:o.showVolumeControl,showSongActions:i?this._config?.showSongActions??o.showSongActions:o.showSongActions,showProgressBar:i?this._config?.showProgressBar??o.showProgressBar:o.showProgressBar,showProgressTime:i?this._config?.showProgressTime??o.showProgressTime:o.showProgressTime,stationDisplay:i?this._config?.stationDisplay??o.stationDisplay:o.stationDisplay},...e.value},r=zt(s);s.mode=r,this._config=s,this._fireConfigChanged()}_handleControlsChange(t){const e=t.detail;if(!e.value||!this._config)return;const n={...this._config,...e.value},o=zt(n);n.mode=o,this._config=n,this._fireConfigChanged()}_setActiveTab(t){this._activeTab=t}_computeLabel(t){return{entity:"Entity",name:"Custom Name",volume_entity:"Volume Entity",artwork:"Artwork Style",stationDisplay:"Station Selector"}[t.name]||t.name}_computeHelper(t){return{entity:"Select any media player entity",name:"Leave empty to use entity name",volume_entity:"Override volume control to a different media player (e.g., Sonos speaker)"}[t.name]||""}_supportsAnyRating(){if(!this.hass||!this._config?.entity)return!1;const t=this.hass.states[this._config.entity],e=t?.attributes?.supported_actions||[];return e.includes("love_song")||e.includes("ban_song")||e.includes("tired_of_song")}_renderGeneralTab(){return V`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${me}
        .computeLabel=${this._computeLabel}
        .computeHelper=${this._computeHelper}
        @value-changed=${this._valueChanged}
      ></ha-form>

      <div class="section-title">Mode</div>
      <ha-form
        .hass=${this.hass}
        .data=${{mode:this._config?.mode||"default"}}
        .schema=${be}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `}_renderAppearanceTab(){const t=this._config?.mode||"default",e=Tt(t),n="custom"===t,o={...this._config,artwork:n?this._config?.artwork??e.artwork:e.artwork},i=n?this._config?.stationDisplay??e.stationDisplay:e.stationDisplay,s=this._supportsStations();return V`
      <ha-form
        .hass=${this.hass}
        .data=${o}
        .schema=${ve}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._handleAppearanceChange}
      ></ha-form>

      <div class="section-title">Station Selector</div>
      ${s?V`
            <ha-form
              .hass=${this.hass}
              .data=${{stationDisplay:i}}
              .schema=${_e}
              .computeLabel=${this._computeLabel}
              @value-changed=${this._handleAppearanceChange}
            ></ha-form>
          `:V`<p class="helper-text">Station selector requires a Pianobar media player entity</p>`}
    `}_handleCheckboxChange(t,e){const n=e.target,o=this._config?.mode||"default",i=Tt(o),s="custom"===o,r={...{...this._config,artwork:s?this._config?.artwork??i.artwork:i.artwork,showDetails:s?this._config?.showDetails??i.showDetails:i.showDetails,showTitle:s?this._config?.showTitle??i.showTitle:i.showTitle,showArtist:s?this._config?.showArtist??i.showArtist:i.showArtist,showAlbum:s?this._config?.showAlbum??i.showAlbum:i.showAlbum,reserveDetailsSpace:s?this._config?.reserveDetailsSpace??i.reserveDetailsSpace:i.reserveDetailsSpace,showPlaybackControls:s?this._config?.showPlaybackControls??i.showPlaybackControls:i.showPlaybackControls,showPowerButton:s?this._config?.showPowerButton??i.showPowerButton:i.showPowerButton,showVolumeControl:s?this._config?.showVolumeControl??i.showVolumeControl:i.showVolumeControl,showSongActions:s?this._config?.showSongActions??i.showSongActions:i.showSongActions,showProgressBar:s?this._config?.showProgressBar??i.showProgressBar:i.showProgressBar,showProgressTime:s?this._config?.showProgressTime??i.showProgressTime:i.showProgressTime,stationDisplay:s?this._config?.stationDisplay??i.stationDisplay:i.stationDisplay},[t]:n.checked},a=zt(r);r.mode=a,this._config=r,this._fireConfigChanged()}_renderCheckbox(t,e,n,o=!1,i=!1){return V`
      <div class="checkbox-row ${o?"indent":""} ${i?"disabled":""}">
        <ha-checkbox
          .checked=${n}
          .disabled=${i}
          @change=${e=>this._handleCheckboxChange(t,e)}
        ></ha-checkbox>
        <span 
          class="checkbox-label"
          @click=${()=>{if(i)return;const e=this.shadowRoot?.querySelector(`ha-checkbox[data-key="${t}"]`);e&&e.click()}}
        >${e}</span>
      </div>
    `}_supportsStations(){if(!this.hass||!this._config?.entity)return!1;const t=this.hass.states[this._config.entity],e=t?.attributes?.stations;return Array.isArray(e)&&e.length>0}_renderControlsTab(){const t=this._config?.mode||"default",e=Tt(t),n="custom"===t,o=n?this._config?.showPlaybackControls??e.showPlaybackControls:e.showPlaybackControls,i=n?this._config?.showPowerButton??e.showPowerButton:e.showPowerButton,s=n?this._config?.showSongActions??e.showSongActions:e.showSongActions,r=n?this._config?.showProgressBar??e.showProgressBar:e.showProgressBar,a=n?this._config?.showProgressTime??e.showProgressTime:e.showProgressTime,l=n?this._config?.showVolumeControl??e.showVolumeControl:e.showVolumeControl,d=n?this._config?.showDetails??e.showDetails:e.showDetails,c=n?this._config?.showTitle??e.showTitle:e.showTitle,p=n?this._config?.showArtist??e.showArtist:e.showArtist,h=n?this._config?.showAlbum??e.showAlbum:e.showAlbum,u=n?this._config?.reserveDetailsSpace??e.reserveDetailsSpace:e.reserveDetailsSpace,g=this._supportsAnyRating();return V`
      ${this._renderCheckbox("showPlaybackControls","Show playback controls",o)}
      ${this._renderCheckbox("showPowerButton","Show power button",i,!0,!o)}
      ${this._renderCheckbox("showSongActions","Show song actions (thumbs)",!!g&&s,!0,!o||!g)}

      ${this._renderCheckbox("showProgressBar","Show progress bar",r)}
      ${this._renderCheckbox("showProgressTime","Show progress time",a,!0,!r)}

      ${this._renderCheckbox("showVolumeControl","Show volume control",l)}

      ${this._renderCheckbox("showDetails","Show details",d)}
      ${this._renderCheckbox("showTitle","Show title",c,!0,!d)}
      ${this._renderCheckbox("showArtist","Show artist",p,!0,!d)}
      ${this._renderCheckbox("showAlbum","Show album",h,!0,!d)}
      ${this._renderCheckbox("reserveDetailsSpace","Reserve space on card",u,!0,!d)}
    `}_renderAdvancedTab(){return V`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${fe}
        .computeLabel=${this._computeLabel}
        .computeHelper=${this._computeHelper}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `}render(){if(!this.hass||!this._config)return V``;return V`
      <div class="card-config">
        <div class="tabs">
          ${[{id:"general",label:"General"},{id:"appearance",label:"Appearance"},{id:"controls",label:"Controls"},{id:"advanced",label:"Advanced"}].map(t=>V`
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

        <div class="version-info">
          Build: ${ge}
        </div>
      </div>
    `}};ye.styles=r`
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
  `,t([ut({attribute:!1})],ye.prototype,"hass",void 0),t([ut({attribute:!1})],ye.prototype,"lovelace",void 0),t([gt()],ye.prototype,"_config",void 0),t([gt()],ye.prototype,"_activeTab",void 0),ye=t([ct("pianobar-card-editor")],ye);console.info("%c PIANOBAR-MEDIA-PLAYER-CARD %c 1.0.0 ","color: white; background: #764ba2; font-weight: bold;","color: #764ba2; background: white; font-weight: bold;"),window.customCards=window.customCards||[],window.customCards.push({type:"pianobar-media-player-card",name:"Pianobar Media Player Card",description:"A custom media player card for Pianobar with thumbs up/down and volume override",preview:!0});let xe=class extends lt{constructor(){super(...arguments),this._cardHeight=0,this._stationPopupOpen=!1,this._ratingsPopupOpen=!1,this._upcomingPopupOpen=!1,this._stationModePopupOpen=!1,this._upcomingSongs=[],this._stationModes=[],this._stationModesLoading=!1,this._openQuickMixPopup=!1,this._openRenameDialog=!1,this._openDeleteDialog=!1,this._openStationInfoPopup=!1,this._stationInfo=null,this._stationInfoLoading=!1,this._openAddMusicPopup=!1,this._searchResults={categories:[]},this._searchLoading=!1,this._openCreateStationModal=!1,this._genreCategories=[],this._genreLoading=!1,this._createStationModalRef=new Mt,this._tallArtworkError=!1}static getConfigElement(){return document.createElement("pianobar-card-editor")}static getStubConfig(){return{type:"custom:pianobar-media-player-card",entity:"",mode:"default"}}setConfig(t){if(!t.entity)throw new Error("Please define an entity");this._config=t,this._resolvedConfig=function(t){const e=t.mode||"default",n=It[e];return"custom"===e?{entity:t.entity,mode:e,artwork:t.artwork??n.artwork,showDetails:t.showDetails??n.showDetails,showTitle:t.showTitle??n.showTitle,showArtist:t.showArtist??n.showArtist,showAlbum:t.showAlbum??n.showAlbum,reserveDetailsSpace:t.reserveDetailsSpace??n.reserveDetailsSpace,showVolumeControl:t.showVolumeControl??n.showVolumeControl,showSongActions:t.showSongActions??n.showSongActions,showProgressBar:t.showProgressBar??n.showProgressBar,showProgressTime:t.showProgressTime??n.showProgressTime,showPlaybackControls:t.showPlaybackControls??n.showPlaybackControls,showPowerButton:t.showPowerButton??n.showPowerButton,stationDisplay:t.stationDisplay??n.stationDisplay,volume_entity:t.volume_entity,name:t.name}:{entity:t.entity,mode:e,artwork:n.artwork,showDetails:n.showDetails,showTitle:n.showTitle,showArtist:n.showArtist,showAlbum:n.showAlbum,reserveDetailsSpace:n.reserveDetailsSpace,showVolumeControl:n.showVolumeControl,showSongActions:n.showSongActions,showProgressBar:n.showProgressBar,showProgressTime:n.showProgressTime,showPlaybackControls:n.showPlaybackControls,showPowerButton:n.showPowerButton,stationDisplay:n.stationDisplay,volume_entity:t.volume_entity,name:t.name}}(t)}disconnectedCallback(){super.disconnectedCallback(),this._resizeObserver?.disconnect()}firstUpdated(){this._setupResizeObserver()}_setupResizeObserver(){this._resizeObserver=new ResizeObserver(t=>{for(const e of t){const t=e.contentRect.height;t!==this._cardHeight&&(this._cardHeight=t)}});const t=this.shadowRoot?.querySelector("ha-card");t?this._resizeObserver.observe(t):this._resizeObserver.observe(this)}getCardSize(){return"minimal"===this._resolvedConfig?.mode?2:"full-cover"===this._resolvedConfig?.artwork?4:3}updated(t){if(super.updated(t),this._resolvedConfig&&(this.setAttribute("artwork-mode",this._resolvedConfig.artwork),this.setAttribute("mode",this._resolvedConfig.mode)),t.has("hass")&&this.hass&&this._config?.entity){const t=this.hass.states[this._config.entity];if(t){const e=t.attributes.entity_picture;e&&e!==this._lastImageUrl&&(this._lastImageUrl=e,this._tallArtworkError=!1,this._updateColors(e))}}}async _updateColors(t){const e="full-cover"===this._resolvedConfig?.artwork?await async function(t){const e=await Gt(t);if(!t)return e;const n=`regional:${t}`,o=qt.get(n);if(o)return o;try{const o=new Image;o.crossOrigin="anonymous",await new Promise((e,n)=>{o.onload=()=>e(),o.onerror=()=>n(new Error("Failed to load image")),o.src=t});const i=document.createElement("canvas"),s=i.getContext("2d");if(!s)return e;const r=100,a=Math.min(r/o.width,r/o.height);i.width=Math.floor(o.width*a),i.height=Math.floor(o.height*a),s.drawImage(o,0,0,i.width,i.height);const l=s.getImageData(0,0,i.width,i.height);let d,c;try{const[t,e]=await Qt(i,Wt);d=Zt(Yt(l,Wt,i.width,i.height),t,0)}catch(t){console.warn("Failed to extract vibrant colors from metadata region:",t),d=Zt(Yt(l,Wt,i.width,i.height),null,0)}try{const[t,e]=await Qt(i,Xt);c=Zt(Yt(l,Xt,i.width,i.height),t,0)}catch(t){console.warn("Failed to extract vibrant colors from controls region:",t),c=Zt(Yt(l,Xt,i.width,i.height),null,0)}const p={...e,metadataForeground:d,controlsForeground:c};return qt.set(n,p),p}catch(t){return console.error("Error extracting regional colors:",t),e}}(t):await Gt(t);this._extractedColors=e}_getEntity(){if(this.hass&&this._config?.entity)return this.hass.states[this._config.entity]}_getVolumeEntity(){if(!this.hass)return;const t=this._resolvedConfig?.volume_entity||this._config?.entity;return t?this.hass.states[t]:void 0}_isPlaying(t){return"playing"===t.state}_isUnavailable(t){return"unavailable"===t.state||"unknown"===t.state}_getSupportedActions(){const t=this._getEntity();return t?.attributes?.supported_actions||[]}_supportsLove(){return this._getSupportedActions().includes("love_song")}_supportsBan(){return this._getSupportedActions().includes("ban_song")}_supportsTired(){return this._getSupportedActions().includes("tired_of_song")}_supportsAnyRating(t){const e=t.attributes.supported_actions;return!(!e||!Array.isArray(e))&&(e.includes("love_song")||e.includes("ban_song")||e.includes("tired_of_song"))}async _handlePlayPause(){const t=this._getEntity();t&&this.hass&&await this.hass.callService("media_player","media_play_pause",void 0,{entity_id:t.entity_id})}async _handleNextTrack(){const t=this._getEntity();t&&this.hass&&await this.hass.callService("media_player","media_next_track",void 0,{entity_id:t.entity_id})}async _handlePowerToggle(){const t=this._getEntity();if(!t||!this.hass)return;const e="off"!==t.state&&"unavailable"!==t.state?"turn_off":"turn_on";await this.hass.callService("media_player",e,void 0,{entity_id:t.entity_id})}async _handleVolumeChange(t){const e=this._getVolumeEntity();if(!e||!this.hass)return;const n=t.detail.volume;await this.hass.callService("media_player","volume_set",{volume_level:n},{entity_id:e.entity_id})}async _handleMuteToggle(){const t=this._getVolumeEntity();t&&this.hass&&await this.hass.callService("media_player","volume_mute",{is_volume_muted:!t.attributes.is_volume_muted},{entity_id:t.entity_id})}async _handleLoveSong(){const t=this._getEntity();t&&this.hass&&await this.hass.callService("pianobar","love_song",{entity_id:t.entity_id})}async _handleBanSong(){const t=this._getEntity();t&&this.hass&&await this.hass.callService("pianobar","ban_song",{entity_id:t.entity_id})}async _handleTiredSong(){const t=this._getEntity();t&&this.hass&&await this.hass.callService("pianobar","tired_of_song",{entity_id:t.entity_id})}async _handleStationChange(t){const e=this._getEntity();if(!e||!this.hass)return;const{stationName:n}=t.detail;await this.hass.callService("media_player","select_source",{source:n},{entity_id:e.entity_id})}_renderArtwork(t){const e=t.attributes.media_image_url||t.attributes.entity_picture;return e?V`<img class="artwork" src="${e}" alt="Album artwork" />`:V`
      <div class="artwork-placeholder">
        <ha-icon icon="mdi:music"></ha-icon>
      </div>
    `}_renderMediaInfo(t){if(!(this._resolvedConfig?.showDetails??!0))return F;const e=t.attributes.media_title||"No media",n=t.attributes.media_artist||"",o=t.attributes.media_album_name||"",i=this._resolvedConfig?.showTitle??!0,s=this._resolvedConfig?.showArtist??!0,r=this._resolvedConfig?.showAlbum??!0,a="tall"===this._resolvedConfig?.artwork,l="normal"===(this._resolvedConfig?.stationDisplay??"hidden")&&!a,d=t.attributes.stations||[],c=t.attributes.source||"",p=d.find(t=>t.name===c),h=p?.isQuickMix??!1,u=t.attributes.song_station_name||"",g=h&&u?u:c,m=h?"mdi:shuffle":"mdi:radio";return i||s||r||l?V`
      <div class="media-info">
        ${i?V`<p class="title">${e}</p>`:F}
        ${s&&n?V`<p class="artist">${n}</p>`:F}
        ${r&&o?V`<p class="album">${o}</p>`:F}
        ${l&&(g||d.length>0)?V`
          <p class="station-info clickable" @click=${this._handleOpenStationPopup}>
            <ha-icon icon="${g?m:"mdi:radio"}"></ha-icon>
            <span>${g||"Select station"}</span>
          </p>
        `:F}
      </div>
    `:F}_renderProgressBar(t){if(!this._resolvedConfig?.showProgressBar)return F;const e=t.attributes.media_duration||0,n=t.attributes.media_position||0,o=t.attributes.media_position_updated_at||"",i=t.attributes.entity_picture,s="tall"===this._resolvedConfig?.artwork,r=!!i&&!s,a="full-cover"===this._resolvedConfig?.artwork?this._extractedColors?.controlsForeground||this._extractedColors?.foreground||"var(--pmc-primary-text-color)":this._extractedColors?.foreground||"var(--pmc-primary-text-color)",l=this._resolvedConfig?.showProgressTime??!1,d=this._isPlaying(t);return V`
      <pmc-progress-bar
        .duration=${e}
        .position=${n}
        .positionUpdatedAt=${o}
        .showTime=${l}
        .isPlaying=${d}
        style="color: ${r?a:"inherit"}"
      ></pmc-progress-bar>
    `}_renderVolumeControl(){if(!this._resolvedConfig?.showVolumeControl)return F;const t=this._getVolumeEntity();if(!t)return F;const e=t.attributes.volume_level??.5,n=t.attributes.is_volume_muted??!1,o=this._isUnavailable(t),i=this._getEntity(),s="tall"===this._resolvedConfig?.artwork,r="full-cover"===this._resolvedConfig?.artwork,a=!!i?.attributes.entity_picture&&!s,l=r?this._extractedColors?.controlsForeground||this._extractedColors?.foreground||"var(--pmc-primary-text-color)":this._extractedColors?.foreground||"var(--pmc-primary-text-color)";return V`
      <pmc-volume-slider
        .volume=${e}
        .muted=${n}
        .disabled=${o}
        .sliderColor=${a?l:"var(--pmc-primary-text-color)"}
        style="color: ${a?l:"inherit"}"
        @volume-change=${this._handleVolumeChange}
        @mute-toggle=${this._handleMuteToggle}
      ></pmc-volume-slider>
    `}_renderPlaybackControls(t){if(!this._resolvedConfig?.showPlaybackControls)return F;const e=this._isPlaying(t),n=this._isUnavailable(t),o=this._resolvedConfig?.showPowerButton??!1,i="off"!==t.state&&"unavailable"!==t.state;return V`
      <pmc-playback-controls
        .playing=${e}
        .disabled=${n}
        .showPower=${o}
        .isOn=${i}
        @play-pause=${this._handlePlayPause}
        @next-track=${this._handleNextTrack}
        @power-toggle=${this._handlePowerToggle}
      ></pmc-playback-controls>
    `}_renderSongActions(t){if(!this._resolvedConfig?.showSongActions)return F;if(!!!t.attributes.media_title)return F;const e=this._supportsLove(),n=this._supportsBan(),o=this._supportsTired();if(!e&&!n&&!o)return F;const i=t.attributes.rating||0,s=this._isUnavailable(t);return V`
      <pmc-song-actions-menu
        .rating=${i}
        .disabled=${s}
        .showLove=${e}
        .showBan=${n}
        .showTired=${o}
        @love-song=${this._handleLoveSong}
        @ban-song=${this._handleBanSong}
        @tired-song=${this._handleTiredSong}
      ></pmc-song-actions-menu>
    `}_renderStationSelector(t){if("compact"!==(this._resolvedConfig?.stationDisplay??"hidden"))return F;const e=t.attributes.stations||[];if(0===e.length)return F;const n=t.attributes.source||"",o=e.find(t=>t.name===n),i=o?.id||"",s=t.attributes.song_station_name||"",r=this._isUnavailable(t);return V`
      <pmc-station-selector
        .stations=${e}
        .currentStationId=${i}
        .currentStationName=${n}
        .songStationName=${s}
        .disabled=${r}
        @station-change=${this._handleStationChange}
      ></pmc-station-selector>
    `}_renderOverflowMenu(t){const e=t.attributes.stations||[],n=e.length>0,o=!!t.attributes.media_title,i=this._supportsAnyRating(t)&&o,s="off"!==t.state&&"unavailable"!==t.state,r=e.find(e=>e.id===t.attributes.media_content_id),a=s&&n&&r&&!r.isQuickMix,l=s&&n,d=s&&n&&r,c=s&&n&&r,p=n,h=s&&n,u=s&&n;return V`
      <pmc-overflow-menu
        class="overflow-menu"
        .entityId=${t.entity_id}
        .showStationOption=${n}
        .showRatingsOption=${i}
        .showExplainOption=${o}
        .showUpcomingOption=${s}
        .showStationModeOption=${a}
        .showQuickMixOption=${l}
        .showStationInfoOption=${d}
        .showAddMusicOption=${c}
        .showCreateStationOption=${p}
        .showRenameOption=${h}
        .showDeleteOption=${u}
        .isOn=${s}
        .disabled=${this._isUnavailable(t)}
        .buildTime=${"2026-01-17T23:35:18.285Z"}
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
      ></pmc-overflow-menu>
    `}_handleMoreInfo(t){const e=new Event("hass-more-info",{composed:!0});e.detail={entityId:t.detail?.entityId},this.dispatchEvent(e)}async _handleExplainSong(){const t=this._getEntity();if(t&&this.hass)try{const e=await this.hass.connection.sendMessagePromise({type:"call_service",domain:"pianobar",service:"explain_song",service_data:{entity_id:t.entity_id},return_response:!0}),n=new CustomEvent("hass-notification",{detail:{message:e?.response?.explanation||"No explanation available",duration:8e3},bubbles:!0,composed:!0});this.dispatchEvent(n)}catch(t){console.error("Error explaining song:",t);const e=new CustomEvent("hass-notification",{detail:{message:"Failed to get song explanation",duration:3e3},bubbles:!0,composed:!0});this.dispatchEvent(e)}}_handleOpenStationPopup(t){let e=t.detail?.anchorPosition;if(!e&&t.currentTarget){const n=t.currentTarget.getBoundingClientRect();e={left:n.left,top:n.top,bottom:n.bottom,right:n.right}}this._popupAnchorPosition=e,this._stationPopupOpen=!0}_handleStationPopupClosed(){this._stationPopupOpen=!1,this._popupAnchorPosition=void 0}_handleOpenRatingsPopup(t){this._popupAnchorPosition=t.detail?.anchorPosition,this._ratingsPopupOpen=!0}_handleRatingsPopupClosed(){this._ratingsPopupOpen=!1,this._popupAnchorPosition=void 0}async _handleShowUpcoming(t){const e=this._getEntity();if(e&&this.hass){this._upcomingPopupOpen=!1,await this.updateComplete,this._popupAnchorPosition=t.detail?.anchorPosition;try{const t=await this.hass.connection.sendMessagePromise({type:"call_service",domain:"pianobar",service:"get_upcoming",service_data:{entity_id:e.entity_id},return_response:!0});this._upcomingSongs=t?.response?.songs||[],this._upcomingPopupOpen=!0}catch(t){console.error("Error getting upcoming songs:",t);const e=new CustomEvent("hass-notification",{detail:{message:"Failed to get upcoming songs",duration:3e3},bubbles:!0,composed:!0});this.dispatchEvent(e)}}}_handleUpcomingPopupClosed(){this._upcomingPopupOpen=!1,this._popupAnchorPosition=void 0}async _handleStationMode(t){const e=this._getEntity();if(e&&this.hass){this._stationModePopupOpen=!1,await this.updateComplete,this._popupAnchorPosition=t.detail?.anchorPosition,this._stationModesLoading=!0,this._stationModePopupOpen=!0;try{const t=e.attributes.media_content_id;if(!t)throw new Error("No station selected");const n=await this.hass.connection.sendMessagePromise({type:"call_service",domain:"pianobar",service:"get_station_modes",service_data:{entity_id:e.entity_id,station_id:t},return_response:!0});this._stationModes=n?.response?.modes||[]}catch(t){console.error("Error getting station modes:",t);const e=new CustomEvent("hass-notification",{detail:{message:"Failed to get station modes",duration:3e3},bubbles:!0,composed:!0});this.dispatchEvent(e),this._stationModePopupOpen=!1}finally{this._stationModesLoading=!1}}}_handleStationModePopupClosed(){this._stationModePopupOpen=!1,this._popupAnchorPosition=void 0,this._stationModes=[]}async _handleSetStationMode(t){const e=this._getEntity();if(!e||!this.hass)return;const{stationId:n,modeId:o}=t.detail;try{await this.hass.callService("pianobar","set_station_mode",{entity_id:e.entity_id,station_id:n,mode_id:o});const t=new CustomEvent("hass-notification",{detail:{message:"Station mode updated",duration:2e3},bubbles:!0,composed:!0});this.dispatchEvent(t)}catch(t){console.error("Error setting station mode:",t);const e=new CustomEvent("hass-notification",{detail:{message:"Failed to set station mode",duration:3e3},bubbles:!0,composed:!0});this.dispatchEvent(e)}}async _handleQuickMix(t){this._openQuickMixPopup=!1,await this.updateComplete,this._popupAnchorPosition=t.detail?.anchorPosition,this._openQuickMixPopup=!0}_handleQuickMixPopupClosed(){this._openQuickMixPopup=!1,this._popupAnchorPosition=void 0}async _handleQuickMixSave(t){const e=this._getEntity();if(!e||!this.hass)return;const{stationIds:n}=t.detail;try{await this.hass.callService("pianobar","set_quick_mix",{entity_id:e.entity_id,station_ids:n});const t=new CustomEvent("hass-notification",{detail:{message:"QuickMix settings updated",duration:2e3},bubbles:!0,composed:!0});this.dispatchEvent(t),this._handleQuickMixPopupClosed()}catch(t){console.error("Error updating QuickMix:",t);const e=new CustomEvent("hass-notification",{detail:{message:"Error updating QuickMix settings",duration:3e3},bubbles:!0,composed:!0});this.dispatchEvent(e)}}async _handleRenameStation(t){this._openRenameDialog=!1,await this.updateComplete,this._popupAnchorPosition=t.detail?.anchorPosition,this._openRenameDialog=!0}_handleRenameDialogClosed(){this._openRenameDialog=!1,this._popupAnchorPosition=void 0}async _handleRenameStationSubmit(t){const e=this._getEntity();if(!e||!this.hass)return;const{stationId:n,newName:o}=t.detail;try{await this.hass.callService("pianobar","rename_station",{entity_id:e.entity_id,station_id:n,name:o});const t=new CustomEvent("hass-notification",{detail:{message:`Station renamed to "${o}"`,duration:2e3},bubbles:!0,composed:!0});this.dispatchEvent(t),this._handleRenameDialogClosed(),setTimeout(()=>{this.requestUpdate()},500)}catch(t){console.error("Error renaming station:",t);const e=new CustomEvent("hass-notification",{detail:{message:"Error renaming station",duration:3e3},bubbles:!0,composed:!0});this.dispatchEvent(e)}}async _handleDeleteStation(t){this._openDeleteDialog=!1,await this.updateComplete,this._popupAnchorPosition=t.detail?.anchorPosition,this._openDeleteDialog=!0}_handleDeleteDialogClosed(){this._openDeleteDialog=!1,this._popupAnchorPosition=void 0}async _handleDeleteStationSubmit(t){const e=this._getEntity();if(!e||!this.hass)return;const{stationId:n,stationName:o}=t.detail;try{await this.hass.callService("pianobar","delete_station",{entity_id:e.entity_id,station_id:n});const t=new CustomEvent("hass-notification",{detail:{message:`Station "${o}" deleted`,duration:2e3},bubbles:!0,composed:!0});this.dispatchEvent(t),this._handleDeleteDialogClosed()}catch(t){console.error("Error deleting station:",t);const e=new CustomEvent("hass-notification",{detail:{message:"Error deleting station",duration:3e3},bubbles:!0,composed:!0});this.dispatchEvent(e)}}async _handleStationInfo(t){const e=this._getEntity();if(e&&this.hass){this._stationInfo=null,this._stationInfoLoading=!0,this._popupAnchorPosition=t.detail?.anchorPosition,this._openStationInfoPopup=!0;try{const t=e.attributes.media_content_id;if(!t)throw new Error("No station selected");const n=await this.hass.connection.sendMessagePromise({type:"call_service",domain:"pianobar",service:"get_station_info",service_data:{entity_id:e.entity_id,station_id:t},return_response:!0});this._stationInfo={artistSeeds:n?.response?.artistSeeds||[],songSeeds:n?.response?.songSeeds||[],stationSeeds:n?.response?.stationSeeds||[],feedback:n?.response?.feedback||[]}}catch(t){console.error("Error fetching station info:",t),this._stationInfo=null;const e=new CustomEvent("hass-notification",{detail:{message:"Error loading station info",duration:3e3},bubbles:!0,composed:!0});this.dispatchEvent(e)}finally{this._stationInfoLoading=!1}}}_handleStationInfoPopupClosed(){this._openStationInfoPopup=!1,this._stationInfo=null,this._popupAnchorPosition=void 0}async _handleDeleteSeed(t){const e=this._getEntity();if(!e||!this.hass)return;const{seedId:n,seedType:o,stationId:i}=t.detail;try{await this.hass.callService("pianobar","delete_seed",{entity_id:e.entity_id,seed_id:n,seed_type:o,station_id:i});const t=new CustomEvent("hass-notification",{detail:{message:"Seed deleted",duration:2e3},bubbles:!0,composed:!0});this.dispatchEvent(t),this._handleStationInfo({detail:{}})}catch(t){console.error("Error deleting seed:",t);const e=new CustomEvent("hass-notification",{detail:{message:"Error deleting seed",duration:3e3},bubbles:!0,composed:!0});this.dispatchEvent(e)}}async _handleDeleteFeedback(t){const e=this._getEntity();if(!e||!this.hass)return;const{feedbackId:n,stationId:o}=t.detail;try{await this.hass.callService("pianobar","delete_feedback",{entity_id:e.entity_id,feedback_id:n,station_id:o});const t=new CustomEvent("hass-notification",{detail:{message:"Feedback deleted",duration:2e3},bubbles:!0,composed:!0});this.dispatchEvent(t),this._handleStationInfo({detail:{}})}catch(t){console.error("Error deleting feedback:",t);const e=new CustomEvent("hass-notification",{detail:{message:"Error deleting feedback",duration:3e3},bubbles:!0,composed:!0});this.dispatchEvent(e)}}async _handleAddMusic(t){this._openAddMusicPopup=!1,await this.updateComplete,this._popupAnchorPosition=t.detail?.anchorPosition,this._openAddMusicPopup=!0,this._searchResults={categories:[]},this._searchLoading=!1}_handleAddMusicPopupClosed(){this._openAddMusicPopup=!1,this._searchResults={categories:[]},this._searchLoading=!1,this._popupAnchorPosition=void 0}async _handleMusicSearch(t){const e=this._getEntity();if(!e||!this.hass)return;const{query:n}=t.detail;this._searchLoading=!0;try{const t=await this.hass.connection.sendMessagePromise({type:"call_service",domain:"pianobar",service:"search",service_data:{entity_id:e.entity_id,query:n},return_response:!0});console.log("Music search response:",t),console.log("Response.response:",t?.response),console.log("Categories:",t?.response?.categories),this._searchResults={categories:t?.response?.categories||[]}}catch(t){console.error("Error searching:",t),this._searchResults={categories:[]};const e=new CustomEvent("hass-notification",{detail:{message:"Error searching for music",duration:3e3},bubbles:!0,composed:!0});this.dispatchEvent(e)}finally{this._searchLoading=!1}}async _handleAddMusicSubmit(t){const e=this._getEntity();if(!e||!this.hass)return;const{musicId:n,stationId:o}=t.detail;try{await this.hass.callService("pianobar","add_seed",{entity_id:e.entity_id,music_id:n,station_id:o});const t=new CustomEvent("hass-notification",{detail:{message:"Music added to station",duration:2e3},bubbles:!0,composed:!0});this.dispatchEvent(t),this._handleAddMusicPopupClosed()}catch(t){console.error("Error adding music:",t);const e=new CustomEvent("hass-notification",{detail:{message:"Error adding music to station",duration:3e3},bubbles:!0,composed:!0});this.dispatchEvent(e)}}async _handleCreateStation(t){this._openCreateStationModal=!1,await this.updateComplete,this._popupAnchorPosition=t.detail?.anchorPosition,this._openCreateStationModal=!0,this._searchResults={categories:[]},this._genreCategories=[],this._searchLoading=!1,this._genreLoading=!1}_handleCreateStationModalClosed(){this._openCreateStationModal=!1,this._searchResults={categories:[]},this._genreCategories=[],this._searchLoading=!1,this._genreLoading=!1,this._popupAnchorPosition=void 0}async _handleCreateFromSong(){const t=this._getEntity();if(!t||!this.hass)return;if(t.attributes.media_content_id)try{await this.hass.callService("pianobar","create_station",{entity_id:t.entity_id,type:"song"}),this.dispatchEvent(new CustomEvent("hass-notification",{detail:{message:"Station created from current song",duration:2e3},bubbles:!0,composed:!0}))}catch(t){console.error("Error creating station:",t),this.dispatchEvent(new CustomEvent("hass-notification",{detail:{message:"Error creating station",duration:3e3},bubbles:!0,composed:!0}))}}async _handleCreateFromArtist(){const t=this._getEntity();if(!t||!this.hass)return;if(t.attributes.media_content_id)try{await this.hass.callService("pianobar","create_station",{entity_id:t.entity_id,type:"artist"}),this.dispatchEvent(new CustomEvent("hass-notification",{detail:{message:"Station created from current artist",duration:2e3},bubbles:!0,composed:!0}))}catch(t){console.error("Error creating station:",t),this.dispatchEvent(new CustomEvent("hass-notification",{detail:{message:"Error creating station",duration:3e3},bubbles:!0,composed:!0}))}}async _handleCreateStationSearch(t){console.log("[CARD] _handleCreateStationSearch called with:",t.detail);const e=this._getEntity();if(!e||!this.hass)return void console.log("[CARD] No entity or hass, returning");const{query:n}=t.detail;console.log("[CARD] Starting search for query:",n),this._searchLoading=!0;try{console.log("[CARD] Calling service with entity_id:",e.entity_id);const t=await this.hass.connection.sendMessagePromise({type:"call_service",domain:"pianobar",service:"search",service_data:{entity_id:e.entity_id,query:n},return_response:!0});console.log("[CARD] Create station search response:",t),console.log("[CARD] Response.response:",t?.response),console.log("[CARD] Categories:",t?.response?.categories),this._searchResults={categories:t?.response?.categories||[]},console.log("[CARD] Set _searchResults to:",this._searchResults),console.log("[CARD] Triggering update..."),this._createStationModalRef.value?(console.log("[CARD] Modal ref exists, updating searchResults and mode"),this._createStationModalRef.value.searchResults=this._searchResults,this._createStationModalRef.value._mode="search-results",this._createStationModalRef.value.requestUpdate()):(console.log("[CARD] No modal ref, using requestUpdate on card"),this.requestUpdate()),console.log("[CARD] After update, _searchResults is:",this._searchResults)}catch(t){console.error("[CARD] Error searching:",t),this._searchResults={categories:[]},this.dispatchEvent(new CustomEvent("hass-notification",{detail:{message:"Error searching for music",duration:3e3},bubbles:!0,composed:!0}))}finally{this._searchLoading=!1,console.log("[CARD] Search loading finished")}}async _handleBrowseGenres(){const t=this._getEntity();if(t&&this.hass){this._genreLoading=!0;try{const e=await this.hass.connection.sendMessagePromise({type:"call_service",domain:"pianobar",service:"get_genres",service_data:{entity_id:t.entity_id},return_response:!0});this._genreCategories=e?.response?.categories||[]}catch(t){console.error("Error fetching genres:",t),this._genreCategories=[],this.dispatchEvent(new CustomEvent("hass-notification",{detail:{message:"Error loading genres",duration:3e3},bubbles:!0,composed:!0}))}finally{this._genreLoading=!1}}}async _handleCreateFromMusicId(t){const e=this._getEntity();if(!e||!this.hass)return;const{musicId:n}=t.detail;try{await this.hass.callService("pianobar","create_station_from_music_id",{entity_id:e.entity_id,music_id:n}),this.dispatchEvent(new CustomEvent("hass-notification",{detail:{message:"Station created",duration:2e3},bubbles:!0,composed:!0}))}catch(t){console.error("Error creating station:",t),this.dispatchEvent(new CustomEvent("hass-notification",{detail:{message:"Error creating station",duration:3e3},bubbles:!0,composed:!0}))}}async _handleCreateFromShared(t){const e=this._getEntity();if(!e||!this.hass)return;const{stationId:n}=t.detail;try{await this.hass.callService("pianobar","add_shared_station",{entity_id:e.entity_id,station_id:n}),this.dispatchEvent(new CustomEvent("hass-notification",{detail:{message:"Shared station added",duration:2e3},bubbles:!0,composed:!0}))}catch(t){console.error("Error adding shared station:",t),this.dispatchEvent(new CustomEvent("hass-notification",{detail:{message:"Error adding shared station",duration:3e3},bubbles:!0,composed:!0}))}}_renderStationPopup(t){if(!("normal"===(this._resolvedConfig?.stationDisplay??"hidden")||this._stationPopupOpen))return F;const e=t.attributes.stations||[];if(0===e.length)return F;const n=t.attributes.source||"",o=e.find(t=>t.name===n),i=o?.id||"",s=t.attributes.song_station_name||"",r=this._isUnavailable(t);return V`
      <pmc-station-selector
        .stations=${e}
        .currentStationId=${i}
        .currentStationName=${n}
        .songStationName=${s}
        .disabled=${r}
        .popupOnly=${!0}
        .externalOpen=${this._stationPopupOpen}
        .anchorPosition=${this._popupAnchorPosition}
        @station-change=${this._handleStationChange}
        @popup-closed=${this._handleStationPopupClosed}
      ></pmc-station-selector>
    `}_renderRatingsPopup(t){if(!this._ratingsPopupOpen)return F;const e=this._supportsLove(),n=this._supportsBan(),o=this._supportsTired();if(!e&&!n&&!o)return F;const i=t.attributes.rating||0,s=this._isUnavailable(t);return V`
      <pmc-song-actions-menu
        .rating=${i}
        .disabled=${s}
        .showLove=${e}
        .showBan=${n}
        .showTired=${o}
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
        .externalOpen=${this._upcomingPopupOpen}
        .anchorPosition=${this._popupAnchorPosition}
        .songs=${this._upcomingSongs}
        @popup-closed=${this._handleUpcomingPopupClosed}
      ></pmc-upcoming-songs-popup>
    `:F}_renderStationModePopup(t){if(!this._stationModePopupOpen)return F;const e=t.attributes.stations||[],n=t.attributes.media_content_id,o=e.find(t=>t.id===n),i=o?.name||"";return V`
      <pmc-station-mode-popup
        .externalOpen=${this._stationModePopupOpen}
        .anchorPosition=${this._popupAnchorPosition}
        .currentStationId=${n}
        .currentStationName=${i}
        .modes=${this._stationModes}
        .loading=${this._stationModesLoading}
        @set-mode=${this._handleSetStationMode}
        @popup-closed=${this._handleStationModePopupClosed}
      ></pmc-station-mode-popup>
    `}_renderQuickMixPopup(t){if(!this._openQuickMixPopup)return F;const e=t.attributes.stations||[],n=this._isUnavailable(t);return V`
      <pmc-quickmix-popup
        .stations=${e}
        .disabled=${n}
        .externalOpen=${this._openQuickMixPopup}
        .anchorPosition=${this._popupAnchorPosition}
        @save=${this._handleQuickMixSave}
        @popup-closed=${this._handleQuickMixPopupClosed}
      ></pmc-quickmix-popup>
    `}_renderRenameDialog(t){if(!this._openRenameDialog)return F;const e=t.attributes.stations||[],n=this._isUnavailable(t);return V`
      <pmc-rename-dialog
        .stations=${e}
        .disabled=${n}
        .externalOpen=${this._openRenameDialog}
        .anchorPosition=${this._popupAnchorPosition}
        @rename-station=${this._handleRenameStationSubmit}
        @dialog-closed=${this._handleRenameDialogClosed}
      ></pmc-rename-dialog>
    `}_renderDeleteDialog(t){if(!this._openDeleteDialog)return F;const e=t.attributes.stations||[],n=this._isUnavailable(t);return V`
      <pmc-delete-dialog
        .stations=${e}
        .disabled=${n}
        .externalOpen=${this._openDeleteDialog}
        .anchorPosition=${this._popupAnchorPosition}
        @delete-station=${this._handleDeleteStationSubmit}
        @dialog-closed=${this._handleDeleteDialogClosed}
      ></pmc-delete-dialog>
    `}_renderStationInfoPopup(t){const e=t.attributes.stations||[],n=t.attributes.media_content_id,o=e.find(t=>t.id===n),i=o?.name||"",s=this._isUnavailable(t);return V`
      <pmc-station-info-popup
        .currentStationId=${n}
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
    `}_renderAddMusicPopup(t){if(!this._openAddMusicPopup)return F;const e=t.attributes.stations||[],n=this._isUnavailable(t);return V`
      <pmc-add-music-popup
        .stations=${e}
        .searchResults=${this._searchResults}
        .searchLoading=${this._searchLoading}
        .disabled=${n}
        .externalOpen=${this._openAddMusicPopup}
        .anchorPosition=${this._popupAnchorPosition}
        @search=${this._handleMusicSearch}
        @add-music=${this._handleAddMusicSubmit}
        @popup-closed=${this._handleAddMusicPopupClosed}
      ></pmc-add-music-popup>
    `}_renderCreateStationModal(t){if(!this._openCreateStationModal)return F;this._isUnavailable(t);const e=t.attributes.media_title||"",n=t.attributes.media_artist||"",o=t.attributes.media_content_id||"";return V`
      <pmc-create-station-modal
        ${Ot(this._createStationModalRef)}
        .currentSongName=${e}
        .currentArtistName=${n}
        .currentTrackToken=${o}
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
    `}_renderStationPill(t){if("hidden"===(this._resolvedConfig?.stationDisplay??"hidden"))return F;const e=t.attributes.stations||[];if(0===e.length)return F;const n=t.attributes.source||"",o=e.find(t=>t.name===n),i=o?.isQuickMix??!1,s=t.attributes.song_station_name||"",r=i&&s?s:n,a=i?"mdi:shuffle":"mdi:radio";return V`
      <div class="station-pill" @click=${this._handleOpenStationPopup}>
        <ha-icon icon="${r?a:"mdi:radio"}"></ha-icon>
        <span>${r||"Select station"}</span>
      </div>
    `}_handleTallArtworkError(){this._tallArtworkError=!0}render(){if(!this._config||!this.hass)return V``;const t=this._getEntity();if(!t)return V`
        <ha-card>
          <div class="unavailable-text">
            Entity not found: ${this._config.entity}
          </div>
        </ha-card>
      `;const e="tall"===this._resolvedConfig?.artwork,n=this._isUnavailable(t),o="full-cover"===this._resolvedConfig?.artwork,i=t.attributes.entity_picture,s=e?!!i&&"string"==typeof i&&i.length>0&&!this._tallArtworkError:!!i,r=this._extractedColors?.background||"var(--pmc-card-background)",a=this._extractedColors?.foreground||"var(--pmc-primary-text-color)",l=o&&this._extractedColors?.metadataForeground||a,d=o&&this._extractedColors?.controlsForeground||a,c=xt({"--pmc-extracted-bg":r,"--pmc-extracted-fg":a,backgroundColor:!e&&s?r:void 0}),p=xt({background:`linear-gradient(to left, transparent 0, ${r} ${this._cardHeight}px, ${r} 100%)`}),h=this._resolvedConfig?.showProgressBar,u=this._resolvedConfig?.showProgressTime,g=[s&&!e?"has-artwork":"",h?"has-progress":"",h&&u?"show-time":"",this._resolvedConfig?.reserveDetailsSpace??!0?"":"no-reserve"].filter(Boolean).join(" ");return V`
      <ha-card 
        style=${e?F:c} 
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
            `:F}
        
        ${e||!s||o?F:V`
              <div class="artwork-container">
                <img class="artwork-image" src="${i}" alt="" />
              </div>
              <div class="artwork-gradient" style=${p}></div>
            `}
        
        ${!e&&o&&i?V`
              <div class="fullcover-background" style="background-image: url('${i}')"></div>
              <div class="fullcover-overlay"></div>
            `:F}

        <div class="card-content ${n?"unavailable":""}" 
             style="color: ${s&&!e?l:"inherit"}">
          ${this._renderMediaInfo(t)}
        </div>

        ${h?this._renderProgressBar(t):F}

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
              `:F}

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
      </ha-card>
    `}};xe.styles=Dt,t([ut({attribute:!1})],xe.prototype,"hass",void 0),t([gt()],xe.prototype,"_config",void 0),t([gt()],xe.prototype,"_resolvedConfig",void 0),t([gt()],xe.prototype,"_extractedColors",void 0),t([gt()],xe.prototype,"_lastImageUrl",void 0),t([gt()],xe.prototype,"_cardHeight",void 0),t([gt()],xe.prototype,"_stationPopupOpen",void 0),t([gt()],xe.prototype,"_ratingsPopupOpen",void 0),t([gt()],xe.prototype,"_upcomingPopupOpen",void 0),t([gt()],xe.prototype,"_stationModePopupOpen",void 0),t([gt()],xe.prototype,"_popupAnchorPosition",void 0),t([gt()],xe.prototype,"_upcomingSongs",void 0),t([gt()],xe.prototype,"_stationModes",void 0),t([gt()],xe.prototype,"_stationModesLoading",void 0),t([gt()],xe.prototype,"_openQuickMixPopup",void 0),t([gt()],xe.prototype,"_openRenameDialog",void 0),t([gt()],xe.prototype,"_openDeleteDialog",void 0),t([gt()],xe.prototype,"_openStationInfoPopup",void 0),t([gt()],xe.prototype,"_stationInfo",void 0),t([gt()],xe.prototype,"_stationInfoLoading",void 0),t([gt()],xe.prototype,"_openAddMusicPopup",void 0),t([gt()],xe.prototype,"_searchResults",void 0),t([gt()],xe.prototype,"_searchLoading",void 0),t([gt()],xe.prototype,"_openCreateStationModal",void 0),t([gt()],xe.prototype,"_genreCategories",void 0),t([gt()],xe.prototype,"_genreLoading",void 0),t([gt()],xe.prototype,"_tallArtworkError",void 0),xe=t([ct("pianobar-media-player-card")],xe);export{xe as PianobarMediaPlayerCard};
