import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
} from "sequelize-typescript";

// column fileds
// id, userName,email,password,role->enum('customer','admin'),

@Table({
  tableName: "users",
  timestamps: true,
  modelName: "User",
})
class User extends Model {
  // id col
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;
  // userName
  @Column({
    type: DataType.STRING,
  })
  declare userName: string;

  // password
  @Column({
    type: DataType.STRING,
  })
  declare password: string;
  @Column({
    type: DataType.ENUM("customer", "admin"),
    defaultValue: "customer",
  })
  declare role: string;
}

export default User;
