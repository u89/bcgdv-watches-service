/**
 * Here I'll write tests before doing any development
 * to make sure the app is going to work as expected.
 */
const app = require("./app")
const request = require('supertest')

describe('Given an empty body request for POST /checkout', () => {
    test('should return a response with 400 status code (bad request)', async () => {
        const body = [];
        const res = await request(app).post('/checkout').send(body);
        expect(res.statusCode).toBe(400);
    })
})

describe('Given an array of watch ids in the request body of POST /checkout', () => {
    test('should return a response with 200 status code', async () => {
        const body = ["001", "002", "001", "004", "003"]
        const res = await request(app).post('/checkout').send(body);
        expect(res.statusCode).toBe(200);
    })
    test('the response content-type should be of type "application/json"', async () => {
        const body = ["001", "002", "001", "004", "003"]
        const res = await request(app).post('/checkout').send(body)
        expect(res.headers['content-type']).toEqual(expect.stringContaining('application/json'))
    });

    test('"price" field should be in the reponse body', async () => {
        const body = ["001", "002", "001", "004", "003"]
        const res = await request(app).post('/checkout').send(body)
        expect(res.body.price).toBeDefined();        
    });

    test('"price" field should be equal to the total cost of watches after discount', async () => {
        /**
         * Given a database of 4 watches:
         * Watch ID     Watch Name      Unit Price      Discount
         * 001          Rolex           100             3 for 200
         * 002          Michael Kors    80              2 for 120
         * 003          Swatch          50
         * 004          Casio           30
         */
        const examples = [
            {ids: ["001", "002", "001", "004", "003"], expectedTotal: 360},
            {ids: ["001", "001", "001", "002"], expectedTotal: 280},
            {ids: ["002", "002", "002", "001"], expectedTotal: 300},
            {ids: ["002", "002", "002", "002", "002"], expectedTotal: 320},
        ]
        for (const example of examples) {
            const res = await request(app).post('/checkout').send(example.ids);
            expect(res.body.price).toBe(example.expectedTotal)
        }
    })
})