import express, { Router } from "express";
import DishController from "../controller/dish.controller";

const router: Router = express.Router();

router
  .route("/")
  .get(DishController.getDishes)
  .post(DishController.createDish);

router
  .route("/:id")
  .get(DishController.singleDish)
  .patch(DishController.editDish)
  .delete(DishController.deleteDish);

export default router;
