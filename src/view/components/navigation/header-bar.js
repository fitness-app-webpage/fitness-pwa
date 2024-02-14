import { LitElement, html, css } from "lit";
import {until} from 'lit/directives/until.js';
import '../button/photo-button'
import {BASE, router} from "../../../app"
import { getProfilePicture } from "../../../service/ApiService";

export default class HeaderBar extends LitElement {
  static get properties() {
    return{
      
    }
  };

  constructor() {
    super();
    
  }


  static get styles(){ 
    return css`
    @media only screen and (max-width: 480px) and (orientation: portrait) {
      nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 50px;
        border-bottom: 1px solid #afadad;
      }
      h1 {
        font-size: 16px;
        margin: 0;
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
    }
    @media only screen and (max-width: 1024px) and (orientation: landscape) {
       
    }
    `;
  }

  render() {
    return html`
        <header>
          <nav>
          <a href="${BASE}/products">
            <svg class="back">
              <path d="M15 5.90938L14.0297 5L6 12.5L14.0297 20L15 19.0953L7.94531 12.5L15 5.90938Z" fill="black"/>
            </svg>
          </a>
            <h1>Add product</h1>
            <button @click="${this.handleClick}">
              <svg class="select">
                <path d="M21.4144 5.99991L9.00015 18.4141L2.58594 11.9999L4.00015 10.5857L9.00015 15.5857L20.0002 4.58569L21.4144 5.99991Z" fill="black"/>
              </svg>
            </button>
          </nav>
        </header>
    `;
  }
  handleClick(e) {
    self.dispatchEvent(new CustomEvent("submitProduct", {
      bubbles: true,
      composed: true
    }))
  }

}

customElements.define('header-bar', HeaderBar);