"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const dotenv_1 = require("dotenv");
const users_Model_1 = __importDefault(require("./models/users.Model"));
const table_Model_1 = __importDefault(require("./models/table.Model"));
const reservations_Model_1 = __importDefault(require("./models/reservations.Model"));
const category_Model_1 = __importDefault(require("./models/category.Model"));
const menuItem_Model_1 = __importDefault(require("./models/menuItem.Model"));
const order_Model_1 = __importDefault(require("./models/order.Model"));
const orderItems_Model_1 = __importDefault(require("./models/orderItems.Model"));
const cart_Model_1 = __importDefault(require("./models/cart.Model"));
const payment_Model_1 = __importDefault(require("./models/payment.Model"));
const cartItems_Model_1 = __importDefault(require("./models/cartItems.Model"));
// load env
(0, dotenv_1.config)();
// sequelize instance
const sequelize = new sequelize_typescript_1.Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    dialect: "mysql",
    port: Number(process.env.DB_PORT),
    models: [__dirname + "/models"],
});
// database connection
sequelize
    .authenticate()
    .then(() => {
    console.log("Authenticated connected successfully");
})
    .catch((err) => {
    console.log(err);
});
// sequelize migrate sync
sequelize.sync({ alter: true }).then(() => {
    console.log("migrated successfully!");
});
// relastion ship
// User - Reservation
// User - Reservation
users_Model_1.default.hasMany(reservations_Model_1.default, { foreignKey: "user_id" });
reservations_Model_1.default.belongsTo(users_Model_1.default, { foreignKey: "user_id" });
// Tables - Reservation
table_Model_1.default.hasMany(reservations_Model_1.default, { foreignKey: "table_id" });
reservations_Model_1.default.belongsTo(table_Model_1.default, { foreignKey: "table_id" });
// menu relation category tabel
category_Model_1.default.hasMany(menuItem_Model_1.default, { foreignKey: "category_id" });
menuItem_Model_1.default.belongsTo(category_Model_1.default, { foreignKey: "category_id" });
// order and customer realtion
// order and table relation\
// user to order
users_Model_1.default.hasMany(order_Model_1.default, { foreignKey: "user_id" });
order_Model_1.default.belongsTo(users_Model_1.default, { foreignKey: "user_id" });
// table to order
// Table ↔ Order
table_Model_1.default.hasMany(order_Model_1.default, { foreignKey: "table_id" });
order_Model_1.default.belongsTo(table_Model_1.default, { foreignKey: "table_id" });
// order
order_Model_1.default.hasMany(orderItems_Model_1.default, { foreignKey: "order_id" });
orderItems_Model_1.default.belongsTo(order_Model_1.default, { foreignKey: "order_id" });
// MenuItem ↔ OrderItem
menuItem_Model_1.default.hasMany(orderItems_Model_1.default, { foreignKey: "menu_item_id" });
orderItems_Model_1.default.belongsTo(menuItem_Model_1.default, { foreignKey: "menu_item_id" });
// User ↔ Cart
users_Model_1.default.hasMany(cart_Model_1.default, { foreignKey: "user_id" });
cart_Model_1.default.belongsTo(users_Model_1.default, { foreignKey: "user_id" });
// Cart ↔ CartItem
cart_Model_1.default.hasMany(cartItems_Model_1.default, { foreignKey: "cart_id" });
cartItems_Model_1.default.belongsTo(cart_Model_1.default, { foreignKey: "cart_id" });
// MenuItem ↔ CartItem
menuItem_Model_1.default.hasMany(cartItems_Model_1.default, { foreignKey: "menu_item_id" });
cartItems_Model_1.default.belongsTo(menuItem_Model_1.default, { foreignKey: "menu_item_id" });
// order and payent relationship
order_Model_1.default.hasMany(payment_Model_1.default, { foreignKey: "orderId" });
payment_Model_1.default.belongsTo(order_Model_1.default, { foreignKey: "orderId" });
exports.default = sequelize;
