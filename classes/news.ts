import { New } from "../models/new.model";

export default class News {
  getNews() {
    const axios = require("axios");
    axios
      .get("https://hn.algolia.com/api/v1/search_by_date?query=nodejs")
      .then((resp: any) => {
        const news = resp.data.hits;
        this.saveNews(news);
      });
  }

  saveNews(noticias: any) {
    for (let noticia of noticias) {
      New.create(noticia)
        .then(async (newDB) => {
          console.log({
            ok: true,
            message: "Noticia nueva agregada",
          });
        })
        .catch((err) => {
          console.log({
            ok: false,
            message: "Noticia duplicada y omitida",
          });
        });
    }
  }
}
