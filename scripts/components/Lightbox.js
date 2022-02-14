export default class Lightbox {
  constructor(listMedia) {
    this.currentMedia = null;
    this.listMedia = listMedia;
  }

  show(media) {
    this.currentMedia = media;
    console.log(this);
  }

  next() {

  }

  previous() {

  }

  manageEvents() {

  }
}