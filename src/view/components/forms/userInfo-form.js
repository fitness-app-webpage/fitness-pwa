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
    }
    button-div {
      width: 120px;
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
          <form @submit=${this.submitForm}>
            <date-picker name="birthday" label="Birthday" required></date-picker>
            <!-- <input-field type="date" name="birthday" label="Birthday" required></input-field> -->
            <div>
              <radio-picker name="sex" .options=${[{label: "Male", value: "MALE"}, {label: "Female", value: "FEMALE"}]}></radio-picker>
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
    const formData = new FormData(form);
    this.data = Object.fromEntries(formData.entries())
    this.dispatchEvent(new CustomEvent('next', {detail: this.data}));
  }

  handleSubmit(e) {
    this.shadowRoot.querySelector("form").requestSubmit();
  }

  handleBack(e) {
    this.dispatchEvent(new Event('back'));
  }
}

customElements.define('userinfo-form', UserInfoForm);