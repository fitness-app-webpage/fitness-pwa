import { LitElement, html, css } from "lit";
import "../components/page/page"
import '../components/diary/dairy-list'
import '../components/diary/daily-goalinfo'
import '../components/diary/date-selector'
import {Task} from '@lit/task';
import { getIntakes } from "../../service/ApiService";

export default class Dairy extends LitElement{
    static get properties() {
        return{
            _totalCalEaten: {type: Number, state: true},
            _totalDailyCal: {type: Number, state: true},
            _date: {type: String, state: true}
        }
    }

    constructor() {
        super();
        this._totalCalEaten = 0;
        this._totalDailyCal = 0;
        this._date = new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000 ))
                .toISOString()
                .split("T")[0];
        this._breakfast = [];
        this._lunch = [];
        this._diner = [];
        this._snack = [];
    }

    _dairyTask = new Task(this, {
        task: async ([dateString]) => {
            return await getIntakes(dateString).then(e => {
                return e;
            })
        },
        args: () => [this._date]
    })

    static get styles(){
        return css`
            h1 {
                text-align: center;
                padding: 20px 0;
                margin: auto;
                background-color: white;
            }
            .container {
                height: 100%;
                background-color: #eceaea;
            }
            .container-dairy {
                display: flex;
                flex-direction: column;
                background-color: #eceaea;
            }
            .container-dairy > dairy-list {
                margin: 10px 0;
                background-color: white;
            }
            .container-dairy > :first-child {
                margin-top: 20px;
            }
            .container-dairy > :last-child{
                margin-bottom: 20px;
                /* margin-bottom: auto; */

            }
        `;
    }
    
  
    render() {
        return html`
        <page-div>
            <div class="container">
                <date-selector @changedDate="${this._removeTotal}"></date-selector>
                <!-- <h1>Dairy</h1> -->
                ${this._dairyTask.render({
                    pending: () => html`<span>Loading...</span>`,
                    complete: (e) => html`<daily-goalinfo consumed=${e.totalCalories}></daily-goalinfo>
                                    <div class="container-dairy">
                                        <dairy-list title="Breakfast" .data="${this._makeIntakeData(e.intakes, "BREAKFAST")}"></dairy-list>
                                        <dairy-list title="Lunch" .data="${this._makeIntakeData(e.intakes, "LUNCH")}"></dairy-list>
                                        <dairy-list title="Diner" .data="${this._makeIntakeData(e.intakes, "DINER")}"></dairy-list>
                                        <dairy-list title="Snack" .data="${this._makeIntakeData(e.intakes, "SNACK")}"></dairy-list>
                                    </div>`,
                    error: () => html`<daily-goalinfo></daily-goalinfo>
                                    <div class="container-dairy">
                                        <dairy-list title="Breakfast"></dairy-list>
                                        <dairy-list title="Lunch"></dairy-list>
                                        <dairy-list title="Diner"></dairy-list>
                                        <dairy-list title="Snack"></dairy-list>
                                    </div>`
                })}
            </div>
        </page-div>`
    }
    _makeIntakeData(intakes, type) {
        let data = [];
        intakes.map(e => {
            if(e.mealType === type){
                e.products.map(x => data = [...data, x])
            }
        })
        return data;
    }
    _setTotalCalEaten(e) {
        this._totalCalEaten += e.detail
    }
    _removeTotal(e) {
        this._date = e.detail
        this._totalCalEaten = 0;
    }

}
customElements.define('dairy-page', Dairy); 