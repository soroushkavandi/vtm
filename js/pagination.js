import * as basicLightbox from "basiclightbox";

export default class Pagination {
  constructor(holder, List) {
    this._list = List;
    // this._prevFnx = prev;
    // this._nextFnx = next;
    this._holder = holder;
    this._pagRef = this.generateHTML();
    this.setUpEvents();
  }
  generateHTML() {
    this._holder.insertAdjacentHTML(
      "beforeend",
      `
                <footer class="page">
                <button class="prev"> << PREVIOUS </button>
                <button class="next"> NEXT >> </button>
                </footer>
                `
    );
    return this._holder.querySelector(".page");
  }
  setUpEvents() {
    console.log(this);
    this._pagRef
      .querySelector(".prev")
      .addEventListener("click", this.prevFnx.bind(this._list));

    this._pagRef
      .querySelector(".next")
      .addEventListener("click", this.nextFnx.bind(this._list));
  }
  prevFnx(evt) {
    evt.preventDefault();
    if (this._pageNr > 1) {
      this._pageNr -= 5;
      this.loadData();
    }
  }

  nextFnx(evt) {
    evt.preventDefault();
    this._pageNr += 5;
    this.loadData();
  }

  getVideo() {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://nieuws.vtm.be/feed/articles?ids=${
          this._article.id
        }&fields=video`
      )
      .then(result => {
        console.log(result);
        const htmlLightBox = `
            <video controls>
                <source src="${
                  result.data.response.items[0].video.url.default
                }" type="video/mp4">
            </video>
        `;
        console.log("1. " + result.data.response.items.url);

        this._instance = basicLightbox.create(basicLightbox);
        this._instance.show();
        console.log("2. " + this._instance);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
}
