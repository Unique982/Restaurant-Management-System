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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../../database/connection"));
const server_1 = require("../../../../server");
class Gallery {
    static uploadImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { address } = req.body;
            if (!req.files || req.files.length === 0) {
                return res.status(400).json({ message: "No image upload" });
            }
            const files = req.files;
            const values = files.map((file) => [address, file.path]);
            yield connection_1.default.query(`INSERT INTO gallery (address, image, createdAt, updatedAt) VALUES ${values
                .map(() => `(?, ?, NOW(), NOW())`)
                .join(",")}`, {
                replacements: values.flat(),
                type: sequelize_1.QueryTypes.INSERT,
            });
            const io = (0, server_1.getIO)();
            files.forEach((file) => {
                io.emit("galleryAdded", { address, image: file.path });
            });
            res.status(200).json({ message: "Upload Image" });
        });
    }
    // get all
    static getAllImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const imageData = yield connection_1.default.query(`SELECT * FROM gallery  ORDER BY createdAt DESC`, {
                type: sequelize_1.QueryTypes.SELECT,
            });
            res.status(200).json({ message: "Fetch All image", data: imageData });
        });
    }
    // delete image
    static deleteImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const exitsId = yield connection_1.default.query(`SELECT id FROM gallery WHERE id =?`, {
                type: sequelize_1.QueryTypes.SELECT,
                replacements: [id],
            });
            if (!exitsId || exitsId.length === 0) {
                return res.status(400).json({ message: "Image id not found" });
            }
            const [deletedImage] = yield connection_1.default.query(`DELETE FROM gallery WHERE id=?`, {
                type: sequelize_1.QueryTypes.DELETE,
                replacements: [id],
            });
            (0, server_1.getIO)().emit("galleryDeleted", deletedImage);
            res.status(200).json({ message: "Image deleted successfully" });
        });
    }
    // update
    static updateImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { address } = req.body;
            if (!req.files || req.files.length === 0) {
                return res.status(400).json({ message: "No image upload" });
            }
            const files = req.files;
            const file = files[0];
            const exitsId = yield connection_1.default.query(`SELECT id FROM gallery WHERE id =?`, {
                type: sequelize_1.QueryTypes.SELECT,
                replacements: [id],
            });
            if (!exitsId || exitsId.length === 0) {
                return res.status(400).json({ message: "Image id not found" });
            }
            yield connection_1.default.query(`UPDATE gallery SET address = ?, image = ?, updatedAt = NOW() WHERE id = ?`, {
                type: sequelize_1.QueryTypes.UPDATE,
                replacements: [address, file.path, id],
            });
            (0, server_1.getIO)().emit("galleryUpdated", { id, address, image: file.path });
            return res.status(200).json({ message: "Image updated successful" });
        });
    }
    // single
    static singleImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const exitsId = yield connection_1.default.query(`SELECT id FROM gallery WHERE id =?`, {
                type: sequelize_1.QueryTypes.SELECT,
                replacements: [id],
            });
            if (!exitsId || exitsId.length === 0) {
                return res.status(400).json({ message: "Image id not found" });
            }
            const ImageData = yield connection_1.default.query(`SELECT * FROM gallery WHERE id =?`, {
                type: sequelize_1.QueryTypes.SELECT,
                replacements: [id],
            });
            res.status(200).json({ message: "single image fetch!", data: ImageData });
        });
    }
}
exports.default = Gallery;
