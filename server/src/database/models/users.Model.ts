import { Table, Column, Model, DataType, PrimaryKey, Default } from "sequelize-typescript";

export type UserRole = "user" | "admin" | "staff"; // role type defined here

@Table({
  tableName: "users",   // database table name ha
  modelName: "User",          // model name inside project
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at"
})
class User extends Model {
  @PrimaryKey
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare userName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true }
  })
  declare userEmail: string;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  declare phoneNumber: string;

  @Default("user")
  @Column({
    type: DataType.ENUM("user", "admin", "staff"),
    allowNull: false
  })
  declare role: UserRole;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare password: string;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  declare otp: string;

  @Column({
    type: DataType.DATE,
    allowNull: true
  })
  declare expires_at: Date;
}

export default User;
