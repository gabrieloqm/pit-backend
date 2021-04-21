const express = require('express');

const AppointmentController = require("../controllers/appointment.controller");

const Routes = express.Router();

//Routes.post("/appointment", AppointmentController.store);
Routes.get("/appointment", AppointmentController.index);
Routes.post("/appointment", AppointmentController.store);

module.exports = Routes;