import { LitElement, html, css } from "lit";

export default class SelectorPicker extends LitElement{
  
  static get properties() {
    return{
      value: {type: String, reflect: true},
      options: {type: Array, reflect: true},
      name: {type: String, reflect: true},
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
    this.value = "";
    this.name = "";
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
        .background-div {
            display: flex;
            flex-direction: column;
        }
        input {
            display: none;
            /* background-color: red; */

        }
        label {
            border: 2px solid #e4dfdf;
            border-radius: 4px;
            padding: 20px 0;
            margin: 4px 0;
            text-align: center;
            cursor: pointer;
            font-size: 20px;
        }
        label:hover {
            border-color: #bdb9b9;
        }
        input:checked + label {
            border-color: #285e49c0;
            color: #285e49c0;
            font-weight: bold; 
        }

      /* .background-div{
        display: flex;
        position: relative;
        padding: 8px;
        margin: 9px 0;
        border-radius: var(--input-field-border-radius, 30px);
        width: var(--input-field-width, 344px);
        border: #e4dfdf solid;
      } */
      /* label {
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
        margin-left: 24px;
        margin-right: 6px;
      }
      input {
        position: relative;
        top: 0px;
        border: none;
        outline: none;
        padding: 0;
        background-color: var(--input-field-background-color, inherit);
        line-height: 2em;
        width: 96%;
      }
       */
      

      /* input:focus + label,
      :host(:not([value=""])) label {
        top: -1.5px;
        background-color: white;
        padding: 0 4px;
        margin-left: 20px;
        font-size: 14px;
      } */
/*       
      input:-webkit-autofill,
      input:-webkit-autofill:hover, 
      input:-webkit-autofill:focus, 
      input:-webkit-autofill:active{
        box-shadow: 0 0 0 30px var(--box-shadow-color, white) inset;
      
      }
      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
      } */
      .error-message {
      margin-left: 12px;
      color: red;
      visibility: hidden;
     }

     /* @keyframes shake {
      0% {
        margin-left: 0rem;
      }
      25% {
        margin-left: 0.5rem;
      }
      75% {
        margin-left: -0.5rem;
      }
      100% {
        margin-left: 0rem;
      }
    } */

      `;
    }


  render() {
    return html`
    <div class="background-div">
        ${this.options.map(e => 
            html`
                <input 
                    type="radio"
                    name=${this.name} 
                    id=${e.value} 
                    .value="${e.value}" 
                    aria-label=${this.ariaLabel}
                    @click="${this.updateValue}" 
                    ?required="${this.required}"
                /><label for=${e.value}>${e.label}</label>`    
        )}

    </div>
    <span class="error-message">${this.errormessage}</span>`;
  }

  updateValue(e) {
    this.shadowRoot.querySelector(".background-div").classList.remove("invalid-input")
    this.shadowRoot.querySelector(".error-message").style = "visibility: none;"
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
    const errorDiv = this.shadowRoot.querySelector(".background-div");
    const errorMessage = this.shadowRoot.querySelector(".error-message");
    if(!input.checkValidity()) {
      errorDiv.classList.add("invalid-input")
      errorDiv.id = "invalid-input"
      errorMessage.style = "visibility: visible;" 
      setTimeout(() => {
        errorDiv.id = "";
      }, 500)
      return false;     
    }
    return true;
  }
}
customElements.define('selector-picker', SelectorPicker);