export default class Filter {
  constructor (medias) {
    this.medias = medias;
    this.isOpened = false;
    this.sortedData = medias.slice();
    this.orderList = [
      "Popularité",
      "Date",
      "Titre"
    ];
  }

  render() {
    if (!this.isOpened) return this.templateClosed();
    return this.templateOpened();
  }

  templateOpened() {
    return /*html*/`
      <div class="filterContainer">
        <p>Trier par</p>
        <div class="filter">
          <ul class="filterListContainer">
            <li aria-label="Trier par ${this.orderList[0]}" tabindex="0" role="button" onclick="sortBy('${this.orderList[0]}')">${this.orderList[0]}</li>
            <li aria-label="Trier par ${this.orderList[1]}" tabindex="0" role="button" onclick="sortBy('${this.orderList[1]}')">${this.orderList[1]}</li>
            <li aria-label="Trier par ${this.orderList[2]}" tabindex="0" role="button" onclick="sortBy('${this.orderList[2]}')">${this.orderList[2]}</li>
          </ul>
          <i class="fa fa-chevron-up filterChevron" aria-hidden="true" onclick="toggleFilter()" aria-labelledBy="filterListContainer"></i>
        </div>
      </div>
    `;
  }

  templateClosed() {
    return /*html*/`
      <div class="filterContainer"  aria-label="Filtre de tri des médias">
        <p>Trier par</p>
        <div class="filter">
          <ul tabindex="0" onclick="toggleFilter()">
            <li>${this.orderList[0]}</li>
          </ul>
          <i class="fa fa-chevron-down filterChevron" aria-hidden="true"></i>
        </div>
      </div>
    `;
  }

  toggle() {
    this.isOpened = !this.isOpened;
  }

  sortFilterBy(type) {
    const data = this.medias.slice();
    if (!type) type = "Popularité";
    this.sortedData = data.sort((a, b) => {
      switch (type) {
        case "Popularité":
          return compareDESC(a.likes, b.likes);
        case "Date":
          return compareASC(a.date, b.date);
        case "Titre":
          return compareASC(a.title, b.title);
        default:
          console.error("houston...");
          return 0;
      }
    });
    return this.sortedData;
  }

  updateFilterOrder(type) {
    let HTML;
    this.orderList.forEach(listItem => {
      if (listItem === type) {
        const index = this.orderList.indexOf(listItem);
        this.orderList.splice(index, 1);
        this.orderList.unshift(listItem);
        HTML = this.render();
      }
    });
    return HTML;
  }
}

function compareASC(a, b) {
  return (a < b ? -1 : 1);
}
function compareDESC(a, b) {
  return (a > b ? -1 : 1);
}