import express, { Router } from "express";
import asyncErrorHandle from "../../../services/asyncErrorhandle";
import ReservationBooking from "../../../controller/admin/reservations/reservation.Controller";
const router: Router = express.Router();

router
  .route("/")
  .post(asyncErrorHandle(ReservationBooking.createReservation))
  .get(asyncErrorHandle(ReservationBooking.getReservation));

// delete/single/update
router
  .route("/:id")
  .delete(asyncErrorHandle(ReservationBooking.deleteReservation))
  .get(asyncErrorHandle(ReservationBooking.singleReservation))
  .patch(asyncErrorHandle(ReservationBooking.updateReservation));
