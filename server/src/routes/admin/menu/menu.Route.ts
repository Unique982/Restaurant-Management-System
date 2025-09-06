import express, { Router } from "express";
import Menu from "../../../controller/admin/menu/menu.Controller";

import asyncErrorHandle from "../../../services/asyncErrorhandle";
import Middleware from "../../../middleware/middleware";
const router: Router = express.Router();

router
  .route("/")
  .get(asyncErrorHandle(Menu.getMenuItems))
  .post(asyncErrorHandle(Menu.createMenuItems));

router
  .route("/:id")
  .get(asyncErrorHandle(Menu.singleMenuItems))
  .patch(asyncErrorHandle(Menu.editMenuItems))
  .delete(asyncErrorHandle(Menu.deleteMenuItems));

export default router;
