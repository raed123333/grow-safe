const {DataTypes} =require("sequelize");
const sequelize = require("../config/db");

const Enfant =  sequelize.define("Enfant", {
        idenf: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nom: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        prenom: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        motpasse: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        idp: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Parents',
                key: 'idp',
        },
        onDelete: "CASCADE", // Si un parent est supprimé, ses enfants le seront aussi
      
        },
    },
);

module.exports = Enfant;