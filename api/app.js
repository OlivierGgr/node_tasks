const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectToDb = require("./db/connect");
const cors = require("cors");

require("dotenv").config();

const port = 3001;
const handleErrors = (err, _, res, next) => {
  res.status(500).json({
    message: err.message,
    success: false,
  });
};

// middleware
app.use(cors());
app.use(express.json());
app.use("/tasks/api", tasks);
app.use(handleErrors);

const start = async () => {
  try {
    await connectToDb(process.env.MONGO_URI);
    app.listen(port, console.log(`listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
