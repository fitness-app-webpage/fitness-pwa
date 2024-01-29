import { LitElement, html, css } from "lit";
import '../components/input/inputField';
import '../components/page/page';
import '../components/button/Button';
import '../components/forms/register-form'
import '../components/error/errorMessage';
import '../components/forms/userInfo-form'
import '../components/forms/goal-form'
import {Router} from "@vaadin/router";
import {BASE, router} from "../../app"

export default class RegisterGoal extends LitElement {
  static get properties() {
    return{
      _registerData: {type: Object},
      _personalData: {type: Object},
    }
  };

  constructor() {
    super();
    this._registerData = {};
    this._personalData = {};
    this._goalData = {};
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
    this._personalData = location.route.data.userInfo;
  }

  render() {
    return html`
      <page-div ?noHeader=${true}>
        <div class="container">
            <h1>Goal</h1>
            <goal-form @back=${this.handleBack} @submit=${this.handleSubmit}></goal-form>
        </div>
      </page-div> 
  `;
  }
  handleSubmit(e) {
    console.log(router.getRoutes())
    router.getRoutes().map(e => {
      if(e.path === "/register") {
        e.children.map(e => {
          if(e.data !== undefined) {
            delete e.data;
          }
        })
      }
      return e;
    })
    console.log(router.getRoutes())

    Router.go(`${BASE}/login`)
  }
  handleBack(e) {
    Router.go(`${BASE}/register/personal-info`)
  }
}

customElements.define('register-goal', RegisterGoal);