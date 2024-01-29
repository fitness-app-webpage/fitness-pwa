import { LitElement, html, css } from "lit";
import '../components/page/page';
import '../components/forms/register-form'
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
        /* .container {
            height: 600px;
            align-items: center;
            position: relative;
            overflow: hidden;
        }
        register-form,
        userinfo-form,
        goal-form {
            width: 280px;
            position: absolute;
            top: 100px;
            left: 40px;
            transition: 0.5s;
        }
        userinfo-form {
            left: 450px;
        }
        goal-form {
            left: 450px;
        } */
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