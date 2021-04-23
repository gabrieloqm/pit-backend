
const request = require("supertest");
require('dotenv').config();

const { HTTP_PORT: port} = process.env;

const api = `http://localhost:${port}/api`



describe ("POST /appointment", () => {
    
    describe("given all input data", () => {
        test("the server should respond with json in the content type header", () =>{
            return request(api).post("/appointment").send({
                name: "Gabriel",
                birthDate: "05/09/1995",
                age: 25,
                appointmentTime: new(Date),
                appointmentDate: "05/09/2021",
                isDone: false
            }).then(response => {
                expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
            });
        });
    });

    describe("when one specific forms field info is missing", () =>{
        test("should have the status code 400 in response", () => {
            return request(api).post("/appointment").send({
                name: "",
                birthDate: "05/09/1995",
                age: 25,
                appointmentTime: new(Date),
                appointmentDate: "05/09/2021",
                isDone: false
            }).expect(400);
        });
    });
});

describe("GET /appointment", () => {
    test("should return all appointments as json", ()=>{
        return request(api).get("/appointment")
        .expect(200).expect('Content-Type', /json/);

    });


});


