const { DataTypes } = require('sequelize');
const sequelize = require('../configs/connections/postgresql');

const Teacher = sequelize.define('Teacher', {
    teacher_id: {
        type: DataTypes.STRING(45),
        primaryKey: true,
        allowNull: false
    },
    teacher_name: {
        type: DataTypes.STRING(80),
        allowNull: false
    },
    teacher_dateofbirth: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    teacher_gender: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    teacher_address: {
        type: DataTypes.STRING(80),
        allowNull: false
    },
    teacher_phone: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    teacher_email: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    teacher_department: {
        type: DataTypes.STRING(80),
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    updated_at: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    created_by: {
        type: DataTypes.STRING(80),
        allowNull: false
    },
    updated_by: {
        type: DataTypes.STRING(80),
        allowNull: false
    }
}, {
    tableName: 'teacher',
    timestamps: false
});

module.exports = Teacher;
