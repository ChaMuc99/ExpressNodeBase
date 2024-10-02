const GradeService = require("../services/GradeService");
const { isValidGrade } = require("../utils/Validate");
const Grade = require("../models/Grade");

const GradeController = {
  async createGrade(req, res, next) {
    try {
      const { value: data, error } = isValidGrade(req.body);
      if (error) {
        return res.status(400).json({ error: error.message });
      }

      const result = await GradeService.createGrade(data);
      if (!result.success) {
        return res.status(400).json({ error: result.message });
      }

      return res.status(201).json({
        data: result.data,
        status: "success",
        statusCode: 201,
      });
    } catch (err) {
      console.error("Error creating grade:", err); // Log the error
      res.status(500).json({
        error: err.message || "Internal Server Error",
        status: "error",
        statusCode: 500,
      });
    }
  },

  async updateGrade(req, res) {
    const grade_id = req.params.id; // Ensure this matches the route
    console.log("Updating grade with ID:", grade_id);
    const data = req.body;

    // Log the data to see what's being sent
    console.log("Request body:", data);

    try {
      const result = await GradeService.updateGrade(grade_id, data); // Ensure you're passing grade_id
      return res.json({
        data: result,
        status: "success",
        statusCode: 200,
      });
    } catch (error) {
      console.error("Error updating grade:", error);
      return res.status(500).json({
        error: error.message || "Internal Server Error",
        status: "error",
        statusCode: 500,
      });
    }
  },

  async deleteGrade(req, res) {
    const gradeId = req.params.id; // Get the grade ID from the request parameters
    try {
      await GradeService.deleteGrade(gradeId);
      res.status(204).send(); // No content
    } catch (error) {
      console.error("Error deleting grade:", error);
      res.status(500).send({ message: error.message });
    }
  },

  async getGradeById(req, res, next) {
    try {
      const grade_id = req.params.id; // Adjust to 'id' if your route is '/grades/:id'
      console.log("Fetching grade with ID:", grade_id); // Log the grade ID
      const grade = await GradeService.getGradeById(grade_id);
      if (!grade) {
        return res.status(404).json({
          error: "Grade not found",
          status: "error",
          statusCode: 404,
        });
      }
      return res.json({
        data: grade,
        status: "success",
        statusCode: 200,
      });
    } catch (err) {
      console.error("Error fetching grade:", err); // Log the error for debugging
      res.status(400).send({
        error: err.message || err,
        status: "error",
        statusCode: 400,
      });
    }
  },

  async getAllGrades(req, res, next) {
    try {
      const grades = await GradeService.getAllGrades();
      return res.json({
        data: grades,
        status: "success",
        statusCode: 200,
      });
    } catch (err) {
      res.status(400).send({
        error: err.message || err,
        status: "error",
        statusCode: 400,
      });
    }
  },

  async getGradesBySemester(req, res, next) {
    try {
      // Access the semester parameter from req.params
      const { semester } = req.params;

      // Log the semester to verify it's being captured
      console.log("Fetching grades for semester:", semester);

      // Fetch the grades for the given semester
      const grades = await GradeService.getGradesBySemester(semester);
      return res.json({
        data: grades,
        status: "success",
        statusCode: 200,
      });
    } catch (err) {
      console.error(err); // Log the error for better debugging
      res.status(400).send({
        error: err.message || err,
        status: "error",
        statusCode: 400,
      });
    }
  },
};

module.exports = GradeController;
