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
const bcrypt_1 = __importDefault(require("bcrypt"));
const connection_1 = __importDefault(require("../../../database/connection"));
const sequelize_1 = require("sequelize");
class PasswordReset {
    static passwordReset(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            const { newPassword, confirmPassword } = req.body;
            if (!newPassword || !confirmPassword)
                return res.status(400).json({ message: "Provide all fileds" });
            if (newPassword !== confirmPassword) {
                return res.status(400).json({ message: "Passwords do not match" });
            }
            const hashedPassword = yield bcrypt_1.default.hash(newPassword, 10);
            yield connection_1.default.query(`UPDATE users SET password = ? WHERE id = ?`, {
                replacements: [hashedPassword, userId],
                type: sequelize_1.QueryTypes.UPDATE,
            });
            return res.status(200).json({ message: "Password updated successfully" });
        });
    }
}
exports.default = PasswordReset;
