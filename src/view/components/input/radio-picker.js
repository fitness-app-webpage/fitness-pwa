import { LitElement, html, css } from "lit";

export default class RadioPicker extends LitElement{
  
  static get properties() {
    return{
        option: {type: Array},
        value: {type: Array},
        name: {type: String},
        required: {type: Boolean, reflect: true},
        label: {type: Array},
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
    this.name = "";
    this.options = [];
    this.value = [];
    this.label = [];
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
            display: flex;
            padding: 8px;
            margin: 20px 0;
        }
        label {
          height: 6px;
          font-size: 20px;
          display: inline-flex;
          text-align: center;
          align-items: center;
          justify-content: center;
          margin-right: 30px;
        }
        input {
            height: 20px;
            width: 20px;
            margin: 0 10px 0 0 ;
        }
     `;
    }


  render() {
    return html`
    <div class="background-div">

        ${this.options.map(e =>
            html`<label for="${this.name}">
                 <input 
                    type="radio"
                    name=${this.name} 
                    id=${this.name} 
                    .value="${e.value}" 
                    aria-label=${this.ariaLabel}
                    @input="${this.updateValue}" 
                    ?required="${this.required}"
                />
                ${e.label}
                </label>`
        )}
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
customElements.define('radio-picker', RadioPicker);