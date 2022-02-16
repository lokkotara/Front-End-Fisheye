export default class Lightbox {
  constructor(listMedia, DOMTarget) {
    this.currentMedia = null;
    this.listMedia = listMedia;
    this.DOMTarget = DOMTarget;
  }

  show(id) {
    this.currentMedia = this.getElementById(id);
    if (this.currentMedia.image !== undefined) this.DOMTarget.firstElementChild.innerHTML = this.templatePictureHTML();
    else this.DOMTarget.firstElementChild.innerHTML = this.templateVideoHTML();
    this.DOMTarget.classList.remove("hidden");
  }

  next() {
    const index = this.listMedia.findIndex(media => media.id === this.currentMedia.id);
    if (index === this.listMedia.length - 1) this.currentMedia = this.listMedia[0];
    else this.currentMedia = this.listMedia[index + 1];
    this.show(this.currentMedia.id);
  }

  previous() {
    const index = this.listMedia.findIndex(media => media.id === this.currentMedia.id);
    if (index === 0) this.currentMedia = this.listMedia[this.listMedia.length-1];
    else this.currentMedia = this.listMedia[index - 1];
    this.show(this.currentMedia.id);
  }

  close() {
    this.DOMTarget.classList.toggle("hidden");
  }

  getElementById(id) {
    return this.listMedia.find(elt => elt.id === id);
  }

  templatePictureHTML() {
    return `
      <button class="fa-solid fa-chevron-left" onclick="previous()"></button>
      <figure>
        <img src="./assets/images/${this.currentMedia.photographerId}/${this.currentMedia.image}" alt="${this.currentMedia.altText}">
        <figcaption>
          <p>${this.currentMedia.title}</p>
        </figcaption>
      </figure>
      <button class="fa-solid fa-chevron-right" onclick="next()"></button>
      <i class="fa-solid fa-xmark" onclick="closeLightbox()"></i>
    `;
  }

  templateVideoHTML() {
    return `
      <button class="fa-solid fa-chevron-left" onclick="previous()"></button>
      <figure>
        <video src="./assets/images/${this.currentMedia.photographerId}/${this.currentMedia.video}" controls>
        <figcaption>
          <p>${this.currentMedia.title}</p>
        </figcaption>
      </figure>
      <button class="fa-solid fa-chevron-right" onclick="next()"></button>
      <i class="fa-solid fa-xmark"  onclick="closeLightbox()"></i>
    `;
  }
}