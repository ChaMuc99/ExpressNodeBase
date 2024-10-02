const CourseRegistrationService = require("../services/CourseRegistrationService");
const { isValidCourseRegistration } = require("../utils/Validate");
const CourseRegistration = require("../models/CourseRegistration");

const CourseRegistrationController = {
  async registerCourse(req, res, next) {
    try {
      const { course_id, student_id } = req.body;

      if (!course_id || !student_id) {
        return res
          .status(400)
          .json({ message: "course_id and student_id are required." });
      }

      // Call service to handle registration logic
      const result = await CourseRegistrationService.registerCourse(
        student_id,
        course_id
      );

      if (!result.success) {
        return res.status(400).json({ message: result.message });
      }

      res.status(200).json({
        message: "Student successfully registered to the course",
        data: result.data,
      });
    } catch (err) {
      next(err);
    }
  },

  async cancelCourseRegistration(req, res, next) {
    try {
      const { registration_id } = req.params;

      // Check if the registration exists
      const registration = await CourseRegistration.findOne({
        where: { registration_id },
      });

      if (!registration) {
        return res.status(404).json({ message: "Registration not found" });
      }

      // Delete the registration
      await registration.destroy();

      res.status(200).json({
        message: "Course registration canceled successfully",
        status: "success",
        statusCode: 200,
      });
    } catch (err) {
      next(err);
    }
  },
  async getAvailableCourses(req, res, next) {
    try {
      const { student_id } = req.params; // Extract student_id from URL parameters
      console.log("Student ID:", student_id); // Log the student ID for debugging

      // Validate if student_id is provided
      if (!student_id) {
        return res.status(400).json({ error: "Student ID is required." });
      }

      const result = await CourseRegistrationService.getAvailableCourses(
        student_id
      );

      if (!result.success) {
        return res.status(400).json({ error: result.message });
      }

      res.json({
        data: result.data,
        status: "success",
        statusCode: 200,
      });
    } catch (err) {
      console.error("Error in getAvailableCourses:", err); // Log error for debugging
      next(err);
    }
  },

  async viewRegisteredCourses(req, res, next) {
    try {
      const { student_id } = req.params; // Extract student_id from the URL params
      const result = await CourseRegistrationService.viewRegisteredCourses(
        student_id
      );

      if (!result.success) {
        return res.status(400).json({ error: result.message });
      }

      return res.json({
        data: result.data,
        status: "success",
        statusCode: 200,
      });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = CourseRegistrationController;
