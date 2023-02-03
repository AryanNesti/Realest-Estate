const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('homes', {
        email:{
            allowNull: false,
            type: DataTypes.STRING
        },
        homeID:{
            allowNull: false,
            type: DataTypes.STRING
        }
    },{
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    });
};
