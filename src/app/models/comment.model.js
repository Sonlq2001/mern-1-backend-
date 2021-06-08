import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const Schema = mongoose.Schema;
const Comment = new Schema(
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
		content: {
			type: String,
			trim: true,
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Comment", Comment);
