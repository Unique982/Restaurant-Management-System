"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const asyncErrorhandle_1 = __importDefault(require("../../../services/asyncErrorhandle"));
const reservation_Controller_1 = __importDefault(require("../../../controller/admin/reservations/reservation.Controller"));
const middleware_1 = __importDefault(require("../../../middleware/middleware"));
const type_1 = require("../../../middleware/types/type");
const router = express_1.default.Router();
router
    .route("/")
    .post(middleware_1.default.isLoggedIn, middleware_1.default.restrictTo(type_1.userRole.Admin), (0, asyncErrorhandle_1.default)(reservation_Controller_1.default.createReservation))
    .get((0, asyncErrorhandle_1.default)(reservation_Controller_1.default.getReservation));
// delete/single/update
router
    .route("/:id")
    .delete(middleware_1.default.isLoggedIn, middleware_1.default.restrictTo(type_1.userRole.Admin), (0, asyncErrorhandle_1.default)(reservation_Controller_1.default.deleteReservation))
    .get(middleware_1.default.isLoggedIn, middleware_1.default.restrictTo(type_1.userRole.Admin), (0, asyncErrorhandle_1.default)(reservation_Controller_1.default.singleReservation))
    .patch(middleware_1.default.isLoggedIn, middleware_1.default.restrictTo(type_1.userRole.Admin), (0, asyncErrorhandle_1.default)(reservation_Controller_1.default.updateReservation));
// soft delete
router
    .route("/soft-delete/:id")
    .patch(middleware_1.default.isLoggedIn, middleware_1.default.restrictTo(type_1.userRole.Admin), (0, asyncErrorhandle_1.default)(reservation_Controller_1.default.softDeleteReservation));
// soft delete
router
    .route("/restore/:id")
    .patch(middleware_1.default.isLoggedIn, middleware_1.default.restrictTo(type_1.userRole.Admin), (0, asyncErrorhandle_1.default)(reservation_Controller_1.default.restoreDeleteReservation));
// status update
router
    .route("/status/:id")
    .patch(middleware_1.default.isLoggedIn, middleware_1.default.restrictTo(type_1.userRole.Admin), (0, asyncErrorhandle_1.default)(reservation_Controller_1.default.statusUpdateReservation));
exports.default = router;
