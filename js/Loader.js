export default class Loader {
  constructor(holder) {
    this._holder = holder;
    this._LoaderHtml = this.LoaderHtml();
  }

  LoaderHtml() {
    this._holder.insertAdjacentHTML(
      "beforeend",
      `
          <p class="loader"></p>
          `
    );
    return this._holder.querySelector("p");
  }

  show() {
    this._LoaderHtml.style.display = "block";
  }
  hide() {
    this._LoaderHtml.style.display = "none";
  }
}
