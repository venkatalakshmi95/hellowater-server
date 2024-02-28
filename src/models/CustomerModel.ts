import { Model, Table, Column, DataType, ForeignKey, BelongsTo, DefaultScope } from "sequelize-typescript";
import Vendor from "./VendorModel";
import VendorModel from "./VendorModel";
const defaultScope = {
  attributes: { exclude: ['password'] }
};
@DefaultScope(defaultScope)
@Table({
  tableName: "customer",
})
export default class Customer extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id"
  })
  id?: number;

  @Column({
    type: DataType.STRING(255),
    field: "customerName"
  })
  customerName?: string;

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

  @ForeignKey(() => Vendor)
  @Column
  vendorId?: number;

  @BelongsTo(() => Vendor, 'vendorId')
  vendor?: VendorModel
}