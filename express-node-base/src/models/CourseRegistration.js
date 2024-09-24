const { DataTypes } = require('sequelize');
const sequelize = require('../configs/connections/postgresql');
const { v4: uuidv4 } = require('uuid');

const CourseRegistration = sequelize.define('CourseRegistration', {
    registration_id: {
        type: DataTypes.STRING(45),
        primaryKey: true,
        allowNull: false,
        defaultValue: () => uuidv4()
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
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    created_by: {
        type: DataTypes.STRING(80),
        allowNull: false
    },
    updated_by: {
        type: DataTypes.STRING(80),
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'course_registration',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

// Export the CourseRegistration model without associations for now
module.exports = CourseRegistration;
