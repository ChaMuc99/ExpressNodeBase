const Grade = require('../models/Grade');

class GradeRepository {
    static create(data, transaction) {
        return Grade.create(data, { transaction, returning: true });
    }

    static updateGrade(id, data, transaction) {
        return Grade.update(data, {
            where: { grade_id: id },
            transaction,
            returning: true,
        });
    }

    static deleteGrade(id) {
        return Grade.destroy({
            where: { grade_id: id },
            returning: true,
        });
    }

    static getGradeById(id) {
        return Grade.findByPk(id);
    }

    static getAllGrades() {
        return Grade.findAll();
    }

    static getGradesBySemester(studentId, semester) {
        return Grade.findAll({
            where: {
                student_id: studentId,
                semester: semester
            }
        });
    }
}

module.exports = GradeRepository;
