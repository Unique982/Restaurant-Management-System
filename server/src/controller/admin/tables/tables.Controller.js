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
const server_1 = require("../../../../server");
const connection_1 = __importDefault(require("../../../database/connection"));
const sequelize_1 = require("sequelize");
class Tables {
    static createTable(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { tableNumber, seats, tableStatus } = req.body;
            if (!tableNumber || !seats)
                return res.status(400).json({ message: "All filed are required" });
            // check duplicate
            const existsTable = yield connection_1.default.query(`SELECT * FROM tables WHERE tableNumber =?`, {
                type: sequelize_1.QueryTypes.SELECT,
                replacements: [tableNumber],
            });
            if (existsTable.length > 0)
                return res.status(400).json({ message: "Table number already exists!" });
            // insert
            const [result] = yield connection_1.default.query(`INSERT INTO tables (tableNumber,seats,tableStatus,createdAt,updatedAt) VALUES(?,?,?,NOW(),NOW())`, {
                type: sequelize_1.QueryTypes.INSERT,
                replacements: [tableNumber, seats, tableStatus],
            });
            const tableId = result;
            (0, server_1.getIO)().emit("tableCreated", {
                table_id: tableId,
                tableNumber,
                seats,
                tableStatus,
            });
            res.status(200).json({ message: "Table saved successfully!" });
        });
    }
    // get table all tables
    static getTables(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const tablesData = yield connection_1.default.query(`SELECT * FROM tables`, {
                type: sequelize_1.QueryTypes.SELECT,
            });
            res.status(200).json({ message: "fetch all table!", data: tablesData });
        });
    }
    // delete tables
    static deleteTable(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const existsTable = yield connection_1.default.query(`SELECT id FROM tables WHERE id =?`, {
                type: sequelize_1.QueryTypes.SELECT,
                replacements: [id],
            });
            if (existsTable.length === 0)
                return res.status(400).json({ message: "Tables id not found!" });
            //delete
            yield connection_1.default.query(`DELETE FROM tables WHERE id=?`, {
                type: sequelize_1.QueryTypes.DELETE,
                replacements: [id],
            });
            (0, server_1.getIO)().emit("tableDeleted", { table_id: id });
            res.status(200).json({ message: "Delete table successfullY" });
        });
    }
    // single tbale fetch
    static singleTables(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const existsTable = yield connection_1.default.query(`SELECT id FROM tables WHERE id =?`, {
                type: sequelize_1.QueryTypes.SELECT,
                replacements: [id],
            });
            if (existsTable.length === 0)
                return res.status(400).json({ message: "Table id not found!" });
            // fetch single data
            const tablesData = yield connection_1.default.query(`SELECT * FROM tables WHERE id =?`, {
                type: sequelize_1.QueryTypes.SELECT,
                replacements: [id],
            });
            res.status(200).json({ message: "Single data fetch", data: tablesData });
        });
    }
    // update table
    static updateTables(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { tableNumber, seats, tableStatus } = req.body;
            if (!tableNumber || !seats)
                return res.status(400).json({ message: "All filed are required!" });
            const existsTables = yield connection_1.default.query(`SELECT * FROM tables WHERE tableNumber =? AND id!=?`, {
                type: sequelize_1.QueryTypes.SELECT,
                replacements: [tableNumber, id],
            });
            if (existsTables.length > 0)
                return res.status(400).json({ message: "Table number already exists!" });
            const existsTable = yield connection_1.default.query(`SELECT id FROM tables WHERE id =?`, {
                type: sequelize_1.QueryTypes.SELECT,
                replacements: [id],
            });
            if (existsTable.length === 0)
                return res.status(400).json({ message: "Table id not found!" });
            // update query
            yield connection_1.default.query(`UPDATE tables SET tableNumber=?,seats=?,tableStatus=? WHERE id=?`, {
                type: sequelize_1.QueryTypes.UPDATE,
                replacements: [tableNumber, seats, tableStatus, id],
            });
            (0, server_1.getIO)().emit("tableUpdated", {
                table_id: id,
                tableNumber,
                seats,
                tableStatus,
            });
            res.status(200).json({ message: "Update Successfully!" });
        });
    }
    // table status chnage
    static tableStatusUdapte(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { tableStatus } = req.body;
            if (!tableStatus)
                return res.status(400).json({ message: "Table status required" });
            const [result] = yield connection_1.default.query(`UPDATE tables SET tableStatus=? ,updatedAt=NOW() WHERE id=?`, {
                type: sequelize_1.QueryTypes.UPDATE,
                replacements: [tableStatus, id],
            });
            // emit socket event if needed
            (0, server_1.getIO)().emit("tableUpdated", { order_id: id, tableStatus });
            return res
                .status(200)
                .json({ message: "Table status update successfully!" });
        });
    }
}
exports.default = Tables;
