import mongoose from "mongoose";

const connect = async () => {
	try {
		await mongoose.connect("mongodb://localhost:27017/computer", {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
			useCreateIndex: true,
		});
		console.log("connect successfully !");
	} catch (error) {
		console.log("connect fail !");
	}
};

export default { connect };
