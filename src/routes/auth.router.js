import express from "express";

import { userSignupValidator } from "./../validation/auth";
import { signUp, signIn, signOut } from "./../app/controllers/auth.controller";

const router = express.Router();

// sign up
router.post("/sign-up", userSignupValidator, signUp);

// sign in
router.post("/sign-in", signIn);

// sign out
router.get("/sign-out", signOut);
export default router;
