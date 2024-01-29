import { LitElement, html, css } from "lit";
// import { register } from "../../../service/ApiService";

export default class GoalForm extends LitElement {
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
            <input-field type="number" name="weight" label="Weight in kilo grams" pattern=".{2,3}" required></input-field>
            <input-field type="number" name="height" label="Height in centimeters" pattern=".{2,3}" required></input-field>
            <input-field type="email" name="email" label="Email" required></input-field>
            <input-field type="password" name="password" label="Password" required></input-field>
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

customElements.define('goal-form', GoalForm);