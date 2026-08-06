export const allowRoles = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Authentication required.",
        });
      }

      const userRole = req.user.role;

      if (!userRole) {
        return res.status(403).json({
          success: false,
          message: "User role is not assigned.",
        });
      }

      const normalizedUserRole = userRole.toLowerCase();

      const normalizedAllowedRoles = allowedRoles.map((role) =>
        role.toLowerCase(),
      );

      if (!normalizedAllowedRoles.includes(normalizedUserRole)) {
        return res.status(403).json({
          success: false,
          message: "You do not have permission to access this resource.",
        });
      }

      next();
    } catch (error) {
      console.error("[Role Middleware Error]", error.message);

      return res.status(500).json({
        success: false,
        message: "Authorization service error.",
      });
    }
  };
};
