import users from "../models/usersModel.js";
import { comparePassword, hashPassword } from "../helpers/authhelper.js";
import jwt from "jsonwebtoken";
export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    // validation
    if (!name) {
      return res.send({ error: "Name is Required" });
    }
    if (!email) {
      return res.send({ error: "Email is Required" });
    }
    if (!password) {
      return res.send({ error: "password is Required" });
    }
    if (!phone) {
      return res.send({ error: "Phone is Required" });
    }
    if (!address) {
      return res.send({ error: "Address is Required" });
    }

    // check user
    const existingUser = await users.findOne({ email });
    // existing user
    if (existingUser) {
      res.status(200).send({
        success: true,
        message: "Already Register Please Loogin",
      });
    }

    // register user
    const hashedPassword = await hashPassword(password);

    // save
    const user = await new users({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
    }).save();
    res.status(201).send({
      success: true,
      message: "user register successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error,
    });
  }
};

// POST LOGIN

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(404).send({
        success: false,
        message: "Invalid Email oe Password",
        error,
      });
    }

    // check user
    const user = await users.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Emai is not Registered",
      });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Password is Invalid",
      });
    }

    const token = jwt.sign(
      { _id: user._id },
      process.env.JWT_SECRET || JJFDHFH75458,
      {
        expiresIn: "7h",
      }
    );

    return res.status(200).send({
      success: true,
      message: "User logged in successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};
