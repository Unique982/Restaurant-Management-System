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
class CustomerList {
    // All customer list here
    static listCustomer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const listCustomerData = yield connection_1.default.query(`SELECT * FROM users WHERE role='customer'`, {
                type: sequelize_1.QueryTypes.SELECT,
            });
            res
                .status(200)
                .json({ message: "Fetch all Customer List", data: listCustomerData });
        });
    }
    // single customer details
    static singleDetailsCustomer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const idExists = yield connection_1.default.query(`SELECT * FROM users WHERE role='customer'AND id=?`, {
                type: sequelize_1.QueryTypes.SELECT,
                replacements: [id],
            });
            if (idExists.length === 0)
                return res.status(400).json({ message: "This id user not found!" });
            res
                .status(200)
                .json({ message: "Single Customer details", data: idExists });
        });
    }
    // delete customer
    static deleteCustomer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const idExists = yield connection_1.default.query(`SELECT id,role FROM users WHERE role='customer' AND id=?`, {
                type: sequelize_1.QueryTypes.SELECT,
                replacements: [id],
            });
            if (idExists.length === 0)
                return res.status(400).json({ message: "This id not found!" });
            yield connection_1.default.query(`DELETE FROM users WHERE id =?`, {
                type: sequelize_1.QueryTypes.DELETE,
                replacements: [id],
            });
            res.status(200).json({ messag: "Customer delete successfuly!" });
        });
    }
}
exports.default = CustomerList;
