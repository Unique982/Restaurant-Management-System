import { Sequelize } from "sequelize-typescript";
import { config } from "dotenv";
import User from "./models/users.Model";

import Tables from "./models/table.Model";
import Reservation from "./models/reservations.Model";
import Category from "./models/category.Model";
import MenuItem from "./models/menuItem.Model";
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
sequelize.sync({ alter: false }).then(() => {
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

export default sequelize;
