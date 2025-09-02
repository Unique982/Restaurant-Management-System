import app from "./src/app";

//dotenv config garna
import { config } from "dotenv";
import "./src/database/connection";

config();
// create server
const startServer = () => {
  const port = process.env.PORT;
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
};
startServer();
