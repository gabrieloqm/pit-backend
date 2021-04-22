const express = require('express');

const AppointmentController = require("../controllers/appointment.controller");

const Routes = express.Router();

//Routes.post("/appointment", AppointmentController.store);
Routes.get("/appointment", AppointmentController.index);
Routes.post("/appointment", AppointmentController.store);
Routes.put("/appointment/:_id", AppointmentController.update);

module.exports = Routes;