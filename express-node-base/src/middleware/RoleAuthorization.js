const _ = require('lodash');

const roleAuthorization = (roles = []) => {
  return (req, res, next) => {
    const user = req.user;  // Assuming req.user is populated from the authentication middleware

    // Check if roles array is empty or user is not logged in
    if (!user) {
      return res.status(401).json({
        error: "Unauthorized: No user data found.",
        status: "error",
        statusCode: 401,
      });
    }

    if (roles.length === 0) {
      return res.status(400).json({
        error: "Bad Request: No roles specified for authorization.",
        status: "error",
        statusCode: 400,
      });
    }

    // Check if user has the required role
    if (!roles.includes(user.role)) {
      return res.status(403).json({
        error: `Forbidden: You do not have the necessary permissions. Required role(s): ${roles.join(', ')}`,
        status: "error",
        statusCode: 403,
      });
    }

    // User has the required role, proceed
    next();
  };
};

module.exports = roleAuthorization;
