import { LitElement, html, css } from "lit";
import { Html5QrcodeScanner } from "html5-qrcode";
import { findProductByBarcode } from "../../../service/ApiService";
import { Router } from "@vaadin/router";
import { BASE } from "../../../app";

export default class ScannerDiv extends LitElement{
    static get properties() {
        return{
            _decodedText: {type: String, state: true},
            _scanner: {state: true},
            mealtype: {type: String}
        }
    }

    constructor() {
        super();
        this._decodedText = "";
        this.scannericon = false;
        this.mealtype = "";
    }
    firstUpdated() {
        super.firstUpdated()
        this._openScanner();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this._scanner.clear();
    }
    static get styles(){
        return css`
            h1 {
                text-align: center;
            }
            svg {
                width: 25px;
                height: 20px;
            }
            .icon-button {
                background-color: transparent;
                border: 0px;
            }
            .container {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }
            .button {
                width: 100px;
            }
            .scanner-box {
                position: relative;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;

            }
        `;
    }

    render() {
        return html`
            <div class="container">
                <div id="reader" class="scanner-box"></div>
                <!-- <p>${this._decodedText}</p> -->
            </div>
            `
    }
    _openScanner() {
        const onScanSuccess = (decodedText, decodedResult) => {
            this._decodedText = decodedText;
            this._scanner.clear();
            findProductByBarcode(decodedText).then(e => {
                Router.go(`${BASE}/product/${e.id}${this.mealtype}`)
            }).catch(error => {
                this.dispatchEvent(new CustomEvent("getBarcode", {
                    detail: {barcode: decodedText, error: error.message}
                }))
            })
        };
    
        const onScanFailure = (errorMessage, error) => {
            
        };
        const config = {
            fps: 10,
            qrbox: {
            width: 250,
            height: 250,
            },
        };
        const reader = this.shadowRoot.querySelector("#reader")
        this._scanner = new Html5QrcodeScanner(reader, config)
        this._scanner.render(onScanSuccess, onScanFailure);  
    }
}
customElements.define('scanner-div', ScannerDiv); 