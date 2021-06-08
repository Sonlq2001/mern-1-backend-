import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

const Schema = mongoose.Schema;

const Product = new Schema(
	{
		cateId: {
			type: ObjectId,
			ref: "category",
			required: true,
		},
		subCateId: {
			type: ObjectId,
			ref: "subCategory",
			required: true,
		},
		name: {
			type: String,
			required: true,
			maxLength: 200,
		},
		price: {
			type: Number,
			required: true,
		},
		sale: {
			type: Number,
			maxLength: 3,
		},
		photo: {
			type: Buffer,
			contentType: String,
		},
		// type: {
		// 	type: Number,
		// 	required: true,
		// },
		guarantee: {
			type: Number,
			required: true,
		},
		description: {
			type: String,
			maxLength: 2000,
			required: true,
		},
		status: {
			type: Boolean,
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Product", Product);
