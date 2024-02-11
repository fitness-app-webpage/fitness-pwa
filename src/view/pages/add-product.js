import { LitElement, html, css } from "lit";
import "../components/page/page"
import "../components/forms/product-from"

export default class AddProduct extends LitElement{
    static get styles(){
        return css`
            h1 {
                text-align: center;
            }
        `;
    }
    render() {
        return html`
        <page-div>
            <product-form></product-form>
        </page-div>`
    }
}
customElements.define('addproduct-page', AddProduct); 