const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: {
    filename: String,
    url: String,
  },
  price: Number,
  location: String,
  country: {
    type: String,
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "review",
    },
  ],
});

const Listening = mongoose.model("Listening", listingSchema);
module.exports = Listening;
