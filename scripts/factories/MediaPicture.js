import MediaFactory from "./MediaFactory.js";

export class MediaPicture extends MediaFactory {
  constructor(data) {
    super(data);
    this.image = data.image;
    this.altText = data.altText;
  }

  mediaTemplate() {
    return /*html*/`
    <article tabindex="0" aria-label="agrandir le média" class="mediaCard" onclick="showLightbox(${this.id})">
      <figure>
        <img src="./assets/images/${this.photographerId}/${this.image}" alt="${this.altText}" class="mediaImage">
        <figcaption>
          <h2>${this.title}</h2>
          <p class="mediaLikes">
            <data class="mediaNumber" id="counter_${this.id}" value="${this.likes}">${this.likes}</data>
            <span class="far fa-heart heartIcon" role="button" onclick="manageLike(${this.id}, event)" tabindex="0" aria-label="aimer la photo ${this.title}"></span>
          </p>
        </figcaption>
      </figure>
    </article>
    `;
  }
}