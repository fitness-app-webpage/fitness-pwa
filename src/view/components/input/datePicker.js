import { LitElement, html, css } from "lit";
import {repeat} from 'lit/directives/repeat.js';

export default class DatePicker extends LitElement{
  
  static get properties() {
    return{
      value: {type: String, reflect: true},
      name: {type: String, reflect: true},
      required: {type: Boolean, reflect: true},
      text: {type: String},
      label: {type: String},
      pattern: {type: String},
      min: {type: String},
      max: {type: String},
      validity: {type: Object},
      errormessage: {type: String},
      ariaLabel: {type: String},
      _divs: {type: Array, state: true},
      _navCalendar: {type: Number, state: true},
      _year: {state: true},
      _direction: {type: String, state: true}
    }
  };

  static get formAssociated() {
    return true;
  }

  constructor() {
    super();
    this.value = "";
    this.text = "default text"
    this.name = "";
    this.label = "";
    this.pattern ="(0[1-9]|1[0-9]|2[0-9]|3[01])-(0[1-9]|1[012])-[0-9]{4}"
    this.min = 10;
    this.max = 10;
    this.ariaLabel = "";
    this.validity = {};
    this.errormessage = "Field is required";
    this.internals = this.attachInternals();
    this._pickerStatus = false;
    this._yearStatus = false;
    this._navCalendar = 0 + new Date().getMonth();
    this._divs = []
    this._monthAndYear = "";
    this._year = new Date().getFullYear()
    this._month = "";
    this._yearDivs = [];
    this._direction = "";
    this._counter = 0;
    this._id = "";
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('tabindex', '0');
    this.addEventListener('focus', this.setFocus.bind(this))
    this._makeYears();
    this.internals.setFormValue(this.value)
    if(this.required && this.value === "") {
      this.internals.setValidity({customError: true}, this.errormessage)
    }
    
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.removeEventListener('focus', this)
  }

  setFocus() {
    this.shadowRoot.querySelector('input').focus()
  }

  formResetCallback() {
    this.value = "";
    this.internals.setFormValue(this.value)
  }

  updated() {
    this.internals.setFormValue(this.value)
    this.setValidity(this.shadowRoot.querySelector("input"))
  }
  
