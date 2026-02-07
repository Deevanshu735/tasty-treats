const mongoose = require("mongoose");

const connectDatabase = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    const data = await mongoose.connect(process.env.DB_URI);
    console.log(`Database connected to ${data.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDatabase;
