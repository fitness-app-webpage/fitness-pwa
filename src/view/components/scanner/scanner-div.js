import { LitElement, html, css } from "lit";
import { Html5QrcodeScanner, Html5Qrcode } from "html5-qrcode";

export default class ScannerDiv extends LitElement{
    static get properties() {
        return{
            _decodedText: {type: String, state: true},
            _cameraId: {type: String, state: true},
            _scanner: {state: true}
        }
    }

    constructor() {
        super();
        this._decodedText = "";
    }
    static get styles(){
        return css`
            h1 {
                text-align: center;
            }
            /* .scanner-box {
                height: 100px;
                width: 100%;
            } */
        `;
    }

    render() {
        return html`
            <button @click="${this._openScanner}">Scan barcode</button>
            <div id="reader" class="scanner-box">
            </div>
            <!-- <p>${this._decodedText}</p> -->
            `
    }
    _openScanner() {
        const onScanSuccess = (decodedText, decodedResult) => {
            this._decodedText = decodedText;
            this._scanner.clear();
            this.dispatchEvent(new CustomEvent("getBarcode", {
                detail: decodedText
            }))
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