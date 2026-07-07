/**
 * Express middleware to restrict route access by role.
 * Requires 'verifyToken' middleware to run before this.
 * @param {...string} allowedRoles - List of roles permitted to access the route.
 */
export const allowRoles = (...allowedRoles) => {
  return (req, res, next) => {
    // 1. Guard Clause: Ensure user payload exists from verifyToken middleware
    if (!req.user) {
      console.error(
        "Authorization Error: allowRoles called before verifyToken middleware.",
      );
      return res.status(500).json({
        success: false,
        message: "An internal security error occurred.",
      });
    }

    // 2. Extract role directly from the stateless JWT payload (No DB hit!)
    const userRole = req.user.role;

    if (!userRole) {
      return res.status(403).json({
        success: false,
        message: "Access denied. No user role assigned.",
      });
    }

    // 3. Check if the user's role matches any of the permitted roles
    const hasPermission = allowedRoles.includes(userRole);

    if (!hasPermission) {
      return res.status(403).json({
        success: false,
        message:
          "Access denied. You do not have permission to view this resource.",
      });
    }

    // 4. Authorized - proceed safely
    return next();
  };
};
