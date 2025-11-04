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
class RestoreData {
    static restoreData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { type, from, to } = req.query;
            if (!type || !from || !to)
                return res.status(400).json({ message: "Type and date range required" });
            let tableName = "";
            switch (type) {
                case "orders":
                    tableName = "orders";
                    break;
                case "reservations":
                    tableName = "reservations";
                    break;
                case "payments":
                    tableName = "payments";
                    break;
                default:
                    return res.status(400).json({ message: "Invalid type" });
            }
            const data = yield connection_1.default.query(`SELECT * FROM ${tableName} WHERE deleted_at BETWEEN ? AND ? ORDER BY deleted_at DESC`, {
                replacements: [from, to],
                type: sequelize_1.QueryTypes.SELECT,
            });
            if (!data || data.length === 0) {
                return res.status(200).json({
                    message: "No data found",
                    data: [],
                });
            }
            return res.status(200).json({
                success: true,
                message: "Data fetched successfully",
                data,
            });
        });
    }
}
exports.default = RestoreData;
