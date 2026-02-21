import express from "express";
import ENV from "./utils/ENV.js";

const app = express();

app.get(`/`, (req, res) => {
  res.send(`Facebook Clone is ready`);
});

const PORT = ENV.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT : ${PORT}`);
});
