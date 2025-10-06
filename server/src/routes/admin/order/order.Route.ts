import express, { Router } from "express";
import asyncErrorHandle from "../../../services/asyncErrorhandle";
import OrderController from "../../../controller/admin/order/order.Controller";
import Middleware from "../../../middleware/middleware";
import { userRole } from "../../../middleware/types/type";
const router: Router = express.Router();

router
  .route("/")
  .post(
    Middleware.isLoggedIn,
    Middleware.restrictTo(userRole.Admin),
    asyncErrorHandle(OrderController.createOrder)
  )
  .get(asyncErrorHandle(OrderController.getOrder));

// singel order id
router
  .route("/:id")
  .get(
    Middleware.isLoggedIn,
    Middleware.restrictTo(userRole.Admin),
    asyncErrorHandle(OrderController.getSingleOrder)
  )
  // hard delete
  .delete(
    Middleware.isLoggedIn,
    Middleware.restrictTo(userRole.Admin),
    asyncErrorHandle(OrderController.deleteOrder)
  );

// soft delete api
router
  .route("/soft-delete/:id")
  .patch(
    Middleware.isLoggedIn,
    Middleware.restrictTo(userRole.Admin),
    asyncErrorHandle(OrderController.softDeleteOrder)
  );

// restore api
router
  .route("/restore/:id")
  .patch(
    Middleware.isLoggedIn,
    Middleware.restrictTo(userRole.Admin),
    asyncErrorHandle(OrderController.restoreDeleteOrder)
  );

export default router;
