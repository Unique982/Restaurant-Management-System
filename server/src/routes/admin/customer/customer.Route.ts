import express, { Router } from "express";

import asyncErrorHandle from "../../../services/asyncErrorhandle";
import CustomerList from "../../../controller/admin/customer/customer.Controller";
const router: Router = express.Router();

router.route("/").get(asyncErrorHandle(CustomerList.listCustomer));
router
  .route("/:id")
  .get(asyncErrorHandle(CustomerList.singleDetailsCustomer))
  .delete(asyncErrorHandle(CustomerList.deleteCustomer));

export default router;
