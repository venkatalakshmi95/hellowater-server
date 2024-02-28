import { Model, Table, Column, DataType, ForeignKey, BelongsTo, HasMany, DefaultScope } from "sequelize-typescript";
import ProductModel from "./ProductModel";
import Customer from "./CustomerModel";

const defaultScope = {
  attributes: { exclude: ['password'] }
};
@DefaultScope(defaultScope)
@Table({
  tableName: "vendor",
})
export default class VendorModel extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id"
  })
  id?: number;

  @Column({
    type: DataType.STRING(255),
    field: "vendorName"
  })
  vendorName?: string;

  @Column({
    type: DataType.STRING(255),
    field: "email",
    unique: true
  })
  email?: string;

  @Column({
    type: DataType.STRING,
    field: "password"
  })
  password?: string;

  @ForeignKey(() => ProductModel)
  @Column
  productId?: number;

  @BelongsTo(() => ProductModel, 'productId')
  product?: ProductModel

  @HasMany(() => Customer, 'vendorId')
  customers?: Customer[];
}