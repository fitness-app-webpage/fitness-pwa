import { LitElement, html, css } from "lit";
import '../components/input/inputField';
import '../components/page/page';
import '../components/button/Button';
import '../components/forms/register-form'
import '../components/error/errorMessage';
// import {Router} from "@vaadin/router";
// import {BASE} from "../../app"

export default class Register extends LitElement {
  static get properties() {
    return{
      registerData: {type: Object},
    }
  };

  constructor() {
    super();
    this.loginData = {};
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
        <register-form></register-form>
      </page-div> 
  `;
  }
  submitForm() {
    this.shadowRoot.querySelector("form-div").shadowRoot.querySelector("form").requestSubmit();
  }
  
}

customElements.define('register-div', Register);