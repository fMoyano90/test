"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./classes/server"));
const news_1 = __importDefault(require("./classes/news"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
//RUTAS
const new_1 = __importDefault(require("./routes/new"));
const server = new server_1.default();
// CONFIGURAR CABECERAS Y CORS
server.app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, x-token, Access-Control-Allow-Request-Method");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});
// BODY PARSER
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
// RUTAS API
server.app.use("/news", new_1.default);
// CONECTAR A MONGO
mongoose_1.default.connect("mongodb://localhost:27017/demoDB", { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err) => {
    if (err)
        throw err;
    console.log("Base de datos: \x1b[32m%s\x1b[0m", "online");
});
// LEVANTAR EXPRESS
server.start(() => {
    console.log(`Servidor corriendo en puerto ${server.port}`);
});
// CONSULTAR API DE NOTICIAS Y GUARDARLAS CADA 1 HORA
var Agenda = require("agenda");
var mongoConnectionString = "localhost:27017/demoDB";
var agenda = new Agenda({ db: { address: mongoConnectionString } });
agenda.define("getNews", function () {
    const news = new news_1.default();
    news.getNews();
    console.log("Get Hack News. Time: " +
        new Date().getHours() +
        ":" +
        new Date().getMinutes());
});
agenda.on("ready", function () {
    agenda.every("60 minutes", "getNews");
    agenda.start();
});
