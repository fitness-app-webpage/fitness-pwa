import { LitElement, html, css } from "lit";
import {repeat} from 'lit/directives/repeat.js';
import { Router } from "@vaadin/router";
import { BASE } from "../../../app";
import "../scanner/scanner-div"
import "../input/search-bar"
import "./product-searchbar"
import { deleteIntake } from "../../../service/ApiService";

export default class DairyProductList extends LitElement{
    static get properties() {
        return{
            products: {type: Array},
        }
    }
    constructor() {
        super();
        this.products = [];
    }
    connectedCallback() {
        super.connectedCallback()
        this.addEventListener("touchstart", this._startTouch)
        this.addEventListener("touchmove", this._touchMove)
        this.addEventListener("touchend", this._touchEnd)
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener("touchstart", this._startTouch)
        this.removeEventListener("touchmove", this._touchMove)
        this.removeEventListener("touchend", this._touchEnd)
    }
    firstUpdated() {
        super.firstUpdated()
        this._items = this.shadowRoot.querySelectorAll(".container")
        this._items.forEach(data => {
            data.addEventListener("touchmove", () => {
                this._item = data.firstElementChild
                this._deleteDiv = data.lastElementChild.lastElementChild
            })
        })
    }

    _startTouch(e) {
        this._width = this.shadowRoot.querySelector(".container").offsetWidth
        this._startPosition = this._getPositionX(e)
    }
    _touchMove(e) {
        this._xPosition = this._getPositionX(e)
        this._currentTranslateValue = this._xPosition - this._startPosition < 0 
            ?  this._xPosition - this._startPosition
            : 0;

        requestAnimationFrame(() => {
            if((this._width + this._currentTranslateValue) <= (this._width / 1.5) 
            && (this._width + this._currentTranslateValue) > (this._width / 1.55)) {
                
                this._deleteDiv.style.width = `${this._width - (this._width + this._currentTranslateValue)}px`
                this._item.style.transform = `translateX(${this._currentTranslateValue}px)`
            } else if((this._width + this._currentTranslateValue) <= (this._width / 1.55)) {
                this._deleteDiv.style.width = `${this._width - ((this._width / 1.55) + (this._currentTranslateValue * 0.1))}px`
                this._item.style.transform = `translateX(-${(this._width / 3.1) - (this._currentTranslateValue * 0.1)}px)`
            } else {
                this._item.style.transform = `translateX(${this._currentTranslateValue}px)`
                this._deleteDiv.style.width = "100px"
            }
        })
    }

    _touchEnd(e) {
        if((this._width + this._currentTranslateValue) <= (this._width / 1.5))
            this._removeIntake(this._item.id)

        if(this._item !== undefined) {
            this._currentTranslateValue = 0;
            setTimeout(() => {
                this._deleteDiv.style.width = "100px"
                this._item.style.transform = `translateX(0)`      
            }, 50);
        }
    }

    _getPositionX(e) {
        return e.touches[0].clientX
    }
    static get styles(){
        return css`
            h1 {
                text-align: center;
            }
            .container {
                position: relative;
                display: flex;
                flex-direction: row;
                overflow: hidden;
                /* z-index: 0; */
            }
            .inner-container {
                width: 100vw;
                height: 100%;
                transform: translateX(0);
                transition: transform 0.1s ease-out;
                z-index: 1;
                background-color: white;
            }
            .product-card {
                height: 50px;
                width: 100%;
                /* margin: 12px 0; */

            }
            .product-container {
                display: flex;
                flex-direction: row;
                height: 100%;
                padding: 5px 0 5px 10px;
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
            .name {
                opacity: 0.85;
            }
            span {
                opacity: 0.7;
            }
            .product-column {
                display: flex;
                flex-direction: column;
                width: calc(100% - 40px);
            }
            .delete {
                display: flex;
                position: absolute;
                width: 100px;
                background-color: red;
                height: 100%;
                right: 0px;
                transition: 0.2s ease-out;
            }
            .delete > span {
                width: 100%;
                display: flex;
                /* text-align: center; */
                align-items: center;
                justify-content: center;
                color: white;
                opacity: 1;
                /* font-weight: bold; */
                /* font-size: 18px; */
            }
            .background-containter {
                display: flex;
                height: 100%;
                position: absolute;
                width: 100%;
                z-index: 0;
            }
            .background {
                height: 100%;
                position: absolute;
                width: 100%;
                background-color: #f0ebeb;
            }
            @keyframes vibrate {
                0%, 2%, 4%, 6%, 8%, 10%, 12%, 14%, 16%, 18% {
                -webkit-transform: translate3d(-1px, 0, 0);
                        transform: translate3d(-1px, 0, 0);
                }
            1%, 3%, 5%, 7%, 9%, 11%, 13%, 15%, 17%, 19% {
                -webkit-transform: translate3d(1px, 0, 0);
                        transform: translate3d(1px, 0, 0);
                }   
            20%, 100% {
                -webkit-transform: translate3d(0, 0, 0);
                        transform: translate3d(0, 0, 0);
                }
            }
        `;
    }
    render() {
        return html`
            ${repeat(this.products, 
                    (e) => e.id,
                    (e) => html`
                                <div class="container">
                                    <div class="inner-container" id="${e.id}">
                                        <div class="product-card">
                                            <div class="product-container">
                                                <div class="product-column">
                                                    <span class="name">${e.products.name}</span>
                                                    <div class="product-info">
                                                        <span>${e.products.gramsEaten} gram</span>
                                                    </div>
                                                </div>
                                                <span id="${e.products.name}" @click="${this.handleClick}">${e.products.nutritions.calories}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="background-containter">
                                        <div class="background">

                                        </div>
                                        <div class="delete">
                                            <span>Delete</span>
                                        </div>
                                    </div>
                                </div>

                                `
                )
            }`
    }
    handleClick(e) {
        Router.go(`${BASE}/product?productname=${e.target.id}`)
    }
    _removeIntake(id) {
        if(self.confirm("Are you sure you want to delete this product from your intake")) {
            deleteIntake(id).then(e => {
                    this.dispatchEvent(new CustomEvent("intakeDeleted", {
                        bubbles: true,
                        composed: true
                    }))
                }).catch(e => {
                    console.log(e)
                })
        }
    }
}
customElements.define('dairy-productlist', DairyProductList); 