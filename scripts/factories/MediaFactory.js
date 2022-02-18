export default class MediaFactory {
  constructor(data) {
    this.title = data.title;
    this.id = data.id;
    this.photographerId = data.photographerId;
    this.likes = data.likes;
    this.date = data.date;
    this.price = data.price;
    this.isLiked = false;
  }

  render() {
    return this.mediaTemplate();
  }

  toggleLike() {
    if (this.isLiked) {
      this.isLiked = false;
      this.likes--;
    } else {
      this.isLiked = true;
      this.likes++;
    }
  }
}

export class MediaPicture extends MediaFactory {
  constructor(data) {
    super(data);
    this.image = data.image;
    this.altText = data.altText;
  }

  mediaTemplate() {
    return /*html*/`
    <article tabindex="0" class="mediaCard" onclick="showLightbox(${this.id})">
      <figure>
        <img src="./assets/images/${this.photographerId}/${this.image}" alt="${this.altText}" class="mediaImage">
        <figcaption>
          <h2>${this.title}</h2>
          <p class="mediaLikes">
            <data class="mediaNumber" id="counter_${this.id}" value="${this.likes}">${this.likes}</data>
            <button class=" far fa-heart heartIcon" onclick="manageLike(${this.id}, event)" tabindex="0" aria-label="aimer la photo ${this.title}"></button>
          </p>
        </figcaption>
      </figure>
    </article>
    `;
  }
}

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
              <span class=" far fa-heart heartIcon" role="button"  onclick="manageLike(${this.id}, event)" tabindex="0" aria-label="aimer la vidéo"></span>
            </p>
          </figcaption>
      </figure>
    </article>
    `;
  }
}