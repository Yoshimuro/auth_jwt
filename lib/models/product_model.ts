import {db} from "../config/database";
import {DataTypes, Model} from "sequelize";

export class Product extends Model{
    id:number;
    title:string;
    description:string;
    img_product:string;
    readonly createdAt!:Date;
    readonly updatedAt!:Date;
}

export interface ProductInterface {
    title:string;
    description:string;
    img_product:string
}

Product.init({
        id:{
            type: DataTypes.INTEGER,
            primaryKey:true,
            allowNull:false
        },
        title:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        description:{
            type:DataTypes.TEXT
        },
        img_product:{
            type: DataTypes.STRING,
        }
    },
    {
        tableName:'Product',
        sequelize:db
    })

Product.sync().then(()=> console.log('Product Table created'))