import { LitElement, html, css, noChange } from "lit";
import "../navigation/footer-nav"
import "../navigation/header-bar"

export default class Page extends LitElement{
    static get properties() {
        return{
            nonavigation: {type: Boolean},
            headerbar: {type: Boolean}
        }
    }

    constructor() {
        super();
        this.nonavigation = false;
        this.headerbar = false;
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
        ${this.headerbar ? html`<header-bar></header-bar>` : noChange}
        <main>
            <slot></slot>
        </main>
        <footer-nav></footer-nav>
        `;
    };
}
customElements.define('page-div', Page); 