const supertest = require('supertest')
const createServer = require('../utils/server')
const app = createServer()

describe('Projects', () =>{
    describe('Getting projects', () =>{
        describe('Getting all projects', () =>{
            it("It must returns 200 and all projects", async () =>{
                    supertest(app)
                    .get('/projects')
                    .expect(200)
                    .expect('Content-Type', /json/)    
            })
        })
        describe('Getting single project by user', () =>{
            describe('It must returns 200 when the project exists', () =>{
                
                it("It must returns 200 and that project", async () =>{
                const id = "tyfdwyefbiuvbiuwtw"
                supertest(app)
                .get(`/projects/${id}`)
                .expect(200)
                .expect('Content-Type', /json/)
            })  
            describe("Getting undefined project", () =>{
                it('It must returns 401 with a message of not found', async () =>{
                    const id = "tyfdwyefbiuvbiuwtw"
                supertest(app)
                .get(`/projects/${id}`)
                .expect(401)
                .expect('Content-Type', /json/)
                .expect("Not Found")
                })
            })
        })
        })
      
    })
    describe('Admin Projects', () =>{
        describe('Getting all projects', () =>{
            it("It must be 200 status with all projects", async () =>{
                supertest(app)
                .get('/admin/projects')
                .expect(200)
                .expect('Content-Type', /json/)
            })
        })
        describe("Getting a one project", () =>{
            describe("when the project is available", () =>{
                it("It must returns 200 and a project in json", async ()=>{
                    const id="hayusfdewtyuyc"
                    await supertest(app)
                    .get("/admin/projects")
                    .expect(200)
                    .expect("Not Found")
                })
            })
        })
    })
})