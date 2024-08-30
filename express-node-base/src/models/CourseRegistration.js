const { DataTypes } = require('sequelize');
const sequelize = require('../configs/connections/postgresql');

const CourseRegistration = sequelize.define('CourseRegistration', {
    registration_id: {
        type: DataTypes.STRING(45),
        primaryKey: true,
        allowNull: false,
        defaultValue: sequelize.literal("nextval('course_registration_registration_id_seq'::regclass)")
    },
    student_id: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    course_id: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    registration_date: {
        type: DataTypes.DATEONLY,
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
    tableName: 'course_registration',
    timestamps: false
});

module.exports = CourseRegistration;
