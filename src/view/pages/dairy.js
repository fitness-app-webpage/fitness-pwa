import { LitElement, html, css } from "lit";
import "../components/page/page"
import { BASE } from "../../app";
import '../components/diary/break-fast'
import { getProducts } from "../../service/ApiService";
import {Task} from '@lit/task';

export default class Dairy extends LitElement{
    static get properties() {
        return{
        }
    }

    _breakFastTask = new Task(this, {
        task: async () => {
            return await getProducts().then(e => {
                return e;
            })
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
        `;
    }
    
  
    render() {
        return html`
        <page-div>
            <h1>Logbook</h1>
            ${this._breakFastTask.render({
                pending: () => html`<span>Loading...</span>`,
                complete: (e) => html`<break-fast title="Break fast" .data=${e}></break-fast>`,
                error: (e) => html`<span>${e.error}</span>`
            })}
            <a href="${BASE}/products">Products</a>
        </page-div>`
    }

}
customElements.define('dairy-page', Dairy); 