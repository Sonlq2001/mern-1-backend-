import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Slide = Schema(
	{
		photo: {
			type: Buffer,
			contentType: String,
			required: true,
		},
		path: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Slide", Slide);
