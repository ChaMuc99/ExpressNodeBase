const Teacher = require("../models/Teacher");
const sequelize = require("../configs/connections/postgresql");

class TeacherRepository {
  async getTeacherByEmail(email) {
    return await Teacher.findOne({ where: { teacher_email: email } });
  }

  async create(data, transaction) {
    return Teacher.create(data, { transaction, returning: true });
  }

  async delete(teacher_id, transaction) {
    return Teacher.destroy({
      where: { teacher_id },
      transaction,
    });
  }

  async update(teacher_id, data, transaction) {
    return Teacher.update(data, {
      where: { teacher_id },
      transaction,
      returning: true,
    });
  }

  async search(teacher_id) {
    return Teacher.findByPk(teacher_id);
  }

  async getAll() {
    return Teacher.findAll();
  }
}

module.exports = new TeacherRepository();
