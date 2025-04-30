const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongo_url = process.env.mongo_url;
const port = process.env.PORT || 3000;
mongoose.set("strictQuery", false);
mongoose
  .connect(mongo_url)
  .then(() => {
    console.log("Connected to MongoDB server");
  })
  .catch((error) => {
    console.log(`Failed to connect: ${error}`);
  });
app.use("/api/todos", require("./routers/todoRoutes"));
app.use("/api/auth", require("./routers/authRoutes"));
app.use("/api/users",require("./routers/userRouters"));
app.use("/api/categories",require("./routers/category.routes"));


app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
