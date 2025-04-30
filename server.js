const express = require("express");
require("dotenv").config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 3000;
require("./config/db").connectDb();
app.use("/api/todos", require("./routers/todoRoutes"));
app.use("/api/auth", require("./routers/authRoutes"));
app.use("/api/users",require("./routers/userRouters"));
app.use("/api/categories",require("./routers/category.routes"));


app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
