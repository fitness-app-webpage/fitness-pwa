import { LitElement, html, css } from "lit";
import { getProducts, findProductByBarcode } from "../../../service/ApiService";
import {until} from 'lit/directives/until.js';
import {repeat} from 'lit/directives/repeat.js';
import { Router } from "@vaadin/router";
import { BASE } from "../../../app";
import "../scanner/scanner-div"
import "../input/search-bar"

export default class ProductsList extends LitElement{
    static get properties() {
        return{
            _products: {type: Object, state: true},
        }
    }
    constructor() {
        super();
        this._products = getProducts();
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
            .search-container {
                margin-top: 20px;
                display: flex;
            }
            svg {
                width: 25px;
                height: 20px;
            }
            .icon-button {
                background-color: transparent;
                border: 0px;
            }
        `;
    }
    render() {
        return html`
            <div class="search-container">
            <search-bar></search-bar>
            <a class="icon-button" href="${BASE}/scan/product">
                <svg>
                    <path d="M1.5625 6.25V3.75H4.6875" stroke="black" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M23.4375 6.25V3.75H20.3125" stroke="black" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M1.5625 13.75V16.25H4.6875" stroke="black" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M23.4375 13.75V16.25H20.3125" stroke="black" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M4.6875 5.625V9.375" stroke="black" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M8.59375 5.625V9.375" stroke="black" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M20.3125 5.625V9.375" stroke="black" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M16.4062 5.625V9.375" stroke="black" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M12.5 5.625V9.375" stroke="black" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M1.5625 11.25H23.4375" stroke="black" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M4.6875 13.125V14.375" stroke="black" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M8.59375 13.125V13.75" stroke="black" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M20.3125 13.125V14.375" stroke="black" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M16.4062 13.125V13.75" stroke="black" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M12.5 13.125V13.75" stroke="black" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </a>
            </div>
            <div class="containter">
            ${until(this._products.then(e => {
                return repeat(e, 
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
                                <span class="button" @click="${this.handleClick}" id="${e.name}">X</span>
                                </div>
                            </div>
                                `
                )
            }).catch(error => {
                return html`<span>${error.message}</span>`
            }),
                html`<span>Loading...</span>`
            )}
            </div>`
    }
    handleClick(e) {
        Router.go(`${BASE}/products/${e.target.id}`)
    }
}
customElements.define('products-list', ProductsList); 