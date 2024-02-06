import { LitElement, html, css } from "lit";
import {login} from "../../service/ApiService";
import '../components/input/input-field';
import '../components/page/page';
import '../components/button/Button';
import '../components/error/errorMessage';
import {Router} from "@vaadin/router";
import {BASE} from "../../app"

export default class LoginDiv extends LitElement {
  static get properties() {
    return{
      loginData: {type: Object},
      disabled: {reflect: true, type: Boolean}
    }
  };

  constructor() {
    super();
    this.loginData = {};
    this.disabled = true;
  }

  static get styles(){ 
    return css`
      h1{
        margin: 0 0 20px 0;
        text-align: center;
      }
      .login-div {
        display: flex;
        flex-direction: column;
        margin: 200px auto auto auto;
        background-color: white;
        width: 360px;
        /* padding: 30px 50px 50px 50px; */
        /* border-radius: 10px; */
      }
      .other-links {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      hr {
        margin: 100px 0 0 0;
      }
      a {
        font-weight: bold;
        opacity: 0.85;
        text-decoration: none;
        color: black;
      }
      a:link, a:visited {
        color: black;
      }
      
      @media only screen and (max-width: 480px) {
        h1 {
            font-size: 24px;
            margin-bottom: 0;
        }
      }`;
  }

  render() {
    return html`
      <page-div ?noHeader=${true}>
        <div class="main-div">
          <div class="login-div" @keyup=${this.enterKeyPressed}>
            <h1>Login</h1>
            <input-field type="email" name="email" @input-changed="${this.listenerInput}" class="email-input" label="Email"></input-field>
            <input-field type="password" name="password" @input-changed="${this.listenerInput}" class="pass-input" label="Password"></input-field>
            <error-message></error-message>
            <button-div @click="${this._login}" value="Login" ?disabled=${this.disabled}></button-div>
          </div>
          <div class="other-links">
            <hr>
            <a href=${BASE + "/register"}>or register here</a>
          </div>
        </div>
      </page-div> 
  `;
  }

  enterKeyPressed(e) {
    if(e.key === "Enter" || e.keyCode === 13) {
      this._login();
    }
  }
  _login() {
      if(this.inputFieldsAreEmpty()) {
        login(this.loginData)
          .then(response => {
            Router.go(`${BASE}/home`);
          })
          .catch(error => {
          this.shadowRoot.querySelector("error-message").message = error.message;
      });
     }
  }
  listenerInput(e) {
    this.loginData[e.target.name] = e.target.value;

    this.shadowRoot.querySelector("error-message").message = "";
    
    this.disabled = !this.inputFieldsAreEmpty();
  }

  inputFieldsAreEmpty() {
    return this.shadowRoot.querySelector(".email-input").value !== "" 
    && this.shadowRoot.querySelector(".pass-input").value !== "";
  }
  
}

customElements.define('login-div', LoginDiv);