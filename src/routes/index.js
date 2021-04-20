const express = require("express");

const AppointmentRouter = require("./appointment.route");

const Routes = express.Router();

Routes.use("/api", AppointmentRouter);

module.exports = Routes;