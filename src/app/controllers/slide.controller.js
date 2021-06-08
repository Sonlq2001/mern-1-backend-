import formidable from "formidable";
import fs from "fs";
import Slide from "./../models/slide.model";
import _ from "lodash";

class SlideController {
	// [GET] get id
	getId(req, res, next, id) {
		Slide.findById(id).exec((err, data) => {
			if (err) {
				return res.status(400).json({ error: "Không tìm thấy slide" });
			}

			req.slide = data;
			next();
		});
	}

	// [POST] /add-slide
	add(req, res) {
		const form = formidable({ multiples: true });
		form.parse(req, (err, fields, files) => {
			if (err) {
				return res
					.status(400)
					.json({ error: "Thêm slide không thành công !" });
			}

			const { path } = fields;

			if (!path || Object.keys(files).length === 0) {
				res.status(400).json({
					error: "Vui lòng nhập đầy đủ trường dữ liệu !",
				});
			}

			const slide = new Slide(fields);
			if (files.photo) {
				if (files.photo.size > 300000) {
					res.status(400).json({
						error: "Vui lòng chọn ảnh có kích thước nhỏ hơn 3mb",
					});
				}
				slide.photo = fs.readFileSync(files.photo.path);
				slide.photo.contentType = files.photo.type;
			}

			slide.save((err, data) => {
				if (err) {
					return res
						.status(400)
						.json({ error: "Thêm slide không thành công !" });
				}

				res.json(data);
			});
		});
	}

	// [GET] /slide/img/:id
	getImg(req, res) {
		if (req.slide.photo) {
			res.set("Content-Type", req.slide.photo.contentType);
			return res.send(req.slide.photo);
		}
	}

	// [GET] /slide
	list(req, res) {
		Slide.find((err, data) => {
			if (err) {
				return res
					.status(400)
					.json({ error: "Không tìm thấy danh sách slide" });
			}

			res.json(data);
		});
	}

	// [DELETE] /delete-slide/:id
	remove(req, res) {
		const removeSlide = req.slide;
		removeSlide.delete((err, data) => {
			if (err) {
				return res
					.status(400)
					.json({ error: "Xóa slide không thành công !" });
			}

			res.json(data);
		});
	}

	// [PUT] /edit-slide/:id
	update(req, res) {
		const form = formidable({ multiples: true });
		form.parse(req, (err, fields, files) => {
			if (err) {
				return res
					.status(400)
					.json({ error: "Sửa slide không thành công !" });
			}

			let slide = req.slide;
			slide = _.assignIn(slide, fields);

			if (files.photo) {
				if (files.photo.size > 300000) {
					return res
						.status(400)
						.json({ error: "Vui lòng chọn ảnh dưới 3mb !" });
				}

				slide.photo = fs.readFileSync(files.photo.path);
				slide.photo.contentType = files.photo.type;
			}

			slide.save((err, data) => {
				if (err) {
					return res
						.status(400)
						.json({ error: "Sửa slide không thành công !" });
				}

				res.json(data);
			});
		});
	}

	// [GET] /slide/:id
	detail(req, res) {
		res.json(req.slide);
	}
}

export default new SlideController();
