const { DataTypes } = require('sequelize');
const sequelize = require('../configs/connections/postgresql');

const Student = sequelize.define('Student', {
    student_id: {
        type: DataTypes.STRING(45),
        primaryKey: true,
        allowNull: false
    },
    student_name: {
        type: DataTypes.STRING(80),
        allowNull: false
    },
    student_dateofbirth: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    student_gender: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    student_address: {
        type: DataTypes.STRING(80)
    },
    student_phone: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    student_email: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    school_class: {
        type: DataTypes.STRING(45),
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
    tableName: 'student',
    timestamps: false
});

module.exports = Student;