  static get styles(){ 
    return css`
      h1{
        font-size: var(--date-picker-h1-font-size, 18px);
        margin-left: 12px;
      }
      .background-div{
        position: relative;
        padding: 8px;
        margin: 9px 0;
        border-radius: var(--input-field-border-radius, 30px);
        /* background-color: var(--input-field-background-color, #e4dfdf); */
        border: #e4dfdf solid;
      }
      .invalid-input {
      border: 2px solid red;
      width: 340px;
     }
     #invalid-input {
      animation: shake 0.2s ease-in-out 0s 2;
     }
      label {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        color: var(--input-field-label-color, #545454);
        font-weight: normal;
        transition: .4s ease;
        user-select: none;
        cursor: text;
      }
      label, input {
        display: flex;
        align-items: center;
        margin-left: 24px;
        margin-right: 6px;
      }
      input {
        position: relative;
        top: 0px;
        border: none;
        outline: none;
        padding: 0;
        background-color: var(--input-field-background-color, inherit);
        line-height: 2em;
        width: 80%;
      }
      input:focus + label,
      :host(:not([value=""])) label {
        top: -1.5px;
        background-color: white;
        padding: 0 4px;
        margin-left: 20px;
        font-size: 14px;
      }
      
      input:-webkit-autofill,
      input:-webkit-autofill:hover, 
      input:-webkit-autofill:focus, 
      input:-webkit-autofill:active{
        box-shadow: 0 0 0 30px var(--box-shadow-color, white) inset;
      
      }
      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
      }
      .input-datepicker {
        display: flex;
        align-items: center;
      }
      .date-picker-icon {
        /* position: relative; */
        /* width: 2px; */
        display: flex;
        align-items: center;
        max-height: 2em;
        height: 0.01em;
      }
      button {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        padding: 0;
        background-color: transparent;
        text-align: center;
        border: 0;
        border-radius: 50%;
        cursor: pointer;
        color: black;
        outline: 0;
      }
      button:hover {
        background-color: rgba(0, 0, 0, 0.04);
      }
      button svg{
        height: 24px;
        width: 24px;
      }
      .picker {
        display: none;
        position: absolute;
        /* inset: auto auto 0px 0px; */
        height: 340px;
        width: 320px;
        border-radius: 5px;
        background-color: white;
        box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 5px -3px, rgba(0, 0, 0, 0.14) 0px 8px 10px 1px, rgba(0, 0, 0, 0.12) 0px 3px 14px 2px;
      }
      .container {
        border-radius: inherit;
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
      }
      .date-picker-icon button {
        padding: 5px;
      }
      .header-picker {
        display: flex;
        min-height: 40px;
        max-height: 40px;
        /* justify-content: space-evenly; */
        align-items: center;
        padding: 0 12px 0 12px;
        margin: 16px 0 8px 0;
        /* background-color: red; */
        /* border-bottom: 2px solid; */
      }
      svg {
        fill: currentColor;
      }
      .header-left {
        display: flex;
        align-items: center;
        margin-right: auto;
      }
      .header-right {
        display: flex;
      }
      .days-row {
        display: flex;
        justify-content: center;
        text-align: center;
        align-items: center;
        flex-wrap: wrap;
      }
      .days-row span {
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        opacity: 0.6;
        font-size: 0.75rem;
      }
      .days-picker {
        /* background-color: red; */
        height: 80px;
        width: 80px;
      }
      .month-year {
        font-size: 20px;
        margin-right: 6px;
      }
      .arrow-down-button {
        padding: 5px;
      }
     .header-right button {
      padding: 5px;
     }
     .space {
      height: 34px;
      width: 12px;
     }
     .days-picker-row {
      display: flex;
      justify-content: center;
      text-align: center;
      align-items: center;
      flex-wrap: wrap;
     }
     .day, .placeholder {
      width: 40px;
      height: 40px;
     }
     .body-picker {
      max-height: 276px;
     }
     .year-picker {
      display: flex;
      flex-wrap: wrap;
      overflow-y: auto;
      height: 100%;
      max-height: 100%;
      justify-content: center;
     }
     .year-picker {
      width: 100%;
      flex-wrap: wrap;
     }
     .year-button {
      /* max-width: 300px; */
      display: flex;
      flex-basis: 20%;

      padding: 5px 10px;
      margin: 0 4px;
      font-size: 20px;
      border-radius: 20px;
     }
     .year-button:disabled {
      color: grey;
     }
     .error-message {
      margin-left: 12px;
      color: red;
      visibility: hidden;
     }
     @keyframes shake {
      0% {
        margin-left: 0rem;
      }
      25% {
        margin-left: 0.5rem;
      }
      75% {
        margin-left: -0.5rem;
      }
      100% {
        margin-left: 0rem;
      }
    }

    .days {
      position: relative;
      display: flex;
      justify-content: center;
      /* align-items: center; */
      height: 240px;
      width: 320px;
      
      overflow: hidden;
    }
    .days-number-row {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      transition: transform 350ms cubic-bezier(0.35, 0.8, 0.4, 1) 0ms;
    }
    .left {
      left: -100%;
    }
    .right {
      right: -100%;
    }
    .to-left {
      left: 100%;
      right: -100%;
      transform: translate(-100%);
    }
    .to-right {
      left: -100%;
      right: 100%;
      transform: translate(100%)
    }
    .selected {
      border: 2px solid grey;
    }
    .selected-year {
      border: 2px solid grey;
    }
  
      `;
    }


