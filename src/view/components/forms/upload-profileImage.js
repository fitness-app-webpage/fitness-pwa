import { LitElement, html, css } from "lit";
import {uploadProfilePhoto} from "../../../service/ApiService"
import "../error/errorMessage"

export default class UploadProfileImage extends LitElement {
  static get properties() {
    return{
      data: {type: Object},
      _error: {type: String}
    }
  };

  constructor() {
    super();
    this.data = {};
    this._error = "";
  }

  static get styles(){ 
    return css`
    `;
  }

  render() {
    return html`
          <h1>Personal info</h1>
          <form @submit=${this.submitForm} @keyup=${this.enterKeyPressed} enctype="multipart/form-data" novalidate>
            <input type="file" name="fileImage" id="fileImage" accept="image/*"/>
            <button-div value="Submit" @click=${this.handleSubmit}></button-div>
          </form>
          <error-message message="${this._error}"></error-message>
  `;
  }

  submitForm(e) {
    e.preventDefault();
    const form = e.target;
    this.data = new FormData(form);
    uploadProfilePhoto(this.data).catch(error => {
      this._error = error.message
    })
  }

  handleSubmit(e) {
    this.shadowRoot.querySelector("form").requestSubmit();
  }
}

customElements.define('profile-form', UploadProfileImage);