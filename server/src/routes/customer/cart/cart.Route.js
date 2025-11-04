"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const asyncErrorhandle_1 = __importDefault(require("../../../services/asyncErrorhandle"));
const cart_Controller_1 = __importDefault(require("../../../controller/customer/cart/cart.Controller"));
const router = express_1.default.Router();
router
    .route("/")
    .post((0, asyncErrorhandle_1.default)(cart_Controller_1.default.createCart))
    .get((0, asyncErrorhandle_1.default)(cart_Controller_1.default.getCart));
router.route("/:id").delete((0, asyncErrorhandle_1.default)(cart_Controller_1.default.deleteCart));
exports.default = router;
