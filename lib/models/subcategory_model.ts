import {db} from "../config/database";
import {DataTypes, Model} from "sequelize";

export class SubCategory extends Model{
    id:number;
    title:string;
    description:string;
    img_subCategory:string;
    readonly createdAt!:Date;
    readonly updatedAt!:Date;
}

export interface SubCategoryInterface {
    title:string;
    description:string;
    img_subCategory:string
}

SubCategory.init({
        id:{
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull:false
        },
        title:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        description:{
            type:DataTypes.TEXT
        },
        img_subCategory:{
            type: DataTypes.STRING,
        },
        id_category:{
            type: DataTypes.INTEGER
        },

    },
    {
        tableName:'subCategory',
        sequelize:db
    })

SubCategory.sync().then(()=> console.log('subCategory Table created'))