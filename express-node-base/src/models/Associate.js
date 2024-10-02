const Course = require("./Course");
const CourseRegistration = require("./CourseRegistration");

const setupAssociations = () => {
  // Define associations
  Course.hasMany(CourseRegistration, { foreignKey: "course_id" });
  CourseRegistration.belongsTo(Course, { foreignKey: "course_id" });
};

module.exports = setupAssociations;
