import { LitElement, html, css } from 'lit';

export default class DateSelector extends LitElement {
    static get properties() {
        return{
            _date: {state: true},
            _title: {type: String, state: true},
            _dateString: {type: String, state: true}
        }
      };
    
    constructor() {
        super();
        this._date = new Date();
        this._dateString =  new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000 ))
                .toISOString()
                .split("T")[0];
        this._title = "Today"
        this._yesterday = new Date(new Date(new Date().setDate(new Date().getDate() - 1)).getTime() - (new Date().getTimezoneOffset() * 60000 ))
                .toISOString()
                .split("T")[0];
        this._today = new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000 ))
                .toISOString()
                .split("T")[0];
        this._tomorrow = new Date(new Date(new Date().setDate(new Date().getDate() + 1)).getTime() - (new Date().getTimezoneOffset() * 60000 ))
                .toISOString()
                .split("T")[0];
    }

    static get styles() {
        return css`
        .container {
            display: flex;
            width: 100%;
            height: 50px;
            background-color: white;
            text-align: center;
            align-items: center;
            justify-content: center;
            gap: 20px;
        }
        span, p {
            font-size: 20px;
        }
        span {
            opacity: 0.6;
        }
        p {
            opacity: 0.8;
            margin: 0;
            width: 110px;
        }
        `;
    }

    render(){
        return html`
           <div class="container">
                    <span @click="${this.goBack}"><</span>
                    <p>${this._title}</p>
                    <span @click="${this.goFurther}">></span>
           </div>
        `;
    }
    goBack() {
        this._makeDateAndTitle(-1)
    }
    goFurther() {
        this._makeDateAndTitle(1)
    }
    _makeDateAndTitle(i) {
        this._date.setDate(this._date.getDate() + i)
        this._dateString = new Date(this._date.getTime() - (this._date.getTimezoneOffset() * 60000 ))
            .toISOString()
            .split("T")[0];
        switch(this._dateString) {
            case this._yesterday:
                this._title = "Yesterday";
                break;
            case this._today:
                this._title = "Today";
                break;
            case this._tomorrow:
                this._title = "Tomorrow"
                break;
            default:
                this._title = this._dateString
        }
        this.dispatchEvent(new CustomEvent("changedDate", {
            detail: this._dateString,
            bubbles: true,
            composed: true
        }))
    }
}

customElements.define('date-selector', DateSelector);