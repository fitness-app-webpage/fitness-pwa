import { LitElement, html, css } from "lit";

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
          <h1>Goal</h1>
          <form @submit=${this.submitForm}>
            <input-field type="text" name="activityLevel" label="Activity level(pal)" value="AVERAGE" required></input-field>
            <input-field type="text" name="goal" label="Goal" value="SLOWLYLOSEWEIGHT"  required></input-field>
            <input-field type="text" name="protein" label="Weight per kilo grams protein" pattern="([0-2])?([\.][0-9]?)?" required></input-field>
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
    const formData = new FormData(form);
    this.data = Object.fromEntries(formData.entries())
    this.dispatchEvent(new CustomEvent('next', {detail: this.data}));
  }

  handleSubmit(e) {
    this.shadowRoot.querySelector("form").requestSubmit();
  }
  handleBack(e) {
    this.dispatchEvent(new Event('back'));
  }
}

customElements.define('goal-form', GoalForm);