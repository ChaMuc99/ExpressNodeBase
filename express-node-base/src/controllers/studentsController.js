const StudentsService = require('../services/studentsService')

const StudentsController = {
    async createStudent(req, res, next) {
        try {
            return res.json({
                data: await StudentsService.createStudent(req.body),
                status: 'success',
                statusCode: 200,
            });
        } catch (err) {
            res.status(400).send({
                error: err.message || err,
                status: 'error',
                statusCode: 400,
            });
        }
    },
    async loginStudent(req, res, next) {
        try {
            // Kiểm tra thông tin đăng nhập
            const { username, password } = req.body;
    
            // Kiểm tra username và password (ví dụ: kiểm tra trong cơ sở dữ liệu)
            if (username === 'admin' && password === 'password') {
                return res.json({
                    data: await StudentsService.login({username}),
                    status: 'success',
                    statusCode: 200,
                });
            } else {
                // Đăng nhập không thành công
                res.status(401).json({
                    error: 'Invalid credentials',
                    status: 'error',
                    statusCode: 400,
                });
            }
        } catch (err) {
            res.status(400).send({
                error: err.message || err,
                status: 'error',
                statusCode: 400,
            });
        }
    },
};

module.exports = StudentsController;
