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
const connection_1 = __importDefault(require("../../../database/connection"));
const sequelize_1 = require("sequelize");
class ContactUs {
    static sendMsg(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, phoneNumber, email, message } = req.body;
            if (!username || !phoneNumber || !email || !message)
                return res.status(400).json({ message: "All fields are required" });
            const dateValid = new Date(Date.now() - 24 * 60 * 60 * 1000);
            const recentMsg = yield connection_1.default.query(`SELECT id FROM contact_us WHERE createdAt >= ?
      LIMIT 1`, {
                type: sequelize_1.QueryTypes.SELECT,
                replacements: [dateValid],
            });
            if (recentMsg && recentMsg.length > 0)
                return res
                    .status(400)
                    .json({ message: "You can send only one message within 24 hours" });
            yield connection_1.default.query(`
      INSERT INTO contact_us ( username,email, phoneNumber,  message, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, NOW(), NOW())
    `, {
                type: sequelize_1.QueryTypes.INSERT,
                replacements: [username, email, phoneNumber, message],
            });
            return res.status(200).json({ message: "Message sent successfully" });
        });
    }
}
exports.default = ContactUs;
