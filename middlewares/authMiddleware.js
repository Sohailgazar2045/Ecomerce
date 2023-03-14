import jwt from "jsonwebtoken";
import users from "../models/usersModel.js";
export const requireSignIn = async (req, res, next) => {
  try {
    const decode = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET || JJFDHFH75458
    );
    req.user = decode;
    next();
  } catch (error) {
    connsole.log(error);
  }
};

// Admin Accesss
export const isAdmin = async (req, res, next) => {
  try {
    const user = await users.findById(req.user._id);
    if (user && user.role === 1) {
      next();
    } else {
      return res.status(401).send({
        success: false,
        message: "Unauthorized Access",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Middleware",
    });
  }
};
