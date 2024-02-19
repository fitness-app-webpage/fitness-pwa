import { LitElement, html, css } from "lit";
import { getProductByName, createIntake} from "../../../service/ApiService";
import { BASE, router } from "../../../app";
import { Router } from "@vaadin/router";
import "../charts/circle-bar"
import {Task} from '@lit/task';

export default class ProductView extends LitElement{
    static get properties() {
        return{
            _data: {type: Object, state: true},
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
            date: {type: String},
            mealtype: {type: String}
            

        }
    }
    _myTask = new Task(this, {
        task: async ([location], {signal}) => {
            return await getProductByName(location, signal).then(e => {
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
                Object.entries(e.nutritions).map(([k, v]) => {
                    if(k !== "calories") {
                        this._total += v
                    }
                })
                return e;
            }).catch(error => {
                throw new Error(error.message)
            })
        },
        args: () => [this.location]
    })

    constructor() {
        super();
        this._data = {};
        this.location = "";
        this._total = 0;
        this._abortController = new AbortController();
        this.date = new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000 )).toISOString().split("T")[0];
        this.mealtype = "";
    }
    connectedCallback() {
        super.connectedCallback()
        self.addEventListener("submitProduct", this._handleSubmitProduct.bind(this), {once: true, signal: this._abortController.signal})
    }
    disconnectedCallback() {
        super.disconnectedCallback()
        self.removeEventListener("submitProduct", this._handleSubmitProduct.bind(this))
        this._abortController.abort();
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
                align-items: center;
                justify-content: center;
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
            }
            .nutritions div span:nth-child(1) {
                font-size: 12px;
            }
            .nutritions div span:nth-child(2) {
                font-size: 16px;
                font-weight: bold;
            }
            .image-form {
                display: flex;
                text-align: center;
                align-items: center;
                justify-content: space-between;
            }
            .serving {
                display: flex;
                height: 20px;
                margin: 20px 0;
                justify-content: space-between;
                border-bottom: 1px solid #dbd8d8;
            }
            .serving > span {
                margin:0 10px;
            }
            
            circle-bar {
                --circle-width: 100px;
                --circle-height: 100px;
                margin-left: 10px;
            }
            numberic-input {
                --input-width: 160px;
                --input-field-border-radius: 4px;
            }

        `;
    }
    
    render(){
        return this._myTask.render({
            pending: () => html`<span>Loading...</span>`,
            complete: (e) => html`
                        <div class="container">
                                <h1>${this._name}, ${this._brand}</h1>
                                <div class="image-form">
                                    <img src="${this._image}">
                                    <numberic-input type="number" value=${this._quantity} @input-changed="${this.handleInput}" label="amount" name="amount" abbreviateType="gram(s)"></numberic-input>
                                </div>
                                <div class="serving">
                                    <span>Serving size</span>
                                    <span>${e.quantity} gram</span>
                                </div>
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
                            </div>`,
        error: (error) => html`<span>${error.message}</span>` 
                            })
    };

    handleInput(e) {
        const value = Number(e.target.value)
        if(value > 0) {
            this._quantity = value;
            this._calories = (this._calperg * value).toFixed(0);
            this._protein = this._roundNumber((this._proteinperg * value).toFixed(2));
            this._carbs = this._roundNumber((this._carbsperg * value).toFixed(2));
            this._fat = this._roundNumber((this._fatperg * value).toFixed(2));
            this._salt = this._roundNumber((this._saltperg * value).toFixed(2));
            this._total = Number(this._protein) + Number(this._carbs) + Number(this._fat) + Number(this._salt);
            this.shadowRoot.querySelector("circle-bar").updateChart()
        }   
    }
    _roundNumber(data) {
        const stringValue = data.toString()
        const lastDecDigit = parseInt(stringValue[stringValue.length - 1]);
        const firstDecDigit = parseInt(stringValue[stringValue.length - 2]);
        if(firstDecDigit !== 0 && lastDecDigit !== 0 || firstDecDigit == 0 && lastDecDigit !== 0) return data;
        if(firstDecDigit !== 0 && lastDecDigit === 0) return data * 100 / 100;
        return Math.round(data * 10) / 10;
    }
    _handleSubmitProduct() {
        const gramValue = this.shadowRoot.querySelector("numberic-input").value;
        this._data = {
            date: this.date, 
            mealType: this.mealtype, productNameAndAmount: [{
                name: this.location,
                amount: gramValue
            }]
        }
        createIntake(this._data).then(e => {
            if(e.ok) {
                setTimeout(() => {
                    Router.go(`${BASE}/dairy`)
                }, 250);
            }
        }).catch(error => {
            console.log(error)
        })
    }
}
customElements.define('product-view', ProductView); 