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
    <article tabindex="0" class="mediaCard">
      <figure>
        <img src="./assets/images/${this.photographerId}/${this.image}" alt="${this.altText}" class="mediaImage">
        <figcaption>
          <h2>${this.title}</h2>
          <p class="mediaLikes">
            <data class="mediaNumber" id="counter_${this.id}" value="${this.likes}">${this.likes}</data>
            <span class=" far fa-heart heartIcon" onclick="manageLike(${this.id})" tabindex="0"></span>
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
    <article tabindex="0" class="mediaCard">
      <figure>
        <video class="mediaVideo" src="./assets/images/${this.photographerId}/${this.video}"></video>
          <figcaption>
            <h2>${this.title}</h2>
            <p class="mediaLikes">
              <data class="mediaNumber" id="counter_${this.id}" value="${this.likes}">${this.likes}</data>
              <span class=" far fa-heart heartIcon" onclick="manageLike(${this.id})" tabindex="0"></span>
            </p>
          </figcaption>
      </figure>
    </article>
    `;
  }
}