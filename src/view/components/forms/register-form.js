import { LitElement, html, css } from "lit";
// import * as service from "../../service/ApiService";
// import {Router} from "@vaadin/router";
// import {BASE} from "../../app"

export default class RegisterForm extends LitElement {
  static get properties() {
    return{
      data: {type: Object},
      formUrl: {type: String}
    }
  };

  constructor() {
    super();
    this.data = {};
  }

  static get styles(){ 
    return css`
    `;
  }

  render() {
    return html`
          <form @submit=${this.submitForm}>
            <input-field type="text" name="firstName" label="First name"></input-field>
            <input-field type="text" name="lastName" label="Last name"></input-field>
            <input-field type="text" name="username" label="Username"></input-field>
            <input-field type="email" name="email" label="Email"></input-field>
            <input-field type="password" name="password" label="Password"></input-field>
            <button-div value="Register" @click=${this.handleSubmit}></button-div>
          </form>
  `;
  }

  submitForm(e) {
    console.log(e)
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    this.data = Object.fromEntries(formData.entries())
    console.log(this.data)
    this.handleData();
  }

  handleData() {
    return "";
  }

  handleSubmit(e) {
    this.shadowRoot.querySelector("form").requestSubmit();
  }
}

customElements.define('register-form', RegisterForm);