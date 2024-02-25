import { LitElement, html, css } from "lit";
import "../components/page/page"
import "../components/product/product-view"
import { getProductById, findProductByBarcode, createIntake } from "../../service/ApiService";
import { BASE } from "../../app";
import {Task} from '@lit/task';
export default class Product extends LitElement{
    static get properties() {
        return{
            _location: {type: String, state: true},
            _mealtype: {type: String, state: true},
            _previousRoute: {type: String, state: true},
            _isBarcode: {type: Boolean, state: true},
            _title: {type: String, state: true}
        }
    }

    constructor() {
        super();
        this._location = "";
        this._mealtype = "";
        this._previousRoute = "";
        this._isBarcode = true;
        this._tilte = "Product";
    }

    _myTask = new Task(this, {
        task: async ([location], {signal}) => {
            return this._isBarcode 
                ? await findProductByBarcode(location, signal).then(e => e).catch(error => {throw new Error(error.message)})
                : await getProductById(location, signal).then(e => e).catch(error => {throw new Error(error.message)})
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
        
        this._location = location.params.code
        this._mealtype = new URLSearchParams(location.search).get("mealtype")
        if(this._location.length !== 13)
            this._isBarcode = false;
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
                complete: (e) => html`<product-view class="slide" location=${e.id} mealtype="${this._mealtype}" .data="${e}"></product-view>`,
                error: (e) => html`<span>${e.message}</span>`
            })}
        </page-div>
        `
    };
}
customElements.define('product-page', Product); 