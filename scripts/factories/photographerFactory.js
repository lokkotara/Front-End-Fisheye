export default class PhotographerFactory {
  constructor(data) {
    this.name = data.name;
    this.id = data.id;
    this.city = data.city;
    this.country = data.country;
    this.tagline = data.tagline;
    this.price = data.price;
    this.portrait = data.portrait;
    this.picture = `./assets/photographers/${this.portrait}`;
  }

  /**
   * Permet de créer l'affichage de la charset
   *
   * @return   Retourne la carte du photographe
   */
  getCard() {
    return this.cardTemplate();
  }

  cardTemplate() {
    return /*html*/`
      <article>
        <a href="./photographer.html?id=${this.id}">
          <img src="${this.picture}">
          <h2>${this.name}</h2>
        </a>
        <p class="descriptionFieldArea">
          <span class="locationField">
            ${this.city}, ${this.country}
          </span>
          <span class="TagLineField">
            ${this.tagline}
          </span>
          <span class="priceField">
            ${this.price}€/jour
          </span>
        </p>
      </article>
    `;
  }

  getMedias() {
    
  }
}