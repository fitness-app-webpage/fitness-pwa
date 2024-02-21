import { LitElement, html, css } from "lit";
import "../components/page/page"
import "../components/scanner/scanner-div"
import "../components/error/errorMessage"

export default class ScanPage extends LitElement{
    static get properties() {
        return{
            _error: {type: String, state: true},
            _mealtype: {type: String, state: true}
        }
    }

    constructor() {
        super();
        this._error = ""
        this._mealtype = "";
    }

    onBeforeEnter(location, commands, router) {
        this._mealtype = location.search === "" 
                ? "" 
                : location.search;
    }
    static get styles(){
        return css`
        error-message {
            display: flex;
            justify-content: center;
            align-items: center;
            --left: 0;
        }
        `;
    }

    
    render(){
        return html`
        <page-div headerbar headerbartitle="Scan barcode" location="/products">
            <scanner-div @getBarcode="${this.findProduct}" mealtype="${this._mealtype}"></scanner-div>
            <error-message message="${this._error}"></error-message>
        </page-div>
        `
    };
    findProduct(e) {
        this._error = e.detail.error
    }
}
customElements.define('scan-page', ScanPage); 