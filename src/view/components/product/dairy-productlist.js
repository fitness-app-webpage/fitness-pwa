import { LitElement, html, css } from "lit";
import {repeat} from 'lit/directives/repeat.js';
import { Router } from "@vaadin/router";
import { BASE } from "../../../app";
import "../scanner/scanner-div"
import "../input/search-bar"
import "./product-searchbar"

export default class DairyProductList extends LitElement{
    static get properties() {
        return{
            products: {type: Array},
        }
    }
    constructor() {
        super();
        this.products = [];
    }
    static get styles(){
        return css`
            h1 {
                text-align: center;
            }
            .containter {
                display: flex;
                flex-direction: column;
            }
            .product-card {
                height: 50px;
                width: 100%;
                /* margin: 12px 0; */

            }
            .product-container {
                display: flex;
                flex-direction: row;
                height: 100%;
                padding: 5px 0 5px 10px;
                align-items: center;
            }
            .food-info {
                display: flex;
            }
            img {
                width: 50px;
                height: 50px;
                object-fit: contain;
            }
            .product-info span {
                opacity: 0.5;
                font-size: 15px;
                margin: 0 4px 0 0;

            }
            .name {
                opacity: 0.85;
            }
            span {
                opacity: 0.7;
            }
            .product-column {
                display: flex;
                flex-direction: column;
                width: calc(100% - 40px);
            }
        `;
    }
    render() {
        return html`
            ${repeat(this.products, 
                    (e) => e.id,
                    (e) => html`
                                <div class="container">
                                    <div class="product-card">
                                        <div class="product-container">
                                            <div class="product-column">
                                                <span class="name">${e.name}</span>
                                                <div class="product-info">
                                                    <span>${e.gramsEaten} gram</span>
                                                </div>
                                            </div>
                                            <span id="${e.name}" @click="${this.handleClick}">${e.nutritions.calories}</span>
                                        </div>
                                    </div>
                                </div>
                                `
                )
            }`
    }
    handleClick(e) {
        Router.go(`${BASE}/products/${e.target.id}`)
    }
}
customElements.define('dairy-productlist', DairyProductList); 