import { LitElement, html, css } from "lit";
import "../components/page/page"
import { getProducts } from "../../service/ApiService";
import {until} from 'lit/directives/until.js';
import {repeat} from 'lit/directives/repeat.js';
import { Router } from "@vaadin/router";
import { BASE } from "../../app";

export default class Products extends LitElement{
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
            
        `;
    }
    render() {
        return html`
        <page-div>
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
            </div>
        </page-div>`
    }
    handleClick(e) {
        Router.go(`${BASE}/products/${e.target.id}`)
    }
}
customElements.define('products-page', Products); 