import { LitElement, html, css } from "lit";
import * as service from "../../service/ApiService";
import '../components/input/inputField';
import '../components/page/page';
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
      /* .body-div{
        display: flex;
        background-color: inherit;
        align-items: center;
        justify-content: center;
        height: 100vh;
      } */
      h1{
        margin: 0 0 20px 0;
        text-align: center;
      }
      .login-div {
        display: flex;
        flex-direction: column;
        margin: 250px auto auto auto;
        background-color: white;
        width: 360px;
        /* padding: 30px 50px 50px 50px; */
        border-radius: 10px;
      }
      input-field {
        --input-field-background-color: #e4dfdf;
        --input-field-border-radius: 30px;
        --box-shadow-color: #e4dfdf;
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
          <div class="login-div" @keyup=${this.enterKeyPressed}>
            <h1>Login</h1>
            <input-field type="email" name="email" @input-changed="${this.listenerInput}" class="email-input" label="Email"></input-field>
            <input-field type="password" name="password" @input-changed="${this.listenerInput}" class="pass-input" label="Password"></input-field>
            <!-- <error-message></error-message> -->
            <!-- <button-div @click="${this._login}" value="Login" ?disabled=${this.disabled}></button-div> -->
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
        service.login(this.loginData)
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