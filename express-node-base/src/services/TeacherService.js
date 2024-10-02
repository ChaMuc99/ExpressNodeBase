const TeacherRepository = require("../repositories/TeacherRepository");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../configs/config");

const TeacherService = {
  async findByEmail(email) {
    try {
      const teacher = await TeacherRepository.getTeacherByEmail(email);
      console.log("Retrieved Teacher Data:", teacher);
      return teacher;
    } catch (error) {
      console.error("Database query error:", error);
      throw error;
    }
  },

  async createTeacher(data) {
    return await TeacherRepository.create(data);
  },

  async deleteTeacher(teacher_id) {
    return await TeacherRepository.delete(teacher_id);
  },

  async updateTeacher(teacher_id, data) {
    return await TeacherRepository.update(teacher_id, data);
  },

  async searchTeacher(teacher_id) {
    return await TeacherRepository.search(teacher_id);
  },

  async getAllTeachers() {
    return await TeacherRepository.getAll();
  },

  async login(payload) {
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
    return token;
  },
};

module.exports = TeacherService;
