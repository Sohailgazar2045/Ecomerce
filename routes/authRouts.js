import express from "express";
import {
  registerController,
  loginController,
  testController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

// router object // age hum seprate folder main router bnany hon to router ka alag sy bnanaa bnana prta hy
const router = express.Router();

// routing
// Register || method POST
router.post("/register", registerController);

//Login || POST
router.post("/login", loginController);

// test route
router.get("/test", requireSignIn, isAdmin, testController);

export default router;
