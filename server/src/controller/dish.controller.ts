import { Request, Response } from "express";
import sequelize from "../database/connection";
import { QueryTypes } from "sequelize";

class DishController {
  // Create new dish
  static async createDish(req: Request, res: Response) {
    try {
      const { name, price, category_id, description, image, status } = req.body;

      if (!name || !price || !category_id || !description) {
        return res.status(400).json({ message: "All fields required!" });
      }

      // Check duplicate dish
      const exists = await sequelize.query(
        `SELECT * FROM dishes WHERE name=? AND category_id=?`,
        {
          type: QueryTypes.SELECT,
          replacements: [name, category_id],
        }
      );

      if (exists.length > 0) {
        return res.status(400).json({ message: "Dish already exists!" });
      }

      // Insert query
      await sequelize.query(
        `INSERT INTO dishes(name, price, category_id, description, image, status, created_at, updated_at)
         VALUES (?,?,?,?,?,?,NOW(),NOW())`,
        {
          type: QueryTypes.INSERT,
          replacements: [name, price, category_id, description, image || null, status || "available"],
        }
      );

      res.status(201).json({ message: "Dish added successfully!" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get all dishes
  static async getDishes(req: Request, res: Response) {
    try {
      const dishes = await sequelize.query(
        `SELECT d.*, c.categoryName 
         FROM dishes d 
         LEFT JOIN category c ON d.category_id = c.id`,
        {
          type: QueryTypes.SELECT,
        }
      );

      res.status(200).json({ message: "Dishes fetched successfully!", data: dishes });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get single dish
  static async singleDish(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const dish = await sequelize.query(
        `SELECT d.*, c.categoryName 
         FROM dishes d 
         LEFT JOIN category c ON d.category_id = c.id
         WHERE d.id=?`,
        {
          type: QueryTypes.SELECT,
          replacements: [id],
        }
      );

      if (dish.length === 0) {
        return res.status(404).json({ message: "Dish not found!" });
      }

      res.status(200).json({ message: "Single dish fetched!", data: dish[0] });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Update dish
  static async editDish(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, price, category_id, description, image, status } = req.body;

      if (!name || !price || !category_id || !description) {
        return res.status(400).json({ message: "All fields required!" });
      }

      const exists = await sequelize.query(
        `SELECT id FROM dishes WHERE id=?`,
        {
          type: QueryTypes.SELECT,
          replacements: [id],
        }
      );

      if (exists.length === 0) {
        return res.status(404).json({ message: "Dish not found!" });
      }

      await sequelize.query(
        `UPDATE dishes 
         SET name=?, price=?, category_id=?, description=?, image=?, status=?, updated_at=NOW()
         WHERE id=?`,
        {
          type: QueryTypes.UPDATE,
          replacements: [name, price, category_id, description, image || null, status || "available", id],
        }
      );

      res.status(200).json({ message: "Dish updated successfully!" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Delete dish
  static async deleteDish(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const exists = await sequelize.query(
        `SELECT id FROM dishes WHERE id=?`,
        {
          type: QueryTypes.SELECT,
          replacements: [id],
        }
      );

      if (exists.length === 0) {
        return res.status(404).json({ message: "Dish not found!" });
      }

      await sequelize.query(`DELETE FROM dishes WHERE id=?`, {
        type: QueryTypes.DELETE,
        replacements: [id],
      });

      res.status(200).json({ message: "Dish deleted successfully!" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default DishController;
