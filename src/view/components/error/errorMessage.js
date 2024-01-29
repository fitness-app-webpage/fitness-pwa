import { LitElement, html, css } from 'lit';
export default class ErrorMessage extends LitElement {
    static get properties() {
        return{
          message: {type: String}
        }
      };
    
    constructor() {
        super();
        this.message = "";
    }

    static get styles() {
        return css`
        span {
            position: relative;
            left: .8rem;
            padding: 0 2px;
            font-size: 16px;
            color: #EB0000;
        }
        `;
    }

    render(){
        return html`
            <span>${this.message}</span>
        `;
    }


}

customElements.define('error-message', ErrorMessage);