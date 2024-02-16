import { LitElement, html, css } from "lit";
import "../components/page/page"
import "../components/product/product-view"

export default class Product extends LitElement{
    static get properties() {
        return{
            _location: {type: String, state: true},
            _mealtype: {type: String, state: true}
        }
    }

    constructor() {
        super();
        this._location = "";
        this._mealtype = "";
    }

    onBeforeEnter(location, commands, router) {
        this._location = location.params.product;
        this._mealtype = location.params.mealtype === undefined ? "" : location.params.mealtype;
    }
    static get styles(){
        return css`
        `;
    }

    
    render(){
        return html`
        <page-div headerbar headerbartitle="Add product" checkicon location="/products">
            <product-view location=${this._location} mealtype="${this._mealtype}"></product-view>
        </page-div>
        `
    };
}
customElements.define('product-page', Product); 