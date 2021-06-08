import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;
const Schema = mongoose.Schema;

const SubCategory = Schema(
	{
		cateId: {
			type: ObjectId,
			ref: "category",
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("SubCategory", SubCategory);
