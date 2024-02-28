import { Model, Table, Column, DataType, DefaultScope, Scopes } from "sequelize-typescript";
const defaultScope = {
  attributes: { exclude: ['password'] }
};

export const scopes = {
  withPassword: {
    attributes: ['id', 'userName', 'email', 'password']
  }
};

export enum UserRole {
  ADMIN="ADMIN",
  CUSTOMER="CUSTOMER",
  VENDOR="VENDOR",
  EXECUTIVE="EXECUTIVE"
}


@DefaultScope(defaultScope)
@Scopes(scopes)

@Table({
  tableName: "user",
})
export default class User extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id"
  })
  id?: number;

  @Column({
    type: DataType.STRING(255),
    field: "userName"
  })
  userName?: string;

  @Column({
    type: DataType.STRING(255),
    field: "email",
    unique:true
  })
  email?: string;

  @Column({
    type: DataType.STRING,
    field: "password"
  })
  password?: string;

  @Column({
    type: DataType.ENUM(...Object.values(UserRole)),
    defaultValue: UserRole.CUSTOMER,
    field: "userRole",
    allowNull: false
  })
  userRole?: UserRole;
}
