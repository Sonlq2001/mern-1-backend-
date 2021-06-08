import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Category = new Schema(
	{
		name: {
			type: String,
			required: true,
			maxLength: 50,
		},
		photo: {
			data: Buffer,
			contentType: String,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Category", Category);
