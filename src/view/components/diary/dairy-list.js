import { LitElement, html, css } from 'lit';
import {repeat} from 'lit/directives/repeat.js';
import "../product/dairy-productlist"
import { Router } from '@vaadin/router';
import { BASE } from '../../../app';
import {Task} from '@lit/task';
import { getIntakes } from '../../../service/ApiService';


export default class DairyList extends LitElement {
    static get properties() {
        return{
            title: {type: String},
            _data: {type: Array, state: true},
            _total: {type: Number, state: true},
            mealtype: {type: String}

        }
      };
      _dairyTask = new Task(this, {
        task: async ([mealtype]) => {
            var dateString = new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000 ))
                .toISOString()
                .split("T")[0];
            return await getIntakes(dateString).then(e => {
                e.map(data => {
                    if(data.mealType === mealtype) {   
                        data.products.map(data => {
                            this._data = [...this._data, data]
                            this._total += data.nutritions.calories
                        })
                    }
                })
                this.dispatchEvent(new CustomEvent("getTotalCal", 
                    {detail: this._total}
                ))
                return e;
            })
        },
        args: () => [this.mealtype]
    })
    
    constructor() {
        super();
        this.title = "default"
        this._data = [];
        this._total = 0;
        this.mealtype = "";
    }

    static get styles() {
        return css`
        .container {
            display: flex;
            flex-direction: column;
        }
        p {
            /* text-align: center; */
            font-size: 18px;
            margin: 0;
            /* color: #4f63f7; */
        }
        .header {
            display: flex;
            flex-direction: row;
            align-items: center;
            /* justify-content: space-between; */
            padding: 10px 0 10px 10px;
            border-bottom: 1px solid #dbd8d8;
        }
        .header > p {
            width: calc(100% - 40px);
        }
        .add-product {
            display: flex;
            flex-direction: row;
            padding: 10px 0 10px 10px;
            /* border-bottom: 1px solid #dbd8d8; */
        }
        `;
    }

    render(){
        return html`
            <div class="container">
                <div class="header">
                    <p>${this.title}</p>
                    <span>${this._total}</span>
                </div>
                <div class="products">
                    ${this._dairyTask.render({
                        pending: () => html`<span>Loading...</span>`,
                        complete: (e) => html`<dairy-productlist .products=${this._data}></dairy-productlist>`,
                        error: (e) => html`<dairy-productlist></dairy-productlist>`
                    })}
                </div>
                <div class="add-product" @click="${this.handleClick}">
                    <span>Add a product</span>
                </div>
            </div>
        `;
    }
    handleClick() {
        Router.go(`${BASE}/products?mealtype=${this.title.toUpperCase()}`)
    }
}

customElements.define('dairy-list', DairyList);