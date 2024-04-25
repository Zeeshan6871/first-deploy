const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  title: { type: String, required: true, unique: true },
  genre: { type: String, required: true },
  price: { type: Number, required: true },
  author: { type: String, required: true },
  authorID: { type: Number, required: true },
  publishedAt: { type: Date },
});

const bookModel = mongoose.model("book", bookSchema);

module.exports = bookModel;
