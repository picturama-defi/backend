"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberSchema = void 0;
var mongoose_1 = require("mongoose");
exports.MemberSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
    linkedin: {
        type: String,
        required: true,
    },
    place: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        required: true,
    },
});
