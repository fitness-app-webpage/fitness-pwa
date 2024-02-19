import { LitElement, html, css } from "lit";
import "../components/page/page"
import '../components/diary/dairy-list'
import '../components/diary/daily-goalinfo'

export default class Dairy extends LitElement{
    static get properties() {
        return{
            _totalCalEaten: {type: Number, state: true},
            _totalDailyCal: {type: Number, state: true},
        }
    }

    constructor() {
        super();
        this._totalCalEaten = 0;
        this._totalDailyCal = 0;
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
                <h1>Dairy</h1>
                <daily-goalinfo></daily-goalinfo>
                <div class="container-dairy">
                    <dairy-list title="Breakfast" mealtype="BREAKFAST" @getTotalCal="${this._setTotalCalEaten}"></dairy-list>
                    <dairy-list title="Lunch" mealtype="LUNCH" @getTotalCal="${this._setTotalCalEaten}"></dairy-list>
                    <dairy-list title="Diner" mealtype="DINER" @getTotalCal="${this._setTotalCalEaten}"></dairy-list>
                    <dairy-list title="Snack" mealtype="SNACK" @getTotalCal="${this._setTotalCalEaten}"></dairy-list>
                </div>
            </div>
        </page-div>`
    }
    _setTotalCalEaten(e) {
        this._totalCalEaten += e.detail
    }

}
customElements.define('dairy-page', Dairy); 