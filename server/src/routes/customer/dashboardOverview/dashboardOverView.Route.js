"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = __importDefault(require("../../../middleware/middleware"));
const type_1 = require("../../../middleware/types/type");
const asyncErrorhandle_1 = __importDefault(require("../../../services/asyncErrorhandle"));
const dashboardOverView_Controller_1 = __importDefault(require("../../../controller/customer/dashboardOverviwe/dashboardOverView.Controller"));
const router = express_1.default.Router();
router
    .route("/order/total")
    // Complete order
    .get(middleware_1.default.isLoggedIn, middleware_1.default.restrictTo(type_1.userRole.Customer), (0, asyncErrorhandle_1.default)(dashboardOverView_Controller_1.default.getMyAllOrder));
// My Pending order total
router
    .route("/orders/pending")
    .get(middleware_1.default.isLoggedIn, middleware_1.default.restrictTo(type_1.userRole.Customer), (0, asyncErrorhandle_1.default)(dashboardOverView_Controller_1.default.getPendingMyOrder));
// complete order
router
    .route("/orders/complete")
    .get(middleware_1.default.isLoggedIn, middleware_1.default.restrictTo(type_1.userRole.Customer), (0, asyncErrorhandle_1.default)(dashboardOverView_Controller_1.default.getCompletedMyOrder));
//Reward point total
router
    .route("/orders/reward/point")
    .get(middleware_1.default.isLoggedIn, middleware_1.default.restrictTo(type_1.userRole.Customer), (0, asyncErrorhandle_1.default)(dashboardOverView_Controller_1.default.getUserPoints));
// total payment
router
    .route("/orders/pay")
    .get(middleware_1.default.isLoggedIn, middleware_1.default.restrictTo(type_1.userRole.Customer), (0, asyncErrorhandle_1.default)(dashboardOverView_Controller_1.default.getMyTotalPayment));
exports.default = router;
