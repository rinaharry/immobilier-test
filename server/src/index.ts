import connectToDatabase from "./mongoose";
import express from "express";
import route from "./route";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json()); // to support JSON-encoded bodies
app.use(
  express.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);

app.use("/", route);
app.use(cors());

const start = async () => {
  await connectToDatabase();
  app.listen(4000);
  console.log("app listen to pot 4000");
};

start();
