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
const connection_1 = __importDefault(require("../../database/connection"));
const sequelize_1 = require("sequelize");
class BookingTable {
    static createReservation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, phoneNumber, table_id, guests, reservation_date, reservation_time, specailRequest, status, } = req.body;
            //
            if (!name ||
                !phoneNumber ||
                !table_id ||
                !guests ||
                !reservation_date ||
                !reservation_time ||
                !specailRequest)
                return res.status(400).json({ message: "All field required" });
            console.log(req.body);
            const tableStatus = yield connection_1.default.query(`SELECT id, tableStatus,seats FROM tables WHERE id = ?`, {
                type: sequelize_1.QueryTypes.SELECT,
                replacements: [table_id],
            });
            const table = tableStatus[0];
            if (table.tableStatus === "unavailable")
                return res
                    .status(400)
                    .json({ message: "Sorry, this table is unavailable" });
            // total number of guests == totalnumber seats seata kati janna xa ai guest katijanna xan
            if (guests > table.seats)
                return res.status(400).json({
                    message: `Sorry, this table can accommodate only ${table.seats} guests`,
                });
            // user select garay ko tyo date ma kunai user la table booked garay ko xa ki nai
            const existingReservation = yield connection_1.default.query(`SELECT id FROM reservations WHERE table_id = ?
  AND reservation_date = ?
  AND status IN ('pending','booking')
  AND reservation_time < ADDTIME(?, '01:00:00')
  AND ADDTIME(reservation_time, '01:00:00') > ? `, {
                type: sequelize_1.QueryTypes.SELECT,
                replacements: [
                    table_id,
                    reservation_date,
                    reservation_time,
                    reservation_time,
                ],
            });
            if (reservation_time < "10:00:00" || reservation_time >= "20:00:00")
                return res.status(400).json({
                    message: "Reservation time must be between 10:00 AM  and 08:00 Pm",
                });
            if (existingReservation.length > 0)
                return res.status(400).json({
                    message: "Sorry, this table is already booked for that date & time",
                });
            // insert query
            yield connection_1.default.query(`INSERT INTO reservations(user_id,table_id,guests,reservation_date,reservation_time,status,  specailRequest,createdAt,updatedAt,name,phoneNumber)VALUES (?, ?, ?, ?, ?, ?, ?,NOW(), NOW(),?,?)`, {
                type: sequelize_1.QueryTypes.INSERT,
                replacements: [
                    null,
                    table_id,
                    guests,
                    reservation_date,
                    reservation_time,
                    "pending",
                    specailRequest,
                    name,
                    phoneNumber,
                ],
            });
            console.log();
            res.status(200).json({ message: "Reservation Booking successfully!" });
        });
    }
}
exports.default = BookingTable;
