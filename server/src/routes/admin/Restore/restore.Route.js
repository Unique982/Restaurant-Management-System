"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = __importDefault(require("../../../middleware/middleware"));
const type_1 = require("../../../middleware/types/type");
const asyncErrorhandle_1 = __importDefault(require("../../../services/asyncErrorhandle"));
const restore_Controller_1 = __importDefault(require("../../../controller/admin/RestoreData/restore.Controller"));
const router = express_1.default.Router();
// 🔸 Filter गरेर data ल्याउने
router
    .route("/")
    .get(middleware_1.default.isLoggedIn, middleware_1.default.restrictTo(type_1.userRole.Admin), (0, asyncErrorhandle_1.default)(restore_Controller_1.default.restoreData));
// // 🔸 Restore गर्ने (single item)
// router.post("/:type/:id", RestoreController.restoreData);
exports.default = router;
