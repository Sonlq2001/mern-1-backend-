import express from "express";
const router = express.Router();

import userControllers from "./../app/controllers/user.controller";
import { getId, detail, list } from "./../app/controllers/user.controller";
import {
	requireSignin,
	isAdmin,
	isAuth,
} from "./../app/controllers/auth.controller";

router.get("/secret/:userId", requireSignin, isAuth, isAdmin, (req, res) => {
	res.json({
		user: req.profile,
	});
});

// get id
router.param("userId", getId);

// list
router.get("/user", list);

// detail
router.get("/user/:userId", detail);

export default router;
