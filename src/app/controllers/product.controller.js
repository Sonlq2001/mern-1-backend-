import formidable from "formidable";
import fs from "fs";
import Product from "./../models/product.model";
import _ from "lodash";

class ProductController {
	// [GET] /products
	async list(req, res) {
		try {
			const listProduct = await Product.find({});
			res.json(listProduct);
		} catch (error) {}
	}

	// [POST] /product/add
	add(req, res) {
		const form = formidable({ multiples: true });

		form.parse(req, (err, fields, files) => {
			if (err) {
				res.status(400).json({
					error: "Thêm sản phẩm không thành công !",
				});
			}

			const { cateId, name, price, description, status } = fields;
			if (!cateId || !name || !price || !description || !status) {
				return res
					.status(400)
					.json({ error: "Cần nhập các trương bắt buộc !" });
			}

			const product = new Product(fields);

			if (files.photo) {
				if (files.photo.size > 300000) {
					res.status(400).json({
						error: "File chỉ dược phép dưới 3mb",
					});
				}
				product.photo = fs.readFileSync(files.photo.path);
				product.photo.ContentType = files.photo.type;
			}

			product.save((err, data) => {
				if (err)
					return res
						.status(400)
						.json({ error: "Thêm sản phẩm không thành công !" });

				res.json(data);
			});
		});
	}

	// [GET] get id
	getId(req, res, next, id) {
		Product.findById(id).exec((err, product) => {
			if (err)
				res.status(400).json({ error: "Không tìm thấy sản phẩm !" });

			req.product = product;
			next();
		});
	}

	// [GET] /product/img/:id
	getImg(req, res, next) {
		if (req.product) {
			res.set("Content-Type", req.product.photo.contentType);
			return res.send(req.product.photo);
		}
	}

	// [DELETE] /delete-product/:id
	remove(req, res) {
		const removeProduct = req.product;
		removeProduct.delete((err, data) => {
			if (err) {
				return res.status(400).json("Xóa sản phẩm không thành công !");
			}

			res.json(data);
		});
	}

	// [PUT] /update-product/:id
	update(req, res) {
		const form = formidable({ multiples: true });
		form.parse(req, (err, fields, files) => {
			if (err) {
				return res
					.status(400)
					.json({ error: "Sửa sản phẩm không thành công !" });
			}

			const { cateId, name, price, description, status } = fields;
			if (!cateId || !name || !price || !description || !status) {
				return res
					.status(400)
					.json({ error: "Vui lòng nhập đủ các trường dữ liệu !" });
			}

			let product = req.product;
			product = _.assignIn(product, fields);

			if (files.photo) {
				if (files.photo.size > 300000) {
					return res.status(400).json({
						error: "Vui lòng chọn ảnh có kích thước dưới 3mb",
					});
				}

				product.photo = fs.readFileSync(files.photo.path);
				product.photo.contentType = files.photo.type;
			}

			product.save((err, data) => {
				if (err) {
					return res
						.status(400)
						.json({ error: "Sửa sản phẩm không thành công !" });
				}

				res.json(data);
			});
		});
	}

	// [GET] /product/:id/
	detail(req, res) {
		const detailProduct = req.product;
		res.json(detailProduct);
	}
}

export default new ProductController();
