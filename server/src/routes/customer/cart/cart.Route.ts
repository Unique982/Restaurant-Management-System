import express, { Router } from "express";
import Middleware from "../../../middleware/middleware";
import { userRole } from "../../../middleware/types/type";
import asyncErrorHandle from "../../../services/asyncErrorhandle";
import MyCart from "../../../controller/customer/cart/cart.Controller";
const router: Router = express.Router();
router
  .route("/")
  .post(
    Middleware.isLoggedIn,
    Middleware.restrictTo(userRole.Customer),
    asyncErrorHandle(MyCart.createCart)
  )
  .get(
    Middleware.isLoggedIn,
    Middleware.restrictTo(userRole.Customer),
    asyncErrorHandle(MyCart.getCart)
  );

router
  .route("/:id")
  .delete(
    Middleware.isLoggedIn,
    Middleware.restrictTo(userRole.Customer),
    asyncErrorHandle(MyCart.deleteCart)
  );

export default router;
