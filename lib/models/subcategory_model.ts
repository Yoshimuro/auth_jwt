import { db } from "../config/database";
import { DataTypes, Model } from "sequelize";
import { Category } from "./category_model";
import { Product } from "./product_model";

export class SubCategory extends Model {
  id: number;
  title: string;
  description: string;
  img_subCategory: string;
  readonly createdAt!: Date;
  readonly updatedAt!: Date;
}

export interface SubCategoryInterface {
  title: string;
  description: string;
  img_subCategory: string;
}

SubCategory.init(
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
    id_category: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "subCategory",
    sequelize: db,
  }
);

Category.hasMany(SubCategory, {
  sourceKey: "id",
  foreignKey: "id_category",
  as: "Subcategory",
});

SubCategory.belongsTo(Category, {
  foreignKey: "id_category",
  as: "Subcategory",
});

SubCategory.sync().then(() => console.log("subCategory Table created"));
