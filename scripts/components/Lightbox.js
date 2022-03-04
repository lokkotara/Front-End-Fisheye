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
    return /*html*/`
      <div class="colLightbox">
        <span class="fa-solid fa-chevron-left lightboxIcon" onclick="previous()" tabindex="1"></span>
      </div>
      <figure>
        <img src="./assets/images/${this.currentMedia.photographerId}/${this.currentMedia.image}" alt="${this.currentMedia.altText}">
        <figcaption class="lightboxTitle">
          <p>${this.currentMedia.title}</p>
        </figcaption>
      </figure>
      <div class="colLightbox">
        <span class="fa-solid fa-chevron-right lightboxIcon" onclick="next()" tabindex="1"></span>
      </div>
      <span class="fa-solid fa-xmark lightboxIcon lightboxClose"  onclick="closeLightbox()" tabindex="1"></span>
    `;
  }

  templateVideoHTML() {
    return /*html */`
      <div class="colLightbox">
        <span class="fa-solid fa-chevron-left navChevron lightboxIcon" onclick="previous()" tabindex="1"></span>
      </div>
      <figure>
        <video id="videoLightbox" src="./assets/images/${this.currentMedia.photographerId}/${this.currentMedia.video}" controls tabindex="1"></video>
        <figcaption class="lightboxTitle">
          <p>${this.currentMedia.title}</p>
        </figcaption>
      </figure>
      <div class="colLightbox colLightboxRight">
        <span class="fa-solid fa-chevron-right lightboxIcon" onclick="next()" tabindex="1"></span>
      </div>
      <span class="fa-solid fa-xmark lightboxIcon lightboxClose"  onclick="closeLightbox()" tabindex="1"></span>
    `;
  }

  /**
   * Permet de garder la navigation au clavier (tab et shift+tab) à l'intérieur de la lightBox.
   * Lorsque le focus est sur le dernier élément de la lightbox, on met le focus sur le premier élément
   * Lorsque le focus est sur le premier élément de la lightbox et qu'on fait shift+tab, on met le focus sur le dernier élément
   */
  manageLightboxNav() {
    const  focusableElements = "button, input, textarea, [tabindex]:not([tabindex=\"-1\"])";
    const modal = document.querySelector(".lightbox");
    const focusableContent = modal.querySelectorAll(focusableElements);
    const firstFocusableElement = focusableContent[0];
    const secondFocusableElement = focusableContent[1];
    const lastFocusableElement = focusableContent[focusableContent.length - 1];

    document.addEventListener("keydown", e => {
      const isTabPressed = e.key === "Tab";
      if (!isTabPressed) {
        return;
      }
      if (e.shiftKey) {
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusableElement) {
          firstFocusableElement.focus();
          e.preventDefault();
        }
      }
    });
    secondFocusableElement.focus();
  }
}