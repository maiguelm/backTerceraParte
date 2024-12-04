import chai from "chai";
import request from "supertest";
import app from "../src/app.js";
import mongoose from "mongoose";

const { expect } = chai;

describe("Adoption API Endpoints", () => {

  it("generateMockUsers debe generar 10 usuarios", async function () {
    this.timeout(5000);
    const result = await request(app).get("/api/mocks/mockingusers?num=10");
    expect(result.status).to.equal(200);
    expect(result.body).to.have.property("status", "success");
    expect(result.body.payload).to.be.an("array").that.has.lengthOf(10);
  });

  it("generateMockPets debe generar 20 mascotas", async function () {
    this.timeout(5000);
    const result = await request(app).get("/api/mocks/mockingpets?num=20");
    expect(result.status).to.equal(200);
    expect(result.body).to.have.property("status", "success");
    expect(result.body.payload).to.be.an("array").that.has.lengthOf(20);
  });

  it("generateData debe generar e insertar adopciones entre 5 usuarios y 15 mascotas", async function () {
    this.timeout(5000);
    const result = await request(app)
      .post("/api/mocks/generateData")
      .send({
        users: 10,
        pets: 20,
      })
      .set("Content-Type", "application/json");

    expect(result.status).to.equal(200);
    expect(result.body).to.have.property("status", "success");
    expect(result.body).to.have.property("message", "Data generated successfully");

    const adoptions = await request(app).get("/api/adoptions");
    expect(adoptions.body.payload).to.be.an("array").that.is.not.empty;
  });

});
