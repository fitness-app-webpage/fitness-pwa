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
        path: {type: String},
        pathActive: {type: String}
    }
  };
  
  constructor() {
    super();
    this.src = "";
    this.text = "";
    this.nav = "";
    this.useSvg = false;
    this.path = "";
    this.pathActive = "";
    this.active = false;
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
        img, svg {
          width: 34px;
          height: 34px;
        }
        a {
          -webkit-tap-highlight-color: transparent;
        }
        /* a {
        font-weight: bold;
        opacity: 0.85;
        text-decoration: none;
        color: black;
      } */
      /* a:link, a:visited {
        color: black;
      } */
        span {
          font-size: 70%;
          opacity: 0.6;
        }
      `;
    }


  render() {
    return this.useSvg 
    ? 
    html`<div @click="${this.handleClick}">
          <a href=${BASE + this.nav}>
          ${this.active ? html`<svg>
              <path d="${this.pathActive}"></path>
            </svg>`
            : html`<svg>
              <path d="${this.path}">
              </svg>`}
          </a>
          <span>${this.text}</span>
        </div>`
    :
    html`
    <div>
      <a href=${BASE + this.nav}>
        <img src=${this.src}>
      </a>
      <span>${this.text}</span>
    </div>
    `;
  }
  handleClick(e) {
    this.active = !this.active;
    console.log(this.shadowRoot.querySelector("a"))
    console.log(e.target.active)
    // e.target.style = "background-color: black"
  }
}

customElements.define('photo-button', PhotoButton);