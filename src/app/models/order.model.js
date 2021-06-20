import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const Schema = mongoose.Schema;

const Order = new Schema(
	{
		userId: {
			type: ObjectId,
			ref: "user",
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
			required: true,
		},
		capital: {
			type: Number,
			required: true,
		},
		address: {
			type: String,
			required: true,
		},
		payment: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Order", Order);
