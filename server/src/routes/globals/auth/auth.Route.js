"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_Controller_1 = __importDefault(require("../../../controller/globals/auth/auth.Controller"));
const router = express_1.default.Router();
const google_1 = __importDefault(require("../../../database/config/passport/google"));
const asyncErrorhandle_1 = __importDefault(require("../../../services/asyncErrorhandle"));
// regsiter
router.route("/register").post((0, asyncErrorhandle_1.default)(auth_Controller_1.default.userRegsiter));
// login
router.route("/login").post((0, asyncErrorhandle_1.default)(auth_Controller_1.default.userLogin));
// forget password
router.route("/forget").post((0, asyncErrorhandle_1.default)(auth_Controller_1.default.forgetPassword));
// otp
router.route("/otp").post((0, asyncErrorhandle_1.default)(auth_Controller_1.default.verifyOtp));
// change password
router
    .route("/reset/password")
    .post((0, asyncErrorhandle_1.default)(auth_Controller_1.default.changePassword));
//login with google
// Google callback
router
    .route("/google")
    .get(google_1.default.authenticate("google", { scope: ["profile", "email"] }));
router
    .route("/google/callback")
    .get(google_1.default.authenticate("google", { failureRedirect: "/" }), (req, res) => res.redirect("/dashboard"));
exports.default = router;
