const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next({
      statusCode: 401,
      message: "Authorization token missing or invalid",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // Attach the user ID from token payload to request object
    req.user = { userId: payload.id };
    next();
  } catch (error) {
    return next({
      statusCode: 401,
      message: "Token verification failed. Please login again.",
    });
  }
};

module.exports = userAuth;