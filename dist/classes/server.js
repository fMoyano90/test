"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
class Server {
    constructor() {
        this.port = 3010;
        this.app = express_1.default();
    }
    start(callback) {
        this.app.listen(3010, function () {
            console.log("Servidor corriendo en el puerto 3010");
        });
    }
}
exports.default = Server;
