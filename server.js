const express = require('express');
const mongoose = require('mongoose');
const todoRoutes = require('./routers/todoRoutes');
const authRoutes = require('./routers/authRoutes');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongo_url = process.env.mongo_local;
const port = process.env.PORT || 3000;

app.use('/todos', todoRoutes);
app.use('/', authRoutes);

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
