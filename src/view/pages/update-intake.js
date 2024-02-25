import { LitElement, html, css } from "lit";
import "../components/page/page"
import "../components/product/product-view"
import { getIntakeById, updateIntake } from "../../service/ApiService";
import { BASE } from "../../app";
import { Router } from "@vaadin/router";
import {Task} from '@lit/task';

export default class UpdateIntake extends LitElement{
    static get properties() {
        return{
            _location: {type: String, state: true},
            _mealtype: {type: String, state: true},
            _previousRoute: {type: String, state: true},
            _title: {type: String, state: true},
            _intakeId: {type: String, state: true},
            _data: {type: Object, state: true}
        }
    }

    constructor() {
        super();
        this._location = "";
        this._mealtype = "";
        this._previousRoute = "";
        this._tilte = "Product";
        this._intakeId = "";
        this._data = {};
    }

    _myTask = new Task(this, {
        task: async ([location], {signal}) => {
            return getIntakeById(location).then(e => {
                this._intakeId = e.id
                return e.product;
            }).catch(error => {
                throw new Error(error.message)
            });
        },
        args: () => [this._location]
    })

    onBeforeEnter(location, commands, router) {
        this._previousRoute = router.__previousContext === undefined || router.__previousContext.path === BASE + "/scan/product" 
                ? "/products" 
                : router.__previousContext.pathname
        this._previousRoute = BASE !== "" && this._previousRoute.slice(0, BASE.length) === BASE 
            ? this._previousRoute.slice(BASE.length) 
            : this._previousRoute
        
        this._location = location.params.id
        this._mealtype = new URLSearchParams(location.search).get("mealtype")
        if(this._mealtype !== null)
            this._tilte = "Add product to " + this._mealtype.toLowerCase();
    }

    static get styles(){
        return css`

            .slide {
                position: absolute;
                right: -100%;
                width: 100%;
                -webkit-animation: slide 0.5s forwards;
                animation: slide 0.5s forwards;
            }

            .back {
                position: absolute;
                left: 0;
                background-color: red;
                width: 100%;
                -webkit-animation: slide 0.5s forwards;
                animation: slide 0.5s forwards;
            }

            @-webkit-keyframes slide {
                100% { right: 0; }
            }

            @keyframes slide {
                100% { right: 0; }
            }
        `;
    }

    
    render(){
        return html`
        <page-div headerbar headerbartitle="${this._tilte}" checkicon location="${this._previousRoute}">
            ${this._myTask.render({
                pending: () => html`<span>Loading...</span>`,
                complete: (e) => html`<product-view class="slide" location=${e.id} mealtype="${this._mealtype}" .data="${e}" @addProductIntake="${this.handleSubmit}"></product-view>`,
                error: (e) => html`<span>${e.message}</span>`
            })}
        </page-div>
        `
    };

    handleSubmit(e) {
        this._data = {amount: e.detail.productIdAndAmount.amount}
        updateIntake(this._intakeId, this._data).then(e => {
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
customElements.define('update-intake', UpdateIntake); 