  render() {
    return html`
    <h1>${this.text}</h1>
    <div class="background-div">
        <div class="input-datepicker">
          <input 
          type="tel"
          name=${this.name} 
          id=${this.name} 
          .value="${this.value}" 
          pattern=${this.pattern}
          minlength="${this.min}" 
          maxlength="${this.max}"
          aria-label=${this.ariaLabel}
          @input="${this.updateValue}"
          ?required="${this.required}"
          />
          <label for="${this.name}">${this.label}</label>
          <div class="date-picker-icon">
            <button @click="${this.handleDatepicker}">
              <svg>
                <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z" />
              </svg>
            </button>
        </div>
      </div>
    </div>
    <span class="error-message">${this.errormessage}</span>

    <div class="picker">
      <div tabindex=0></div>
        <div class="container">
          <div class="header-picker">
            <div class="header-left">
              <span class="month-year">${this._monthAndYear}</span>
              <button class="arrow-down-button" @click=${this.changeYear}>
                <svg>
                  <path d="M7 10l5 5 5-5z" />
                </svg>
              </button>
            </div>
            <div class="header-right">
            <button @click=${this.goMonthBack}>
                <svg>
                  <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
                </svg>
              </button>
              <div class="space"></div>
              <button @click=${this.goToNextMonth}>
                <svg>
                  <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                </svg>
              </button>
            </div>
          </div>
          <div class="body-picker">
            <div class="year-picker" style="display: none">
              ${this._yearDivs}
            </div>
            <div class="body-container">
              <div class="days-row">
                <span>M</span>
                <span>T</span>
                <span>W</span>
                <span>T</span>
                <span>F</span>
                <span>S</span>
                <span>S</span>
              </div>
              <div class="days">
              ${repeat(this._divs,
                          (e) => e.id,
                          (e) => {if(e.id === this._id) {
                            return e.value
                          }}
                        )}
              </div>
            </div>
          </div>
        </div>
    </div>
    `;
  }

  updateValue(e) {
    this.shadowRoot.querySelector(".background-div").classList.remove("invalid-input")
    this.shadowRoot.querySelector(".error-message").style = "visibility: none;"
    if(isNaN(e.target.value.charAt(e.target.value.lenght - 1))) {
      e.target.value = this.value;
      return;
    }
    this.value = e.target.value;
    if(this.value.length === 2 || this.value.length === 5) {
      this.value += "-"
    }
    this.internals.setFormValue(this.value)
    this.dispatchEvent(new CustomEvent('input-changed', {[e.target.name]: this.value}));
  }

  setValidity(input) {
    if(!input.checkValidity()) {
      // this.validity = input.validity;
      
      this.internals.setValidity({customError: true}, this.errormessage);
    } else {
      this.internals.setValidity({});
    }
  }
  checkValidation() {
    const input = this.shadowRoot.querySelector("input")
    const errorDiv = this.shadowRoot.querySelector(".background-div");
    const errorMessage = this.shadowRoot.querySelector(".error-message");
    if(!input.checkValidity()) {
      errorDiv.classList.add("invalid-input")
      errorDiv.id = "invalid-input"
      errorMessage.style = "visibility: visible;" 
      setTimeout(() => {
        errorDiv.id = "";
      }, 500)  
    }
  }

  handleDatepicker() {
    this._pickerStatus = !this._pickerStatus;
    this.shadowRoot.querySelector(".picker").style.display = this._pickerStatus ? "block" : "none"
    if(this._pickerStatus) {
      this._makeDateDivs();
    }
  }

