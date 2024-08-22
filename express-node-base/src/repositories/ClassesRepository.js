const ClassesModel = require("../models/classesModel");
const StudentsModel = require("../models/studentsModel");
const CoursesModel = require("../models/coursesModel");
const ScoresModel = require("../models/scoresModel");
const sequelize = require("../configs/connections/postgresql");

ClassesModel.hasMany(StudentsModel, { as: "students", foreignKey: "malop" });
StudentsModel.belongsTo(ClassesModel, { as: "classes", foreignKey: "malop" });
StudentsModel.hasMany(ScoresModel, { as: "scores", foreignKey: "masv", targetKey: "masv" });
ScoresModel.belongsTo(CoursesModel, { as: "courses", foreignKey: "mamonhoc", targetKey: "mamonhoc" });
class ClassesRepository {
  static getClassesRaw(id) {
    const query = `
      SELECT classes.*, (
        SELECT json_agg(row_to_json(sv.*)::jsonb || jsonb_build_object('scores', (
            SELECT json_agg(row_to_json(sv.*)::jsonb || jsonb_build_object('courses', row_to_json(mh.*)::jsonb))
                FROM bangdiemthihocky bd
                LEFT JOIN public.monhoc mh ON bd.mamonhoc = mh.mamonhoc
        )))
        FROM public.sinhvien sv
      ) students
      FROM public.lop classes
    `
    return sequelize.query(query, {
        type: 'SELECT',
        raw: true
    })
  }

  static getClassesAll(id) {
    return ClassesModel.findAll({
        include: [{
            model: StudentsModel,
            as: "students",
            include: [
                {
                    model: ScoresModel,
                    as: 'scores',
                    include: [{
                        model: CoursesModel,
                        as: 'courses',
                    }]
                }
            ]
        }],
    });
  }

  static getClasses(data) {
    return ClassesModel.findAll({ where: data });
  }

  static getClassesById(id) {
    return ClassesModel.findByPk(id);
  }

  static create(data, transaction) {
    return ClassesModel.create(data, { transaction, returning: true });
  }

  static bulkCreate(data, transaction) {
    return ClassesModel.create(data, { transaction, returning: true });
  }

  static updateClasses(id, data) {
    return ClassesModel.update(data, {
      where: { id },
      transaction,
      returning: true,
    });
  }

  static deleteClasses(id) {
    return ClassesModel.destroy({
      where: { id },
      transaction,
      returning: true,
    });
  }
}

module.exports = ClassesRepository;
