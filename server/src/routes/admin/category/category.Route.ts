import express, { Router } from "express";
import asyncErrorHandle from "../../../services/asyncErrorhandle";
import Category from "../../../controller/admin/category/category.Controller";

const router: Router = express.Router();

router
  .route("/")
  .post(asyncErrorHandle(Category.createCategory))
  .get(asyncErrorHandle(Category.getCategory));

// edit / delete / single

router
  .route("/:id")
  .delete(asyncErrorHandle(Category.deleteCategory))
  .get(asyncErrorHandle(Category.singleCategory))
  .patch(asyncErrorHandle(Category.editCategory));

export default router;
