const roleAuthorization = (roles = []) => {
    return (req, res, next) => {
      const user = req.user;  
  
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
  // check if the user is an admin
const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Access denied: Admins only' });
    }
};

//check if the user is a teacher or admin
const isTeacherOrAdmin = (req, res, next) => {
    if (req.user && (req.user.role === 'teacher' || req.user.role === 'admin')) {
        next();
    } else {
        res.status(403).json({ message: 'Access denied: Teachers and Admins only' });
    }
};

module.exports = { isAdmin, isTeacherOrAdmin, roleAuthorization };

