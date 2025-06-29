// config.js
require('dotenv').config();

module.exports = {
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/proffolio",
  JWT_SECRET: process.env.JWT_SECRET || "your_super_secret_jwt_key_here_change_this_in_production",
  PORT: process.env.PORT || 4000
};
