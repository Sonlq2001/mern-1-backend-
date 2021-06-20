import Comment from "./../models/comment.model";

class CommentController {
	// [GET] /comment
	list(req, res) {
		Comment.find((err, data) => {
			if (err) {
				return res
					.status(400)
					.json({ error: "Không tìm thấy danh sách comment" });
			}

			res.json(data);
		});
	}

	// [POST] /add-comment
	add(req, res) {
		const comment = new Comment(req.body);
		comment.save((err, data) => {
			if (err) {
				return res
					.status(400)
					.json({ error: "Bình luận không thành công !" });
			}

			res.json(data);
		});
	}

	// get id
	getId(req, res, next, id) {
		Comment.findById(id).exec((err, data) => {
			if (err) {
				return res
					.status(400)
					.json({ error: "Không tìm thấy comment" });
			}
			req.comment = data;
			next();
		});
	}

	// [DELETE] /delete-comment/:id
	remove(req, res) {
		const commentRemove = req.comment;
		commentRemove.delete((err, data) => {
			if (err) {
				return res
					.status(400)
					.json({ error: "Xóa comment không thành công !" });
			}
			res.json(data);
		});
	}
}

export default new CommentController();
