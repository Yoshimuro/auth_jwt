import {db} from "../config/database";
import {DataTypes, Model} from "sequelize";
import {Category} from "./category_model";

export class Requests extends Model{
    id!:number;
    name!:string;
    phone_number:string;
    email!:string;
    description:string;
    question:string;
    city:string;
    category_id:number;
    readonly createdAt!:Date;
    readonly updatedAt!:Date;
}

export interface RequestsInterface{
    id:number;
    name:string;
    phone_number:string;
    email:string;
    description:string;
    question:string;
    city:string;
    category_id:number;
}

Requests.init({
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING(50),
        allowNull:false
    },
    phone_number:{
        type: DataTypes.STRING(13),
        allowNull: false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:true
    },
    description:{
        type:DataTypes.TEXT
    },
    question:{
        type:DataTypes.STRING,
        allowNull:false
    },
    city:{
        type: DataTypes.STRING
    },
    category_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    }

},
    {
        tableName: "Requests",
        sequelize: db
    }
)

Requests.hasMany(Category,{
    sourceKey:"category_id",
    foreignKey:"id",
    as:"category on Request"
})

Requests.sync().then(()=> console.log(`Requests Table created`))