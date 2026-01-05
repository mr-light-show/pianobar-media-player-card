function t(t,e,o,i){var n,s=arguments.length,r=s<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,o,i);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(r=(s<3?n(r):s>3?n(e,o,r):n(e,o))||r);return s>3&&r&&Object.defineProperty(e,o,r),r}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,o=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),n=new WeakMap;let s=class{constructor(t,e,o){if(this._$cssResult$=!0,o!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(o&&void 0===t){const o=void 0!==e&&1===e.length;o&&(t=n.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),o&&n.set(e,t))}return t}toString(){return this.cssText}};const r=(t,...e)=>{const o=1===t.length?t[0]:e.reduce((e,o,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+t[i+1],t[0]);return new s(o,t,i)},a=o?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const o of t.cssRules)e+=o.cssText;return(t=>new s("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:l,defineProperty:c,getOwnPropertyDescriptor:d,getOwnPropertyNames:p,getOwnPropertySymbols:h,getPrototypeOf:u}=Object,m=globalThis,g=m.trustedTypes,b=g?g.emptyScript:"",f=m.reactiveElementPolyfillSupport,_=(t,e)=>t,v={toAttribute(t,e){switch(e){case Boolean:t=t?b:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let o=t;switch(e){case Boolean:o=null!==t;break;case Number:o=null===t?null:Number(t);break;case Object:case Array:try{o=JSON.parse(t)}catch(t){o=null}}return o}},y=(t,e)=>!l(t,e),x={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:y};Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=x){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const o=Symbol(),i=this.getPropertyDescriptor(t,o,e);void 0!==i&&c(this.prototype,t,i)}}static getPropertyDescriptor(t,e,o){const{get:i,set:n}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const s=i?.call(this);n?.call(this,e),this.requestUpdate(t,s,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??x}static _$Ei(){if(this.hasOwnProperty(_("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(_("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(_("properties"))){const t=this.properties,e=[...p(t),...h(t)];for(const o of e)this.createProperty(o,t[o])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,o]of e)this.elementProperties.set(t,o)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const o=this._$Eu(t,e);void 0!==o&&this._$Eh.set(o,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const o=new Set(t.flat(1/0).reverse());for(const t of o)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const o=e.attribute;return!1===o?void 0:"string"==typeof o?o:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const o of e.keys())this.hasOwnProperty(o)&&(t.set(o,this[o]),delete this[o]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{if(o)t.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const o of i){const i=document.createElement("style"),n=e.litNonce;void 0!==n&&i.setAttribute("nonce",n),i.textContent=o.cssText,t.appendChild(i)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,o){this._$AK(t,o)}_$ET(t,e){const o=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,o);if(void 0!==i&&!0===o.reflect){const n=(void 0!==o.converter?.toAttribute?o.converter:v).toAttribute(e,o.type);this._$Em=t,null==n?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(t,e){const o=this.constructor,i=o._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=o.getPropertyOptions(i),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:v;this._$Em=i;const s=n.fromAttribute(e,t.type);this[i]=s??this._$Ej?.get(i)??s,this._$Em=null}}requestUpdate(t,e,o,i=!1,n){if(void 0!==t){const s=this.constructor;if(!1===i&&(n=this[t]),o??=s.getPropertyOptions(t),!((o.hasChanged??y)(n,e)||o.useDefault&&o.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,o))))return;this.C(t,e,o)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:o,reflect:i,wrapped:n},s){o&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,s??e??this[t]),!0!==n||void 0!==s)||(this._$AL.has(t)||(this.hasUpdated||o||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,o]of t){const{wrapped:t}=o,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,o,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[_("elementProperties")]=new Map,w[_("finalized")]=new Map,f?.({ReactiveElement:w}),(m.reactiveElementVersions??=[]).push("2.1.2");const k=globalThis,$=t=>t,C=k.trustedTypes,P=C?C.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",O=`lit$${Math.random().toFixed(9).slice(2)}$`,M="?"+O,A=`<${M}>`,E=document,T=()=>E.createComment(""),D=t=>null===t||"object"!=typeof t&&"function"!=typeof t,L=Array.isArray,z="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,I=/-->/g,B=/>/g,R=RegExp(`>|${z}(?:([^\\s"'>=/]+)(${z}*=${z}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),U=/'/g,j=/"/g,V=/^(?:script|style|textarea|title)$/i,H=(t=>(e,...o)=>({_$litType$:t,strings:e,values:o}))(1),q=Symbol.for("lit-noChange"),F=Symbol.for("lit-nothing"),Q=new WeakMap,W=E.createTreeWalker(E,129);function G(t,e){if(!L(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==P?P.createHTML(e):e}const X=(t,e)=>{const o=t.length-1,i=[];let n,s=2===e?"<svg>":3===e?"<math>":"",r=N;for(let e=0;e<o;e++){const o=t[e];let a,l,c=-1,d=0;for(;d<o.length&&(r.lastIndex=d,l=r.exec(o),null!==l);)d=r.lastIndex,r===N?"!--"===l[1]?r=I:void 0!==l[1]?r=B:void 0!==l[2]?(V.test(l[2])&&(n=RegExp("</"+l[2],"g")),r=R):void 0!==l[3]&&(r=R):r===R?">"===l[0]?(r=n??N,c=-1):void 0===l[1]?c=-2:(c=r.lastIndex-l[2].length,a=l[1],r=void 0===l[3]?R:'"'===l[3]?j:U):r===j||r===U?r=R:r===I||r===B?r=N:(r=R,n=void 0);const p=r===R&&t[e+1].startsWith("/>")?" ":"";s+=r===N?o+A:c>=0?(i.push(a),o.slice(0,c)+S+o.slice(c)+O+p):o+O+(-2===c?e:p)}return[G(t,s+(t[o]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class Y{constructor({strings:t,_$litType$:e},o){let i;this.parts=[];let n=0,s=0;const r=t.length-1,a=this.parts,[l,c]=X(t,e);if(this.el=Y.createElement(l,o),W.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=W.nextNode())&&a.length<r;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(S)){const e=c[s++],o=i.getAttribute(t).split(O),r=/([.?@])?(.*)/.exec(e);a.push({type:1,index:n,name:r[2],strings:o,ctor:"."===r[1]?et:"?"===r[1]?ot:"@"===r[1]?it:tt}),i.removeAttribute(t)}else t.startsWith(O)&&(a.push({type:6,index:n}),i.removeAttribute(t));if(V.test(i.tagName)){const t=i.textContent.split(O),e=t.length-1;if(e>0){i.textContent=C?C.emptyScript:"";for(let o=0;o<e;o++)i.append(t[o],T()),W.nextNode(),a.push({type:2,index:++n});i.append(t[e],T())}}}else if(8===i.nodeType)if(i.data===M)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=i.data.indexOf(O,t+1));)a.push({type:7,index:n}),t+=O.length-1}n++}}static createElement(t,e){const o=E.createElement("template");return o.innerHTML=t,o}}function Z(t,e,o=t,i){if(e===q)return e;let n=void 0!==i?o._$Co?.[i]:o._$Cl;const s=D(e)?void 0:e._$litDirective$;return n?.constructor!==s&&(n?._$AO?.(!1),void 0===s?n=void 0:(n=new s(t),n._$AT(t,o,i)),void 0!==i?(o._$Co??=[])[i]=n:o._$Cl=n),void 0!==n&&(e=Z(t,n._$AS(t,e.values),n,i)),e}class J{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:o}=this._$AD,i=(t?.creationScope??E).importNode(e,!0);W.currentNode=i;let n=W.nextNode(),s=0,r=0,a=o[0];for(;void 0!==a;){if(s===a.index){let e;2===a.type?e=new K(n,n.nextSibling,this,t):1===a.type?e=new a.ctor(n,a.name,a.strings,this,t):6===a.type&&(e=new nt(n,this,t)),this._$AV.push(e),a=o[++r]}s!==a?.index&&(n=W.nextNode(),s++)}return W.currentNode=E,i}p(t){let e=0;for(const o of this._$AV)void 0!==o&&(void 0!==o.strings?(o._$AI(t,o,e),e+=o.strings.length-2):o._$AI(t[e])),e++}}class K{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,o,i){this.type=2,this._$AH=F,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=o,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Z(this,t,e),D(t)?t===F||null==t||""===t?(this._$AH!==F&&this._$AR(),this._$AH=F):t!==this._$AH&&t!==q&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>L(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==F&&D(this._$AH)?this._$AA.nextSibling.data=t:this.T(E.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:o}=t,i="number"==typeof o?this._$AC(t):(void 0===o.el&&(o.el=Y.createElement(G(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new J(i,this),o=t.u(this.options);t.p(e),this.T(o),this._$AH=t}}_$AC(t){let e=Q.get(t.strings);return void 0===e&&Q.set(t.strings,e=new Y(t)),e}k(t){L(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let o,i=0;for(const n of t)i===e.length?e.push(o=new K(this.O(T()),this.O(T()),this,this.options)):o=e[i],o._$AI(n),i++;i<e.length&&(this._$AR(o&&o._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=$(t).nextSibling;$(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,o,i,n){this.type=1,this._$AH=F,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,o.length>2||""!==o[0]||""!==o[1]?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=F}_$AI(t,e=this,o,i){const n=this.strings;let s=!1;if(void 0===n)t=Z(this,t,e,0),s=!D(t)||t!==this._$AH&&t!==q,s&&(this._$AH=t);else{const i=t;let r,a;for(t=n[0],r=0;r<n.length-1;r++)a=Z(this,i[o+r],e,r),a===q&&(a=this._$AH[r]),s||=!D(a)||a!==this._$AH[r],a===F?t=F:t!==F&&(t+=(a??"")+n[r+1]),this._$AH[r]=a}s&&!i&&this.j(t)}j(t){t===F?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===F?void 0:t}}class ot extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==F)}}class it extends tt{constructor(t,e,o,i,n){super(t,e,o,i,n),this.type=5}_$AI(t,e=this){if((t=Z(this,t,e,0)??F)===q)return;const o=this._$AH,i=t===F&&o!==F||t.capture!==o.capture||t.once!==o.once||t.passive!==o.passive,n=t!==F&&(o===F||i);i&&this.element.removeEventListener(this.name,this,o),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class nt{constructor(t,e,o){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}}const st=k.litHtmlPolyfillSupport;st?.(Y,K),(k.litHtmlVersions??=[]).push("3.3.2");const rt=globalThis;let at=class extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,o)=>{const i=o?.renderBefore??e;let n=i._$litPart$;if(void 0===n){const t=o?.renderBefore??null;i._$litPart$=n=new K(e.insertBefore(T(),t),t,void 0,o??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}};at._$litElement$=!0,at.finalized=!0,rt.litElementHydrateSupport?.({LitElement:at});const lt=rt.litElementPolyfillSupport;lt?.({LitElement:at}),(rt.litElementVersions??=[]).push("4.2.2");const ct=t=>(e,o)=>{void 0!==o?o.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},dt={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:y},pt=(t=dt,e,o)=>{const{kind:i,metadata:n}=o;let s=globalThis.litPropertyMetadata.get(n);if(void 0===s&&globalThis.litPropertyMetadata.set(n,s=new Map),"setter"===i&&((t=Object.create(t)).wrapped=!0),s.set(o.name,t),"accessor"===i){const{name:i}=o;return{set(o){const n=e.get.call(this);e.set.call(this,o),this.requestUpdate(i,n,t,!0,o)},init(e){return void 0!==e&&this.C(i,void 0,t,e),e}}}if("setter"===i){const{name:i}=o;return function(o){const n=this[i];e.call(this,o),this.requestUpdate(i,n,t,!0,o)}}throw Error("Unsupported decorator location: "+i)};function ht(t){return(e,o)=>"object"==typeof o?pt(t,e,o):((t,e,o)=>{const i=e.hasOwnProperty(o);return e.constructor.createProperty(o,t),i?Object.getOwnPropertyDescriptor(e,o):void 0})(t,e,o)}function ut(t){return ht({...t,state:!0,attribute:!1})}const mt=1;let gt=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,o){this._$Ct=t,this._$AM=e,this._$Ci=o}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};const bt="important",ft=" !"+bt,_t=(t=>(...e)=>({_$litDirective$:t,values:e}))(class extends gt{constructor(t){if(super(t),t.type!==mt||"style"!==t.name||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,o)=>{const i=t[o];return null==i?e:e+`${o=o.includes("-")?o:o.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${i};`},"")}update(t,[e]){const{style:o}=t.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(e)),this.render(e);for(const t of this.ft)null==e[t]&&(this.ft.delete(t),t.includes("-")?o.removeProperty(t):o[t]=null);for(const t in e){const i=e[t];if(null!=i){this.ft.add(t);const e="string"==typeof i&&i.endsWith(ft);t.includes("-")||e?o.setProperty(t,e?i.slice(0,-11):i,e?bt:""):o[t]=i}}return q}}),vt=r`
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
`;const yt={default:{artwork:"default",showDetails:!0,showTitle:!0,showArtist:!0,showAlbum:!0,reserveDetailsSpace:!0,showVolumeControl:!0,showSongActions:!0,showProgressBar:!0,showProgressTime:!1,showPlaybackControls:!0,showPowerButton:!1,stationDisplay:"hidden"},full:{artwork:"full-cover",showDetails:!0,showTitle:!0,showArtist:!0,showAlbum:!0,reserveDetailsSpace:!0,showVolumeControl:!0,showSongActions:!0,showProgressBar:!0,showProgressTime:!1,showPlaybackControls:!0,showPowerButton:!1,stationDisplay:"hidden"},minimal:{artwork:"default",showDetails:!0,showTitle:!0,showArtist:!1,showAlbum:!1,reserveDetailsSpace:!1,showVolumeControl:!1,showSongActions:!0,showProgressBar:!0,showProgressTime:!1,showPlaybackControls:!0,showPowerButton:!1,stationDisplay:"hidden"},tall:{artwork:"tall",showDetails:!0,showTitle:!0,showArtist:!0,showAlbum:!0,reserveDetailsSpace:!0,showVolumeControl:!0,showSongActions:!0,showProgressBar:!0,showProgressTime:!0,showPlaybackControls:!0,showPowerButton:!1,stationDisplay:"normal"},custom:{artwork:"default",showDetails:!0,showTitle:!0,showArtist:!0,showAlbum:!0,reserveDetailsSpace:!0,showVolumeControl:!0,showSongActions:!0,showProgressBar:!0,showProgressTime:!1,showPlaybackControls:!0,showPowerButton:!1,stationDisplay:"hidden"}};function xt(t){return yt[t]}function wt(t){const e=["default","full","minimal","tall"];for(const o of e){const e=yt[o];if((t.artwork??"default")===e.artwork&&(t.showDetails??!0)===e.showDetails&&(t.showTitle??!0)===e.showTitle&&(t.showArtist??!0)===e.showArtist&&(t.showAlbum??!0)===e.showAlbum&&(t.reserveDetailsSpace??!0)===e.reserveDetailsSpace&&(t.showPlaybackControls??!0)===e.showPlaybackControls&&(t.showVolumeControl??!0)===e.showVolumeControl&&(t.showSongActions??!0)===e.showSongActions&&(t.showProgressBar??!0)===e.showProgressBar&&(t.showPowerButton??!1)===e.showPowerButton)return o}return"custom"}function kt(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var $t,Ct={exports:{}};window,$t=function(){return function(t){var e={};function o(i){if(e[i])return e[i].exports;var n=e[i]={i:i,l:!1,exports:{}};return t[i].call(n.exports,n,n.exports,o),n.l=!0,n.exports}return o.m=t,o.c=e,o.d=function(t,e,i){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(o.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)o.d(i,n,function(e){return t[e]}.bind(null,n));return i},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="",o(o.s=10)}([function(t,e,o){Object.defineProperty(e,"__esModule",{value:!0}),e.assignDeep=e.mapValues=void 0,e.mapValues=function(t,e){var o={};for(var i in t)if(t.hasOwnProperty(i)){var n=t[i];o[i]=e(n)}return o},e.assignDeep=function t(e){for(var o=[],i=1;i<arguments.length;i++)o[i-1]=arguments[i];return o.forEach(function(o){if(o)for(var i in o)if(o.hasOwnProperty(i)){var n=o[i];Array.isArray(n)?e[i]=n.slice(0):"object"==typeof n?(e[i]||(e[i]={}),t(e[i],n)):e[i]=n}}),e}},function(t,e,o){var i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var n=o(7),s=i(o(8)),r=o(0),a=function(){function t(e,o){this._src=e,this.opts=r.assignDeep({},t.DefaultOpts,o)}return t.use=function(t){this._pipeline=t},t.from=function(t){return new s.default(t)},Object.defineProperty(t.prototype,"result",{get:function(){return this._result},enumerable:!1,configurable:!0}),t.prototype._process=function(e,o){this.opts.quantizer,e.scaleDown(this.opts);var i=n.buildProcessOptions(this.opts,o);return t._pipeline.process(e.getImageData(),i)},t.prototype.palette=function(){return this.swatches()},t.prototype.swatches=function(){throw new Error("Method deprecated. Use `Vibrant.result.palettes[name]` instead")},t.prototype.getPalette=function(){var t=this,e=arguments[0],o="string"==typeof e?e:"default",i="string"==typeof e?arguments[1]:e,n=new this.opts.ImageClass;return n.load(this._src).then(function(e){return t._process(e,{generators:[o]})}).then(function(e){return t._result=e,e.palettes[o]}).then(function(t){return n.remove(),i&&i(void 0,t),t}).catch(function(t){return n.remove(),i&&i(t),Promise.reject(t)})},t.prototype.getPalettes=function(){var t=this,e=arguments[0],o=arguments[1],i=Array.isArray(e)?e:["*"],n=Array.isArray(e)?o:e,s=new this.opts.ImageClass;return s.load(this._src).then(function(e){return t._process(e,{generators:i})}).then(function(e){return t._result=e,e.palettes}).then(function(t){return s.remove(),n&&n(void 0,t),t}).catch(function(t){return s.remove(),n&&n(t),Promise.reject(t)})},t.DefaultOpts={colorCount:64,quality:5,filters:[]},t}();e.default=a},function(t,e,o){Object.defineProperty(e,"__esModule",{value:!0}),e.applyFilters=e.ImageBase=void 0;var i=function(){function t(){}return t.prototype.scaleDown=function(t){var e=this.getWidth(),o=this.getHeight(),i=1;if(t.maxDimension>0){var n=Math.max(e,o);n>t.maxDimension&&(i=t.maxDimension/n)}else i=1/t.quality;i<1&&this.resize(e*i,o*i,i)},t}();e.ImageBase=i,e.applyFilters=function(t,e){if(e.length>0)for(var o=t.data,i=o.length/4,n=void 0,s=void 0,r=void 0,a=void 0,l=void 0,c=0;c<i;c++){s=o[0+(n=4*c)],r=o[n+1],a=o[n+2],l=o[n+3];for(var d=0;d<e.length;d++)if(!e[d](s,r,a,l)){o[n+3]=0;break}}return t}},function(t,e,o){Object.defineProperty(e,"__esModule",{value:!0}),e.Swatch=void 0;var i=o(4),n=function(){function t(t,e){this._rgb=t,this._population=e}return t.applyFilters=function(t,e){return e.length>0?t.filter(function(t){for(var o=t.r,i=t.g,n=t.b,s=0;s<e.length;s++)if(!e[s](o,i,n,255))return!1;return!0}):t},t.clone=function(e){return new t(e._rgb,e._population)},Object.defineProperty(t.prototype,"r",{get:function(){return this._rgb[0]},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"g",{get:function(){return this._rgb[1]},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"b",{get:function(){return this._rgb[2]},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"rgb",{get:function(){return this._rgb},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"hsl",{get:function(){if(!this._hsl){var t=this._rgb,e=t[0],o=t[1],n=t[2];this._hsl=i.rgbToHsl(e,o,n)}return this._hsl},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"hex",{get:function(){if(!this._hex){var t=this._rgb,e=t[0],o=t[1],n=t[2];this._hex=i.rgbToHex(e,o,n)}return this._hex},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"population",{get:function(){return this._population},enumerable:!1,configurable:!0}),t.prototype.toJSON=function(){return{rgb:this.rgb,population:this.population}},t.prototype.getRgb=function(){return this._rgb},t.prototype.getHsl=function(){return this.hsl},t.prototype.getPopulation=function(){return this._population},t.prototype.getHex=function(){return this.hex},t.prototype.getYiq=function(){if(!this._yiq){var t=this._rgb;this._yiq=(299*t[0]+587*t[1]+114*t[2])/1e3}return this._yiq},Object.defineProperty(t.prototype,"titleTextColor",{get:function(){return this._titleTextColor&&(this._titleTextColor=this.getYiq()<200?"#fff":"#000"),this._titleTextColor},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"bodyTextColor",{get:function(){return this._bodyTextColor&&(this._bodyTextColor=this.getYiq()<150?"#fff":"#000"),this._bodyTextColor},enumerable:!1,configurable:!0}),t.prototype.getTitleTextColor=function(){return this.titleTextColor},t.prototype.getBodyTextColor=function(){return this.bodyTextColor},t}();e.Swatch=n},function(t,e,o){function i(t){var e=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);if(!e)throw new RangeError("'"+t+"' is not a valid hex color");return[e[1],e[2],e[3]].map(function(t){return parseInt(t,16)})}function n(t,e,o){return e/=255,o/=255,t=(t/=255)>.04045?Math.pow((t+.005)/1.055,2.4):t/12.92,e=e>.04045?Math.pow((e+.005)/1.055,2.4):e/12.92,o=o>.04045?Math.pow((o+.005)/1.055,2.4):o/12.92,[.4124*(t*=100)+.3576*(e*=100)+.1805*(o*=100),.2126*t+.7152*e+.0722*o,.0193*t+.1192*e+.9505*o]}function s(t,e,o){return e/=100,o/=108.883,t=(t/=95.047)>.008856?Math.pow(t,1/3):7.787*t+16/116,[116*(e=e>.008856?Math.pow(e,1/3):7.787*e+16/116)-16,500*(t-e),200*(e-(o=o>.008856?Math.pow(o,1/3):7.787*o+16/116))]}function r(t,e,o){var i=n(t,e,o);return s(i[0],i[1],i[2])}function a(t,e){var o=t[0],i=t[1],n=t[2],s=e[0],r=e[1],a=e[2],l=o-s,c=i-r,d=n-a,p=Math.sqrt(i*i+n*n),h=s-o,u=Math.sqrt(r*r+a*a)-p,m=Math.sqrt(l*l+c*c+d*d),g=Math.sqrt(m)>Math.sqrt(Math.abs(h))+Math.sqrt(Math.abs(u))?Math.sqrt(m*m-h*h-u*u):0;return h/=1,u/=1*(1+.045*p),g/=1*(1+.015*p),Math.sqrt(h*h+u*u+g*g)}function l(t,e){return a(r.apply(void 0,t),r.apply(void 0,e))}Object.defineProperty(e,"__esModule",{value:!0}),e.getColorDiffStatus=e.hexDiff=e.rgbDiff=e.deltaE94=e.rgbToCIELab=e.xyzToCIELab=e.rgbToXyz=e.hslToRgb=e.rgbToHsl=e.rgbToHex=e.hexToRgb=e.DELTAE94_DIFF_STATUS=void 0,e.DELTAE94_DIFF_STATUS={NA:0,PERFECT:1,CLOSE:2,GOOD:10,SIMILAR:50},e.hexToRgb=i,e.rgbToHex=function(t,e,o){return"#"+((1<<24)+(t<<16)+(e<<8)+o).toString(16).slice(1,7)},e.rgbToHsl=function(t,e,o){t/=255,e/=255,o/=255;var i=Math.max(t,e,o),n=Math.min(t,e,o),s=0,r=0,a=(i+n)/2;if(i!==n){var l=i-n;switch(r=a>.5?l/(2-i-n):l/(i+n),i){case t:s=(e-o)/l+(e<o?6:0);break;case e:s=(o-t)/l+2;break;case o:s=(t-e)/l+4}s/=6}return[s,r,a]},e.hslToRgb=function(t,e,o){var i,n,s;function r(t,e,o){return o<0&&(o+=1),o>1&&(o-=1),o<1/6?t+6*(e-t)*o:o<.5?e:o<2/3?t+(e-t)*(2/3-o)*6:t}if(0===e)i=n=s=o;else{var a=o<.5?o*(1+e):o+e-o*e,l=2*o-a;i=r(l,a,t+1/3),n=r(l,a,t),s=r(l,a,t-1/3)}return[255*i,255*n,255*s]},e.rgbToXyz=n,e.xyzToCIELab=s,e.rgbToCIELab=r,e.deltaE94=a,e.rgbDiff=l,e.hexDiff=function(t,e){return l(i(t),i(e))},e.getColorDiffStatus=function(t){return t<e.DELTAE94_DIFF_STATUS.NA?"N/A":t<=e.DELTAE94_DIFF_STATUS.PERFECT?"Perfect":t<=e.DELTAE94_DIFF_STATUS.CLOSE?"Close":t<=e.DELTAE94_DIFF_STATUS.GOOD?"Good":t<e.DELTAE94_DIFF_STATUS.SIMILAR?"Similar":"Wrong"}},function(t,e,o){var i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}},n=i(o(6)),s=i(o(9));n.default.DefaultOpts.ImageClass=s.default,t.exports=n.default},function(t,e,o){var i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var n=i(o(1));n.default.DefaultOpts.quantizer="mmcq",n.default.DefaultOpts.generators=["default"],n.default.DefaultOpts.filters=["default"],e.default=n.default},function(t,e,o){Object.defineProperty(e,"__esModule",{value:!0}),e.buildProcessOptions=void 0;var i=o(0);e.buildProcessOptions=function(t,e){var o=t.colorCount,n=t.quantizer,s=t.generators,r=t.filters,a={colorCount:o},l="string"==typeof n?{name:n,options:{}}:n;return l.options=i.assignDeep({},a,l.options),i.assignDeep({},{quantizer:l,generators:s,filters:r},e)}},function(t,e,o){var i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var n=i(o(1)),s=o(0),r=function(){function t(t,e){void 0===e&&(e={}),this._src=t,this._opts=s.assignDeep({},n.default.DefaultOpts,e)}return t.prototype.maxColorCount=function(t){return this._opts.colorCount=t,this},t.prototype.maxDimension=function(t){return this._opts.maxDimension=t,this},t.prototype.addFilter=function(t){return this._opts.filters?this._opts.filters.push(t):this._opts.filters=[t],this},t.prototype.removeFilter=function(t){if(this._opts.filters){var e=this._opts.filters.indexOf(t);e>0&&this._opts.filters.splice(e)}return this},t.prototype.clearFilters=function(){return this._opts.filters=[],this},t.prototype.quality=function(t){return this._opts.quality=t,this},t.prototype.useImageClass=function(t){return this._opts.ImageClass=t,this},t.prototype.useGenerator=function(t,e){return this._opts.generators||(this._opts.generators=[]),this._opts.generators.push(e?{name:t,options:e}:t),this},t.prototype.useQuantizer=function(t,e){return this._opts.quantizer=e?{name:t,options:e}:t,this},t.prototype.build=function(){return new n.default(this._src,this._opts)},t.prototype.getPalette=function(t){return this.build().getPalette(t)},t.prototype.getSwatches=function(t){return this.build().getPalette(t)},t}();e.default=r},function(t,e,o){var i,n=this&&this.__extends||(i=function(t,e){return i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o])},i(t,e)},function(t,e){function o(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)});Object.defineProperty(e,"__esModule",{value:!0});var s=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return n(e,t),e.prototype._initCanvas=function(){var t=this.image,e=this._canvas=document.createElement("canvas"),o=e.getContext("2d");if(!o)throw new ReferenceError("Failed to create canvas context");this._context=o,e.className="@vibrant/canvas",e.style.display="none",this._width=e.width=t.width,this._height=e.height=t.height,o.drawImage(t,0,0),document.body.appendChild(e)},e.prototype.load=function(t){var e,o,i=this;if("string"==typeof t)e=document.createElement("img"),function(t){var e=new URL(t,location.href);return e.protocol===location.protocol&&e.host===location.host&&e.port===location.port}(o=t)||function(t,e){var o=new URL(t),i=new URL(e);return o.protocol===i.protocol&&o.hostname===i.hostname&&o.port===i.port}(window.location.href,o)||(e.crossOrigin="anonymous"),e.src=o;else{if(!(t instanceof HTMLImageElement))return Promise.reject(new Error("Cannot load buffer as an image in browser"));e=t,o=t.src}return this.image=e,new Promise(function(t,n){var s=function(){i._initCanvas(),t(i)};e.complete?s():(e.onload=s,e.onerror=function(t){return n(new Error("Fail to load image: "+o))})})},e.prototype.clear=function(){this._context.clearRect(0,0,this._width,this._height)},e.prototype.update=function(t){this._context.putImageData(t,0,0)},e.prototype.getWidth=function(){return this._width},e.prototype.getHeight=function(){return this._height},e.prototype.resize=function(t,e,o){var i=this,n=i._canvas,s=i._context,r=i.image;this._width=n.width=t,this._height=n.height=e,s.scale(o,o),s.drawImage(r,0,0)},e.prototype.getPixelCount=function(){return this._width*this._height},e.prototype.getImageData=function(){return this._context.getImageData(0,0,this._width,this._height)},e.prototype.remove=function(){this._canvas&&this._canvas.parentNode&&this._canvas.parentNode.removeChild(this._canvas)},e}(o(2).ImageBase);e.default=s},function(t,e,o){var i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}},n=o(5),s=i(o(11));n.use(s.default),t.exports=n},function(t,e,o){var i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var n=i(o(12)),s=i(o(16)),r=(new(o(17).BasicPipeline)).filter.register("default",function(t,e,o,i){return i>=125&&!(t>250&&e>250&&o>250)}).quantizer.register("mmcq",n.default).generator.register("default",s.default);e.default=r},function(t,e,o){var i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var n=o(3),s=i(o(13)),r=i(o(15));function a(t,e){for(var o=t.size();t.size()<e;){var i=t.pop();if(!(i&&i.count()>0))break;var n=i.split(),s=n[0],r=n[1];if(t.push(s),r&&r.count()>0&&t.push(r),t.size()===o)break;o=t.size()}}e.default=function(t,e){if(0===t.length||e.colorCount<2||e.colorCount>256)throw new Error("Wrong MMCQ parameters");var o=s.default.build(t);o.histogram.colorCount;var i=new r.default(function(t,e){return t.count()-e.count()});i.push(o),a(i,.75*e.colorCount);var l=new r.default(function(t,e){return t.count()*t.volume()-e.count()*e.volume()});return l.contents=i.contents,a(l,e.colorCount-l.size()),function(t){for(var e=[];t.size();){var o=t.pop(),i=o.avg();i[0],i[1],i[2],e.push(new n.Swatch(i,o.count()))}return e}(l)}},function(t,e,o){var i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var n=i(o(14)),s=function(){function t(t,e,o,i,n,s,r){this.histogram=r,this._volume=-1,this._count=-1,this.dimension={r1:t,r2:e,g1:o,g2:i,b1:n,b2:s}}return t.build=function(e){var o=new n.default(e,{sigBits:5});return new t(o.rmin,o.rmax,o.gmin,o.gmax,o.bmin,o.bmax,o)},t.prototype.invalidate=function(){this._volume=this._count=-1,this._avg=null},t.prototype.volume=function(){if(this._volume<0){var t=this.dimension,e=t.r1,o=t.r2,i=t.g1,n=t.g2,s=t.b1,r=t.b2;this._volume=(o-e+1)*(n-i+1)*(r-s+1)}return this._volume},t.prototype.count=function(){if(this._count<0){for(var t=this.histogram,e=t.hist,o=t.getColorIndex,i=this.dimension,n=i.r1,s=i.r2,r=i.g1,a=i.g2,l=i.b1,c=i.b2,d=0,p=n;p<=s;p++)for(var h=r;h<=a;h++)for(var u=l;u<=c;u++)d+=e[o(p,h,u)];this._count=d}return this._count},t.prototype.clone=function(){var e=this.histogram,o=this.dimension;return new t(o.r1,o.r2,o.g1,o.g2,o.b1,o.b2,e)},t.prototype.avg=function(){if(!this._avg){var t=this.histogram,e=t.hist,o=t.getColorIndex,i=this.dimension,n=i.r1,s=i.r2,r=i.g1,a=i.g2,l=i.b1,c=i.b2,d=0,p=void 0,h=void 0,u=void 0;p=h=u=0;for(var m=n;m<=s;m++)for(var g=r;g<=a;g++)for(var b=l;b<=c;b++){var f=e[o(m,g,b)];d+=f,p+=f*(m+.5)*8,h+=f*(g+.5)*8,u+=f*(b+.5)*8}this._avg=d?[~~(p/d),~~(h/d),~~(u/d)]:[~~(8*(n+s+1)/2),~~(8*(r+a+1)/2),~~(8*(l+c+1)/2)]}return this._avg},t.prototype.contains=function(t){var e=t[0],o=t[1],i=t[2],n=this.dimension,s=n.r1,r=n.r2,a=n.g1,l=n.g2,c=n.b1,d=n.b2;return o>>=3,i>>=3,(e>>=3)>=s&&e<=r&&o>=a&&o<=l&&i>=c&&i<=d},t.prototype.split=function(){var t=this.histogram,e=t.hist,o=t.getColorIndex,i=this.dimension,n=i.r1,s=i.r2,r=i.g1,a=i.g2,l=i.b1,c=i.b2,d=this.count();if(!d)return[];if(1===d)return[this.clone()];var p,h,u=s-n+1,m=a-r+1,g=c-l+1,b=Math.max(u,m,g),f=null;p=h=0;var _=null;if(b===u){_="r",f=new Uint32Array(s+1);for(var v=n;v<=s;v++){p=0;for(var y=r;y<=a;y++)for(var x=l;x<=c;x++)p+=e[o(v,y,x)];h+=p,f[v]=h}}else if(b===m)for(_="g",f=new Uint32Array(a+1),y=r;y<=a;y++){for(p=0,v=n;v<=s;v++)for(x=l;x<=c;x++)p+=e[o(v,y,x)];h+=p,f[y]=h}else for(_="b",f=new Uint32Array(c+1),x=l;x<=c;x++){for(p=0,v=n;v<=s;v++)for(y=r;y<=a;y++)p+=e[o(v,y,x)];h+=p,f[x]=h}for(var w=-1,k=new Uint32Array(f.length),$=0;$<f.length;$++){var C=f[$];w<0&&C>h/2&&(w=$),k[$]=h-C}var P=this;return function(t){var e=t+"1",o=t+"2",i=P.dimension[e],n=P.dimension[o],s=P.clone(),r=P.clone(),a=w-i,l=n-w;for(a<=l?(n=Math.min(n-1,~~(w+l/2)),n=Math.max(0,n)):(n=Math.max(i,~~(w-1-a/2)),n=Math.min(P.dimension[o],n));!f[n];)n++;for(var c=k[n];!c&&f[n-1];)c=k[--n];return s.dimension[o]=n,r.dimension[e]=n+1,[s,r]}(_)},t}();e.default=s},function(t,e,o){Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(t,e){this.pixels=t,this.opts=e;var o=e.sigBits,i=function(t,e,i){return(t<<2*o)+(e<<o)+i};this.getColorIndex=i;var n,s,r,a,l,c,d,p,h,u=8-o,m=new Uint32Array(1<<3*o);n=r=l=0,s=a=c=Number.MAX_VALUE;for(var g=t.length/4,b=0;b<g;){var f=4*b;b++,d=t[f+0],p=t[f+1],h=t[f+2],0!==t[f+3]&&(m[i(d>>=u,p>>=u,h>>=u)]+=1,d>n&&(n=d),d<s&&(s=d),p>r&&(r=p),p<a&&(a=p),h>l&&(l=h),h<c&&(c=h))}this._colorCount=m.reduce(function(t,e){return e>0?t+1:t},0),this.hist=m,this.rmax=n,this.rmin=s,this.gmax=r,this.gmin=a,this.bmax=l,this.bmin=c}return Object.defineProperty(t.prototype,"colorCount",{get:function(){return this._colorCount},enumerable:!1,configurable:!0}),t}();e.default=i},function(t,e,o){Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(t){this._comparator=t,this.contents=[],this._sorted=!1}return t.prototype._sort=function(){this._sorted||(this.contents.sort(this._comparator),this._sorted=!0)},t.prototype.push=function(t){this.contents.push(t),this._sorted=!1},t.prototype.peek=function(t){return this._sort(),t="number"==typeof t?t:this.contents.length-1,this.contents[t]},t.prototype.pop=function(){return this._sort(),this.contents.pop()},t.prototype.size=function(){return this.contents.length},t.prototype.map=function(t){return this._sort(),this.contents.map(t)},t}();e.default=i},function(t,e,o){Object.defineProperty(e,"__esModule",{value:!0});var i=o(3),n=o(4),s={targetDarkLuma:.26,maxDarkLuma:.45,minLightLuma:.55,targetLightLuma:.74,minNormalLuma:.3,targetNormalLuma:.5,maxNormalLuma:.7,targetMutesSaturation:.3,maxMutesSaturation:.4,targetVibrantSaturation:1,minVibrantSaturation:.35,weightSaturation:3,weightLuma:6.5,weightPopulation:.5};function r(t,e,o,i,n,s,r,a,l,c){var d=null,p=0;return e.forEach(function(e){var h=e.hsl,u=h[1],m=h[2];if(u>=a&&u<=l&&m>=n&&m<=s&&!function(t,e){return t.Vibrant===e||t.DarkVibrant===e||t.LightVibrant===e||t.Muted===e||t.DarkMuted===e||t.LightMuted===e}(t,e)){var g=function(t,e,o,i,n,s,r){function a(t,e){return 1-Math.abs(t-e)}return function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];for(var o=0,i=0,n=0;n<t.length;n+=2){var s=t[n],r=t[n+1];o+=s*r,i+=r}return o/i}(a(t,e),r.weightSaturation,a(o,i),r.weightLuma,n/s,r.weightPopulation)}(u,r,m,i,e.population,o,c);(null===d||g>p)&&(d=e,p=g)}}),d}e.default=function(t,e){e=Object.assign({},s,e);var o=function(t){var e=0;return t.forEach(function(t){e=Math.max(e,t.population)}),e}(t),a=function(t,e,o){var i={Vibrant:null,DarkVibrant:null,LightVibrant:null,Muted:null,DarkMuted:null,LightMuted:null};return i.Vibrant=r(i,t,e,o.targetNormalLuma,o.minNormalLuma,o.maxNormalLuma,o.targetVibrantSaturation,o.minVibrantSaturation,1,o),i.LightVibrant=r(i,t,e,o.targetLightLuma,o.minLightLuma,1,o.targetVibrantSaturation,o.minVibrantSaturation,1,o),i.DarkVibrant=r(i,t,e,o.targetDarkLuma,0,o.maxDarkLuma,o.targetVibrantSaturation,o.minVibrantSaturation,1,o),i.Muted=r(i,t,e,o.targetNormalLuma,o.minNormalLuma,o.maxNormalLuma,o.targetMutesSaturation,0,o.maxMutesSaturation,o),i.LightMuted=r(i,t,e,o.targetLightLuma,o.minLightLuma,1,o.targetMutesSaturation,0,o.maxMutesSaturation,o),i.DarkMuted=r(i,t,e,o.targetDarkLuma,0,o.maxDarkLuma,o.targetMutesSaturation,0,o.maxMutesSaturation,o),i}(t,o,e);return function(t,e,o){if(!t.Vibrant&&!t.DarkVibrant&&!t.LightVibrant){if(!t.DarkVibrant&&t.DarkMuted){var s=t.DarkMuted.hsl,r=s[0],a=s[1],l=s[2];l=o.targetDarkLuma,t.DarkVibrant=new i.Swatch(n.hslToRgb(r,a,l),0)}if(!t.LightVibrant&&t.LightMuted){var c=t.LightMuted.hsl;r=c[0],a=c[1],l=c[2],l=o.targetDarkLuma,t.DarkVibrant=new i.Swatch(n.hslToRgb(r,a,l),0)}}if(!t.Vibrant&&t.DarkVibrant){var d=t.DarkVibrant.hsl;r=d[0],a=d[1],l=d[2],l=o.targetNormalLuma,t.Vibrant=new i.Swatch(n.hslToRgb(r,a,l),0)}else if(!t.Vibrant&&t.LightVibrant){var p=t.LightVibrant.hsl;r=p[0],a=p[1],l=p[2],l=o.targetNormalLuma,t.Vibrant=new i.Swatch(n.hslToRgb(r,a,l),0)}if(!t.DarkVibrant&&t.Vibrant){var h=t.Vibrant.hsl;r=h[0],a=h[1],l=h[2],l=o.targetDarkLuma,t.DarkVibrant=new i.Swatch(n.hslToRgb(r,a,l),0)}if(!t.LightVibrant&&t.Vibrant){var u=t.Vibrant.hsl;r=u[0],a=u[1],l=u[2],l=o.targetLightLuma,t.LightVibrant=new i.Swatch(n.hslToRgb(r,a,l),0)}if(!t.Muted&&t.Vibrant){var m=t.Vibrant.hsl;r=m[0],a=m[1],l=m[2],l=o.targetMutesSaturation,t.Muted=new i.Swatch(n.hslToRgb(r,a,l),0)}if(!t.DarkMuted&&t.DarkVibrant){var g=t.DarkVibrant.hsl;r=g[0],a=g[1],l=g[2],l=o.targetMutesSaturation,t.DarkMuted=new i.Swatch(n.hslToRgb(r,a,l),0)}if(!t.LightMuted&&t.LightVibrant){var b=t.LightVibrant.hsl;r=b[0],a=b[1],l=b[2],l=o.targetMutesSaturation,t.LightMuted=new i.Swatch(n.hslToRgb(r,a,l),0)}}(a,0,e),a}},function(t,e,o){var i=this&&this.__awaiter||function(t,e,o,i){return new(o||(o=Promise))(function(n,s){function r(t){try{l(i.next(t))}catch(t){s(t)}}function a(t){try{l(i.throw(t))}catch(t){s(t)}}function l(t){var e;t.done?n(t.value):(e=t.value,e instanceof o?e:new o(function(t){t(e)})).then(r,a)}l((i=i.apply(t,e||[])).next())})},n=this&&this.__generator||function(t,e){var o,i,n,s,r={label:0,sent:function(){if(1&n[0])throw n[1];return n[1]},trys:[],ops:[]};return s={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function a(s){return function(a){return function(s){if(o)throw new TypeError("Generator is already executing.");for(;r;)try{if(o=1,i&&(n=2&s[0]?i.return:s[0]?i.throw||((n=i.return)&&n.call(i),0):i.next)&&!(n=n.call(i,s[1])).done)return n;switch(i=0,n&&(s=[2&s[0],n.value]),s[0]){case 0:case 1:n=s;break;case 4:return r.label++,{value:s[1],done:!1};case 5:r.label++,i=s[1],s=[0];continue;case 7:s=r.ops.pop(),r.trys.pop();continue;default:if(!((n=(n=r.trys).length>0&&n[n.length-1])||6!==s[0]&&2!==s[0])){r=0;continue}if(3===s[0]&&(!n||s[1]>n[0]&&s[1]<n[3])){r.label=s[1];break}if(6===s[0]&&r.label<n[1]){r.label=n[1],n=s;break}if(n&&r.label<n[2]){r.label=n[2],r.ops.push(s);break}n[2]&&r.ops.pop(),r.trys.pop();continue}s=e.call(t,r)}catch(t){s=[6,t],i=0}finally{o=n=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,a])}}};Object.defineProperty(e,"__esModule",{value:!0}),e.BasicPipeline=e.Stage=void 0;var s=o(2),r=function(){function t(t){this.pipeline=t,this._map={}}return t.prototype.names=function(){return Object.keys(this._map)},t.prototype.has=function(t){return!!this._map[t]},t.prototype.get=function(t){return this._map[t]},t.prototype.register=function(t,e){return this._map[t]=e,this.pipeline},t}();e.Stage=r;var a=function(){function t(){this.filter=new r(this),this.quantizer=new r(this),this.generator=new r(this)}return t.prototype._buildProcessTasks=function(t){var e=this,o=t.filters,i=t.quantizer,n=t.generators;return 1===n.length&&"*"===n[0]&&(n=this.generator.names()),{filters:o.map(function(t){return s(e.filter,t)}),quantizer:s(this.quantizer,i),generators:n.map(function(t){return s(e.generator,t)})};function s(t,e){var o,i;return"string"==typeof e?o=e:(o=e.name,i=e.options),{name:o,fn:t.get(o),options:i}}},t.prototype.process=function(t,e){return i(this,void 0,void 0,function(){var o,i,s,r,a,l,c;return n(this,function(n){switch(n.label){case 0:return o=this._buildProcessTasks(e),i=o.filters,s=o.quantizer,r=o.generators,[4,this._filterColors(i,t)];case 1:return a=n.sent(),[4,this._generateColors(s,a)];case 2:return l=n.sent(),[4,this._generatePalettes(r,l)];case 3:return c=n.sent(),[2,{colors:l,palettes:c}]}})})},t.prototype._filterColors=function(t,e){return Promise.resolve(s.applyFilters(e,t.map(function(t){return t.fn})))},t.prototype._generateColors=function(t,e){return Promise.resolve(t.fn(e.data,t.options))},t.prototype._generatePalettes=function(t,e){return i(this,void 0,void 0,function(){var o;return n(this,function(i){switch(i.label){case 0:return[4,Promise.all(t.map(function(t){var o=t.fn,i=t.options;return Promise.resolve(o(e,i))}))];case 1:return o=i.sent(),[2,Promise.resolve(o.reduce(function(e,o,i){return e[t[i].name]=o,e},{}))]}})})},t}();e.BasicPipeline=a}])};var Pt=kt(Ct.exports=$t());const St={background:"#1c1c1c",foreground:"#ffffff"},Ot=new Map,Mt=(t,e,o)=>{const i=[t,e,o].map(t=>{const e=t/255;return e<=.03928?e/12.92:((e+.055)/1.055)**2.4});return.2126*i[0]+.7152*i[1]+.0722*i[2]},At=(t,e)=>Math.round(100*(((t,e)=>{const o=Mt(t[0],t[1],t[2]),i=Mt(e[0],e[1],e[2]);return(Math.max(o,i)+.05)/(Math.min(o,i)+.05)})(t,e)+Number.EPSILON))/100;Pt._pipeline.generator.register("default",t=>{t.sort((t,e)=>e.population-t.population);const e=t[0];let o;const i=new Map,n=(t,o)=>(i.has(t)||i.set(t,At(e.rgb,o)),(i.get(t)||0)>4.5);for(let e=1;e<t.length&&void 0===o;e++){if(n(t[e].hex,t[e].rgb)){o=t[e].rgb;break}const i=t[e];for(let s=e+1;s<t.length;s++){const e=t[s];if(!(Math.abs(i.rgb[0]-e.rgb[0])+Math.abs(i.rgb[1]-e.rgb[1])+Math.abs(i.rgb[2]-e.rgb[2])>150)&&n(e.hex,e.rgb)){o=e.rgb;break}}}return void 0===o&&(o=e.getYiq()<200?[255,255,255]:[0,0,0]),[new e.constructor(o,0).hex,e.hex]});async function Et(t){if(!t)return St;const e=Ot.get(t);if(e)return e;try{const[e,o]=await(async t=>new Pt(t,{colorCount:16}).getPalette())(t),i={background:o,foreground:e};if(Ot.set(t,i),Ot.size>50){const t=Ot.keys().next().value;t&&Ot.delete(t)}return i}catch(t){return console.error("Error extracting colors:",t),St}}const Tt={x:0,y:0,width:.4,height:.7},Dt={x:0,y:.7,width:1,height:.3};function Lt(t,e,o,i){const n=Math.floor(e.x*o),s=Math.floor(e.y*i),r=Math.floor((e.x+e.width)*o),a=Math.floor((e.y+e.height)*i);let l=0,c=0,d=0,p=0;for(let e=s;e<a;e+=4)for(let i=n;i<r;i+=4){const n=4*(e*o+i);l+=t.data[n],c+=t.data[n+1],d+=t.data[n+2],p++}return 0===p?[128,128,128]:[Math.round(l/p),Math.round(c/p),Math.round(d/p)]}function zt(t,e=0){const o=function(t,e){const o=1-e;return[Math.round(t[0]*o),Math.round(t[1]*o),Math.round(t[2]*o)]}(t,e);return Mt(o[0],o[1],o[2])<.5?"#ffffff":"#1a1a1a"}let Nt=class extends at{constructor(){super(...arguments),this.playing=!1,this.disabled=!1,this.showPower=!1,this.isOn=!0}_handlePower(){this.dispatchEvent(new CustomEvent("power-toggle",{bubbles:!0,composed:!0}))}_handlePlayPause(){this.dispatchEvent(new CustomEvent("play-pause",{bubbles:!0,composed:!0}))}_handleNext(){this.dispatchEvent(new CustomEvent("next-track",{bubbles:!0,composed:!0}))}render(){return H`
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
    `}};Nt.styles=r`
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
  `,t([ht({type:Boolean})],Nt.prototype,"playing",void 0),t([ht({type:Boolean})],Nt.prototype,"disabled",void 0),t([ht({type:Boolean})],Nt.prototype,"showPower",void 0),t([ht({type:Boolean})],Nt.prototype,"isOn",void 0),Nt=t([ct("pmc-playback-controls")],Nt);let It=class extends at{constructor(){super(...arguments),this.duration=0,this.position=0,this.positionUpdatedAt="",this.showTime=!1,this.isPlaying=!1,this._animationFrameId=null,this._currentPosition=0}connectedCallback(){super.connectedCallback(),this._startAnimation()}disconnectedCallback(){super.disconnectedCallback(),this._stopAnimation()}updated(t){(t.has("position")||t.has("positionUpdatedAt"))&&(this._currentPosition=this.position)}_startAnimation(){const t=()=>{if(this.duration>0&&this.positionUpdatedAt){if(this.isPlaying){const t=new Date(this.positionUpdatedAt).getTime(),e=(Date.now()-t)/1e3;this._currentPosition=Math.min(this.position+e,this.duration)}else this._currentPosition=this.position;this.requestUpdate()}this._animationFrameId=requestAnimationFrame(t)};this._animationFrameId=requestAnimationFrame(t)}_stopAnimation(){this._animationFrameId&&(cancelAnimationFrame(this._animationFrameId),this._animationFrameId=null)}_formatTime(t){return`${Math.floor(t/60)}:${Math.floor(t%60).toString().padStart(2,"0")}`}render(){const t=this.duration>0?this._currentPosition/this.duration*100:0;return H`
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
    `}};It.styles=r`
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
  `,t([ht({type:Number})],It.prototype,"duration",void 0),t([ht({type:Number})],It.prototype,"position",void 0),t([ht({type:String})],It.prototype,"positionUpdatedAt",void 0),t([ht({type:Boolean})],It.prototype,"showTime",void 0),t([ht({type:Boolean})],It.prototype,"isPlaying",void 0),It=t([ct("pmc-progress-bar")],It);let Bt=class extends at{constructor(){super(...arguments),this.volume=.5,this.muted=!1,this.disabled=!1,this.sliderColor="currentColor",this._dragging=!1}_getVolumeIcon(){return this.muted||0===this.volume?"mdi:volume-off":this.volume<.3?"mdi:volume-low":this.volume<.7?"mdi:volume-medium":"mdi:volume-high"}_handleVolumeChange(t){const e=t.target,o=parseFloat(e.value);this.dispatchEvent(new CustomEvent("volume-change",{detail:{volume:o},bubbles:!0,composed:!0}))}_handleMuteToggle(){this.dispatchEvent(new CustomEvent("mute-toggle",{bubbles:!0,composed:!0}))}render(){const t=Math.round(100*this.volume),e=100*this.volume+"%";return H`
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
    `}};Bt.styles=r`
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
  `,t([ht({type:Number})],Bt.prototype,"volume",void 0),t([ht({type:Boolean})],Bt.prototype,"muted",void 0),t([ht({type:Boolean})],Bt.prototype,"disabled",void 0),t([ht({type:String})],Bt.prototype,"sliderColor",void 0),t([ut()],Bt.prototype,"_dragging",void 0),Bt=t([ct("pmc-volume-slider")],Bt);let Rt=class extends at{constructor(){super(...arguments),this.rating=0,this.disabled=!1,this.showLove=!0,this.showBan=!0,this.showTired=!0,this.popupOnly=!1,this.externalOpen=!1,this._menuOpen=!1,this._menuTop=0,this._menuLeft=0,this._showAbove=!0,this._ignoreNextClickOutside=!1}connectedCallback(){super.connectedCallback(),this._handleClickOutside=this._handleClickOutside.bind(this),document.addEventListener("click",this._handleClickOutside)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._handleClickOutside)}_handleClickOutside(t){this._ignoreNextClickOutside?this._ignoreNextClickOutside=!1:this._menuOpen&&!t.composedPath().includes(this)&&(this._menuOpen=!1,this.dispatchEvent(new CustomEvent("popup-closed",{bubbles:!0,composed:!0})))}firstUpdated(){this.externalOpen&&!this._menuOpen&&this._openPopupExternal()}updated(t){t.has("externalOpen")&&this.externalOpen&&!this._menuOpen&&this._openPopupExternal(),t.has("anchorPosition")&&this._menuOpen&&this.anchorPosition&&this._updateMenuPosition()}_openPopupExternal(){this._ignoreNextClickOutside=!0,requestAnimationFrame(()=>{this._openPopup()})}_openPopup(){this.disabled||(this._updateMenuPosition(),this._menuOpen=!0)}_toggleMenu(t){t.stopPropagation(),this.disabled||(this._menuOpen||this._updateMenuPosition(),this._menuOpen=!this._menuOpen)}_updateMenuPosition(){const t=this.anchorPosition??this.getBoundingClientRect(),e=100,o="width"in t?t.width:t.right-t.left,i="height"in t?t.height:t.bottom-t.top;if(0===o&&0===i&&!this.anchorPosition)return this._menuLeft=window.innerWidth/2,this._menuTop=Math.max(8,(window.innerHeight-e)/2),void(this._showAbove=!1);const n=t.top;window.innerHeight,t.bottom,this._showAbove=n>=108,this._menuLeft=Math.max(88,Math.min(t.left+o/2,window.innerWidth-8-80)),this._showAbove?this._menuTop=Math.max(8,t.top-8-e):this._menuTop=Math.min(t.bottom+8,window.innerHeight-e-8)}_handleLove(){this.dispatchEvent(new CustomEvent("love-song",{bubbles:!0,composed:!0})),this._menuOpen=!1}_handleBan(){this.dispatchEvent(new CustomEvent("ban-song",{bubbles:!0,composed:!0})),this._menuOpen=!1}_handleTired(){this.dispatchEvent(new CustomEvent("tired-song",{bubbles:!0,composed:!0})),this._menuOpen=!1}_closeMenu(){this._menuOpen=!1}render(){const t=1===this.rating;return H`
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
    `}};Rt.styles=r`
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
  `,t([ht({type:Number})],Rt.prototype,"rating",void 0),t([ht({type:Boolean})],Rt.prototype,"disabled",void 0),t([ht({type:Boolean})],Rt.prototype,"showLove",void 0),t([ht({type:Boolean})],Rt.prototype,"showBan",void 0),t([ht({type:Boolean})],Rt.prototype,"showTired",void 0),t([ht({type:Boolean})],Rt.prototype,"popupOnly",void 0),t([ht({type:Boolean})],Rt.prototype,"externalOpen",void 0),t([ht({type:Object})],Rt.prototype,"anchorPosition",void 0),t([ut()],Rt.prototype,"_menuOpen",void 0),t([ut()],Rt.prototype,"_menuTop",void 0),t([ut()],Rt.prototype,"_menuLeft",void 0),t([ut()],Rt.prototype,"_showAbove",void 0),Rt=t([ct("pmc-song-actions-menu")],Rt);let Ut=class extends at{constructor(){super(...arguments),this.stations=[],this.currentStationId="",this.currentStationName="",this.songStationName="",this.disabled=!1,this.popupOnly=!1,this.externalOpen=!1,this._menuOpen=!1,this._menuTop=0,this._menuLeft=0,this._showAbove=!0,this._ignoreNextClickOutside=!1}connectedCallback(){super.connectedCallback(),this._handleClickOutside=this._handleClickOutside.bind(this),document.addEventListener("click",this._handleClickOutside)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._handleClickOutside)}_handleClickOutside(t){this._ignoreNextClickOutside?this._ignoreNextClickOutside=!1:this._menuOpen&&!t.composedPath().includes(this)&&(this._menuOpen=!1,this.dispatchEvent(new CustomEvent("popup-closed",{bubbles:!0,composed:!0})))}firstUpdated(){this.externalOpen&&!this._menuOpen&&this._openPopupExternal()}updated(t){t.has("externalOpen")&&this.externalOpen&&!this._menuOpen&&this._openPopupExternal(),t.has("anchorPosition")&&this._menuOpen&&this.anchorPosition&&this._updateMenuPosition()}_openPopupExternal(){this._ignoreNextClickOutside=!0,requestAnimationFrame(()=>{this._openPopup()})}_openPopup(){!this.disabled&&this.stations.length>0&&(this._updateMenuPosition(),this._menuOpen=!0)}openPopup(){this._openPopup()}_toggleMenu(t){t.stopPropagation(),!this.disabled&&this.stations.length>0&&(this._menuOpen||this._updateMenuPosition(),this._menuOpen=!this._menuOpen)}_updateMenuPosition(){const t=this.anchorPosition??this.getBoundingClientRect(),e=Math.min(400,40*this.stations.length+8),o="width"in t?t.width:t.right-t.left,i="height"in t?t.height:t.bottom-t.top;if(0===o&&0===i&&!this.anchorPosition)return this._menuLeft=window.innerWidth/2,this._menuTop=Math.max(8,(window.innerHeight-e)/2),void(this._showAbove=!1);const n=t.top;window.innerHeight,t.bottom,this._showAbove=n>=e+8,this._menuLeft=Math.max(108,Math.min(t.left+o/2,window.innerWidth-8-100)),this._showAbove?this._menuTop=Math.max(8,t.top-8-e):this._menuTop=Math.min(t.bottom+8,window.innerHeight-e-8)}_handleStationClick(t){this.dispatchEvent(new CustomEvent("station-change",{detail:{stationId:t.id,stationName:t.name},bubbles:!0,composed:!0})),this._menuOpen=!1}_closeMenu(){this._menuOpen=!1,this.dispatchEvent(new CustomEvent("popup-closed",{bubbles:!0,composed:!0}))}_getCurrentStation(){return this.stations.find(t=>t.id===this.currentStationId)}render(){const t=this._getCurrentStation(),e=t?.isQuickMix??!1;let o=this.currentStationName||"Select Station";e&&this.songStationName&&(o=this.songStationName);const i=e?"mdi:shuffle":"mdi:radio";return H`
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
    `}};Ut.styles=r`
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
  `,t([ht({type:Array})],Ut.prototype,"stations",void 0),t([ht({type:String})],Ut.prototype,"currentStationId",void 0),t([ht({type:String})],Ut.prototype,"currentStationName",void 0),t([ht({type:String})],Ut.prototype,"songStationName",void 0),t([ht({type:Boolean})],Ut.prototype,"disabled",void 0),t([ht({type:Boolean})],Ut.prototype,"popupOnly",void 0),t([ht({type:Boolean})],Ut.prototype,"externalOpen",void 0),t([ht({type:Object})],Ut.prototype,"anchorPosition",void 0),t([ut()],Ut.prototype,"_menuOpen",void 0),t([ut()],Ut.prototype,"_menuTop",void 0),t([ut()],Ut.prototype,"_menuLeft",void 0),t([ut()],Ut.prototype,"_showAbove",void 0),Ut=t([ct("pmc-station-selector")],Ut);let jt=class extends at{constructor(){super(...arguments),this.entityId="",this.showStationOption=!1,this.showRatingsOption=!1,this.showExplainOption=!1,this.showUpcomingOption=!1,this.showStationModeOption=!1,this.showQuickMixOption=!1,this.showRenameOption=!1,this.isOn=!0,this.disabled=!1,this.buildTime="",this._menuOpen=!1,this._menuTop=0,this._menuLeft=0,this._portalContainer=null}connectedCallback(){super.connectedCallback(),this._handleClickOutside=this._handleClickOutside.bind(this),document.addEventListener("click",this._handleClickOutside)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._handleClickOutside),this._removePortal()}_createPortal(){this._portalContainer||(this._portalContainer=document.createElement("div"),this._portalContainer.className="pmc-overflow-menu-portal",document.body.appendChild(this._portalContainer))}_removePortal(){this._portalContainer&&(this._portalContainer.remove(),this._portalContainer=null)}_handleClickOutside(t){const e=t.composedPath(),o=e.includes(this),i=!!this._portalContainer&&e.includes(this._portalContainer);!this._menuOpen||o||i||(this._menuOpen=!1)}_toggleMenu(t){t.stopPropagation(),this.disabled||(this._menuOpen||(this._updateMenuPosition(),this._createPortal()),this._menuOpen=!this._menuOpen,this._updatePortalContent())}_updateMenuPosition(){const t=this.getBoundingClientRect();let e=2;this.showStationOption&&e++,this.showRatingsOption&&e++,this.showExplainOption&&e++,this.showUpcomingOption&&e++,this.showStationModeOption&&e++,this.showQuickMixOption&&e++,this.showRenameOption&&e++;const o=44*e+(this.buildTime?40:0);let i=t.right-180,n=t.bottom+4;i=Math.max(8,Math.min(i,window.innerWidth-180-8)),n=Math.min(n,window.innerHeight-o-8),n+o>window.innerHeight-8&&(n=t.top-4-o,n=Math.max(8,n)),this._menuLeft=i,this._menuTop=n}_handleMoreInfo(){this.dispatchEvent(new CustomEvent("more-info",{bubbles:!0,composed:!0,detail:{entityId:this.entityId}})),this._menuOpen=!1}_getElementPosition(t){const e=t.getBoundingClientRect();return{left:e.left,top:e.top,bottom:e.bottom,right:e.right}}_handleSelectStation(t){const e=t.currentTarget;this.dispatchEvent(new CustomEvent("select-station",{bubbles:!0,composed:!0,detail:{anchorPosition:this._getElementPosition(e)}})),this._menuOpen=!1}_handleSelectRatings(t){const e=t.currentTarget;this.dispatchEvent(new CustomEvent("select-ratings",{bubbles:!0,composed:!0,detail:{anchorPosition:this._getElementPosition(e)}})),this._menuOpen=!1}_closeMenu(){this._menuOpen=!1,this._updatePortalContent()}_updatePortalContent(){if(!this._portalContainer)return;if(!this._menuOpen)return void(this._portalContainer.innerHTML="");let t="";this.showExplainOption&&(t+='\n        <button class="menu-item" data-action="explain-song">\n          <ha-icon icon="mdi:comment-question-outline"></ha-icon>\n          <span>Why this song?</span>\n        </button>\n      '),this.showUpcomingOption&&(t+='\n        <button class="menu-item" data-action="show-upcoming">\n          <ha-icon icon="mdi:playlist-music"></ha-icon>\n          <span>Show Upcoming Songs</span>\n        </button>\n      '),this.showRatingsOption&&(t+='\n        <button class="menu-item" data-action="select-ratings">\n          <ha-icon icon="mdi:thumbs-up-down-outline"></ha-icon>\n          <span>Song Ratings</span>\n        </button>\n      '),(this.showExplainOption||this.showRatingsOption||this.showUpcomingOption)&&(t+='<div style="height: 1px; background: var(--divider-color, rgba(0, 0, 0, 0.1)); margin: 4px 0;"></div>'),this.showStationModeOption&&(t+='\n        <button class="menu-item" data-action="station-mode">\n          <ha-icon icon="mdi:tune-variant"></ha-icon>\n          <span>Station Mode</span>\n        </button>\n      '),(this.showStationModeOption||this.showQuickMixOption)&&(t+='<div style="height: 1px; background: var(--divider-color, rgba(0, 0, 0, 0.1)); margin: 4px 0;"></div>'),this.showQuickMixOption&&(t+='\n        <button class="menu-item" data-action="quickmix">\n          <ha-icon icon="mdi:playlist-music"></ha-icon>\n          <span>QuickMix Settings</span>\n        </button>\n      '),(this.showQuickMixOption||this.showRenameOption)&&(t+='<div style="height: 1px; background: var(--divider-color, rgba(0, 0, 0, 0.1)); margin: 4px 0;"></div>'),this.showRenameOption&&(t+='\n        <button class="menu-item" data-action="rename-station">\n          <ha-icon icon="mdi:pencil"></ha-icon>\n          <span>Rename Station</span>\n        </button>\n      '),(this.showStationOption||this.showRenameOption)&&(t+='<div style="height: 1px; background: var(--divider-color, rgba(0, 0, 0, 0.1)); margin: 4px 0;"></div>'),this.showStationOption&&(t+='\n        <button class="menu-item" data-action="select-station">\n          <ha-icon icon="mdi:radio"></ha-icon>\n          <span>Select Station</span>\n        </button>\n      '),t+=`\n      <button class="menu-item" data-action="more-info">\n        <ha-icon icon="mdi:information-outline"></ha-icon>\n        <span>More Information</span>\n      </button>\n      <button class="menu-item" data-action="power-toggle">\n        <ha-icon icon="mdi:power"></ha-icon>\n        <span>${this.isOn?"Disconnect":"Connect"}</span>\n      </button>\n    `,this.buildTime&&(t+=`<div class="build-time">${this._formatBuildTime(this.buildTime)}</div>`),this._portalContainer.innerHTML=`\n      <style>\n      .pmc-portal-backdrop {\n        position: fixed;\n        top: 0;\n        left: 0;\n        right: 0;\n        bottom: 0;\n        z-index: 99998;\n      }\n      .pmc-portal-menu {\n        position: fixed;\n        background: var(--card-background-color, #fff);\n        border-radius: 12px;\n        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);\n        padding: 4px;\n        display: flex;\n        flex-direction: column;\n        gap: 2px;\n        z-index: 99999;\n        min-width: 180px;\n      }\n      .pmc-portal-menu .menu-item {\n        display: flex;\n        align-items: center;\n        gap: 12px;\n        padding: 10px 16px;\n        border: none;\n        border-radius: 8px;\n        background: transparent;\n        color: var(--primary-text-color);\n        cursor: pointer;\n        transition: all 0.2s;\n        text-align: left;\n        font-size: 14px;\n        width: 100%;\n      }\n      .pmc-portal-menu .menu-item:hover {\n        background: var(--secondary-background-color, rgba(0, 0, 0, 0.05));\n      }\n      .pmc-portal-menu .menu-item ha-icon {\n        --mdc-icon-size: 20px;\n      }\n      .pmc-portal-menu .build-time {\n        padding: 8px 16px;\n        font-size: 11px;\n        color: var(--secondary-text-color, rgba(0, 0, 0, 0.5));\n        text-align: center;\n        border-top: 1px solid var(--divider-color, rgba(0, 0, 0, 0.1));\n        margin-top: 4px;\n        pointer-events: none;\n        user-select: text;\n      }\n    </style>\n      <div class="pmc-portal-backdrop"></div>\n      <div class="pmc-portal-menu" style="left: ${this._menuLeft}px; top: ${this._menuTop}px;">\n        ${t}\n      </div>\n    `;const e=this._portalContainer.querySelector(".pmc-portal-backdrop");e?.addEventListener("click",()=>{this._menuOpen=!1,this._updatePortalContent()});this._portalContainer.querySelectorAll(".menu-item").forEach(t=>{t.addEventListener("click",e=>{const o=t.dataset.action;if("more-info"===o)this.dispatchEvent(new CustomEvent("more-info",{bubbles:!0,composed:!0,detail:{entityId:this.entityId}}));else if("power-toggle"===o)this.dispatchEvent(new CustomEvent("power-toggle",{bubbles:!0,composed:!0}));else if("select-station"===o){const e=t.getBoundingClientRect();this.dispatchEvent(new CustomEvent("select-station",{bubbles:!0,composed:!0,detail:{anchorPosition:{left:e.left,top:e.top,bottom:e.bottom,right:e.right}}}))}else if("select-ratings"===o){const e=t.getBoundingClientRect();this.dispatchEvent(new CustomEvent("select-ratings",{bubbles:!0,composed:!0,detail:{anchorPosition:{left:e.left,top:e.top,bottom:e.bottom,right:e.right}}}))}else if("explain-song"===o)this.dispatchEvent(new CustomEvent("explain-song",{bubbles:!0,composed:!0}));else if("show-upcoming"===o){const e=t.getBoundingClientRect();this.dispatchEvent(new CustomEvent("show-upcoming",{bubbles:!0,composed:!0,detail:{anchorPosition:{left:e.left,top:e.top,bottom:e.bottom,right:e.right}}}))}else if("station-mode"===o){const e=t.getBoundingClientRect();this.dispatchEvent(new CustomEvent("station-mode",{bubbles:!0,composed:!0,detail:{anchorPosition:{left:e.left,top:e.top,bottom:e.bottom,right:e.right}}}))}else if("quickmix"===o){const e=t.getBoundingClientRect();this.dispatchEvent(new CustomEvent("quickmix",{bubbles:!0,composed:!0,detail:{anchorPosition:{left:e.left,top:e.top,bottom:e.bottom,right:e.right}}}))}else if("rename-station"===o){const e=t.getBoundingClientRect();this.dispatchEvent(new CustomEvent("rename-station",{bubbles:!0,composed:!0,detail:{anchorPosition:{left:e.left,top:e.top,bottom:e.bottom,right:e.right}}}))}this._menuOpen=!1,this._updatePortalContent()})})}render(){return H`
      <button
        class="trigger-button"
        @click=${this._toggleMenu}
        ?disabled=${this.disabled}
        title="More options"
      >
        <ha-icon icon="mdi:dots-vertical"></ha-icon>
      </button>
    `}_formatBuildTime(t){try{const e=new Date(t),o=e.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"});return`Built: ${o} ${e.toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit",hour12:!0})}`}catch{return`Built: ${t}`}}};jt.styles=r`
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
  `,t([ht({type:String})],jt.prototype,"entityId",void 0),t([ht({type:Boolean})],jt.prototype,"showStationOption",void 0),t([ht({type:Boolean})],jt.prototype,"showRatingsOption",void 0),t([ht({type:Boolean})],jt.prototype,"showExplainOption",void 0),t([ht({type:Boolean})],jt.prototype,"showUpcomingOption",void 0),t([ht({type:Boolean})],jt.prototype,"showStationModeOption",void 0),t([ht({type:Boolean})],jt.prototype,"showQuickMixOption",void 0),t([ht({type:Boolean})],jt.prototype,"showRenameOption",void 0),t([ht({type:Boolean})],jt.prototype,"isOn",void 0),t([ht({type:Boolean})],jt.prototype,"disabled",void 0),t([ht({type:String})],jt.prototype,"buildTime",void 0),t([ut()],jt.prototype,"_menuOpen",void 0),t([ut()],jt.prototype,"_menuTop",void 0),t([ut()],jt.prototype,"_menuLeft",void 0),jt=t([ct("pmc-overflow-menu")],jt);let Vt=class extends at{constructor(){super(...arguments),this.songs=[],this.disabled=!1,this.externalOpen=!1,this._menuOpen=!1,this._menuTop=0,this._menuLeft=0,this._ignoreNextClickOutside=!1}connectedCallback(){super.connectedCallback(),this._handleClickOutside=this._handleClickOutside.bind(this),document.addEventListener("click",this._handleClickOutside)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._handleClickOutside)}_handleClickOutside(t){this._ignoreNextClickOutside?this._ignoreNextClickOutside=!1:this._menuOpen&&!t.composedPath().includes(this)&&(this._menuOpen=!1,this.dispatchEvent(new CustomEvent("popup-closed",{bubbles:!0,composed:!0})))}firstUpdated(){this.externalOpen&&!this._menuOpen&&this._openPopupExternal()}updated(t){t.has("externalOpen")&&this.externalOpen&&!this._menuOpen&&this._openPopupExternal(),t.has("anchorPosition")&&this._menuOpen&&this.anchorPosition&&this._updateMenuPosition()}_openPopupExternal(){this._ignoreNextClickOutside=!0,requestAnimationFrame(()=>{this._openPopup()})}_openPopup(){this.disabled||(this._updateMenuPosition(),this._menuOpen=!0)}_updateMenuPosition(){if(this.anchorPosition){const t=350,e=Math.min(500,64*this.songs.length+50),o=8,i=4;let n=this.anchorPosition.left,s=this.anchorPosition.bottom+i;n=Math.max(o,Math.min(n,window.innerWidth-t-o)),s+e>window.innerHeight-o&&(s=this.anchorPosition.top-i-e,s=Math.max(o,s)),this._menuLeft=n,this._menuTop=s}}render(){return this.externalOpen?H`
      ${this._menuOpen?H`<div class="backdrop" @click=${()=>{this._menuOpen=!1}}></div>`:F}
      <div
        class="menu-popup ${this._menuOpen?"open":""}"
        style="left: ${this._menuLeft}px; top: ${this._menuTop}px;"
      >
        <div class="popup-header">Upcoming Songs</div>
        ${this.songs.length>0?this.songs.map(t=>this._renderSongItem(t)):H`<div class="no-songs">No upcoming songs</div>`}
      </div>
    `:F}_renderSongItem(t){return H`
      <div class="song-item">
        ${t.coverArt?H`<img class="song-artwork" src="${t.coverArt}" alt="" />`:H`
              <div class="song-artwork-placeholder">
                <ha-icon icon="mdi:music"></ha-icon>
              </div>
            `}
        <div class="song-info">
          <div class="song-title">${t.title}</div>
          <div class="song-artist">${t.artist}</div>
          ${t.stationName?H`
                <div class="song-station">
                  <ha-icon icon="mdi:radio"></ha-icon>
                  <span>${t.stationName}</span>
                </div>
              `:F}
          ${1===t.rating?H`
                <div class="song-rating">
                  <ha-icon icon="mdi:thumb-up"></ha-icon>
                </div>
              `:F}
        </div>
      </div>
    `}};Vt.styles=r`
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
      min-width: 300px;
      max-width: 400px;
      max-height: 500px;
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

    .backdrop {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 99998;
    }
  `,t([ht({type:Array})],Vt.prototype,"songs",void 0),t([ht({type:Boolean})],Vt.prototype,"disabled",void 0),t([ht({type:Boolean})],Vt.prototype,"externalOpen",void 0),t([ht({type:Object})],Vt.prototype,"anchorPosition",void 0),t([ut()],Vt.prototype,"_menuOpen",void 0),t([ut()],Vt.prototype,"_menuTop",void 0),t([ut()],Vt.prototype,"_menuLeft",void 0),Vt=t([ct("pmc-upcoming-songs-popup")],Vt);let Ht=class extends at{constructor(){super(...arguments),this.currentStationId="",this.currentStationName="",this.modes=[],this.loading=!1,this.disabled=!1,this.externalOpen=!1,this._menuOpen=!1,this._menuTop=0,this._menuLeft=0,this._selectedModeId=null,this._ignoreNextClickOutside=!1}connectedCallback(){super.connectedCallback(),this._handleClickOutside=this._handleClickOutside.bind(this),document.addEventListener("click",this._handleClickOutside)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._handleClickOutside)}_handleClickOutside(t){this._ignoreNextClickOutside?this._ignoreNextClickOutside=!1:this._menuOpen&&!t.composedPath().includes(this)&&this._closePopup()}firstUpdated(){this.externalOpen&&!this._menuOpen&&this._openPopupExternal()}updated(t){if(t.has("externalOpen")&&this.externalOpen&&!this._menuOpen&&this._openPopupExternal(),t.has("anchorPosition")&&this._menuOpen&&this.anchorPosition&&this._updateMenuPosition(),t.has("modes")&&this.modes.length>0){const t=this.modes.find(t=>t.active);t&&null===this._selectedModeId&&(this._selectedModeId=t.id)}}_openPopupExternal(){this._ignoreNextClickOutside=!0,requestAnimationFrame(()=>{this._openPopup()})}_openPopup(){if(!this.disabled){this._updateMenuPosition();const t=this.modes.find(t=>t.active);t&&(this._selectedModeId=t.id),this._menuOpen=!0}}_closePopup(){this._menuOpen=!1,this._selectedModeId=null,this.dispatchEvent(new CustomEvent("popup-closed",{bubbles:!0,composed:!0}))}_updateMenuPosition(){if(this.anchorPosition){const t=400,e=Math.min(600,80*this.modes.length+150),o=8,i=4;let n=this.anchorPosition.left,s=this.anchorPosition.bottom+i;n=Math.max(o,Math.min(n,window.innerWidth-t-o)),s+e>window.innerHeight-o&&(s=this.anchorPosition.top-i-e,s=Math.max(o,s)),this._menuLeft=n,this._menuTop=s}}_handleModeSelect(t){this._selectedModeId=t}_handleSetMode(){this.currentStationId&&null!==this._selectedModeId&&(this.dispatchEvent(new CustomEvent("set-mode",{bubbles:!0,composed:!0,detail:{stationId:this.currentStationId,modeId:this._selectedModeId}})),this._closePopup())}render(){return this.externalOpen?H`
      ${this._menuOpen?H`<div class="backdrop" @click=${this._closePopup}></div>`:F}
      <div
        class="menu-popup ${this._menuOpen?"open":""}"
        style="left: ${this._menuLeft}px; top: ${this._menuTop}px;"
      >
        <div class="popup-header">
          ${this.currentStationName?`Station Mode: ${this.currentStationName}`:"Station Mode"}
        </div>
        
        ${this.loading?H`<div class="loading">Loading modes...</div>`:0===this.modes.length?H`<div class="no-modes">No modes available</div>`:H`
                <div class="info-note">
                  Note: Changing the station mode will restart playback.
                </div>
                
                <div class="modes-list">
                  ${this.modes.map(t=>H`
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
                        ${t.active?H`<span class="mode-active-badge">Active</span>`:F}
                      </div>
                      <div class="mode-description">${t.description}</div>
                    </div>
                  `)}
                </div>
                
                <div class="popup-footer">
                  <button class="button-cancel" @click=${this._closePopup}>
                    Cancel
                  </button>
                  <button 
                    class="button-confirm"
                    ?disabled=${null===this._selectedModeId}
                    @click=${this._handleSetMode}
                  >
                    Set Mode
                  </button>
                </div>
              `}
      </div>
    `:F}};Ht.styles=r`
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
      max-height: 600px;
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
  `,t([ht({type:String})],Ht.prototype,"currentStationId",void 0),t([ht({type:String})],Ht.prototype,"currentStationName",void 0),t([ht({type:Array})],Ht.prototype,"modes",void 0),t([ht({type:Boolean})],Ht.prototype,"loading",void 0),t([ht({type:Boolean})],Ht.prototype,"disabled",void 0),t([ht({type:Boolean})],Ht.prototype,"externalOpen",void 0),t([ht({type:Object})],Ht.prototype,"anchorPosition",void 0),t([ut()],Ht.prototype,"_menuOpen",void 0),t([ut()],Ht.prototype,"_menuTop",void 0),t([ut()],Ht.prototype,"_menuLeft",void 0),t([ut()],Ht.prototype,"_selectedModeId",void 0),Ht=t([ct("pmc-station-mode-popup")],Ht);let qt=class extends at{constructor(){super(...arguments),this.stations=[],this.disabled=!1,this.externalOpen=!1,this._menuOpen=!1,this._menuTop=0,this._menuLeft=0,this._showAbove=!0,this._selectedStationIds=new Set,this._ignoreNextClickOutside=!1}connectedCallback(){super.connectedCallback(),this._handleClickOutside=this._handleClickOutside.bind(this),document.addEventListener("click",this._handleClickOutside)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._handleClickOutside)}_handleClickOutside(t){this._ignoreNextClickOutside?this._ignoreNextClickOutside=!1:this._menuOpen&&!t.composedPath().includes(this)&&(this._menuOpen=!1,this.dispatchEvent(new CustomEvent("popup-closed",{bubbles:!0,composed:!0})))}firstUpdated(){this.externalOpen&&!this._menuOpen&&this._openPopupExternal()}updated(t){t.has("externalOpen")&&this.externalOpen&&!this._menuOpen&&this._openPopupExternal(),t.has("anchorPosition")&&this._menuOpen&&this.anchorPosition&&this._updateMenuPosition(),(t.has("stations")||t.has("externalOpen"))&&this._initializeSelection()}_initializeSelection(){this._selectedStationIds=new Set(this.stations.filter(t=>t.isQuickMixed&&!t.isQuickMix).map(t=>t.id))}_openPopupExternal(){this._ignoreNextClickOutside=!0,requestAnimationFrame(()=>{this._openPopup()})}_openPopup(){this.disabled||(this._updateMenuPosition(),this._menuOpen=!0)}_updateMenuPosition(){if(!this.anchorPosition)return;const t=this.stations.filter(t=>!t.isQuickMix).length,e=Math.min(500,50*t+80);let o=this.anchorPosition.left+(this.anchorPosition.right-this.anchorPosition.left)/2,i=this.anchorPosition.bottom+4;o-=140;o=Math.max(8,Math.min(o,window.innerWidth-280-8)),i=Math.min(i,window.innerHeight-e-8),i+e>window.innerHeight-8?(i=this.anchorPosition.top-4-e,i=Math.max(8,i),this._showAbove=!0):this._showAbove=!1,this._menuLeft=o,this._menuTop=i}_handleCheckboxChange(t,e){e?this._selectedStationIds.add(t):this._selectedStationIds.delete(t),this.requestUpdate()}_handleSave(){const t=Array.from(this._selectedStationIds);this.dispatchEvent(new CustomEvent("save",{bubbles:!0,composed:!0,detail:{stationIds:t}})),this._menuOpen=!1,this.dispatchEvent(new CustomEvent("popup-closed",{bubbles:!0,composed:!0}))}_handleCancel(){this._menuOpen=!1,this.dispatchEvent(new CustomEvent("popup-closed",{bubbles:!0,composed:!0}))}render(){if(!this.externalOpen&&!this._menuOpen)return F;const t=this.stations.filter(t=>!t.isQuickMix);return H`
      <div class="backdrop" @click=${this._handleClickOutside}></div>
      <div
        class="menu-popup ${this._menuOpen?"open":""}"
        style=${_t({left:`${this._menuLeft}px`,top:`${this._menuTop}px`,transform:`translateX(-50%) translateY(${this._showAbove?"-100%":"0"})`})}
      >
        <div class="header">Select QuickMix Stations</div>
        
        ${0===t.length?H`<div class="no-stations">No stations available</div>`:H`
              <div class="list-container">
                ${t.map(t=>H`
                    <div class="list-item ${this.disabled?"disabled":""}">
                      <label>
                        <input
                          type="checkbox"
                          .checked=${this._selectedStationIds.has(t.id)}
                          ?disabled=${this.disabled}
                          @change=${e=>this._handleCheckboxChange(t.id,e.target.checked)}
                        />
                        <span class="item-name">${t.name}</span>
                      </label>
                    </div>
                  `)}
              </div>
              
              <div class="footer">
                <button class="cancel" @click=${this._handleCancel} ?disabled=${this.disabled}>
                  Cancel
                </button>
                <button class="save" @click=${this._handleSave} ?disabled=${this.disabled}>
                  Save
                </button>
              </div>
            `}
      </div>
    `}};qt.styles=r`
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
      min-width: 280px;
      max-width: 350px;
      max-height: 500px;
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

    .backdrop {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 99998;
    }
  `,t([ht({type:Array})],qt.prototype,"stations",void 0),t([ht({type:Boolean})],qt.prototype,"disabled",void 0),t([ht({type:Boolean})],qt.prototype,"externalOpen",void 0),t([ht({type:Object})],qt.prototype,"anchorPosition",void 0),t([ut()],qt.prototype,"_menuOpen",void 0),t([ut()],qt.prototype,"_menuTop",void 0),t([ut()],qt.prototype,"_menuLeft",void 0),t([ut()],qt.prototype,"_showAbove",void 0),t([ut()],qt.prototype,"_selectedStationIds",void 0),qt=t([ct("pmc-quickmix-popup")],qt);let Ft=class extends at{constructor(){super(...arguments),this.stations=[],this.disabled=!1,this.externalOpen=!1,this._dialogOpen=!1,this._dialogTop=0,this._dialogLeft=0,this._stage="select-station",this._selectedStationId=null,this._selectedStationName="",this._newName="",this._ignoreNextClickOutside=!1}connectedCallback(){super.connectedCallback(),this._handleClickOutside=this._handleClickOutside.bind(this),document.addEventListener("click",this._handleClickOutside)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._handleClickOutside)}_handleClickOutside(t){this._ignoreNextClickOutside?this._ignoreNextClickOutside=!1:this._dialogOpen&&!t.composedPath().includes(this)&&this._handleCancel()}firstUpdated(){this.externalOpen&&!this._dialogOpen&&this._openDialogExternal()}updated(t){t.has("externalOpen")&&this.externalOpen&&!this._dialogOpen&&this._openDialogExternal()}_openDialogExternal(){this._ignoreNextClickOutside=!0,requestAnimationFrame(()=>{this._openDialog()})}_openDialog(){this.disabled||(this._updateDialogPosition(),this._dialogOpen=!0)}_updateDialogPosition(){this._dialogLeft=window.innerWidth/2,this._dialogTop=window.innerHeight/2}_handleStationSelect(t,e){this._selectedStationId=t,this._selectedStationName=e,this.requestUpdate()}_handleNext(){this._selectedStationId&&(this._stage="enter-name",this._newName=this._selectedStationName,this.requestUpdate())}_handleBack(){this._stage="select-station",this._newName="",this.requestUpdate()}_handleNameInput(t){const e=t.target;this._newName=e.value,this.requestUpdate()}_handleRename(){this._selectedStationId&&this._newName.trim()&&this._newName!==this._selectedStationName&&(this.dispatchEvent(new CustomEvent("rename-station",{bubbles:!0,composed:!0,detail:{stationId:this._selectedStationId,newName:this._newName.trim()}})),this._handleClose())}_handleCancel(){this._handleClose()}_handleClose(){this._dialogOpen=!1,this._stage="select-station",this._selectedStationId=null,this._selectedStationName="",this._newName="",this.dispatchEvent(new CustomEvent("dialog-closed",{bubbles:!0,composed:!0}))}_renderSelectStation(){const t=this.stations.filter(t=>!t.isQuickMix);return H`
      <div class="dialog-header">Rename Station</div>
      <div class="dialog-body">
        ${0===t.length?H`<div class="no-stations">No stations available to rename</div>`:H`
              <div class="station-list">
                ${t.map(t=>H`
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
        <button class="cancel" @click=${this._handleCancel} ?disabled=${this.disabled}>
          Cancel
        </button>
        <button class="confirm" @click=${this._handleNext} ?disabled=${!this._selectedStationId||this.disabled}>
          Next
        </button>
      </div>
    `}_renderEnterName(){const t=this._newName.trim()&&this._newName!==this._selectedStationName;return H`
      <div class="dialog-header">Rename: ${this._selectedStationName}</div>
      <div class="dialog-body">
        <div class="name-input-section">
          <div class="current-station">
            Current name: <strong>${this._selectedStationName}</strong>
          </div>
          
          <input
            type="text"
            class="name-input"
            placeholder="Enter new station name"
            .value=${this._newName}
            ?disabled=${this.disabled}
            @input=${this._handleNameInput}
            @keydown=${e=>{"Enter"===e.key&&t&&!this.disabled&&this._handleRename()}}
            autofocus
          />
          
          <div class="info-note">
            Note: Pandora may not allow some stations to be renamed.
          </div>
        </div>
      </div>
      <div class="dialog-footer">
        <button class="back" @click=${this._handleBack} ?disabled=${this.disabled}>
          Back
        </button>
        <button class="cancel" @click=${this._handleCancel} ?disabled=${this.disabled}>
          Cancel
        </button>
        <button class="confirm" @click=${this._handleRename} ?disabled=${!t||this.disabled}>
          Rename
        </button>
      </div>
    `}render(){return this.externalOpen||this._dialogOpen?H`
      <div class="backdrop" @click=${this._handleClickOutside}></div>
      <div
        class="dialog ${this._dialogOpen?"open":""}"
        style=${_t({left:`${this._dialogLeft}px`,top:`${this._dialogTop}px`})}
      >
        ${"select-station"===this._stage?this._renderSelectStation():this._renderEnterName()}
      </div>
    `:F}};Ft.styles=r`
    :host {
      position: relative;
      display: inline-block;
    }

    .dialog {
      position: fixed;
      background: var(--pmc-card-background);
      border-radius: 12px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
      padding: 0;
      display: flex;
      flex-direction: column;
      z-index: 99999;
      min-width: 320px;
      max-width: 450px;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.2s, visibility 0.2s;
      transform: translate(-50%, -50%);
    }

    .dialog.open {
      opacity: 1;
      visibility: visible;
    }

    .dialog-header {
      padding: 16px 20px;
      font-weight: 600;
      font-size: 18px;
      color: var(--primary-text-color);
      border-bottom: 1px solid var(--pmc-divider);
    }

    .dialog-body {
      padding: 20px;
      max-height: 400px;
      overflow-y: auto;
    }

    .station-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .station-item {
      display: flex;
      align-items: center;
      padding: 12px;
      border-radius: 8px;
      background: transparent;
      transition: background 0.2s;
      cursor: pointer;
    }

    .station-item:hover:not(.disabled) {
      background: var(--pmc-secondary-background);
    }

    .station-item.disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .station-item label {
      display: flex;
      align-items: center;
      gap: 12px;
      width: 100%;
      cursor: pointer;
    }

    .station-item.disabled label {
      cursor: not-allowed;
    }

    .station-item input[type="radio"] {
      width: 20px;
      height: 20px;
      cursor: pointer;
      margin: 0;
      flex-shrink: 0;
    }

    .station-item.disabled input[type="radio"] {
      cursor: not-allowed;
    }

    .station-name {
      flex: 1;
      font-size: 14px;
      color: var(--primary-text-color);
    }

    .name-input-section {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .current-station {
      font-size: 14px;
      color: var(--secondary-text-color);
    }

    .current-station strong {
      color: var(--primary-text-color);
    }

    .name-input {
      width: 100%;
      padding: 12px 16px;
      border: 1px solid var(--pmc-divider);
      border-radius: 8px;
      background: var(--pmc-card-background);
      color: var(--primary-text-color);
      font-size: 16px;
      font-family: inherit;
      box-sizing: border-box;
    }

    .name-input:focus {
      outline: none;
      border-color: var(--primary-color);
    }

    .info-note {
      padding: 12px;
      background: var(--pmc-secondary-background);
      border-radius: 8px;
      font-size: 13px;
      color: var(--secondary-text-color);
      line-height: 1.4;
    }

    .dialog-footer {
      display: flex;
      gap: 8px;
      padding: 16px 20px;
      border-top: 1px solid var(--pmc-divider);
      justify-content: flex-end;
    }

    .dialog-footer button {
      padding: 8px 16px;
      border-radius: 8px;
      border: none;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
    }

    .dialog-footer button.back {
      margin-right: auto;
      background: transparent;
      color: var(--primary-text-color);
    }

    .dialog-footer button.back:hover {
      background: var(--pmc-secondary-background);
    }

    .dialog-footer button.cancel {
      background: transparent;
      color: var(--primary-text-color);
    }

    .dialog-footer button.cancel:hover {
      background: var(--pmc-secondary-background);
    }

    .dialog-footer button.confirm {
      background: var(--primary-color);
      color: var(--text-primary-color);
    }

    .dialog-footer button.confirm:hover {
      opacity: 0.9;
    }

    .dialog-footer button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .no-stations {
      padding: 16px;
      text-align: center;
      color: var(--secondary-text-color);
    }

    .backdrop {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 99998;
    }
  `,t([ht({type:Array})],Ft.prototype,"stations",void 0),t([ht({type:Boolean})],Ft.prototype,"disabled",void 0),t([ht({type:Boolean})],Ft.prototype,"externalOpen",void 0),t([ht({type:Object})],Ft.prototype,"anchorPosition",void 0),t([ut()],Ft.prototype,"_dialogOpen",void 0),t([ut()],Ft.prototype,"_dialogTop",void 0),t([ut()],Ft.prototype,"_dialogLeft",void 0),t([ut()],Ft.prototype,"_stage",void 0),t([ut()],Ft.prototype,"_selectedStationId",void 0),t([ut()],Ft.prototype,"_selectedStationName",void 0),t([ut()],Ft.prototype,"_newName",void 0),Ft=t([ct("pmc-rename-dialog")],Ft);const Qt=function(t){try{return new Date(t).toLocaleString()}catch{return t}}("2026-01-05T04:16:12.691Z"),Wt=[{name:"entity",required:!0,selector:{entity:{domain:"media_player"}}}],Gt=[{name:"mode",selector:{select:{mode:"dropdown",options:[{value:"default",label:"Default - Standard layout with artwork on right"},{value:"full",label:"Full - Full-cover artwork background"},{value:"minimal",label:"Minimal - Compact view with minimal controls"},{value:"tall",label:"Tall - Vertical layout with artwork on top"},{value:"custom",label:"Custom - Full control over all options"}]}}}],Xt=[{name:"name",selector:{text:{}}},{name:"volume_entity",selector:{entity:{domain:"media_player"}}}],Yt=[{name:"artwork",selector:{select:{mode:"dropdown",options:[{value:"default",label:"Compact (right side)"},{value:"full-cover",label:"Full Cover (background)"},{value:"tall",label:"Tall (artwork on top)"}]}}}],Zt=[{name:"stationDisplay",selector:{select:{mode:"dropdown",options:[{value:"hidden",label:"Hidden"},{value:"compact",label:"Compact (icon only)"},{value:"normal",label:"Normal (icon + station name)"}]}}}];let Jt=class extends at{constructor(){super(...arguments),this._activeTab="general"}setConfig(t){this._config=t}_updateConfig(t,e){if(!this._config)return;const o={...this._config};""===e||null==e?delete o[t]:o[t]=e,this._config=o,this._fireConfigChanged()}_fireConfigChanged(){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0}))}_valueChanged(t){const e=t.detail;e.value&&Object.entries(e.value).forEach(([t,e])=>{this._updateConfig(t,e)})}_handleAppearanceChange(t){const e=t.detail;if(!e.value||!this._config)return;const o={...this._config,...e.value},i=wt(o);o.mode=i,this._config=o,this._fireConfigChanged()}_handleControlsChange(t){const e=t.detail;if(!e.value||!this._config)return;const o={...this._config,...e.value},i=wt(o);o.mode=i,this._config=o,this._fireConfigChanged()}_setActiveTab(t){this._activeTab=t}_computeLabel(t){return{entity:"Entity",name:"Custom Name",volume_entity:"Volume Entity",artwork:"Artwork Style",stationDisplay:"Station Selector"}[t.name]||t.name}_computeHelper(t){return{entity:"Select any media player entity",name:"Leave empty to use entity name",volume_entity:"Override volume control to a different media player (e.g., Sonos speaker)"}[t.name]||""}_supportsAnyRating(){if(!this.hass||!this._config?.entity)return!1;const t=this.hass.states[this._config.entity],e=t?.attributes?.supported_actions||[];return e.includes("love_song")||e.includes("ban_song")||e.includes("tired_of_song")}_renderGeneralTab(){return H`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Wt}
        .computeLabel=${this._computeLabel}
        .computeHelper=${this._computeHelper}
        @value-changed=${this._valueChanged}
      ></ha-form>

      <div class="section-title">Mode</div>
      <ha-form
        .hass=${this.hass}
        .data=${{mode:this._config?.mode||"default"}}
        .schema=${Gt}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `}_renderAppearanceTab(){const t=xt(this._config?.mode||"default"),e={...this._config,artwork:this._config?.artwork??t.artwork},o=this._config?.stationDisplay??t.stationDisplay,i=this._supportsStations();return H`
      <ha-form
        .hass=${this.hass}
        .data=${e}
        .schema=${Yt}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._handleAppearanceChange}
      ></ha-form>

      <div class="section-title">Station Selector</div>
      ${i?H`
            <ha-form
              .hass=${this.hass}
              .data=${{stationDisplay:o}}
              .schema=${Zt}
              .computeLabel=${this._computeLabel}
              @value-changed=${this._handleAppearanceChange}
            ></ha-form>
          `:H`<p class="helper-text">Station selector requires a Pianobar media player entity</p>`}
    `}_handleCheckboxChange(t,e){const o=e.target,i={...this._config,[t]:o.checked},n=wt(i);i.mode=n,this._config=i,this._fireConfigChanged()}_renderCheckbox(t,e,o,i=!1,n=!1){return H`
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
    `}_supportsStations(){if(!this.hass||!this._config?.entity)return!1;const t=this.hass.states[this._config.entity],e=t?.attributes?.stations;return Array.isArray(e)&&e.length>0}_renderControlsTab(){const t=xt(this._config?.mode||"default"),e=this._config?.showPlaybackControls??t.showPlaybackControls,o=this._config?.showPowerButton??t.showPowerButton,i=this._config?.showSongActions??t.showSongActions,n=this._config?.showProgressBar??t.showProgressBar,s=this._config?.showProgressTime??t.showProgressTime,r=this._config?.showVolumeControl??t.showVolumeControl,a=this._config?.showDetails??t.showDetails,l=this._config?.showTitle??t.showTitle,c=this._config?.showArtist??t.showArtist,d=this._config?.showAlbum??t.showAlbum,p=this._config?.reserveDetailsSpace??t.reserveDetailsSpace,h=this._supportsAnyRating();return H`
      ${this._renderCheckbox("showPlaybackControls","Show playback controls",e)}
      ${this._renderCheckbox("showPowerButton","Show power button",o,!0,!e)}
      ${this._renderCheckbox("showSongActions","Show song actions (thumbs)",!!h&&i,!0,!e||!h)}

      ${this._renderCheckbox("showProgressBar","Show progress bar",n)}
      ${this._renderCheckbox("showProgressTime","Show progress time",s,!0,!n)}

      ${this._renderCheckbox("showVolumeControl","Show volume control",r)}

      ${this._renderCheckbox("showDetails","Show details",a)}
      ${this._renderCheckbox("showTitle","Show title",l,!0,!a)}
      ${this._renderCheckbox("showArtist","Show artist",c,!0,!a)}
      ${this._renderCheckbox("showAlbum","Show album",d,!0,!a)}
      ${this._renderCheckbox("reserveDetailsSpace","Reserve space on card",p,!0,!a)}
    `}_renderAdvancedTab(){return H`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Xt}
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
          Build: ${Qt}
        </div>
      </div>
    `}};Jt.styles=r`
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
  `,t([ht({attribute:!1})],Jt.prototype,"hass",void 0),t([ht({attribute:!1})],Jt.prototype,"lovelace",void 0),t([ut()],Jt.prototype,"_config",void 0),t([ut()],Jt.prototype,"_activeTab",void 0),Jt=t([ct("pianobar-card-editor")],Jt);console.info("%c PIANOBAR-MEDIA-PLAYER-CARD %c 1.0.0 ","color: white; background: #764ba2; font-weight: bold;","color: #764ba2; background: white; font-weight: bold;"),window.customCards=window.customCards||[],window.customCards.push({type:"pianobar-media-player-card",name:"Pianobar Media Player Card",description:"A custom media player card for Pianobar with thumbs up/down and volume override",preview:!0});let Kt=class extends at{constructor(){super(...arguments),this._cardHeight=0,this._stationPopupOpen=!1,this._ratingsPopupOpen=!1,this._upcomingPopupOpen=!1,this._stationModePopupOpen=!1,this._upcomingSongs=[],this._stationModes=[],this._stationModesLoading=!1,this._openQuickMixPopup=!1,this._openRenameDialog=!1,this._tallArtworkError=!1}static getConfigElement(){return document.createElement("pianobar-card-editor")}static getStubConfig(){return{type:"custom:pianobar-media-player-card",entity:"",mode:"default"}}setConfig(t){if(!t.entity)throw new Error("Please define an entity");this._config=t,this._resolvedConfig=function(t){const e=t.mode||"default",o=yt[e];return"custom"===e?{entity:t.entity,mode:e,artwork:t.artwork??o.artwork,showDetails:t.showDetails??o.showDetails,showTitle:t.showTitle??o.showTitle,showArtist:t.showArtist??o.showArtist,showAlbum:t.showAlbum??o.showAlbum,reserveDetailsSpace:t.reserveDetailsSpace??o.reserveDetailsSpace,showVolumeControl:t.showVolumeControl??o.showVolumeControl,showSongActions:t.showSongActions??o.showSongActions,showProgressBar:t.showProgressBar??o.showProgressBar,showProgressTime:t.showProgressTime??o.showProgressTime,showPlaybackControls:t.showPlaybackControls??o.showPlaybackControls,showPowerButton:t.showPowerButton??o.showPowerButton,stationDisplay:t.stationDisplay??o.stationDisplay,volume_entity:t.volume_entity,name:t.name}:{entity:t.entity,mode:e,artwork:o.artwork,showDetails:o.showDetails,showTitle:o.showTitle,showArtist:o.showArtist,showAlbum:o.showAlbum,reserveDetailsSpace:o.reserveDetailsSpace,showVolumeControl:o.showVolumeControl,showSongActions:o.showSongActions,showProgressBar:o.showProgressBar,showProgressTime:t.showProgressTime??o.showProgressTime,showPlaybackControls:o.showPlaybackControls,showPowerButton:t.showPowerButton??o.showPowerButton,stationDisplay:t.stationDisplay??o.stationDisplay,volume_entity:t.volume_entity,name:t.name}}(t)}disconnectedCallback(){super.disconnectedCallback(),this._resizeObserver?.disconnect()}firstUpdated(){this._setupResizeObserver()}_setupResizeObserver(){this._resizeObserver=new ResizeObserver(t=>{for(const e of t){const t=e.contentRect.height;t!==this._cardHeight&&(this._cardHeight=t)}});const t=this.shadowRoot?.querySelector("ha-card");t?this._resizeObserver.observe(t):this._resizeObserver.observe(this)}getCardSize(){return"minimal"===this._resolvedConfig?.mode?2:"full-cover"===this._resolvedConfig?.artwork?4:3}updated(t){if(super.updated(t),this._resolvedConfig&&(this.setAttribute("artwork-mode",this._resolvedConfig.artwork),this.setAttribute("mode",this._resolvedConfig.mode)),t.has("hass")&&this.hass&&this._config?.entity){const t=this.hass.states[this._config.entity];if(t){const e=t.attributes.entity_picture;e&&e!==this._lastImageUrl&&(this._lastImageUrl=e,this._tallArtworkError=!1,this._updateColors(e))}}}async _updateColors(t){const e="full-cover"===this._resolvedConfig?.artwork?await async function(t){const e=await Et(t);if(!t)return e;const o=`regional:${t}`,i=Ot.get(o);if(i)return i;try{const i=new Image;i.crossOrigin="anonymous",await new Promise((e,o)=>{i.onload=()=>e(),i.onerror=()=>o(new Error("Failed to load image")),i.src=t});const n=document.createElement("canvas"),s=n.getContext("2d");if(!s)return e;const r=100,a=Math.min(r/i.width,r/i.height);n.width=Math.floor(i.width*a),n.height=Math.floor(i.height*a),s.drawImage(i,0,0,n.width,n.height);const l=s.getImageData(0,0,n.width,n.height),c=Lt(l,Tt,n.width,n.height),d=Lt(l,Dt,n.width,n.height),p=zt(c,.3),h=zt(d,.7),u={...e,metadataForeground:p,controlsForeground:h};return Ot.set(o,u),u}catch(t){return console.error("Error extracting regional colors:",t),e}}(t):await Et(t);this._extractedColors=e}_getEntity(){if(this.hass&&this._config?.entity)return this.hass.states[this._config.entity]}_getVolumeEntity(){if(!this.hass)return;const t=this._resolvedConfig?.volume_entity||this._config?.entity;return t?this.hass.states[t]:void 0}_isPlaying(t){return"playing"===t.state}_isUnavailable(t){return"unavailable"===t.state||"unknown"===t.state}_getSupportedActions(){const t=this._getEntity();return t?.attributes?.supported_actions||[]}_supportsLove(){return this._getSupportedActions().includes("love_song")}_supportsBan(){return this._getSupportedActions().includes("ban_song")}_supportsTired(){return this._getSupportedActions().includes("tired_of_song")}_supportsAnyRating(t){const e=t.attributes.supported_actions;return!(!e||!Array.isArray(e))&&(e.includes("love_song")||e.includes("ban_song")||e.includes("tired_of_song"))}async _handlePlayPause(){const t=this._getEntity();t&&this.hass&&await this.hass.callService("media_player","media_play_pause",void 0,{entity_id:t.entity_id})}async _handleNextTrack(){const t=this._getEntity();t&&this.hass&&await this.hass.callService("media_player","media_next_track",void 0,{entity_id:t.entity_id})}async _handlePowerToggle(){const t=this._getEntity();if(!t||!this.hass)return;const e="off"!==t.state&&"unavailable"!==t.state?"turn_off":"turn_on";await this.hass.callService("media_player",e,void 0,{entity_id:t.entity_id})}async _handleVolumeChange(t){const e=this._getVolumeEntity();if(!e||!this.hass)return;const o=t.detail.volume;await this.hass.callService("media_player","volume_set",{volume_level:o},{entity_id:e.entity_id})}async _handleMuteToggle(){const t=this._getVolumeEntity();t&&this.hass&&await this.hass.callService("media_player","volume_mute",{is_volume_muted:!t.attributes.is_volume_muted},{entity_id:t.entity_id})}async _handleLoveSong(){this.hass&&await this.hass.callService("pianobar","love_song",{})}async _handleBanSong(){this.hass&&await this.hass.callService("pianobar","ban_song",{})}async _handleTiredSong(){this.hass&&await this.hass.callService("pianobar","tired_of_song",{})}async _handleStationChange(t){const e=this._getEntity();if(!e||!this.hass)return;const{stationName:o}=t.detail;await this.hass.callService("media_player","select_source",{source:o},{entity_id:e.entity_id})}_renderArtwork(t){const e=t.attributes.media_image_url||t.attributes.entity_picture;return e?H`<img class="artwork" src="${e}" alt="Album artwork" />`:H`
      <div class="artwork-placeholder">
        <ha-icon icon="mdi:music"></ha-icon>
      </div>
    `}_renderMediaInfo(t){if(!(this._resolvedConfig?.showDetails??!0))return F;const e=t.attributes.media_title||"No media",o=t.attributes.media_artist||"",i=t.attributes.media_album_name||"",n=this._resolvedConfig?.showTitle??!0,s=this._resolvedConfig?.showArtist??!0,r=this._resolvedConfig?.showAlbum??!0,a="tall"===this._resolvedConfig?.artwork,l="normal"===(this._resolvedConfig?.stationDisplay??"hidden")&&!a,c=t.attributes.stations||[],d=t.attributes.source||"",p=c.find(t=>t.name===d),h=p?.isQuickMix??!1,u=t.attributes.song_station_name||"",m=h&&u?u:d,g=h?"mdi:shuffle":"mdi:radio";return n||s||r||l?H`
      <div class="media-info">
        ${n?H`<p class="title">${e}</p>`:F}
        ${s&&o?H`<p class="artist">${o}</p>`:F}
        ${r&&i?H`<p class="album">${i}</p>`:F}
        ${l&&m?H`
          <p class="station-info clickable" @click=${this._handleOpenStationPopup}>
            <ha-icon icon="${g}"></ha-icon>
            <span>${m}</span>
          </p>
        `:F}
      </div>
    `:F}_renderProgressBar(t){if(!this._resolvedConfig?.showProgressBar)return F;const e=t.attributes.media_duration||0,o=t.attributes.media_position||0,i=t.attributes.media_position_updated_at||"",n=t.attributes.entity_picture,s="tall"===this._resolvedConfig?.artwork,r=!!n&&!s,a="full-cover"===this._resolvedConfig?.artwork?this._extractedColors?.controlsForeground||this._extractedColors?.foreground||"var(--pmc-primary-text-color)":this._extractedColors?.foreground||"var(--pmc-primary-text-color)",l=this._resolvedConfig?.showProgressTime??!1,c=this._isPlaying(t);return H`
      <pmc-progress-bar
        .duration=${e}
        .position=${o}
        .positionUpdatedAt=${i}
        .showTime=${l}
        .isPlaying=${c}
        style="color: ${r?a:"inherit"}"
      ></pmc-progress-bar>
    `}_renderVolumeControl(){if(!this._resolvedConfig?.showVolumeControl)return F;const t=this._getVolumeEntity();if(!t)return F;const e=t.attributes.volume_level??.5,o=t.attributes.is_volume_muted??!1,i=this._isUnavailable(t),n=this._getEntity(),s="tall"===this._resolvedConfig?.artwork,r="full-cover"===this._resolvedConfig?.artwork,a=!!n?.attributes.entity_picture&&!s,l=r?this._extractedColors?.controlsForeground||this._extractedColors?.foreground||"var(--pmc-primary-text-color)":this._extractedColors?.foreground||"var(--pmc-primary-text-color)";return H`
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
    `}_renderSongActions(t){if(!this._resolvedConfig?.showSongActions)return F;if(!!!t.attributes.media_title)return F;const e=this._supportsLove(),o=this._supportsBan(),i=this._supportsTired();if(!e&&!o&&!i)return F;const n=t.attributes.rating||0,s=this._isUnavailable(t);return H`
      <pmc-song-actions-menu
        .rating=${n}
        .disabled=${s}
        .showLove=${e}
        .showBan=${o}
        .showTired=${i}
        @love-song=${this._handleLoveSong}
        @ban-song=${this._handleBanSong}
        @tired-song=${this._handleTiredSong}
      ></pmc-song-actions-menu>
    `}_renderStationSelector(t){if("compact"!==(this._resolvedConfig?.stationDisplay??"hidden"))return F;const e=t.attributes.stations||[];if(0===e.length)return F;const o=t.attributes.source||"",i=e.find(t=>t.name===o),n=i?.id||"",s=t.attributes.song_station_name||"",r=this._isUnavailable(t);return H`
      <pmc-station-selector
        .stations=${e}
        .currentStationId=${n}
        .currentStationName=${o}
        .songStationName=${s}
        .disabled=${r}
        @station-change=${this._handleStationChange}
      ></pmc-station-selector>
    `}_renderOverflowMenu(t){const e=t.attributes.stations||[],o=e.length>0,i=this._supportsAnyRating(t),n=!!t.attributes.media_title,s="off"!==t.state&&"unavailable"!==t.state,r=e.find(e=>e.id===t.attributes.media_content_id),a=s&&o&&r&&!r.isQuickMix,l=s&&o,c=s&&o;return H`
      <pmc-overflow-menu
        class="overflow-menu"
        .entityId=${t.entity_id}
        .showStationOption=${o}
        .showRatingsOption=${i}
        .showExplainOption=${n}
        .showUpcomingOption=${s}
        .showStationModeOption=${a}
        .showQuickMixOption=${l}
        .showRenameOption=${c}
        .isOn=${s}
        .disabled=${this._isUnavailable(t)}
        .buildTime=${"2026-01-05T04:16:12.691Z"}
        @more-info=${this._handleMoreInfo}
        @power-toggle=${this._handlePowerToggle}
        @select-station=${this._handleOpenStationPopup}
        @select-ratings=${this._handleOpenRatingsPopup}
        @explain-song=${this._handleExplainSong}
        @show-upcoming=${this._handleShowUpcoming}
        @station-mode=${this._handleStationMode}
        @quickmix=${this._handleQuickMix}
        @rename-station=${this._handleRenameStation}
      ></pmc-overflow-menu>
    `}_handleMoreInfo(t){const e=new Event("hass-more-info",{composed:!0});e.detail={entityId:t.detail?.entityId},this.dispatchEvent(e)}async _handleExplainSong(){const t=this._getEntity();if(t&&this.hass)try{const e=await this.hass.callService("pianobar","explain_song",{},{entity_id:t.entity_id},!0),o=new CustomEvent("hass-notification",{detail:{message:e?.explanation||"No explanation available",duration:8e3},bubbles:!0,composed:!0});this.dispatchEvent(o)}catch(t){console.error("Error explaining song:",t);const e=new CustomEvent("hass-notification",{detail:{message:"Failed to get song explanation",duration:3e3},bubbles:!0,composed:!0});this.dispatchEvent(e)}}_handleOpenStationPopup(t){this._popupAnchorPosition=t.detail?.anchorPosition,this._stationPopupOpen=!0}_handleStationPopupClosed(){this._stationPopupOpen=!1,this._popupAnchorPosition=void 0}_handleOpenRatingsPopup(t){this._popupAnchorPosition=t.detail?.anchorPosition,this._ratingsPopupOpen=!0}_handleRatingsPopupClosed(){this._ratingsPopupOpen=!1,this._popupAnchorPosition=void 0}async _handleShowUpcoming(t){const e=this._getEntity();if(e&&this.hass){this._popupAnchorPosition=t.detail?.anchorPosition;try{const t=await this.hass.callService("pianobar","get_upcoming",{},{entity_id:e.entity_id},!0);this._upcomingSongs=t?.songs||[],this._upcomingPopupOpen=!0}catch(t){console.error("Error getting upcoming songs:",t);const e=new CustomEvent("hass-notification",{detail:{message:"Failed to get upcoming songs",duration:3e3},bubbles:!0,composed:!0});this.dispatchEvent(e)}}}_handleUpcomingPopupClosed(){this._upcomingPopupOpen=!1,this._popupAnchorPosition=void 0}async _handleStationMode(t){const e=this._getEntity();if(e&&this.hass){this._popupAnchorPosition=t.detail?.anchorPosition,this._stationModesLoading=!0,this._stationModePopupOpen=!0;try{const t=e.attributes.media_content_id;if(!t)throw new Error("No station selected");const o=await this.hass.callService("pianobar","get_station_modes",{station_id:t},{entity_id:e.entity_id},!0);this._stationModes=o?.modes||[]}catch(t){console.error("Error getting station modes:",t);const e=new CustomEvent("hass-notification",{detail:{message:"Failed to get station modes",duration:3e3},bubbles:!0,composed:!0});this.dispatchEvent(e),this._stationModePopupOpen=!1}finally{this._stationModesLoading=!1}}}_handleStationModePopupClosed(){this._stationModePopupOpen=!1,this._popupAnchorPosition=void 0,this._stationModes=[]}async _handleSetStationMode(t){const e=this._getEntity();if(!e||!this.hass)return;const{stationId:o,modeId:i}=t.detail;try{await this.hass.callService("pianobar","set_station_mode",{station_id:o,mode_id:i},{entity_id:e.entity_id});const t=new CustomEvent("hass-notification",{detail:{message:"Station mode updated",duration:2e3},bubbles:!0,composed:!0});this.dispatchEvent(t)}catch(t){console.error("Error setting station mode:",t);const e=new CustomEvent("hass-notification",{detail:{message:"Failed to set station mode",duration:3e3},bubbles:!0,composed:!0});this.dispatchEvent(e)}}_handleQuickMix(t){this._popupAnchorPosition=t.detail?.anchorPosition,this._openQuickMixPopup=!0}_handleQuickMixPopupClosed(){this._openQuickMixPopup=!1,this._popupAnchorPosition=void 0}async _handleQuickMixSave(t){const e=this._getEntity();if(!e||!this.hass)return;const{stationIds:o}=t.detail;try{await this.hass.callService("pianobar","set_quick_mix",{station_ids:o},{entity_id:e.entity_id});const t=new CustomEvent("hass-notification",{detail:{message:"QuickMix settings updated",duration:2e3},bubbles:!0,composed:!0});this.dispatchEvent(t),this._handleQuickMixPopupClosed()}catch(t){console.error("Error updating QuickMix:",t);const e=new CustomEvent("hass-notification",{detail:{message:"Error updating QuickMix settings",duration:3e3},bubbles:!0,composed:!0});this.dispatchEvent(e)}}_handleRenameStation(t){this._popupAnchorPosition=t.detail?.anchorPosition,this._openRenameDialog=!0}_handleRenameDialogClosed(){this._openRenameDialog=!1,this._popupAnchorPosition=void 0}async _handleRenameStationSubmit(t){const e=this._getEntity();if(!e||!this.hass)return;const{stationId:o,newName:i}=t.detail;try{await this.hass.callService("pianobar","rename_station",{station_id:o,new_name:i},{entity_id:e.entity_id});const t=new CustomEvent("hass-notification",{detail:{message:`Station renamed to "${i}"`,duration:2e3},bubbles:!0,composed:!0});this.dispatchEvent(t),this._handleRenameDialogClosed()}catch(t){console.error("Error renaming station:",t);const e=new CustomEvent("hass-notification",{detail:{message:"Error renaming station",duration:3e3},bubbles:!0,composed:!0});this.dispatchEvent(e)}}_renderStationPopup(t){if(!("normal"===(this._resolvedConfig?.stationDisplay??"hidden")||this._stationPopupOpen))return F;const e=t.attributes.stations||[];if(0===e.length)return F;const o=t.attributes.source||"",i=e.find(t=>t.name===o),n=i?.id||"",s=t.attributes.song_station_name||"",r=this._isUnavailable(t);return H`
      <pmc-station-selector
        .stations=${e}
        .currentStationId=${n}
        .currentStationName=${o}
        .songStationName=${s}
        .disabled=${r}
        .popupOnly=${!0}
        .externalOpen=${this._stationPopupOpen}
        .anchorPosition=${this._popupAnchorPosition}
        @station-change=${this._handleStationChange}
        @popup-closed=${this._handleStationPopupClosed}
      ></pmc-station-selector>
    `}_renderRatingsPopup(t){if(!this._ratingsPopupOpen)return F;const e=this._supportsLove(),o=this._supportsBan(),i=this._supportsTired();if(!e&&!o&&!i)return F;const n=t.attributes.rating||0,s=this._isUnavailable(t);return H`
      <pmc-song-actions-menu
        .rating=${n}
        .disabled=${s}
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
    `}_renderUpcomingPopup(){return this._upcomingPopupOpen?H`
      <pmc-upcoming-songs-popup
        .externalOpen=${this._upcomingPopupOpen}
        .anchorPosition=${this._popupAnchorPosition}
        .songs=${this._upcomingSongs}
        @popup-closed=${this._handleUpcomingPopupClosed}
      ></pmc-upcoming-songs-popup>
    `:F}_renderStationModePopup(t){if(!this._stationModePopupOpen)return F;const e=t.attributes.stations||[],o=t.attributes.media_content_id,i=e.find(t=>t.id===o),n=i?.name||"";return H`
      <pmc-station-mode-popup
        .externalOpen=${this._stationModePopupOpen}
        .anchorPosition=${this._popupAnchorPosition}
        .currentStationId=${o}
        .currentStationName=${n}
        .modes=${this._stationModes}
        .loading=${this._stationModesLoading}
        @set-mode=${this._handleSetStationMode}
        @popup-closed=${this._handleStationModePopupClosed}
      ></pmc-station-mode-popup>
    `}_renderQuickMixPopup(t){if(!this._openQuickMixPopup)return F;const e=t.attributes.stations||[],o=this._isUnavailable(t);return H`
      <pmc-quickmix-popup
        .stations=${e}
        .disabled=${o}
        .externalOpen=${this._openQuickMixPopup}
        .anchorPosition=${this._popupAnchorPosition}
        @save=${this._handleQuickMixSave}
        @popup-closed=${this._handleQuickMixPopupClosed}
      ></pmc-quickmix-popup>
    `}_renderRenameDialog(t){if(!this._openRenameDialog)return F;const e=t.attributes.stations||[],o=this._isUnavailable(t);return H`
      <pmc-rename-dialog
        .stations=${e}
        .disabled=${o}
        .externalOpen=${this._openRenameDialog}
        .anchorPosition=${this._popupAnchorPosition}
        @rename-station=${this._handleRenameStationSubmit}
        @dialog-closed=${this._handleRenameDialogClosed}
      ></pmc-rename-dialog>
    `}_renderStationPill(t){if("hidden"===(this._resolvedConfig?.stationDisplay??"hidden"))return F;const e=t.attributes.stations||[];if(0===e.length)return F;const o=t.attributes.source||"",i=e.find(t=>t.name===o),n=i?.isQuickMix??!1,s=t.attributes.song_station_name||"",r=n&&s?s:o,a=n?"mdi:shuffle":"mdi:radio";return r?H`
      <div class="station-pill" @click=${this._handleOpenStationPopup}>
        <ha-icon icon="${a}"></ha-icon>
        <span>${r}</span>
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
      ${this._renderUpcomingPopup()}
      ${this._renderStationModePopup(t)}
      ${this._renderQuickMixPopup(t)}
      ${this._renderRenameDialog(t)}
    `}render(){if(!this._config||!this.hass)return H``;const t=this._getEntity();if(!t)return H`
        <ha-card>
          <div class="unavailable-text">
            Entity not found: ${this._config.entity}
          </div>
        </ha-card>
      `;const e="tall"===this._resolvedConfig?.artwork,o=this._isUnavailable(t),i="full-cover"===this._resolvedConfig?.artwork,n=t.attributes.entity_picture,s=!!n,r=this._extractedColors?.background||"var(--pmc-card-background)",a=this._extractedColors?.foreground||"var(--pmc-primary-text-color)",l=i&&this._extractedColors?.metadataForeground||a,c=i&&this._extractedColors?.controlsForeground||a,d=_t({"--pmc-extracted-bg":r,"--pmc-extracted-fg":a,backgroundColor:!e&&s?r:void 0}),p=_t({background:`linear-gradient(to left, transparent 0, ${r} ${this._cardHeight}px, ${r} 100%)`}),h=this._resolvedConfig?.showProgressBar,u=this._resolvedConfig?.showProgressTime,m=[s&&!e?"has-artwork":"",h?"has-progress":"",h&&u?"show-time":"",this._resolvedConfig?.reserveDetailsSpace??!0?"":"no-reserve"].filter(Boolean).join(" ");return e?H`
        <ha-card class="${m}">
          ${this._renderTallMode(t)}
        </ha-card>
      `:H`
      <ha-card style=${d} class="${m}">
        ${s&&!i?H`
              <div class="artwork-container">
                <img class="artwork-image" src="${n}" alt="" />
              </div>
              <div class="artwork-gradient" style=${p}></div>
            `:F}
        
        ${i&&n?H`
              <div class="fullcover-background" style="background-image: url('${n}')"></div>
              <div class="fullcover-overlay"></div>
            `:F}

        <div class="card-content ${o?"unavailable":""}" style="color: ${s?l:"inherit"}">
          ${this._renderMediaInfo(t)}
          ${this._renderOverflowMenu(t)}
        </div>

        ${this._resolvedConfig?.showPlaybackControls||this._resolvedConfig?.showVolumeControl||this._resolvedConfig?.showSongActions||"compact"===this._resolvedConfig?.stationDisplay?H`
              <div class="controls-section" style="color: ${s?c:"inherit"}">
                <div class="controls-row">
                  ${this._renderPlaybackControls(t)}
                  <div class="controls-spacer"></div>
                  ${this._renderSongActions(t)}
                  ${this._renderStationSelector(t)}
                </div>
                ${this._renderVolumeControl()}
              </div>
            `:F}

        ${h?this._renderProgressBar(t):F}

        ${this._renderStationPopup(t)}
        ${this._renderRatingsPopup(t)}
        ${this._renderUpcomingPopup()}
        ${this._renderStationModePopup(t)}
        ${this._renderQuickMixPopup(t)}
        ${this._renderRenameDialog(t)}
      </ha-card>
    `}};Kt.styles=vt,t([ht({attribute:!1})],Kt.prototype,"hass",void 0),t([ut()],Kt.prototype,"_config",void 0),t([ut()],Kt.prototype,"_resolvedConfig",void 0),t([ut()],Kt.prototype,"_extractedColors",void 0),t([ut()],Kt.prototype,"_lastImageUrl",void 0),t([ut()],Kt.prototype,"_cardHeight",void 0),t([ut()],Kt.prototype,"_stationPopupOpen",void 0),t([ut()],Kt.prototype,"_ratingsPopupOpen",void 0),t([ut()],Kt.prototype,"_upcomingPopupOpen",void 0),t([ut()],Kt.prototype,"_stationModePopupOpen",void 0),t([ut()],Kt.prototype,"_popupAnchorPosition",void 0),t([ut()],Kt.prototype,"_upcomingSongs",void 0),t([ut()],Kt.prototype,"_stationModes",void 0),t([ut()],Kt.prototype,"_stationModesLoading",void 0),t([ut()],Kt.prototype,"_openQuickMixPopup",void 0),t([ut()],Kt.prototype,"_openRenameDialog",void 0),t([ut()],Kt.prototype,"_tallArtworkError",void 0),Kt=t([ct("pianobar-media-player-card")],Kt);export{Kt as PianobarMediaPlayerCard};
