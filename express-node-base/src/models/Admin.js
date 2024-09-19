// src/models/Admin.js
const { DataTypes } = require('sequelize');
const sequelize = require('../configs/connections/postgresql'); // Adjust path as needed

const Admin = sequelize.define('Admin', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
    role: {
        type: DataTypes.STRING,
        defaultValue: 'admin'
    }
}, {
    tableName: 'admins',
    timestamps: false
});

module.exports = Admin;
