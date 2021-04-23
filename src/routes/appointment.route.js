const express = require('express');

const AppointmentController = require("../controllers/appointment.controller");

const Routes = express.Router();

Routes.get("/appointment", AppointmentController.index);
Routes.post("/appointment", AppointmentController.store);
Routes.put("/appointment/:_id", AppointmentController.update);
Routes.get("/appointment/:onlyNumberDate", AppointmentController.getByDate);
Routes.delete("/appointment/:_id", AppointmentController.remove);

module.exports = Routes;