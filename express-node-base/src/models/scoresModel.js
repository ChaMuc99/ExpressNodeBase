const { DataTypes } = require("sequelize");
const sequelize = require("../configs/connections/postgresql");
const { v4: uuidV4 } = require("uuid");

const ScoresModel = sequelize.define(
  "scores",
  {
    masv: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: function () {
        return uuidV4();
      },
      primaryKey: true,
    },
    mamonhoc: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lanthi: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    hocky: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    diem: {
      type: DataTypes.DOUBLE,
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
    tableName: "bangdiemthihocky",
  }
);

module.exports = ScoresModel;
