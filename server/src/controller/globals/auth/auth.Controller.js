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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const users_Model_1 = __importDefault(require("../../../database/models/users.Model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const generatedJWTWEBTOKEN_1 = __importDefault(require("../../../services/generatedJWTWEBTOKEN"));
const generatedOtp_1 = __importDefault(require("../../../services/generatedOtp"));
const mailSend_1 = __importDefault(require("../../../services/mailSend"));
class Authentication {
    //login user input
    static userLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                if (!email || !password)
                    return res.status(400).json({ message: "All fields are required " });
                // user existi or not
                const userExists = yield users_Model_1.default.findOne({ where: { email } });
                if (!userExists)
                    return res.status(404).json({ message: "This email not registered" });
                //check password metch or not
                const isMatch = bcrypt_1.default.compareSync(password, userExists.password);
                // if not match then
                if (!isMatch)
                    return res.json({ message: "Invalid credentials" });
                //token verify
                const token = (0, generatedJWTWEBTOKEN_1.default)({
                    id: userExists.id,
                    role: userExists.role,
                });
                res.status(200).json({
                    message: "Login successfully",
                    token: token,
                    user: {
                        id: userExists.id,
                        role: userExists.role,
                    },
                });
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ message: "something wrong" });
            }
        });
    }
    // forget password
    static forgetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // user bat email input throw lina
            const { email } = req.body;
            // user email ma aaya na vani input garw vann msg garxa
            if (!email)
                return res.status(400).json({ message: "Email are required" });
            // user email patha ko db exists xa ki ni check garxa
            const emailExists = yield users_Model_1.default.findOne({
                where: {
                    email,
                },
            });
            // if user pataha ko email thik xain vani
            if (!emailExists)
                return res.status(400).json({ messag: "invalid email!" });
            // random otp send garnu paro
            const otp = (0, generatedOtp_1.default)();
            emailExists.otp = otp;
            emailExists.otp_exp = new Date(Date.now() + 5 * 60 * 1000);
            yield emailExists.save();
            // send email
            const mailInformation = {
                to: emailExists.email,
                subject: "The 90's Restaurant & Bar - Password Reset",
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
      <h2 style="color: #333333; margin-top: 0">The 90's Restaurant & Bar - Password Reset</h2>
      <p style="font-size: 16px; color: #555555">
         You requested a password reset. Use the OTP below to reset your password:
      </p>

      <table cellpadding="0" cellspacing="0" style="margin-top: 15px">
         <tr>
              <td align="center" style="padding:20px 0;">
                <span style="font-size:35px; font-weight:bold; color:#000000; background-color:#f1f1f1; padding:15px 30px; border-radius:5px; display:inline-block;">
                 ${otp}
                </span>
              </td>
            </tr>
        <tr>
              <td style="padding:20px 0; color:#555555; font-size:16px; line-height:24px; ">
                This OTP is valid for <strong>2 minutes</strong>. Please do not share it with anyone.
              </td>
            </tr>
            <tr>
              <td style="background-color:#f1f1f1; padding:15px; text-align:center; color:#555555; font-size:14px; border-radius:5px;">
                If you did not request this OTP, please ignore this email.<br>
                &copy; 2025 The 90's Restaurant & Bar. All rights reserved.<br>
                <a href="https://www.instagram.com/the_90s_restaurant_and_bar/" style="color:#d32f2f; text-decoration:none;">Follow us on Instagram</a>
              </td>
            </tr>
          </table>

          <!-- Outer Footer -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:10px;">
            <tr>
             <td
      style="
        background-color: #f1f1f1;
        text-align: center;
        padding: 15px;
        font-size: 13px;
        color: #777;
      "
    >
      &copy; 2025 Unique Bus Sewa. All rights reserved.
    </td>

            </tr>
          </table>
        </td>
      </tr>
    </table>
`,
            };
            yield (0, mailSend_1.default)(mailInformation);
            res.status(200).json({ message: "Otp send successfully!.Check email" });
        });
    }
    // verfiy otp password
    static verifyOtp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, otp } = req.body;
            if (!email || !otp)
                return res
                    .status(400)
                    .json({ message: "Please provide email and otp code!" });
            const userExists = yield users_Model_1.default.findOne({
                where: {
                    email,
                },
            });
            if (!userExists)
                return res.status(400).json({ message: "Email not regsiter!" });
            // verfiy password check
            if (userExists.otp !== Number(otp))
                return res.status(400).json({ message: "Invalid password!" });
            // exp data
            if (userExists.otp_exp <= new Date()) {
                res.status(400).json({ message: "Expried has otp! Resend password" });
            }
            else {
                // set
                userExists.otp;
                userExists.otp_exp;
                yield userExists.save();
                res.status(200).json({ message: "Otp successfully!" });
            }
        });
    }
    // chenge new password
    static changePassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, newPassword, confirmPassword } = req.body;
            if (!email || !newPassword || !confirmPassword)
                return res.json({ message: "All filed are required!" });
            // check new password and confirm password
            if (newPassword !== confirmPassword)
                return res.json({
                    message: "New Password and confirm password not match!",
                });
            // check email
            const userExists = yield users_Model_1.default.findOne({ where: { email } });
            if (!userExists)
                return res.json({ message: "Email not register" });
            //
            userExists.password = bcrypt_1.default.hashSync(newPassword, 12);
            yield userExists.save();
            res.status(200).json({ message: "Password chnage successfully!" });
        });
    }
}
_a = Authentication;
// registe user input
Authentication.userRegsiter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
        return res.status(400).json({ message: "All fields are required" });
    // this user email already exits or not
    const userExists = yield users_Model_1.default.findOne({ where: { email } });
    if (userExists)
        return res.status(400).json({ message: "This user already existing" });
    try {
        yield users_Model_1.default.create({
            username,
            email,
            password: bcrypt_1.default.hashSync(password, 12),
        });
        // sned email
        const mailInformation = {
            to: email,
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
      <h2 style="color: #333333; margin-top: 0">Welcome ${username}!</h2>
      <p style="font-size: 16px; color: #555555">
           Your account has been created successfully at The 90's Restaurant & Bar.
        </p>
          <p style="font-size: 16px; color: #555555">
           You can now login and enjoy our services.
        </p>

      <table cellpadding="0" cellspacing="0" style="margin-top: 15px">
         <tr>
              <td align="center" style="padding:20px 0;">
                <span style="font-size:25px; font-weight:bold; color:#000000; background-color:#f1f1f1; padding:15px 30px; border-radius:5px; display:inline-block;">
                 ${email}
                </span>
              </td>
            </tr>
             <tr>
            <td align="center" bgcolor="#2a00e6ff" style="border-radius:5px;">
              <a href="https://your-website-login.com" target="_blank" style="display:inline-block;padding:15px 30px;font-size:16px;color:#ffffff;text-decoration:none;border-radius:5px;">
                Login Now
              </a>
            </td>
            
              
            
            </tr>
          </table>
          <td style="background-color:#f1f1f1; padding:15px; text-align:center; color:#555555; font-size:14px; border-radius:5px;">
                &copy; 2025 The 90's Restaurant & Bar. All rights reserved.<br>
                <a href="https://www.instagram.com/the_90s_restaurant_and_bar/" style="color:#d32f2f; text-decoration:none;">Follow us on Instagram</a>

      
`,
        };
        yield (0, mailSend_1.default)(mailInformation);
        res.status(200).json({ message: "User account created successfuly!" });
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ message: "Something wrong!" });
    }
});
exports.default = Authentication;
// register
// forget password
