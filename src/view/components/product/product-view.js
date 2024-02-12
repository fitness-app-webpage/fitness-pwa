import { LitElement, html, css } from "lit";

export default class ProductView extends LitElement{
    static get properties() {
        return{
        }
    }

    constructor() {
        super();
    }
    static get styles(){
        return css`

        `;
    }
    
    render(){
        html`
        <div>hoi</div>
        `
    };
}
customElements.define('product-view', ProductView); 