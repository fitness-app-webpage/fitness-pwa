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
                width: 100%;
            }
            .first-row, .second-row{
                display: flex;
                align-items: center;
                justify-content: center;
                text-align: center;
                height: 100px;

            }
            .first-row > div, .second-row > div {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                width: 100%;
                height: 90%;
                border: 2px solid black;
                
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
                                    <div class="first-row">
                                        <div>
                                            <span>${e.nutritions.calories}</span>
                                            <span>Calories</span>
                                        </div>
                                        <div>
                                            <span>${e.nutritions.protein}</span>
                                            <span>Protein</span>
                                        </div>
                                    </div>
                                    <div class="second-row">
                                        <div>
                                            <span>${e.nutritions.fat}</span>
                                            <span>Fat</span>
                                        </div>
                                        <div>
                                            <span>${e.nutritions.carbs}</span>
                                            <span>Carbs</span>
                                        </div>
                                        <div>
                                            <span>${e.nutritions.salt}</span>
                                            <span>Salt</span>
                                        </div>
                	                </div>
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