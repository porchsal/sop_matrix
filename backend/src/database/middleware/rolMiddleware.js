
module.exports = function(allowedRoles = []) {
    return (req, res, next) => {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }
  
     
      const userRole = req.user.profile;
  
      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({ message: "Forbidden: insufficient permissions" });
      }
  
      next();
    };
  };
  