import { LitElement, html, css } from 'lit';
import {repeat} from 'lit/directives/repeat.js';
import "../product/products-list"

export default class BreakFast extends LitElement {
    static get properties() {
        return{
            title: {type: String},
            data: {type: Array}
        }
      };
    
    constructor() {
        super();
        this.title = "default"
        this.data = [];
    }

    static get styles() {
        return css`
        .container {
            display: flex;
            flex-direction: column;
        }
        p {
            text-align: center;
            font-size: 18px;
            /* color: #4f63f7; */
        }
        `;
    }

    render(){
        return html`
            <div class="container">
                <p>${this.title}</p>
                <div class="products">
                    <products-list .products=${this.data}></products-list>
                </div>
            </div>
        `;
    }


}

customElements.define('break-fast', BreakFast);