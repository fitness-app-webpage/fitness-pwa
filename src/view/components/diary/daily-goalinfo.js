import { LitElement, html, css } from 'lit';
import "../product/dairy-productlist"
import { Router } from '@vaadin/router';
import { BASE } from '../../../app';

export default class DailyGoalInfo extends LitElement {
    static get properties() {
        return{
            _date: {type: String, state: true},
            consumed: {type: Number},
            daily: {type: Number},
            remaining: {type: Number}
        }
      };
    
    constructor() {
        super();
        this._date = new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000 ))
                .toISOString()
                .split("T")[0];
        this.consumed = 0;
        this.daily = 0;
        this.remaining = 0;
    }

    static get styles() {
        return css`
       
       .calories {
                background-color: white;
                display: flex;
                align-items: center;
                justify-content: space-evenly;
                padding-bottom: 20px;
            }
            .calories p {
                font-size: 20px;
                margin-bottom: 0;
            }
            .calories > div {
                display: flex;
                flex-direction: column;
                justify-content: center;
                text-align: center;
            }
            .calories span {
                opacity: 0.6;
                font-size: 14px;
                margin-top: 4px;
            }
            .minus p, .equal p {
                margin: 0;
            }
        `;
    }

    render(){
        return html`
               <div class="calories">
                    <div class="goal">
                        <p>${this.daily}</p>
                        <span>Goal</span>
                    </div>
                    <div class="minus">
                        <p>-</p>
                    </div>
                    <div class="consumed">
                        <p>${this.consumed}</p>
                        <span>Consumed</span>
                    </div>
                    <div class="equal">
                        <p>=</p>
                    </div>
                    <div class="remaining">
                        <p>${this.remaining}</p>
                        <span>Remaining</span>
                    </div>
                    
                </div>
        `;
    }
    handleClick() {
        Router.go(`${BASE}/products/search?mealtype=${this.title.toUpperCase()}`)
    }
    _changedDate(e) {
        this._date = e.detail
    }
}

customElements.define('daily-goalinfo', DailyGoalInfo);