import formidable from "formidable";
import fs from "fs";
import _ from "lodash";

import Category from "./../models/category.model";

class CategoryController {
	// [GET] get id
	getId(req, res, next, id) {
		Category.findById(id).exec((err, data) => {
			if (err) {
				return res
					.status(400)
					.json({ error: "Không tìm thấy danh mục !" });
			}

			req.category = data;
			next();
		});
	}

	// [GET] /category
	list(req, res) {
		Category.find((err, data) => {
			if (err)
				res.status(400).json({
					error: "Không tìm thấy danh sách danh mục !",
				});
			res.json(data);
		});
	}

	// [POST] /add-category
	add(req, res) {
		const form = formidable({ multiples: true });
		form.parse(req, (err, fields, files) => {
			if (err)
				res.status(400).json({
					error: "Thêm danh mục không thành công",
				});

			const { name } = fields;
			if (!name) res.status(400).json({ error: "Cần nhập tên danh mục" });

			const category = new Category(fields);
			if (files.photo) {
				if (files.photo.size > 300000)
					res.status(400).json({
						error: "File chỉ dược phép dưới 3mb",
					});

				category.photo.data = fs.readFileSync(files.photo.path);
				category.photo.contentType = files.photo.type;
			}

			category.save((err, data) => {
				if (err)
					res.status(400).json({ error: "Không thêm được danh mục" });

				res.json(data);
			});
		});
	}

	// [DELETE] /delete-category
	remove(req, res) {
		const removeCategory = req.category;
		removeCategory.delete((err, data) => {
			if (err) {
				return res
					.status(400)
					.json({ error: "Xóa sản phẩm không thành công !" });
			}

			res.json(data);
		});
	}

	// [GET] /category/img/:id
	getImg(req, res) {
		if (req.category.photo) {
			res.set("Content-Type", req.category.photo.contentType);
			return res.send(req.category.photo.data);
		}
	}

	// [PUT] /edit-category/:id;
	update(req, res) {
		const form = formidable({ multiples: true });
		form.parse(req, (err, fields, files) => {
			if (err)
				res.status(400).json({
					error: "Thêm danh mục không thành công",
				});
			const { name } = fields;
			if (!name) res.status(400).json({ error: "Cần nhập tên danh mục" });
			let category = req.category;
			category = _.assignIn(category, fields);
			if (files.photo) {
				if (files.photo.size > 300000) {
					res.status(400).json({
						error: "File chỉ dược phép dưới 3mb",
					});
				}
				category.photo.data = fs.readFileSync(files.photo.path);
				category.photo.contentType = files.photo.type;
			}

			category.save((err, data) => {
				if (err)
					res.status(400).json({
						error: "Không thêm sửa được danh mục",
					});
				res.json(data);
			});
		});
	}
}

export default new CategoryController();
