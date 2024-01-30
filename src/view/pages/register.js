import { LitElement, html, css } from "lit";
import '../components/page/page';
import '../components/forms/register-form'
import '../components/forms/userInfo-form'
import '../components/forms/goal-form'
import { register, login, setPersonalInfo } from "../../service/ApiService";
import {Router} from "@vaadin/router";
import {BASE} from "../../app"

export default class Register extends LitElement {
  static get properties() {
    return{
        _registerData: {type: Object, state: true},
    }
  };

  constructor() {
    super();
    this._registerData = {
      register: {
        username: "",
        email: "",
        password: "",
        firstName: "",
        lastName: ""
      },
      personalInfo: {
        weight: "",
        height: "",
        birthday: "",
        sex: "",
        activityLevel: "",
        goal: "",
        protein: ""
      }
    };
    this._formsArray = [
      html`<userinfo-form @login=${this.handleLogin} @next=${this.handleNext}></userinfo-form>`,
      html`<goal-form @back=${this.handleBack} @next=${this.handleNext}></goal-form>`,
      html`<register-form @back=${this.handleBack} @submit=${this.handleSubmit}></register-form>`
    ]
    this._stepCounter = 0;
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
            <p>${this._stepCounter + 1} / ${this._formsArray.length}</p>
            ${this._formsArray[this._stepCounter]}
        </div>
      </page-div> 
  `;
  }
  handleNext(e) {
    this._formsArray[this._stepCounter] = e.target;
    this._changeObjectValue(e.detail)
    this._next();
    this.requestUpdate();
  }
  handleBack() {
    this._back();
    this.requestUpdate();
  }

  handleSubmit(e) {
    this._changeObjectValue(e.detail);
    register(this._registerData.register)
      .then(response => {
        if(response.ok) {
          const auth = {email: this._registerData.register.email, password: this._registerData.register.password}
          login(auth).then(e => {
            setPersonalInfo(this._registerData.personalInfo)
              .then(e => {
                Router.go(`${BASE}/home`)
              }).catch(error => {
                console.log(error)
              })
          }).catch(error => {
            console.log(error)
          })
        }
      })
  }

  handleLogin() {
    Router.go(`${BASE}/login`)
  }

  _next() {
    if(this._stepCounter >= this._formsArray.length - 1) return;
    this._stepCounter += 1;
  }

  _back() {
    if(this._stepCounter <= 0) return;
    this._stepCounter -= 1;
  }
  _changeObjectValue(data) {
    Object.keys(this._registerData).map(e => {
      Object.keys(this._registerData[e]).map(i => {
        if(data[i]) {
          this._registerData[e][i] = data[i]
        }
      })
    })
  }
}

customElements.define('register-div', Register);