import { LitElement, html, css } from "lit";

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
    :host {
      width: 100%;
    }
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
      margin: 10px 0 0 0;
    }
    button-div {
      width: 120px;
    }

    @media only screen and (max-width: 480px) {
            h1 {
                font-size: 24px;
            }
            button-div {
              width: 150px;
            }
            .button-container {
              position: fixed;
              display: flex;
              justify-content: space-between;
              margin: 0;
              bottom: 0;
              width: calc(100% - 54px);
              padding: 40px 0;              
            }
    }
    `;
  }

  render() {
    return html`
          <h1>Register</h1>
          <form @submit=${this.submitForm} @keyup=${this.enterKeyPressed} novalidate>
            <input-field type="text" name="username" label="Username" pattern=".{1,}" required></input-field>
            <input-field type="email" name="email" label="Email" pattern=".{1,}" required></input-field>
            <input-field type="password" name="password" label="Password" pattern=".{1,}" required></input-field>
            <input-field type="password" name="confirm_password" label="Confirm password" pattern=".{1,}" errormessage="Passwords do not match" required></input-field>
            <div class="button-container">
              <button-div value="Back" @click=${this.handleBack}></button-div>
              <button-div value="Register" @click=${this.handleSubmit}></button-div>
            </div>
          </form>
  `;
  }

  submitForm(e) {
    e.preventDefault();
    const form = e.target;
    if(form.checkValidity()) {
      const formData = new FormData(form);
      this.data = Object.fromEntries(formData.entries())
      if(this.data.password === this.data.confirm_password) {
        // const {confirm_password, ...data} = this.data
        // this.data = data;
        this.dispatchEvent(new CustomEvent('submit', {detail: this.data}));
      } else {
        this.shadowRoot.querySelector("input-field[name='confirm_password']").setError()
      }
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
  handleBack(e) {
    this.dispatchEvent(new Event('back'));
  }
  enterKeyPressed(e) {
    if(e.key === "Enter" || e.keyCode === 13) {
      this.handleSubmit();
    }
  }
}

customElements.define('register-form', RegisterForm);