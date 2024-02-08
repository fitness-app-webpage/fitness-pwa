import { LitElement, html, css } from "lit";
import {uploadProfilePhoto} from "../../../service/ApiService"

export default class UploadProfileImage extends LitElement {
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
    `;
  }

  render() {
    return html`
          <h1>Personal info</h1>
          <form @submit=${this.submitForm} @keyup=${this.enterKeyPressed} enctype="multipart/form-data" novalidate>
            <input type="file" name="fileImage" id="fileImage" accept="image/*"/>
            <button-div value="Submit" @click=${this.handleSubmit}></button-div>
          </form>
  `;
  }

  submitForm(e) {
    e.preventDefault();
    const form = e.target;
    this.data = new FormData(form);
    uploadProfilePhoto(this.data)
  }

  handleSubmit(e) {
    this.shadowRoot.querySelector("form").requestSubmit();
  }
}

customElements.define('profile-form', UploadProfileImage);