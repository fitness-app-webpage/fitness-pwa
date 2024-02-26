import { LitElement, html, css } from "lit";
import "../../input/selector-picker"

export default class ActivityForm extends LitElement {
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
            selector-picker {
              --padding: 15px 0;
            }
    }
    `;
  }

  render() {
    return html`
          <h1>Activity level(pal)</h1>
          <form @submit=${this.submitForm} @keyup=${this.enterKeyPressed} novalidate>
            <selector-picker 
              name="activityLevel" 
              label="Activity level(pal)" 
              .options=${[
                {value: "LITTLETONONE", label: "little to none", info: "Spend most of the day sitting and does not sport"}, 
                {value: "UNDERAVERAGE", label: "Under average", info: "Sports 1-3 days per week"}, 
                {value: "AVERAGE", label: "Average", info: "Sports 3-5 days per week"}, 
                {value: "SLIGHTLYABOVEAVERAGE", label: "Slightly above average", info: "Sports 5-7 days per week"}, 
                {value: "ABOVEAVERAGE", label: "Above average", info: "Sports 7+ days per week"}
              ]} 
              required>
            </selector-picker>
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
    this.dispatchEvent(new Event('back'));
  }
  enterKeyPressed(e) {
    if(e.key === "Enter" || e.keyCode === 13) {
      this.handleSubmit();
    }
  }
}

customElements.define('activity-form', ActivityForm);