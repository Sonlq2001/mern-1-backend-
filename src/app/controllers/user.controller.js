import User from "./../models/user.model";

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
export const getId = (req, res, next, id) => {
	User.findById(id).exec((err, data) => {
		if (err) {
			return res.status(400).json({ error: "Không tìm thấy user" });
		}

		req.profile = data;
		next();
	});
};

// [GET] /user/:id
export const detail = (req, res) => {
	const user = req.profile;
	user.password = undefined;
	return res.json(user);
};
