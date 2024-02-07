import { LitElement, html, css } from "lit";
import '../button/photo-button'
import {BASE, router} from "../../../app"

export default class FooterNav extends LitElement {
  static get properties() {
    return{
      
    }
  };

  constructor() {
    super();
    this.data = {};
  }
  firstUpdated() {
    super.firstUpdated();
    this._checkIfIconIsActive();
  }  

  static get styles(){ 
    return css`
    :host {
      width: 100%;
    }
    footer {
      display: none;
    }
    @media only screen and (max-width: 480px) and (orientation: portrait){
        footer{
            display: block;
            position: fixed;
            bottom: 0;  
            width: 100%;
            height: 100px;
            border-top: 1px solid #afadad;
        }
        nav {
            display: flex;
            justify-content: space-evenly;
            
        }
        photo-button {
          width: 70px;
        }
    }
    @media only screen and (max-width: 1024px) and (orientation: landscape) {
        footer{
            display: block;
            position: fixed;
            bottom: 0;  
            width: 100%;
            height: 100px;
            border-top: 1px solid #afadad;
        }
        nav {
            display: flex;
            justify-content: space-evenly;
            
        }
        photo-button {
          width: 70px;
        }
    }
    `;
  }

  render() {
    return html`
          <footer>
            <nav>
                <photo-button
                    text="Home"
                    nav="/home" 
                    ?useSvg=${true}
                >
                <svg slot="svg">
                  <path d="M32.8595 14.7043C27.6204 9.92894 18.1065 1.03238 18.0123 0.942028L17 0L15.9924 0.942028C15.8965 1.03071 6.37809 9.92392 1.06327 14.7428C0.386364 15.4021 0 16.324 0 17.2677C0 19.115 1.38473 20.6142 3.09091 20.6142H4.63636V30.6535C4.63636 32.5008 6.02109 34 7.72727 34C7.72727 34 9.5 34 10.8182 34H23.1818C23.1818 34 24 34 26.2727 34C28 34 29.3636 32.5008 29.3636 30.6535C29.3636 28.8063 29.3636 20.6142 29.3636 20.6142H30.9091C32.6153 20.6142 34 19.115 34 17.2677C34 16.2671 33.575 15.3251 32.8595 14.7043ZM23.1818 34H10.8182C12.7966 34 13.9091 32.5022 13.9091 30.6535C13.9091 28 13.9091 23.4252 13.9091 23.4252H20.0909C20.0909 23.4252 20.0625 28.6717 20.0625 30.6535C20.0625 32.6354 21.5 34 23.1818 34ZM26.2727 17.2677L26.2758 30.6535C26.2727 30.6535 23.1818 30.6535 23.1818 30.6535V20.6142H10.8182V30.6535H7.72727V17.2677H3.08936C7.36255 13.3992 14.3944 6.84852 17 4.41732C19.6056 6.84852 26.6344 13.3975 30.9091 17.2694L26.2727 17.2677Z"></path>
                </svg>
                <svg slot="activeSvg">
                  <path d="M32.8595 14.7043C27.6204 9.92894 18.1065 1.03238 18.0123 0.942028L17 0L15.9924 0.942028C15.8965 1.03071 6.37809 9.92392 1.06327 14.7428C0.386364 15.4021 0 16.324 0 17.2677C0 19.115 1.38473 20.6142 3.09091 20.6142H4.63636V30.6535C4.63636 32.5008 6.02109 34 7.72727 34C7.72727 34 9.5 34 10.8182 34H23.1818C23.1818 34 24 34 26.2727 34C28 34 29.3636 32.5008 29.3636 30.6535C29.3636 28.8063 29.3636 20.6142 29.3636 20.6142H30.9091C32.6153 20.6142 34 19.115 34 17.2677C34 16.2671 33.575 15.3251 32.8595 14.7043ZM23.1818 34H10.8182C12.7966 34 13.9091 32.5022 13.9091 30.6535C13.9091 28 13.9091 23.4252 13.9091 23.4252H20.0909C20.0909 23.4252 20.0625 28.6717 20.0625 30.6535C20.0625 32.6354 21.5 34 23.1818 34Z"></path>
                </svg>
              </photo-button>
                <photo-button
                    text="Dairy"
                    nav="/logbook"
                    ?useSvg=${true}
                >
                <svg slot="svg">
                  <path d="M8.5 8.50001C8.5 7.71761 9.13427 7.08334 9.91667 7.08334H24.0833C24.8658 7.08334 25.5 7.71761 25.5 8.50001C25.5 9.28241 24.8658 9.91668 24.0833 9.91668H9.91667C9.13426 9.91668 8.5 9.28241 8.5 8.50001Z"></path>
                  <path d="M8.5 14.1667C8.5 13.3843 9.13427 12.75 9.91667 12.75H24.0833C24.8658 12.75 25.5 13.3843 25.5 14.1667C25.5 14.9491 24.8658 15.5833 24.0833 15.5833H9.91667C9.13426 15.5833 8.5 14.9491 8.5 14.1667Z"></path>
                  <path d="M9.91667 18.4167C9.13427 18.4167 8.5 19.0509 8.5 19.8333C8.5 20.6157 9.13426 21.25 9.91667 21.25H24.0833C24.8658 21.25 25.5 20.6157 25.5 19.8333C25.5 19.0509 24.8658 18.4167 24.0833 18.4167H9.91667Z"></path>
                  <path d="M8.5 25.5C8.5 24.7176 9.13427 24.0833 9.91667 24.0833H15.5833C16.3658 24.0833 17 24.7176 17 25.5C17 26.2824 16.3658 26.9167 15.5833 26.9167H9.91667C9.13427 26.9167 8.5 26.2824 8.5 25.5Z"></path>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M2.83334 5.66666C2.83334 3.31945 4.73614 1.41666 7.08334 1.41666H26.9167C29.264 1.41666 31.1667 3.31945 31.1667 5.66666V28.3333C31.1667 30.6806 29.264 32.5833 26.9167 32.5833H7.08334C4.73614 32.5833 2.83334 30.6806 2.83334 28.3333V5.66666ZM7.08334 4.24999H26.9167C27.6991 4.24999 28.3333 4.88425 28.3333 5.66666V28.3333C28.3333 29.1157 27.6991 29.75 26.9167 29.75H7.08334C6.30095 29.75 5.66668 29.1157 5.66668 28.3333V5.66666C5.66668 4.88426 6.30093 4.24999 7.08334 4.24999Z"></path>
                </svg>   
                <svg slot="activeSvg" style="fill: blue;">
                  <path d="M8.5 8.50001C8.5 7.71761 9.13427 7.08334 9.91667 7.08334H24.0833C24.8658 7.08334 25.5 7.71761 25.5 8.50001C25.5 9.28241 24.8658 9.91668 24.0833 9.91668H9.91667C9.13426 9.91668 8.5 9.28241 8.5 8.50001Z"></path>
                  <path d="M8.5 14.1667C8.5 13.3843 9.13427 12.75 9.91667 12.75H24.0833C24.8658 12.75 25.5 13.3843 25.5 14.1667C25.5 14.9491 24.8658 15.5833 24.0833 15.5833H9.91667C9.13426 15.5833 8.5 14.9491 8.5 14.1667Z"></path>
                  <path d="M9.91667 18.4167C9.13427 18.4167 8.5 19.0509 8.5 19.8333C8.5 20.6157 9.13426 21.25 9.91667 21.25H24.0833C24.8658 21.25 25.5 20.6157 25.5 19.8333C25.5 19.0509 24.8658 18.4167 24.0833 18.4167H9.91667Z"></path>
                  <path d="M8.5 25.5C8.5 24.7176 9.13427 24.0833 9.91667 24.0833H15.5833C16.3658 24.0833 17 24.7176 17 25.5C17 26.2824 16.3658 26.9167 15.5833 26.9167H9.91667C9.13427 26.9167 8.5 26.2824 8.5 25.5Z"></path>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M2.83334 5.66666C2.83334 3.31945 4.73614 1.41666 7.08334 1.41666H26.9167C29.264 1.41666 31.1667 3.31945 31.1667 5.66666V28.3333C31.1667 30.6806 29.264 32.5833 26.9167 32.5833H7.08334C4.73614 32.5833 2.83334 30.6806 2.83334 28.3333V5.66666ZM7.08334 4.24999H26.9167C27.6991 4.24999 28.3333 4.88425 28.3333 5.66666V28.3333C28.3333 29.1157 27.6991 29.75 26.9167 29.75H7.08334C6.30095 29.75 5.66668 29.1157 5.66668 28.3333V5.66666C5.66668 4.88426 6.30093 4.24999 7.08334 4.24999Z"></path>
                </svg>  
                </photo-button>
                <photo-button 
                    text="Add a product"
                    nav="/addproduct" 
                    ?useSvg=${true}
                >
                <svg slot="svg">
                  <path d="M17 0C7.57273 0 0 7.57273 0 17C0 26.4273 7.57273 34 17 34C26.4273 34 34 26.4273 34 17C34 7.57273 26.4273 0 17 0ZM24.7273 20.0909H20.0909V24.7273C20.0909 26.4273 18.7 27.8182 17 27.8182C15.3 27.8182 13.9091 26.4273 13.9091 24.7273V20.0909H9.27273C7.57273 20.0909 6.18182 18.7 6.18182 17C6.18182 15.3 7.57273 13.9091 9.27273 13.9091H13.9091V9.27273C13.9091 7.57273 15.3 6.18182 17 6.18182C18.7 6.18182 20.0909 7.57273 20.0909 9.27273V13.9091H24.7273C26.4273 13.9091 27.8182 15.3 27.8182 17C27.8182 18.7 26.4273 20.0909 24.7273 20.0909Z"/>
                </svg>
                <svg slot="activeSvg" style="fill: blue;">
                  <path d="M17 0C7.57273 0 0 7.57273 0 17C0 26.4273 7.57273 34 17 34C26.4273 34 34 26.4273 34 17C34 7.57273 26.4273 0 17 0ZM24.7273 20.0909H20.0909V24.7273C20.0909 26.4273 18.7 27.8182 17 27.8182C15.3 27.8182 13.9091 26.4273 13.9091 24.7273V20.0909H9.27273C7.57273 20.0909 6.18182 18.7 6.18182 17C6.18182 15.3 7.57273 13.9091 9.27273 13.9091H13.9091V9.27273C13.9091 7.57273 15.3 6.18182 17 6.18182C18.7 6.18182 20.0909 7.57273 20.0909 9.27273V13.9091H24.7273C26.4273 13.9091 27.8182 15.3 27.8182 17C27.8182 18.7 26.4273 20.0909 24.7273 20.0909Z"/>
                </svg>
                </photo-button>
                <photo-button 
                    text="Profile"
                    ?border="${true}"
                    nav="/profile" 
                    ?useSvg=${true}
                >
                <svg slot="svg" style="fill: #C6DAE6">
                  <path d="M17 0C7.61016 0 0 7.61016 0 17C0 26.3898 7.61016 34 17 34C26.3898 34 34 26.3898 34 17C34 7.61016 26.3898 0 17 0ZM17 8.5C19.641 8.5 21.7812 10.6409 21.7812 13.2812C21.7812 15.9216 19.643 18.0625 17 18.0625C14.3597 18.0625 12.2188 15.9216 12.2188 13.2812C12.2188 10.6409 14.357 8.5 17 8.5ZM17 29.75C13.4851 29.75 10.2996 28.3203 7.98867 26.012C9.06445 23.2355 11.7207 21.25 14.875 21.25H19.125C22.282 21.25 24.9382 23.2342 26.0113 26.012C23.7004 28.3223 20.5129 29.75 17 29.75Z"></path>
                </svg>
                <svg slot="activeSvg" style="fill: #C6DAE6">
                  <path d="M17 0C7.61016 0 0 7.61016 0 17C0 26.3898 7.61016 34 17 34C26.3898 34 34 26.3898 34 17C34 7.61016 26.3898 0 17 0ZM17 8.5C19.641 8.5 21.7812 10.6409 21.7812 13.2812C21.7812 15.9216 19.643 18.0625 17 18.0625C14.3597 18.0625 12.2188 15.9216 12.2188 13.2812C12.2188 10.6409 14.357 8.5 17 8.5ZM17 29.75C13.4851 29.75 10.2996 28.3203 7.98867 26.012C9.06445 23.2355 11.7207 21.25 14.875 21.25H19.125C22.282 21.25 24.9382 23.2342 26.0113 26.012C23.7004 28.3223 20.5129 29.75 17 29.75Z">
                  </svg>
                </photo-button>
            </nav>
          </footer>
  `;
  }
  _checkIfIconIsActive() {
    this.shadowRoot.querySelectorAll("photo-button").forEach(e => {
        if((BASE + e.nav) === router.location.pathname) {
            e.setAttribute("active", true)
        }
    })
    console.log()
  }
}

customElements.define('footer-nav', FooterNav);