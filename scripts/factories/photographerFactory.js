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

  getCard() {
    return this.cardTemplate();
  }

  cardTemplate() {
    return /*html*/`
      <article class="photographerCard" onclick="changePage(['photographer', ${this.id}])" role="link" tabindex="0">
        <img src="${this.picture}" alt="">
        <h2>${this.name}</h2>
        <section class="descriptionFieldArea">
          <p class="locationField">
            ${this.city}, ${this.country}
          </p>
          <p class="TagLineField">
            ${this.tagline}
          </p>
          <data class="priceField" value="${this.price}">
            ${this.price}€/jour
          </data>
        </section>
      </article>
    `;
  }
}