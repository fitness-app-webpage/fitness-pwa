import { LitElement, html, css } from "lit";
import { setGoal } from "../../../service/ApiService";

export default class GoalForm extends LitElement {
  static get properties() {
    return{
      data: {type: Object},
    }
  };

  constructor() {
    super();
    this.data = {};
    this._today = this._formatDate(new Date())
    this._3monthsfurther = this._formatDate(new Date(new Date().setMonth(new Date().getMonth() + 3)))
  }

  static get styles(){ 
    return css`
        h1 {
            text-align: center;
            background: white;
            margin: 0;
            padding: 10px 0;
        }
        form {
            background-color: white;
            padding: 20px 0;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
        }
        date-picker, button-div {
          --date-picker-width: 200px;
          --button-div-width: 220px;
        }
    `;
  }

  render() {
    return html`
                <h1>Set goal</h1>
                <form @submit="${this.submitForm}">
                    <date-picker name="startDate" label="dd-mm-yyyy" text="Start date of goal" errormessage=${"Invalid start date"} value="${this._today}" required></date-picker>
                    <date-picker name="endDate" label="dd-mm-yyyy" text="End date of goal" errormessage=${"Invalid end date"} value="${this._3monthsfurther}" required></date-picker>
                    <button-div @click="${this.handleSubmit}" value="Set goal"></button-div>
                </form>
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
    this._labelImageText = "Image selected"
  }
  submitForm(e) {
    e.preventDefault();
    const form = e.target;
    if(form.checkValidity()) {
      this.data = new FormData(form);
      setGoal(this.data).then(e => {
        console.log(e)
      }).catch(error => {
        console.log(error)
      })
    } else {
      let firstInvalidInput = false;
      Array.from(form.elements).map(e => {
        if(e.id === "image" || e.type === "button") return;
        e.checkValidation()
        if(!firstInvalidInput && !e.checkValidation()) {
          firstInvalidInput = true;
          e.focus();
        }
      })
    }
  }

  handleSubmit(e) {
    this.shadowRoot.querySelector("form").requestSubmit()
  }

  _formatDate(date) {
    const day = date.getDate()
    const month = "0" + ((date.getMonth()) + 1);
    const year = date.getFullYear();
    return day + "-" + month + "-" + year;
  }
}

customElements.define('set-goal', GoalForm);