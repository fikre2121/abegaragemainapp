import jwt from "jsonwebtoken";

/**
 * Express middleware to validate incoming JWT Bearer tokens.
 */
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // 1. Guard Clause: Check if the Authorization header exists and uses Bearer schema
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Access denied. No valid token provided.",
    });
  }

  // 2. Safely extract the token string
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Authentication token is missing.",
    });
  }

  try {
    // Ensure the secret key is loaded before verifying
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error("JWT_SECRET is not defined in environment variables.");
      return res.status(500).json({
        success: false,
        message: "An internal server configuration error occurred.",
      });
    }

    // 3. Verify and decode the payload
    const decoded = jwt.verify(token, secret);

    // 4. Attach token payload to the request object for downstream routes
    req.user = decoded;

    // 5. Pass control to the next middleware/controller
    return next();
  } catch (error) {
    console.error("Token verification failed:", error.message);

    // Differentiate expired tokens from malformed ones for better client debugging
    const clientMessage =
      error.name === "TokenExpiredError"
        ? "Session expired. Please log in again."
        : "Invalid authentication token.";

    return res.status(401).json({
      success: false,
      message: clientMessage,
    });
  }
};
