const roleMiddleware = (requiredRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized: No user found" });
    }

    const userRole = req.user.role;
    const isGetRequest = req.method === "GET";
    const requestPath = req.path.toLowerCase();

    // ✅ Allow donors to fetch only their donations
    if (isGetRequest && requestPath.includes("/my-donations") && userRole === "donor") {
      return next();
    }

    // 🚫 Restrict access for other routes/methods
    if (!requiredRoles.includes(userRole)) {
      return res.status(403).json({ error: `Access denied for role: ${userRole}` });
    }

    next();
  };
};

export default roleMiddleware;
