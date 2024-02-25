import { LitElement, html, css } from 'lit';

export default class DateSelector extends LitElement {
    static get properties() {
        return{
            _date: {state: true},
            _title: {type: String, state: true},
            _dateString: {type: String, state: true},
            _scrollX: {type: Number, state: true},
            _previous: {type: String, state: true},
            _next: {type: String, state: true},
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
        this._scrollX = 0;
        this._previous = "Yesterday"
        this._next = "Tomorrow"
    }

    connectedCallback() {
        super.connectedCallback()
    }

    disconnectedCallback() {
        super.disconnectedCallback();
    }
    firstUpdated() {
        super.firstUpdated()
        this._item = this.shadowRoot.querySelector(".title")
        this._item.scrollLeft = (this._item.scrollWidth - this._item.clientWidth) / 2
        this._item.addEventListener("scroll", this._scroll.bind(this))
        this._item.style = "scroll-behavior: smooth"
        this._scrollWidth = this._item.offsetWidth;

    }
    _scroll(e) {
        this._scrollX = e.target.scrollLeft;
        this._scrollWidth = e.target.scrollWidth

        const timeOut = e.target.scrollLeft % e.target.offsetWidth === 0 ? 0 : 150;

        clearTimeout(e.target.scrollTimeout)

        e.target.scrollTimeout = setTimeout(() => {
            if(!timeOut) {
                const left = 0;
                const right = (this._scrollWidth - (this._scrollWidth / 3));

                switch(this._scrollX) {
                    case left:
                        this.goBack()
                        break;                     
                    case right:
                        this.goFurther()
                        break;
                }
            }
        }, timeOut);
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
        .title {
            display: flex;
            width: 110px;
            scroll-snap-type: x mandatory; 
            /* scroll-behavior: smooth; */
            overflow: auto;
        }
        .previous, .next {
            scroll-snap-align: start;
            /* display: none; */
        }
        .date {
            scroll-snap-align: start;
        }
        .title::-webkit-scrollbar {
            display: none;
        }
        `;
    }

    render(){
        return html`
           <div class="container">
                    <span @click="${this.goBack}"><</span>
                    <div class="title">
                        <div class="text-center">
                            <p class="previous">${this._previous}</p>
                        </div>
                        <div class="text-center">
                            <p class="date">${this._title}</p>
                        </div>
                        <div class="text-center">
                            <p class="next">${this._next}</p>
                        </div>
                    </div>
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

        this._setDays();

        this.dispatchEvent(new CustomEvent("changedDate", {
            detail: this._dateString,
            bubbles: true,
            composed: true
        }))
    }
    _setDays() {
        this._dateString = this._makeDateString(this._date)
        const date = new Date(this._dateString);
        
        date.setDate(date.getDate() - 1)
        this._previous = this._makeDateString(date)

        date.setDate(date.getDate() + 2)
        this._next = this._makeDateString(date)

        this._item.style = "scroll-behavior: none"
        this._item.scrollLeft = (this._item.scrollWidth - this._item.clientWidth) / 2 
        this._item.style = "scroll-behavior: smooth"
        this._checkWhichDay()
        
    }
    _checkWhichDay() {
        const differenceInTime = this._date.getTime() - new Date().getTime()
        const differenceInDays = Math.round(
            (differenceInTime / (1000 * 3600 * 24))
        )

        switch(differenceInDays) {
            case -2:
                this._title = this._dateString;
                this._previous = this._previous
                this._next = "Yesterday"
                break;
            case -1:
                this._title = "Yesterday";
                this._previous = this._previous
                this._next = "Today"
                break;
            case 0:
                this._title = "Today";
                this._previous = "Yesterday"
                this._next = "Tomorrow"
                break;
            case 1:
                this._title = "Tomorrow"
                this._previous = "Today"
                this._next = this._next
                break;
            case 2:
                this._title = this._dateString
                this._previous = "Tomorrow"
                this._next = this._next
                break;
            default:
                this._title = this._dateString
                this._next = this._next
                this._previous = this._previous
        }
        // switch(this._dateString) {
        //     case this._yesterday:
        //         this._title = "Yesterday";
        //         this._previous = this._previous
        //         this._next = "Today"
        //         break;
        //     case this._today:
        //         this._title = "Today";
        //         this._previous = "Yesterday"
        //         this._next = "Tomorrow"
        //         break;
        //     case this._tomorrow:
        //         this._title = "Tomorrow"
        //         this._previous = "Today"
        //         this._next = this._next
        //         break;
        //     default:
        //         this._title = this._dateString
        //         this._next = this._next
        //         this._previous = this._previous
        // }
    }

    _makeDateString(date) {
        return new Date(date.getTime() - (date.getTimezoneOffset() * 60000 ))
            .toISOString()
            .split("T")[0];
    }
}

customElements.define('date-selector', DateSelector);