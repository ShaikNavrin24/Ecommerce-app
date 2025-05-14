const mongoose = require("mongoose");
require('dotenv').config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb+srv://kundybrahmam:Kundy%402005@mernecommerce.1yp6mjy.mongodb.net/MERNEcommerce?retryWrites=true&w=majority&appName=MERNEcommerce', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB Connected:');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
