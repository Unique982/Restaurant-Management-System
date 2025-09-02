import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo, Default } from "sequelize-typescript";
import Category from "./category.model";

export type DishStatus = "available" | "unavailable";

@Table({
  tableName: "dishes",
  modelName: "Dish",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at"
})
class Dish extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  declare description: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false
  })
  declare price: number;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.BIGINT,
    allowNull: true
  })
  declare category_id: number;

  @BelongsTo(() => Category, "category_id")
  declare category: Category;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  declare image: string;

  @Default("available")
  @Column({
    type: DataType.ENUM("available", "unavailable")
  })
  declare status: DishStatus;
}

export default Dish;
