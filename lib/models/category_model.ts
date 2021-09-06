import {db} from "../config/database";
import {DataTypes, Model} from "sequelize";

export class Category extends Model{
    id:number;
    title:string;
    description:string;
    img_category:string;
    readonly createdAt!:Date;
    readonly updatedAt!:Date;
}

export interface CategoryInterface {
    title:string;
    description:string;
    img_category:string
}

Category.init({
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
        tableName:'Category',
        sequelize:db
    })

Category.sync().then(()=> console.log('category Table created'))