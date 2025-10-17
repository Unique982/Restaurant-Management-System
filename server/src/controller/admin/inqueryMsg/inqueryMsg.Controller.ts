import { QueryTypes } from "sequelize";
import sequelize from "../../../database/connection";
import { IExtendedRequest } from "../../../middleware/types/type";
import { Response } from "express";

class inqueryMsg {
  static async getAllInqueryMsg(req: IExtendedRequest, res: Response) {
    const userId = req.user?.id;
    const inqueryMsgData = await sequelize.query(`SELECT * FROM contact_us`, {
      type: QueryTypes.SELECT,
    });
    res.status(200).json({ message: "Fetch all data!", data: inqueryMsgData });
  }
}
export default inqueryMsg;
