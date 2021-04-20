const AppointmentModel = require("../models/appointment.model");

class Appointment {
   
    async index(req, res) {
        const appointments = await AppointmentModel.find();
        console.log(appointments)

        res.send({ data: appointments });
      }
}

module.exports = new Appointment();
