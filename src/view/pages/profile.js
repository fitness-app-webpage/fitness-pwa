import { LitElement, html, css } from "lit";
import "../components/page/page"

export default class Profile extends LitElement{
    static get styles(){
        return css`
        `;
    }
    render() {
        return html`
        <page-div>
            <h1>hello</h1>
            
        </page-div>`
    }
}
customElements.define('profile-page', Profile); 