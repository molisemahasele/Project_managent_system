const express = require('express');
const colors = require('colors');
const cors = require('cors');
require('dotenv').config();
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const port = process.env.PORT || 5000;
const app = express();

// Connect to database
//const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/graphql_crud';
const MONGO_URI = 'mongodb+srv://molisemahasele3:3n7mRFGmDT3XKj7B@cluster0.pj9syit.mongodb.net/graphql?retryWrites=true&w=majority'


const connectDB = async () => {
  const conn = await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
};

connectDB(); // Call the connectDB function to establish the MongoDB connection

app.use(cors());

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(port, console.log(`Server running on port ${port}`));
