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
  createCard() {
    const article = document.createElement( "article" );
    const img = document.createElement( "img" );
    img.setAttribute("src", this.picture);
    const h2 = document.createElement( "h2" );
    h2.textContent = this.name;
    article.appendChild(img);
    article.appendChild(h2);
    return (article);
  }
}