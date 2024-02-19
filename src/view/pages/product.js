import { LitElement, html, css } from "lit";
import "../components/page/page"
import "../components/product/product-view"

export default class Product extends LitElement{
    static get properties() {
        return{
            _location: {type: String, state: true},
            _mealtype: {type: String, state: true},
            _previousRoute: {type: String, state: true}
        }
    }

    constructor() {
        super();
        this._location = "";
        this._mealtype = "";
        this._previousRoute = "";
    }

    onBeforeEnter(location, commands, router) {
        this._previousRoute = router.__previousContext === undefined || router.__previousContext.path === "/scan/product" 
                ? "/products" 
                : router.__previousContext.pathname
        this._location = new URLSearchParams(location.search).get("productname");
        this._mealtype = new URLSearchParams(location.search).get("mealtype")
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
        <page-div headerbar headerbartitle="Add product" checkicon location="${this._previousRoute}">
            <product-view class="slide" location=${this._location} mealtype="${this._mealtype}"></product-view>
        </page-div>
        `
    };
}
customElements.define('product-page', Product); 