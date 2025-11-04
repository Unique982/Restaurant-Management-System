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
const server_1 = require("../../../../server");
class Category {
    static createCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.body === undefined)
                return res.status(400).json({ message: "Enter value!" });
            const { categoryName, categoryDescription } = req.body;
            if (!categoryName || !categoryDescription)
                return res.status(400).json({ message: "All field required!" });
            // check category already xa ki nai
            const exitscategory = yield connection_1.default.query(`SELECT * FROM category WHERE categoryName =? AND categoryDescription=?`, {
                type: sequelize_1.QueryTypes.SELECT,
                replacements: [categoryName, categoryDescription],
            });
            // duplicate xa ki nai check now if duplicate xa vanni  already exists vanrw msg throw grxa if duplicate xaina vani chai next process ma janxa
            if (exitscategory.length > 0)
                return res.status(400).json({ message: "Already exists!" });
            // isnert query
            const [result] = yield connection_1.default.query(`INSERT INTO category(categoryName,categoryDescription,createdAt,updatedAt)VALUES(?,?,NOW(),NOW())`, {
                type: sequelize_1.QueryTypes.INSERT,
                replacements: [categoryName, categoryDescription],
            });
            // emit socket event
            (0, server_1.getIO)().emit("categoryAdded", {
                id: result,
                categoryName,
                categoryDescription,
            });
            res
                .status(200)
                .json({ message: "category added successfully!", id: result });
        });
    }
    // get category
    static getCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const categoryData = yield connection_1.default.query(`SELECT * FROM category`, {
                type: sequelize_1.QueryTypes.SELECT,
            });
            // emit socket event
            (0, server_1.getIO)().emit("categoryGet", {
                categoryData,
            });
            res
                .status(200)
                .json({ message: "Get Category fetch succesfully!", data: categoryData });
        });
    }
    // delete
    static deleteCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            // check id category exists or not
            const exists = yield connection_1.default.query(`SELECT id FROM category WHERE id=?`, {
                type: sequelize_1.QueryTypes.SELECT,
                replacements: [id],
            });
            if (exists.length === 0)
                return res.status(400).json({ message: "Category id not found!" });
            // menu ko table bata delete garnu paro
            yield connection_1.default.query(`DELETE FROM menu_items WHERE category_id = ?`, {
                type: sequelize_1.QueryTypes.DELETE,
                replacements: [id],
            });
            //delete
            yield connection_1.default.query(`DELETE FROM category WHERE id=?`, {
                type: sequelize_1.QueryTypes.DELETE,
                replacements: [id],
            });
            // emit delete event
            (0, server_1.getIO)().emit("categoryDeleted", id);
            res.status(200).json({ message: "delete successfully!" });
        });
    }
    // single category
    static singleCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const existi = yield connection_1.default.query(`SELECT id FROM category WHERE id =?`, {
                type: sequelize_1.QueryTypes.SELECT,
                replacements: [id],
            });
            if (existi.length === 0)
                return res.status(400).json({ message: "Catageory id not found" });
            const dataCategory = yield connection_1.default.query(`SELECT * FROM category WHERE id=?`, {
                type: sequelize_1.QueryTypes.SELECT,
                replacements: [id],
            });
            (0, server_1.getIO)().emit("singleCategoryFetched", dataCategory[0]);
            res
                .status(200)
                .json({ message: "Single category fetch!", data: dataCategory });
        });
    }
    // edit
    static editCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { categoryName, categoryDescription } = req.body;
            if (!categoryName || !categoryDescription)
                return res.status(400).json({ message: "All fields require!" });
            const exists = yield connection_1.default.query(`SELECT id FROM category WHERE id=?`, {
                type: sequelize_1.QueryTypes.SELECT,
                replacements: [id],
            });
            if (exists.length === 0)
                return res.status(400).json({ message: "category id not found!" });
            yield connection_1.default.query(`UPDATE category SET categoryName=?,categoryDescription=?,updatedAt=NOW() WHERE id=?`, {
                type: sequelize_1.QueryTypes.UPDATE,
                replacements: [categoryName, categoryDescription, id],
            });
            (0, server_1.getIO)().emit("categoryUpdated", { id, categoryName, categoryDescription });
            res.status(200).json({ message: "Update successfully!" });
        });
    }
}
exports.default = Category;
