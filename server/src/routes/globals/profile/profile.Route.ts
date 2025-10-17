import express, { Router } from "express";
import Middleware from "../../../middleware/middleware";
import { userRole } from "../../../middleware/types/type";
import asyncErrorHandle from "../../../services/asyncErrorhandle";
import MyProfile from "../../../controller/globals/profile/profile.Controller";
const router: Router = express.Router();

router
  .route("/:id")
  .patch(
    Middleware.isLoggedIn,
    Middleware.restrictTo(userRole.Admin, userRole.Customer),
    asyncErrorHandle(MyProfile.updatedProfile)
  );
export default router;
