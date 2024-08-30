const GradeRepository = require("../repositories/GradeRepository");
const { isValidGrade } = require('../utils/Validate');
const { isTeacher } = require('../utils/Authorization');

const GradeService = {
    async createGrade(data, user) {
        if (!isTeacher(user)) throw new Error("Unauthorized");

        const { error } = isValidGrade(data);
        if (error) throw new Error(error.message);

        return await GradeRepository.create(data);
    },

    async updateGrade(id, data, user) {
        if (!isTeacher(user)) throw new Error("Unauthorized");

        const { error } = isValidGrade(data);
        if (error) throw new Error(error.message);

        return await GradeRepository.updateGrade(id, data);
    },

    async deleteGrade(id, user) {
        if (!isTeacher(user)) throw new Error("Unauthorized");
        return await GradeRepository.deleteGrade(id);
    },

    async getGradeById(id) {
        return await GradeRepository.getGradeById(id);
    },

    async getAllGrades(user) {
        if (!isTeacher(user)) throw new Error("Unauthorized");
        return await GradeRepository.getAllGrades();
    },

    async getGradesBySemester(studentId, semester, user) {
        if (user.student_id !== studentId) throw new Error("Unauthorized");
        return await GradeRepository.getGradesBySemester(studentId, semester);
    },
};

module.exports = GradeService;
