const Joi = require("joi");

function isValidStudent(data) {
  return Joi.object({
    student_id: Joi.string().trim().max(45).required(),
    student_name: Joi.string().trim().max(80).optional(),
    student_dateofbirth: Joi.date().iso().optional(),
    student_gender: Joi.string().trim().max(20).optional(),
    student_address: Joi.string().trim().max(80).optional(),
    student_phone: Joi.string().trim().max(45).optional(),
    student_email: Joi.string().trim().email().max(45).optional(),
    school_class: Joi.string().trim().max(45).optional(),
    created_at: Joi.date().iso().optional(),
    updated_at: Joi.date().iso().optional(),
    created_by: Joi.string().trim().max(80).optional(),
    updated_by: Joi.string().trim().max(80).optional(),
  }).validate(data);
}

function isValidTeacher(data) {
  return Joi.object()
    .keys({
      teacher_id: Joi.string().trim().max(45).required(),
      teacher_name: Joi.string().trim().max(80).required(),
      teacher_dateofbirth: Joi.date().iso().required(),
      teacher_gender: Joi.string().trim().max(20).required(),
      teacher_address: Joi.string().trim().max(80).optional(),
      teacher_phone: Joi.string().trim().max(45).required(),
      teacher_email: Joi.string().trim().email().max(45).required(),
      teacher_password: Joi.string().min(6).required(),
      teacher_department: Joi.string().trim().max(45).required(),
      created_at: Joi.date().iso().required(),
      updated_at: Joi.date().iso().required(),
      created_by: Joi.string().trim().max(80).required(),
      updated_by: Joi.string().trim().max(80).required(),
    })
    .validate(data);
}

function isValidGrade(data) {
  return Joi.object()
    .keys({
      grade_id: Joi.string().trim().max(45).required(),
      student_id: Joi.string().trim().max(45).required(),
      course_id: Joi.string().trim().max(45).required(),
      semester: Joi.string().trim().max(20).required(),
      mid_term_grade: Joi.number().min(0).max(100).required(),
      final_grade: Joi.number().min(0).max(100).required(),
      total_grade: Joi.number().min(0).max(100).required(),
      created_by: Joi.string().trim().max(80).required(),
      updated_by: Joi.string().trim().max(80).required(),
    })
    .validate(data);
}

function isValidCourse(data) {
  return Joi.object({
    course_id: Joi.string().max(45).required(),
    course_name: Joi.string().max(80).required(),
    course_credits: Joi.number().integer().required(),
    teacher_id: Joi.string().max(45).required(),
    course_schedule: Joi.string().max(80).required(),
    course_room: Joi.string().max(45).required(),
    created_by: Joi.string().max(80).required(),
    updated_by: Joi.string().max(80).required(),
  }).validate(data);
}

function isValidCourseRegistration(data) {
  return Joi.object()
    .keys({
      student_id: Joi.string().trim().required(),
      course_id: Joi.string().trim().required(),
      created_at: Joi.date().iso().required(),

      updated_at: Joi.date().iso().required(),
      created_by: Joi.string().trim().max(80).required(),
      updated_by: Joi.string().trim().max(80).required(),
    })
    .validate(data);
}
module.exports = {
  isValidStudent,
  isValidTeacher,
  isValidGrade,
  isValidCourse,
  isValidCourseRegistration,
};
