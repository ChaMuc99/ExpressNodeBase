const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../configs/config");
const TeacherService = require("../services/TeacherService");
const StudentService = require("../services/StudentService");
const AdminService = require("../services/AdminService");

const AuthController = {
  async login(req, res) {
    const { email, password } = req.body;

    try {
      let user = null;
      let role = "";

      // Check if the user is an admin
      user = await AdminService.getAdminByEmail(email);
      if (user) {
        role = "admin";
      } else {
        // Check if the user is a teacher
        user = await TeacherService.findByEmail(email);
        if (user) {
          role = "teacher";
        } else {
          // Check if the user is a student
          user = await StudentService.findByEmail(email);
          if (user) {
            role = "student";
          } else {
            return res
              .status(401)
              .json({ message: "Invalid email or password" });
          }
        }
      }

      // Directly compare the password (since it's stored as plain text)
      if (role === "teacher" && user.teacher_password !== password) {
        return res.status(401).json({ message: "Invalid email or password" });
      } else if (role === "admin" && user.password !== password) {
        return res.status(401).json({ message: "Invalid email or password" });
      } else if (role === "student" && user.password !== password) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Generate JWT with the role (admin, teacher, or student)
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          role: role,
        },
        JWT_SECRET,
        { expiresIn: "1h" }
      );

      // Return the token
      return res.status(200).json({
        token,
        role,
        message: `Login successful as ${role}`,
      });
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = AuthController;
