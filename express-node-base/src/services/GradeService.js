const GradeRepository = require("../repositories/GradeRepository");
const { isValidGrade } = require('../utils/Validate');

const GradeService = {
    async createGrade(data) {
        const { error } = isValidGrade(data);
        if (error) throw new Error(error.message);

        return await GradeRepository.create(data);
    },

    async updateGrade(id, data) {
        const { error } = isValidGrade(data);
        if (error) throw new Error(error.message);

        return await GradeRepository.updateGrade(id, data);
    },

    async updateGrade(id, data) {
        const { error } = isValidGrade(data);
        if (error) throw new Error(error.message);
    
        return await GradeRepository.updateGrade(id, data);
    },
  
    async deleteGrade(gradeId) {
        try {
          const result = await GradeRepository.deleteGrade(gradeId);
          if (result === 0) {
            throw new Error('Grade not found'); // Handle case where no rows are deleted
          }
          return result; // Return the result if successful
        } catch (error) {
          console.error('Error in GradeService.deleteGrade:', error);
          throw new Error('Failed to delete grade');
        }
      }
      ,
      

    async getGradeById(id) {
        return await GradeRepository.getGradeById(id);
    },

    async getAllGrades() {
        return await GradeRepository.getAllGrades();
    },

 
   async getGradesBySemester(semester) {
        // Trim whitespace from the semester input
        semester = semester.trim();
        console.log('Fetching grades for semester:', semester);
    
        const grades = await GradeRepository.getGradesBySemester(semester);
        console.log('Fetched grades:', grades);
    
        return grades;
    }
    
    
    
};

module.exports = GradeService;
