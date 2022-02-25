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