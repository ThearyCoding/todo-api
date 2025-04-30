const mongoose = require("mongoose");
const mongo_url = process.env.mongo_url;

mongoose.set("strictQuery", false);
exports.connectDb = async () => {
  mongoose
    .connect(mongo_url)
    .then(() => console.log("connnected to mongodb server"))
    .catch((e) => console.log(`Failed to connect: ${e}`));
};