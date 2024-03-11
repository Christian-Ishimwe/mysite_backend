// const { request } = require('express')
const createServer = require('../utils/server')
const app = createServer()
const supertest = require('supertest')
describe('Users Registration', () =>{
    it('should return status code 201 if new user was created successul', async () =>{
        // const res = await request(app)
        supertest(app).post('/auth/register')
        .set('Content-Type', 'application/json')
        .send({
            name: 'Manzi eric',
            email: 'manzi@gmail.com',
            password: 'manzi@gmail.com'
        })

        expect(201)
       
    })
})


describe('Login user',() =>{
     it("should return 404 when the user enters invalid email or passwords adress", async () =>{
        supertest(app).post('/auth/login').set('Content-Type', 'application/json')
        .send({
            email: 'manzi@gmail.com',
            password: 'manzi@gmail.com'
        })
        expect(200)
    })
  
})

describe('register a user', () =>{
    describe('Return 409 when the user already exists', () =>{
        it("it should return 409 when the user already exists", async () =>{
          supertest(app).post('/auth/login').set('Content-Type', 'application/json').send({
                name: "Ishimwe Christian",
                email: 'christianinja3@gmail.com',
                password: "christianinja3@gmail.com"
            })
          expect(409)
            expect('User with such credentials already exists')
        }, 10000)
        
    })
})