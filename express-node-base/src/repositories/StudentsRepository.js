const Student = require('../models/Student');
const sequelize = require('../configs/connections/postgresql');

class StudentsRepository {
    static create(data, transaction) {
        return Student.create(data, { transaction, returning: true });
    }

    static delete(student_id, transaction) {
        return Student.destroy({
            where: { student_id },
            transaction,
        });
    }

    static update(student_id, data, transaction) {
        return Student.update(data, {
            where: { student_id },
            transaction,
            returning: true,
        });
    }

    static search(student_id) {
        return Student.findByPk(student_id);
    }

    static getAll() {
        return Student.findAll();
    }
}

module.exports = StudentsRepository;
