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
const server_1 = require("../../../../server");
class Menu {
    // Create new menuItems
    static createMenuItems(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, price, category_id, description, image_url, ingredients, availability, type, } = req.body;
            console.log(req.body);
            if (!name ||
                !price ||
                !category_id ||
                !description ||
                !ingredients ||
                !availability ||
                !type) {
                return res.status(400).json({ message: "All fields required!" });
            }
            // Check duplicate dish
            const exists = yield connection_1.default.query(`SELECT * FROM menu_items WHERE name=?`, {
                type: sequelize_1.QueryTypes.SELECT,
                replacements: [name],
            });
            if (exists.length > 0) {
                return res.status(400).json({ message: "Menu Items already exists!" });
            }
            // Insert query
            const [result] = yield connection_1.default.query(`INSERT INTO menu_items(name,description,price,category_id,image_url, ingredients,availability,type,created_at,updated_at)
         VALUES (?,?,?,?,?,?,?,?,NOW(),NOW())`, {
                type: sequelize_1.QueryTypes.INSERT,
                replacements: [
                    name,
                    description,
                    price,
                    category_id,
                    image_url || null,
                    ingredients,
                    availability,
                    type,
                ],
            });
            (0, server_1.getIO)().emit("menuAdded", {
                id: result,
                name,
                description,
                price,
                category_id,
                image_url,
                ingredients,
                availability,
                type,
            });
            res.status(201).json({ message: "Menu Items added successfully!" });
        });
    }
    // Get all menuItems
    static getMenuItems(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const menuData = yield connection_1.default.query(`SELECT m.*, c.categoryName FROM menu_items m JOIN category c ON m.category_id = c.id`, {
                type: sequelize_1.QueryTypes.SELECT,
            });
            res.status(200).json({ message: "Fectch successfully", data: menuData });
        });
    }
    // Get single menuItems
    static singleMenuItems(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const existsId = yield connection_1.default.query(`SELECT * FROM menu_items WHERE id=?`, {
                type: sequelize_1.QueryTypes.SELECT,
                replacements: [id],
            });
            if (existsId.length === 0) {
                res.status(400).json({ message: "Menu Itmes id not found!" });
            }
            else {
                res
                    .status(200)
                    .json({ message: "Fetch menuItmes single!", data: existsId });
            }
        });
    }
    // Update dish
    static editMenuItems(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { name, price, category_id, description, image_url, ingredients, availability, type, } = req.body;
            if (!name ||
                !price ||
                !category_id ||
                !description ||
                !ingredients ||
                !availability ||
                !type) {
                return res.status(400).json({ message: "All fields required!" });
            }
            // Check duplicate dish
            const exists = yield connection_1.default.query(`SELECT * FROM menu_items WHERE name=? AND id!=?`, {
                type: sequelize_1.QueryTypes.SELECT,
                replacements: [name, id],
            });
            if (exists.length > 0) {
                return res.status(400).json({ message: "Menu Items already exists!" });
            }
            yield connection_1.default.query(`UPDATE menu_items
         SET name=?,description=?,price=?, category_id=?, image_url=?,ingredients=?,availability=?,type=?, updated_at=NOW()
         WHERE id=?`, {
                type: sequelize_1.QueryTypes.UPDATE,
                replacements: [
                    name,
                    description,
                    price,
                    category_id,
                    image_url || null,
                    ingredients,
                    availability,
                    type,
                    id,
                ],
            });
            (0, server_1.getIO)().emit("menuUpdated", {
                id: Number(id),
                name,
                description,
                price,
                category_id,
                image_url,
                ingredients,
                availability,
                type,
            });
            res.status(200).json({ message: "Menu items updated successfully!" });
        });
    }
    // Delete dish
    static deleteMenuItems(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const exists = yield connection_1.default.query(`SELECT id FROM menu_items WHERE id=?`, {
                type: sequelize_1.QueryTypes.SELECT,
                replacements: [id],
            });
            if (exists.length === 0) {
                return res.status(404).json({ message: "menu items not found!" });
            }
            yield connection_1.default.query(`DELETE FROM menu_items WHERE id=?`, {
                type: sequelize_1.QueryTypes.DELETE,
                replacements: [id],
            });
            (0, server_1.getIO)().emit("menuDeleted", Number(id));
            res.status(200).json({ message: "Menu Items deleted successfully!" });
        });
    }
}
exports.default = Menu;
