import { QueryTypes } from "sequelize";
import sequelize from "../../../database/connection";
import { IExtendedRequest } from "../../../middleware/types/type";
import { Response } from "express";

class About {
  static async aboutSection(req: IExtendedRequest, res: Response) {
    const { aboutTitle, aboutDescription } = req.body;
    const aboutImage = req.file ? req.file.path : null;
    console.log(req.body);
    if (!aboutTitle || !aboutDescription || !aboutImage)
      return res.status(400).json({ message: "All field required!" });
    // check record exists or not
    const exists: any[] = await sequelize.query(`SELECT * FROM about LIMIT 1`, {
      type: QueryTypes.SELECT,
    });

    if (exists.length > 0) {
      const aboutId = exists[0].id;

      // exits id ko data lai update garnu paro
      await sequelize.query(
        `UPDATE about SET aboutTitle=?, aboutDescription=?, aboutImage=?, updatedAt=NOW() 
WHERE id=?`,
        {
          type: QueryTypes.UPDATE,
          replacements: [aboutTitle, aboutDescription, aboutImage, aboutId],
        }
      );
      return res.status(200).json({ message: "About Update successful!" });
    } else {
      await sequelize.query(
        `INSERT INTO about (aboutTitle,aboutDescription,aboutImage,createdAt) VALUE(?,?,?,NOW())`,
        {
          type: QueryTypes.INSERT,
          replacements: [aboutTitle, aboutDescription, aboutImage],
        }
      );
      return res.status(200).json({ message: "About create successfully!" });
    }
  }

  // get about

  static async getAbout(req: IExtendedRequest, res: Response) {
    const aboutData = await sequelize.query(`SELECT * FROM about`, {
      type: QueryTypes.SELECT,
    });
    res.status(200).json({ message: "fetch", data: aboutData });
  }
}

export default About;
