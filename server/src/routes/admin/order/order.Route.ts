import express, { Router } from "express";
import asyncErrorHandle from "../../../services/asyncErrorhandle";
import OrderController from "../../../controller/admin/order/order.Controller";
const router: Router = express.Router();

router
  .route("/")
  .post(asyncErrorHandle(OrderController.createOrder))
  .get(asyncErrorHandle(OrderController.getOrder));

// singel order id
router
  .route("/:id")
  .get(asyncErrorHandle(OrderController.getSingleOrder))
  // hard delete
  .delete(asyncErrorHandle(OrderController.deleteOrder));

// soft delete api
router
  .route("/soft-delete/:id")
  .patch(asyncErrorHandle(OrderController.softDeleteOrder));

// restore api
router
  .route("/restore/:id")
  .patch(asyncErrorHandle(OrderController.restoreDeleteOrder));

export default router;
