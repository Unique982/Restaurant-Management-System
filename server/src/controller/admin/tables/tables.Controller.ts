import sequelize from "../../../database/connection";
import { IExtendedRequest } from "../../../middleware/types/type";
import { Response } from "express";
import { QueryTypes } from "sequelize";
class Tables {
  static async createTable(req: IExtendedRequest, res: Response) {
    const { tableNumber, seat, status } = req.body;
    if (!tableNumber || !seat)
      return res.status(400).json({ message: "All filed are required" });

    // check duplicate
    const existsTable = await sequelize.query(
      `SELECT * FROM tables WHERE tableNumber =?`,
      {
        type: QueryTypes.SELECT,
        replacements: [tableNumber],
      }
    );
    if (existsTable.length > 0)
      return res.status(400).json({ message: "Table number already exists!" });

    // insert
    await sequelize.query(
      `INSERT INTO tables (tableNumber,seats,status,createdAt,updatedAt) VALUES(?,?,?,NOW(),NOW())`,
      {
        type: QueryTypes.INSERT,
        replacements: [tableNumber, seat, status],
      }
    );
    res.status(200).json({ message: "Table saved successfully!" });
  }

  // get table all tables

  static async getTables(req: IExtendedRequest, res: Response) {
    const tablesData = await sequelize.query(`SELECT * FROM tables`, {
      type: QueryTypes.SELECT,
    });
    res.status(200).json({ message: "fetch all table!", data: tablesData });
  }

  // delete tables
  static async deleteTable(req: IExtendedRequest, res: Response) {
    const { id } = req.params;
    const existsTable = await sequelize.query(
      `SELECT id FROM tables WHERE id =?`,
      {
        type: QueryTypes.SELECT,
        replacements: [id],
      }
    );
    if (existsTable.length === 0)
      return res.status(400).json({ message: "Tables id not found!" });

    //delete
    await sequelize.query(`DELETE FROM tables WHERE id=?`, {
      type: QueryTypes.DELETE,
      replacements: [id],
    });
    res.status(200).json({ message: "Delete table successfullY" });
  }

  // single tbale fetch
  static async singleTables(req: IExtendedRequest, res: Response) {
    const { id } = req.params;
    const existsTable = await sequelize.query(
      `SELECT id FROM tables WHERE id =?`,
      {
        type: QueryTypes.SELECT,
        replacements: [id],
      }
    );

    if (existsTable.length === 0)
      return res.status(400).json({ message: "Table id not found!" });

    // fetch single data
    const tablesData = await sequelize.query(
      `SELECT * FROM tables WHERE id =?`,
      {
        type: QueryTypes.SELECT,
        replacements: [id],
      }
    );
    res.status(200).json({ message: "Single data fetch", data: tablesData });
  }

  // update table
  static async updateTables(req: IExtendedRequest, res: Response) {
    const { id } = req.params;
    const { tableNumber, seats, status } = req.body;
    if (!tableNumber || !seats)
      return res.status(400).json({ message: "All filed are required!" });

    const existsTable = await sequelize.query(
      `SELECT id FROM tables WHERE id =?`,
      {
        type: QueryTypes.SELECT,
        replacements: [id],
      }
    );
    if (existsTable.length === 0)
      return res.status(400).json({ message: "Table id not found!" });

    // update query

    await sequelize.query(
      `UPDATE tables SET tableNumber=?,seats=?,status=? WHERE id=?`,
      {
        type: QueryTypes.UPDATE,
        replacements: [tableNumber, seats, status, id],
      }
    );
    res.status(200).json({ message: "Update Successfully!" });
  }
}

export default Tables;
