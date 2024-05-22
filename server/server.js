import express from "express";
import "dotenv/config";
import router from "./src/routes/routes.js";
import cors from "cors";
const { PORT, CLIENT_URL } = process.env;

const app = express();
const port = PORT || 5000;

app.use(
  cors({
    origin: String(CLIENT_URL),
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("You hit the college db route!");
});

app.use("/api", router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
