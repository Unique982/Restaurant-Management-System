import {
  AutoIncrement,
  Column,
  PrimaryKey,
  Table,
  DataType,
  Model,
} from "sequelize-typescript";

@Table({
  tableName: "Setting",
  timestamps: true,
  modelName: "Setting",
})
class Setting extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  declare id: number;
  @Column({ type: DataType.STRING })
  declare RestaurantName: string;

  @Column({ type: DataType.STRING })
  declare contactNumber: string;
  @Column({ type: DataType.STRING })
  declare logo: string;
  @Column({ type: DataType.STRING })
  declare email: string;
  @Column({ type: DataType.STRING })
  declare address: string;
  @Column({ type: DataType.DATE })
  declare openingTime: Date;
  @Column({ type: DataType.DATE })
  declare closingTime: Date;
}
export default Setting;
