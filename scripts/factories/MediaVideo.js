import MediaFactory from "./MediaFactory.js";

export class MediaVideo extends MediaFactory {
  constructor(data) {
    super(data);
    this.video = data.video;
  }

  mediaTemplate() {
    return /*html*/`
    <article tabindex="0" class="mediaCard" onclick="showLightbox(${this.id})">
      <figure>
        <video class="mediaVideo" src="./assets/images/${this.photographerId}/${this.video}" tabindex="-1"></video>
          <figcaption>
            <h2>${this.title}</h2>
            <p class="mediaLikes">
              <data class="mediaNumber" id="counter_${this.id}" value="${this.likes}">${this.likes}</data>
              <span class=" far fa-heart heartIcon" role="button"  onclick="manageLike(${this.id}, event)" tabindex="0" aria-label="aimer la vidéo ${this.title}"></span>
            </p>
          </figcaption>
      </figure>
    </article>
    `;
  }
}