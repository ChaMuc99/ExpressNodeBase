const CoursesService = require('../services/CourseService');
const { isValidCourse } = require('../utils/Validate');

const CourseController = {
  async createCourse(req, res, next) {
    try {
      const { value: data, error } = isValidCourse(req.body);
      if (error) {
        return res.status(400).json({ error: error.message });
      }
      const course = await CoursesService.createCourse(data);
      return res.status(201).json({ course, status: 'success' });
    } catch (err) {
      next(err);
    }
  },

  async updateCourse(req, res, next) {
    try {
      const { value: data, error } = isValidCourse(req.body);
      if (error) {
        return res.status(400).json({ error: error.message });
      }
      const course = await CoursesService.updateCourse(req.params.id, data);
      return res.status(200).json({ course, status: 'success' });
    } catch (err) {
      next(err);
    }
  },

  async deleteCourse(req, res, next) {
    try {
      await CoursesService.deleteCourse(req.params.id);
      return res.status(204).end();
    } catch (err) {
      next(err);
    }
  },

  async getCourseById(req, res, next) {
    try {
      const course = await CoursesService.getCourseById(req.params.id);
      return res.status(200).json({ course, status: 'success' });
    } catch (err) {
      next(err);
    }
  },

  async getAllCourses(req, res, next) {
    try {
      const courses = await CoursesService.getAllCourses();
      return res.status(200).json({ courses, status: 'success' });
    } catch (err) {
      next(err);
    }
  }
};

module.exports = CourseController;
