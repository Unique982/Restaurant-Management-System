import express, { Router } from "express";
import asyncErrorHandle from "../../../services/asyncErrorhandle";
import About from "../../../controller/admin/about/about.Controller";
const router: Router = express.Router();

router
  .route("/")
  .post(asyncErrorHandle(About.aboutSection))
  .get(asyncErrorHandle(About.getAbout));

export default router;
