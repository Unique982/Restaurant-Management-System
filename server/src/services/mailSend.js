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
const nodemailer_1 = __importDefault(require("nodemailer"));
// mail dnamic
// static mailer
const mailSend = (mailInformation) => __awaiter(void 0, void 0, void 0, function* () {
    // transport create garnu paro // servic and auth ko kura dinu paro
    const transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            user: process.env.NODEMAILER_USERNAME,
            pass: process.env.NODEMAILER_PASSWORD,
        },
    });
    // formate
    const mailFormated = {
        from: `The 90's Restaurant & Bar ${process.env.NODEMAILER_USERNAME}`,
        to: mailInformation.to,
        subject: mailInformation.subject,
        html: mailInformation.text,
    };
    try {
        yield transporter.sendMail(mailFormated);
    }
    catch (err) {
        console.log(err);
    }
});
exports.default = mailSend;
