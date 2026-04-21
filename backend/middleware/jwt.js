const jwt = require("jsonwebtoken");

const authentication = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("authHeader", authHeader);

  if (!authHeader) {
    return res.status(401).json({ message: "Invalid token" });
  }

  const token = authHeader.split(" ")[1];
  console.log("token", token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded", decoded);

    // ✅ Correctly set req.user
    req.user = {
      id: decoded.id,          // user id
      isadmin: decoded.isadmin // boolean
    };

    next();
  } catch (error) {
    console.log("JWT error:", error);
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = authentication;