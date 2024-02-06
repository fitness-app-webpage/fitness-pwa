import { LitElement, html, css } from "lit";

export default class UserForm extends LitElement {
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
      justify-content: center;
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
                font-size: 20px;
            }
    }
    `;
  }

  render() {
    return html`
          <h1>What is your first and last name?</h1>
            <form @submit=${this.submitForm} @keyup=${this.enterKeyPressed} novalidate>
              <input-field type="text" name="firstName" label="First name" pattern=".{1,}" required></input-field>
              <input-field type="text" name="lastName" label="Last name" pattern=".{1,}" required></input-field>
              <div class="button-container">
                <button-div value="Login" @click=${this.handleBack}></button-div>
                <button-div value="Next" @click=${this.handleSubmit}></button-div>
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

  handleBack(e) {
    this.dispatchEvent(new Event('login'));
  }
  enterKeyPressed(e) {
    if(e.key === "Enter" || e.keyCode === 13) {
      this.handleSubmit();
    }
  }
}

customElements.define('user-form', UserForm);