
const admin = (req, res, next) => {
  try {
 
    if (req.user && req.user.isadmin) {
      next(); 
    } else {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error in admin middleware" });
  }
};

module.exports = admin;