import {db} from "../config/database";
import {DataTypes, Model} from "sequelize";


export class User extends Model{
    id!: string
    email!: string
    password!: string
    role!: string
    readonly createdAt!:Date;
    readonly updatedAt!:Date;
}
export interface UserInterface extends Model{
    email: string
    password:string;
    role:string;
}

User.init({
    id:{
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    role:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "USER"
    }
},{
    tableName:"users",
    sequelize:db
        }
)

User.sync().then(()=> console.log("users Table created"))


