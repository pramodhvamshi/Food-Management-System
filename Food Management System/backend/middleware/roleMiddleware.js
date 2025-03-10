const roleMiddleware = (requiredRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized: No user found" });
    }

    // Allow donors to fetch their own donations (GET request only)
    if (req.method === "GET" && req.path.startsWith("/api/donations") && req.user.role === "donor") {
      return next();
    }

    // Restrict access based on requiredRoles for POST & PUT requests
    if (!requiredRoles.includes(req.user.role)) {
      return res.status(403).json({ error: "Access denied" });
    }

    next();
  };
};

export default roleMiddleware;
