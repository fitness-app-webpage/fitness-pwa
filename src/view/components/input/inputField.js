import { LitElement, html, css } from "lit";

export default class InputField extends LitElement{
  
  static get properties() {
    return{
      value: {type: String, reflect: true},
      name: {type: String, reflect: true},
      required: {type: Boolean, reflect: true},
      label: {type: String},
      pattern: {type: String},
      min: {type: String},
      max: {type: String},
      type: {type: String},
      validity: {type: Object},
      errormessage: {type: String},
      ariaLabel: {type: String},
    }
  };

  static get formAssociated() {
    return true;
  }

  constructor() {
    super();
    this.value = "";
    this.name = "";
    this.label = "";
    this.pattern = ".{1,}";
    this.min = "";
    this.max = "";
    this.type = "text";
    this.ariaLabel = "";
    this.validity = {};
    this.errormessage = "Field is required";
    this.internals = this.attachInternals();
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('tabindex', '0');
    this.addEventListener('focus', this.setFocus.bind(this))
    this.internals.setFormValue(this.value)
    if(this.required) {
      this.internals.setValidity({customError: true}, this.errormessage)
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.removeEventListener('focus', this)
  }

  setFocus() {
    this.shadowRoot.querySelector('input').focus()
  }

  updated() {
    this.internals.setFormValue(this.value)
    this.setValidity(this.shadowRoot.querySelector("input"));
  }

  formResetCallback() {
    this.value = "";
    this.internals.setFormValue(this.value)
  }  
  
  static get styles(){ 
    return css`
      .background-div{
        position: relative;
        padding: 8px;
        margin: 9px 0;
        border-radius: var(--input-field-border-radius, 30px);
        /* width: var(--input-field-width, 100%); */
        background-color: var(--input-field-background-color, #e4dfdf);
      }
      label {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        color: var(--input-field-label-color, #545454);
        font-weight: normal;
        transition: .4s ease;
        user-select: none;
        cursor: text;
      }
      label, input {
        display: flex;
        align-items: center;
        margin: 0 6px;
      }
      input {
        position: relative;
        top: 5px;
        border: none;
        outline: none;
        padding: 0;
        background-color: var(--input-field-background-color, inherit);
        line-height: 2em;
        width: 96%;
      }
      
      
      @media screen and (max-width: 430px){
        input[type="date"]::-webkit-calendar-picker-indicator {
        background: transparent;
        bottom: 0;
        color: transparent;
        cursor: pointer;
        height: auto;
        left: 0;
        position: absolute;
        right: 0; 
        top: 0;
        width: auto;
       }

      }

      @media screen and (min-width: 431px){
        input[type="date"]::-webkit-calendar-picker-indicator {
        cursor: pointer;
        height: 25px;
        width: 25px;
        }
      }
      

      input[type="date"]{
        font-size: 16px;
      }

      input:focus + label,
      :host(:not([value=""])) label {
        top: 25%;
        font-size: 14px;
      }
      
      input:-webkit-autofill,
      input:-webkit-autofill:hover, 
      input:-webkit-autofill:focus, 
      input:-webkit-autofill:active{
        box-shadow: 0 0 0 30px var(--box-shadow-color, #e4dfdf) inset;
      
      }
      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
      }`;
    }


  render() {
    return html`
    <div class="background-div">
        <input 
        .type=${this.type}
        name=${this.name} 
        id=${this.name} 
        .value="${this.value}" 
        pattern="${this.pattern}"
        min="${this.min}" 
        max="${this.max}"
        aria-label=${this.ariaLabel}
        @input="${this.updateValue}" 
        ?required="${this.required}"
        />

        <label for="${this.name}">${this.label}</label>
    </div>`;
  }

  updateValue(e) {
    this.value = e.target.value;
    this.internals.setFormValue(this.value)
    this.setValidity(e.target)
    this.dispatchEvent(new CustomEvent('input-changed', {[e.target.name]: e.target.value}));
  }

  setValidity(input) {
    if(!input.checkValidity()) {
      this.validity = input.validity;
      this.internals.setValidity({customError: true}, this.errormessage)
    } else {
      this.internals.setValidity({});
    }
  }
}
customElements.define('input-field', InputField);