import express from "express";
import session from "express-session";
import passport from "./database/config/passport/google";

const app = express();
import cors from "cors";

// cors import
app.use(
  cors({
    origin: "*",
  })
);

// middleware request pass garna use garaxam
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// session
app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
  })
);

// initilize passport
app.use(passport.initialize());
app.use(passport.session());

import authRouter from "./routes/globals/auth/auth.Route";
import categoryRouter from "./routes/admin/category/category.Route";
import tablesRoutes from "./routes/admin/tables/tables.Route";
import reservationRouter from "./routes/admin/reservations/reservations.Route";
import menuRouter from "./routes/admin/menu/menu.Route";
import orderRouter from "./routes/admin/order/order.Route";
import cartRouter from "./routes/admin/cart/cart.Routes";
import listCustomer from "./routes/admin/customer/customer.Route";
import about from "./routes/admin/about/about.Route";

app.use("/api/auth/", authRouter);
app.use("/api/category", categoryRouter);
app.use("/api/tables", tablesRoutes);
app.use("/api/reservations", reservationRouter);
app.use("/api/menu", menuRouter);
app.use("/api/order", orderRouter);
app.use("/api/cart", cartRouter);
app.use("/api/customer", listCustomer);
app.use("/api/about", about);

export default app;
