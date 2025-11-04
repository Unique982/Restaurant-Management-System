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
exports.KhaltiPayment = void 0;
const axios_1 = __importDefault(require("axios"));
//ttps://dev.khalti.com/api/v2/epayment/initiate/
const KhaltiPayment = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.post("https://dev.khalti.com/api/v2/epayment/initiate/", {
        return_url: data.return_url,
        website_url: data.website_url,
        amount: Math.round(data.amount * 100),
        purchase_order_id: data.purchase_order_id,
        purchase_name: data.purchase_name,
    }, {
        headers: {
            Authorization: "Key 33ef2fcffa374d26b98c68a9f2c13f62",
        },
    });
    return response;
});
exports.KhaltiPayment = KhaltiPayment;
