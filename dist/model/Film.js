"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilmSchema = void 0;
var mongoose_1 = require("mongoose");
var Member_1 = require("./Member");
exports.FilmSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    script: {
        type: String,
        required: true,
    },
    demoReelLink: {
        type: String,
        required: true,
    },
    targetFund: {
        type: Number,
        required: true,
    },
    team: {
        type: [Member_1.MemberSchema],
        required: true,
    },
    isFunded: {
        type: Boolean,
    },
});
var Film = (0, mongoose_1.model)("Film", exports.FilmSchema);
exports.default = Film;
