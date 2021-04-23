const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
require('dotenv').config();

const Routes = require("./routes");

const { MONGO_URL, HTTP_PORT} = process.env;

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected...'))
.catch( (error) => console.log(error));

const app = express();

app.use(cors());
app.use(express.json({ limit: "5mb" }));
app.use(morgan('dev'));
app.use(Routes);

app.listen(HTTP_PORT, () => {
  console.log(`Rodando na porta ${HTTP_PORT}`);
});