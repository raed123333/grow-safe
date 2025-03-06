const {DataTypes, Sequelize} =require("sequelize");
const sequelize = require("../config/db");
const Parent=require("./Parent");
const Enfant=require("./Enfant");

const Messenger = sequelize.define("Messenger", {
        idmess:{
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
        },
        sender_id: {
                type: DataTypes.INTEGER,
           
        },
        reciever_id:{
                type: DataTypes.INTEGER,
          
        },
        message:{
                type: DataTypes.STRING,
                allowNull: false,
        },
        message_time: {
                type: DataTypes.DATE,
                defaultValue: Sequelize.NOW
        }
},{
        tableName: 'messenger',
        timestamps: false
    });
 

module.exports = Messenger;   
