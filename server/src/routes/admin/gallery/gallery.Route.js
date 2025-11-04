"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = __importDefault(require("../../../middleware/middleware"));
const type_1 = require("../../../middleware/types/type");
const asyncErrorhandle_1 = __importDefault(require("../../../services/asyncErrorhandle"));
const gallery_Controller_1 = __importDefault(require("../../../controller/admin/gallery/gallery.Controller"));
const multerUpload_1 = __importDefault(require("../../../middleware/Multer/multerUpload"));
const router = express_1.default.Router();
router
    .route("")
    .post(middleware_1.default.isLoggedIn, middleware_1.default.restrictTo(type_1.userRole.Admin), multerUpload_1.default.array("image", 30), (0, asyncErrorhandle_1.default)(gallery_Controller_1.default.uploadImage))
    .get((0, asyncErrorhandle_1.default)(gallery_Controller_1.default.getAllImage));
// delete
router
    .route("/:id")
    .delete(middleware_1.default.isLoggedIn, middleware_1.default.restrictTo(type_1.userRole.Admin), (0, asyncErrorhandle_1.default)(gallery_Controller_1.default.deleteImage))
    .patch(middleware_1.default.isLoggedIn, middleware_1.default.restrictTo(type_1.userRole.Admin), multerUpload_1.default.array("image", 30), (0, asyncErrorhandle_1.default)(gallery_Controller_1.default.updateImage))
    .get(middleware_1.default.isLoggedIn, middleware_1.default.restrictTo(type_1.userRole.Admin), (0, asyncErrorhandle_1.default)(gallery_Controller_1.default.singleImage));
exports.default = router;
