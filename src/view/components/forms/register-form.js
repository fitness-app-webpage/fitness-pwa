import { LitElement, html, css } from "lit";

export default class RegisterForm extends LitElement {
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
          <h1>Register</h1>
          <form @submit=${this.submitForm}>
            <input-field type="text" name="firstName" label="First name" pattern=".{1,}" required></input-field>
            <input-field type="text" name="lastName" label="Last name" pattern=".{1,}" required></input-field>
            <input-field type="text" name="username" label="Username" pattern=".{1,}" required></input-field>
            <input-field type="email" name="email" label="Email" pattern=".{1,}" required></input-field>
            <input-field type="password" name="password" label="Password" pattern=".{1,}" required></input-field>
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
    this.dispatchEvent(new CustomEvent('submit', {detail: this.data}));
  }

  handleSubmit(e) {
    this.shadowRoot.querySelector("form").requestSubmit();
  }
  handleBack(e) {
    this.dispatchEvent(new Event('back'));
  }
}

customElements.define('register-form', RegisterForm);