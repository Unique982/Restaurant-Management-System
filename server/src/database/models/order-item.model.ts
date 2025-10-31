import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo } from "sequelize-typescript";
import Order from "./order.model";
import Dish from "./dish.model";

@Table({
  tableName: "order_items",
  modelName: "OrderItem",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at"
})
class OrderItem extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT
  })
  declare id: number;

  @ForeignKey(() => Order)
  @Column({
    type: DataType.BIGINT,
    allowNull: false
  })
  declare order_id: number;

  @BelongsTo(() => Order, "order_id")
  declare order: Order;

  @ForeignKey(() => Dish)
  @Column({
    type: DataType.BIGINT,
    allowNull: false
  })
  declare dish_id: number;

  @BelongsTo(() => Dish, "dish_id")
  declare dish: Dish;

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  declare quantity: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false
  })
  declare price: number;
}

export default OrderItem;
