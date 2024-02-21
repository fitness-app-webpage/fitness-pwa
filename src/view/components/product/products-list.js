import { LitElement, html, css } from "lit";
import {repeat} from 'lit/directives/repeat.js';
import { Router } from "@vaadin/router";
import { BASE } from "../../../app";
import "../scanner/scanner-div"
import "../input/search-bar"
import "./product-searchbar"
import { router } from "../../../app";

export default class ProductsList extends LitElement{
    static get properties() {
        return{
            products: {type: Array},
        }
    }
    constructor() {
        super();
        this._products = [];
        this._param = router.location.params.mealtype === undefined ? "" : "/" + router.location.params.mealtype;
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
                margin: 12px 0;

            }
            .product-container {
                display: flex;
                flex-direction: row;
                height: 100%;
                margin: 0 10px;
                padding: 5px 0 5px 10px;
                border-radius: 10px;
                box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
                /* justify-content: center; */
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
                            <div class="product-card">
                                <div class="product-container">
                                <div class="product-column">
                                    <span class="name">${e.name}</span>
                                    <div class="product-info">
                                        <span>${e.quantity} gram,</span>
                                        <span>${e.nutritions.calories} cal</span>
                                    </div>
                                </div>
                                <span class="button" @click="${this.handleClick}" id="${e.id}">X</span>
                                </div>
                            </div>
                                `
                )
            }`
    }
    handleClick(e) {
        if(Object.values(router.location).length !== 0) {
            const queryParma = router.location.search;
            Router.go(`${BASE}/product/${e.target.id}${queryParma}`)
            return;
        }
        Router.go(`${BASE}/product/${e.target.id}`)
    }
}
customElements.define('products-list', ProductsList); 