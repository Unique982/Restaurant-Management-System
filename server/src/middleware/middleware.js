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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_Model_1 = __importDefault(require("../database/models/users.Model"));
class Middleware {
}
_a = Middleware;
Middleware.isLoggedIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: "Please Provide token" });
        }
        // token verfiy
        jsonwebtoken_1.default.verify(token, process.env.JWT_WEB_TOKEN, (error, resultaayo) => __awaiter(void 0, void 0, void 0, function* () {
            if (error) {
                return res.status(400).json({ messag: "Token invalid Vayo" });
            }
            else {
                const userData = yield users_Model_1.default.findByPk(resultaayo.id, {
                    attributes: ["id", "role"],
                });
                if (!userData) {
                    res.status(403).json({ message: "Invalid token" });
                }
                else {
                    req.user = {
                        id: userData.id,
                        role: userData.role,
                    };
                    next();
                }
            }
        }));
    }
    catch (err) {
        console.log(err);
    }
});
// role base access
Middleware.restrictTo = (...roles) => {
    return (req, res, next) => {
        var _b;
        let userRole = (_b = req.user) === null || _b === void 0 ? void 0 : _b.role;
        if (roles.includes(userRole)) {
            next();
        }
        else {
            res
                .status(400)
                .json({ message: "Invalid, you don't have access to this" });
        }
    };
};
exports.default = Middleware;
