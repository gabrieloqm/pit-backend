const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema(
  {
    name: String,
    birthDate: Date,
    appointmentTime: Date,
    appointmentDate: Date,
  }
);

const AppointmentModel = mongoose.model("appointment", AppointmentSchema);

module.exports = AppointmentModel;