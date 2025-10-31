import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement } from "sequelize-typescript";

@Table({
  tableName: "categories", // DB table name
  modelName: "Category",   // model name inside project
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at"
})
class Category extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  declare categoryName: string;
}

export default Category;
