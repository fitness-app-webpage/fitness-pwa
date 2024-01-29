import { LitElement, html, css } from "lit";
import '../components/input/inputField';
import '../components/page/page';
import '../components/button/Button';
import '../components/forms/register-form'
import '../components/error/errorMessage';
import {Router} from "@vaadin/router";
import {BASE} from "../../app"

export default class Register extends LitElement {
  static get properties() {
    return{
        _registerData: {type: Object, state: true}
    }
  };

  constructor() {
    super();
    this._registerData = {};
  }

  static get styles(){ 
    return css`
        .container {
            display: flex;
            flex-direction: column;
            margin: 100px auto auto auto;
            background-color: white;
            width: 360px;
            overflow: hidden;
        }
        h1 {
          text-align: center;
        }
  
        @media only screen and (max-width: 480px) {
            h1 {
                font-size: 24px;
                margin-bottom: 0;
            }
    }
    `;
  }

  onBeforeLeave(location) {
    location.route.data = {register: this._registerData};
  }

  render() {
    return html`
      <page-div ?noHeader=${true}>
        <div class="container">
            <h1>Register</h1>
            <register-form @next="${this.handleNext}"></register-form>
        </div>
      </page-div> 
  `;
  }
  handleNext(e) {
    this._registerData = e.detail
    Router.go(`${BASE}/register/personal-info`)
  }
}

customElements.define('register-div', Register);