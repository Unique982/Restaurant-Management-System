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
class MyCart {
    static createCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userId = ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) || null;
            const { menu_item_id, quantity } = req.body;
            if (!quantity || !menu_item_id) {
                return res
                    .status(400)
                    .json({ message: "Please provide quantity and product" });
            }
            // check ifmenu item exits or not
            const menuItems = yield connection_1.default.query(`SELECT id FROM menu_items WHERE id =?`, {
                type: sequelize_1.QueryTypes.SELECT,
                replacements: [menu_item_id],
            });
            if (!menuItems || menuItems.length === 0) {
                return res.status(404).json({ message: "Menu Items not found!" });
            }
            // check if user alerdy cart or not
            const [cart] = yield connection_1.default.query(`SELECT id  FROM carts WHERE user_id =?`, {
                type: sequelize_1.QueryTypes.SELECT,
                replacements: [userId],
            });
            let cartId;
            if (userId) {
                if (!cart) {
                    const [newCartId] = yield connection_1.default.query(`INSERT INTO carts(user_id,createdAt,updatedAt)VALUES(?,NOW(),NOW())`, {
                        type: sequelize_1.QueryTypes.INSERT,
                        replacements: [userId],
                    });
                    cartId = newCartId;
                }
                else {
                    cartId = cart.id;
                }
                //check if same item already exists in cart ma xa vanni update grw
                const existsItems = yield connection_1.default.query(`SELECT id,quantity FROM cart_items WHERE cart_id =? AND menu_item_id=?`, {
                    type: sequelize_1.QueryTypes.SELECT,
                    replacements: [cartId, menu_item_id],
                });
                if (existsItems.length > 0) {
                    const item = existsItems[0];
                    yield connection_1.default.query(`UPDATE cart_items 
   SET quantity = quantity + ?, updatedAt = NOW() 
   WHERE id = ?`, {
                        type: sequelize_1.QueryTypes.UPDATE,
                        replacements: [quantity, existsItems.id],
                    });
                    return res.status(200).json({
                        message: "Cart Item quantity update successfully",
                        cart_id: cartId,
                    });
                    //insert query
                }
                yield connection_1.default.query(`INSERT INTO cart_items(cart_id,menu_item_id,quantity,createdAt,updatedAt)VALUES(?,?,?,NOW(),NOW())`, {
                    type: sequelize_1.QueryTypes.INSERT,
                    replacements: [cartId, menu_item_id, quantity],
                });
                const cartData = yield connection_1.default.query(`SELECT ci.id as cart_item_id, ci.menu_item_id, ci.quantity, mi.name, mi.price, mi.image_url
   FROM cart_items ci
   JOIN carts c ON ci.cart_id = c.id
   JOIN menu_items mi ON ci.menu_item_id = mi.id
   WHERE c.user_id = ?`, {
                    type: sequelize_1.QueryTypes.SELECT,
                    replacements: [userId],
                });
                return res.status(200).json({
                    message: "Item added to cart successfully!",
                    cartId,
                    data: cartData,
                });
            }
            else {
                // guest user ho vani
                return res.status(200).json({
                    message: "Items added to cart successfully!",
                    cartItem: { menu_item_id, quantity },
                });
            }
        });
    }
    // get
    static getCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userId = ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) || null;
            if (!userId) {
                // guest user
                return res.status(200).json({
                    message: "Guest cart",
                    data: [],
                });
            }
            const cartData = yield connection_1.default.query(`SELECT ci.id as cart_item_id, ci.menu_item_id, ci.quantity, mi.name, mi.price, mi.image_url
     FROM cart_items ci
     JOIN carts c ON ci.cart_id = c.id
     JOIN menu_items mi ON ci.menu_item_id = mi.id
     WHERE c.user_id = ?`, {
                type: sequelize_1.QueryTypes.SELECT,
                replacements: [userId],
            });
            res
                .status(200)
                .json({ message: "Cart fetched successfully", data: cartData });
        });
    }
    // delete cart
    static deleteCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            const cartId = req.params.id;
            const exitsId = yield connection_1.default.query(`SELECT id FROM carts WHERE id =? AND user_id =?`, {
                type: sequelize_1.QueryTypes.SELECT,
                replacements: [cartId, userId],
            });
            if (!exitsId || exitsId.length === 0) {
                return res.status(400).json({ message: "cart id not found" });
            }
            yield connection_1.default.query(`DELETE FROM cart_items WHERE cart_id =?`, {
                type: sequelize_1.QueryTypes.DELETE,
                replacements: [cartId],
            });
            yield connection_1.default.query(`DELETE FROM carts WHERE id =? AND user_id=?`, {
                type: sequelize_1.QueryTypes.DELETE,
                replacements: [cartId, userId],
            });
            res.status(200).json({ message: "Cart delete successfull" });
        });
    }
}
exports.default = MyCart;
