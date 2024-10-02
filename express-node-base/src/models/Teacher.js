const { DataTypes } = require("sequelize");
const sequelize = require("../configs/connections/postgresql");

const Teacher = sequelize.define(
  "Teacher",
  {
    teacher_id: {
      type: DataTypes.STRING(45),
      primaryKey: true,
      allowNull: false,
      field: "teacher_id", // Explicitly define field name
    },
    teacher_name: {
      type: DataTypes.STRING(80),
      allowNull: false,
      field: "teacher_name",
    },
    teacher_dateofbirth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: "teacher_dateofbirth",
    },
    teacher_gender: {
      type: DataTypes.STRING(20),
      allowNull: false,
      field: "teacher_gender",
    },
    teacher_address: {
      type: DataTypes.STRING(80),
      allowNull: false,
      field: "teacher_address",
    },
    teacher_phone: {
      type: DataTypes.STRING(45),
      allowNull: false,
      field: "teacher_phone",
    },
    teacher_email: {
      type: DataTypes.STRING(45),
      allowNull: false,
      field: "teacher_email",
    },
    teacher_password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: "teacher_password",
    },
    teacher_department: {
      type: DataTypes.STRING(80),
      allowNull: false,
      field: "teacher_department",
    },
    created_at: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: "created_at",
    },
    updated_at: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: "updated_at",
    },
    created_by: {
      type: DataTypes.STRING(80),
      allowNull: false,
      field: "created_by",
    },
    updated_by: {
      type: DataTypes.STRING(80),
      allowNull: false,
      field: "updated_by",
    },
  },
  {
    tableName: "teacher",
    timestamps: false,
  }
);

module.exports = Teacher;
