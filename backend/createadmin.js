const User = require("./models/User");
const bcrypt = require("bcryptjs");

const createAdmin = async () => {
  try {

    const adminEmail = "nikhildanu713@gmail.com";

    const adminExist = await User.findOne({ email: adminEmail });

    if (adminExist) {
      console.log("Admin already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash("123456", 10);

    const admin = new User({
      name: "Admin",
      email: adminEmail,
      password: hashedPassword,
      isadmin: true
    });

    await admin.save();

    console.log("Admin created successfully");

  } catch (error) {
    console.log("Admin creation error", error);
  }
};

module.exports = createAdmin;