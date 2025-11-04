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
class About {
    static aboutSection(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { aboutTitle, aboutDescription } = req.body;
            const aboutImage = req.file ? req.file.path : null;
            console.log(req.body);
            if (!aboutTitle || !aboutDescription || !aboutImage)
                return res.status(400).json({ message: "All field required!" });
            // check record exists or not
            const exists = yield connection_1.default.query(`SELECT * FROM about LIMIT 1`, {
                type: sequelize_1.QueryTypes.SELECT,
            });
            if (exists.length > 0) {
                const aboutId = exists[0].id;
                // exits id ko data lai update garnu paro
                yield connection_1.default.query(`UPDATE about SET aboutTitle=?, aboutDescription=?, aboutImage=?, updatedAt=NOW() 
WHERE id=?`, {
                    type: sequelize_1.QueryTypes.UPDATE,
                    replacements: [aboutTitle, aboutDescription, aboutImage, aboutId],
                });
                return res.status(200).json({ message: "About Update successful!" });
            }
            else {
                yield connection_1.default.query(`INSERT INTO about (aboutTitle,aboutDescription,aboutImage,createdAt) VALUE(?,?,?,NOW())`, {
                    type: sequelize_1.QueryTypes.INSERT,
                    replacements: [aboutTitle, aboutDescription, aboutImage],
                });
                return res.status(200).json({ message: "About create successfully!" });
            }
        });
    }
    // get about
    static getAbout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const aboutData = yield connection_1.default.query(`SELECT * FROM about`, {
                type: sequelize_1.QueryTypes.SELECT,
            });
            res.status(200).json({ message: "fetch", data: aboutData });
        });
    }
}
exports.default = About;
