import { LitElement, html, css } from "lit";
import "../components/page/page"
import "../components/scanner/scanner-div"
import { findProductByBarcode } from "../../service/ApiService";
import { Router } from "@vaadin/router";
import { BASE } from "../../app";

export default class ScanPage extends LitElement{
    static get properties() {
        return{
        }
    }

    constructor() {
        super();
    }

    onBeforeEnter(location, commands, router) {
        this._mealtype = location.search === "" 
                ? "" 
                : location.search + "&";
    }
    static get styles(){
        return css`
        `;
    }

    
    render(){
        return html`
        <page-div headerbar headerbartitle="Scan barcode" location="/products">
            <scanner-div @getBarcode="${this.findProduct}"></scanner-div>
        </page-div>
        `
    };
    findProduct(e) {
        findProductByBarcode(e.detail).then(e => {
            Router.go(`${BASE}/product${this._mealtype}productname=${e.name}`)
        }).catch(error => {
            console.log(error)
        })
    }
}
customElements.define('scan-page', ScanPage); 