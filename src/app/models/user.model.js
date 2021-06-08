import mongoose from "mongoose";

const Schema = mongoose.Schema;

const User = Schema(
	{
		name: {
			type: String,
			maxLength: 60,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: 32,
		},
		password: {
			type: String,
			required: true,
		},
		role: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Users", User);
