import express, { Router } from "express";
import Middleware from "../../../middleware/middleware";
import asyncErrorHandle from "../../../services/asyncErrorhandle";
import Tables from "../../../controller/admin/tables/tables.Controller";

const router: Router = express.Router();

router.route("/").post(asyncErrorHandle(Tables.createTable));
router.route("/").get(asyncErrorHandle(Tables.getTables));

// delete
router
  .route("/:id")
  .delete(asyncErrorHandle(Tables.deleteTable))
  .get(asyncErrorHandle(Tables.singleTables))
  .patch(asyncErrorHandle(Tables.updateTables));

export default router;
