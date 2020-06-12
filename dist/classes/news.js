"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const new_model_1 = require("../models/new.model");
class News {
    getNews() {
        const axios = require("axios");
        axios
            .get("https://hn.algolia.com/api/v1/search_by_date?query=nodejs")
            .then((resp) => {
            const news = resp.data.hits;
            this.saveNews(news);
        });
    }
    saveNews(noticias) {
        for (let noticia of noticias) {
            new_model_1.New.create(noticia)
                .then((newDB) => __awaiter(this, void 0, void 0, function* () {
                console.log({
                    ok: true,
                    message: "Noticia nueva agregada",
                });
            }))
                .catch((err) => {
                console.log({
                    ok: false,
                    message: "Noticia duplicada y omitida",
                });
            });
        }
    }
}
exports.default = News;
