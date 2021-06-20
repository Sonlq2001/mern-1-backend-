import SubCategory from "./../models/subCategory.model";

class SubCategoryController {
	// [GET] /subcategory
	list(req, res) {
		SubCategory.find((err, data) => {
			if (err) {
				return res
					.status(400)
					.json({ error: "Không tìm thấy danh sách danh mục con !" });
			}
			res.json(data);
		});
	}

	// [POST] /add-subcategory
	add(req, res) {
		const subCategory = new SubCategory(req.body);
		subCategory.save((err, data) => {
			if (err) {
				return res
					.status(400)
					.json({ error: "Thêm danh mục con không thành công !" });
			}

			res.json(data);
		});
	}

	// get id
	getId(req, res, next, id) {
		SubCategory.findById(id).exec((err, data) => {
			if (err) {
				return res
					.status(400)
					.json({ error: "Không tìm thấy danh mục con !" });
			}
			req.subCategory = data;
			next();
		});
	}

	// [DELETE] /delete-subcategory
	remove(req, res) {
		const subCategoryRemove = req.subCategory;
		subCategoryRemove.delete((err, data) => {
			if (err) {
				return res
					.status(400)
					.json({ error: "Xóa danh mục con không thành công !" });
			}
			res.json(data);
		});
	}

	update(req, res) {
		const response = req.body;
		const subCategoryEdit = req.subCategory;
		subCategoryEdit.cateId = response.cateId;
		subCategoryEdit.name = response.name;

		subCategoryEdit.save((err, data) => {
			if (err) {
				return err
					.state(400)
					.json({ error: "Không sửa được danh mục con !" });
			}

			res.json(data);
		});
	}
}

export default new SubCategoryController();
