import { LitElement, html, css } from "lit";
import '../components/page/page';
import '../components/forms/userInfo-form'
import {Router} from "@vaadin/router";
import {BASE, router} from "../../app"

export default class RegisterUserInfo extends LitElement {
  static get properties() {
    return{
      _registerData: {type: Object},
    }
  };

  constructor() {
    super();
    this._registerData = {};
    this._personalData = {};
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
  onBeforeEnter(location, commands) {
    if(location.route.data === undefined || location.route.data === null) {
      return commands.redirect(`${BASE}/register`)
    }
    this._registerData = location.route.data.register;

  }
  onBeforeLeave(location) {
    location.route.data = {register: this._registerData, userInfo: this._personalData};
  }

  render() {
    return html`
      <page-div ?noHeader=${true}>
        <div class="container">
            <h1>Personal info</h1>
            <userinfo-form @next=${this.handleNext} @back=${this.handleBack}></userinfo-form>
        </div>
      </page-div> 
  `;
  }
  handleNext(e) {
    this._personalData = e.detail;
    Router.go(`${BASE}/register/goal`)
  }
  handleBack(e) {
    Router.go(`${BASE}/register`)
  }
}

customElements.define('register-userinfo', RegisterUserInfo);