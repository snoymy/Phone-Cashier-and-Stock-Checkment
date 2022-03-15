import {DataTypes, Model} from "sequelize";
import db from "../config/database.config"

interface CompModel{
    id: string;
    barcode: string;
    title: string;
    quantity: string;
    price: string;
    contact: string;
    address: string;
}

export class Company extends Model<CompModel> {}

//Create Table
Company.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        barcode:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        title:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        quantity:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        price:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        contact:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        address:{
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: db,
        tableName: "lists",
    }
);