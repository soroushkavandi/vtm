export default class ListItem {
  constructor(article, holder) {
    this._article = article;
    this._holder = holder;
    this._listItemHtml = this.generateHtml();
    console.log(this.article);
  }
  generateHtml() {
    this._holder.insertAdjacentHTML(
      "beforeend",
      `
            <div class="listitem">
            <img class="list__item__image" src="${
              this._article.image.thumb
            }" alt=""/>
                <h2>${this._article.title}</h2>, ${
        this._article.created.formatted
      }
            </div>
      `
    );
    return [...this._holder.querySelectorAll(".listitem")].reverse()[0];
  }
  getVideo() {
    axios
      .get(
        `https://nieuws.vtm.be/feed/articles?type=video&fields=video&count= ${
          this._nrOfArticles
        }&from=${this._pageNr}`
      )
      .then(result => {
        console.log(result);
        const htmlToShowInLightbox = `
            <video controls>
                <source src="${
                  result.data.response.items[0].video.url.default
                }" type="video/mp4">
            </video>
        `;
        console.log("1. " + result.data.response.items.url);

        this._instance = basicLightbox.create(htmlToShowInLightbox);
        this._instance.show();
        console.log("2. " + this._instance);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
}
