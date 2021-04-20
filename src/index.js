const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require('dotenv').config();


const Routes = require("./routes");



const { MONGO_URL, HTTP_PORT } = process.env;


mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected...'))
.catch( (err) => console.log('error'));

const app = express();


app.use(cors());
app.use(express.json({ limit: "5mb" }));
app.use(Routes);


app.get("/", (req, res) => {
  res.send({ message: "Hello World" });
});

app.listen(HTTP_PORT, () => {
  console.log(`Rodando na porta ${HTTP_PORT}`);
});