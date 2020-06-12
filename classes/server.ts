import express from "express";

export default class Server {
  public app: express.Application;
  public port: number = 3010;

  constructor() {
    this.app = express();
  }

  start(callback: Function) {
    this.app.listen(3010, function () {
      console.log("Servidor corriendo en el puerto 3010");
    });
  }
}
