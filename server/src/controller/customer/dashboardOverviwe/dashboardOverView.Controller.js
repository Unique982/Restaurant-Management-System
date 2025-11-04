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
class MyDashboardOwerView {
    // get all my order
    static getMyAllOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            const orderData = yield connection_1.default.query(`SELECT COUNT(*) AS totalOrders FROM orders WHERE deleted_at IS NULL `, {
                type: sequelize_1.QueryTypes.SELECT,
                replacements: [userId],
            });
            res.status(200).json({ message: "My order summary!", data: orderData });
        });
    }
    // Cancelled Order list
    static getPendingMyOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            const totalPendingOrder = yield connection_1.default.query(`SELECT * FROM orders WHERE status='pending' AND user_id =?`, {
                type: sequelize_1.QueryTypes.SELECT,
                replacements: [userId],
            });
            res
                .status(200)
                .json({ message: "My  Pending order summary!", data: totalPendingOrder });
        });
    }
    // Complete my order list
    static getCompletedMyOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            const totalCompletedMyOrder = yield connection_1.default.query(`SELECT * FROM orders WHERE status='ready' AND user_id =?`, {
                type: sequelize_1.QueryTypes.SELECT,
                replacements: [userId],
            });
            res.status(200).json({
                message: "My Completed order summary!",
                data: totalCompletedMyOrder,
            });
        });
    }
    // total point
    static getUserPoints(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userID = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            const [totalOrderRs] = yield connection_1.default.query(`SELECT  COALESCE(SUM(total_amount), 0) AS total_amount FROM orders WHERE deleted_at IS NULL AND user_id = ?`, {
                type: sequelize_1.QueryTypes.SELECT,
                replacements: [userID],
            });
            // 100 = 2 point
            // 200 = 4 point
            const totalPoints = (totalOrderRs.total_amount / 100) * 2;
            res.status(200).json({
                message: "Total Reward Point",
                totalPoints: Math.floor(totalPoints),
            });
        });
    }
    // total payment rs
    static getMyTotalPayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userID = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            const [totalPay] = yield connection_1.default.query(`SELECT COALESCE(SUM(total_amount), 0) AS totalPayment
       FROM orders
       WHERE deleted_at IS NULL AND user_id = ?`, {
                type: sequelize_1.QueryTypes.SELECT,
                replacements: [userID],
            });
            res.status(200).json({
                message: "Total Pay",
                totalPayment: Math.floor(totalPay.totalPayment),
            });
        });
    }
}
exports.default = MyDashboardOwerView;
