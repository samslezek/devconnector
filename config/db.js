const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

mongoose.set("useUnifiedTopology", true);
mongoose.set("useNewUrlParser", true);
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log("MongoDB connected...");
  } catch (err) {
    console.error(err.message);
    // Exit proocess with failure
    process.exit(1);
  }
};

module.exports = connectDB;

mongoose.connect(db);
