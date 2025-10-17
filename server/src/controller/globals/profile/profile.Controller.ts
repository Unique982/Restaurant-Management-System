import { QueryTypes } from "sequelize";
import sequelize from "../../../database/connection";
import { IExtendedRequest } from "../../../middleware/types/type";
import { Response } from "express";
class MyProfile {
  static async updatedProfile(req: IExtendedRequest, res: Response) {
    const userId = req.user?.id;
    const { username, email } = req.body;
    const usernameValue = username ?? null;
    const emailValue = email ?? null;

    // update data
    await sequelize.query(
      `UPDATE users SET username = COALESCE(?, username), email = COALESCE(?, email), updatedAt = NOW() WHERE id = ?`,
      {
        type: QueryTypes.UPDATE,
        replacements: [usernameValue, emailValue, userId],
      }
    );
    // fetch user data
    const [userData]: any = await sequelize.query(
      `SELECT * FROM users WHERE id=?`,
      {
        type: QueryTypes.SELECT,
        replacements: [userId],
      }
    );
    res
      .status(200)
      .json({ message: "Profile updated successfully", data: userData });
  }
}
export default MyProfile;
