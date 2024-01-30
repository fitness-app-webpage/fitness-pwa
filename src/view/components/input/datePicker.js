import { LitElement, html, css } from "lit";

export default class DatePicker extends LitElement{
  
  static get properties() {
    return{
      value: {type: String, reflect: true},
      name: {type: String, reflect: true},
      required: {type: Boolean, reflect: true},
      label: {type: String},
      pattern: {type: String},
      min: {type: String},
      max: {type: String},
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
    if(this.required && this.value === "") {
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

  // updated() {
  //   console.log(this.value)
  //   this.internals.setFormValue(this.value)
  //   this.setValidity(this.shadowRoot.querySelector("input"));
  // }

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
      `;
    }


  render() {
    return html`
    <div class="background-div">
        <input 
        type="tel"
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
customElements.define('date-picker', DatePicker);