const mongoose = require("mongoose");
const Logger = require("../utils/logger");

const logger = new Logger("Database");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/kanban");
    logger.success(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    logger.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
