import { LitElement, html, css } from "lit";

export default class Page extends LitElement{
    static get properties() {
        return{
            noHeader: {type: Boolean},
        }
    }

    constructor() {
        super();
        this.noHeader = false;
    }
    static get styles(){
        return css`
        `;
    }
    render() {
        return html`
        <main>
            <slot></slot>             
        </main>`
    }
    
    // render(){
    //     return this.noHeader 
    //     ? html `<main>
    //                 <slot></slot>
    //             </main>.`
    //     : html`
    //     <header-nav></header-nav>
    //     <main>
    //         <slot></slot>
    //     </main>
    //     `;
    // };
}
customElements.define('page-div', Page); 