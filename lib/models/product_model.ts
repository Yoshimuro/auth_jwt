import { db } from "../config/database";
import { DataTypes, Model } from "sequelize";
import { SubCategory } from "./subcategory_model";

export class Product extends Model {
  id: number;
  title: string;
  description: string;
  img_product: string;
  readonly createdAt!: Date;
  readonly updatedAt!: Date;
}

export interface ProductInterface {
  title: string;
  description: string;
  img_product: string;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    img_product: {
      type: DataTypes.STRING,
    },
    id_subcategory: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "Product",
    sequelize: db,
  }
);

SubCategory.hasMany(Product, {
  sourceKey: "id",
  foreignKey: "id_subcategory",
  as: "product",
});
Product.belongsTo(SubCategory, {
  foreignKey: "id_subcategory",
  as: "product",
});

Product.sync().then(() => console.log("Product Table created"));
