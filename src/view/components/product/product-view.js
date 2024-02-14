import { LitElement, html, css } from "lit";
import { getProductByName } from "../../../service/ApiService";
import {until} from 'lit/directives/until.js';
import "../charts/circle-bar"

export default class ProductView extends LitElement{
    static get properties() {
        return{
            data: {type: Object},
            location: {type: String},
            _name: {type: String, state: true},
            _brand: {type: String, state: true},
            _image: {type: String, state: true},
            _quantity: {type: Number, state: true},
            _calories: {type: Number, state: true},
            _protein: {type: Number, state: true},
            _carbs: {type: Number, state: true},
            _fat: {type: Number, state: true},
            _salt: {type: Number, state: true},
            _total: {type: Number, state: true},
            

        }
    }

    constructor() {
        super();
        this.data = {};
        this.location = "";
        this._total = 0;
    }
    connectedCallback() {
        super.connectedCallback()
        this.renderProduct();
    }


    static get styles(){
        return css`
            img {
                object-fit: contain;
                width: 100px;
                height: 100px;
            }
            .container {
                display: flex;
                flex-direction: column;
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
            ${until(this.data.then(e => {
                return html`
                            <div class="container">
                                <h1>${this._name}, ${this._brand}</h1>
                                <img src="${this._image}">
                                <input value=${this._quantity} @change=${this.handleInput}/>
                                <span>${this._quantity} gram</span>
                                <div class="nutritions">
                                    <circle-bar .data="${[
                                        {value: this._protein, color: "#32A8F0", label: "Protein"},
                                        {value: this._fat, color: "#F02F2F", label: "Fat"},
                                        {value: this._carbs, color: "#42ca5b", label: "Carbs"},
                                        {value: this._salt, color: "#6E1FF0", label: "Salt"}
                                        ]}" title="nitritions" text="${this._calories}" secondtext="Cal" textcolor="#EF9437"></circle-bar>
                                        <div class="protein">
                                            <span class="percentage-protein">${(this._protein / this._total * 100).toFixed(1)}%</span>
                                            <span>${this._protein} g</span>
                                            <span class="nutrition-type">Protein</span>
                                        </div>
                                        <div class="fat">
                                            <span class="percentage-fat">${(this._fat / this._total * 100).toFixed(1)}%</span>
                                            <span>${this._fat} g</span>
                                            <span class="nutrition-type">Fat</span>
                                        </div>
                                        <div class="carbs">
                                            <span class="percentage-carbs">${(this._carbs / this._total * 100).toFixed(1)}%</span>
                                            <span>${this._carbs} g</span>
                                            <span class="nutrition-type">Carbs</span>
                                        </div>
                                        <div class="salt">
                                            <span class="percentage-salt">${(this._salt / this._total * 100).toFixed(1)}%</span>
                                            <span>${this._salt} g</span>
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
    handleInput(e) {
        const value = Number(e.target.value)
           //fat * 9 
            //carbs * 4 
            //protein * 4
        if(value > 0) {
            this._quantity = value;
            this._calories = (this._calperg * value).toFixed(0);
            this._protein = this._roundNumber((this._proteinperg * value).toFixed(2));
            this._carbs = this._roundNumber((this._carbsperg * value).toFixed(2));
            this._fat = this._roundNumber((this._fatperg * value).toFixed(2));
            this._salt = this._roundNumber((this._saltperg * value).toFixed(2));
            this._total = Number(this._protein) + Number(this._carbs) + Number(this._fat) + Number(this._salt);
        }   
    }
    _roundNumber(data) {
        const stringValue = data.toString()
        const lastDigit = parseInt(stringValue[stringValue.length - 1]);
        return lastDigit !== 0 ? data : data * 100 / 100;
    }

    async renderProduct() {
        await getProductByName(this.location).then(e =>{
            this._name = e.name;
            this._brand = e.brand;
            this._image = e.image;
            this._quantity = e.quantity;
            this._calories = e.nutritions.calories;
            this._protein = e.nutritions.protein;
            this._carbs = e.nutritions.carbs;
            this._fat = e.nutritions.fat;
            this._salt = e.nutritions.salt;

            this._calperg = e.nutritions.calories / e.quantity;
            this._proteinperg = e.nutritions.protein / e.quantity;
            this._carbsperg = e.nutritions.carbs / e.quantity;
            this._fatperg = e.nutritions.fat / e.quantity;
            this._saltperg = e.nutritions.salt / e.quantity;
            Object.values(e.nutritions).map(v => {
                if(v !== e.nutritions.calories)
                this._total += v
            })
        })
    }
}
customElements.define('product-view', ProductView); 