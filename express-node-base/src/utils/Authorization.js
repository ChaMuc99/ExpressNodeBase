const _ = require('lodash');

// Middleware to check if the user has one of the required roles
const roleAuthorization = (roles = []) => {
  return (req, res, next) => {
    const user = req.user;  // Assuming req.user is populated from the authentication middleware

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

    if (!roles.includes(user.role)) {
      return res.status(403).json({
        error: `Forbidden: You do not have the necessary permissions. Required role(s): ${roles.join(', ')}`,
        status: "error",
        statusCode: 403,
      });
    }

    next();
  };
};

// Function to check if the user is an admin
function isAdmin(user) {
    return user && user.role === 'admin';
}

// Function to check if the user is a teacher or admin
function isTeacherOrAdmin(user) {
    return user && (user.role === 'teacher' || user.role === 'admin');
}

module.exports = { roleAuthorization, isAdmin, isTeacherOrAdmin };
