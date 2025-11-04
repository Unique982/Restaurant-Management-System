"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const asyncErrorhandle_1 = __importDefault(require("../../../services/asyncErrorhandle"));
const order_Controller_1 = __importDefault(require("../../../controller/admin/order/order.Controller"));
const middleware_1 = __importDefault(require("../../../middleware/middleware"));
const type_1 = require("../../../middleware/types/type");
const router = express_1.default.Router();
router
    .route("/")
    .post(middleware_1.default.isLoggedIn, middleware_1.default.restrictTo(type_1.userRole.Admin), (0, asyncErrorhandle_1.default)(order_Controller_1.default.createOrder))
    .get((0, asyncErrorhandle_1.default)(order_Controller_1.default.getOrder));
// singel order id
router
    .route("/:id")
    .get(middleware_1.default.isLoggedIn, middleware_1.default.restrictTo(type_1.userRole.Admin), (0, asyncErrorhandle_1.default)(order_Controller_1.default.getSingleOrder))
    // hard delete
    .delete(middleware_1.default.isLoggedIn, middleware_1.default.restrictTo(type_1.userRole.Admin), (0, asyncErrorhandle_1.default)(order_Controller_1.default.deleteOrder));
// order status update
router
    .route("/status/:id")
    .patch(middleware_1.default.isLoggedIn, middleware_1.default.restrictTo(type_1.userRole.Admin), (0, asyncErrorhandle_1.default)(order_Controller_1.default.orderStatusChange));
// order type status chnage
router
    .route("/types/status/:id")
    .patch(middleware_1.default.isLoggedIn, middleware_1.default.restrictTo(type_1.userRole.Admin), (0, asyncErrorhandle_1.default)(order_Controller_1.default.orderTypeUpdate));
// soft delete api
router
    .route("/soft-delete/:id")
    .patch(middleware_1.default.isLoggedIn, middleware_1.default.restrictTo(type_1.userRole.Admin), (0, asyncErrorhandle_1.default)(order_Controller_1.default.softDeleteOrder));
// restore api
router
    .route("/restore/:id")
    .patch(middleware_1.default.isLoggedIn, middleware_1.default.restrictTo(type_1.userRole.Admin), (0, asyncErrorhandle_1.default)(order_Controller_1.default.restoreDeleteOrder));
exports.default = router;
