import { LitElement, html, css } from "lit";
import { getProductByName } from "../../../service/ApiService";
import {until} from 'lit/directives/until.js';
import "../charts/circle-bar"

export default class ProductView extends LitElement{
    static get properties() {
        return{
            _data: {type: Object, state: true},
            location: {type: String},
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
                flex-direction: row;
                align-items: flex-end;
                width: 100%;
            }
            .percentage-protein {
                color: #32A8F0;
            }

            .percentage-fat {
                color: #F02F2F;
            }
            .percentage-carbs {
                color: #42ca5b;
            }
            .percentage-salt {
               color: #6E1FF0;
            }
            .container > span {
                margin: 20px;
            }
            h1, h2 {
                margin: 10px 0; 
            }
            .nutrition-type {
                opacity: 0.5;
            }
            .nutritions div {
                display: flex;
                flex-direction: column;
                width: 100%;
                margin-bottom: 30px;
            }
            .nutritions div span:nth-child(1) {
                font-size: 12px;
            }
            .nutritions div span:nth-child(2) {
                font-size: 16px;
                font-weight: bold;
            }

        `;
    }
    
    render(){
        return html`
            ${until(getProductByName(this.location).then(e => {
                let total = 0;
                Object.values(e.nutritions).map(v => {
                    if(v !== e.nutritions.calories)
                    total += v
                })
                console.log(total)
                return html`
                            <div class="container">
                                <h1>${e.name}, ${e.brand}</h1>
                                <img src="${e.image}">
                                <span>${e.quantity} gram</span>
                                <div class="nutritions">
                                    <circle-bar .data="${[
                                        {value: e.nutritions.protein, color: "#32A8F0", label: "Protein"},
                                        {value: e.nutritions.fat, color: "#F02F2F", label: "Fat"},
                                        {value: e.nutritions.carbs, color: "#42ca5b", label: "Carbs"},
                                        {value: e.nutritions.salt, color: "#6E1FF0", label: "Salt"}
                                        ]}" title="nitritions" text="${e.nutritions.calories}" secondtext="Cal" textcolor="#EF9437"></circle-bar>
                                        <div class="protein">
                                            <span class="percentage-protein">${(e.nutritions.protein / total * 100).toFixed(1)}%</span>
                                            <span>${e.nutritions.protein} g</span>
                                            <span class="nutrition-type">Protein</span>
                                        </div>
                                        <div class="fat">
                                            <span class="percentage-fat">${(e.nutritions.fat / total * 100).toFixed(1)}%</span>
                                            <span>${e.nutritions.fat} g</span>
                                            <span class="nutrition-type">Fat</span>
                                        </div>
                                        <div class="carbs">
                                            <span class="percentage-carbs">${(e.nutritions.carbs / total * 100).toFixed(1)}%</span>
                                            <span>${e.nutritions.carbs} g</span>
                                            <span class="nutrition-type">Carbs</span>
                                        </div>
                                        <div class="salt">
                                            <span class="percentage-salt">${(e.nutritions.salt / total * 100).toFixed(1)}%</span>
                                            <span>${e.nutritions.salt} g</span>
                                            <span class="nutrition-type">Salt</span>
                                        </div>
                                </div>
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