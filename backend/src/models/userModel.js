const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('users', {
        name:{
            allowNull: false,
            type: DataTypes.STRING
        },
        email:{
            primaryKey: true,
            allowNull: false,
            type: DataTypes.STRING
        },
        password:{
            allowNull: false,
            type: DataTypes.STRING
        }
    },{
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    });
};
