const StudentsRepository = require("../repositories/StudentsRepository")
const _ = require('lodash');
const appConfig = require('../configs/config')
const jwt = require('jsonwebtoken');

const StudentsService = {
    async createStudent(data) {
        return await StudentsRepository.create(data)
    },
    async login(payload) {
        const token = jwt.sign(payload, appConfig.SECRET_KEY, { expiresIn: `1d`, });

        // Trả về token cho người dùng
        return token
    },
};

module.exports = StudentsService;