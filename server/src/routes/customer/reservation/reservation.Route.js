"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const asyncErrorhandle_1 = __importDefault(require("../../../services/asyncErrorhandle"));
const middleware_1 = __importDefault(require("../../../middleware/middleware"));
const type_1 = require("../../../middleware/types/type");
const reservation_Controller_1 = __importDefault(require("../../../controller/customer/reservation/reservation.Controller"));
const router = express_1.default.Router();
router
    .route("/")
    .get(middleware_1.default.isLoggedIn, middleware_1.default.restrictTo(type_1.userRole.Customer), (0, asyncErrorhandle_1.default)(reservation_Controller_1.default.getMyReservation))
    .post(middleware_1.default.isLoggedIn, middleware_1.default.restrictTo(type_1.userRole.Customer), (0, asyncErrorhandle_1.default)(reservation_Controller_1.default.createReservation));
// update status
router
    .route("/status/:id")
    .patch(middleware_1.default.isLoggedIn, middleware_1.default.restrictTo(type_1.userRole.Customer), (0, asyncErrorhandle_1.default)(reservation_Controller_1.default.statusChange));
router
    .route("/:id")
    .delete(middleware_1.default.isLoggedIn, middleware_1.default.restrictTo(type_1.userRole.Customer), (0, asyncErrorhandle_1.default)(reservation_Controller_1.default.deleteReservation))
    .get(middleware_1.default.isLoggedIn, middleware_1.default.restrictTo(type_1.userRole.Customer), (0, asyncErrorhandle_1.default)(reservation_Controller_1.default.singleReservation))
    .patch(middleware_1.default.isLoggedIn, middleware_1.default.restrictTo(type_1.userRole.Customer), (0, asyncErrorhandle_1.default)(reservation_Controller_1.default.updateReservationDate));
exports.default = router;
