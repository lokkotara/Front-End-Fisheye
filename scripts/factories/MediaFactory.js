import {exposeElement} from "../utils/tools.js";

export default class MediaFactory {
  constructor(data) {
    this.title = data.title;
    this.id = data.id;
    this.photographerId = data.photographerId;
    this.likes = data.likes;
    this.date = data.date;
    this.price = data.price;
    this.isLiked = false;
    exposeElement("toggleLike", this.toggleLike.bind(this));

  }

  render() {
    return this.mediaTemplate();
  }

  renderLike() {
    return this.likeCount();
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

  likeCount() {
    return this.likes;
  }
}

export class MediaPicture extends MediaFactory {
  constructor(data) {
    super(data);
    this.image = data.image;
    this.altText = data.altText;
  }

  mediaTemplate() {
    return `
    <article>
      <figure>
        <img src="./assets/images/${this.photographerId}/${this.image}" alt="${this.altText}" class="mediaImage">
        <figcaption>
          <span>${this.title}</span>
          <span class="mediaLikes">
            <span class="mediaNumber" id="counter${this.id}">${this.likes}</span>
            <img src="./assets/icons/heart-solid.svg" alt="likes" class="heartIcon" onclick="manageLike(${this.id})">
          </span>
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
    return `
    <article>
      <figure>
        <video class="mediaVideo" src="./assets/images/${this.photographerId}/${this.video}"></video>
          <figcaption>
            <span>${this.title}</span>
            <span class="mediaLikes">
              <span class="mediaNumber">${this.likes}</span>
              <img src="./assets/icons/heart-solid.svg" alt="likes" class="heartIcon" id="${this.id}" onclick="manageLike(${this.id})">
            </span>
          </figcaption>
      </figure>
    </article>
    `;
  }
}