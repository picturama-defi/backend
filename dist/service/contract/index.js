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
var config_1 = __importDefault(require("../../config"));
var artifact_json_1 = __importDefault(require("./artifact.json"));
require("dotenv").config();
var ethers_1 = require("ethers");
var rpcUrl = config_1.default.networks.ganache;
var provider = new ethers_1.ethers.providers.JsonRpcProvider(rpcUrl);
var ownerPrivateKey = process.env.PRIVATE_KEY;
//@ts-ignore
// const contract = new web3.eth.Contract(Abi.abi, config.contract_address);
var ramaContract = new ethers_1.ethers.Contract(config_1.default.contract_address, artifact_json_1.default.abi, provider);
//@ts-ignore
var wallet = new ethers_1.ethers.Wallet(ownerPrivateKey, provider);
var addFilm = function (publicKey, targetFund, id) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(ownerPrivateKey && publicKey && targetFund)) return [3 /*break*/, 2];
                return [4 /*yield*/, ramaContract
                        .connect(wallet)
                        .addFilm(publicKey, 1000, ethers_1.ethers.utils.formatBytes32String(id))];
            case 1:
                _a.sent();
                return [2 /*return*/, true];
            case 2: return [2 /*return*/, false];
        }
    });
}); };
var getFundedFilms = function () { return __awaiter(void 0, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ramaContract.getAllProjects()];
            case 1:
                res = _a.sent();
                return [2 /*return*/, res.map(function (item) {
                        return ethers_1.ethers.utils.parseBytes32String(item.toString().split(",")[2]);
                    })];
        }
    });
}); };
exports.default = {
    addFilm: addFilm,
    getFundedFilms: getFundedFilms,
};
