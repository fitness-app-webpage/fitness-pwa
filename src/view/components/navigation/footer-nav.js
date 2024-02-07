import { LitElement, html, css } from "lit";
import '../button/photo-button'
import {router} from "../../../app"

export default class FootreNav extends LitElement {
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
    @media only screen and (max-width: 480px) {
        footer{
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
                    path="M32.8595 14.7043C27.6204 9.92894 18.1065 1.03238 18.0123 0.942028L17 0L15.9924 0.942028C15.8965 1.03071 6.37809 9.92392 1.06327 14.7428C0.386364 15.4021 0 16.324 0 17.2677C0 19.115 1.38473 20.6142 3.09091 20.6142H4.63636V30.6535C4.63636 32.5008 6.02109 34 7.72727 34H13.9091H20.0909C22.5051 34 23.8586 34 26.2727 34C27.9789 34 29.3636 32.5008 29.3636 30.6535V20.6142H30.9091C32.6153 20.6142 34 19.115 34 17.2677C34 16.2671 33.575 15.3251 32.8595 14.7043ZM20.0909 34H13.9091V23.4252H20.0909V34ZM26.2727 17.2677L26.2758 30.6535C26.2727 30.6535 23.1818 30.6535 23.1818 30.6535V20.6142H10.8182V30.6535H7.72727V17.2677H3.08936C7.36255 13.3992 14.3944 6.84852 17 4.41732C19.6056 6.84852 26.6344 13.3975 30.9091 17.2694L26.2727 17.2677Z" fill="black"
                    pathActive="M32.8595 14.7043C27.6204 9.92894 18.1065 1.03238 18.0123 0.942028L17 0L15.9924 0.942028C15.8965 1.03071 6.37809 9.92392 1.06327 14.7428C0.386364 15.4021 0 16.324 0 17.2677C0 19.115 1.38473 20.6142 3.09091 20.6142H4.63636V30.6535C4.63636 32.5008 6.02109 34 7.72727 34H13.9091H20.0909C22.5051 34 23.8586 34 26.2727 34C27.9789 34 29.3636 32.5008 29.3636 30.6535V20.6142H30.9091C32.6153 20.6142 34 19.115 34 17.2677C34 16.2671 33.575 15.3251 32.8595 14.7043ZM20.0909 34H13.9091V23.4252H20.0909V34Z" fill="black"    
                >
                </photo-button>
                <photo-button
                    text="Login"
                    nav="/login" 
                    ?useSvg=${true} 
                    path="M32.8595 14.7043C27.6204 9.92894 18.1065 1.03238 18.0123 0.942028L17 0L15.9924 0.942028C15.8965 1.03071 6.37809 9.92392 1.06327 14.7428C0.386364 15.4021 0 16.324 0 17.2677C0 19.115 1.38473 20.6142 3.09091 20.6142H4.63636V30.6535C4.63636 32.5008 6.02109 34 7.72727 34H13.9091H20.0909C22.5051 34 23.8586 34 26.2727 34C27.9789 34 29.3636 32.5008 29.3636 30.6535V20.6142H30.9091C32.6153 20.6142 34 19.115 34 17.2677C34 16.2671 33.575 15.3251 32.8595 14.7043ZM20.0909 34H13.9091V23.4252H20.0909V34ZM26.2727 17.2677L26.2758 30.6535C26.2727 30.6535 23.1818 30.6535 23.1818 30.6535V20.6142H10.8182V30.6535H7.72727V17.2677H3.08936C7.36255 13.3992 14.3944 6.84852 17 4.41732C19.6056 6.84852 26.6344 13.3975 30.9091 17.2694L26.2727 17.2677Z" fill="black"
                    pathActive="M32.8595 14.7043C27.6204 9.92894 18.1065 1.03238 18.0123 0.942028L17 0L15.9924 0.942028C15.8965 1.03071 6.37809 9.92392 1.06327 14.7428C0.386364 15.4021 0 16.324 0 17.2677C0 19.115 1.38473 20.6142 3.09091 20.6142H4.63636V30.6535C4.63636 32.5008 6.02109 34 7.72727 34H13.9091H20.0909C22.5051 34 23.8586 34 26.2727 34C27.9789 34 29.3636 32.5008 29.3636 30.6535V20.6142H30.9091C32.6153 20.6142 34 19.115 34 17.2677C34 16.2671 33.575 15.3251 32.8595 14.7043ZM20.0909 34H13.9091V23.4252H20.0909V34Z" fill="black"    
                >
                </photo-button>
                <photo-button 
                    text="Login"
                    nav="/login" 
                    ?useSvg=${true} 
                    path="M32.8595 14.7043C27.6204 9.92894 18.1065 1.03238 18.0123 0.942028L17 0L15.9924 0.942028C15.8965 1.03071 6.37809 9.92392 1.06327 14.7428C0.386364 15.4021 0 16.324 0 17.2677C0 19.115 1.38473 20.6142 3.09091 20.6142H4.63636V30.6535C4.63636 32.5008 6.02109 34 7.72727 34H13.9091H20.0909C22.5051 34 23.8586 34 26.2727 34C27.9789 34 29.3636 32.5008 29.3636 30.6535V20.6142H30.9091C32.6153 20.6142 34 19.115 34 17.2677C34 16.2671 33.575 15.3251 32.8595 14.7043ZM20.0909 34H13.9091V23.4252H20.0909V34ZM26.2727 17.2677L26.2758 30.6535C26.2727 30.6535 23.1818 30.6535 23.1818 30.6535V20.6142H10.8182V30.6535H7.72727V17.2677H3.08936C7.36255 13.3992 14.3944 6.84852 17 4.41732C19.6056 6.84852 26.6344 13.3975 30.9091 17.2694L26.2727 17.2677Z" fill="black"
                    pathActive="M32.8595 14.7043C27.6204 9.92894 18.1065 1.03238 18.0123 0.942028L17 0L15.9924 0.942028C15.8965 1.03071 6.37809 9.92392 1.06327 14.7428C0.386364 15.4021 0 16.324 0 17.2677C0 19.115 1.38473 20.6142 3.09091 20.6142H4.63636V30.6535C4.63636 32.5008 6.02109 34 7.72727 34H13.9091H20.0909C22.5051 34 23.8586 34 26.2727 34C27.9789 34 29.3636 32.5008 29.3636 30.6535V20.6142H30.9091C32.6153 20.6142 34 19.115 34 17.2677C34 16.2671 33.575 15.3251 32.8595 14.7043ZM20.0909 34H13.9091V23.4252H20.0909V34Z" fill="black"    
                >
                </photo-button>
                <photo-button 
                    text="Profile"
                    nav="/profile" 
                    ?useSvg=${true} 
                    path="M32.8595 14.7043C27.6204 9.92894 18.1065 1.03238 18.0123 0.942028L17 0L15.9924 0.942028C15.8965 1.03071 6.37809 9.92392 1.06327 14.7428C0.386364 15.4021 0 16.324 0 17.2677C0 19.115 1.38473 20.6142 3.09091 20.6142H4.63636V30.6535C4.63636 32.5008 6.02109 34 7.72727 34H13.9091H20.0909C22.5051 34 23.8586 34 26.2727 34C27.9789 34 29.3636 32.5008 29.3636 30.6535V20.6142H30.9091C32.6153 20.6142 34 19.115 34 17.2677C34 16.2671 33.575 15.3251 32.8595 14.7043ZM20.0909 34H13.9091V23.4252H20.0909V34ZM26.2727 17.2677L26.2758 30.6535C26.2727 30.6535 23.1818 30.6535 23.1818 30.6535V20.6142H10.8182V30.6535H7.72727V17.2677H3.08936C7.36255 13.3992 14.3944 6.84852 17 4.41732C19.6056 6.84852 26.6344 13.3975 30.9091 17.2694L26.2727 17.2677Z" fill="black"
                    pathActive="M32.8595 14.7043C27.6204 9.92894 18.1065 1.03238 18.0123 0.942028L17 0L15.9924 0.942028C15.8965 1.03071 6.37809 9.92392 1.06327 14.7428C0.386364 15.4021 0 16.324 0 17.2677C0 19.115 1.38473 20.6142 3.09091 20.6142H4.63636V30.6535C4.63636 32.5008 6.02109 34 7.72727 34H13.9091H20.0909C22.5051 34 23.8586 34 26.2727 34C27.9789 34 29.3636 32.5008 29.3636 30.6535V20.6142H30.9091C32.6153 20.6142 34 19.115 34 17.2677C34 16.2671 33.575 15.3251 32.8595 14.7043ZM20.0909 34H13.9091V23.4252H20.0909V34Z" fill="black"    
                >
                </photo-button>
            </nav>
          </footer>
  `;
  }
  handleClick(e) {
    console.log(e.target)
  }
  _checkIfIconIsActive() {
    this.shadowRoot.querySelectorAll("photo-button").forEach(e => {
        if(e.nav === router.location.pathname) {
            e.setAttribute("active", true)
        }
    })
    console.log()
  }
}

customElements.define('footer-nav', FootreNav);