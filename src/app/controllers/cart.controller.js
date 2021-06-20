import Cart from "./../models/cart.model";

class CartController {
	// [GET] /cart
	list(req, res) {
		Cart.find((err, data) => {
			if (err) {
				return res
					.status(400)
					.json({ error: "Không tìm thấy danh sách giỏ hàng" });
			}
			res.json(data);
		});
	}

	// [POST] /add-cart
	add(req, res) {
		const cart = new Cart(req.body);
		cart.save((err, data) => {
			if (err) {
				return res
					.status(400)
					.json({ error: "Thêm vào giỏ hàng không thành công !" });
			}

			res.json(data);
		});
	}

	// get id
	getId(req, res, next, id) {
		Cart.findById(id).exec((err, data) => {
			if (err) {
				return res
					.status(400)
					.json({ error: "Không tìm thấy cart trùng khớp" });
			}

			req.cart = data;
			next();
		});
	}

	// [PUT] /update-cart
	update(req, res) {
		const cartUpdate = req.cart;
		cartUpdate.quantity = req.body.quantity;
		cartUpdate.save((err, data) => {
			if (err) {
				return res
					.status(400)
					.json({ error: "Sửa giỏ hàng không thành công !" });
			}

			res.json(data);
		});
	}

	// [DELETE] /delete-cart/:id
	remove(req, res) {
		const cartRemove = req.cart;
		cartRemove.delete((err, data) => {
			if (err) {
				return res
					.status(400)
					.json({
						error: "Xóa sản phẩm trong giỏ hàng không thành công !",
					});
			}
			res.json(data);
		});
	}
}

export default new CartController();
