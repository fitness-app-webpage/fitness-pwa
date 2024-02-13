import { LitElement, html, css } from "lit";
import { getProductByName } from "../../../service/ApiService";
import {until} from 'lit/directives/until.js';

export default class ProductView extends LitElement{
    static get properties() {
        return{
            _data: {type: Object, state: true},
            location: {type: String}
        }
    }

    constructor() {
        super();
        this._data = {};
        this.location = "";
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
                flex-direction: column;
                gap: 10px;
                width: 100%;
            }
            .first-row, .second-row{
                display: flex;
                align-items: center;
                justify-content: center;
                text-align: center;
                height: 100px;
                gap: 10px;
            }
            .first-row > div, .second-row > div {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                width: 100%;
                height: 100%;
                /* margin: 4px;  */
            }
            .calories {
                border: 2px solid #EF9437; 
                color: #EF9437;
            }
            .protein {
                border: 2px solid #32A8F0; 
                color: #32A8F0;
            }

            .fat {
                border: 2px solid #F02F2F; 
                color: #F02F2F;
            }
            .carbs {
                border: 2px solid #42ca5b; 
                color: #42ca5b;
            }
            .salt {
               border: 2px solid #6E1FF0;
               color: #6E1FF0;
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
            ${until(getProductByName(this.location).then(e => {
                return html`
                            <div class="container">
                                <!-- <span>Type: ${e.victualsType}</span> -->
                                <h1>${e.name}, ${e.brand}</h1>
                                <!-- <h2>${e.brand}</h2> -->
                                <img src="${e.image}">
                                <span>${e.quantity} gram</span>
                                <div class="nutritions">
                                    <div class="first-row">
                                        <div class="calories">
                                            <span>${e.nutritions.calories}</span>
                                            <span>Calories</span>
                                        </div>
                                        <div class="protein">
                                            <span>${e.nutritions.protein}</span>
                                            <span>Protein</span>
                                        </div>
                                    </div>
                                    <div class="second-row">
                                        <div class="fat">
                                            <span>${e.nutritions.fat}</span>
                                            <span>Fat</span>
                                        </div>
                                        <div class="carbs">
                                            <span>${e.nutritions.carbs}</span>
                                            <span>Carbs</span>
                                        </div>
                                        <div class="salt">
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
        `
    };
}
customElements.define('product-view', ProductView); 