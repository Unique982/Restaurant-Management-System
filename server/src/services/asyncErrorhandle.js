"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asyncErrorHandle = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch((err) => {
            res.status(400).json({ message: err.message, fullError: err });
            console.log(err);
        });
    };
};
exports.default = asyncErrorHandle;
