import { Request, Response } from "express";
import { IExtendedRequest } from "../../../middleware/types/type";
class ReservationBooking {
  static async createReservation(req: Request, res: Response) {
    const {
      tableId,
      customerName,
      phoneNumber,
      email,
      date,
      time,
      guest,
      specailRequest,
      status,
    } = req.body;

    //
    if (
      !tableId ||
      !customerName ||
      !phoneNumber ||
      !email ||
      !date ||
      !time ||
      !guest ||
      !specailRequest ||
      !status
    )
      return res.status(400).json({ message: "All field required" });
  }

  static async getReservation(req: IExtendedRequest, Res: Response) {}

  static async deleteReservation(req: IExtendedRequest, Res: Response) {}

  static async singleReservation(req: IExtendedRequest, res: Response) {}

  static async updateReservation(req: IExtendedRequest, res: Response) {}
}
export default ReservationBooking;
