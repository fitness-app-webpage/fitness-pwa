import { LitElement, html, css } from "lit";

export default class UserForm extends LitElement {
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
            <input-field type="text" name="firstName" label="First name" pattern=".{1,}" required></input-field>
            <input-field type="text" name="lastName" label="Last name" pattern=".{1,}" required></input-field>
            <div class="button-container">
              <button-div value="Login" @click=${this.handleBack}></button-div>
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
    this.dispatchEvent(new Event('login'));
  }
}

customElements.define('user-form', UserForm);