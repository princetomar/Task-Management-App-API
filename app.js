const express = require("express");
const { startSession } = require("mongoose");
const app = express();
require("dotenv").config();

// mongoose connection to db
const connectDB = require("./db/connect");

// import the router
const tasks = require("./routes/tasks");
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// Set up middleware
// app.use(express.static("./public"));
// app.use(express.json());

// routes
app.use("/api/v1/tasks", tasks);

app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    // if the connection is successful, then just start the server
    app.listen(port, () =>
      console.log(`Server is listening at port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
