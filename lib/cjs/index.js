"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MuiStatusChild = void 0;
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
var react_1 = __importDefault(require("react"));
var MuiStatusChild_1 = __importDefault(require("./MuiStatusChild"));
exports.MuiStatusChild = MuiStatusChild_1.default;
var SayHello = function (_a) {
    var name = _a.name;
    return (react_1.default.createElement("div", null,
        "Hey ",
        name,
        ", go hello to TypeScript."));
};
exports.default = SayHello;
