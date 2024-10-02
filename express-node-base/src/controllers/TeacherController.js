const TeachersService = require("../services/TeacherService");
const { isValidTeacher } = require("../utils/Validate");

const TeacherController = {
  async createTeacher(req, res) {
    try {
      // Validate teacher data
      const { value: data, error } = isValidTeacher(req.body);
      if (error) {
        return res.status(400).json({ error: error.message || error });
      }

      // Create teacher
      const teacher = await TeachersService.createTeacher(data);
      return res.status(201).json({
        data: teacher,
        status: "success",
        statusCode: 201,
      });
    } catch (err) {
      res.status(400).json({
        error: err.message || err,
        status: "error",
        statusCode: 400,
      });
    }
  },

  async deleteTeacher(req, res) {
    try {
      const teacher_id = req.params.id;
      await TeachersService.deleteTeacher(teacher_id);
      return res.status(200).json({
        status: "success",
        message: `Teacher with ID ${teacher_id} has been successfully deleted.`,
        statusCode: 204,
      });
    } catch (err) {
      res.status(400).json({
        error: err.message || err,
        status: "error",
        statusCode: 400,
      });
    }
  },

  async updateTeacher(req, res) {
    try {
      const teacher_id = req.params.id;
      const { value: data, error } = isValidTeacher(req.body);
      if (error) {
        return res.status(400).json({ error: error.message || error });
      }

      await TeachersService.updateTeacher(teacher_id, data);
      const updatedTeacher = await TeachersService.searchTeacher(teacher_id);

      return res.status(200).json({
        data: updatedTeacher,
        status: "success",
        statusCode: 200,
      });
    } catch (err) {
      res.status(400).json({
        error: err.message || err,
        status: "error",
        statusCode: 400,
      });
    }
  },

  async getTeacher(req, res) {
    try {
      const teacher_id = req.params.id;
      const teacher = await TeachersService.searchTeacher(teacher_id);
      if (!teacher) {
        return res.status(404).json({ error: "Teacher not found" });
      }
      return res.status(200).json({
        data: teacher,
        status: "success",
        statusCode: 200,
      });
    } catch (err) {
      res.status(400).json({
        error: err.message || err,
        status: "error",
        statusCode: 400,
      });
    }
  },

  async getAllTeachers(req, res) {
    try {
      const teachers = await TeachersService.getAllTeachers();
      return res.status(200).json({
        data: teachers,
        status: "success",
        statusCode: 200,
      });
    } catch (err) {
      res.status(400).json({
        error: err.message || err,
        status: "error",
        statusCode: 400,
      });
    }
  },
};

module.exports = TeacherController;
