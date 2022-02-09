export default class Filter {
  constructor (medias) {
    this.medias = medias;
    this.isOpened = false;
  }

  render() {
    if (!this.isOpened) return this.templateClosed();
    return this.templateOpened();
  }

  templateOpened() {
    return `
      <div class="filterContainer">
        <p>Trier par</p>
        <div class="filter">
          <ul class="testo">
            <li onclick="sortBy('Popularity')">Popularité</li>
            <li onclick="sortBy('Date')">Date</li>
            <li onclick="sortBy('Title')">Titre</li>
          </ul>
          <i class="fa fa-chevron-up filterChevron" aria-hidden="true" onclick="toggleFilter()"></i>
        </div>
      </div>
    `;
  }

  templateClosed() {
    return `
      <div class="filterContainer">
        <p>Trier par</p>
        <div class="filter">
          <ul>
            <li>Popularité</li>
          </ul>
          <i class="fa fa-chevron-down filterChevron" aria-hidden="true" onclick="toggleFilter()"></i>
        </div>
      </div>
    `;
  }

  toggle() {
    this.isOpened = !this.isOpened;
  }

  sortByPopularity(medias) {
    console.log("popularité",medias);
  }

  sortByDate(medias) {
    console.log("date",medias);
  }

  sortByTitle(medias) {
    console.log("titre",medias);
  }
}