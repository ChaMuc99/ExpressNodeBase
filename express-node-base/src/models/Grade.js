const { DataTypes } = require("sequelize");
const sequelize = require("../configs/connections/postgresql");

const Grade = sequelize.define(
  "Grade",
  {
    grade_id: {
      type: DataTypes.STRING(45),
      primaryKey: true,
      allowNull: false,
    },
    student_id: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    course_id: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    semester: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    mid_term_grade: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    final_grade: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    total_grade: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATEONLY,
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
    tableName: "grade",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = Grade;
