import { LitElement, html, css, nothing } from "lit";
import {until} from 'lit/directives/until.js';
import '../button/photo-button'
import {BASE, router} from "../../../app"
import { getProfilePicture } from "../../../service/ApiService";

export default class HeaderBar extends LitElement {
  static get properties() {
    return{
      title: {type: String},
      checkicon: {type: Boolean},
      href: {type: String},
    }
  };

  constructor() {
    super();
    this.title = "default"
    this.checkicon = true;
    this.href = "/home"
  }
  connectedCallback() {
    super.connectedCallback()
    const mealtype = new URLSearchParams(router.location.search).get("mealtype")
    const productName = new URLSearchParams(router.location.search).get("productname")
    this._param = mealtype === null || this.href === "/dairy"
      ? "" 
      : "?mealtype=" + mealtype;
    // this.checkicon = mealtype !== null && productName !== null;
  }


  static get styles(){ 
    return css`
    @media only screen and (max-width: 480px) and (orientation: portrait) {
      header {
        position: relative;
      }
      nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 50px;
        border-bottom: 1px solid #afadad;
      }
      h1 {
        position: absolute;
        font-size: 18px;
        top: 0;
        left: 50%;
        text-align: center;
        transform: translate(-50%);
        width: 75%;
      }
      .back, .select {
        -webkit-tap-highlight-color: transparent;
        -webkit-user-select: none;
        width: 24px;
        height: 24px;
        padding-bottom: 12px;
        padding-top: 14px;
        padding-right: 4px;
        cursor: pointer;
      }
      button {
        height: 100%;
        background-color: transparent;
        border: 0;
        padding: 0;
      }
      a, button {
        -webkit-tap-highlight-color: transparent;
      }
    }
    @media only screen and (max-width: 1024px) and (orientation: landscape) {
       
    }
    `;
  }

  render() {
    return html`
        <header>
          <nav>
          <a href="${BASE + this.href + this._param}">
            <svg class="back">
              <path d="M15 5.90938L14.0297 5L6 12.5L14.0297 20L15 19.0953L7.94531 12.5L15 5.90938Z" fill="black"/>
            </svg>
          </a>
            <h1>${this.title}</h1>
            ${this.checkicon 
              ? html`<button @click="${this.handleClick}">
              <svg class="select">
                <path d="M21.4144 5.99991L9.00015 18.4141L2.58594 11.9999L4.00015 10.5857L9.00015 15.5857L20.0002 4.58569L21.4144 5.99991Z" fill="black"/>
              </svg>
            </button>`
          : nothing
          }
          </nav>
        </header>
    `;
  }
  handleClick(e) {
    self.dispatchEvent(new CustomEvent("submitProduct", {
      bubbles: true,
      composed: true,
    }))
  }

}

customElements.define('header-bar', HeaderBar);