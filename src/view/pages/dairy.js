import { LitElement, html, css } from "lit";
import "../components/page/page"
import { BASE } from "../../app";
import '../components/diary/dairy-list'
import { getProducts } from "../../service/ApiService";
import {Task} from '@lit/task';

export default class Dairy extends LitElement{
    static get properties() {
        return{
        }
    }

    _breakFastTask = new Task(this, {
        task: async () => {
            return await getProducts().then(e => {
                return e;
            })
        },
        args: () => []
    })

    _lunchTask = new Task(this, {
        task: async () => {
            return await getProducts().then(e => {
                return e;
            })
        },
        args: () => []
    })

    _dinerTask = new Task(this, {
        task: async () => {
            return await getProducts().then(e => {
                return e;
            })
        },
        args: () => []
    })

    _snackTask = new Task(this, {
        task: async () => {
            return await getProducts().then(e => {
                return e;
            })
        },
        args: () => []
    })

    constructor() {
        super();
    }

    static get styles(){
        return css`
            h1 {
                text-align: center;
            }
            .container {
                display: flex;
                flex-direction: column;
                background-color: #eceaea;
            }
            .container > dairy-list {
                margin: 10px 0;
                background-color: white;
            }
        `;
    }
    
  
    render() {
        return html`
        <page-div>
            <h1>Dairy</h1>
            <div class="container">
                ${this._breakFastTask.render({
                    pending: () => html`<span>Loading...</span>`,
                    complete: (e) => html`<dairy-list title="Breakfast" .data=${e}></dairy-list>`,
                    error: (e) => html`<span>${e.error}</span>`
                })}
                ${this._lunchTask.render({
                    pending: () => html`<span>Loading...</span>`,
                    complete: (e) => html`<dairy-list title="Lunch" .data=${e}></dairy-list>`,
                    error: (e) => html`<span>${e.error}</span>`
                })}
                ${this._dinerTask.render({
                    pending: () => html`<span>Loading...</span>`,
                    complete: (e) => html`<dairy-list title="Diner" .data=${e}></dairy-list>`,
                    error: (e) => html`<span>${e.error}</span>`
                })}
                ${this._snackTask.render({
                    pending: () => html`<span>Loading...</span>`,
                    complete: (e) => html`<dairy-list title="Snack" .data=${e}></dairy-list>`,
                    error: (e) => html`<span>${e.error}</span>`
                })}
            </div>
        </page-div>`
    }

}
customElements.define('dairy-page', Dairy); 