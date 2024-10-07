const request = require("supertest");
const express = require("express");
const app = require("../../app");
const fondosController = require("../../controllers/fund.controller");
const fondosServices = require("../../services/fund.services");

app.use(express.json());

// Mock de la respuesta del servicio
jest.mock("../../services/fondo.services.js");

app.get("/fondos", fondosController.getFondosPensiones);
app.get("/fondos/fondo-id", fondosController.getFondosPensionesById);
app.post("/fondos/crear-tipo-fondos", fondosController.postFondosPensiones);

describe("Fondos Controller", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Limpiamos los mocks después de cada test
  });

  it("Debería obtener todos los fondos de pensión", async () => {
    const mockFondos = [
      {
        id: 1,
        nombre: "Fondo A",
        montoMinimo: 100000,
        categoria: "Categoria A",
      },
    ];
    fondosServices.getFondosPensiones.mockResolvedValue(mockFondos);

    const res = await request(app).get("/fondos");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockFondos);
    expect(fondosServices.getFondosPensiones).toHaveBeenCalled();
  });

  it("Debería obtener un fondo de pensión por ID", async () => {
    const mockFondo = {
      id: 1,
      nombre: "Fondo A",
      montoMinimo: 100000,
      categoria: "Categoria A",
    };
    fondosServices.getFondosPensionesById.mockResolvedValue(mockFondo);

    const res = await request(app).get("/fondos/fondo-id").query({ id: "1" });

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockFondo);
    expect(fondosServices.getFondosPensionesById).toHaveBeenCalledWith("1");
  });

  it("Debería crear un nuevo fondo de pensión", async () => {
    const nuevoFondo = {
      nombre: "Fondo B",
      montoMinimo: 200000,
      categoria: "FPV",
    };
    fondosServices.postFondosPensiones.mockResolvedValue(nuevoFondo);

    const res = await request(app)
      .post("/fondos/crear-tipo-fondos")
      .send(nuevoFondo);

    expect(res.status).toBe(201);
    expect(res.body).toEqual(nuevoFondo);
    expect(fondosServices.postFondosPensiones).toHaveBeenCalledWith(
      "Fondo B",
      200000,
      "FPV"
    );
  });
});
