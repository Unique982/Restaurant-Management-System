"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const asyncErrorhandle_1 = __importDefault(require("../../../services/asyncErrorhandle"));
const category_Controller_1 = __importDefault(require("../../../controller/admin/category/category.Controller"));
const middleware_1 = __importDefault(require("../../../middleware/middleware"));
const type_1 = require("../../../middleware/types/type");
const router = express_1.default.Router();
router
    .route("/")
    .post(middleware_1.default.isLoggedIn, middleware_1.default.restrictTo(type_1.userRole.Admin), (0, asyncErrorhandle_1.default)(category_Controller_1.default.createCategory))
    .get(middleware_1.default.isLoggedIn, middleware_1.default.restrictTo(type_1.userRole.Admin), (0, asyncErrorhandle_1.default)(category_Controller_1.default.getCategory));
// edit / delete / single
router
    .route("/:id")
    .delete(middleware_1.default.isLoggedIn, middleware_1.default.restrictTo(type_1.userRole.Admin), (0, asyncErrorhandle_1.default)(category_Controller_1.default.deleteCategory))
    .get((0, asyncErrorhandle_1.default)(category_Controller_1.default.singleCategory))
    .patch(middleware_1.default.isLoggedIn, middleware_1.default.restrictTo(type_1.userRole.Admin), (0, asyncErrorhandle_1.default)(category_Controller_1.default.editCategory));
exports.default = router;
