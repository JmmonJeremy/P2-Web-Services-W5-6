// this page is a google auth database add-on
const mongoose = require('mongoose');
require('dotenv').config(); // Add this line to get the MONGODB_URI value from the .env file

const connectDB = async () => {
  try{
      const conn = await mongoose.connect(process.env.MONGODB_URI, {
          // useNewUrlParser: true,  (deprecated option - no longer needed)
          // useUnifiedTopology: true,  (deprecated option - no longer needed)
          // useFindAndModify: false (deprecated option - no longer needed)
      })

      console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
      console.error(err);
      process.exit(1);
  };
}

module.exports = connectDB