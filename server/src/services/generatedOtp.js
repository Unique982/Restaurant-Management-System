"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generatedOTP = () => {
    return Math.floor(1000 + Math.random() * 9000);
};
exports.default = generatedOTP;
