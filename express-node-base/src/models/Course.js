const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../configs/connections/postgresql");

const Course = sequelize.define(
  "Course",
  {
    course_id: {
      type: DataTypes.STRING(45),
      primaryKey: true,
    },
    course_name: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
    course_credits: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    teacher_id: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    course_schedule: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
    course_room: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    created_by: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
    updated_by: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
  },
  {
    tableName: "course",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

// Export the Course model without associations for now
module.exports = Course;
