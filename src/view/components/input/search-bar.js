import { LitElement, html, css } from "lit";

export default class SearchBar extends LitElement{
  
  static get properties() {
    return{
      value: {type: String, reflect: true},
      name: {type: String, reflect: true},
      label: {type: String},
      type: {type: String},
      ariaLabel: {type: String},
    }
  };

  constructor() {
    super();
    this.value = "";
    this.name = "";
    this.label = "";
    this.type = "text";
    this.ariaLabel = "";
  }

  
  static get styles(){ 
    return css`
        .background-div {
            width: calc(100vw - 80px);
            margin: 0 20px;
        }
        input {
            width: 100%;
        }
    `
    }


  render() {
    return html`
    <div class="background-div">
        <label for="${this.name}"></label>
        <input 
        type="text"
        name=${this.name} 
        id=${this.name} 
        .value="${this.value}" 
        aria-label=${this.ariaLabel}
        @input="${this.updateValue}" 
        />
    </div>`;
  }

  updateValue(e) {
    this.value = e.target.value;
    this.dispatchEvent(new CustomEvent('input-changed', {[e.target.name]: e.target.value}));
  }
}
customElements.define('search-bar', SearchBar);