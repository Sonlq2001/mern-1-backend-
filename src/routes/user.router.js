import express from "express";
const router = express.Router();

import {
	userId,
	detail,
	list,
	add,
	update,
	remove,
	getId,
	updateClient,
} from "./../app/controllers/user.controller";
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
router.param("userId", userId);

router.param("id", getId);

// list
router.get("/user", list);

// detail
router.get("/user/:userId", detail);

// add user
router.post("/add-user/:userId", requireSignin, isAuth, isAdmin, add);

// update
router.put("/update-user/:id/:userId", requireSignin, isAuth, isAdmin, update);

// delete
router.delete(
	"/delete-user/:id/:userId",
	requireSignin,
	isAuth,
	isAdmin,
	remove
);

// update info
router.put("/update-client/:id", updateClient);

export default router;
