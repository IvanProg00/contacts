const mongoose = require("mongoose");
const { MONGO_USERNAME, MONGO_PASSWORD } = require("./config");

module.exports = () => {
	mongoose.connect(`mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@db:27017/contacts`, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	});
	mongoose.set("useFindAndModify", false)
	const db = mongoose.connection;
	db.on("error", () => {
		console.error("Error in connection to Mongo!!!");
	}).once("open", () => {
		console.log("Success connection to Mongo.");
	});
};
