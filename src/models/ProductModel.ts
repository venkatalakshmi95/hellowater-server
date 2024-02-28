
import { Model, Table, Column, DataType, HasMany } from "sequelize-typescript";
import * as _ from "lodash";
import VendorModel from "./VendorModel";

export enum ProductType {
    BOTTLE,
    MINLORRY,
    MAXLORRY
}

@Table({
    tableName: "product",
})
export default class ProductModel extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id"
    })
    id?: number;

    @Column({
        type: DataType.STRING(255),
        field: "productName"
    })
    productName?: string;

    @Column({
        type: DataType.INTEGER,
        field: "productType",
        allowNull: false,
        unique: true,
    })
    productType?: number;

    @Column({
        type: DataType.DECIMAL,
        field: "price"
    })
    price?: string;


    @HasMany(() => VendorModel, 'productId')
    vendors?: VendorModel[];
}