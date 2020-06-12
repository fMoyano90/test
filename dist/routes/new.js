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
const express_1 = require("express");
const new_model_1 = require("../models/new.model");
const newRoutes = express_1.Router();
// OBTENER NOTICIAS
newRoutes.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const news = yield new_model_1.New.find({ status: "ENABLED" }).sort({ created_at: -1 });
    res.json({
        ok: true,
        news,
    });
}));
// EDITAR ESTADO PARA BORRAR DE VISTA (STATUS)
newRoutes.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    let body = req.body;
    new_model_1.New.findByIdAndDelete(id, body)
        .then((newDB) => __awaiter(void 0, void 0, void 0, function* () {
        res.json({
            ok: true,
            new: newDB,
        });
    }))
        .catch((err) => {
        res.json(err);
    });
}));
exports.default = newRoutes;
