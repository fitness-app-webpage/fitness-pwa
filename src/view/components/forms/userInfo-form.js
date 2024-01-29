import { LitElement, html, css } from "lit";
// import { register } from "../../../service/ApiService";

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
          <form @submit=${this.submitForm}>
            <input-field type="date" name="birthday" label="Birthday" required></input-field>
            <input-field type="text" name="weight" label="Weight in kilo grams" pattern="([0-9]{2,3})?([\.][0-9][0-9]?)?" errormessage="Weight must be betwen  " required></input-field>
            <input-field type="text" name="height" label="Height in centimeters" pattern="[1-4][0-9]{2}" errormessage="Height must be betweem 100cm and 400cm" required></input-field>
            <input-field type="text" name="sex" label="Sex" value="MALE"></input-field>
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

  handleBack(e) {
    this.dispatchEvent(new Event('back'));
  }
}

customElements.define('userinfo-form', UserInfoForm);