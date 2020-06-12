import Server from "./classes/server";
import News from "./classes/news";
import mongoose from "mongoose";
import bodyParser from "body-parser";

//RUTAS
import newRoutes from "./routes/new";

const server = new Server();

// CONFIGURAR CABECERAS Y CORS
server.app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, x-token, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

// BODY PARSER
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());

// RUTAS API
server.app.use("/news", newRoutes);

// CONECTAR A MONGO
mongoose.connect(
  "mongodb://localhost:27017/demoDB",
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
  (err) => {
    if (err) throw err;
    console.log("Base de datos: \x1b[32m%s\x1b[0m", "online");
  }
);

// LEVANTAR EXPRESS
server.start(() => {
  console.log(`Servidor corriendo en puerto ${server.port}`);
});

// CONSULTAR API DE NOTICIAS Y GUARDARLAS CADA 1 HORA
var Agenda = require("agenda");
var mongoConnectionString = "localhost:27017/demoDB";

var agenda = new Agenda({ db: { address: mongoConnectionString } });

agenda.define("getNews", function () {
  const news = new News();
  news.getNews();

  console.log(
    "Get Hack News. Time: " +
      new Date().getHours() +
      ":" +
      new Date().getMinutes()
  );
});

agenda.on("ready", function () {
  agenda.every("60 minutes", "getNews");
  agenda.start();
});
