import { LitElement, html, css } from "lit";
import "../components/page/page"
import { BASE } from "../../app";
import { Html5QrcodeScanner } from "html5-qrcode";

export default class Logbook extends LitElement{
    static get styles(){
        return css`
            h1 {
                text-align: center;
            }
        `;
    }
    firstUpdated() {
        super.firstUpdated()
        this._a();
    }
    render() {
        return html`
        <page-div>
            <h1>Logbook</h1>
            <div id="reader"></div>
            <a href="${BASE}/products">Products</a>
            <p>${this.decodedText}</p>
        </page-div>`
    }
    _a() {
        const onScanSuccess = (decodedText, decodedResult) => {
            // handle the scanned code as you like
            this.decodedText = decodedText;
          };
      
          const onScanFailure = (errorMessage, error) => {
            // handle scan failure, usually better to ignore and keep scanning
            this.errorMessage = errorMessage;
          };
        const config = {
            fps: 10,
            qrbox: {
              width: 350,
              height: 250,
            },
          };
        const reader = this.shadowRoot.querySelector("#reader")
        console.log(reader)
        const scanner = new Html5QrcodeScanner(reader, config)
        console.log(scanner)
        scanner.render(onScanSuccess, onScanFailure);
    }
}
customElements.define('logbook-page', Logbook); 