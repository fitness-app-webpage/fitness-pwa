import { LitElement, html, css } from 'lit';
import "../product/dairy-productlist"
import { Router } from '@vaadin/router';
import { BASE } from '../../../app';
import {Task} from '@lit/task';
import { getDailyGoal } from '../../../service/ApiService';


export default class DailyGoalInfo extends LitElement {
    static get properties() {
        return{
        }
      };
      _dailyGoalTask = new Task(this, {
        task: async () => {
            return await getDailyGoal().then(e => {
                return e;
            })
        },
        args: () => []
    })
    
    constructor() {
        super();
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
            ${this._dailyGoalTask.render({
                pending: () => html`<span>Loading...</span>`,
                complete: (e) => html`   <div class="calories">
                    <div class="goal">
                        <p>${e.dailyIntake.kcal}</p>
                        <span>Goal</span>
                    </div>
                    <div class="minus">
                        <p>-</p>
                    </div>
                    <div class="consumed">
                        <p>${e.consumed.kcal}</p>
                        <span>Consumed</span>
                    </div>
                    <div class="equal">
                        <p>=</p>
                    </div>
                    <div class="remaining">
                        <p>${e.remaining.kcal}</p>
                        <span>Remaining</span>
                    </div>
                    
                </div>`
            })}
        `;
    }
    handleClick() {
        Router.go(`${BASE}/products/search?mealtype=${this.title.toUpperCase()}`)
    }
}

customElements.define('daily-goalinfo', DailyGoalInfo);