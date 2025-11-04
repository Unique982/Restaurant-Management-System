"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const asyncErrorhandle_1 = __importDefault(require("../../../services/asyncErrorhandle"));
const category_Controller_1 = __importDefault(require("../../../controller/customer/category/category.Controller"));
const router = express_1.default.Router();
router.route("/").get((0, asyncErrorhandle_1.default)(category_Controller_1.default.getCategory));
exports.default = router;
