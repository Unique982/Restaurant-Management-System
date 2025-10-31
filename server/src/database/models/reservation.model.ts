import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo, Default } from "sequelize-typescript";
import User from "./users.Model";

export type ReservationStatus = "pending" | "confirmed" | "cancelled";

@Table({
  tableName: "reservations",
  modelName: "Reservation",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at"
})
class Reservation extends Model {
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
    type: DataType.INTEGER,
    allowNull: true
  })
  declare table_no: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  declare guests: number;

  @Column({
    type: DataType.DATE,
    allowNull: false
  })
  declare reservation_time: Date;

  @Default("pending")
  @Column({
    type: DataType.ENUM("pending", "confirmed", "cancelled")
  })
  declare status: ReservationStatus;
}

export default Reservation;
