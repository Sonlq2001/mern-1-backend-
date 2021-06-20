import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;
const Schema = mongoose.Schema;

const OrderDetail = new Schema(
	{
		orderId: {
			type: ObjectId,
			ref: "order",
			required: true,
		},
		prdId: {
			type: ObjectId,
			ref: "product",
			required: true,
		},
		quantity: {
			type: Number,
			required: true,
		},
		unitPrice: {
			type: Number,
			required: true,
		},
		status: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("OrderDetail", OrderDetail);
