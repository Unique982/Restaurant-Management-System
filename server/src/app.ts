import express from "express";
import session from "express-session";
import passport from "./database/config/passport/google";

const app = express();

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

app.use("/api/auth/", authRouter);
app.use("/api/category", categoryRouter);
app.use("/api/tables", tablesRoutes);
app.use("/api/reservations", reservationRouter);
app.use("/api/menu", menuRouter);

export default app;
