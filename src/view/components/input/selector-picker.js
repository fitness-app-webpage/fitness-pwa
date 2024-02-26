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
    this.options = []
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
    this.options.map(e =>{
      if(e.checked)
        this.value = e.value
    })
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
            flex-direction: var(--flex-direction, column);
            justify-content: var(--justify-content);
        }
        input {
            display: none;
            /* background-color: red; */

        }
        label {
          border: #b1afaf solid 2px;
          border-radius: var(--border-radius, 4px);
          padding: var(--padding, 20px 0);
          margin: 4px 0;
          text-align: center;
          cursor: pointer;
          font-size: var(--font-size, 20px);
          width: var(--width);
          display: flex;
          flex-direction: column;
        }
        label:hover {
            border-color: #8d8a8a;
        }
        input:checked + label {
            border-color: #4056f4;
            color: #4056f4;
            font-weight: bold; 
        }
      .error-message {
      margin-left: 12px;
      color: red;
      visibility: hidden;
      }
      .extra-info {
        font-size: 14px;
        opacity: 0.8;
        color: black;
        font-weight: normal;
      }
      input:checked + label .extra-info {
        opacity: 1;
      }
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
                    ?checked="${e.checked}"
                />
                <label for=${e.value}>
                  ${e.label}
                  <span class="extra-info">${e.info}</span>
                </label>`    
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
    this.dispatchEvent(new CustomEvent('selection-changed', {[e.target.name]: e.target.value}));
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