const express = require("express");
const connectToDB = require("./config/db");
const { userRouter } = require("./routes/user.route");
const bookRoute = require("./routes/book.route");
const cors = require("cors");
const app = express();
const PORT = 8080;
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is Runnig Successfully");
});

app.use("/users", userRouter);

app.use("/books", bookRoute);

app.listen(PORT, async (req, res) => {
  try {
    await connectToDB;
    console.log("Connected to DB successfully");
    console.log(`Serever is runnig on port http://localhost:${PORT}`);
  } catch (error) {
    console.error(error);
  }
});
