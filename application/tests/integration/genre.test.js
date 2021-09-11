import request from 'supertest';
import app from '../../app.js';
import genreModel from '../../model/genre.js';

let server;
const Genre = genreModel.Model;


describe('/api/genres', ()=>{
    beforeEach( async ()=>{
        server = await app.start('test');
    });
    afterEach(async ()=>{
        await server.close();
        await Genre.remove({});
    });

    describe('GET / ',()=>{
        it('should return all genres', async ()=>{
            await Genre.collection.insertMany([
                {name: "genre1"},
                {name: "genre2"},
                {name: "genre3"}
            ]);

            const response = await request(server).get('/api/genres');

            expect(response.status).toBe(200);
            expect(response.body.length).toBe(3);
        });
    });

    describe('POST /find ',()=>{
        it('should return all genres', async ()=>{
            // here _id will be objectId
            const genre = new Genre({name:'genre1'});
            await genre.save();

            // here _id will be string
            const response = await request(server).post('/api/genres/find').send({
                name: "genre1"
            });

            expect(response.status).toBe(200);

            // this will have issues because _id from Genre is objectId and expecting it to be string from response
            // expect(response.body).toMatchObject(Genre);
            
            expect(response.body).toHaveProperty('name',genre.name);
        });
    });
});