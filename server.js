const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const todoRoutes = require('./routers/todoRoutes');
const app = express();
const mongo_url = process.env.mongo_url;
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;
app.use('/todos', todoRoutes);


mongoose.set('strictQuery', false);
mongoose.connect(mongo_url)
  .then(() => {
    console.log('Connected to MongoDB server');
  })
  .catch((error) => {
    console.log(`Failed to connect: ${error}`);
  });

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
