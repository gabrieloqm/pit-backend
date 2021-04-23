const AppointmentModel = require("../models/appointment.model");
require('dotenv').config();
const moment = require('moment');
const { remove } = require("../models/appointment.model");



const {DAILY_LIMIT: dailyLimit, HOUR_LIMIT: hourLimit } = process.env;


class Appointment {
    
    async remove(req, res) {
      const { params: {_id: id }} = req;

      try {
        const appointment = await AppointmentModel.findById(id);

        if (!appointment) {
          return res.status(400).send({ message: "Esse agendamento não existe!" });
        }

        await appointment.remove();
        res.send({ message: "Agendamento removido com sucesso!" });

      } catch (error) {
        res.status(400).send({ message: error.message });
      }
    }

      async getByDate(req, res) {
        const { params: { onlyNumberDate } } = req
        const fixedDate =  moment(onlyNumberDate,"DDMMYYYY").format('DD/MM/YYYY')
        
        try{
          const appointments = await AppointmentModel.find({appointmentDate : fixedDate }).sort({ appointmentTime: 'asc', age: 'desc' });
          res.send({ data: appointments, message: 'Lista de agendamentos foi filtrada!' });
        }catch(error){
          res.status(400).send({ message: error.message });
        }
      }
   
      async index(req, res) {
        const appointments = await AppointmentModel.find().sort({ appointmentTime: 'asc', age: 'desc' });
        res.send({ data: appointments });
      }

      async store(req, res) {
        const body = req.body;
        try{
          const scheduledAppointments = await AppointmentModel.find({appointmentDate :  body.appointmentDate}).exec();    
          const appointmentByHour = scheduledAppointments.filter( ({appointmentTime}) => 
          moment(appointmentTime).format('HH:mm') === moment(body.appointmentTime).format('HH:mm'));
        
          if(scheduledAppointments.length > parseInt(dailyLimit)){
            res.status(400).send({ message: 'O limite diário de atendimentos foi alcançado! Por favor, tente marcar em outro dia' });
          }else{
            if(appointmentByHour.length === parseInt(hourLimit)){
              if(body.age < 60 || (appointmentByHour.filter( (ap) => ap.age < 60).length === 0)) {
                res.status(400).send({ message: 'Este horário de atendimentos já está totalmente preenchido! Por favor, tente marcar em outro horário' });
              }else{
              const youngerPerson = appointmentByHour.reduce((prev, curr) => prev.age < curr.age ? prev : curr);
              await Promise.all([await AppointmentModel.findOneAndDelete({_id:youngerPerson._id}), await AppointmentModel.create(body)]);
              res.send({message: 'Seu agendamento foi encaixado neste horário com sucesso!'});
              }
            }else{
              const appointment = await AppointmentModel.create(body);
              res.send({data: appointment, message: 'Agendamento realizado com sucesso!'});
            }
          }
        }catch(error){
          res.status(400).send({ message: error.message });
        }
        
      }

      async update(req, res) {
        const {
          body,
          params: { _id: id },
        } = req;
    
        try{
          const appointment = await AppointmentModel.findByIdAndUpdate(id, body, { new: true });
          res.send({ data: appointment, message: 'Status do atendimento alterado!' });
        }catch(error){
          res.status(400).send({ message: error.message });
        }
      }
    }

module.exports = new Appointment();
