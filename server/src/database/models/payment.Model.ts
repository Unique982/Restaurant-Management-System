import {
  Table,
  Model,
  PrimaryKey,
  AutoIncrement,
  Column,
  DataType,
} from "sequelize-typescript";

@Table({
  tableName: "payments",
  modelName: "Payment",
  timestamps: true,
})
class Payment extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
  declare id: number;

  @Column({
    type: DataType.ENUM("cod", "khalti"),
    allowNull: false,
  })
  declare paymentMethod: string;

  @Column({
    type: DataType.STRING,
  })
  declare pidx: string;
}
export default Payment;
