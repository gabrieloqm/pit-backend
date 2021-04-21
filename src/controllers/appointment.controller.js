const AppointmentModel = require("../models/appointment.model");
require('dotenv').config();
const moment = require("moment");
const { remove } = require("../models/appointment.model");



const {DAILY_LIMIT: dailyLimit, HOUR_LIMIT: hourLimit } = process.env;

class Appointment {
   
    async index(req, res) {
        const appointments = await AppointmentModel.find();
        res.send({ data: appointments });
      }

      async store(req, res) {
        const body = req.body;
        const scheduledAppointments = await AppointmentModel.find({appointmentDate :  body.appointmentDate}).exec();
        //const appointmentByHour = await AppointmentModel.find({appointmentDate :  body.appointmentDate, appointmentTime :  body.appointmentTime }).exec();     
        const appointmentByHour = scheduledAppointments.filter( ({appointmentTime}) => appointmentTime === body.appointmentTime);
        
        if(scheduledAppointments.length > parseInt(dailyLimit)){
         res.status(400).send({ message: 'O limite diário de atendimentos para este dia foi alcançado! Por favor, tente marcar em outro dia' });
        }else{
          if(appointmentByHour.length === parseInt(hourLimit)){
            if(body.age < 60 || (appointmentByHour[0].age >= 60 && appointmentByHour[1].age >= 60)) {
              res.status(400).send({ message: 'Este horário de atendimentos já está totalmente preenchido! Por favor, tente marcar em outro horário' });
            }else {
              const youngerPerson = appointmentByHour.reduce((prev, curr) => prev.age < curr.age ? prev : curr);
              console.log(youngerPerson.age);
              await Promise.all([await AppointmentModel.findOneAndDelete({_id:youngerPerson._id}), await AppointmentModel.create(body)]);
              res.send({message: 'Seu agendamento foi encaixado nesse horário com sucesso!'});
            }
          }else{
            const appointment = await AppointmentModel.create(body);
            res.send({data: appointment, message: 'Agendamento realizado com sucesso!'});
          }
        }
      }
}

module.exports = new Appointment();
