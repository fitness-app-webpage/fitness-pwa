import { LitElement, html, css } from "lit";
import "../components/page/page"

export default class Profile extends LitElement{
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
            <h1>Profile</h1>
            
        </page-div>`
    }
}
customElements.define('profile-page', Profile); 