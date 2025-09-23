import { Request, Response } from "express";
import { IExtendedRequest } from "../../../middleware/types/type";
import sequelize from "../../../database/connection";
import { QueryTypes } from "sequelize";

class ReservationBooking {
  static async createReservation(req: IExtendedRequest, res: Response) {
    // const userId = req.user?.id;
    const {
      user_id,
      table_id,
      guests,
      reservation_date,
      reservation_time,
      specailRequest,
      status,
    } = req.body;

    //
    if (
      !table_id ||
      !guests ||
      !reservation_date ||
      !reservation_time ||
      !specailRequest
    )
      return res.status(400).json({ message: "All field required" });
    const tableStatus = await sequelize.query(
      `SELECT id, tableStatus,seats FROM tables WHERE id = ?`,
      {
        type: QueryTypes.SELECT,
        replacements: [table_id],
      }
    );
    const table = (tableStatus as any)[0];
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

    const existingReservation = await sequelize.query(
      `SELECT id FROM reservations WHERE table_id = ?
  AND reservation_date = ?
  AND status IN ('pending','booking')
  AND reservation_time < ADDTIME(?, '01:00:00')
  AND ADDTIME(reservation_time, '01:00:00') > ? `,
      {
        type: QueryTypes.SELECT,
        replacements: [
          user_id,
          table_id,
          reservation_date,
          reservation_time,
          reservation_time,
        ],
      }
    );
    if (reservation_time < "10:00:00" || reservation_time >= "20:00:00")
      return res.status(400).json({
        message: "Reservation time must be between 10:00 AM  and 08:00 Pm",
      });

    if (existingReservation.length > 0)
      return res.status(400).json({
        message: "Sorry, this table is already booked for that date & time",
      });

    // insert query

    await sequelize.query(
      `INSERT INTO reservations(user_id,table_id,guests,reservation_date,reservation_time,status,specailRequest,createdAt,updatedAt)VALUES(?,?,?,?,?,?,?,NOW(),NOW())`,
      {
        type: QueryTypes.INSERT,
        replacements: [
          user_id,
          table_id,
          guests,
          reservation_date,
          reservation_time,
          status,
          specailRequest,
        ],
      }
    );
    console.log();

    res.status(200).json({ message: "Reservation Booking successfully!" });
  }

  static async getReservation(req: IExtendedRequest, res: Response) {
    const reservationData = await sequelize.query(
      `SELECT r.*,  u.username, t.tableNumber
FROM reservations r
JOIN users u ON r.user_id = u.id
JOIN tables t ON r.table_id = t.id`,
      {
        type: QueryTypes.SELECT,
      }
    );
    res.status(200).json({ message: "Fetch all data", data: reservationData });
  }

  static async deleteReservation(req: IExtendedRequest, res: Response) {
    const { id } = req.params;

    const existsId = await sequelize.query(
      `SELECT id FROM reservations WHERE id =?`,
      {
        type: QueryTypes.SELECT,
        replacements: [id],
      }
    );
    if (existsId.length === 0)
      return res.status(200).json({ message: "reservations id not found!" });

    await sequelize.query(`DELETE FROM reservations WHERE id =?`, {
      type: QueryTypes.DELETE,

      replacements: [id],
    });
    res.status(200).json({ message: "Reservation delete successfully!" });
  }

  static async singleReservation(req: IExtendedRequest, res: Response) {
    const { id } = req.params;
    const existsId = await sequelize.query(
      `SELECT *  FROM reservations WHERE id=?`,
      {
        type: QueryTypes.SELECT,
        replacements: [id],
      }
    );
    if (existsId.length === 0) {
      return res.status(400).json({ message: "Reservation id not found!" });
    } else {
      res
        .status(200)
        .json({ message: "single reservation fetch!", data: existsId });
    }
  }

  static async updateReservation(req: IExtendedRequest, res: Response) {
    const { id } = req.params;
    const {
      userId,
      table_id,
      guests,
      reservation_date,
      reservation_time,
      specailRequest,
      status,
    } = req.body;

    //
    if (
      !table_id ||
      !guests ||
      !reservation_date ||
      !reservation_time ||
      !specailRequest
    )
      return res.status(400).json({ message: "All field required" });

    const existsId = await sequelize.query(
      `SELECT id FROM reservations WHERE id=?`,
      {
        type: QueryTypes.SELECT,
        replacements: [id],
      }
    );
    if (existsId.length === 0)
      return res.status(400).json({ message: "Reservation id not found!" });
    const tableStatus = await sequelize.query(
      `SELECT id, tableStatus,seats FROM tables WHERE id != ?`,
      {
        type: QueryTypes.SELECT,
        replacements: [table_id, id],
      }
    );
    const table = (tableStatus as any)[0];
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

    const existingReservation = await sequelize.query(
      `SELECT id FROM reservations WHERE table_id = ?
  AND reservation_date = ?
  AND status IN ('pending','booking')
  AND reservation_time < ADDTIME(?, '01:00:00')
  AND ADDTIME(reservation_time, '01:00:00') > ? AND id!=? `,
      {
        type: QueryTypes.SELECT,
        replacements: [
          table_id,
          reservation_date,
          reservation_time,
          reservation_time,
          id,
        ],
      }
    );
    if (reservation_time < "10:00:00" || reservation_time >= "20:00:00")
      return res.status(400).json({
        message: "Reservation time must be between 10:00 AM  and 08:00 Pm",
      });

    if (existingReservation.length > 0)
      return res.status(400).json({
        message: "Sorry, this table is already booked for that date & time",
      });

    // update querty

    await sequelize.query(
      `UPDATE reservations  SET table_id=?,guests=?,reservation_date=?,reservation_time=?,
      status=?,specailRequest=?,updatedAt=NOW() WHERE id=?`,
      {
        type: QueryTypes.UPDATE,
        replacements: [
          table_id,
          guests,
          reservation_date,
          reservation_time,
          status,
          specailRequest,
          id,
        ],
      }
    );
    res.status(200).json({ message: "Update successfully!" });
  }
}
export default ReservationBooking;
