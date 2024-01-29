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
            <input-field type="date" name="birthday" label="Birthday" required></input-field>
            <input-field type="text" name="weight" label="Weight in kilo grams" pattern="([0-9]{2,3})?([\.][0-9][0-9]?)?" errormessage="Weight must be betwen  " required></input-field>
            <input-field type="text" name="height" label="Height in centimeters" pattern="[1-4][0-9]{2}" errormessage="Height must be betweem 100cm and 400cm" required></input-field>
            <input-field type="text" name="sex" label="Sex" value="MALE"></input-field>
            <button-div value="Register" @click=${this.handleSubmit}></button-div>
          </form>
  `;
  }

  submitForm(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    this.data = Object.fromEntries(formData.entries())
    console.log(this.data)
    // this.handleData();
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

customElements.define('userinfo-form', UserInfoForm);