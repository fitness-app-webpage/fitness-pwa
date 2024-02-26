import { LitElement, html, css } from "lit";
import {uploadProfilePhoto, getProfilePicture} from "../../../service/ApiService"
import "../error/errorMessage"

export default class UploadProfileImage extends LitElement {
  static get properties() {
    return{
      data: {type: Object},
      _error: {type: String},
      _profilePicture: {state: true},
      _disabled: {type: Boolean, state: true},
      _loading: {type: Boolean, state: true}
    }
  };

  constructor() {
    super();
    this.data = {};
    this._error = "";
    this._profilePicture = JSON.parse(localStorage.getItem("profileImage"))
    this._disabled = true;
    this._loading = false;
  }

  async firstUpdated() {
    super.firstUpdated();
    if(localStorage.getItem("profileImage") === null 
    || localStorage.getItem("profileImage") === undefined) {
      await getProfilePicture().then(() => {
        this._profilePicture = JSON.parse(localStorage.getItem("profileImage"))
      }).catch(error => {
      });
    }
  }  

  static get styles(){ 
    return css`
      path, img {
        width: 200px;
        height: 200px;
        border-radius: 50%;
      }
    @media only screen and (max-width: 480px) and (orientation: portrait) {
        img {
        width: 200px;
        height: 200px;
        border-radius: 50%;
      }
      img {
        object-fit: cover;
        /* object-position: 25% 75%; */
      }
      form {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      }
      label {
        position: relative;
        -webkit-tap-highlight-color: transparent;
      }
      .plus {
        -webkit-tap-highlight-color: transparent;
        position: absolute;
        right: 0px;
        bottom: 20px;
        width: 40px;
        height: 40px;
        background: url("plus.svg") center / contain no-repeat;
        background-color: white;
        border-radius: 50%;
      }
      input {
        display: none;      
      }
      button-div {
        margin: 10px 0 0 0;
        width: 100px;
        --loading-width: 12px;
        --loading-height: 12px;
        --loading-margin: auto auto auto 5px;
      }
    }
      
    `;
  }

  render() {
    return html`
          <form @submit=${this.submitForm} @keyup=${this.enterKeyPressed} enctype="multipart/form-data" novalidate>
          <label for="fileImage">${this._profilePicture !== null 
          ? html`<img src="data:image/png;base64,${this._profilePicture.imageBase64}" />
                  <svg class="plus"></svg>`
          : html`<svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_1_2)">
                  <rect width="200" height="200" fill="white"/>
                  <path d="M100 0C44.7656 0 0 44.7656 0 100C0 155.234 44.7656 200 100 200C155.234 200 200 155.234 200 100C200 44.7656 155.234 0 100 0ZM100 50C115.535 50 128.125 62.5938 128.125 78.125C128.125 93.6562 115.547 106.25 100 106.25C84.4688 106.25 71.875 93.6562 71.875 78.125C71.875 62.5938 84.4531 50 100 50ZM100 175C79.3242 175 60.5859 166.59 46.9922 153.012C53.3203 136.68 68.9453 125 87.5 125H112.5C131.07 125 146.695 136.672 153.008 153.012C139.414 166.602 120.664 175 100 175Z" fill="#C6DAE6"/>
                  </g>
                  <defs>
                  <clipPath id="clip0_1_2">
                  <rect width="200" height="200" fill="white"/>
                  </clipPath>
                  </defs>
                </svg>
                <svg class="plus"></svg>`}
                </label>
            <input type="file" name="fileImage" id="fileImage" accept="image/*" @change="${this.handleChange}"/>
            <button-div ?disabled="${this._disabled}" value="Submit" @click=${this.handleSubmit} ?loading="${this._loading}"></button-div>
          </form>
          <error-message message="${this._error}"></error-message>
  `;
  }
  handleChange(e) {
    const fileSizeInMB = (e.target.files[0].size  / 1024 / 1024).toFixed(4)
    if(fileSizeInMB >  4) {
      this._disabled = true;
      this._error = "Image is to big"
      return;
    }
    this._disabled = false;
    const reader = new FileReader()
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = () => {
      this._profilePicture = {imageBase64: btoa(reader.result)}
    }
  }
  submitForm(e) {
    e.preventDefault();
    const form = e.target;
    this.data = new FormData(form);
    localStorage.setItem("profileImage", JSON.stringify(this._profilePicture))
    this._loading = true; this._disabled = false;
    uploadProfilePhoto(this.data).then(e => {
      this._error = e;
    }).catch(error => {
      this._error = error.message
    }).then(() => {
      this._loading = false; this._disabled = true;
    })
    this.dispatchEvent(new StorageEvent('storage', {
      key: "profileImage",
      newValue: JSON.stringify(this._profilePicture),
      bubbles: true,
      composed: true
    }))
    setTimeout(() => {
      this._error = "";
    }, 2000);
  }

  handleSubmit(e) {
    this.shadowRoot.querySelector("form").requestSubmit();
  }
}

customElements.define('profile-form', UploadProfileImage);