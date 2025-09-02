import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo, Default } from "sequelize-typescript";
import User from "./users.Model";

export type OrderType = "dine-in" | "takeaway" | "delivery";
export type OrderStatus = "pending" | "confirmed" | "preparing" | "ready" | "completed" | "cancelled";
export type PaymentMethod = "cash" | "esewa" | "khalti";

@Table({
  tableName: "orders",
  modelName: "Order",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at"
})
class Order extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT
  })
  declare id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.BIGINT,
    allowNull: false
  })
  declare user_id: number;

  @BelongsTo(() => User, "user_id")
  declare customer: User;

  @Column({
    type: DataType.ENUM("dine-in", "takeaway", "delivery"),
    allowNull: false
  })
  declare order_type: OrderType;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false
  })
  declare total_price: number;

  @Default("pending")
  @Column({
    type: DataType.ENUM("pending", "confirmed", "preparing", "ready", "completed", "cancelled")
  })
  declare status: OrderStatus;

  @Default("cash")
  @Column({
    type: DataType.ENUM("cash", "esewa", "khalti")
  })
  declare payment_method: PaymentMethod;
}

export default Order;
