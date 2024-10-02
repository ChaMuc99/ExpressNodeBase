const Grade = require("../models/Grade");

class GradeRepository {
  static async create(data, transaction) {
    try {
      const newGrade = await Grade.create(data, { transaction });
      return {
        success: true,
        data: newGrade,
      };
    } catch (error) {
      console.error("Error creating grade in repository:", error);
      throw new Error("Failed to create grade");
    }
  }

  static async updateGrade(id, data, transaction) {
    return Grade.update(data, {
      where: { grade_id: id },
      transaction,
    });
  }

  static async deleteGrade(gradeId, transaction) {
    try {
      const result = await Grade.destroy({
        where: { grade_id: gradeId },
        transaction,
      });
      return result; // Return the number of rows affected
    } catch (error) {
      console.error("Error in GradeRepository.deleteGrade:", error);
      throw new Error("Failed to delete grade");
    }
  }

  static getGradeById(id) {
    return Grade.findByPk(id);
  }

  static getAllGrades() {
    return Grade.findAll();
  }

  static async getGradesBySemester(semester) {
    // Ensure the semester parameter is defined
    if (!semester) {
      throw new Error("Semester must be defined");
    }

    // Fetch grades from the database using Sequelize
    const grades = await Grade.findAll({
      where: {
        semester: semester, // Filter by semester
      },
    });

    // Log the result for verification
    console.log("Grades from DB:", grades);

    return grades; // Return the result
  }
}

module.exports = GradeRepository;
