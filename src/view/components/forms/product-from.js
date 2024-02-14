import { LitElement, html, css } from "lit";
import "../error/errorMessage"
import { addProduct } from "../../../service/ApiService";
import { BASE } from "../../../app";

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
      }
    h1 {
      text-align: center;
    }
    @media only screen and (max-width: 480px) and (orientation: portrait) {
      h1 {
        padding: 0 0 75px 0;
      }
      form {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        overflow: auto;
        margin: 0 0 20px 0;
      }
      numberic-input, input-field {
        width: 100%;
        display: flex;
        flex-direction: column;
        text-align: center;
        align-items: center;
        --input-width: calc((100vw / 2) - 60px);
      }
      button-div {
        margin: 20px 0 0 0;
        width: calc((100% / 2) - 40px);
      }
      .first-row, .second-row,
      .third-row, .fourth-row {
        width: 100%;
        height: 105px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .photo-icon {
        -webkit-tap-highlight-color: transparent;
        background: url("add_photo_icon.svg") center / contain no-repeat;
        width: 40px;
        height: 40px;
        /* background-color: #4f63f7; */
        /* border-radius: 50%; */
      }
      input[type="file"] {
        display: none
      }
    }
    `;
  }

  render() {
    return html`
          <h1>Product</h1>
          <form @submit=${this.submitForm} @keyup=${this.enterKeyPressed} enctype="multipart/form-data" novalidate>
            <input-field name="victualsType" label="Victuals type" pattern=".{1,}" errormessage="Field cannot be empty" required></input-field>
            <div class="first-row">
                <input-field name="name" label="Product name" pattern=".{1,}" errormessage="Field cannot be empty" required></input-field>
                <input-field name="brand" label="Brand name" pattern=".{1,}" errormessage="Field cannot be empty" required></input-field>
            </div>
            <div class="second-row">            
                <numberic-input name="quantity" label="Amount" pattern="([0-9]{1,3})?([\.][0-9][0-9]?)?" errormessage="Quantity cannot be more than '10000'" abbreviateType="g" value="100" required></numberic-input>
                <numberic-input name="calories" label="Calories" pattern="([0-9]{1,3})?([\.][0-9][0-9]?)?" errormessage="Calories cannot be more than 10000" abbreviateType="kcal" required></numberic-input>
            </div>
            <div class="third-row">
                <numberic-input name="fat" label="Fat" pattern="([0-9]{1,3})?([\.][0-9][0-9]?)?" errormessage="Fat cannot be more than 1000" abbreviateType="g" required></numberic-input>
                <numberic-input name="carbs" label="Carbs" pattern="([0-9]{1,3})?([\.][0-9][0-9]?)?" errormessage="Carbs cannot be more than 2000" abbreviateType="g" required></numberic-input>
            </div>
            <div class="fourth-row">
                <numberic-input name="protein" label="Protein" pattern="([0-9]{1,3})?([\.][0-9][0-9]?)?" errormessage="Protein cannot be more than 2000" abbreviateType="g" required></numberic-input>
                <numberic-input name="salt" label="Salt" pattern="([0-9]{1,3})?([\.][0-9][0-9]?)?" errormessage="Salt cannot be more than 100" abbreviateType="g" required></numberic-input>
            </div>
            <label for="image">
              Select image
              <span>Optional</span>
            </label>
            <input type="file" name="image" id="image" accept="image/*"/>
            <button-div ?disabled="${this._disabled}" value="Submit" @click=${this.handleSubmit}></button-div>
          </form>
          <a href="${BASE}/products">Products</a>
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
      this.data = new FormData(form);
      addProduct(this.data).then(response => {
        if(response.ok)
        this._error = "Product added"
      }).catch(error => {
        this._error = error.message
      })
    } else {
      let firstInvalidInput = false;
      Array.from(form.elements).map(e => {
        if(e.id === "image") return;
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