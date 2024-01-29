import { LitElement, html, css } from "lit";
import { register } from "../../../service/ApiService";
// import {Router} from "@vaadin/router";
// import {BASE} from "../../app"

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
          <form @submit=${this.submitForm}>
            <h1>Register</h1>
            <input-field type="text" name="firstName" label="First name" pattern=".{1,}" required></input-field>
            <input-field type="text" name="lastName" label="Last name" pattern=".{1,}" required></input-field>
            <input-field type="text" name="username" label="Username" pattern=".{1,}" required></input-field>
            <input-field type="email" name="email" label="Email" pattern=".{1,}" required></input-field>
            <input-field type="password" name="password" label="Password" pattern=".{1,}" required></input-field>
            <button-div value="Register" @click=${this.handleSubmit}></button-div>
          </form>
  `;
  }

  submitForm(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    this.data = Object.fromEntries(formData.entries())
    this.handleData();
  }

  handleData() {
    register(this.data)
      .then(e => {
        console.log(e)
        return e;
      })
  }

  handleSubmit(e) {
    this.shadowRoot.querySelector("form").requestSubmit();
  }
}

customElements.define('register-form', RegisterForm);