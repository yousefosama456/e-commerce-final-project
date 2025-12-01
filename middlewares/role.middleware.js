exports.authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (allowedRoles.includes(req.user.role)) {
      return next();
    }
    res.status(403).json({ message: "error,access denied" });
  };
};
