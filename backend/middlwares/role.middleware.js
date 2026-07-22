/**
 * Middleware factory for role-based authorization.
 * Must run after verifyToken middleware.
 *
 * Example:
 * router.post(
 *   "/employees",
 *   verifyToken,
 *   allowRoles("Admin", "Manager"),
 *   addEmployee
 * );
 */

export const allowRoles = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      // 1. Ensure authentication middleware executed first
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Authentication required.",
        });
      }

      // 2. Extract role from verified JWT
      const userRole = req.user.role;

      if (!userRole) {
        return res.status(403).json({
          success: false,
          message: "User role is not assigned.",
        });
      }

      // 3. Normalize role names
      const normalizedUserRole = userRole.toLowerCase();

      const normalizedAllowedRoles = allowedRoles.map((role) =>
        role.toLowerCase(),
      );

      // 4. Check permission
      if (!normalizedAllowedRoles.includes(normalizedUserRole)) {
        return res.status(403).json({
          success: false,
          message: "You do not have permission to access this resource.",
        });
      }

      // 5. Continue request
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
