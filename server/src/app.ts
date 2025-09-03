import express from "express";
import dishRouter from "./router/dish.route"

const app = express();
app.use(express.json())
// alternative body-parser
app.use('/api/dishes', dishRouter);
export default app;
