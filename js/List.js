import axios from "axios";
import ListItem from "./ListItem";
import Pagination from "./Pagination";
import Loader from "./Loader";

export default class List {
  constructor(nrOfArticles, holder) {
    this._nrOfArticles = nrOfArticles;
    this._pageNr = 0;
    this._holder = holder;
    this._listHtml = this.generateHtml();
    this._loader = new Loader(this._holder);
    this._pagination = new Pagination(this._holder, this);
    this.loadData();
  }

  // prevFnx(evt) {
  //   evt.preventDefault();
  //   if (this._pageNr > 1) {
  //     this._pageNr -= 5;
  //     this.loadData();
  //   }
  // }

  // nextFnx(evt) {
  //   evt.preventDefault();
  //   this._pageNr += 5;
  //   this.loadData();
  // }

  generateHtml() {
    this._holder.insertAdjacentHTML(
      "beforeend",
      `
            <div class="list">
            </div>
            `
    );
    return this._holder.querySelector(".list");
  }

  loadData() {
    this._listHtml.innerHTML = "";
    this._loader.show();
    axios
      .get(
        `https://nieuws.vtm.be/feed/articles?type=video&count=${
          this._nrOfArticles
        }&from=${this._pageNr}`
      )
      .then(result => {
        this.addChildren(result.data.response.items);
      });
  }
  // getNext() {
  //   this._pageNr++;
  //   this.loadData();
  // }
  addChildren(articles) {
    articles.forEach(article => {
      new ListItem(article, this._listHtml);
    });

    this._loader.hide();
  }
}
