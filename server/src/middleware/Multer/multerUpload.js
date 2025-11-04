"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const cloudinaryConfig_1 = require("../../services/CloudinaryConfig/cloudinaryConfig");
const upload = (0, multer_1.default)({
    storage: cloudinaryConfig_1.storage,
    fileFilter: (req, file, cb) => {
        const allowedFileTypes = ["image/png", "image/jpeg", "image/jpg"];
        if (allowedFileTypes.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(new Error("Only image support!"));
        }
    },
    limits: {
        fileSize: 4 * 1024 * 1024,
    },
});
exports.default = upload;
