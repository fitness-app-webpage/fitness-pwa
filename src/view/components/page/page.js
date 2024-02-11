import { LitElement, html, css } from "lit";
import "../navigation/footer-nav"

export default class Page extends LitElement{
    static get properties() {
        return{
            nonavigation: {type: Boolean},
        }
    }

    constructor() {
        super();
        this.nonavigation = false;
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
        <!-- <header-nav></header-nav> -->
        <main>
            <slot></slot>
        </main>
        <footer-nav></footer-nav>
        `;
    };
}
customElements.define('page-div', Page); 