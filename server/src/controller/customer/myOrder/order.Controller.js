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
const axios_1 = __importDefault(require("axios"));
const paymentIntegration_1 = require("./paymentIntegration");
var PaymentMethod;
(function (PaymentMethod) {
    PaymentMethod["COD"] = "cash";
    PaymentMethod["KHALTI"] = "khalti";
    PaymentMethod["CARD"] = "card";
})(PaymentMethod || (PaymentMethod = {}));
var VerifactionStatus;
(function (VerifactionStatus) {
    VerifactionStatus["Completed"] = "Completed";
})(VerifactionStatus || (VerifactionStatus = {}));
class MyOrder {
    static createOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            const { discount, payment_method, special_request, delivery_address } = req.body;
            // cart item data
            const cartItems = yield connection_1.default.query(`SELECT ci.id as cart_item_id, ci.menu_item_id, ci.quantity, mi.price
     FROM cart_items ci
     JOIN carts c ON ci.cart_id = c.id
     JOIN menu_items mi ON ci.menu_item_id = mi.id
     WHERE c.user_id = ?`, { type: sequelize_1.QueryTypes.SELECT, replacements: [userId] });
            if (!cartItems.length)
                return res.status(400).json({ message: "Cart is empty!" });
            // Calculate total and final amount
            let total_amount = 0;
            for (let item of cartItems) {
                total_amount += parseFloat(item.price) * item.quantity;
            }
            const final_amount = total_amount - (discount || 0);
            let pidx;
            //  Insert order
            const [orderResult] = yield connection_1.default.query(`INSERT INTO orders(user_id, order_type, total_amount, discount, final_amount, status, payment_status, special_request, delivery_address, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`, {
                type: sequelize_1.QueryTypes.INSERT,
                replacements: [
                    userId,
                    "takeaway",
                    total_amount,
                    discount || 0,
                    final_amount,
                    "pending",
                    payment_method === PaymentMethod.COD ? "paid" : "unpaid",
                    special_request || null,
                    delivery_address || null,
                ],
            });
            const order_id = orderResult;
            // 4️⃣ Insert order_items
            for (let item of cartItems) {
                yield connection_1.default.query(`INSERT INTO order_items(order_id, menu_item_id, quantity, price, created_at, updated_at)
       VALUES (?, ?, ?, ?, NOW(), NOW())`, {
                    type: sequelize_1.QueryTypes.INSERT,
                    replacements: [
                        order_id,
                        item.menu_item_id,
                        item.quantity,
                        item.price,
                    ],
                });
            }
            // Khalti payment
            if (payment_method === PaymentMethod.KHALTI) {
                const response = yield (0, paymentIntegration_1.KhaltiPayment)({
                    amount: final_amount,
                    return_url: "http://localhost:3000/",
                    website_url: "http://localhost:3000/",
                    purchase_order_id: order_id,
                    purchase_name: "Order_" + order_id,
                });
                if (response.status === 200) {
                    pidx = response.data.pidx;
                    res.status(200).json({ message: "Takethis", data: response.data.pidx });
                }
                else {
                    res.status(400).json({ message: "Something went wrong, try again!" });
                }
                // Insert payment record
                yield connection_1.default.query(`INSERT INTO payment(pidx, orderId, payment_method, total_amount, status, createdAt, updatedAt)
         VALUES (?, ?, ?, ?, ?, NOW(), NOW())`, {
                    type: sequelize_1.QueryTypes.INSERT,
                    replacements: [
                        pidx,
                        order_id,
                        payment_method,
                        final_amount,
                        "pending",
                    ],
                });
                // Clear cart
                yield connection_1.default.query(`DELETE ci FROM cart_items ci
     JOIN carts c ON ci.cart_id = c.id
     WHERE c.user_id = ?`, { type: sequelize_1.QueryTypes.DELETE, replacements: [userId] });
                yield connection_1.default.query(`DELETE FROM carts WHERE user_id = ?`, {
                    replacements: [userId],
                });
            }
            res.status(200).json({ message: "Order created successfully", order_id });
        });
    }
    // verify payment
    static verifyTransaction(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { pidx } = req.body;
            if (!pidx)
                return res.status(400).json({ message: "Please provide pidx!" });
            const response = yield axios_1.default.post("https://dev.khalti.com/api/v2/epayment/lookup", { pidx }, { headers: { Authorization: "Key 33ef2fcffa374d26b98c68a9f2c13f62" } });
            const data = response.data;
            if (data.status === VerifactionStatus.Completed) {
                yield connection_1.default.query(`UPDATE payment SET status = ? WHERE pidx = ?`, {
                    type: sequelize_1.QueryTypes.UPDATE,
                    replacements: ["completed", pidx],
                });
                yield connection_1.default.query(`UPDATE orders SET payment_status = ? WHERE id = (SELECT orderId FROM payment WHERE pidx = ?)`, { type: sequelize_1.QueryTypes.UPDATE, replacements: ["paid", pidx] });
                // Clear cart after successful payment
                const [order] = yield connection_1.default.query(`SELECT user_id FROM orders WHERE id = (SELECT orderId FROM payment WHERE pidx = ?)`, { type: sequelize_1.QueryTypes.SELECT, replacements: [pidx] });
                if (order === null || order === void 0 ? void 0 : order.user_id) {
                    yield connection_1.default.query(`DELETE ci FROM cart_items ci JOIN carts c ON ci.cart_id = c.id WHERE c.user_id = ?`, { replacements: [order.user_id], type: sequelize_1.QueryTypes.DELETE });
                    yield connection_1.default.query(`DELETE FROM carts WHERE user_id = ?`, {
                        replacements: [order.user_id],
                        type: sequelize_1.QueryTypes.DELETE,
                    });
                }
                return res
                    .status(200)
                    .json({ message: "Payment verified and order confirmed" });
            }
        });
    }
    // get all order
    static getMyOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            if (!userId)
                return res.status(401).json({ message: "Not logged in" });
            console.log("ko user ca", userId);
            const getAllOrder = yield connection_1.default.query(`SELECT 
     o.*,
     o.id AS order_id,
      t.tableNumber,
      oi.id AS order_item_id,
      oi.menu_item_id,
      oi.quantity,
      oi.price,
      u.username,
      mi.name,
      mi.description,
      mi.category_id,
      mi.image_url,
      mi.ingredients,
      mi.availability,
      mi.type
   FROM orders o
   LEFT JOIN order_items AS oi ON o.id = oi.order_id
   LEFT JOIN menu_items AS mi ON oi.menu_item_id = mi.id
   LEFT JOIN users AS u ON o.user_id = u.id
    WHERE o.deleted_at IS NULL 
   ORDER BY o.created_at DESC`, {
                type: sequelize_1.QueryTypes.SELECT,
                replacements: [userId],
            });
            // map orders
            const orderMap = {};
            getAllOrder.forEach((row) => {
                if (!orderMap[row.order_id]) {
                    orderMap[row.order_id] = {
                        order_id: row.order_id,
                        user: {
                            id: row.user_id,
                            username: row.username,
                        },
                        order_type: row.order_type,
                        total_amount: parseFloat(row.total_amount),
                        discount: parseFloat(row.discount),
                        final_amount: parseFloat(row.final_amount),
                        status: row.status,
                        payment_method: row.payment_method,
                        payment_status: row.payment_status,
                        special_request: row.special_request,
                        delivery_address: row.delivery_address,
                        created_at: row.created_at,
                        updated_at: row.updated_at,
                        items: [],
                    };
                }
                if (row.order_item_id) {
                    orderMap[row.order_id].items.push({
                        order_item_id: row.order_item_id,
                        menu: {
                            menu_item_id: row.menu_item_id,
                            name: row.name,
                            description: row.description,
                        },
                        name: row.name,
                        description: row.description,
                        quantity: parseInt(row.quantity),
                        price: parseFloat(row.price),
                        category_id: row.category_id,
                        image_url: row.image_url,
                        ingredients: row.ingredients,
                        availability: row.availability,
                        type: row.type,
                    });
                }
            });
            const orders = Object.values(orderMap);
            res.status(200).json({ message: "All order list", data: orders });
        });
    }
    // delete  my order
    static softDeleteMyOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            const { id } = req.params;
            console.log(req.params.id);
            const idExists = yield connection_1.default.query(`SELECT id FROM orders WHERE id=?`, {
                type: sequelize_1.QueryTypes.SELECT,
                replacements: [id],
            });
            if (!idExists || idExists.length === 0)
                return res.status(400).json({ message: "Order id not found!" });
            // order tabel ma deleted_at ma status update garana
            yield connection_1.default.query(`UPDATE orders SET deleted_at=Now() WHERE id=? AND user_id=?`, {
                type: sequelize_1.QueryTypes.UPDATE,
                replacements: [id, userId],
            });
            // order-items
            yield connection_1.default.query(`UPDATE order_items SET deleted_at=Now() WHERE order_id=?`, {
                type: sequelize_1.QueryTypes.UPDATE,
                replacements: [id],
            });
            res.status(200).json({ message: "Soft delete successfully!" });
        });
    }
    // single view order
    static getSingleMyOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            const { id } = req.params;
            const getAllOrder = yield connection_1.default.query(`SELECT 
      o.id AS order_id,
      o.user_id,
      o.table_id,
      o.deleted_at,
      o.order_type,
      o.total_amount,
      o.discount,
      o.final_amount,
      o.status,
      o.payment_method,
      o.payment_status,
      o.special_request,
      o.delivery_address,
      o.created_at,
      o.updated_at,
      t.tableNumber,
      oi.id AS order_item_id,
      oi.menu_item_id,
      oi.quantity,
      oi.price,
      mi.name,
      mi.description,
      mi.category_id,
      mi.image_url,
      mi.ingredients,
      mi.availability,
      mi.type
   FROM orders o
   LEFT JOIN order_items AS oi ON o.id = oi.order_id
   LEFT JOIN menu_items AS mi ON oi.menu_item_id = mi.id
   
   WHERE o.deleted_at IS NULL AND o.id=? AND o.user_id =?
   ORDER BY o.created_at DESC`, {
                type: sequelize_1.QueryTypes.SELECT,
                replacements: [id, userId],
            });
            if (!getAllOrder || getAllOrder.length === 0)
                return res.status(400).json({ message: "Order Id not found" });
            // map orders
            const orderMap = {};
            getAllOrder.forEach((row) => {
                if (!orderMap[row.order_id]) {
                    orderMap[row.order_id] = {
                        order_id: row.order_id,
                        user_id: row.user_id,
                        order_type: row.order_type,
                        total_amount: parseFloat(row.total_amount),
                        discount: parseFloat(row.discount),
                        final_amount: parseFloat(row.final_amount),
                        status: row.status,
                        payment_method: row.payment_method,
                        payment_status: row.payment_status,
                        special_request: row.special_request,
                        delivery_address: row.delivery_address,
                        created_at: row.created_at,
                        updated_at: row.updated_at,
                        items: [],
                    };
                }
                if (row.order_item_id) {
                    orderMap[row.order_id].items.push({
                        order_item_id: row.order_item_id,
                        menu: {
                            menu_item_id: row.menu_item_id,
                            name: row.name,
                            description: row.description,
                        },
                        quantity: parseInt(row.quantity),
                        price: parseFloat(row.price),
                        category_id: row.category_id,
                        image_url: row.image_url,
                        ingredients: row.ingredients,
                        availability: row.availability,
                        type: row.type,
                    });
                }
            });
            const orders = Object.values(orderMap);
            res.status(200).json({ message: "All order list", data: orders });
        });
    }
    // edit order
    static updateOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.default = MyOrder;
