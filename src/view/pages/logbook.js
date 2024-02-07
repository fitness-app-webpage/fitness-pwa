import { LitElement, html, css } from "lit";
import "../components/page/page"

export default class Logbook extends LitElement{
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
            
        </page-div>`
    }
}
customElements.define('logbook-page', Logbook); 