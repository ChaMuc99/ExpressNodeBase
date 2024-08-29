const StudentsRepository = require("../repositories/StudentsRepository");
const Joi = require("joi");
const { ValidationnError } = require("joi");

const StudentsService = {
  async createStudent(data, user) {
    //Check if the user is authorized
    if (!user.isTeacher && !user.isAdmin) {
      throw new Error("Unauthorized");
    }

    // Validate the student data
    const { error, value } = this.validateStudentData(data);
    if (error) {
      throw new ValidationError(error.message);
    }

    // Create the student
    return await StudentsRepository.create(value);
  },

  async delteStudent(studentId, user) {
    if (!user.isTeacher && !user.isAdmin) {
      throw new Error("Unauthorized");
    }
    return await StudentsRepository.delete(studentId);
  },

  async updateStudent(studentId, data, user) {
    if (!user.isTeacher && !user.isAdmin) {
      throw new Error("Unauthorized");
    }
    const { error, value } = this.validateStudentdata(data);
    if (error) {
      throw new ValidationError(error.message);
    }

    return await StudentsRepository.update(studentId, value);
  },

  async searchStudent(criteria) {
    return await StudentsRepository.search(criteria);
  },

  async getAllStudents() {
    return await StudentsRepository.getAll();
  },

  validateStudentData(data) {
    const schema = Joi.object({
      student_id: Joi.string().max(45).required(),
      student_name: Joi.string().max(80).required(),
      student_dateofbirth: Joi.date().iso().required(),
      student_gender: Joi.string().max(20).required(),
      student_address: Joi.string().max(80).optional(),
      student_phone: Joi.string().max(45).required(),
      student_email: Joi.string().email().max(45).required(),
      school_class: Joi.string().max(45).required(),
      created_at: Joi.date().iso().required(),
      updated_at: Joi.date().iso().required(),
      created_by: Joi.string().max(80).required(),
      updated_by: Joi.string().max(80).required(),
    });

    return schema.validate(data);
  },
};

module.exports = StudentsService;
