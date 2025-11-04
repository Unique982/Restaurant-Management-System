"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generatedJwtWebToken = (data) => {
    // @ts-ignore
    const token = jsonwebtoken_1.default.sign(data, process.env.JWT_WEB_TOKEN, {
        expiresIn: process.env.EXPIRESIN,
    });
    return token;
};
exports.default = generatedJwtWebToken;
