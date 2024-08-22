const appConfig = require('../configs/config')
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const authenticate = (req, res, next) => {
  // Lấy token từ header hoặc query parameter hoặc từ nơi khác
    const authHeader = req.headers.authorization;
    const token = authHeader ? _.last(authHeader.split(" ")) : '';

  // Kiểm tra xem token có tồn tại và hợp lệ không
  if (token) {
    try {
      // Xác thực token và lấy dữ liệu từ trong token
      const decoded = jwt.verify(token, appConfig.SECRET_KEY);

      // Gắn dữ liệu từ token vào request để sử dụng trong các route sau này
      req.user = decoded;

      // Cho phép request đi tiếp
      next();
    } catch (err) {
      // Token không hợp lệ
      res.status(401).json({
        error: "Invalid token",
        status: "error",
        statusCode: 401,
      });
    }
  } else {
    // Token không tồn tại
    res.status(401).json({
      error: "Unauthorized",
      status: "error",
      statusCode: 401,
    });
  }
};

// Xuất middleware để có thể sử dụng ở nơi khác
module.exports = authenticate;
