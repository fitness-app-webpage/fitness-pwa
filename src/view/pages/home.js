import { LitElement, html, css } from "lit";
import "../components/page/page"
import "../components/notification/notification-bar"

export default class home extends LitElement{
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
            <notification-bar></notification-bar>
            <!-- <h1>Home</h1> -->

        </page-div>`
    }
}
customElements.define('home-view', home); 