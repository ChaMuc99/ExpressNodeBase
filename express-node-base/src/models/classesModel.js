const { DataTypes } = require('sequelize');
const sequelize = require('../configs/connections/postgresql');
const { v4: uuidV4 } = require('uuid');

const ClassesModel = sequelize.define('classes', {
  malop:{
    type: DataTypes.UUID,
    allowNull: false,
    defaultValue: function () {
        return uuidV4();
    },
    primaryKey: true,
  },
  tenlop: {
    type:DataTypes.STRING,
    allowNull:false,
  },
  manganh:{
    type:DataTypes.STRING,
    allowNull: false,
  },
  makhoahoc:{
    type:DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type:DataTypes.TIME,
    allowNull:false,
    field: 'created_at',
  },
  updatedAt: {
    type:DataTypes.DATE,
    field:'updated_at',
  },
  deleted_at: DataTypes.DATE,
},
{
  sequelize,
  tableName: 'lop',
},);

module.exports = ClassesModel;
