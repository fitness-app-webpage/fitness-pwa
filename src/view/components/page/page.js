import { LitElement, html, css, noChange } from "lit";
import "../navigation/footer-nav"
import "../navigation/header-bar"

export default class Page extends LitElement{
    static get properties() {
        return{
            nonavigation: {type: Boolean},
            headerbar: {type: Boolean},
            headerbartitle: {type: String},
            checkicon: {type: Boolean},
            location: {type: String}
        }
    }

    constructor() {
        super();
        this.nonavigation = false;
        this.headerbar = false;
        this._checkicon = true;
        this.headerbartitle = ""
        this.checkicon = false;
        this.location = "";
    }
    static get styles(){
        return css`
        /* :host {
            position: fixed;
            height: 100vh;
            width: 100vw;
        } */
         @media only screen and (max-width: 480px) { 
            :host {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            flex-direction: column;
        }
        main {
            height: calc(100% - 101px);
            overflow: auto;
        }
    }
        `;
    }
    
    render(){
        return this.nonavigation 
        ? html `<main>
                    <slot></slot>
                </main>`
        : html`
        ${this.headerbar ? html`<header-bar title="${this.headerbartitle}" .checkicon="${this.checkicon}" href="${this.location}"></header-bar>` : noChange}
        <main>
            <slot></slot>
        </main>
        <footer-nav></footer-nav>
        `;
    };
}
customElements.define('page-div', Page); 