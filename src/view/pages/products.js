import { LitElement, html, css } from "lit";
import "../components/page/page"
import "../components/product/products-list"
import { getProducts } from "../../service/ApiService";
import {Task} from '@lit/task';

export default class Products extends LitElement{
    static get properties() {
        return{
        }
    }

    _productsTask = new Task(this, {
        task: async () => {
            return getProducts().then(e => e)
        },
        args: () => []
    })
    
    constructor() {
        super();
    }
    static get styles(){
        return css`
            h1 {
                text-align: center;
            }
            .containter {
                display: flex;
                flex-direction: column;
            }
            .product-card {
                height: 50px;
                width: 100%;
                margin: 12px 0;

            }
            .product-container {
                display: flex;
                flex-direction: row;
                height: 100%;
                margin: 0 10px;
                padding: 5px 0 5px 10px;
                border-radius: 10px;
                box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
                /* justify-content: center; */
                align-items: center;
            }
            .food-info {
                display: flex;
            }
            img {
                width: 50px;
                height: 50px;
                object-fit: contain;
            }
            .product-info span {
                opacity: 0.5;
                font-size: 15px;
                margin: 0 4px 0 0;

            }
            .product-column {
                display: flex;
                flex-direction: column;
                width: calc(100% - 40px);
            }
            .slide {
                position: relative;
                right: -100%;
                width: 100%;
                -webkit-animation: slide 0.5s forwards;
                animation: slide 0.5s forwards;
            }

            .back {
                position: relative;
                left: 0;
                background-color: red;
                width: 100%;
                -webkit-animation: slide 0.5s forwards;
                animation: slide 0.5s forwards;
            }

            @-webkit-keyframes slide {
                100% { right: 0; }
            }

            @keyframes slide {
                100% { right: 0; }
            }
            
        `;
    }
    render() {
        return html`
        <page-div headerbar headerbartitle="Products" location="/dairy">
            <product-searchbar></product-searchbar>
            ${this._productsTask.render({
                pending: () => html`<span>Loading...</span>`,
                complete: (e) => html`<products-list .products="${e}"></products-list>`
            })}
            
        </page-div>`
    }
}
customElements.define('products-page', Products); 