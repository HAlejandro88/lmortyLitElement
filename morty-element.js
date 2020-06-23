import { html, LitElement, css } from 'lit-element';
import '@polymer/paper-card/paper-card.js';

class MortyElement extends LitElement {
  static get properties() {
    return {
      url: {type: String},
      character: {type: Number},
      personajes: {type: Array}
    };
  }

  static get styles() {
    return css`
    :host {
      display: block;
    }
      paper-card {
        margin: 8px 5px;
      }
      hr {
        height: 30px;
        background-color: blue;
      }

      .green {
        color: green;
      }
      .red {
        color: red;
      }
    `;
  }

  constructor() {
    super();
    this.url = 'https://rickandmortyapi.com/api/character/';
    this.character = 1;
    this.mortyApi();
  }

  render() {
    return html`
        <h1>morty</h1>
        <h4>${this.character}</h4>
        ${this.personajes.map(personaje => html`<paper-card image="${personaje.image}" alt="Emmental" class="${personaje.status == 'Alive' ? 'green' : 'red'}">
                                                <div class="card-content">
                                                  ${personaje.name}
                                                </div>
                                                <div class="card-actions">
                                                  <label>species: ${personaje.species}</label>
                                                  <label>status: ${personaje.status}</label>
                                                </div>
                                              </paper-card>
                                              `)}
        <hr>
        <paper-card>
        </paper-card>
        <button @click="${this.addCharacter}">plos</button>
      `;
    }
    
    async mortyApi() {
      const api = await fetch(this.url);
      const data = await api.json();
      this.personajes = data.results;
      console.log(this.personajes);
      return this.personajes;
    }

    addCharacter(e) {
      this.character++;
      let event = new CustomEvent('add-character',{
        detail: this.character,
        bubbles: true,
        composed: true
      });
      this.dispatchEvent(event);
    }
}

window.customElements.define("morty-element", MortyElement);
