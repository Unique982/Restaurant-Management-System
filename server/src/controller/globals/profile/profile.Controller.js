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
class MyProfile {
    static updatedProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            const { username, email } = req.body;
            const usernameValue = username !== null && username !== void 0 ? username : null;
            const emailValue = email !== null && email !== void 0 ? email : null;
            // update data
            yield connection_1.default.query(`UPDATE users SET username = COALESCE(?, username), email = COALESCE(?, email), updatedAt = NOW() WHERE id = ?`, {
                type: sequelize_1.QueryTypes.UPDATE,
                replacements: [usernameValue, emailValue, userId],
            });
            // fetch user data
            const [userData] = yield connection_1.default.query(`SELECT * FROM users WHERE id=?`, {
                type: sequelize_1.QueryTypes.SELECT,
                replacements: [userId],
            });
            res
                .status(200)
                .json({ message: "Profile updated successfully", data: userData });
        });
    }
}
exports.default = MyProfile;
