import app from "./src/app";

//dotenv config garna
import { config } from "dotenv";

config();
// create server
const startServer = () => {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
};
startServer();
