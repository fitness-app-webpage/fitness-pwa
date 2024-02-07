import { LitElement, html, css } from "lit";
import '../components/page/page';
import '../components/forms/register-form'
import '../components/forms/userInfo-form'
import '../components/forms/userInfo2-form'
import '../components/forms/goal-form'
import '../components/forms/user-form'
import '../components/forms/activity-form'
import { register, login, setPersonalInfo } from "../../service/ApiService";
import {Router} from "@vaadin/router";
import {BASE} from "../../app"

export default class Register extends LitElement {
  static get properties() {
    return{
        _registerData: {type: Object, state: true},
        _stepCounter: {type: Number, state: true}
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
      html`<user-form @login=${this.handleLogin} @next=${this.handleNext}></user-form>`,
      html`<userinfo-form @back=${this.handleBack} @next=${this.handleNext}></userinfo-form>`,
      html`<activity-form @back=${this.handleBack} @next=${this.handleNext}></activity-form>`,
      html`<goal-form @back=${this.handleBack} @next=${this.handleNext}></goal-form>`,
      html`<userinfo2-form @back=${this.handleBack} @next=${this.handleNext}></userinfo2-form>`,
      html`<register-form @back=${this.handleBack} @submit=${this.handleSubmit}></register-form>`
    ]
    this._stepCounter = 0;
  }

  static get styles(){ 
    return css`
        .container {
            display: flex;
            flex-direction: column;
            margin: 50px auto auto auto;
            background-color: white;
            width: 360px;
            padding: 0 20px;
            overflow: hidden;
            /* border-radius: 10px; */
        }
        .div-container {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          
        }
        h1 {
          text-align: center;
        }
   
        .loading-bar, .loading-color {
          height: 10px;
          background-color: lightgray;
          border-radius: 10px;
          width: 100%;
        }
        .loading-color {
          position: relative;
          background-color: #4056f4;
          transition: 0.4s linear 0s;
          transform-origin: left center;
        }
        .form-container {
          margin-top: 50px;
          width: 100%;
        }
        @media only screen and (max-width: 480px) {
            h1 {
                font-size: 24px;
                margin-bottom: 0;
            }
            .container {
              padding: 0;
              width: 100vw;
            }
            .loading-bar, .loading-color {
              border-radius: 0;
            } 
            .form-container div{
              padding: 0 27px;
              
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
          <div class="div-container">
            <div class="loading-bar">
              <div class="loading-color" style="width: ${((this._stepCounter + 1) / (this._formsArray.length + 1)) * 100}%;"></div>
            </div>
            <div class="form-container">
              <div>
              ${this._formsArray[this._stepCounter]}
              </div>
            </div>
          </div>
        </div>
      </page-div> 
  `;
  }
  handleNext(e) {
    this._formsArray[this._stepCounter] = e.target;
    this._changeObjectValue(e.detail)
    this._next();
  }
  handleBack() {
    this._back();
  }

  handleSubmit(e) {
    this.shadowRoot.querySelector(".loading-color").style = "width: 100%;"    
    this._changeObjectValue(e.detail);
    this._handleRegister();
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
  _handleRegister() {
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
}

customElements.define('register-div', Register);