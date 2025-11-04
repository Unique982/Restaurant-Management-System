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
const connection_1 = __importDefault(require("../../../database/connection"));
const sequelize_1 = require("sequelize");
const server_1 = require("../../../../server");
class ReservationBooking {
    // create Reservation
    static createReservation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // const userId = req.user?.id;
            const { user_id, table_id, guests, reservation_date, reservation_time, specailRequest, status, } = req.body;
            //
            if (!table_id ||
                !guests ||
                !reservation_date ||
                !reservation_time ||
                !specailRequest)
                return res.status(400).json({ message: "All field required" });
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
                    user_id,
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
            const [result] = yield connection_1.default.query(`INSERT INTO reservations(user_id,table_id,guests,reservation_date,reservation_time,status,specailRequest,createdAt,updatedAt)VALUES(?,?,?,?,?,?,?,NOW(),NOW())`, {
                type: sequelize_1.QueryTypes.INSERT,
                replacements: [
                    user_id,
                    table_id,
                    guests,
                    reservation_date,
                    reservation_time,
                    status,
                    specailRequest,
                ],
            });
            console.log();
            (0, server_1.getIO)().emit("reservationAdded", {
                id: result,
                user_id,
                table_id,
                guests,
                reservation_date,
                reservation_time,
                status,
                specailRequest,
            });
            res.status(200).json({ message: "Reservation Booking successfully!" });
        });
    }
    // get Reservation
    static getReservation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const reservationData = yield connection_1.default.query(`SELECT r.*,  u.username, t.tableNumber
FROM reservations r
JOIN users u ON r.user_id = u.id
JOIN tables t ON r.table_id = t.id WHERE r.deleted_at IS NULL
   ORDER BY r.createdAt DESC`, {
                type: sequelize_1.QueryTypes.SELECT,
            });
            res.status(200).json({ message: "Fetch all data", data: reservationData });
        });
    }
    // delete Reservation
    static deleteReservation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const existsId = yield connection_1.default.query(`SELECT id FROM reservations WHERE id =?`, {
                type: sequelize_1.QueryTypes.SELECT,
                replacements: [id],
            });
            if (existsId.length === 0)
                return res.status(200).json({ message: "reservations id not found!" });
            yield connection_1.default.query(`DELETE FROM reservations WHERE id =?`, {
                type: sequelize_1.QueryTypes.DELETE,
                replacements: [id],
            });
            (0, server_1.getIO)().emit("reservationDeleted", { id });
            res.status(200).json({ message: "Reservation delete successfully!" });
        });
    }
    // single Reservation
    static singleReservation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const existsId = yield connection_1.default.query(`SELECT *  FROM reservations WHERE id=?`, {
                type: sequelize_1.QueryTypes.SELECT,
                replacements: [id],
            });
            if (existsId.length === 0) {
                return res.status(400).json({ message: "Reservation id not found!" });
            }
            else {
                res
                    .status(200)
                    .json({ message: "single reservation fetch!", data: existsId });
            }
        });
    }
    // update Reservation
    static updateReservation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { userId, table_id, guests, reservation_date, reservation_time, specailRequest, status, } = req.body;
            //
            if (!table_id ||
                !guests ||
                !reservation_date ||
                !reservation_time ||
                !specailRequest)
                return res.status(400).json({ message: "All field required" });
            const existsId = yield connection_1.default.query(`SELECT id FROM reservations WHERE id=?`, {
                type: sequelize_1.QueryTypes.SELECT,
                replacements: [id],
            });
            if (existsId.length === 0)
                return res.status(400).json({ message: "Reservation id not found!" });
            const tableStatus = yield connection_1.default.query(`SELECT id, tableStatus,seats FROM tables WHERE id != ?`, {
                type: sequelize_1.QueryTypes.SELECT,
                replacements: [table_id, id],
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
  AND ADDTIME(reservation_time, '01:00:00') > ? AND id!=? `, {
                type: sequelize_1.QueryTypes.SELECT,
                replacements: [
                    table_id,
                    reservation_date,
                    reservation_time,
                    reservation_time,
                    id,
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
            // update querty
            yield connection_1.default.query(`UPDATE reservations  SET table_id=?,guests=?,reservation_date=?,reservation_time=?,
      status=?,specailRequest=?,updatedAt=NOW() WHERE id=?`, {
                type: sequelize_1.QueryTypes.UPDATE,
                replacements: [
                    table_id,
                    guests,
                    reservation_date,
                    reservation_time,
                    status,
                    specailRequest,
                    id,
                ],
            });
            (0, server_1.getIO)().emit("reservationUpdated", {
                id,
                table_id,
                guests,
                reservation_date,
                reservation_time,
                status,
                specailRequest,
            });
            res.status(200).json({ message: "Update successfully!" });
        });
    }
    // soft delete Reservation
    static softDeleteReservation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const idExists = yield connection_1.default.query(`SELECT id FROM reservations WHERE id=?`, {
                type: sequelize_1.QueryTypes.SELECT,
                replacements: [id],
            });
            if (!idExists || idExists.length === 0)
                return res.status(400).json({ message: "Reservations id not found!" });
            // reservations
            yield connection_1.default.query(`UPDATE reservations SET deleted_at=Now() WHERE id=?`, {
                type: sequelize_1.QueryTypes.UPDATE,
                replacements: [id],
            });
            (0, server_1.getIO)().emit("orderDeleted", { order_id: id });
            res.status(200).json({ message: "Soft delete successfully!" });
        });
    }
    // recover delete Reservation
    static restoreDeleteReservation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const idExists = yield connection_1.default.query(`SELECT id FROM reservations WHERE id=?`, {
                type: sequelize_1.QueryTypes.SELECT,
                replacements: [id],
            });
            yield connection_1.default.query(`UPDATE reservations SET deleted_at=NULL WHERE id=?`, {
                type: sequelize_1.QueryTypes.UPDATE,
                replacements: [id],
            });
            (0, server_1.getIO)().emit("orderAdded", { order_id: id });
            res.status(200).json({ message: "Reservations restore successfully!" });
        });
    }
    // status update Reservation
    static statusUpdateReservation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { status } = req.body;
            if (!status) {
                return res.status(400).json({ message: "Status is required" });
            }
            // Check if order exists
            const orderExists = yield connection_1.default.query(`SELECT id, status FROM reservations WHERE id = ?`, { type: sequelize_1.QueryTypes.SELECT, replacements: [id] });
            if (!orderExists || orderExists.length === 0) {
                return res.status(404).json({ message: "Reservations Id not found" });
            }
            // Update only status
            yield connection_1.default.query(`UPDATE reservations SET status = ?, updatedAt = NOW() WHERE id = ?`, { type: sequelize_1.QueryTypes.UPDATE, replacements: [status, id] });
            // socket update
            (0, server_1.getIO)().emit("reservationsUpdated", { order_id: id, status });
            return res
                .status(200)
                .json({ message: "Reservations status updated successfully" });
        });
    }
}
exports.default = ReservationBooking;
