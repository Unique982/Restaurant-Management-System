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
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../../database/connection"));
class Service {
    static addService(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { serviceTitle, serviceDescription } = req.body;
            const serviceIcon = req.file ? req.file.path : null;
            if (!serviceTitle || !serviceDescription || !serviceIcon)
                return res.status(400).json("All filed are required");
            // check duplicate
            const exists = yield connection_1.default.query(`SELECT * FROM service LIMIT 7 `, {
                type: sequelize_1.QueryTypes.SELECT,
            });
            if (exists.length > 0)
                return res.status(400).json("Already exists service");
            // insert query
            yield connection_1.default.query(`INSERT INTO service(serviceIcon,serviceTitle,serviceDescription,createdAt,updatedAt) VALUES(?,?,?,NOW(),NOW())`, {
                type: sequelize_1.QueryTypes.INSERT,
                replacements: [serviceIcon, serviceTitle, serviceDescription],
            });
            res.status(200).json({ message: "Added Successfully" });
        });
    }
    // get all service
    static getService(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const serviceData = yield connection_1.default.query(`SELECT * FROM service`, {
                type: sequelize_1.QueryTypes.SELECT,
            });
            res
                .status(200)
                .json({ message: "All service fetch data!", data: serviceData });
        });
    }
}
exports.default = Service;
