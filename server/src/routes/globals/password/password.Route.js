"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = __importDefault(require("../../../middleware/middleware"));
const type_1 = require("../../../middleware/types/type");
const asyncErrorhandle_1 = __importDefault(require("../../../services/asyncErrorhandle"));
const password_Controller_1 = __importDefault(require("../../../controller/globals/password/password.Controller"));
const router = express_1.default.Router();
router
    .route("/:id")
    .patch(middleware_1.default.isLoggedIn, middleware_1.default.restrictTo(type_1.userRole.Admin, type_1.userRole.Customer), (0, asyncErrorhandle_1.default)(password_Controller_1.default.passwordReset));
exports.default = router;
