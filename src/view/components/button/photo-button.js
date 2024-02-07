import { LitElement, html, css } from "lit";
import {BASE} from '../../../app'
export default class PhotoButton extends LitElement{
  
  static get properties() {
    return{
        src: {type: String},
        text: {type: String},
        nav: {type: String},
        useSvg: {type: Boolean},
        active: {type: Boolean, reflect: true},
        path: {type: Array},
        color: {type: String},
        border: {type: Boolean}
    }
  };
  
  constructor() {
    super();
    this.src = "";
    this.text = "";
    this.nav = "";
    this.useSvg = false;
    this.path = [];
    this.active = false;
    this.color = "black"
    this.border = false;
  }
  firstUpdated() {
    super.firstUpdated()
    this._checkActive();
  }

  static get styles(){ 
    return css`
        div{
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin: 10px 0 0 0;
        }
        ::slotted(img), ::slotted(svg) {
          width: 34px;
          height: 34px;
        }
        a {
          -webkit-tap-highlight-color: transparent;
        }
        span {
          font-size: 70%;
          opacity: 0.6;
        }
        .active {
          opacity: 1;
        }
        .border {
          border-radius: 50%;
          border: 1px solid transparent;
          outline: 1px solid #afadad;
        }
        .container {
          margin: 8px 0 0 0;
        }
        img {
            width: 34px;
            height: 34px;
            object-fit: cover;
            border-radius: 50%;

        }
      `;
    }


  render() {
    return this.useSvg 
    ? 
    html`<div>
          <a href=${BASE + this.nav}>
            <div class="img-container">
              ${this.active 
                ? html`<slot name="activeSvg"></slot>`
                : html `<slot name="svg"></slot>` 
              }
            </div>
          </a>
          <span>${this.text}</span>
        </div>`
    :
    html`
    <div>
      <a href=${BASE + this.nav}>
        <div class="img-container">
          <img src=${BASE + this.src}>
        </div>
      </a>
      <span>${this.text}</span>
    </div>
    `;
  }

  _checkActive() {
    if(this.active) {
      this.shadowRoot.querySelector("span").classList.add("active")
      if(this.border) {
        this.shadowRoot.querySelector(".img-container").classList.add("border")
        this.shadowRoot.querySelector("div").classList.add("container")
      }
    }
  }
}

customElements.define('photo-button', PhotoButton);