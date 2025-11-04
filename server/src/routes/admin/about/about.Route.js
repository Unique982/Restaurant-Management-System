"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const asyncErrorhandle_1 = __importDefault(require("../../../services/asyncErrorhandle"));
const about_Controller_1 = __importDefault(require("../../../controller/admin/about/about.Controller"));
const multerUpload_1 = __importDefault(require("../../../middleware/Multer/multerUpload"));
const middleware_1 = __importDefault(require("../../../middleware/middleware"));
const type_1 = require("../../../middleware/types/type");
const router = express_1.default.Router();
router
    .route("/")
    .post(middleware_1.default.isLoggedIn, middleware_1.default.restrictTo(type_1.userRole.Admin), multerUpload_1.default.single("aboutImage"), (0, asyncErrorhandle_1.default)(about_Controller_1.default.aboutSection))
    .get((0, asyncErrorhandle_1.default)(about_Controller_1.default.getAbout));
exports.default = router;
