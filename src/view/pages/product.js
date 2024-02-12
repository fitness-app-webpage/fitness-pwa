import { LitElement, html, css } from "lit";
import "../components/page/page"
import { getProductByName } from "../../service/ApiService";
import {until} from 'lit/directives/until.js';

export default class Product extends LitElement{
    static get properties() {
        return{
            _data: {type: Object, state: true},
            _location: {type: String, state: true}
        }
    }

    constructor() {
        super();
        this._data = {};
        this._location = "";
    }
    onBeforeEnter(location, commands, router) {
        this._location = location.params.product;
    }
    static get styles(){
        return css`
            img {
                object-fit: contain;
                width: 200px;
                height: 200px;
            }
            .container {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                text-align: center;
            }
            .nutritions {
                display: flex;
            }
            .container > span {
                margin: 20px;
            }
            h1, h2 {
                margin: 10px 0; 
            }
        `;
    }

    
    render(){
        return html`
        <page-div>
            ${until(getProductByName(this._location).then(e => {
                return html`
                            <div class="container">
                                <!-- <span>Type: ${e.victualsType}</span> -->
                                <h1>${e.name}, ${e.brand}</h1>
                                <!-- <h2>${e.brand}</h2> -->
                                <img src="${e.image}">
                                <span>${e.quantity} gram</span>
                                <div class="nutritions">
                                    <span>${e.nutritions.calories} cal</span>
                                    <span>Fat: ${e.nutritions.fat}</span>
                                    <span>Carbs: ${e.nutritions.carbs}</span>
                                    <span>Protein: ${e.nutritions.protein}</span>
                                    <span>Salt: ${e.nutritions.salt}</span>
                                </div>
                                <!-- <span>Unit: ${e.unit.unit}</span> -->
                            </div>`
            }).catch(error => {
                return html`<span>${error.message}</span>` 
            }),
                html`<span>Loading...</span>`
            )}
        </page-div>
        `
    };
}
customElements.define('product-page', Product); 