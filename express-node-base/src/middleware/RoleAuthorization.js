
const _ = require('lodash');

const roleAuthorization = (roles) => {
  return (req, res, next) => {
    const user = req.user;

    if (!user || !roles.includes(user.role)) {
      return res.status(403).json({
        error: "Forbidden: You do not have the necessary permissions",
        status: "error",
        statusCode: 403,
      });
    }

    next(); // User has the required role, proceed to the next middleware or controller
  };
};

module.exports = roleAuthorization;
