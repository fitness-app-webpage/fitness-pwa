import { LitElement, html, css } from "lit";
import '../input/radio-picker'
import '../input/datePicker'

export default class UserInfoForm extends LitElement {
  static get properties() {
    return{
      data: {type: Object},
    }
  };

  constructor() {
    super();
    this.data = {};
  }

  static get styles(){ 
    return css`
    :host {
      width: 100%;
    }
    form {
      display: flex;
      flex-direction: column;
    }
    h1 {
      text-align: center;
    }
    .button-container {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin: 10px 0 0 0;
    }
    button-div {
      width: 120px;
    }
    .radio-container {
      padding-left: 12px;
    }

    @media only screen and (max-width: 480px) {
            h1 {
                font-size: 24px;
                margin-bottom: 0;
            }
    }
    `;
  }

  render() {
    return html`
          <h1>Personal info</h1>
          <form @submit=${this.submitForm} @keyup=${this.enterKeyPressed} novalidate>
            <date-picker name="birthday" label="dd-mm-yyyy" text="When is your birthday" errormessage=${"Invalid birthday date"} required></date-picker>
            <div class="radio-container">
              <radio-picker name="sex" .options=${[{label: "Male", value: "MALE"}, {label: "Female", value: "FEMALE"}]} required></radio-picker>
            </div>
            <div class="button-container">
              <button-div value="Back" @click=${this.handleBack}></button-div>
              <button-div value="Next" @click=${this.handleSubmit}></button-div>
            </div>
          </form>
  `;
  }

  submitForm(e) {
    e.preventDefault();
    const form = e.target;
    if(form.checkValidity()) {
      const formData = new FormData(form);
      this.data = Object.fromEntries(formData.entries())
      this.dispatchEvent(new CustomEvent('next', {detail: this.data}));
    } else {
      let firstInvalidInput = false;
      Array.from(form.elements).map(e => {
        e.checkValidation()
        if(!firstInvalidInput && !e.checkValidation()) {
          firstInvalidInput = true;
          e.focus();
        }
      })
    }
  }

  handleSubmit(e) {
    this.shadowRoot.querySelector("form").requestSubmit();
  }

  handleBack(e) {
    this.dispatchEvent(new Event('back'));
  }
  enterKeyPressed(e) {
    if(e.key === "Enter" || e.keyCode === 13) {
      this.handleSubmit();
    }
  }
}

customElements.define('userinfo-form', UserInfoForm);