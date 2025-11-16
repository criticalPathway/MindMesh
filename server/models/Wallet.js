const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({
  UserId: {
    type: String,
    require: true,
  },
  Amount: {
    type: Number,
  },
  Invested: {
    type: Number,
  },
});

//we have created the table now we will export this table

module.exports = mongoose.model("wallet", walletSchema);
