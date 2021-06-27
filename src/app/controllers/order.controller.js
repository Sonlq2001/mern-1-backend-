import Order from "./../models/order.model";

class OrderController {
	// [GET] /order
	list(req, res) {
		Order.find((err, data) => {
			if (err) {
				return res
					.status(400)
					.json({ error: "Không tìm thấy danh sách order" });
			}

			res.json(data);
		});
	}

	// [POST] /add-order
	add(req, res) {
		const order = new Order(req.body);
		order.save((err, data) => {
			if (err) {
				return res
					.status(400)
					.json({ error: "Thêm order không thành công !" });
			}

			res.json(data);
		});
	}

	// [DELETE] /delete-order/:id
	remove(req, res) {
		const idOrder = req.params.id;
		Order.deleteOne({ _id: idOrder }, (err, data) => {
			if (err) {
				return res
					.status(400)
					.json({ error: "Xóa order không thành công !" });
			}
			res.json(data);
		});
	}
}

export default new OrderController();
