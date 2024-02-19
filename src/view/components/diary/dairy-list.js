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
            data: {type: Array},
            _total: {type: Number, state: true},
            mealtype: {type: String},
            _date: {type: String, state: true}
        }
      };

    //   _dairyTask = new Task(this, {
    //     task: async ([dateString, mealtype]) => {
    //         return await getIntakes(dateString).then(e => {
    //             e.intakes.map(data => {
    //                 if(data.mealType === mealtype) {   
    //                     data.products.map(data => {
    //                         this._data = [...this._data, data]
    //                         this._total += data.nutritions.calories
    //                     })
    //                 }
    //             })
    //             this.dispatchEvent(new CustomEvent("getTotalCal", 
    //                 {detail: this._total}
    //             ))
    //             return e;
    //         })
    //     },
    //     args: () => [this._date, this.mealtype]
    // })
    
    constructor() {
        super();
        this.title = "default"
        this.data = [];
        this._total = 0;
        this.mealtype = "";
        this._date = new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000 ))
                .toISOString()
                .split("T")[0];
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
                    <dairy-productlist .products=${this.data}></dairy-productlist>
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
    _changedDate(e) {
        this._data = [];
        this._total = 0;
        this._date = e.detail
    }
}

customElements.define('dairy-list', DairyList);