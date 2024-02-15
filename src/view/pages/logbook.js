import { LitElement, html, css } from "lit";
import "../components/page/page"
import { BASE } from "../../app";

export default class Logbook extends LitElement{
    static get properties() {
        return{
        }
    }

    constructor() {
        super();
    }
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
            <h1>Logbook</h1>
            <a href="${BASE}/products">Products</a>
        </page-div>`
    }

}
customElements.define('logbook-page', Logbook); 