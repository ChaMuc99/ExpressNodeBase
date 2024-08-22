const { DataTypes } = require('sequelize');
const sequelize = require('../configs/connections/postgresql');
const { v4: uuidV4 } = require('uuid');

const ClassesModel = sequelize.define('students', {
  masv:{
    type: DataTypes.UUID,
    allowNull: false,
    defaultValue: function () {
        return uuidV4();
    },
    primaryKey: true,
  },
  hosv: {
    type:DataTypes.STRING,
    allowNull:false,
  },
  tensv: {
    type:DataTypes.STRING,
    allowNull:false,
  },
  gioitinh: {
    type:DataTypes.INTEGER,
    allowNull:false,
  },
  ngaysinh: {
    type:DataTypes.DATEONLY,
    allowNull:false,
  },
  noisinh: {
    type:DataTypes.STRING,
    allowNull:false,
  },
  diachi: {
    type:DataTypes.STRING,
    allowNull:false,
  },
  matinh: {
    type:DataTypes.STRING,
    allowNull:false,
  },
  maquan: {
    type:DataTypes.STRING,
    allowNull:false,
  },
  malop: {
    type:DataTypes.UUID,
    allowNull:false,
  },
  created_at: {
    type:DataTypes.TIME,
    allowNull:false,
    field: 'created_at',
    defaultValue: new Date,
  },
  updated_at: {
    type:DataTypes.DATE,
    field:'updated_at',
    defaultValue: new Date,
  },
  deleted_at: DataTypes.DATE,
  // password: DataTypes.STRING
},
{
  sequelize,
  tableName: 'sinhvien',
},);

module.exports = ClassesModel;
