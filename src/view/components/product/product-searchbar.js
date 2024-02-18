import { LitElement, html, css } from "lit";
import { BASE, router } from "../../../app";
import "../scanner/scanner-div"
import "../input/search-bar"

export default class ProductSearchbar extends LitElement{
    static get properties() {
        return{
            _products: {type: Object, state: true},
        }
    }
    constructor() {
        super();
        this._param = router.location.params.search === undefined ? "" : "/search" + router.location.search;
    }
    static get styles(){
        return css`
            .search-container {
                margin-top: 20px;
                display: flex;
            }
            svg {
                width: 25px;
                height: 20px;
            }
            .icon-button {
                background-color: transparent;
                border: 0px;
            }
        `;
    }
    render() {
        return html`
            <div class="search-container">
                <search-bar></search-bar>
                <a class="icon-button" href="${BASE}/scan/product${this._param}">
                    <svg>
                        <path d="M1.5625 6.25V3.75H4.6875" stroke="black" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M23.4375 6.25V3.75H20.3125" stroke="black" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M1.5625 13.75V16.25H4.6875" stroke="black" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M23.4375 13.75V16.25H20.3125" stroke="black" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M4.6875 5.625V9.375" stroke="black" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M8.59375 5.625V9.375" stroke="black" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M20.3125 5.625V9.375" stroke="black" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M16.4062 5.625V9.375" stroke="black" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M12.5 5.625V9.375" stroke="black" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M1.5625 11.25H23.4375" stroke="black" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M4.6875 13.125V14.375" stroke="black" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M8.59375 13.125V13.75" stroke="black" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M20.3125 13.125V14.375" stroke="black" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M16.4062 13.125V13.75" stroke="black" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M12.5 13.125V13.75" stroke="black" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </a>
            </div>`
    }
}
customElements.define('product-searchbar', ProductSearchbar); 