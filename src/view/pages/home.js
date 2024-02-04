import { LitElement, html, css } from "lit";
import "../components/page/page"

export default class home extends LitElement{
    static get styles(){
        return css`
        `;
    }
    render() {
        return html`
        <page-div>
            <p>hello</p>
            <form @submit=${this.handleSubmit}>
                <input type="file" name="image"/>
                <button type="submit">submit</button>
            </form>
            
        </page-div>`
    }
    handleSubmit(e) {
        //dimensions 696x 551
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries())
        const fr = new FileReader();
        fr.readAsArrayBuffer(data.image)
        console.log(fr)
        fr.onload = () => {
            const bytes = [new Uint8Array(fr.result)]
            console.log(bytes)
            let first400ints = []
            const lengthArr = bytes[0].length >= 400 ? 400 : bytes[0].length
            for(let i = 0; i < lengthArr; i++) {
                first400ints = [...first400ints, bytes[0][i]]
            }
            const first100hex = this._convertToHex32Bit(first400ints)
            // console.log(first100Ints)
            const n_images = BigInt('0x' + first100hex[1])
            const n_row = BigInt('0x' + first100hex[4])
            const n_column = BigInt('0x' + first100hex[5])

            console.log(n_images)
            console.log(n_row)
            console.log(n_column)
            console.log(first100hex)
            let images = [];
            for(let i = 0; i < 100; i++) {
                let image = []
                for(let j = 0; j < n_row; j++) {
                    let row = [];
                    for(let x = 0; x < n_column; x++) {
                        row = [...row, first100hex[x + 5].match(/../g)]
                    }
                    image = [...image, row]
                }
                images = [...images, image]
            }
            console.log(images)
        }

    }
    _convertToHex32Bit(data) {
        let hexValue = "";
        let resultHexArr = [];
        for(let i = 1; i < data.length; i++) {
            let hex = data[i - 1].toString(16).toUpperCase();

            if(hex.length < 2) {
                hex = "0" + hex;
            }
            hexValue += hex
            if(i % 4 == 0 && i != 0) {
                resultHexArr = [...resultHexArr, hexValue]
                hexValue = "";
            }
        }
        return resultHexArr;
    }
}
customElements.define('home-view', home); 