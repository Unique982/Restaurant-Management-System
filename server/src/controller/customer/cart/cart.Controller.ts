import { QueryTypes } from "sequelize";
import sequelize from "../../../database/connection";
import { IExtendedRequest } from "../../../middleware/types/type";
import { Response } from "express";

class MyCart {
  static async createCart(req: IExtendedRequest, res: Response) {
    const userId = req.user?.id;
    console.log("Kun user", userId);
    const { menu_item_id, quantity } = req.body;
    if (!quantity || !menu_item_id) {
      return res
        .status(400)
        .json({ message: "Please provide quantity and product" });
    }
    // check ifmenu item exits or not
    const [menuItems]: any = await sequelize.query(
      `SELECT id FROM menu_items WHERE id =?`,
      {
        type: QueryTypes.SELECT,
        replacements: [menu_item_id],
      }
    );
    if (!menuItems) {
      return res.status(404).json({ message: "Menu Items not found!" });
    }
    // check if user alerdy cart or not
    const [cart]: any = await sequelize.query(
      `SELECT id  FROM carts WHERE user_id =?`,
      {
        type: QueryTypes.SELECT,
        replacements: [userId],
      }
    );
    let cartId: number;
    if (!cart) {
      const [newCartId] = await sequelize.query(
        `INSERT INTO carts(user_id,createdAt,updatedAt)VALUES(?,NOW(),NOW())`,
        {
          type: QueryTypes.INSERT,
          replacements: [userId],
        }
      );
      cartId = newCartId;
    } else {
      cartId = cart.id;
    }

    //check if same item already exists in cart ma xa vanni update grw
    const [existsItems]: any = await sequelize.query(
      `SELECT id,quantity FROM cart_items WHERE cart_id =? AND menu_item_id=?`,
      {
        type: QueryTypes.SELECT,
        replacements: [cartId, menu_item_id],
      }
    );
    if (existsItems) {
      await sequelize.query(
        `UPDATE cart_items 
   SET quantity = quantity + ?, updatedAt = NOW() 
   WHERE id = ?`,
        {
          type: QueryTypes.UPDATE,
          replacements: [quantity, existsItems.id],
        }
      );

      return res.status(200).json({
        message: "Cart Item quantity update successfully",
        cart_id: cartId,
      });
      //insert query
    }
    await sequelize.query(
      `INSERT INTO cart_items(cart_id,menu_item_id,quantity,createdAt,updatedAt)VALUES(?,?,?,NOW(),NOW())`,
      {
        type: QueryTypes.INSERT,
        replacements: [cartId, menu_item_id, quantity],
      }
    );
    res
      .status(200)
      .json({ message: "Item added to cart successfully!", cartId: cartId });
  }
  // get
  static async getCart(req: IExtendedRequest, res: Response) {
    const userId = req.user?.id;
    const cartData = await sequelize.query(
      `SELECT * FROM carts WHERE user_id = ?`,
      {
        type: QueryTypes.SELECT,
        replacements: [userId],
      }
    );

    res
      .status(200)
      .json({ message: "Cart data fetched successfully!", data: cartData });
  }

  // delete cart
  static async deleteCart(req: IExtendedRequest, res: Response) {
    const userId = req.user?.id;
    const cartId = req.params.id;
  }
}

export default MyCart;
