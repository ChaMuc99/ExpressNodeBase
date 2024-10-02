module.exports = (req, res, next) => {
  if (req.user.role === "teacher") {
    return next();
  }
  return res.status(403).json({ error: "Forbidden" });
};
