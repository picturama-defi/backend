"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = __importDefault(require("express"));
var db_1 = require("./service/db");
var routes_1 = require("./service/routes");
var cors = require("cors");
exports.app = (0, express_1.default)();
exports.app.use(cors());
exports.app.listen(8080, function () {
    console.log("Connected to server");
    (0, db_1.connectToDB)();
    (0, routes_1.addRoutes)(exports.app);
});
