import jwt from "jsonwebtoken";

/**
 * Verify JWT access token.
 */
export const verifyToken = (req, res, next) => {
  try {
    // 1. Get Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization header is missing.",
      });
    }

    // 2. Validate Bearer format
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Invalid authorization format.",
      });
    }

    // 3. Extract token
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication token is missing.",
      });
    }

    // 4. Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 5. Attach decoded payload
    req.user = decoded;

    next();
  } catch (error) {
    console.error("[Auth Middleware]", error.message);

    switch (error.name) {
      case "TokenExpiredError":
        return res.status(401).json({
          success: false,
          message: "Session expired. Please log in again.",
        });

      case "JsonWebTokenError":
        return res.status(401).json({
          success: false,
          message: "Invalid authentication token.",
        });

      default:
        return res.status(500).json({
          success: false,
          message: "Authentication service unavailable.",
        });
    }
  }
};
