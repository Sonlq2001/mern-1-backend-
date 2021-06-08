import bcrypt from "bcrypt";
const saltRounds = 10;
import jwt from "jsonwebtoken";
import expressJwt from "express-jwt";
require("dotenv").config();

import User from "./../models/user.model";

// class AuthController {
// 	// [POST] /sign-up
// 	signUp(req, res) {
// 		const { name, email, password } = req.body;

// 		bcrypt.hash(password, saltRounds, function (err, hash) {
// 			req.body.password = hash;
// 			const user = new User(req.body);

// 			user.save((err, data) => {
// 				if (err) {
// 					return res.status(400).json({
// 						error: "Đăng kí tài khoản không thành công !",
// 					});
// 				}

// 				const token = jwt.sign(
// 					{ id: user._id },
// 					process.env.JWT_SECRET
// 				);

// 				const { _id, name, email } = data;
// 				res.json({
// 					user: { _id, name, email },
// 					token,
// 				});
// 			});
// 		});
// 	}

// 	// [POST] /sign-in
// 	signIn(req, res) {
// 		const { email, password } = req.body;
// 		User.findOne({ email }, (error, user) => {
// 			if (error || !user) {
// 				return res
// 					.status(400)
// 					.json({ error: "Tài khoản không tồn tại !" });
// 			}

// 			bcrypt.compare(password, user.password, function (err, result) {
// 				if (result) {
// 					const token = jwt.sign(
// 						{ id: user._id },
// 						process.env.JWT_SECRET
// 					);

// 					const { _id, name, email, role } = user;

// 					res.cookie("t", token, { expire: new Date() + 9999 });
// 					res.json({
// 						token,
// 						user: { _id, name, email, role },
// 					});
// 				} else {
// 					res.status(400).json({ error: "Mật khẩu không chính xác" });
// 				}
// 			});
// 		});
// 	}

// 	// [GET] /sign-out
// 	signOut(req, res) {
// 		res.clearCookie("t");
// 		res.json("Sign out success");
// 	}

// 	// check admin
// 	requireSignin(req, res) {
// 		expressJwt({
// 			secret: process.env.JWT_SECRET,
// 			algorithms: ["HS256"],
// 			userProperty: "auth",
// 		});
// 	}
// }

export const signUp = (req, res) => {
	const { name, email, password } = req.body;

	bcrypt.hash(password, saltRounds, function (err, hash) {
		req.body.password = hash;
		const user = new User(req.body);

		user.save((err, data) => {
			if (err) {
				return res.status(400).json({
					error: "Đăng kí tài khoản không thành công !",
				});
			}

			const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

			const { _id, name, email } = data;
			res.json({
				user: { _id, name, email },
				token,
			});
		});
	});
};

export const signIn = (req, res) => {
	const { email, password } = req.body;
	User.findOne({ email }, (error, user) => {
		if (error || !user) {
			return res.status(400).json({ error: "Tài khoản không tồn tại !" });
		}

		bcrypt.compare(password, user.password, function (err, result) {
			if (result) {
				const token = jwt.sign(
					{ id: user._id },
					process.env.JWT_SECRET
				);

				const { _id, name, email, role } = user;

				res.cookie("t", token, { expire: new Date() + 9999 });
				res.json({
					token,
					user: { _id, name, email, role },
				});
			} else {
				res.status(400).json({ error: "Mật khẩu không chính xác" });
			}
		});
	});
};

export const signOut = (req, res) => {
	res.clearCookie("t");
	res.json("Sign out success");
};

export const requireSignin = expressJwt({
	secret: process.env.JWT_SECRET,
	algorithms: ["HS256"],
	userProperty: "auth",
});

export const isAuth = (req, res, next) => {
	// req.profile => thông tin của admin
	// req.auth => mã token
	let user = req.profile && req.auth && req.profile._id == req.auth.id;
	// console.log(req.auth);
	if (!user) {
		return res.status(403).json({
			error: "Access Denied",
		});
	}
	next();
};

export const isAdmin = (req, res, next) => {
	if (req.profile.role == 0) {
		return res.status(403).json({
			error: "Admin resource! Access Denined",
		});
	}
	next();
};

// export default new AuthController();
