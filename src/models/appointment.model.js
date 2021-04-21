const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema(
  {
    name: String,
    birthDate: String,
    age: Number,
    appointmentTime: String,
    appointmentDate: String,
    isDone: Boolean
  },
  {versionKey: false}
);

const AppointmentModel = mongoose.model("appointment", AppointmentSchema);

module.exports = AppointmentModel;