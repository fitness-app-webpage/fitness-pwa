import { LitElement, html, css } from "lit";
import "../components/page/page"
import "../components/forms/upload-profileImage"
import { Router } from "@vaadin/router";
import { BASE } from "../../app";

export default class Profile extends LitElement{
    static get styles(){
        return css`
            h1 {
                text-align: center;
            }
        @media only screen and (max-width: 480px) and (orientation: portrait){
            div {
                display: flex; 
                justify-content: center;
            }
            button-div {
                position: absolute;
                bottom: 200px;
                --button-div-width: 200px;
                --button-background-color: #1a1a72;
                --button-div-color: #FFFFFF;
                --button-div-font-weight: bold;
            }
        }
        `;
    }
    render() {
        return html`
        <page-div>
            <h1>Profile</h1>
            <profile-form></profile-form>
            <div>
                <button-div value="Logout" @click="${this.handleClick}"></button-div>
            </div>
        </page-div>`
    }
    handleClick() {
        Router.go(`${BASE}/logout`)
    }
}
customElements.define('profile-page', Profile); 