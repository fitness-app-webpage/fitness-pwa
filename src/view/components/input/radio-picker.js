import { LitElement, html, css } from "lit";

export default class RadioPicker extends LitElement{
  
  static get properties() {
    return{
        options: {type: Array},
        value: {type: String},
        name: {type: String},
        required: {type: Boolean, reflect: true},
        label: {type: String},
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
    this.value = "";
    this.label = "";
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
            flex-wrap: wrap;
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
          margin-left: -9px;
        }
        .radio-span {
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          cursor: pointer;
          padding: 9px;
          border-radius: 50%;
        }
        .radio-span:hover {
          background-color: rgb(0 76 255 / 8%);

        }
        input {
            height: 20px;
            width: 20px;
            margin: 0;
            cursor: pointer;
        }
        .error-message {
        /* margin-left: 17px; */
        color: red;
        visibility: hidden;
        }
     `;
    }


  render() {
    return html`
    <div class="background-div">

        ${this.options.map(e =>
            html`<label>
                <span class="radio-span">
                  <input 
                      type="radio"
                      name=${this.name} 
                      id=${this.name} 
                      .value="${e.value}" 
                      aria-label=${this.ariaLabel}
                      @input="${this.updateValue}" 
                      ?required="${this.required}"
                  />
                </span>
                ${e.label}
                </label>`
        )}
    </div>
    <span class="error-message">${this.errormessage}</span>
    `;
  }

  updateValue(e) {
    this.shadowRoot.querySelector(".error-message").style = "visibility: hidden;"
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
  checkValidation() {
    const input = this.shadowRoot.querySelector("input")
    const errorMessage = this.shadowRoot.querySelector(".error-message");
    if(!input.checkValidity()) {
      errorMessage.style = "visibility: visible;"
    }
  }
}
customElements.define('radio-picker', RadioPicker);