import { LitElement, html, css } from "lit";
import {repeat} from 'lit/directives/repeat.js';

export default class NotificationBar extends LitElement{
    static get properties() {
        return{
            _notifications: {type: Array, state: true},
            _counter: {type: Number, state: true}
        }
    }

    constructor() {
        super();
        this._notifications = []
        this._counter = 1;
        this._idCounter = 1;
    }
    firstUpdated() {
        super.firstUpdated()
        this._container = this.shadowRoot.querySelector(".container");
    }
    updated() {
        super.updated()
        if(this._notifications.length === 0) {
            this._container.style = "display: none"
        }
    }
    static get styles(){
        return css`
         @media only screen and (max-width: 480px) {
            .container {
                display: none;
                flex-direction: column-reverse;
                position: relative;
                align-items: flex-end;
                max-height: 100%;
                overflow: hidden;
            }
            .notification {
                overflow: hidden;
                position: relative;
                display: flex;
                margin: 10px 10px 10px 0;
                flex-direction: column;
                align-items: center;
                text-align: center;
                justify-content: center;
                width: 200px;
                height: 65px;
                animation: slideIn 0.5s linear forwards;
                box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
            }
            span {
                text-align: center;

            }
            .timer {
                position: absolute;
                width: 100%;
                height: 100%;
                background: grey;
                opacity: 0.5;
                animation: timer 4s linear forwards;
                transform: translateX(-100%);
            }
            .remove {
                animation: fadeOut 0.5s linear;
            }

            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                }
                to {
                    transform: translateX(0);
                }
            }
            @keyframes fadeOut {
                from {
                    opacity: 1;
                }
                to {
                    opacity: 0;
                }
            }
            @keyframes timer {
                100% {
                    transform: translateX(0);
                }
            }
        }
        `;
    }
    
    render(){
        return html`
        <button @click="${this.handleClick}">aaaa</button>
        <div class="container">
            ${repeat(this._notifications,
                (e) => e.id,
                (e) => e.html   
            )}
            <!-- ${this._notifications} -->
        </div>
        <!-- <button @click="${this._handleNotification}">Notification</button> -->
        `

    };
    handleClick(e) {       
        this._container.style = "display: flex" 
        if(this._notifications.length >= 4) {
            this._notifications.splice(-1)
            this._notifications = [...this._notifications, this._makeNotification()]

        } else {
            this._notifications = [...this._notifications, this._makeNotification()]
        }
        setTimeout(() => {
            this._notifications = this._notifications.filter(e => e.id !== this._idCounter)
            this._idCounter++;
        }, 4000);
        
    }

    _makeNotification(data) {
        return {id: this._counter++, html: html`
            <div class="notification">
                <div class="timer"></div>
                <div>
                    <span>Product added</span>
                    <div class="loading-bar"></div>
                </div>
            </div>`}
    }

    // _handleNotification(e) {
    //     navigator.serviceWorker.register("sw.js").then(async (registration) => {
    //         const result = await Notification.requestPermission()

    //         if(result === "granted") {
    //             registration.showNotification("hello", {
    //                 body: "hello world"
    //             })
    //         }
    //       });
    // }
}
customElements.define('notification-bar', NotificationBar); 