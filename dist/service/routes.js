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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addRoutes = void 0;
var express_1 = __importDefault(require("express"));
var film_1 = __importDefault(require("./film"));
var bodyParser = require("body-parser");
var router = express_1.default.Router();
var status_1 = __importDefault(require("./status"));
var contract_1 = __importDefault(require("./contract"));
require("dotenv").config();
var PASS_PHRASE = process.env.PASS_PHRASE;
var addRoutes = function (app) {
    router.post("/add/film", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (req.body.passPhrase !== PASS_PHRASE) {
                        res.send(status_1.default.FAILED);
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, film_1.default.add(req.body)];
                case 1:
                    result = _a.sent();
                    if (result) {
                        res.send(status_1.default.OK);
                    }
                    else {
                        res.send(status_1.default.FAILED);
                    }
                    return [2 /*return*/];
            }
        });
    }); });
    app.get("/films", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var allFilms;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, film_1.default.getAll()];
                case 1:
                    allFilms = _a.sent();
                    if (allFilms) {
                        res.send(allFilms);
                    }
                    else {
                        res.send(status_1.default.FAILED);
                    }
                    return [2 /*return*/];
            }
        });
    }); });
    app.get("/film", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id, film;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.body.query.id;
                    return [4 /*yield*/, film_1.default.findOne(id)];
                case 1:
                    film = _a.sent();
                    if (film) {
                        res.send(film);
                    }
                    else {
                        res.send(status_1.default.FAILED);
                    }
                    res.send("Hello");
                    return [2 /*return*/];
            }
        });
    }); });
    router.post("/approve-film", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, id, publicKey, film;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, id = _a.id, publicKey = _a.publicKey;
                    return [4 /*yield*/, film_1.default.findOne(id)];
                case 1:
                    film = _b.sent();
                    if (!film) return [3 /*break*/, 4];
                    console.log("Approving film " + id);
                    //@ts-ignore
                    return [4 /*yield*/, contract_1.default.addFilm(publicKey, film.targetFund, id)];
                case 2:
                    //@ts-ignore
                    _b.sent();
                    return [4 /*yield*/, film_1.default.setIsFunded(id, true)];
                case 3:
                    _b.sent();
                    res.send(status_1.default.OK);
                    return [3 /*break*/, 5];
                case 4:
                    res.send(status_1.default.FAILED);
                    _b.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    }); });
    app.get("/", function (req, res) {
        res.send("Server running");
    });
    app.get("/funded-films", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var fundedFilms;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, film_1.default.getFundedFilms()];
                case 1:
                    fundedFilms = _a.sent();
                    if (fundedFilms) {
                        res.send(fundedFilms);
                    }
                    else {
                        res.send(status_1.default.FAILED);
                    }
                    return [2 /*return*/];
            }
        });
    }); });
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use("/", router);
};
exports.addRoutes = addRoutes;
