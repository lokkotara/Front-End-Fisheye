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
    // this.orderObjectList = [
    //   {Popularité   : "Popularité"},
    //   {Date         : "Date"},
    //   {Titre        : "Titre"}
    // ];
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
          <ul class="filterListContainer">
            <li onclick="sortBy('${this.orderList[0]}')">${this.orderList[0]}</li>
            <li onclick="sortBy('${this.orderList[1]}')">${this.orderList[1]}</li>
            <li onclick="sortBy('${this.orderList[2]}')">${this.orderList[2]}</li>
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
            <li>${this.orderList[0]}</li>
          </ul>
          <i class="fa fa-chevron-down filterChevron" aria-hidden="true" onclick="toggleFilter()"></i>
        </div>
      </div>
    `;
  }

  toggle() {
    this.isOpened = !this.isOpened;
  }

  sortFilterBy(type) {
    const data = this.medias.slice();
    if (!type) {
      this.sortedData = data;
      return;
    }
    this.sortedData = data.sort((a, b) => {
      switch (type) {
        case "Popularité":
          return compare(a.likes, b.likes);
        case "Date":
          return compare(a.date, b.date);
        case "Titre":
          return compare(a.title, b.title);
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

function compare(a, b) {
  return (a < b ? -1 : 1);
}