const supertest= require('supertest')
const createServer = require("../utils/server")
const app = createServer()
describe('blogs', () =>{
    describe('Getting all blogs', () =>{
        describe("given the blog blogs exists",() =>{
            it('should return 200', async () =>{
                const productId = 'gahgdyeuuyyutebf'
                supertest(app).get('/blogs').expect(200)
            })
        })
    })

    describe('getting single blog', () =>{
        it('should return 401', async () =>{
            const productId = "983791hfyuee"
            supertest(app).get(`/blogs/${productId}`).expect(404)
        })
    })
    
    describe('adding the comment to the blog', () =>{
        it('should return 401', async () =>{
             const productId = "983791hfyuee"
            supertest(app).post(`/blogs/${productId}`).expect(401)
        })
    })
})

