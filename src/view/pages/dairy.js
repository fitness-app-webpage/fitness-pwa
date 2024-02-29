import { LitElement, html, css } from "lit";
import "../components/page/page"
import '../components/diary/dairy-list'
import '../components/diary/daily-goalinfo'
import '../components/diary/date-selector'
import {Task} from '@lit/task';
import { getIntakes, getGoal } from "../../service/ApiService";
import "../components/input/datePicker"
import "../components/button/Button"
import "../components/forms/goal-form"

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
    }

    _dairyTask = new Task(this, {
        task: async ([dateString]) => {
            const goal = await getGoal().then(e => {
                this._totalCalories = e.nutritions.calories
                return e;
            }).catch(error => {
                throw Error(error.message)
            })
            return await getIntakes(dateString).then(e => {
                return e;
            }).catch(error => {
                return {totalCalories: 0}
            })
        },
        args: () => [this._date]
    })

    // _dailyGoalTask = new Task(this, {
    //     task: async () => {
    //         await getGoal().then(e => {
    //             this._totalCalories = e.nutritions.calories
    //             return e;
    //         })
    //     },
    //     args: () => []
    // })
    connectedCallback() {
        super.connectedCallback()
        this.addEventListener("intakeDeleted", this._updateData)
    }
    disconnectedCallback() {
        super.disconnectedCallback()
        this.removeEventListener("intakeDeleted", this._updateData)
    }
    firstUpdated() {
        super.firstUpdated()
        this._datePicker = this.shadowRoot.querySelector("date-selector")
    }
    _updateData() {
        // this._dailyGoalTask.run()
        this._dairyTask.run()
    }

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
                <date-selector @changedDate="${this._changeDate}"></date-selector>
                ${this._dairyTask.render({
                    pending: () => html`
                    <daily-goalinfo></daily-goalinfo>
                    <div class="container-dairy">
                                        <dairy-list title="Breakfast"></dairy-list>
                                        <dairy-list title="Lunch"></dairy-list>
                                        <dairy-list title="Diner"></dairy-list>
                                        <dairy-list title="Snack"></dairy-list>
                                    </div>`,
                    complete: (e) => html`
                    <daily-goalinfo consumed=${e.totalCalories} daily="${this._totalCalories}" remaining="${this._totalCalories - e.totalCalories}"></daily-goalinfo>
                                    <div class="container-dairy">
                                        <dairy-list title="Breakfast" .data="${this._makeIntakeData(e.intakes, "BREAKFAST")}"></dairy-list>
                                        <dairy-list title="Lunch" .data="${this._makeIntakeData(e.intakes, "LUNCH")}"></dairy-list>
                                        <dairy-list title="Diner" .data="${this._makeIntakeData(e.intakes, "DINER")}"></dairy-list>
                                        <dairy-list title="Snack" .data="${this._makeIntakeData(e.intakes, "SNACK")}"></dairy-list>
                                    </div>`,
                    error: (e) => { this._datePicker.style = "display: none;"
                        return html`<set-goal @response="${this._goalSet}"></set-goal>`}
                })}
            </div>
        </page-div>`
    }
    _makeIntakeData(intakes, type) {
        let data = [];
        if(intakes !== undefined) {
            intakes.map(e => {
                if(e.mealType === type){
                    data = [...data, {id: e.id, totalCalories: e.totalKcal, products: e.product}]
                }
            })
        }
        return data;
    }
    _changeDate(e) {
        this._date = e.detail
    }
    _goalSet(e) {
        this._datePicker.style = "display: block;"
        this._updateData();
    }
}
customElements.define('dairy-page', Dairy); 