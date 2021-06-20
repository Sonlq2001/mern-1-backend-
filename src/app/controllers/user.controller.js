import User from "./../models/user.model";
import bcrypt from "bcrypt";
const saltRounds = 10;
import jwt from "jsonwebtoken";

// [GET] /user
export const list = (req, res) => {
	User.find((err, data) => {
		if (err) {
			return res
				.status(400)
				.json({ error: "Không tìm thấy danh sách user" });
		}

		res.json(data);
	});
};

// get id
export const userId = (req, res, next, id) => {
	User.findById(id).exec((err, data) => {
		if (err) {
			return res.status(400).json({ error: "Không tìm thấy user" });
		}

		req.profile = data;
		next();
	});
};

// get id
export const getId = (req, res, next, id) => {
	User.findById(id).exec((err, data) => {
		if (err) {
			return res.status(400).json({ error: "Không tìm thấy user" });
		}

		req.user = data;
		next();
	});
};

// [GET] /user/:id
export const detail = (req, res) => {
	const user = req.profile;
	user.password = undefined;
	return res.json(user);
};

// [POST] /add-user
export const add = (req, res) => {
	const { password } = req.body;

	bcrypt.hash(password, saltRounds, function (err, hash) {
		req.body.password = hash;
		const user = new User(req.body);

		user.save((err, data) => {
			if (err) {
				return res.status(400).json({
					error: "Đăng kí tài khoản không thành công !",
				});
			}

			// const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

			const { _id, name, email, role } = data;

			res.json(data);
		});
	});
};

// [PUT] /update-user/:id
export const update = (req, res) => {
	const { _id } = req.user;
	const { password } = req.body;
	bcrypt.hash(password, saltRounds, function (err, hash) {
		req.body.password = hash;

		User.findByIdAndUpdate(_id, req.body, { new: true }, (err, data) => {
			if (err) {
				return res
					.status(400)
					.json({ error: "Cập nhập user không thành công !" });
			}
			res.json(data);
		});
	});
};

// [DELETE] /delete-user/:id
export const remove = (req, res) => {
	const userRemove = req.user;
	userRemove.delete((err, data) => {
		if (err) {
			return res
				.status(400)
				.json({ error: "Xóa user không thành công !" });
		}
		res.json(data);
	});
};

// [PUT] /update-client
export const updateClient = (req, res) => {
	const { password, password_new } = req.body;
	const userById = req.user;
	bcrypt.compare(password, userById.password, function (err, result) {
		if (result) {
			bcrypt.hash(password_new, saltRounds, function (err, hash) {
				req.body.password = hash;
				req.body.password_new = undefined;
				User.findByIdAndUpdate(
					userById._id,
					req.body,
					{ new: true },
					(err, data) => {
						if (err) {
							return res.status(400).json({
								error: "Cập nhập user không thành công !",
							});
						}
						res.json(data);
					}
				);
			});
		} else {
			return res
				.status(400)
				.json({ error: "Mật khẩu cũ không chính xác !" });
		}
	});
};
