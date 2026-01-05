function t(t,e,o,i){var n,r=arguments.length,s=r<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,o,i);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(s=(r<3?n(s):r>3?n(e,o,s):n(e,o))||s);return r>3&&s&&Object.defineProperty(e,o,s),s}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,o=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),n=new WeakMap;let r=class{constructor(t,e,o){if(this._$cssResult$=!0,o!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(o&&void 0===t){const o=void 0!==e&&1===e.length;o&&(t=n.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),o&&n.set(e,t))}return t}toString(){return this.cssText}};const s=(t,...e)=>{const o=1===t.length?t[0]:e.reduce((e,o,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+t[i+1],t[0]);return new r(o,t,i)},a=o?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const o of t.cssRules)e+=o.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:l,defineProperty:c,getOwnPropertyDescriptor:h,getOwnPropertyNames:d,getOwnPropertySymbols:u,getPrototypeOf:p}=Object,m=globalThis,g=m.trustedTypes,f=g?g.emptyScript:"",b=m.reactiveElementPolyfillSupport,_=(t,e)=>t,v={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let o=t;switch(e){case Boolean:o=null!==t;break;case Number:o=null===t?null:Number(t);break;case Object:case Array:try{o=JSON.parse(t)}catch(t){o=null}}return o}},y=(t,e)=>!l(t,e),w={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:y};Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=w){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const o=Symbol(),i=this.getPropertyDescriptor(t,o,e);void 0!==i&&c(this.prototype,t,i)}}static getPropertyDescriptor(t,e,o){const{get:i,set:n}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const r=i?.call(this);n?.call(this,e),this.requestUpdate(t,r,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??w}static _$Ei(){if(this.hasOwnProperty(_("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(_("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(_("properties"))){const t=this.properties,e=[...d(t),...u(t)];for(const o of e)this.createProperty(o,t[o])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,o]of e)this.elementProperties.set(t,o)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const o=this._$Eu(t,e);void 0!==o&&this._$Eh.set(o,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const o=new Set(t.flat(1/0).reverse());for(const t of o)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const o=e.attribute;return!1===o?void 0:"string"==typeof o?o:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const o of e.keys())this.hasOwnProperty(o)&&(t.set(o,this[o]),delete this[o]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{if(o)t.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const o of i){const i=document.createElement("style"),n=e.litNonce;void 0!==n&&i.setAttribute("nonce",n),i.textContent=o.cssText,t.appendChild(i)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,o){this._$AK(t,o)}_$ET(t,e){const o=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,o);if(void 0!==i&&!0===o.reflect){const n=(void 0!==o.converter?.toAttribute?o.converter:v).toAttribute(e,o.type);this._$Em=t,null==n?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(t,e){const o=this.constructor,i=o._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=o.getPropertyOptions(i),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:v;this._$Em=i;const r=n.fromAttribute(e,t.type);this[i]=r??this._$Ej?.get(i)??r,this._$Em=null}}requestUpdate(t,e,o,i=!1,n){if(void 0!==t){const r=this.constructor;if(!1===i&&(n=this[t]),o??=r.getPropertyOptions(t),!((o.hasChanged??y)(n,e)||o.useDefault&&o.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,o))))return;this.C(t,e,o)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:o,reflect:i,wrapped:n},r){o&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==n||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||o||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,o]of t){const{wrapped:t}=o,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,o,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[_("elementProperties")]=new Map,x[_("finalized")]=new Map,b?.({ReactiveElement:x}),(m.reactiveElementVersions??=[]).push("2.1.2");const $=globalThis,k=t=>t,C=$.trustedTypes,P=C?C.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",A=`lit$${Math.random().toFixed(9).slice(2)}$`,O="?"+A,E=`<${O}>`,M=document,T=()=>M.createComment(""),D=t=>null===t||"object"!=typeof t&&"function"!=typeof t,L=Array.isArray,z="[ \t\n\f\r]",B=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,R=/-->/g,U=/>/g,I=RegExp(`>|${z}(?:([^\\s"'>=/]+)(${z}*=${z}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),V=/'/g,N=/"/g,j=/^(?:script|style|textarea|title)$/i,H=(t=>(e,...o)=>({_$litType$:t,strings:e,values:o}))(1),q=Symbol.for("lit-noChange"),F=Symbol.for("lit-nothing"),W=new WeakMap,G=M.createTreeWalker(M,129);function Q(t,e){if(!L(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==P?P.createHTML(e):e}const X=(t,e)=>{const o=t.length-1,i=[];let n,r=2===e?"<svg>":3===e?"<math>":"",s=B;for(let e=0;e<o;e++){const o=t[e];let a,l,c=-1,h=0;for(;h<o.length&&(s.lastIndex=h,l=s.exec(o),null!==l);)h=s.lastIndex,s===B?"!--"===l[1]?s=R:void 0!==l[1]?s=U:void 0!==l[2]?(j.test(l[2])&&(n=RegExp("</"+l[2],"g")),s=I):void 0!==l[3]&&(s=I):s===I?">"===l[0]?(s=n??B,c=-1):void 0===l[1]?c=-2:(c=s.lastIndex-l[2].length,a=l[1],s=void 0===l[3]?I:'"'===l[3]?N:V):s===N||s===V?s=I:s===R||s===U?s=B:(s=I,n=void 0);const d=s===I&&t[e+1].startsWith("/>")?" ":"";r+=s===B?o+E:c>=0?(i.push(a),o.slice(0,c)+S+o.slice(c)+A+d):o+A+(-2===c?e:d)}return[Q(t,r+(t[o]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class Y{constructor({strings:t,_$litType$:e},o){let i;this.parts=[];let n=0,r=0;const s=t.length-1,a=this.parts,[l,c]=X(t,e);if(this.el=Y.createElement(l,o),G.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=G.nextNode())&&a.length<s;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(S)){const e=c[r++],o=i.getAttribute(t).split(A),s=/([.?@])?(.*)/.exec(e);a.push({type:1,index:n,name:s[2],strings:o,ctor:"."===s[1]?et:"?"===s[1]?ot:"@"===s[1]?it:tt}),i.removeAttribute(t)}else t.startsWith(A)&&(a.push({type:6,index:n}),i.removeAttribute(t));if(j.test(i.tagName)){const t=i.textContent.split(A),e=t.length-1;if(e>0){i.textContent=C?C.emptyScript:"";for(let o=0;o<e;o++)i.append(t[o],T()),G.nextNode(),a.push({type:2,index:++n});i.append(t[e],T())}}}else if(8===i.nodeType)if(i.data===O)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=i.data.indexOf(A,t+1));)a.push({type:7,index:n}),t+=A.length-1}n++}}static createElement(t,e){const o=M.createElement("template");return o.innerHTML=t,o}}function Z(t,e,o=t,i){if(e===q)return e;let n=void 0!==i?o._$Co?.[i]:o._$Cl;const r=D(e)?void 0:e._$litDirective$;return n?.constructor!==r&&(n?._$AO?.(!1),void 0===r?n=void 0:(n=new r(t),n._$AT(t,o,i)),void 0!==i?(o._$Co??=[])[i]=n:o._$Cl=n),void 0!==n&&(e=Z(t,n._$AS(t,e.values),n,i)),e}class J{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:o}=this._$AD,i=(t?.creationScope??M).importNode(e,!0);G.currentNode=i;let n=G.nextNode(),r=0,s=0,a=o[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new K(n,n.nextSibling,this,t):1===a.type?e=new a.ctor(n,a.name,a.strings,this,t):6===a.type&&(e=new nt(n,this,t)),this._$AV.push(e),a=o[++s]}r!==a?.index&&(n=G.nextNode(),r++)}return G.currentNode=M,i}p(t){let e=0;for(const o of this._$AV)void 0!==o&&(void 0!==o.strings?(o._$AI(t,o,e),e+=o.strings.length-2):o._$AI(t[e])),e++}}class K{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,o,i){this.type=2,this._$AH=F,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=o,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Z(this,t,e),D(t)?t===F||null==t||""===t?(this._$AH!==F&&this._$AR(),this._$AH=F):t!==this._$AH&&t!==q&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>L(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==F&&D(this._$AH)?this._$AA.nextSibling.data=t:this.T(M.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:o}=t,i="number"==typeof o?this._$AC(t):(void 0===o.el&&(o.el=Y.createElement(Q(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new J(i,this),o=t.u(this.options);t.p(e),this.T(o),this._$AH=t}}_$AC(t){let e=W.get(t.strings);return void 0===e&&W.set(t.strings,e=new Y(t)),e}k(t){L(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let o,i=0;for(const n of t)i===e.length?e.push(o=new K(this.O(T()),this.O(T()),this,this.options)):o=e[i],o._$AI(n),i++;i<e.length&&(this._$AR(o&&o._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=k(t).nextSibling;k(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,o,i,n){this.type=1,this._$AH=F,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,o.length>2||""!==o[0]||""!==o[1]?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=F}_$AI(t,e=this,o,i){const n=this.strings;let r=!1;if(void 0===n)t=Z(this,t,e,0),r=!D(t)||t!==this._$AH&&t!==q,r&&(this._$AH=t);else{const i=t;let s,a;for(t=n[0],s=0;s<n.length-1;s++)a=Z(this,i[o+s],e,s),a===q&&(a=this._$AH[s]),r||=!D(a)||a!==this._$AH[s],a===F?t=F:t!==F&&(t+=(a??"")+n[s+1]),this._$AH[s]=a}r&&!i&&this.j(t)}j(t){t===F?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===F?void 0:t}}class ot extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==F)}}class it extends tt{constructor(t,e,o,i,n){super(t,e,o,i,n),this.type=5}_$AI(t,e=this){if((t=Z(this,t,e,0)??F)===q)return;const o=this._$AH,i=t===F&&o!==F||t.capture!==o.capture||t.once!==o.once||t.passive!==o.passive,n=t!==F&&(o===F||i);i&&this.element.removeEventListener(this.name,this,o),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class nt{constructor(t,e,o){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}}const rt=$.litHtmlPolyfillSupport;rt?.(Y,K),($.litHtmlVersions??=[]).push("3.3.2");const st=globalThis;let at=class extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,o)=>{const i=o?.renderBefore??e;let n=i._$litPart$;if(void 0===n){const t=o?.renderBefore??null;i._$litPart$=n=new K(e.insertBefore(T(),t),t,void 0,o??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}};at._$litElement$=!0,at.finalized=!0,st.litElementHydrateSupport?.({LitElement:at});const lt=st.litElementPolyfillSupport;lt?.({LitElement:at}),(st.litElementVersions??=[]).push("4.2.2");const ct=t=>(e,o)=>{void 0!==o?o.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},ht={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:y},dt=(t=ht,e,o)=>{const{kind:i,metadata:n}=o;let r=globalThis.litPropertyMetadata.get(n);if(void 0===r&&globalThis.litPropertyMetadata.set(n,r=new Map),"setter"===i&&((t=Object.create(t)).wrapped=!0),r.set(o.name,t),"accessor"===i){const{name:i}=o;return{set(o){const n=e.get.call(this);e.set.call(this,o),this.requestUpdate(i,n,t,!0,o)},init(e){return void 0!==e&&this.C(i,void 0,t,e),e}}}if("setter"===i){const{name:i}=o;return function(o){const n=this[i];e.call(this,o),this.requestUpdate(i,n,t,!0,o)}}throw Error("Unsupported decorator location: "+i)};function ut(t){return(e,o)=>"object"==typeof o?dt(t,e,o):((t,e,o)=>{const i=e.hasOwnProperty(o);return e.constructor.createProperty(o,t),i?Object.getOwnPropertyDescriptor(e,o):void 0})(t,e,o)}function pt(t){return ut({...t,state:!0,attribute:!1})}const mt=1;let gt=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,o){this._$Ct=t,this._$AM=e,this._$Ci=o}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};const ft="important",bt=" !"+ft,_t=(t=>(...e)=>({_$litDirective$:t,values:e}))(class extends gt{constructor(t){if(super(t),t.type!==mt||"style"!==t.name||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,o)=>{const i=t[o];return null==i?e:e+`${o=o.includes("-")?o:o.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${i};`},"")}update(t,[e]){const{style:o}=t.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(e)),this.render(e);for(const t of this.ft)null==e[t]&&(this.ft.delete(t),t.includes("-")?o.removeProperty(t):o[t]=null);for(const t in e){const i=e[t];if(null!=i){this.ft.add(t);const e="string"==typeof i&&i.endsWith(bt);t.includes("-")||e?o.setProperty(t,e?i.slice(0,-11):i,e?ft:""):o[t]=i}}return q}}),vt=s`
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
    min-height: auto;
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
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.8) 0%,
      rgba(0, 0, 0, 0.4) 50%,
      rgba(0, 0, 0, 0.2) 100%
    );
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
`;s`
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
`;const yt={default:{artwork:"default",showDetails:!0,showTitle:!0,showArtist:!0,showAlbum:!0,reserveDetailsSpace:!0,showVolumeControl:!0,showSongActions:!0,showProgressBar:!0,showProgressTime:!1,showPlaybackControls:!0,showPowerButton:!1,stationDisplay:"hidden"},full:{artwork:"full-cover",showDetails:!0,showTitle:!0,showArtist:!0,showAlbum:!0,reserveDetailsSpace:!0,showVolumeControl:!0,showSongActions:!0,showProgressBar:!0,showProgressTime:!1,showPlaybackControls:!0,showPowerButton:!1,stationDisplay:"hidden"},minimal:{artwork:"default",showDetails:!0,showTitle:!0,showArtist:!1,showAlbum:!1,reserveDetailsSpace:!1,showVolumeControl:!1,showSongActions:!0,showProgressBar:!0,showProgressTime:!1,showPlaybackControls:!0,showPowerButton:!1,stationDisplay:"hidden"},tall:{artwork:"tall",showDetails:!0,showTitle:!0,showArtist:!0,showAlbum:!0,reserveDetailsSpace:!0,showVolumeControl:!0,showSongActions:!0,showProgressBar:!0,showProgressTime:!0,showPlaybackControls:!0,showPowerButton:!1,stationDisplay:"normal"},custom:{artwork:"default",showDetails:!0,showTitle:!0,showArtist:!0,showAlbum:!0,reserveDetailsSpace:!0,showVolumeControl:!0,showSongActions:!0,showProgressBar:!0,showProgressTime:!1,showPlaybackControls:!0,showPowerButton:!1,stationDisplay:"hidden"}};function wt(t){return yt[t]}function xt(t){const e=["default","full","minimal","tall"];for(const o of e){const e=yt[o];if((t.artwork??"default")===e.artwork&&(t.showDetails??!0)===e.showDetails&&(t.showTitle??!0)===e.showTitle&&(t.showArtist??!0)===e.showArtist&&(t.showAlbum??!0)===e.showAlbum&&(t.reserveDetailsSpace??!0)===e.reserveDetailsSpace&&(t.showPlaybackControls??!0)===e.showPlaybackControls&&(t.showVolumeControl??!0)===e.showVolumeControl&&(t.showSongActions??!0)===e.showSongActions&&(t.showProgressBar??!0)===e.showProgressBar&&(t.showPowerButton??!1)===e.showPowerButton)return o}return"custom"}function $t(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var kt,Ct={exports:{}};window,kt=function(){return function(t){var e={};function o(i){if(e[i])return e[i].exports;var n=e[i]={i:i,l:!1,exports:{}};return t[i].call(n.exports,n,n.exports,o),n.l=!0,n.exports}return o.m=t,o.c=e,o.d=function(t,e,i){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(o.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)o.d(i,n,function(e){return t[e]}.bind(null,n));return i},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="",o(o.s=10)}([function(t,e,o){Object.defineProperty(e,"__esModule",{value:!0}),e.assignDeep=e.mapValues=void 0,e.mapValues=function(t,e){var o={};for(var i in t)if(t.hasOwnProperty(i)){var n=t[i];o[i]=e(n)}return o},e.assignDeep=function t(e){for(var o=[],i=1;i<arguments.length;i++)o[i-1]=arguments[i];return o.forEach(function(o){if(o)for(var i in o)if(o.hasOwnProperty(i)){var n=o[i];Array.isArray(n)?e[i]=n.slice(0):"object"==typeof n?(e[i]||(e[i]={}),t(e[i],n)):e[i]=n}}),e}},function(t,e,o){var i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var n=o(7),r=i(o(8)),s=o(0),a=function(){function t(e,o){this._src=e,this.opts=s.assignDeep({},t.DefaultOpts,o)}return t.use=function(t){this._pipeline=t},t.from=function(t){return new r.default(t)},Object.defineProperty(t.prototype,"result",{get:function(){return this._result},enumerable:!1,configurable:!0}),t.prototype._process=function(e,o){this.opts.quantizer,e.scaleDown(this.opts);var i=n.buildProcessOptions(this.opts,o);return t._pipeline.process(e.getImageData(),i)},t.prototype.palette=function(){return this.swatches()},t.prototype.swatches=function(){throw new Error("Method deprecated. Use `Vibrant.result.palettes[name]` instead")},t.prototype.getPalette=function(){var t=this,e=arguments[0],o="string"==typeof e?e:"default",i="string"==typeof e?arguments[1]:e,n=new this.opts.ImageClass;return n.load(this._src).then(function(e){return t._process(e,{generators:[o]})}).then(function(e){return t._result=e,e.palettes[o]}).then(function(t){return n.remove(),i&&i(void 0,t),t}).catch(function(t){return n.remove(),i&&i(t),Promise.reject(t)})},t.prototype.getPalettes=function(){var t=this,e=arguments[0],o=arguments[1],i=Array.isArray(e)?e:["*"],n=Array.isArray(e)?o:e,r=new this.opts.ImageClass;return r.load(this._src).then(function(e){return t._process(e,{generators:i})}).then(function(e){return t._result=e,e.palettes}).then(function(t){return r.remove(),n&&n(void 0,t),t}).catch(function(t){return r.remove(),n&&n(t),Promise.reject(t)})},t.DefaultOpts={colorCount:64,quality:5,filters:[]},t}();e.default=a},function(t,e,o){Object.defineProperty(e,"__esModule",{value:!0}),e.applyFilters=e.ImageBase=void 0;var i=function(){function t(){}return t.prototype.scaleDown=function(t){var e=this.getWidth(),o=this.getHeight(),i=1;if(t.maxDimension>0){var n=Math.max(e,o);n>t.maxDimension&&(i=t.maxDimension/n)}else i=1/t.quality;i<1&&this.resize(e*i,o*i,i)},t}();e.ImageBase=i,e.applyFilters=function(t,e){if(e.length>0)for(var o=t.data,i=o.length/4,n=void 0,r=void 0,s=void 0,a=void 0,l=void 0,c=0;c<i;c++){r=o[0+(n=4*c)],s=o[n+1],a=o[n+2],l=o[n+3];for(var h=0;h<e.length;h++)if(!e[h](r,s,a,l)){o[n+3]=0;break}}return t}},function(t,e,o){Object.defineProperty(e,"__esModule",{value:!0}),e.Swatch=void 0;var i=o(4),n=function(){function t(t,e){this._rgb=t,this._population=e}return t.applyFilters=function(t,e){return e.length>0?t.filter(function(t){for(var o=t.r,i=t.g,n=t.b,r=0;r<e.length;r++)if(!e[r](o,i,n,255))return!1;return!0}):t},t.clone=function(e){return new t(e._rgb,e._population)},Object.defineProperty(t.prototype,"r",{get:function(){return this._rgb[0]},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"g",{get:function(){return this._rgb[1]},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"b",{get:function(){return this._rgb[2]},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"rgb",{get:function(){return this._rgb},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"hsl",{get:function(){if(!this._hsl){var t=this._rgb,e=t[0],o=t[1],n=t[2];this._hsl=i.rgbToHsl(e,o,n)}return this._hsl},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"hex",{get:function(){if(!this._hex){var t=this._rgb,e=t[0],o=t[1],n=t[2];this._hex=i.rgbToHex(e,o,n)}return this._hex},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"population",{get:function(){return this._population},enumerable:!1,configurable:!0}),t.prototype.toJSON=function(){return{rgb:this.rgb,population:this.population}},t.prototype.getRgb=function(){return this._rgb},t.prototype.getHsl=function(){return this.hsl},t.prototype.getPopulation=function(){return this._population},t.prototype.getHex=function(){return this.hex},t.prototype.getYiq=function(){if(!this._yiq){var t=this._rgb;this._yiq=(299*t[0]+587*t[1]+114*t[2])/1e3}return this._yiq},Object.defineProperty(t.prototype,"titleTextColor",{get:function(){return this._titleTextColor&&(this._titleTextColor=this.getYiq()<200?"#fff":"#000"),this._titleTextColor},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"bodyTextColor",{get:function(){return this._bodyTextColor&&(this._bodyTextColor=this.getYiq()<150?"#fff":"#000"),this._bodyTextColor},enumerable:!1,configurable:!0}),t.prototype.getTitleTextColor=function(){return this.titleTextColor},t.prototype.getBodyTextColor=function(){return this.bodyTextColor},t}();e.Swatch=n},function(t,e,o){function i(t){var e=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);if(!e)throw new RangeError("'"+t+"' is not a valid hex color");return[e[1],e[2],e[3]].map(function(t){return parseInt(t,16)})}function n(t,e,o){return e/=255,o/=255,t=(t/=255)>.04045?Math.pow((t+.005)/1.055,2.4):t/12.92,e=e>.04045?Math.pow((e+.005)/1.055,2.4):e/12.92,o=o>.04045?Math.pow((o+.005)/1.055,2.4):o/12.92,[.4124*(t*=100)+.3576*(e*=100)+.1805*(o*=100),.2126*t+.7152*e+.0722*o,.0193*t+.1192*e+.9505*o]}function r(t,e,o){return e/=100,o/=108.883,t=(t/=95.047)>.008856?Math.pow(t,1/3):7.787*t+16/116,[116*(e=e>.008856?Math.pow(e,1/3):7.787*e+16/116)-16,500*(t-e),200*(e-(o=o>.008856?Math.pow(o,1/3):7.787*o+16/116))]}function s(t,e,o){var i=n(t,e,o);return r(i[0],i[1],i[2])}function a(t,e){var o=t[0],i=t[1],n=t[2],r=e[0],s=e[1],a=e[2],l=o-r,c=i-s,h=n-a,d=Math.sqrt(i*i+n*n),u=r-o,p=Math.sqrt(s*s+a*a)-d,m=Math.sqrt(l*l+c*c+h*h),g=Math.sqrt(m)>Math.sqrt(Math.abs(u))+Math.sqrt(Math.abs(p))?Math.sqrt(m*m-u*u-p*p):0;return u/=1,p/=1*(1+.045*d),g/=1*(1+.015*d),Math.sqrt(u*u+p*p+g*g)}function l(t,e){return a(s.apply(void 0,t),s.apply(void 0,e))}Object.defineProperty(e,"__esModule",{value:!0}),e.getColorDiffStatus=e.hexDiff=e.rgbDiff=e.deltaE94=e.rgbToCIELab=e.xyzToCIELab=e.rgbToXyz=e.hslToRgb=e.rgbToHsl=e.rgbToHex=e.hexToRgb=e.DELTAE94_DIFF_STATUS=void 0,e.DELTAE94_DIFF_STATUS={NA:0,PERFECT:1,CLOSE:2,GOOD:10,SIMILAR:50},e.hexToRgb=i,e.rgbToHex=function(t,e,o){return"#"+((1<<24)+(t<<16)+(e<<8)+o).toString(16).slice(1,7)},e.rgbToHsl=function(t,e,o){t/=255,e/=255,o/=255;var i=Math.max(t,e,o),n=Math.min(t,e,o),r=0,s=0,a=(i+n)/2;if(i!==n){var l=i-n;switch(s=a>.5?l/(2-i-n):l/(i+n),i){case t:r=(e-o)/l+(e<o?6:0);break;case e:r=(o-t)/l+2;break;case o:r=(t-e)/l+4}r/=6}return[r,s,a]},e.hslToRgb=function(t,e,o){var i,n,r;function s(t,e,o){return o<0&&(o+=1),o>1&&(o-=1),o<1/6?t+6*(e-t)*o:o<.5?e:o<2/3?t+(e-t)*(2/3-o)*6:t}if(0===e)i=n=r=o;else{var a=o<.5?o*(1+e):o+e-o*e,l=2*o-a;i=s(l,a,t+1/3),n=s(l,a,t),r=s(l,a,t-1/3)}return[255*i,255*n,255*r]},e.rgbToXyz=n,e.xyzToCIELab=r,e.rgbToCIELab=s,e.deltaE94=a,e.rgbDiff=l,e.hexDiff=function(t,e){return l(i(t),i(e))},e.getColorDiffStatus=function(t){return t<e.DELTAE94_DIFF_STATUS.NA?"N/A":t<=e.DELTAE94_DIFF_STATUS.PERFECT?"Perfect":t<=e.DELTAE94_DIFF_STATUS.CLOSE?"Close":t<=e.DELTAE94_DIFF_STATUS.GOOD?"Good":t<e.DELTAE94_DIFF_STATUS.SIMILAR?"Similar":"Wrong"}},function(t,e,o){var i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}},n=i(o(6)),r=i(o(9));n.default.DefaultOpts.ImageClass=r.default,t.exports=n.default},function(t,e,o){var i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var n=i(o(1));n.default.DefaultOpts.quantizer="mmcq",n.default.DefaultOpts.generators=["default"],n.default.DefaultOpts.filters=["default"],e.default=n.default},function(t,e,o){Object.defineProperty(e,"__esModule",{value:!0}),e.buildProcessOptions=void 0;var i=o(0);e.buildProcessOptions=function(t,e){var o=t.colorCount,n=t.quantizer,r=t.generators,s=t.filters,a={colorCount:o},l="string"==typeof n?{name:n,options:{}}:n;return l.options=i.assignDeep({},a,l.options),i.assignDeep({},{quantizer:l,generators:r,filters:s},e)}},function(t,e,o){var i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var n=i(o(1)),r=o(0),s=function(){function t(t,e){void 0===e&&(e={}),this._src=t,this._opts=r.assignDeep({},n.default.DefaultOpts,e)}return t.prototype.maxColorCount=function(t){return this._opts.colorCount=t,this},t.prototype.maxDimension=function(t){return this._opts.maxDimension=t,this},t.prototype.addFilter=function(t){return this._opts.filters?this._opts.filters.push(t):this._opts.filters=[t],this},t.prototype.removeFilter=function(t){if(this._opts.filters){var e=this._opts.filters.indexOf(t);e>0&&this._opts.filters.splice(e)}return this},t.prototype.clearFilters=function(){return this._opts.filters=[],this},t.prototype.quality=function(t){return this._opts.quality=t,this},t.prototype.useImageClass=function(t){return this._opts.ImageClass=t,this},t.prototype.useGenerator=function(t,e){return this._opts.generators||(this._opts.generators=[]),this._opts.generators.push(e?{name:t,options:e}:t),this},t.prototype.useQuantizer=function(t,e){return this._opts.quantizer=e?{name:t,options:e}:t,this},t.prototype.build=function(){return new n.default(this._src,this._opts)},t.prototype.getPalette=function(t){return this.build().getPalette(t)},t.prototype.getSwatches=function(t){return this.build().getPalette(t)},t}();e.default=s},function(t,e,o){var i,n=this&&this.__extends||(i=function(t,e){return i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o])},i(t,e)},function(t,e){function o(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)});Object.defineProperty(e,"__esModule",{value:!0});var r=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return n(e,t),e.prototype._initCanvas=function(){var t=this.image,e=this._canvas=document.createElement("canvas"),o=e.getContext("2d");if(!o)throw new ReferenceError("Failed to create canvas context");this._context=o,e.className="@vibrant/canvas",e.style.display="none",this._width=e.width=t.width,this._height=e.height=t.height,o.drawImage(t,0,0),document.body.appendChild(e)},e.prototype.load=function(t){var e,o,i=this;if("string"==typeof t)e=document.createElement("img"),function(t){var e=new URL(t,location.href);return e.protocol===location.protocol&&e.host===location.host&&e.port===location.port}(o=t)||function(t,e){var o=new URL(t),i=new URL(e);return o.protocol===i.protocol&&o.hostname===i.hostname&&o.port===i.port}(window.location.href,o)||(e.crossOrigin="anonymous"),e.src=o;else{if(!(t instanceof HTMLImageElement))return Promise.reject(new Error("Cannot load buffer as an image in browser"));e=t,o=t.src}return this.image=e,new Promise(function(t,n){var r=function(){i._initCanvas(),t(i)};e.complete?r():(e.onload=r,e.onerror=function(t){return n(new Error("Fail to load image: "+o))})})},e.prototype.clear=function(){this._context.clearRect(0,0,this._width,this._height)},e.prototype.update=function(t){this._context.putImageData(t,0,0)},e.prototype.getWidth=function(){return this._width},e.prototype.getHeight=function(){return this._height},e.prototype.resize=function(t,e,o){var i=this,n=i._canvas,r=i._context,s=i.image;this._width=n.width=t,this._height=n.height=e,r.scale(o,o),r.drawImage(s,0,0)},e.prototype.getPixelCount=function(){return this._width*this._height},e.prototype.getImageData=function(){return this._context.getImageData(0,0,this._width,this._height)},e.prototype.remove=function(){this._canvas&&this._canvas.parentNode&&this._canvas.parentNode.removeChild(this._canvas)},e}(o(2).ImageBase);e.default=r},function(t,e,o){var i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}},n=o(5),r=i(o(11));n.use(r.default),t.exports=n},function(t,e,o){var i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var n=i(o(12)),r=i(o(16)),s=(new(o(17).BasicPipeline)).filter.register("default",function(t,e,o,i){return i>=125&&!(t>250&&e>250&&o>250)}).quantizer.register("mmcq",n.default).generator.register("default",r.default);e.default=s},function(t,e,o){var i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var n=o(3),r=i(o(13)),s=i(o(15));function a(t,e){for(var o=t.size();t.size()<e;){var i=t.pop();if(!(i&&i.count()>0))break;var n=i.split(),r=n[0],s=n[1];if(t.push(r),s&&s.count()>0&&t.push(s),t.size()===o)break;o=t.size()}}e.default=function(t,e){if(0===t.length||e.colorCount<2||e.colorCount>256)throw new Error("Wrong MMCQ parameters");var o=r.default.build(t);o.histogram.colorCount;var i=new s.default(function(t,e){return t.count()-e.count()});i.push(o),a(i,.75*e.colorCount);var l=new s.default(function(t,e){return t.count()*t.volume()-e.count()*e.volume()});return l.contents=i.contents,a(l,e.colorCount-l.size()),function(t){for(var e=[];t.size();){var o=t.pop(),i=o.avg();i[0],i[1],i[2],e.push(new n.Swatch(i,o.count()))}return e}(l)}},function(t,e,o){var i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var n=i(o(14)),r=function(){function t(t,e,o,i,n,r,s){this.histogram=s,this._volume=-1,this._count=-1,this.dimension={r1:t,r2:e,g1:o,g2:i,b1:n,b2:r}}return t.build=function(e){var o=new n.default(e,{sigBits:5});return new t(o.rmin,o.rmax,o.gmin,o.gmax,o.bmin,o.bmax,o)},t.prototype.invalidate=function(){this._volume=this._count=-1,this._avg=null},t.prototype.volume=function(){if(this._volume<0){var t=this.dimension,e=t.r1,o=t.r2,i=t.g1,n=t.g2,r=t.b1,s=t.b2;this._volume=(o-e+1)*(n-i+1)*(s-r+1)}return this._volume},t.prototype.count=function(){if(this._count<0){for(var t=this.histogram,e=t.hist,o=t.getColorIndex,i=this.dimension,n=i.r1,r=i.r2,s=i.g1,a=i.g2,l=i.b1,c=i.b2,h=0,d=n;d<=r;d++)for(var u=s;u<=a;u++)for(var p=l;p<=c;p++)h+=e[o(d,u,p)];this._count=h}return this._count},t.prototype.clone=function(){var e=this.histogram,o=this.dimension;return new t(o.r1,o.r2,o.g1,o.g2,o.b1,o.b2,e)},t.prototype.avg=function(){if(!this._avg){var t=this.histogram,e=t.hist,o=t.getColorIndex,i=this.dimension,n=i.r1,r=i.r2,s=i.g1,a=i.g2,l=i.b1,c=i.b2,h=0,d=void 0,u=void 0,p=void 0;d=u=p=0;for(var m=n;m<=r;m++)for(var g=s;g<=a;g++)for(var f=l;f<=c;f++){var b=e[o(m,g,f)];h+=b,d+=b*(m+.5)*8,u+=b*(g+.5)*8,p+=b*(f+.5)*8}this._avg=h?[~~(d/h),~~(u/h),~~(p/h)]:[~~(8*(n+r+1)/2),~~(8*(s+a+1)/2),~~(8*(l+c+1)/2)]}return this._avg},t.prototype.contains=function(t){var e=t[0],o=t[1],i=t[2],n=this.dimension,r=n.r1,s=n.r2,a=n.g1,l=n.g2,c=n.b1,h=n.b2;return o>>=3,i>>=3,(e>>=3)>=r&&e<=s&&o>=a&&o<=l&&i>=c&&i<=h},t.prototype.split=function(){var t=this.histogram,e=t.hist,o=t.getColorIndex,i=this.dimension,n=i.r1,r=i.r2,s=i.g1,a=i.g2,l=i.b1,c=i.b2,h=this.count();if(!h)return[];if(1===h)return[this.clone()];var d,u,p=r-n+1,m=a-s+1,g=c-l+1,f=Math.max(p,m,g),b=null;d=u=0;var _=null;if(f===p){_="r",b=new Uint32Array(r+1);for(var v=n;v<=r;v++){d=0;for(var y=s;y<=a;y++)for(var w=l;w<=c;w++)d+=e[o(v,y,w)];u+=d,b[v]=u}}else if(f===m)for(_="g",b=new Uint32Array(a+1),y=s;y<=a;y++){for(d=0,v=n;v<=r;v++)for(w=l;w<=c;w++)d+=e[o(v,y,w)];u+=d,b[y]=u}else for(_="b",b=new Uint32Array(c+1),w=l;w<=c;w++){for(d=0,v=n;v<=r;v++)for(y=s;y<=a;y++)d+=e[o(v,y,w)];u+=d,b[w]=u}for(var x=-1,$=new Uint32Array(b.length),k=0;k<b.length;k++){var C=b[k];x<0&&C>u/2&&(x=k),$[k]=u-C}var P=this;return function(t){var e=t+"1",o=t+"2",i=P.dimension[e],n=P.dimension[o],r=P.clone(),s=P.clone(),a=x-i,l=n-x;for(a<=l?(n=Math.min(n-1,~~(x+l/2)),n=Math.max(0,n)):(n=Math.max(i,~~(x-1-a/2)),n=Math.min(P.dimension[o],n));!b[n];)n++;for(var c=$[n];!c&&b[n-1];)c=$[--n];return r.dimension[o]=n,s.dimension[e]=n+1,[r,s]}(_)},t}();e.default=r},function(t,e,o){Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(t,e){this.pixels=t,this.opts=e;var o=e.sigBits,i=function(t,e,i){return(t<<2*o)+(e<<o)+i};this.getColorIndex=i;var n,r,s,a,l,c,h,d,u,p=8-o,m=new Uint32Array(1<<3*o);n=s=l=0,r=a=c=Number.MAX_VALUE;for(var g=t.length/4,f=0;f<g;){var b=4*f;f++,h=t[b+0],d=t[b+1],u=t[b+2],0!==t[b+3]&&(m[i(h>>=p,d>>=p,u>>=p)]+=1,h>n&&(n=h),h<r&&(r=h),d>s&&(s=d),d<a&&(a=d),u>l&&(l=u),u<c&&(c=u))}this._colorCount=m.reduce(function(t,e){return e>0?t+1:t},0),this.hist=m,this.rmax=n,this.rmin=r,this.gmax=s,this.gmin=a,this.bmax=l,this.bmin=c}return Object.defineProperty(t.prototype,"colorCount",{get:function(){return this._colorCount},enumerable:!1,configurable:!0}),t}();e.default=i},function(t,e,o){Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(t){this._comparator=t,this.contents=[],this._sorted=!1}return t.prototype._sort=function(){this._sorted||(this.contents.sort(this._comparator),this._sorted=!0)},t.prototype.push=function(t){this.contents.push(t),this._sorted=!1},t.prototype.peek=function(t){return this._sort(),t="number"==typeof t?t:this.contents.length-1,this.contents[t]},t.prototype.pop=function(){return this._sort(),this.contents.pop()},t.prototype.size=function(){return this.contents.length},t.prototype.map=function(t){return this._sort(),this.contents.map(t)},t}();e.default=i},function(t,e,o){Object.defineProperty(e,"__esModule",{value:!0});var i=o(3),n=o(4),r={targetDarkLuma:.26,maxDarkLuma:.45,minLightLuma:.55,targetLightLuma:.74,minNormalLuma:.3,targetNormalLuma:.5,maxNormalLuma:.7,targetMutesSaturation:.3,maxMutesSaturation:.4,targetVibrantSaturation:1,minVibrantSaturation:.35,weightSaturation:3,weightLuma:6.5,weightPopulation:.5};function s(t,e,o,i,n,r,s,a,l,c){var h=null,d=0;return e.forEach(function(e){var u=e.hsl,p=u[1],m=u[2];if(p>=a&&p<=l&&m>=n&&m<=r&&!function(t,e){return t.Vibrant===e||t.DarkVibrant===e||t.LightVibrant===e||t.Muted===e||t.DarkMuted===e||t.LightMuted===e}(t,e)){var g=function(t,e,o,i,n,r,s){function a(t,e){return 1-Math.abs(t-e)}return function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];for(var o=0,i=0,n=0;n<t.length;n+=2){var r=t[n],s=t[n+1];o+=r*s,i+=s}return o/i}(a(t,e),s.weightSaturation,a(o,i),s.weightLuma,n/r,s.weightPopulation)}(p,s,m,i,e.population,o,c);(null===h||g>d)&&(h=e,d=g)}}),h}e.default=function(t,e){e=Object.assign({},r,e);var o=function(t){var e=0;return t.forEach(function(t){e=Math.max(e,t.population)}),e}(t),a=function(t,e,o){var i={Vibrant:null,DarkVibrant:null,LightVibrant:null,Muted:null,DarkMuted:null,LightMuted:null};return i.Vibrant=s(i,t,e,o.targetNormalLuma,o.minNormalLuma,o.maxNormalLuma,o.targetVibrantSaturation,o.minVibrantSaturation,1,o),i.LightVibrant=s(i,t,e,o.targetLightLuma,o.minLightLuma,1,o.targetVibrantSaturation,o.minVibrantSaturation,1,o),i.DarkVibrant=s(i,t,e,o.targetDarkLuma,0,o.maxDarkLuma,o.targetVibrantSaturation,o.minVibrantSaturation,1,o),i.Muted=s(i,t,e,o.targetNormalLuma,o.minNormalLuma,o.maxNormalLuma,o.targetMutesSaturation,0,o.maxMutesSaturation,o),i.LightMuted=s(i,t,e,o.targetLightLuma,o.minLightLuma,1,o.targetMutesSaturation,0,o.maxMutesSaturation,o),i.DarkMuted=s(i,t,e,o.targetDarkLuma,0,o.maxDarkLuma,o.targetMutesSaturation,0,o.maxMutesSaturation,o),i}(t,o,e);return function(t,e,o){if(!t.Vibrant&&!t.DarkVibrant&&!t.LightVibrant){if(!t.DarkVibrant&&t.DarkMuted){var r=t.DarkMuted.hsl,s=r[0],a=r[1],l=r[2];l=o.targetDarkLuma,t.DarkVibrant=new i.Swatch(n.hslToRgb(s,a,l),0)}if(!t.LightVibrant&&t.LightMuted){var c=t.LightMuted.hsl;s=c[0],a=c[1],l=c[2],l=o.targetDarkLuma,t.DarkVibrant=new i.Swatch(n.hslToRgb(s,a,l),0)}}if(!t.Vibrant&&t.DarkVibrant){var h=t.DarkVibrant.hsl;s=h[0],a=h[1],l=h[2],l=o.targetNormalLuma,t.Vibrant=new i.Swatch(n.hslToRgb(s,a,l),0)}else if(!t.Vibrant&&t.LightVibrant){var d=t.LightVibrant.hsl;s=d[0],a=d[1],l=d[2],l=o.targetNormalLuma,t.Vibrant=new i.Swatch(n.hslToRgb(s,a,l),0)}if(!t.DarkVibrant&&t.Vibrant){var u=t.Vibrant.hsl;s=u[0],a=u[1],l=u[2],l=o.targetDarkLuma,t.DarkVibrant=new i.Swatch(n.hslToRgb(s,a,l),0)}if(!t.LightVibrant&&t.Vibrant){var p=t.Vibrant.hsl;s=p[0],a=p[1],l=p[2],l=o.targetLightLuma,t.LightVibrant=new i.Swatch(n.hslToRgb(s,a,l),0)}if(!t.Muted&&t.Vibrant){var m=t.Vibrant.hsl;s=m[0],a=m[1],l=m[2],l=o.targetMutesSaturation,t.Muted=new i.Swatch(n.hslToRgb(s,a,l),0)}if(!t.DarkMuted&&t.DarkVibrant){var g=t.DarkVibrant.hsl;s=g[0],a=g[1],l=g[2],l=o.targetMutesSaturation,t.DarkMuted=new i.Swatch(n.hslToRgb(s,a,l),0)}if(!t.LightMuted&&t.LightVibrant){var f=t.LightVibrant.hsl;s=f[0],a=f[1],l=f[2],l=o.targetMutesSaturation,t.LightMuted=new i.Swatch(n.hslToRgb(s,a,l),0)}}(a,0,e),a}},function(t,e,o){var i=this&&this.__awaiter||function(t,e,o,i){return new(o||(o=Promise))(function(n,r){function s(t){try{l(i.next(t))}catch(t){r(t)}}function a(t){try{l(i.throw(t))}catch(t){r(t)}}function l(t){var e;t.done?n(t.value):(e=t.value,e instanceof o?e:new o(function(t){t(e)})).then(s,a)}l((i=i.apply(t,e||[])).next())})},n=this&&this.__generator||function(t,e){var o,i,n,r,s={label:0,sent:function(){if(1&n[0])throw n[1];return n[1]},trys:[],ops:[]};return r={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(r[Symbol.iterator]=function(){return this}),r;function a(r){return function(a){return function(r){if(o)throw new TypeError("Generator is already executing.");for(;s;)try{if(o=1,i&&(n=2&r[0]?i.return:r[0]?i.throw||((n=i.return)&&n.call(i),0):i.next)&&!(n=n.call(i,r[1])).done)return n;switch(i=0,n&&(r=[2&r[0],n.value]),r[0]){case 0:case 1:n=r;break;case 4:return s.label++,{value:r[1],done:!1};case 5:s.label++,i=r[1],r=[0];continue;case 7:r=s.ops.pop(),s.trys.pop();continue;default:if(!((n=(n=s.trys).length>0&&n[n.length-1])||6!==r[0]&&2!==r[0])){s=0;continue}if(3===r[0]&&(!n||r[1]>n[0]&&r[1]<n[3])){s.label=r[1];break}if(6===r[0]&&s.label<n[1]){s.label=n[1],n=r;break}if(n&&s.label<n[2]){s.label=n[2],s.ops.push(r);break}n[2]&&s.ops.pop(),s.trys.pop();continue}r=e.call(t,s)}catch(t){r=[6,t],i=0}finally{o=n=0}if(5&r[0])throw r[1];return{value:r[0]?r[1]:void 0,done:!0}}([r,a])}}};Object.defineProperty(e,"__esModule",{value:!0}),e.BasicPipeline=e.Stage=void 0;var r=o(2),s=function(){function t(t){this.pipeline=t,this._map={}}return t.prototype.names=function(){return Object.keys(this._map)},t.prototype.has=function(t){return!!this._map[t]},t.prototype.get=function(t){return this._map[t]},t.prototype.register=function(t,e){return this._map[t]=e,this.pipeline},t}();e.Stage=s;var a=function(){function t(){this.filter=new s(this),this.quantizer=new s(this),this.generator=new s(this)}return t.prototype._buildProcessTasks=function(t){var e=this,o=t.filters,i=t.quantizer,n=t.generators;return 1===n.length&&"*"===n[0]&&(n=this.generator.names()),{filters:o.map(function(t){return r(e.filter,t)}),quantizer:r(this.quantizer,i),generators:n.map(function(t){return r(e.generator,t)})};function r(t,e){var o,i;return"string"==typeof e?o=e:(o=e.name,i=e.options),{name:o,fn:t.get(o),options:i}}},t.prototype.process=function(t,e){return i(this,void 0,void 0,function(){var o,i,r,s,a,l,c;return n(this,function(n){switch(n.label){case 0:return o=this._buildProcessTasks(e),i=o.filters,r=o.quantizer,s=o.generators,[4,this._filterColors(i,t)];case 1:return a=n.sent(),[4,this._generateColors(r,a)];case 2:return l=n.sent(),[4,this._generatePalettes(s,l)];case 3:return c=n.sent(),[2,{colors:l,palettes:c}]}})})},t.prototype._filterColors=function(t,e){return Promise.resolve(r.applyFilters(e,t.map(function(t){return t.fn})))},t.prototype._generateColors=function(t,e){return Promise.resolve(t.fn(e.data,t.options))},t.prototype._generatePalettes=function(t,e){return i(this,void 0,void 0,function(){var o;return n(this,function(i){switch(i.label){case 0:return[4,Promise.all(t.map(function(t){var o=t.fn,i=t.options;return Promise.resolve(o(e,i))}))];case 1:return o=i.sent(),[2,Promise.resolve(o.reduce(function(e,o,i){return e[t[i].name]=o,e},{}))]}})})},t}();e.BasicPipeline=a}])};var Pt=$t(Ct.exports=kt());const St={background:"#1c1c1c",foreground:"#ffffff"},At=new Map,Ot=(t,e,o)=>{const i=[t,e,o].map(t=>{const e=t/255;return e<=.03928?e/12.92:((e+.055)/1.055)**2.4});return.2126*i[0]+.7152*i[1]+.0722*i[2]},Et=(t,e)=>Math.round(100*(((t,e)=>{const o=Ot(t[0],t[1],t[2]),i=Ot(e[0],e[1],e[2]);return(Math.max(o,i)+.05)/(Math.min(o,i)+.05)})(t,e)+Number.EPSILON))/100;Pt._pipeline.generator.register("default",t=>{t.sort((t,e)=>e.population-t.population);const e=t[0];let o;const i=new Map,n=(t,o)=>(i.has(t)||i.set(t,Et(e.rgb,o)),(i.get(t)||0)>4.5);for(let e=1;e<t.length&&void 0===o;e++){if(n(t[e].hex,t[e].rgb)){o=t[e].rgb;break}const i=t[e];for(let r=e+1;r<t.length;r++){const e=t[r];if(!(Math.abs(i.rgb[0]-e.rgb[0])+Math.abs(i.rgb[1]-e.rgb[1])+Math.abs(i.rgb[2]-e.rgb[2])>150)&&n(e.hex,e.rgb)){o=e.rgb;break}}}return void 0===o&&(o=e.getYiq()<200?[255,255,255]:[0,0,0]),[new e.constructor(o,0).hex,e.hex]});async function Mt(t){if(!t)return St;const e=At.get(t);if(e)return e;try{const[e,o]=await(async t=>new Pt(t,{colorCount:16}).getPalette())(t),i={background:o,foreground:e};if(At.set(t,i),At.size>50){const t=At.keys().next().value;t&&At.delete(t)}return i}catch(t){return console.error("Error extracting colors:",t),St}}const Tt={x:0,y:0,width:.4,height:.7},Dt={x:0,y:.7,width:1,height:.3};function Lt(t,e,o,i){const n=Math.floor(e.x*o),r=Math.floor(e.y*i),s=Math.floor((e.x+e.width)*o),a=Math.floor((e.y+e.height)*i);let l=0,c=0,h=0,d=0;for(let e=r;e<a;e+=4)for(let i=n;i<s;i+=4){const n=4*(e*o+i);l+=t.data[n],c+=t.data[n+1],h+=t.data[n+2],d++}return 0===d?[128,128,128]:[Math.round(l/d),Math.round(c/d),Math.round(h/d)]}function zt(t,e=0){const o=function(t,e){const o=1-e;return[Math.round(t[0]*o),Math.round(t[1]*o),Math.round(t[2]*o)]}(t,e);return Ot(o[0],o[1],o[2])<.5?"#ffffff":"#1a1a1a"}let Bt=class extends at{constructor(){super(...arguments),this.playing=!1,this.disabled=!1,this.showPower=!1,this.isOn=!0}_handlePower(){this.dispatchEvent(new CustomEvent("power-toggle",{bubbles:!0,composed:!0}))}_handlePlayPause(){this.dispatchEvent(new CustomEvent("play-pause",{bubbles:!0,composed:!0}))}_handleNext(){this.dispatchEvent(new CustomEvent("next-track",{bubbles:!0,composed:!0}))}render(){return H`
      ${this.showPower?H`
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
    `}};Bt.styles=s`
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
  `,t([ut({type:Boolean})],Bt.prototype,"playing",void 0),t([ut({type:Boolean})],Bt.prototype,"disabled",void 0),t([ut({type:Boolean})],Bt.prototype,"showPower",void 0),t([ut({type:Boolean})],Bt.prototype,"isOn",void 0),Bt=t([ct("pmc-playback-controls")],Bt);let Rt=class extends at{constructor(){super(...arguments),this.duration=0,this.position=0,this.positionUpdatedAt="",this.showTime=!1,this.isPlaying=!1,this._animationFrameId=null,this._currentPosition=0}connectedCallback(){super.connectedCallback(),this._startAnimation()}disconnectedCallback(){super.disconnectedCallback(),this._stopAnimation()}updated(t){(t.has("position")||t.has("positionUpdatedAt"))&&(this._currentPosition=this.position)}_startAnimation(){const t=()=>{if(this.duration>0&&this.positionUpdatedAt){if(this.isPlaying){const t=new Date(this.positionUpdatedAt).getTime(),e=(Date.now()-t)/1e3;this._currentPosition=Math.min(this.position+e,this.duration)}else this._currentPosition=this.position;this.requestUpdate()}this._animationFrameId=requestAnimationFrame(t)};this._animationFrameId=requestAnimationFrame(t)}_stopAnimation(){this._animationFrameId&&(cancelAnimationFrame(this._animationFrameId),this._animationFrameId=null)}_formatTime(t){return`${Math.floor(t/60)}:${Math.floor(t%60).toString().padStart(2,"0")}`}render(){const t=this.duration>0?this._currentPosition/this.duration*100:0;return H`
      <div class="progress-container">
        ${this.showTime?H`
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
    `}};Rt.styles=s`
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
  `,t([ut({type:Number})],Rt.prototype,"duration",void 0),t([ut({type:Number})],Rt.prototype,"position",void 0),t([ut({type:String})],Rt.prototype,"positionUpdatedAt",void 0),t([ut({type:Boolean})],Rt.prototype,"showTime",void 0),t([ut({type:Boolean})],Rt.prototype,"isPlaying",void 0),Rt=t([ct("pmc-progress-bar")],Rt);let Ut=class extends at{constructor(){super(...arguments),this.volume=.5,this.muted=!1,this.disabled=!1,this.sliderColor="currentColor",this._dragging=!1}_getVolumeIcon(){return this.muted||0===this.volume?"mdi:volume-off":this.volume<.3?"mdi:volume-low":this.volume<.7?"mdi:volume-medium":"mdi:volume-high"}_handleVolumeChange(t){const e=t.target,o=parseFloat(e.value);this.dispatchEvent(new CustomEvent("volume-change",{detail:{volume:o},bubbles:!0,composed:!0}))}_handleMuteToggle(){this.dispatchEvent(new CustomEvent("mute-toggle",{bubbles:!0,composed:!0}))}render(){const t=Math.round(100*this.volume),e=100*this.volume+"%";return H`
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
    `}};Ut.styles=s`
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
  `,t([ut({type:Number})],Ut.prototype,"volume",void 0),t([ut({type:Boolean})],Ut.prototype,"muted",void 0),t([ut({type:Boolean})],Ut.prototype,"disabled",void 0),t([ut({type:String})],Ut.prototype,"sliderColor",void 0),t([pt()],Ut.prototype,"_dragging",void 0),Ut=t([ct("pmc-volume-slider")],Ut);let It=class extends at{constructor(){super(...arguments),this.rating=0,this.disabled=!1,this.showLove=!0,this.showBan=!0,this.showTired=!0,this.popupOnly=!1,this.externalOpen=!1,this._menuOpen=!1,this._menuTop=0,this._menuLeft=0,this._showAbove=!0,this._ignoreNextClickOutside=!1}connectedCallback(){super.connectedCallback(),this._handleClickOutside=this._handleClickOutside.bind(this),document.addEventListener("click",this._handleClickOutside)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._handleClickOutside)}_handleClickOutside(t){this._ignoreNextClickOutside?this._ignoreNextClickOutside=!1:this._menuOpen&&!t.composedPath().includes(this)&&(this._menuOpen=!1,this.dispatchEvent(new CustomEvent("popup-closed",{bubbles:!0,composed:!0})))}firstUpdated(){this.externalOpen&&!this._menuOpen&&this._openPopupExternal()}updated(t){t.has("externalOpen")&&this.externalOpen&&!this._menuOpen&&this._openPopupExternal(),t.has("anchorPosition")&&this._menuOpen&&this.anchorPosition&&this._updateMenuPosition()}_openPopupExternal(){this._ignoreNextClickOutside=!0,requestAnimationFrame(()=>{this._openPopup()})}_openPopup(){this.disabled||(this._updateMenuPosition(),this._menuOpen=!0)}_toggleMenu(t){t.stopPropagation(),this.disabled||(this._menuOpen||this._updateMenuPosition(),this._menuOpen=!this._menuOpen)}_updateMenuPosition(){const t=this.anchorPosition??this.getBoundingClientRect(),e=100,o="width"in t?t.width:t.right-t.left,i="height"in t?t.height:t.bottom-t.top;if(0===o&&0===i&&!this.anchorPosition)return this._menuLeft=window.innerWidth/2,this._menuTop=Math.max(8,(window.innerHeight-e)/2),void(this._showAbove=!1);const n=t.top;window.innerHeight,t.bottom,this._showAbove=n>=108,this._menuLeft=Math.max(88,Math.min(t.left+o/2,window.innerWidth-8-80)),this._showAbove?this._menuTop=Math.max(8,t.top-8-e):this._menuTop=Math.min(t.bottom+8,window.innerHeight-e-8)}_handleLove(){this.dispatchEvent(new CustomEvent("love-song",{bubbles:!0,composed:!0})),this._menuOpen=!1}_handleBan(){this.dispatchEvent(new CustomEvent("ban-song",{bubbles:!0,composed:!0})),this._menuOpen=!1}_handleTired(){this.dispatchEvent(new CustomEvent("tired-song",{bubbles:!0,composed:!0})),this._menuOpen=!1}_closeMenu(){this._menuOpen=!1}render(){const t=1===this.rating;return H`
      ${this._menuOpen?H`<div class="backdrop" @click=${this._closeMenu}></div>`:""}
      ${this.popupOnly?"":H`
            <button
              class="trigger-button ${t?"loved":""}"
              @click=${this._toggleMenu}
              ?disabled=${this.disabled}
              title="${t?"Loved":"Song actions"}"
            >
              <ha-icon icon="${t?"mdi:thumb-up":"mdi:thumbs-up-down-outline"}"></ha-icon>
            </button>
          `}
      <div 
        class="menu-popup ${this._menuOpen?"open":""}"
        style="left: ${this._menuLeft}px; top: ${this._menuTop}px;"
      >
        ${this.showLove?H`
          <button
            class="action-button love ${t?"active":""}"
            @click=${this._handleLove}
          >
            <ha-icon icon="mdi:thumb-up"></ha-icon>
            <span>Love Song</span>
          </button>
        `:""}
        ${this.showBan?H`
          <button class="action-button ban" @click=${this._handleBan}>
            <ha-icon icon="mdi:thumb-down"></ha-icon>
            <span>Ban Song</span>
          </button>
        `:""}
        ${this.showTired?H`
          <button class="action-button tired" @click=${this._handleTired}>
            <ha-icon icon="mdi:sleep"></ha-icon>
            <span>Snooze (1 month)</span>
          </button>
        `:""}
      </div>
    `}};It.styles=s`
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

    .trigger-button.loved {
      color: #4caf50;
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
      min-width: 160px;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.2s, visibility 0.2s;
      transform: translateX(-50%);
    }

    .menu-popup.open {
      opacity: 1;
      visibility: visible;
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

    .backdrop {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 99998;
    }
  `,t([ut({type:Number})],It.prototype,"rating",void 0),t([ut({type:Boolean})],It.prototype,"disabled",void 0),t([ut({type:Boolean})],It.prototype,"showLove",void 0),t([ut({type:Boolean})],It.prototype,"showBan",void 0),t([ut({type:Boolean})],It.prototype,"showTired",void 0),t([ut({type:Boolean})],It.prototype,"popupOnly",void 0),t([ut({type:Boolean})],It.prototype,"externalOpen",void 0),t([ut({type:Object})],It.prototype,"anchorPosition",void 0),t([pt()],It.prototype,"_menuOpen",void 0),t([pt()],It.prototype,"_menuTop",void 0),t([pt()],It.prototype,"_menuLeft",void 0),t([pt()],It.prototype,"_showAbove",void 0),It=t([ct("pmc-song-actions-menu")],It);let Vt=class extends at{constructor(){super(...arguments),this.stations=[],this.currentStationId="",this.currentStationName="",this.songStationName="",this.disabled=!1,this.popupOnly=!1,this.externalOpen=!1,this._menuOpen=!1,this._menuTop=0,this._menuLeft=0,this._showAbove=!0,this._ignoreNextClickOutside=!1}connectedCallback(){super.connectedCallback(),this._handleClickOutside=this._handleClickOutside.bind(this),document.addEventListener("click",this._handleClickOutside)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._handleClickOutside)}_handleClickOutside(t){this._ignoreNextClickOutside?this._ignoreNextClickOutside=!1:this._menuOpen&&!t.composedPath().includes(this)&&(this._menuOpen=!1,this.dispatchEvent(new CustomEvent("popup-closed",{bubbles:!0,composed:!0})))}firstUpdated(){this.externalOpen&&!this._menuOpen&&this._openPopupExternal()}updated(t){t.has("externalOpen")&&this.externalOpen&&!this._menuOpen&&this._openPopupExternal(),t.has("anchorPosition")&&this._menuOpen&&this.anchorPosition&&this._updateMenuPosition()}_openPopupExternal(){this._ignoreNextClickOutside=!0,requestAnimationFrame(()=>{this._openPopup()})}_openPopup(){!this.disabled&&this.stations.length>0&&(this._updateMenuPosition(),this._menuOpen=!0)}openPopup(){this._openPopup()}_toggleMenu(t){t.stopPropagation(),!this.disabled&&this.stations.length>0&&(this._menuOpen||this._updateMenuPosition(),this._menuOpen=!this._menuOpen)}_updateMenuPosition(){const t=this.anchorPosition??this.getBoundingClientRect(),e=Math.min(400,40*this.stations.length+8),o="width"in t?t.width:t.right-t.left,i="height"in t?t.height:t.bottom-t.top;if(0===o&&0===i&&!this.anchorPosition)return this._menuLeft=window.innerWidth/2,this._menuTop=Math.max(8,(window.innerHeight-e)/2),void(this._showAbove=!1);const n=t.top;window.innerHeight,t.bottom,this._showAbove=n>=e+8,this._menuLeft=Math.max(108,Math.min(t.left+o/2,window.innerWidth-8-100)),this._showAbove?this._menuTop=Math.max(8,t.top-8-e):this._menuTop=Math.min(t.bottom+8,window.innerHeight-e-8)}_handleStationClick(t){this.dispatchEvent(new CustomEvent("station-change",{detail:{stationId:t.id,stationName:t.name},bubbles:!0,composed:!0})),this._menuOpen=!1}_closeMenu(){this._menuOpen=!1,this.dispatchEvent(new CustomEvent("popup-closed",{bubbles:!0,composed:!0}))}_getCurrentStation(){return this.stations.find(t=>t.id===this.currentStationId)}render(){const t=this._getCurrentStation(),e=t?.isQuickMix??!1;let o=this.currentStationName||"Select Station";e&&this.songStationName&&(o=this.songStationName);const i=e?"mdi:shuffle":"mdi:radio";return H`
      ${this._menuOpen?H`<div class="backdrop" @click=${this._closeMenu}></div>`:F}
      ${this.popupOnly?F:H`
            <button
              class="trigger-button"
              @click=${this._toggleMenu}
              ?disabled=${this.disabled||0===this.stations.length}
              title="${o}"
            >
              <ha-icon icon="${i}"></ha-icon>
            </button>
          `}
      <div
        class="menu-popup ${this._menuOpen?"open":""}"
        style="left: ${this._menuLeft}px; top: ${this._menuTop}px;"
      >
        ${this.stations.map(t=>{const e=t.id===this.currentStationId,o=t.isQuickMix?"mdi:shuffle":"mdi:play-circle-outline",i=t.isQuickMixed&&!t.isQuickMix;return H`
            <button
              class="station-button ${e?"active":""}"
              @click=${()=>this._handleStationClick(t)}
            >
              <ha-icon icon="${o}"></ha-icon>
              <span class="station-text">${t.name}</span>
              ${i?H`<ha-icon class="quickmix-badge" icon="mdi:shuffle"></ha-icon>`:F}
            </button>
          `})}
      </div>
    `}};Vt.styles=s`
    :host {
      position: relative;
      display: inline-block;
    }

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
      min-width: 200px;
      max-width: 300px;
      max-height: 400px;
      overflow-y: auto;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.2s, visibility 0.2s;
      transform: translateX(-50%);
    }

    .menu-popup.open {
      opacity: 1;
      visibility: visible;
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

    .backdrop {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 99998;
    }
  `,t([ut({type:Array})],Vt.prototype,"stations",void 0),t([ut({type:String})],Vt.prototype,"currentStationId",void 0),t([ut({type:String})],Vt.prototype,"currentStationName",void 0),t([ut({type:String})],Vt.prototype,"songStationName",void 0),t([ut({type:Boolean})],Vt.prototype,"disabled",void 0),t([ut({type:Boolean})],Vt.prototype,"popupOnly",void 0),t([ut({type:Boolean})],Vt.prototype,"externalOpen",void 0),t([ut({type:Object})],Vt.prototype,"anchorPosition",void 0),t([pt()],Vt.prototype,"_menuOpen",void 0),t([pt()],Vt.prototype,"_menuTop",void 0),t([pt()],Vt.prototype,"_menuLeft",void 0),t([pt()],Vt.prototype,"_showAbove",void 0),Vt=t([ct("pmc-station-selector")],Vt);let Nt=class extends at{constructor(){super(...arguments),this.entityId="",this.showStationOption=!1,this.showRatingsOption=!1,this.showExplainOption=!1,this.isOn=!0,this.disabled=!1,this.buildTime="",this._menuOpen=!1,this._menuTop=0,this._menuLeft=0,this._portalContainer=null}connectedCallback(){super.connectedCallback(),this._handleClickOutside=this._handleClickOutside.bind(this),document.addEventListener("click",this._handleClickOutside)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._handleClickOutside),this._removePortal()}_createPortal(){this._portalContainer||(this._portalContainer=document.createElement("div"),this._portalContainer.className="pmc-overflow-menu-portal",document.body.appendChild(this._portalContainer))}_removePortal(){this._portalContainer&&(this._portalContainer.remove(),this._portalContainer=null)}_handleClickOutside(t){const e=t.composedPath(),o=e.includes(this),i=!!this._portalContainer&&e.includes(this._portalContainer);!this._menuOpen||o||i||(this._menuOpen=!1)}_toggleMenu(t){t.stopPropagation(),this.disabled||(this._menuOpen||(this._updateMenuPosition(),this._createPortal()),this._menuOpen=!this._menuOpen,this._updatePortalContent())}_updateMenuPosition(){const t=this.getBoundingClientRect();let e=2;this.showStationOption&&e++,this.showRatingsOption&&e++,this.showExplainOption&&e++;const o=44*e+(this.buildTime?40:0);let i=t.right-180,n=t.bottom+4;i=Math.max(8,Math.min(i,window.innerWidth-180-8)),n=Math.min(n,window.innerHeight-o-8),n+o>window.innerHeight-8&&(n=t.top-4-o,n=Math.max(8,n)),this._menuLeft=i,this._menuTop=n}_handleMoreInfo(){this.dispatchEvent(new CustomEvent("more-info",{bubbles:!0,composed:!0,detail:{entityId:this.entityId}})),this._menuOpen=!1}_getElementPosition(t){const e=t.getBoundingClientRect();return{left:e.left,top:e.top,bottom:e.bottom,right:e.right}}_handleSelectStation(t){const e=t.currentTarget;this.dispatchEvent(new CustomEvent("select-station",{bubbles:!0,composed:!0,detail:{anchorPosition:this._getElementPosition(e)}})),this._menuOpen=!1}_handleSelectRatings(t){const e=t.currentTarget;this.dispatchEvent(new CustomEvent("select-ratings",{bubbles:!0,composed:!0,detail:{anchorPosition:this._getElementPosition(e)}})),this._menuOpen=!1}_closeMenu(){this._menuOpen=!1,this._updatePortalContent()}_updatePortalContent(){if(!this._portalContainer)return;if(!this._menuOpen)return void(this._portalContainer.innerHTML="");let t="";this.showExplainOption&&(t+='\n        <button class="menu-item" data-action="explain-song">\n          <ha-icon icon="mdi:comment-question-outline"></ha-icon>\n          <span>Why this song?</span>\n        </button>\n      '),this.showRatingsOption&&(t+='\n        <button class="menu-item" data-action="select-ratings">\n          <ha-icon icon="mdi:thumbs-up-down-outline"></ha-icon>\n          <span>Song Ratings</span>\n        </button>\n      '),(this.showExplainOption||this.showRatingsOption)&&(t+='<div style="height: 1px; background: var(--divider-color, rgba(0, 0, 0, 0.1)); margin: 4px 0;"></div>'),this.showStationOption&&(t+='\n        <button class="menu-item" data-action="select-station">\n          <ha-icon icon="mdi:radio"></ha-icon>\n          <span>Select Station</span>\n        </button>\n      '),t+=`\n      <button class="menu-item" data-action="more-info">\n        <ha-icon icon="mdi:information-outline"></ha-icon>\n        <span>More Information</span>\n      </button>\n      <button class="menu-item" data-action="power-toggle">\n        <ha-icon icon="mdi:power"></ha-icon>\n        <span>${this.isOn?"Disconnect":"Connect"}</span>\n      </button>\n    `,this.buildTime&&(t+=`<div class="build-time">${this._formatBuildTime(this.buildTime)}</div>`),this._portalContainer.innerHTML=`\n      <style>\n      .pmc-portal-backdrop {\n        position: fixed;\n        top: 0;\n        left: 0;\n        right: 0;\n        bottom: 0;\n        z-index: 99998;\n      }\n      .pmc-portal-menu {\n        position: fixed;\n        background: var(--card-background-color, #fff);\n        border-radius: 12px;\n        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);\n        padding: 4px;\n        display: flex;\n        flex-direction: column;\n        gap: 2px;\n        z-index: 99999;\n        min-width: 180px;\n      }\n      .pmc-portal-menu .menu-item {\n        display: flex;\n        align-items: center;\n        gap: 12px;\n        padding: 10px 16px;\n        border: none;\n        border-radius: 8px;\n        background: transparent;\n        color: var(--primary-text-color);\n        cursor: pointer;\n        transition: all 0.2s;\n        text-align: left;\n        font-size: 14px;\n        width: 100%;\n      }\n      .pmc-portal-menu .menu-item:hover {\n        background: var(--secondary-background-color, rgba(0, 0, 0, 0.05));\n      }\n      .pmc-portal-menu .menu-item ha-icon {\n        --mdc-icon-size: 20px;\n      }\n      .pmc-portal-menu .build-time {\n        padding: 8px 16px;\n        font-size: 11px;\n        color: var(--secondary-text-color, rgba(0, 0, 0, 0.5));\n        text-align: center;\n        border-top: 1px solid var(--divider-color, rgba(0, 0, 0, 0.1));\n        margin-top: 4px;\n        pointer-events: none;\n        user-select: text;\n      }\n    </style>\n      <div class="pmc-portal-backdrop"></div>\n      <div class="pmc-portal-menu" style="left: ${this._menuLeft}px; top: ${this._menuTop}px;">\n        ${t}\n      </div>\n    `;const e=this._portalContainer.querySelector(".pmc-portal-backdrop");e?.addEventListener("click",()=>{this._menuOpen=!1,this._updatePortalContent()});this._portalContainer.querySelectorAll(".menu-item").forEach(t=>{t.addEventListener("click",e=>{const o=t.dataset.action;if("more-info"===o)this.dispatchEvent(new CustomEvent("more-info",{bubbles:!0,composed:!0,detail:{entityId:this.entityId}}));else if("power-toggle"===o)this.dispatchEvent(new CustomEvent("power-toggle",{bubbles:!0,composed:!0}));else if("select-station"===o){const e=t.getBoundingClientRect();this.dispatchEvent(new CustomEvent("select-station",{bubbles:!0,composed:!0,detail:{anchorPosition:{left:e.left,top:e.top,bottom:e.bottom,right:e.right}}}))}else if("select-ratings"===o){const e=t.getBoundingClientRect();this.dispatchEvent(new CustomEvent("select-ratings",{bubbles:!0,composed:!0,detail:{anchorPosition:{left:e.left,top:e.top,bottom:e.bottom,right:e.right}}}))}else"explain-song"===o&&this.dispatchEvent(new CustomEvent("explain-song",{bubbles:!0,composed:!0}));this._menuOpen=!1,this._updatePortalContent()})})}render(){return H`
      <button
        class="trigger-button"
        @click=${this._toggleMenu}
        ?disabled=${this.disabled}
        title="More options"
      >
        <ha-icon icon="mdi:dots-vertical"></ha-icon>
      </button>
    `}_formatBuildTime(t){try{const e=new Date(t),o=e.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"});return`Built: ${o} ${e.toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit",hour12:!0})}`}catch{return`Built: ${t}`}}};Nt.styles=s`
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
  `,t([ut({type:String})],Nt.prototype,"entityId",void 0),t([ut({type:Boolean})],Nt.prototype,"showStationOption",void 0),t([ut({type:Boolean})],Nt.prototype,"showRatingsOption",void 0),t([ut({type:Boolean})],Nt.prototype,"showExplainOption",void 0),t([ut({type:Boolean})],Nt.prototype,"isOn",void 0),t([ut({type:Boolean})],Nt.prototype,"disabled",void 0),t([ut({type:String})],Nt.prototype,"buildTime",void 0),t([pt()],Nt.prototype,"_menuOpen",void 0),t([pt()],Nt.prototype,"_menuTop",void 0),t([pt()],Nt.prototype,"_menuLeft",void 0),Nt=t([ct("pmc-overflow-menu")],Nt);const jt=function(t){try{return new Date(t).toLocaleString()}catch{return t}}("2026-01-05T03:59:26.028Z"),Ht=[{name:"entity",required:!0,selector:{entity:{domain:"media_player"}}}],qt=[{name:"mode",selector:{select:{mode:"dropdown",options:[{value:"default",label:"Default - Standard layout with artwork on right"},{value:"full",label:"Full - Full-cover artwork background"},{value:"minimal",label:"Minimal - Compact view with minimal controls"},{value:"tall",label:"Tall - Vertical layout with artwork on top"},{value:"custom",label:"Custom - Full control over all options"}]}}}],Ft=[{name:"name",selector:{text:{}}},{name:"volume_entity",selector:{entity:{domain:"media_player"}}}],Wt=[{name:"artwork",selector:{select:{mode:"dropdown",options:[{value:"default",label:"Compact (right side)"},{value:"full-cover",label:"Full Cover (background)"},{value:"tall",label:"Tall (artwork on top)"}]}}}],Gt=[{name:"stationDisplay",selector:{select:{mode:"dropdown",options:[{value:"hidden",label:"Hidden"},{value:"compact",label:"Compact (icon only)"},{value:"normal",label:"Normal (icon + station name)"}]}}}];let Qt=class extends at{constructor(){super(...arguments),this._activeTab="general"}setConfig(t){this._config=t}_updateConfig(t,e){if(!this._config)return;const o={...this._config};""===e||null==e?delete o[t]:o[t]=e,this._config=o,this._fireConfigChanged()}_fireConfigChanged(){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0}))}_valueChanged(t){const e=t.detail;e.value&&Object.entries(e.value).forEach(([t,e])=>{this._updateConfig(t,e)})}_handleAppearanceChange(t){const e=t.detail;if(!e.value||!this._config)return;const o={...this._config,...e.value},i=xt(o);o.mode=i,this._config=o,this._fireConfigChanged()}_handleControlsChange(t){const e=t.detail;if(!e.value||!this._config)return;const o={...this._config,...e.value},i=xt(o);o.mode=i,this._config=o,this._fireConfigChanged()}_setActiveTab(t){this._activeTab=t}_computeLabel(t){return{entity:"Entity",name:"Custom Name",volume_entity:"Volume Entity",artwork:"Artwork Style",stationDisplay:"Station Selector"}[t.name]||t.name}_computeHelper(t){return{entity:"Select any media player entity",name:"Leave empty to use entity name",volume_entity:"Override volume control to a different media player (e.g., Sonos speaker)"}[t.name]||""}_supportsAnyRating(){if(!this.hass||!this._config?.entity)return!1;const t=this.hass.states[this._config.entity],e=t?.attributes?.supported_actions||[];return e.includes("love_song")||e.includes("ban_song")||e.includes("tired_of_song")}_renderGeneralTab(){return H`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Ht}
        .computeLabel=${this._computeLabel}
        .computeHelper=${this._computeHelper}
        @value-changed=${this._valueChanged}
      ></ha-form>

      <div class="section-title">Mode</div>
      <ha-form
        .hass=${this.hass}
        .data=${{mode:this._config?.mode||"default"}}
        .schema=${qt}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `}_renderAppearanceTab(){const t=wt(this._config?.mode||"default"),e={...this._config,artwork:this._config?.artwork??t.artwork},o=this._config?.stationDisplay??t.stationDisplay,i=this._supportsStations();return H`
      <ha-form
        .hass=${this.hass}
        .data=${e}
        .schema=${Wt}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._handleAppearanceChange}
      ></ha-form>

      <div class="section-title">Station Selector</div>
      ${i?H`
            <ha-form
              .hass=${this.hass}
              .data=${{stationDisplay:o}}
              .schema=${Gt}
              .computeLabel=${this._computeLabel}
              @value-changed=${this._handleAppearanceChange}
            ></ha-form>
          `:H`<p class="helper-text">Station selector requires a Pianobar media player entity</p>`}
    `}_handleCheckboxChange(t,e){const o=e.target,i={...this._config,[t]:o.checked},n=xt(i);i.mode=n,this._config=i,this._fireConfigChanged()}_renderCheckbox(t,e,o,i=!1,n=!1){return H`
      <div class="checkbox-row ${i?"indent":""} ${n?"disabled":""}">
        <ha-checkbox
          .checked=${o}
          .disabled=${n}
          @change=${e=>this._handleCheckboxChange(t,e)}
        ></ha-checkbox>
        <span 
          class="checkbox-label"
          @click=${()=>{if(n)return;const e=this.shadowRoot?.querySelector(`ha-checkbox[data-key="${t}"]`);e&&e.click()}}
        >${e}</span>
      </div>
    `}_supportsStations(){if(!this.hass||!this._config?.entity)return!1;const t=this.hass.states[this._config.entity],e=t?.attributes?.stations;return Array.isArray(e)&&e.length>0}_renderControlsTab(){const t=wt(this._config?.mode||"default"),e=this._config?.showPlaybackControls??t.showPlaybackControls,o=this._config?.showPowerButton??t.showPowerButton,i=this._config?.showSongActions??t.showSongActions,n=this._config?.showProgressBar??t.showProgressBar,r=this._config?.showProgressTime??t.showProgressTime,s=this._config?.showVolumeControl??t.showVolumeControl,a=this._config?.showDetails??t.showDetails,l=this._config?.showTitle??t.showTitle,c=this._config?.showArtist??t.showArtist,h=this._config?.showAlbum??t.showAlbum,d=this._config?.reserveDetailsSpace??t.reserveDetailsSpace,u=this._supportsAnyRating();return H`
      ${this._renderCheckbox("showPlaybackControls","Show playback controls",e)}
      ${this._renderCheckbox("showPowerButton","Show power button",o,!0,!e)}
      ${this._renderCheckbox("showSongActions","Show song actions (thumbs)",!!u&&i,!0,!e||!u)}

      ${this._renderCheckbox("showProgressBar","Show progress bar",n)}
      ${this._renderCheckbox("showProgressTime","Show progress time",r,!0,!n)}

      ${this._renderCheckbox("showVolumeControl","Show volume control",s)}

      ${this._renderCheckbox("showDetails","Show details",a)}
      ${this._renderCheckbox("showTitle","Show title",l,!0,!a)}
      ${this._renderCheckbox("showArtist","Show artist",c,!0,!a)}
      ${this._renderCheckbox("showAlbum","Show album",h,!0,!a)}
      ${this._renderCheckbox("reserveDetailsSpace","Reserve space on card",d,!0,!a)}
    `}_renderAdvancedTab(){return H`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Ft}
        .computeLabel=${this._computeLabel}
        .computeHelper=${this._computeHelper}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `}render(){if(!this.hass||!this._config)return H``;return H`
      <div class="card-config">
        <div class="tabs">
          ${[{id:"general",label:"General"},{id:"appearance",label:"Appearance"},{id:"controls",label:"Controls"},{id:"advanced",label:"Advanced"}].map(t=>H`
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
          Build: ${jt}
        </div>
      </div>
    `}};Qt.styles=s`
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
  `,t([ut({attribute:!1})],Qt.prototype,"hass",void 0),t([ut({attribute:!1})],Qt.prototype,"lovelace",void 0),t([pt()],Qt.prototype,"_config",void 0),t([pt()],Qt.prototype,"_activeTab",void 0),Qt=t([ct("pianobar-card-editor")],Qt);console.info("%c PIANOBAR-MEDIA-PLAYER-CARD %c 1.0.0 ","color: white; background: #764ba2; font-weight: bold;","color: #764ba2; background: white; font-weight: bold;"),window.customCards=window.customCards||[],window.customCards.push({type:"pianobar-media-player-card",name:"Pianobar Media Player Card",description:"A custom media player card for Pianobar with thumbs up/down and volume override",preview:!0});let Xt=class extends at{constructor(){super(...arguments),this._cardHeight=0,this._stationPopupOpen=!1,this._ratingsPopupOpen=!1,this._tallArtworkError=!1}static getConfigElement(){return document.createElement("pianobar-card-editor")}static getStubConfig(){return{type:"custom:pianobar-media-player-card",entity:"",mode:"default"}}setConfig(t){if(!t.entity)throw new Error("Please define an entity");this._config=t,this._resolvedConfig=function(t){const e=t.mode||"default",o=yt[e];return"custom"===e?{entity:t.entity,mode:e,artwork:t.artwork??o.artwork,showDetails:t.showDetails??o.showDetails,showTitle:t.showTitle??o.showTitle,showArtist:t.showArtist??o.showArtist,showAlbum:t.showAlbum??o.showAlbum,reserveDetailsSpace:t.reserveDetailsSpace??o.reserveDetailsSpace,showVolumeControl:t.showVolumeControl??o.showVolumeControl,showSongActions:t.showSongActions??o.showSongActions,showProgressBar:t.showProgressBar??o.showProgressBar,showProgressTime:t.showProgressTime??o.showProgressTime,showPlaybackControls:t.showPlaybackControls??o.showPlaybackControls,showPowerButton:t.showPowerButton??o.showPowerButton,stationDisplay:t.stationDisplay??o.stationDisplay,volume_entity:t.volume_entity,name:t.name}:{entity:t.entity,mode:e,artwork:o.artwork,showDetails:o.showDetails,showTitle:o.showTitle,showArtist:o.showArtist,showAlbum:o.showAlbum,reserveDetailsSpace:o.reserveDetailsSpace,showVolumeControl:o.showVolumeControl,showSongActions:o.showSongActions,showProgressBar:o.showProgressBar,showProgressTime:t.showProgressTime??o.showProgressTime,showPlaybackControls:o.showPlaybackControls,showPowerButton:t.showPowerButton??o.showPowerButton,stationDisplay:t.stationDisplay??o.stationDisplay,volume_entity:t.volume_entity,name:t.name}}(t)}disconnectedCallback(){super.disconnectedCallback(),this._resizeObserver?.disconnect()}firstUpdated(){this._setupResizeObserver()}_setupResizeObserver(){this._resizeObserver=new ResizeObserver(t=>{for(const e of t){const t=e.contentRect.height;t!==this._cardHeight&&(this._cardHeight=t)}});const t=this.shadowRoot?.querySelector("ha-card");t?this._resizeObserver.observe(t):this._resizeObserver.observe(this)}getCardSize(){return"minimal"===this._resolvedConfig?.mode?2:"full-cover"===this._resolvedConfig?.artwork?4:3}updated(t){if(super.updated(t),this._resolvedConfig&&(this.setAttribute("artwork-mode",this._resolvedConfig.artwork),this.setAttribute("mode",this._resolvedConfig.mode)),t.has("hass")&&this.hass&&this._config?.entity){const t=this.hass.states[this._config.entity];if(t){const e=t.attributes.entity_picture;e&&e!==this._lastImageUrl&&(this._lastImageUrl=e,this._tallArtworkError=!1,this._updateColors(e))}}}async _updateColors(t){const e="full-cover"===this._resolvedConfig?.artwork?await async function(t){const e=await Mt(t);if(!t)return e;const o=`regional:${t}`,i=At.get(o);if(i)return i;try{const i=new Image;i.crossOrigin="anonymous",await new Promise((e,o)=>{i.onload=()=>e(),i.onerror=()=>o(new Error("Failed to load image")),i.src=t});const n=document.createElement("canvas"),r=n.getContext("2d");if(!r)return e;const s=100,a=Math.min(s/i.width,s/i.height);n.width=Math.floor(i.width*a),n.height=Math.floor(i.height*a),r.drawImage(i,0,0,n.width,n.height);const l=r.getImageData(0,0,n.width,n.height),c=Lt(l,Tt,n.width,n.height),h=Lt(l,Dt,n.width,n.height),d=zt(c,.3),u=zt(h,.7),p={...e,metadataForeground:d,controlsForeground:u};return At.set(o,p),p}catch(t){return console.error("Error extracting regional colors:",t),e}}(t):await Mt(t);this._extractedColors=e}_getEntity(){if(this.hass&&this._config?.entity)return this.hass.states[this._config.entity]}_getVolumeEntity(){if(!this.hass)return;const t=this._resolvedConfig?.volume_entity||this._config?.entity;return t?this.hass.states[t]:void 0}_isPlaying(t){return"playing"===t.state}_isUnavailable(t){return"unavailable"===t.state||"unknown"===t.state}_getSupportedActions(){const t=this._getEntity();return t?.attributes?.supported_actions||[]}_supportsLove(){return this._getSupportedActions().includes("love_song")}_supportsBan(){return this._getSupportedActions().includes("ban_song")}_supportsTired(){return this._getSupportedActions().includes("tired_of_song")}_supportsAnyRating(t){const e=t.attributes.supported_actions;return!(!e||!Array.isArray(e))&&(e.includes("love_song")||e.includes("ban_song")||e.includes("tired_of_song"))}async _handlePlayPause(){const t=this._getEntity();t&&this.hass&&await this.hass.callService("media_player","media_play_pause",void 0,{entity_id:t.entity_id})}async _handleNextTrack(){const t=this._getEntity();t&&this.hass&&await this.hass.callService("media_player","media_next_track",void 0,{entity_id:t.entity_id})}async _handlePowerToggle(){const t=this._getEntity();if(!t||!this.hass)return;const e="off"!==t.state&&"unavailable"!==t.state?"turn_off":"turn_on";await this.hass.callService("media_player",e,void 0,{entity_id:t.entity_id})}async _handleVolumeChange(t){const e=this._getVolumeEntity();if(!e||!this.hass)return;const o=t.detail.volume;await this.hass.callService("media_player","volume_set",{volume_level:o},{entity_id:e.entity_id})}async _handleMuteToggle(){const t=this._getVolumeEntity();t&&this.hass&&await this.hass.callService("media_player","volume_mute",{is_volume_muted:!t.attributes.is_volume_muted},{entity_id:t.entity_id})}async _handleLoveSong(){this.hass&&await this.hass.callService("pianobar","love_song",{})}async _handleBanSong(){this.hass&&await this.hass.callService("pianobar","ban_song",{})}async _handleTiredSong(){this.hass&&await this.hass.callService("pianobar","tired_of_song",{})}async _handleStationChange(t){const e=this._getEntity();if(!e||!this.hass)return;const{stationName:o}=t.detail;await this.hass.callService("media_player","select_source",{source:o},{entity_id:e.entity_id})}_renderArtwork(t){const e=t.attributes.media_image_url||t.attributes.entity_picture;return e?H`<img class="artwork" src="${e}" alt="Album artwork" />`:H`
      <div class="artwork-placeholder">
        <ha-icon icon="mdi:music"></ha-icon>
      </div>
    `}_renderMediaInfo(t){if(!(this._resolvedConfig?.showDetails??!0))return F;const e=t.attributes.media_title||"No media",o=t.attributes.media_artist||"",i=t.attributes.media_album_name||"",n=this._resolvedConfig?.showTitle??!0,r=this._resolvedConfig?.showArtist??!0,s=this._resolvedConfig?.showAlbum??!0,a="tall"===this._resolvedConfig?.artwork,l="normal"===(this._resolvedConfig?.stationDisplay??"hidden")&&!a,c=t.attributes.stations||[],h=t.attributes.source||"",d=c.find(t=>t.name===h),u=d?.isQuickMix??!1,p=t.attributes.song_station_name||"",m=u&&p?p:h,g=u?"mdi:shuffle":"mdi:radio";return n||r||s||l?H`
      <div class="media-info">
        ${n?H`<p class="title">${e}</p>`:F}
        ${r&&o?H`<p class="artist">${o}</p>`:F}
        ${s&&i?H`<p class="album">${i}</p>`:F}
        ${l&&m?H`
          <p class="station-info clickable" @click=${this._handleOpenStationPopup}>
            <ha-icon icon="${g}"></ha-icon>
            <span>${m}</span>
          </p>
        `:F}
      </div>
    `:F}_renderProgressBar(t){if(!this._resolvedConfig?.showProgressBar)return F;const e=t.attributes.media_duration||0,o=t.attributes.media_position||0,i=t.attributes.media_position_updated_at||"",n=t.attributes.entity_picture,r="tall"===this._resolvedConfig?.artwork,s=!!n&&!r,a="full-cover"===this._resolvedConfig?.artwork?this._extractedColors?.controlsForeground||this._extractedColors?.foreground||"var(--pmc-primary-text-color)":this._extractedColors?.foreground||"var(--pmc-primary-text-color)",l=this._resolvedConfig?.showProgressTime??!1,c=this._isPlaying(t);return H`
      <pmc-progress-bar
        .duration=${e}
        .position=${o}
        .positionUpdatedAt=${i}
        .showTime=${l}
        .isPlaying=${c}
        style="color: ${s?a:"inherit"}"
      ></pmc-progress-bar>
    `}_renderVolumeControl(){if(!this._resolvedConfig?.showVolumeControl)return F;const t=this._getVolumeEntity();if(!t)return F;const e=t.attributes.volume_level??.5,o=t.attributes.is_volume_muted??!1,i=this._isUnavailable(t),n=this._getEntity(),r="tall"===this._resolvedConfig?.artwork,s="full-cover"===this._resolvedConfig?.artwork,a=!!n?.attributes.entity_picture&&!r,l=s?this._extractedColors?.controlsForeground||this._extractedColors?.foreground||"var(--pmc-primary-text-color)":this._extractedColors?.foreground||"var(--pmc-primary-text-color)";return H`
      <pmc-volume-slider
        .volume=${e}
        .muted=${o}
        .disabled=${i}
        .sliderColor=${a?l:"var(--pmc-primary-text-color)"}
        style="color: ${a?l:"inherit"}"
        @volume-change=${this._handleVolumeChange}
        @mute-toggle=${this._handleMuteToggle}
      ></pmc-volume-slider>
    `}_renderPlaybackControls(t){if(!this._resolvedConfig?.showPlaybackControls)return F;const e=this._isPlaying(t),o=this._isUnavailable(t),i=this._resolvedConfig?.showPowerButton??!1,n="off"!==t.state&&"unavailable"!==t.state;return H`
      <pmc-playback-controls
        .playing=${e}
        .disabled=${o}
        .showPower=${i}
        .isOn=${n}
        @play-pause=${this._handlePlayPause}
        @next-track=${this._handleNextTrack}
        @power-toggle=${this._handlePowerToggle}
      ></pmc-playback-controls>
    `}_renderSongActions(t){if(!this._resolvedConfig?.showSongActions)return F;if(!!!t.attributes.media_title)return F;const e=this._supportsLove(),o=this._supportsBan(),i=this._supportsTired();if(!e&&!o&&!i)return F;const n=t.attributes.rating||0,r=this._isUnavailable(t);return H`
      <pmc-song-actions-menu
        .rating=${n}
        .disabled=${r}
        .showLove=${e}
        .showBan=${o}
        .showTired=${i}
        @love-song=${this._handleLoveSong}
        @ban-song=${this._handleBanSong}
        @tired-song=${this._handleTiredSong}
      ></pmc-song-actions-menu>
    `}_renderStationSelector(t){if("compact"!==(this._resolvedConfig?.stationDisplay??"hidden"))return F;const e=t.attributes.stations||[];if(0===e.length)return F;const o=t.attributes.source||"",i=e.find(t=>t.name===o),n=i?.id||"",r=t.attributes.song_station_name||"",s=this._isUnavailable(t);return H`
      <pmc-station-selector
        .stations=${e}
        .currentStationId=${n}
        .currentStationName=${o}
        .songStationName=${r}
        .disabled=${s}
        @station-change=${this._handleStationChange}
      ></pmc-station-selector>
    `}_renderOverflowMenu(t){const e=(t.attributes.stations||[]).length>0,o=this._supportsAnyRating(t),i=!!t.attributes.media_title,n="off"!==t.state&&"unavailable"!==t.state;return H`
      <pmc-overflow-menu
        class="overflow-menu"
        .entityId=${t.entity_id}
        .showStationOption=${e}
        .showRatingsOption=${o}
        .showExplainOption=${i}
        .isOn=${n}
        .disabled=${this._isUnavailable(t)}
        .buildTime=${"2026-01-05T03:59:26.028Z"}
        @more-info=${this._handleMoreInfo}
        @power-toggle=${this._handlePowerToggle}
        @select-station=${this._handleOpenStationPopup}
        @select-ratings=${this._handleOpenRatingsPopup}
        @explain-song=${this._handleExplainSong}
      ></pmc-overflow-menu>
    `}_handleMoreInfo(t){const e=new Event("hass-more-info",{composed:!0});e.detail={entityId:t.detail?.entityId},this.dispatchEvent(e)}async _handleExplainSong(){const t=this._getEntity();if(t&&this.hass)try{const e=await this.hass.callService("pianobar","explain_song",{},{entity_id:t.entity_id},!0),o=new CustomEvent("hass-notification",{detail:{message:e?.explanation||"No explanation available",duration:8e3},bubbles:!0,composed:!0});this.dispatchEvent(o)}catch(t){console.error("Error explaining song:",t);const e=new CustomEvent("hass-notification",{detail:{message:"Failed to get song explanation",duration:3e3},bubbles:!0,composed:!0});this.dispatchEvent(e)}}_handleOpenStationPopup(t){this._popupAnchorPosition=t.detail?.anchorPosition,this._stationPopupOpen=!0}_handleStationPopupClosed(){this._stationPopupOpen=!1,this._popupAnchorPosition=void 0}_handleOpenRatingsPopup(t){this._popupAnchorPosition=t.detail?.anchorPosition,this._ratingsPopupOpen=!0}_handleRatingsPopupClosed(){this._ratingsPopupOpen=!1,this._popupAnchorPosition=void 0}_renderStationPopup(t){if(!("normal"===(this._resolvedConfig?.stationDisplay??"hidden")||this._stationPopupOpen))return F;const e=t.attributes.stations||[];if(0===e.length)return F;const o=t.attributes.source||"",i=e.find(t=>t.name===o),n=i?.id||"",r=t.attributes.song_station_name||"",s=this._isUnavailable(t);return H`
      <pmc-station-selector
        .stations=${e}
        .currentStationId=${n}
        .currentStationName=${o}
        .songStationName=${r}
        .disabled=${s}
        .popupOnly=${!0}
        .externalOpen=${this._stationPopupOpen}
        .anchorPosition=${this._popupAnchorPosition}
        @station-change=${this._handleStationChange}
        @popup-closed=${this._handleStationPopupClosed}
      ></pmc-station-selector>
    `}_renderRatingsPopup(t){if(!this._ratingsPopupOpen)return F;const e=this._supportsLove(),o=this._supportsBan(),i=this._supportsTired();if(!e&&!o&&!i)return F;const n=t.attributes.rating||0,r=this._isUnavailable(t);return H`
      <pmc-song-actions-menu
        .rating=${n}
        .disabled=${r}
        .showLove=${e}
        .showBan=${o}
        .showTired=${i}
        .popupOnly=${!0}
        .externalOpen=${this._ratingsPopupOpen}
        .anchorPosition=${this._popupAnchorPosition}
        @love-song=${this._handleLoveSong}
        @ban-song=${this._handleBanSong}
        @tired-song=${this._handleTiredSong}
        @popup-closed=${this._handleRatingsPopupClosed}
      ></pmc-song-actions-menu>
    `}_renderStationPill(t){if("hidden"===(this._resolvedConfig?.stationDisplay??"hidden"))return F;const e=t.attributes.stations||[];if(0===e.length)return F;const o=t.attributes.source||"",i=e.find(t=>t.name===o),n=i?.isQuickMix??!1,r=t.attributes.song_station_name||"",s=n&&r?r:o,a=n?"mdi:shuffle":"mdi:radio";return s?H`
      <div class="station-pill" @click=${this._handleOpenStationPopup}>
        <ha-icon icon="${a}"></ha-icon>
        <span>${s}</span>
      </div>
    `:F}_handleTallArtworkError(){this._tallArtworkError=!0}_renderTallMode(t){const e=this._isUnavailable(t),o=t.attributes.entity_picture,i=!!o&&"string"==typeof o&&o.length>0&&!this._tallArtworkError,n=this._resolvedConfig?.showProgressBar;return H`
      ${this._renderOverflowMenu(t)}

      ${i?H`
            <div class="artwork-container">
              <img 
                class="artwork-image" 
                src="${o}" 
                alt=""
                @error=${this._handleTallArtworkError}
              />
            </div>
          `:H`
            <div class="artwork-placeholder-tall">
              <ha-icon icon="mdi:music"></ha-icon>
            </div>
          `}

      <div class="card-content ${e?"unavailable":""}">
        ${this._renderMediaInfo(t)}
      </div>

      ${n?this._renderProgressBar(t):F}

      ${this._resolvedConfig?.showPlaybackControls||this._resolvedConfig?.showVolumeControl||this._resolvedConfig?.showSongActions?H`
            <div class="controls-section">
              ${this._renderVolumeControl()}
              <div class="controls-row">
                ${this._renderSongActions(t)}
                ${this._renderPlaybackControls(t)}
              </div>
              ${this._renderStationPill(t)}
            </div>
          `:F}

      ${this._renderStationPopup(t)}
      ${this._renderRatingsPopup(t)}
    `}render(){if(!this._config||!this.hass)return H``;const t=this._getEntity();if(!t)return H`
        <ha-card>
          <div class="unavailable-text">
            Entity not found: ${this._config.entity}
          </div>
        </ha-card>
      `;const e="tall"===this._resolvedConfig?.artwork,o=this._isUnavailable(t),i="full-cover"===this._resolvedConfig?.artwork,n=t.attributes.entity_picture,r=!!n,s=this._extractedColors?.background||"var(--pmc-card-background)",a=this._extractedColors?.foreground||"var(--pmc-primary-text-color)",l=i&&this._extractedColors?.metadataForeground||a,c=i&&this._extractedColors?.controlsForeground||a,h=_t({"--pmc-extracted-bg":s,"--pmc-extracted-fg":a,backgroundColor:!e&&r?s:void 0}),d=_t({background:`linear-gradient(to left, transparent 0, ${s} ${this._cardHeight}px, ${s} 100%)`}),u=this._resolvedConfig?.showProgressBar,p=this._resolvedConfig?.showProgressTime,m=[r&&!e?"has-artwork":"",u?"has-progress":"",u&&p?"show-time":"",this._resolvedConfig?.reserveDetailsSpace??!0?"":"no-reserve"].filter(Boolean).join(" ");return e?H`
        <ha-card class="${m}">
          ${this._renderTallMode(t)}
        </ha-card>
      `:H`
      <ha-card style=${h} class="${m}">
        ${r&&!i?H`
              <div class="artwork-container">
                <img class="artwork-image" src="${n}" alt="" />
              </div>
              <div class="artwork-gradient" style=${d}></div>
            `:F}
        
        ${i&&n?H`
              <div class="fullcover-background" style="background-image: url('${n}')"></div>
              <div class="fullcover-overlay"></div>
            `:F}

        <div class="card-content ${o?"unavailable":""}" style="color: ${r?l:"inherit"}">
          ${this._renderMediaInfo(t)}
          ${this._renderOverflowMenu(t)}
        </div>

        ${this._resolvedConfig?.showPlaybackControls||this._resolvedConfig?.showVolumeControl||this._resolvedConfig?.showSongActions||"compact"===this._resolvedConfig?.stationDisplay?H`
              <div class="controls-section" style="color: ${r?c:"inherit"}">
                <div class="controls-row">
                  ${this._renderPlaybackControls(t)}
                  <div class="controls-spacer"></div>
                  ${this._renderSongActions(t)}
                  ${this._renderStationSelector(t)}
                </div>
                ${this._renderVolumeControl()}
              </div>
            `:F}

        ${u?this._renderProgressBar(t):F}

        ${this._renderStationPopup(t)}
        ${this._renderRatingsPopup(t)}
      </ha-card>
    `}};Xt.styles=vt,t([ut({attribute:!1})],Xt.prototype,"hass",void 0),t([pt()],Xt.prototype,"_config",void 0),t([pt()],Xt.prototype,"_resolvedConfig",void 0),t([pt()],Xt.prototype,"_extractedColors",void 0),t([pt()],Xt.prototype,"_lastImageUrl",void 0),t([pt()],Xt.prototype,"_cardHeight",void 0),t([pt()],Xt.prototype,"_stationPopupOpen",void 0),t([pt()],Xt.prototype,"_ratingsPopupOpen",void 0),t([pt()],Xt.prototype,"_popupAnchorPosition",void 0),t([pt()],Xt.prototype,"_tallArtworkError",void 0),Xt=t([ct("pianobar-media-player-card")],Xt);export{Xt as PianobarMediaPlayerCard};
