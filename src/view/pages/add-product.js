import { LitElement, html, css } from "lit";
import "../components/page/page"

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
            <h1>Product</h1>
            
        </page-div>`
    }
}
customElements.define('addproduct-page', AddProduct); 