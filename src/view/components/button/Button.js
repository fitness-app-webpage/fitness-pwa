import { LitElement, html, css } from "lit";
export default class Button extends LitElement{
  
  static get properties() {
    return{
        value: {type: String},
        disabled: {type: Boolean, Reflect: true}
    }
  };
  
  constructor() {
    super();
    this.value = "Button";
    this.disabled = false;
  }
  
  static get styles(){ 
    return css`
        :host([disabled]) button{
            background-color: #cccccc;
            cursor: default;
        }
        button {
        justify-content: var(--button-div-justify-content, center);
        align-items: var(--button-div-align-items, center);
        border-radius: var(--border-raduis, 40px);
        color: var(--button-div-color, #000000);
        background-color: var(--button-background-color, #4f63f7);
        font-size: var(--button-div-font-size, 16px);
        transition: var(--button-div-transition, .4s ease-in);
        display: flex;
        padding: var(--button-div-padding, 10px 0);
        width: var(--button-div-width, 100%);
        border: none;
        user-select: none;
        cursor: pointer;
      }
      @media (hover: hover) {
        button:hover {
        background-color: var(--button-background-color, #3648ca);
        }
      }`;
    }


  render() {
    return html`
    <button type="button" ?disabled=${this.disabled}>
        ${this.value}
    </button>
    `;
  }

}

customElements.define('button-div', Button);