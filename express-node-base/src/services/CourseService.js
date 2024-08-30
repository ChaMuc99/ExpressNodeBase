const CoursesRepository = require('../repositories/CoursesRepository');

const CoursesService = {
  async createCourse(data) {
    return CoursesRepository.createCourse(data);
  },

  async updateCourse(id, data) {
    return CoursesRepository.updateCourse(id, data);
  },

  async deleteCourse(id) {
    return CoursesRepository.deleteCourse(id);
  },

  async getCourseById(id) {
    return CoursesRepository.getCourseById(id);
  },

  async getAllCourses() {
    return CoursesRepository.getAllCourses();
  }
};

module.exports = CoursesService;
