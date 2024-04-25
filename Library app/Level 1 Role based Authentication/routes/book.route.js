const express = require("express");
const auth = require("../middleware/auth.middleware");
const access = require("../middleware/access.middleware");
const bookModel = require("../model/book.model");
const userModel = require("../model/user.model");
const bookRoute = express();

bookRoute.get(
  "/",
  auth,
  access("VIEW_ALL", "CREATOR", "VIEWER"),
  async (req, res) => {
    const { newBook, oldBook } = req.query;
    try {
      const query = {};
      if (oldBook) {
        query.publishedAt = {
          $lt: new Date(new Date().getTime() - 10 * 60000),
        };
      }
      if (newBook) {
        query.publishedAt = {
          $gte: new Date(new Date().getTime() - 10 * 60000),
        };
      }
      const books = await bookModel.find(query);
      res.status(200).json({ data: books });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: error.message });
    }
  }
);

bookRoute.post("/", auth, access("CREATOR", "VIEWER"), async (req, res) => {
  try {
    const newBook = new bookModel({ ...req.body, publishedAt: Date.now() });
    await newBook.save();
    res.status(200).json({ msg: "Book Created successfully", data: newBook });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
});

bookRoute.get(
  "/viewer",
  auth,
  access("VIEWER", "CREATOR"),
  async (req, res) => {
    const { newBook, oldBook } = req.query;
    try {
      const query = {};
      if (oldBook) {
        query.publishedAt = {
          $lt: new Date(new Date().getTime() - 10 * 60000),
        };
      }
      if (newBook) {
        query.publishedAt = {
          $gte: new Date(new Date().getTime() - 10 * 60000),
        };
      }
      const books = await bookModel.find({
        authorID: Number(req.body.authorID),
        ...query,
      });
      res.status(200).json({ data: books });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: error.message });
    }
  }
);

bookRoute.patch("/:id", auth, access("CREATOR"), async (req, res) => {
  const { id } = req.params;
  try {
    const book = await bookModel.findOne({ _id: id });
    if (book) {
      if (book.authorID == req.body.authorID) {
        const updatedBook = await bookModel.findByIdAndUpdate(
          { _id: id },
          req.body
        );
        await updatedBook.save();
        res.status(200).json({ msg: "Book updated Successfully" });
      } else {
        res.status(401).json({ msg: "Not accesseble" });
      }
    } else {
      res.status(404).json({ msg: "book not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
});

bookRoute.delete("/:id", auth, access("CREATOR"), async (req, res) => {
  const { id } = req.params;
  try {
    const book = await bookModel.findOne({ _id: id });
    if (book) {
      if (book.authorID == req.body.authorID) {
        bookModel.findByIdAndDelete({ _id: id });
        res.status(200).json({ msg: "Book Deleted Successfully" });
      } else {
        res.status(401).json({ msg: "Not accesseble" });
      }
    } else {
      res.status(404).json({ msg: "book not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
});

module.exports = bookRoute;
