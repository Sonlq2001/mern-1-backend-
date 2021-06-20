import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;
const Schema = mongoose.Schema;

const Cart = new Schema(
	{
		userId: {
			type: ObjectId,
			ref: "User",
			required: true,
		},
		prdId: {
			type: ObjectId,
			ref: "Product",
			required: true,
		},
		quantity: {
			type: Number,
			default: 1,
		},
		price: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Cart", Cart);
