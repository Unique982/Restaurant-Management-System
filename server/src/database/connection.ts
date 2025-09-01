import { Sequelize } from "sequelize-typescript";
import { config } from "dotenv";
// load env
config();

// sequelize instance
const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
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

export default sequelize;
