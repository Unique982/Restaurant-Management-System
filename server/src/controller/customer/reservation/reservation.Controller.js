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
class ReservationTable {
    static createReservation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            const { name, phone, table_id, guests, reservation_date, reservation_time, specailRequest, status, } = req.body;
            //
            if (!name ||
                !phone ||
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
                    userId,
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
            yield connection_1.default.query(`INSERT INTO reservations(user_id,table_id,guests,reservation_date,reservation_time,status,specailRequest,createdAt,updatedAt)VALUES(?,?,?,?,?,?,?,NOW(),NOW())`, {
                type: sequelize_1.QueryTypes.INSERT,
                replacements: [
                    userId,
                    table_id,
                    guests,
                    reservation_date,
                    reservation_time,
                    status,
                    specailRequest,
                ],
            });
            console.log();
            res.status(200).json({ message: "Reservation Booking successfully!" });
        });
    }
    static getMyReservation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            // Check if user is logged in
            if (!userId)
                return res.status(401).json({ message: "Not logged in" });
            // Fetch reservations for this user only
            const reservationData = yield connection_1.default.query(`SELECT r.*, u.username, u.id, t.tableNumber
     FROM reservations r
     JOIN users u ON r.user_id = u.id
     JOIN tables t ON r.table_id = t.id
     WHERE r.user_id = ?`, {
                type: sequelize_1.QueryTypes.SELECT,
                replacements: [userId],
            });
            // Send JSON response
            res.status(200).json({ message: "Fetch all data", data: reservationData });
        });
    }
    /// cancel
    static statusChange(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            const reservationId = req.params.id;
            const { status } = req.body;
            if (!status)
                return res.status(400).json({ message: "Status is required" });
            const exists = yield connection_1.default.query(`SELECT id FROM reservations WHERE id=?`, {
                type: sequelize_1.QueryTypes.SELECT,
                replacements: [reservationId],
            });
            if (exists.length === 0)
                return res.status(400).json({ message: "Reservations id not found!" });
            // update
            const updated = yield connection_1.default.query(`UPDATE reservations SET status = ? WHERE id = ? AND user_id = ?`, {
                type: sequelize_1.QueryTypes.UPDATE,
                replacements: [status, reservationId, userId],
            });
            if (!updated)
                return res
                    .status(403)
                    .json({ message: "You cannot update this reservation" });
            res.status(200).json({ message: "Update successfullY!" });
        });
    }
    // delete
    static deleteReservation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            const reservationId = req.params.id;
            const exists = yield connection_1.default.query(`SELECT id,status FROM reservations WHERE id=?`, {
                type: sequelize_1.QueryTypes.SELECT,
                replacements: [reservationId],
            });
            if (!exists || exists.length === 0)
                return res.status(400).json({ message: "Reservations id not found!" });
            const reservation = exists[0];
            if (reservation.status !== "cancelled") {
                return res
                    .status(400)
                    .json({ message: "Only cancelled reservations can be deleted" });
            }
            // delete
            yield connection_1.default.query(`DELETE  FROM reservations WHERE id = ?`, {
                replacements: [reservationId],
                type: sequelize_1.QueryTypes.DELETE,
            });
            res.status(200).json({ message: "Reservation deleted successfully" });
        });
    }
    // single view
    static singleReservation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            const { id } = req.params;
            const existsId = yield connection_1.default.query(`SELECT * FROM reservations WHERE id = ? AND user_id = ?`, {
                type: sequelize_1.QueryTypes.SELECT,
                replacements: [id, userId],
            });
            if (!existsId || existsId.length === 0) {
                return res.status(404).json({ message: "Reservation id not found!" });
            }
            else {
                res
                    .status(200)
                    .json({ message: "single reservation fetch!", data: existsId });
            }
        });
    }
    //update
    static updateReservationDate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            const { id } = req.params;
            const { table_id, guests, reservation_date, reservation_time, specailRequest, } = req.body;
            // required fields check
            if (!table_id ||
                !guests ||
                !reservation_date ||
                !reservation_time ||
                !specailRequest) {
                return res.status(400).json({ message: "All field required" });
            }
            // reservation exists check
            const existsId = yield connection_1.default.query(`SELECT id FROM reservations WHERE id=? AND user_id=?`, {
                type: sequelize_1.QueryTypes.SELECT,
                replacements: [id, userId],
            });
            if (existsId.length === 0) {
                return res.status(400).json({ message: "Reservation id not found!" });
            }
            // table check
            const tableStatus = yield connection_1.default.query(`SELECT id, tableStatus, seats FROM tables WHERE id = ?`, {
                type: sequelize_1.QueryTypes.SELECT,
                replacements: [table_id],
            });
            const table = tableStatus[0];
            if (table.tableStatus === "unavailable") {
                return res
                    .status(400)
                    .json({ message: "Sorry, this table is unavailable" });
            }
            // guest capacity check
            if (guests > table.seats) {
                return res.status(400).json({
                    message: `Sorry, this table can accommodate only ${table.seats} guests`,
                });
            }
            // already booked check
            const existingReservation = yield connection_1.default.query(`SELECT id FROM reservations 
      WHERE table_id = ?
      AND reservation_date = ?
      AND status IN ('pending','booking')
      AND reservation_time < ADDTIME(?, '01:00:00')
      AND ADDTIME(reservation_time, '01:00:00') > ?
      AND id != ?`, {
                type: sequelize_1.QueryTypes.SELECT,
                replacements: [
                    table_id,
                    reservation_date,
                    reservation_time,
                    reservation_time,
                    id,
                ],
            });
            if (reservation_time < "10:00:00" || reservation_time >= "20:00:00") {
                return res.status(400).json({
                    message: "Reservation time must be between 10:00 AM and 08:00 PM",
                });
            }
            if (existingReservation.length > 0) {
                return res.status(400).json({
                    message: "Sorry, this table is already booked for that date & time",
                });
            }
            // update query (without status)
            yield connection_1.default.query(`UPDATE reservations  
     SET table_id=?, guests=?, reservation_date=?, reservation_time=?, specailRequest=?, updatedAt=NOW() 
     WHERE id=? AND user_id = ?`, {
                type: sequelize_1.QueryTypes.UPDATE,
                replacements: [
                    table_id,
                    guests,
                    reservation_date,
                    reservation_time,
                    specailRequest,
                    id,
                    userId,
                ],
            });
            res.status(200).json({ message: "Update successfully!" });
        });
    }
}
exports.default = ReservationTable;
