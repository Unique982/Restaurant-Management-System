<<<<<<< HEAD
import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
} from "sequelize-typescript";
import { userRole } from "../../middleware/types/type";

// column fileds
// id, userName,email,password,role->enum('customer','admin'), facebook and google login

@Table({
  tableName: "users",
  timestamps: true,
  modelName: "User",
})
class User extends Model {
  // id col
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  declare id: number;

  // userName
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare username: string;

  // email
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare email: string;

  // password
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare password: string;

  // user role
  @Column({
    type: DataType.ENUM("customer", "admin"),
    defaultValue: "customer",
  })
  declare role: userRole;

  // google login
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare google_id: string;

  // facebook
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare facebook_id: string;

  //otp
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare otp: number;
  // otp exp
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  declare otp_exp: Date;
}

export default User;
=======
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
>>>>>>> fb35e2af63cda14e17943774b4a92e04452ece25
