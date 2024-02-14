import { LitElement, html, css } from "lit";
import "../components/page/page"
import "../components/product/product-view"
import { getProductByName } from "../../service/ApiService";

export default class Product extends LitElement{
    static get properties() {
        return{
            _location: {type: String, state: true},
        }
    }

    constructor() {
        super();
        this._location = "";
    }

    onBeforeEnter(location, commands, router) {
        this._location = location.params.product;

    }
    static get styles(){
        return css`
        `;
    }

    
    render(){
        return html`
        <page-div headerbar>
            <product-view location=${this._location} .data=${getProductByName(this._location)}></product-view>
        </page-div>
        `
    };
}
customElements.define('product-page', Product); 