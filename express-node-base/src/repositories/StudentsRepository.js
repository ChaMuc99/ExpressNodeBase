const StudentsModel = require('../models/studentModel');
const sequelize = require('../configs/connections/postgresql');

class StudentsRepository {
  static async create(data, transaction) {
    return await StudentsModel.create(data, { transaction, returning: true });

  }

  static async delete(studentId, transaction){
    return await StudentsModel.destroy({
      where: {id: studentId},
      transaction,
      returning: true
    });
  }

  static async update(studentId, data, transaction){
    return await StudentsModel.update(data, {
      where: {id: studentId},
      transaction,
      returning: true,
    });
  }

  static async search(criteria) {
    return await StudentsModel.findAll({
        where: criteria,
    });
  }

  static async getAll(){
    return await StudentsModel.findAll();
  }
}

module.exports = StudentsRepository;