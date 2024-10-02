const Course = require("../models/Course");

class CoursesRepository {
  static async createCourse(data, transaction) {
    return Course.create(data, { transaction });
  }

  static async updateCourse(id, data, transaction) {
    return Course.update(data, {
      where: { course_id: id },
      transaction,
    });
  }

  static async deleteCourse(id, transaction) {
    return Course.destroy({
      where: { course_id: id },
      transaction,
    });
  }

  static async getCourseById(id) {
    return Course.findByPk(id);
  }

  static async getAllCourses() {
    return Course.findAll();
  }
}

module.exports = CoursesRepository;
