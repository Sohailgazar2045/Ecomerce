import express from "express";
import {
  registerController,
  loginController,
} from "../controllers/authController.js";

// router object // age hum seprate folder main router bnany hon to router ka alag sy bnanaa bnana prta hy
const router = express.Router();

// routing
// Register || method POST
router.post("/register", registerController);

//Login || POST
router.post("/login", loginController);

export default router;
