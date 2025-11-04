"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const menu_Controller_1 = __importDefault(require("../../../controller/admin/menu/menu.Controller"));
const asyncErrorhandle_1 = __importDefault(require("../../../services/asyncErrorhandle"));
const middleware_1 = __importDefault(require("../../../middleware/middleware"));
const type_1 = require("../../../middleware/types/type");
const router = express_1.default.Router();
router
    .route("/")
    .get((0, asyncErrorhandle_1.default)(menu_Controller_1.default.getMenuItems))
    .post(middleware_1.default.isLoggedIn, middleware_1.default.restrictTo(type_1.userRole.Admin), (0, asyncErrorhandle_1.default)(menu_Controller_1.default.createMenuItems));
router
    .route("/:id")
    .get((0, asyncErrorhandle_1.default)(menu_Controller_1.default.singleMenuItems))
    .patch(middleware_1.default.isLoggedIn, middleware_1.default.restrictTo(type_1.userRole.Admin), (0, asyncErrorhandle_1.default)(menu_Controller_1.default.editMenuItems))
    .delete(middleware_1.default.isLoggedIn, middleware_1.default.restrictTo(type_1.userRole.Admin), (0, asyncErrorhandle_1.default)(menu_Controller_1.default.deleteMenuItems));
exports.default = router;
