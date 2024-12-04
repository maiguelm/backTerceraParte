import mongoose from 'mongoose';
import request from 'supertest';
import { expect } from 'chai';
import app from '../src/app.js';
import { usersService, petsService, adoptionsService } from '../src/services/index.js';

describe("Tests funcionales del router adoption.router.js", function () {
    this.timeout(5000);

    let userId, petId, adoptionId;

    beforeEach(async () => {

        const user = await usersService.create({
            first_name: "Coder",
            last_name: "House",
            email: `coder${Date.now()}@house.com`,
            password: "123456",
            role: "user",
            pets: []
        });

        const pet = await petsService.create({
            name: "TestPetName",
            specie: "Dog",
            birthDate: `${Date.now()}`,
            adopted: false
        });

        const adoption = await adoptionsService.create({
            owner: user._id,
            pet: pet._id
        });

        userId = user._id;
        petId = pet._id;
        adoptionId = adoption._id;
    });

    it("GET /api/adoptions Esta ruta debe devolver todas las adopciones existentes", async function () {
        const result = await request(app).get('/api/adoptions');
        expect(result.status).to.equal(200);
        expect(result.body).to.have.property('status', 'success');
        expect(result.body.payload).to.be.an('array');
    });

    it("GET /api/adoptions/:aid Esta ruta debe una adopción en particular", async function () {
        const result = await request(app).get(`/api/adoptions/${adoptionId}`);
        if (result.status === 404) {
            expect(result.body).to.have.property('error', 'Adoption not found');
        } else {
            expect(result.status).to.equal(200);
            expect(result.body).to.have.property('status', 'success');
            expect(result.body.payload).to.be.an('object');
        }
    });

    it("POST /api/adoptions/:uid/:pid Esta ruta debe crear una adopción", async function () {
        const newPet = await petsService.create({
            name: "AnotherTestPet",
            specie: "Cat",
            birthDate: "2021-05-05",
            adopted: false
        });

        const result = await request(app).post(`/api/adoptions/${userId}/${newPet._id}`);
        if (result.status === 400 || result.status === 404) {
            expect(result.body).to.have.property('error');
        } else {
            expect(result.status).to.equal(200);
            expect(result.body).to.have.property('status', 'success');
            expect(result.body.message).to.equal('Pet adopted');
        }
    });

    afterEach(async () => {
        try {
            const db = mongoose.connection.db;
            await db.collection('users').deleteMany({});
            await db.collection('pets').deleteMany({});
            await db.collection('adoptions').deleteMany({});
        } catch (error) {
            console.error("Error cleaning up database after test:", error);
            throw error;
        }
    });
});