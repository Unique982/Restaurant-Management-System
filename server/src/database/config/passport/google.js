"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const users_Model_1 = __importDefault(require("../../models/users.Model"));
const dotenv_1 = require("dotenv");
const mailSend_1 = __importDefault(require("../../../services/mailSend"));
(0, dotenv_1.config)();
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:4000/api/auth/google/callback",
}, (_accessToken, _refreshToken, profile, cb) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        let user = yield users_Model_1.default.findOne({ where: { google_id: profile.id } });
        // check user xa ki nai
        if (!user) {
            user = yield users_Model_1.default.create({
                google_id: profile.id,
                email: (_a = profile.emails) === null || _a === void 0 ? void 0 : _a[0].value,
                username: profile.displayName,
            });
            // send mail
            const mailInformation = {
                to: user.email,
                subject: "Welcome to The 90's Restaurant & Bar! ",
                text: `<table
  cellpadding="0"
  cellspacing="0"
  width="100%"
  style="
    max-width: 600px;
    margin: auto;
    background-color: #ffffff;
    border-radius: 10px;
    overflow: hidden;
  "
>
  <tr>
    <td style="padding: 30px">
      <h2 style="color: #333333; margin-top: 0">Welcome ${user.username}!</h2>
      <p style="font-size: 16px; color: #555555">
           Your account has been created successfully at The 90's Restaurant & Bar.
        </p>
          <p style="font-size: 16px; color: #555555">
           You can now login and enjoy our services.
        </p>

      <table cellpadding="0" cellspacing="0" style="margin-top: 15px">
             <tr>
            <td align="center" bgcolor="#2a00e6ff" style="border-radius:5px;">
              <a href="https://your-website-login.com" target="_blank" style="display:inline-block;padding:15px 30px;font-size:16px;color:#ffffff;text-decoration:none;border-radius:5px;">
                Login Now
              </a>
            </td>
            <tr>
              <td style="background-color:#f1f1f1; padding:15px; text-align:center; color:#555555; font-size:14px; border-radius:5px;">
                &copy; 2025 The 90's Restaurant & Bar. All rights reserved.<br>
                <a href="https://www.instagram.com/the_90s_restaurant_and_bar/" style="color:#d32f2f; text-decoration:none;">Follow us on Instagram</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
`,
            };
            yield (0, mailSend_1.default)(mailInformation);
        }
        return cb(null, user);
    }
    catch (err) {
        return cb(err, undefined);
    }
})));
// serialize
passport_1.default.serializeUser(function (user, cb) {
    cb(null, user.id);
});
// deserialize user
passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_Model_1.default.findByPk(id);
        done(null, user);
    }
    catch (err) {
        done(err, null);
    }
}));
// facebook
// passport.use(() => {});
exports.default = passport_1.default;
