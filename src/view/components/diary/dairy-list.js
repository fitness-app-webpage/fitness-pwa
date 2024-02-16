import { LitElement, html, css } from 'lit';
import {repeat} from 'lit/directives/repeat.js';
import "../product/dairy-productlist"
import { Router } from '@vaadin/router';
import { BASE } from '../../../app';

export default class DairyList extends LitElement {
    static get properties() {
        return{
            title: {type: String},
            data: {type: Array},
            _total: {type: Number, state: true}

        }
      };
    
    constructor() {
        super();
        this.title = "default"
        this.data = [];
        this._total = 0;
    }
    connectedCallback() {
        super.connectedCallback() 
        this.data.map(e => {
            this._total += e.nutritions.calories
        })
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
        Router.go(`${BASE}/products/${this.title.toUpperCase()}`)
    }
}

customElements.define('dairy-list', DairyList);