import {
  Column,
  DataType,
  Model,
  Table,
  PrimaryKey,
  AutoIncrement,
} from "sequelize-typescript";

@Table({
  tableName: "category",
  timestamps: true,
  modelName: "Category",
})
class Category extends Model {
  // id
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT,
  })
  declare id: number;
  // categoryName
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare categoryName: string;
  // category deescription
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare categoryDescription: string;
}

export default Category;
