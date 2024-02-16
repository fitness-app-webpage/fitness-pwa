import { LitElement, html, css } from "lit";
import "../components/page/page"
import '../components/diary/dairy-list'
import { getIntakes } from "../../service/ApiService";
import {Task} from '@lit/task';

export default class Dairy extends LitElement{
    static get properties() {
        return{
        }
    }

    _breakFastTask = new Task(this, {
        task: async () => {
            var dateString = new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000 ))
                .toISOString()
                .split("T")[0];
            return await getIntakes(dateString).then(e => {
                return e.map(data => {
                    if(data.mealType === "BREAKFAST") {    
                        data.products.map(data => {
                            this._breakfast = [...this._breakfast, data]
                            return;
                        })
                    }
                    if(data.mealType === "LUNCH") {    
                        data.products.map(data => {
                            this._lunch = [...this._lunch, data]
                            return;
                        })
                    }
                    if(data.mealType === "DINER") {    
                        data.products.map(data => {
                            this._diner = [...this._diner, data]
                            return;
                        })
                    }
                    if(data.mealType === "SNACK") {    
                        data.products.map(data => {
                            this._snack = [...this._snack, data]
                            return;
                        })
                    }
                })
            })
        },
        args: () => []
    })

    constructor() {
        super();
        this._breakfast = [];
        this._lunch = [];
        this._diner = [];
        this._snack = [];
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
                <div class="container-dairy">
                    ${this._breakFastTask.render({
                        pending: () => html`<span>Loading...</span>`,
                        complete: (e) => html`
                            <dairy-list title="Breakfast" .data=${this._breakfast}></dairy-list>
                            <dairy-list title="Lunch" .data=${this._lunch}></dairy-list>
                            <dairy-list title="Diner" .data=${this._diner}></dairy-list>
                            <dairy-list title="Snack" .data=${this._snack}></dairy-list>
                            `,
                        error: (e) => html`<dairy-list title="Breakfast" .data=${this._breakfast}></dairy-list>
                            <dairy-list title="Lunch" .data=${this._lunch}></dairy-list>
                            <dairy-list title="Diner" .data=${this._diner}></dairy-list>
                            <dairy-list title="Snack" .data=${this._snack}></dairy-list>`
                    })}
                </div>
            </div>
        </page-div>`
    }

}
customElements.define('dairy-page', Dairy); 