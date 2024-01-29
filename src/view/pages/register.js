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
        .container {
            display: flex;
            flex-direction: column;
            margin: 100px auto auto auto;
            background-color: white;
            width: 360px;
        }
    `;
  }

  render() {
    return html`
      <page-div ?noHeader=${true}>
        <div class="container">
            <register-form></register-form>
        </div>
      </page-div> 
  `;
  }
}

customElements.define('register-div', Register);