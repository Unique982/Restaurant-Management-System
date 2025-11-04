"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = __importDefault(require("../../../middleware/middleware"));
const asyncErrorhandle_1 = __importDefault(require("../../../services/asyncErrorhandle"));
const tables_Controller_1 = __importDefault(require("../../../controller/admin/tables/tables.Controller"));
const type_1 = require("../../../middleware/types/type");
const router = express_1.default.Router();
router
    .route("/")
    .post(middleware_1.default.isLoggedIn, middleware_1.default.restrictTo(type_1.userRole.Admin), (0, asyncErrorhandle_1.default)(tables_Controller_1.default.createTable));
router.route("/").get((0, asyncErrorhandle_1.default)(tables_Controller_1.default.getTables));
// delete
router
    .route("/:id")
    .delete(middleware_1.default.isLoggedIn, middleware_1.default.restrictTo(type_1.userRole.Admin), (0, asyncErrorhandle_1.default)(tables_Controller_1.default.deleteTable))
    .get(middleware_1.default.isLoggedIn, middleware_1.default.restrictTo(type_1.userRole.Admin), (0, asyncErrorhandle_1.default)(tables_Controller_1.default.singleTables))
    .patch(middleware_1.default.isLoggedIn, middleware_1.default.restrictTo(type_1.userRole.Admin), (0, asyncErrorhandle_1.default)(tables_Controller_1.default.updateTables));
// table status update
router
    .route("/status/:id")
    .patch(middleware_1.default.isLoggedIn, middleware_1.default.restrictTo(type_1.userRole.Admin), (0, asyncErrorhandle_1.default)(tables_Controller_1.default.tableStatusUdapte));
exports.default = router;
