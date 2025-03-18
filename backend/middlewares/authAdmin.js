import jwt from "jsonwebtoken";

//  admin authentication middleware

const authAdmin = async (req, res, next) => {
  try {
    const { atoken } = req.headers;
    if (!atoken) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized. Please Login" });
    }

    const token_decode = jwt.verify(atoken, process.env.JWT_SECRET);
    if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized. Please Login" });
    }
      next();
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error.", error: error.message });
  }
};

export default authAdmin