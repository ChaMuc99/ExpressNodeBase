const Teacher = require('../models/Teacher');
const sequelize = require('../configs/connections/postgresql');

class TeachersRepository {

    async getTeacherByEmail(email) {
        return await Teacher.findOne({ where: { email } });
    }


    static create(data, transaction) {
        return Teacher.create(data, { transaction, returning: true });
    }

    static delete(teacher_id, transaction) {
        return Teacher.destroy({
            where: { teacher_id },
            transaction,
        });
    }

    static update(teacher_id, data, transaction) {
        return Teacher.update(data, {
            where: { teacher_id },
            transaction,
            returning: true,
        });
    }

    static search(teacher_id) {
        return Teacher.findByPk(teacher_id);
    }

    static getAll() {
        return Teacher.findAll();
    }
}

module.exports = TeachersRepository;
