import { LitElement, html, css } from "lit";
import {uploadProfilePhoto, getProfilePicture} from "../../../service/ApiService"
import "../error/errorMessage"

export default class ProductForm extends LitElement {
  static get properties() {
    return{
      data: {type: Object},
      _error: {type: String},
      _disabled: {type: Boolean, state: true}
    }
  };

  constructor() {
    super();
    this.data = {};
    this._error = "";
    this._disabled = false;
  }

  static get styles(){ 
    return css`
    :host {
        width: 100%;
    }
    form {
        width: 100%;
        display: flex;
        flex-direction: column;
        overflow: auto;
        height: calc(100vh - 180px);
      }
    @media only screen and (max-width: 480px) and (orientation: portrait) {
      form {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        overflow: auto;
        height: calc(100vh - 180px);
      }
      input-field, numberic-input {
        width: calc((100% / 2) - 40px);
      }
      button-div {
        width: calc((100% / 2) - 40px);
      }
      .first-row, .second-row,
      .third-row, .fourth-row {
        display: flex;
        justify-content: space-evenly;
      }
    }
    `;
  }

  render() {
    return html`
          <form @submit=${this.submitForm} @keyup=${this.enterKeyPressed} enctype="multipart/form-data" novalidate>
            <input-field name="victualsType" label="Victuals type" pattern=".{1,}" errormessage="Field cannot be empty" required></input-field>
            <div class="first-row">
                <input-field name="name" label="Product name" pattern=".{1,}" errormessage="Field cannot be empty" required></input-field>
                <input-field name="brand" label="Brand name" pattern=".{1,}" errormessage="Field cannot be empty" required></input-field>
            </div>
            <div class="second-row">            
                <numberic-input name="quantity" label="Quantity (amount)" pattern="([0-9]{2,3})?([\.][0-9][0-9]?)?" errormessage="Quantity cannot be more than '10000'" abbreviateType="g" required></numberic-input>
                <numberic-input name="calories" label="Calories" pattern="([0-9]{2,3})?([\.][0-9][0-9]?)?" errormessage="Calories cannot be more than 10000" abbreviateType="kcal" required></numberic-input>
            </div>
            <div class="third-row">
                <numberic-input name="fat" label="Fat" pattern="([0-9]{2,3})?([\.][0-9][0-9]?)?" errormessage="Fat cannot be more than 1000" abbreviateType="g" required></numberic-input>
                <numberic-input name="carbs" label="Carbs" pattern="([0-9]{2,3})?([\.][0-9][0-9]?)?" errormessage="Carbs cannot be more than 2000" abbreviateType="g" required></numberic-input>
            </div>
            <div class="fourth-row">
                <numberic-input name="protein" label="Protein" pattern="([0-9]{2,3})?([\.][0-9][0-9]?)?" errormessage="Protein cannot be more than 2000" abbreviateType="g" required></numberic-input>
                <numberic-input name="salt" label="Salt" pattern="([0-9]{2,3})?([\.][0-9][0-9]?)?" errormessage="Salt cannot be more than 100" abbreviateType="g" required></numberic-input>
            </div>
            <button-div ?disabled="${this._disabled}" value="Submit" @click=${this.handleSubmit}></button-div>
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
}

customElements.define('product-form', ProductForm);