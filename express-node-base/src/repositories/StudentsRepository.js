const StudentsModel = require("../models/studentsModel");

class StudentsRepository {

  static getStudents(data) {
    return StudentsModel.findAll({ where: data });
  }

  static getStudentsById(id) {
    return StudentsModel.findByPk(id);
  }

  static create(data, transaction) {
    return StudentsModel.create(data, { transaction, returning: true });
  }

  static bulkCreate(data, transaction) {
    return StudentsModel.create(data, { transaction, returning: true });
  }

  static updateStudents(id, data) {
    return StudentsModel.update(data, {
      where: { id },
      transaction,
      returning: true,
    });
  }

  static deleteStudents(id) {
    return StudentsModel.destroy({
      where: { id },
      transaction,
      returning: true,
    });
  }
}

module.exports = StudentsRepository;
