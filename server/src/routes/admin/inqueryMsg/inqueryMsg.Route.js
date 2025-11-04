"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = __importDefault(require("../../../middleware/middleware"));
const type_1 = require("../../../middleware/types/type");
const inqueryMsg_Controller_1 = __importDefault(require("../../../controller/admin/inqueryMsg/inqueryMsg.Controller"));
const asyncErrorhandle_1 = __importDefault(require("../../../services/asyncErrorhandle"));
const router = express_1.default.Router();
router
    .route("/")
    .get(middleware_1.default.isLoggedIn, middleware_1.default.restrictTo(type_1.userRole.Admin), (0, asyncErrorhandle_1.default)(inqueryMsg_Controller_1.default.getAllInqueryMsg));
exports.default = router;
