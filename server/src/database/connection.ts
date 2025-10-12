import { Sequelize } from "sequelize-typescript";
import { config } from "dotenv";
import User from "./models/users.Model";

import Tables from "./models/table.Model";
import Reservation from "./models/reservations.Model";
import Category from "./models/category.Model";
import MenuItem from "./models/menuItem.Model";
import Order from "./models/order.Model";
import OrderItem from "./models/orderItems.Model";
import About from "./models/about.Model";
import Service from "./models/service";
import Blog from "./models/blog.Model";
import ContactUs from "./models/contact.Model";
import Cart from "./models/cart.Model";
import Payment from "./models/payment.Model";
import CartItem from "./models/cartItems.Model";
// load env
config();

// sequelize instance
const sequelize = new Sequelize({
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
User.hasMany(Reservation, { foreignKey: "user_id" });
Reservation.belongsTo(User, { foreignKey: "user_id" });

// Tables - Reservation
Tables.hasMany(Reservation, { foreignKey: "table_id" });
Reservation.belongsTo(Tables, { foreignKey: "table_id" });

// menu relation category tabel
Category.hasMany(MenuItem, { foreignKey: "category_id" });
MenuItem.belongsTo(Category, { foreignKey: "category_id" });

// order and customer realtion
// order and table relation\

// user to order
User.hasMany(Order, { foreignKey: "user_id" });
Order.belongsTo(User, { foreignKey: "user_id" });

// table to order
// Table ↔ Order
Tables.hasMany(Order, { foreignKey: "table_id" });
Order.belongsTo(Tables, { foreignKey: "table_id" });

// order
Order.hasMany(OrderItem, { foreignKey: "order_id" });
OrderItem.belongsTo(Order, { foreignKey: "order_id" });
// MenuItem ↔ OrderItem
MenuItem.hasMany(OrderItem, { foreignKey: "menu_item_id" });
OrderItem.belongsTo(MenuItem, { foreignKey: "menu_item_id" });

// User ↔ Cart
User.hasMany(Cart, { foreignKey: "user_id" });
Cart.belongsTo(User, { foreignKey: "user_id" });

// Cart ↔ CartItem
Cart.hasMany(CartItem, { foreignKey: "cart_id" });
CartItem.belongsTo(Cart, { foreignKey: "cart_id" });

// MenuItem ↔ CartItem
MenuItem.hasMany(CartItem, { foreignKey: "menu_item_id" });
CartItem.belongsTo(MenuItem, { foreignKey: "menu_item_id" });

// order and payent relationship
Order.hasMany(Payment, { foreignKey: "orderId" });
Payment.belongsTo(Order, { foreignKey: "orderId" });

export default sequelize;
