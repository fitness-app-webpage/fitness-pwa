import { LitElement, html, css } from "lit";
import "../components/page/page"

export default class home extends LitElement{
    static get styles(){
        return css`
        `;
    }
    render() {
        return html`
        <page-div>
            <p>hello</p>
        </page-div>`
    }
}
customElements.define('home-view', home); 