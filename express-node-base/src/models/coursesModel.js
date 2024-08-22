const { DataTypes } = require("sequelize");
const sequelize = require("../configs/connections/postgresql");

const CoursesModel = sequelize.define(
  "courses",
  {
    mamonhoc: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    tenmonhoc: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lythuyet: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    thuchanh: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.TIME,
      allowNull: false,
      field: "created_at",
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: "updated_at",
    }
  },
  {
    sequelize,
    tableName: "monhoc",
  }
);

module.exports = CoursesModel;
