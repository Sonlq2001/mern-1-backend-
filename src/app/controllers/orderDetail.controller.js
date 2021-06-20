import OrderDetail from "./../models/orderDetail.model";

class OrderDetailController {
	// [GET] /order-detail
	list(req, res) {
		OrderDetail.find((err, data) => {
			if (err) {
				return res
					.status(400)
					.json({ error: "Không tìm thấy danh sách order detail" });
			}

			res.json(data);
		});
	}

	// [POST] /add-order-detail
	add(req, res) {
		const orderDetail = req.body;
		OrderDetail.insertMany(orderDetail, { new: true }, (err, data) => {
			if (err) {
				return res
					.status(400)
					.json({ error: "Thêm order detail không thành công !" });
			}
			res.json(data);
		});
	}

	// get id
	// getId(req, res, next, id) {
	// 	// console.log(id);
	// 	// OrderDetail.findById(id).exec((err, data) => {
	// 	// 	if (err) {
	// 	// 		return res
	// 	// 			.status(400)
	// 	// 			.json({ error: "Không tìm thấy order detail" });
	// 	// 	}
	// 	// 	req.orderDetail = data;
	// 	// 	next();
	// 	// });
	// }

	// [PUT] /update-order-detail/:id
	update(req, res) {
		const idOrderDetail = req.params.id;
		OrderDetail.updateMany(
			{ orderId: idOrderDetail },
			{ status: 2 },
			{ new: true },
			(err, data) => {
				if (err) {
					return res.status(400).json({
						error: "Cập nhập order detail không thành công !",
					});
				}
				res.json(data);
			}
		);
	}
}

export default new OrderDetailController();
