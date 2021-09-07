import {db} from "../config/database";
import {DataTypes, Model} from "sequelize";

export class User extends Model {
    id!: string;
    name!: string;
    email!: string;
    password!: string;
    role!: string;
    isActivated: boolean;
    linkActivated:string;
    readonly createdAt!: Date;
    readonly updatedAt!: Date;
}

export default interface UserInterface extends Model {
    name: string;
    email: string;
    password: string;
    isActivated: boolean;
    linkActivated:string;
    role: string;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull:false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isActivated:{
          type:DataTypes.BOOLEAN,
            defaultValue: false
        },
        activationLink:{
          type:DataTypes.STRING
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "USER",
        },
    },
    {
        tableName: "users",
        sequelize: db,
    }
);

User.sync().then(() => console.log("users Table created"));