  _makeDateDivs() {
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const dt = new Date(`${this._year}`);

    dt.setMonth(this._navCalendar)
    if(this._navCalendar == -1 || this._navCalendar === 12) {
      this._navCalendar = dt.getMonth();
      this._year = dt.getFullYear();
      dt.setFullYear(this._year)
    }
    let rowDivs = [];
    let res = [];

    const day = dt.getDate()
    this._month = dt.getMonth()
    const year = dt.getFullYear()

    const firstDayOfMonth = new Date(year, this._month, 1);
    const dayInMonth = new Date(year, this._month + 1, 0).getDate();

    const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
      weekday: 'long',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });
    
    let paddingDays = weekdays.indexOf(dateString.split(', ')[0]);
    this._monthAndYear = `${dt.toLocaleDateString('en-us', { month: 'long' })} ${year}`;
    
    paddingDays = paddingDays === 0 ? 7 : paddingDays;

    this._id = (this._month + 1) + "-" + this._year;

    let count = false;

    this._divs.map(e => {
      if(e.id === this._id) {
        count = true;
      }
    })
    if(!count) {
      for(let i = 1; i <= paddingDays + dayInMonth; i++) {
        if(i >= paddingDays) {
          rowDivs = [...rowDivs, html`<button class="day" @click=${this.clickDay}>${i - paddingDays + 1}</button>`]
        } else {
          rowDivs = [...rowDivs, html`<div class="placeholder"></div>`]
        }
        if(i - paddingDays + 1 === dayInMonth) {
          for(let a = 0; rowDivs.length < 7; a++) {
            rowDivs = [...rowDivs, html`<div class="placeholder"></div>`]
          }
        }
        if(rowDivs.length % 7 === 0) {
          res = [...res, html`<div class="days-picker-row">${rowDivs}</div>`]
          rowDivs = []
        }
      }
      this._divs = [...this._divs, {id: this._id, value: html`
                      <div class="days-number-row">
                        ${res}
                      </div>
                      `}];
    }
  }

  
  goMonthBack() {
    this._navCalendar--;
    // this._direction = "left to-right";
    // this.shadowRoot.querySelector(".days-number-row").classList.add("to-right")
    this._makeDateDivs();
  }
  goToNextMonth() {
    this._navCalendar++;
    // this._direction = "right to-left";
    // this.shadowRoot.querySelector(".days-number-row").classList.add("to-left")
    this._makeDateDivs();
  }
  changeYear() {
    this._yearStatus = !this._yearStatus
    this.shadowRoot.querySelector(".arrow-down-button")
      .style = this._yearStatus 
      ? "transform: rotateX(180deg)" 
      : "transform: rotateX(0eg)"

    if(this._yearStatus) {
      this.shadowRoot.querySelector(".body-container").style.display = "none";
      this.shadowRoot.querySelector(".year-picker").style.display = "flex"
    } else {
      this.shadowRoot.querySelector(".body-container").style.display = "block";
      this.shadowRoot.querySelector(".year-picker").style.display = "none";

      this._makeDateDivs();
    }
  }

  // _scrollToSelectedYear(selectedYear, yearPicker) {
  //   const height = selectedYear.offsetHeight;
  //   const selectedYearCords = selectedYear.getBoundingClientRect();
  //   const setHeight = (selectedYearCords.y + (3.5 * height))
  //   const setWidth = (selectedYearCords.x + (3.5 * height))
  //   yearPicker.scrollTo(setHeight, setWidth)
  // }
  _makeYears() {
    for(let i = 1900; i <= 2099; i++) {
      this._yearDivs = [...this._yearDivs, 
                          html`<button 
                            class="year-button${this._year === i ? " selected-year" : ""}" 
                            ?disabled=${new Date().getFullYear() >= i ? false : true} 
                            @click=${this.clickOnYear}>${i}</button>
      `]
    }
  }
  clickOnYear(e) {
    this._year = Number(e.target.textContent)
    this.shadowRoot.querySelector(".selected-year").classList.remove("selected-year")
    e.target.classList.add("selected-year")
    this.changeYear();
  }
  async clickDay(e) {
    this._removeSelectedDay(this.shadowRoot.querySelectorAll(".day"))
    e.target.classList.add("selected")
    this._divs.map(e => {
      if(e.id === this._id) {
        e.value = this.shadowRoot.querySelector(".days-number-row")
        this._divs = [e]
      }
    })
    let month = String(this._month + 1)
    this.value = `${e.target.textContent.length === 1 ? 0 + e.target.textContent : e.target.textContent}-${month.length === 1 ? 0 + month : month}-${this._year}`
    this.shadowRoot.querySelector(".background-div").classList.remove("invalid-input")
    this.shadowRoot.querySelector(".error-message").style = "visibility: none;"
    this.handleDatepicker();
  }
  _removeSelectedDay(days) {
    for(let i of days) {
      if(i.classList.contains("selected"))
        i.classList.remove("selected")
    }
  }
}
customElements.define('date-picker', DatePicker);