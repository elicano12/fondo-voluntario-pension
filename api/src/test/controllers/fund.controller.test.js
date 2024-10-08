const request = require("supertest");
const express = require("express");
const app = require("../../app");
const fundController = require("../../controllers/fund.controller");
const fundServices = require("../../services/fund.services");

app.use(express.json());

jest.mock("../../services/fund.services");

app.get("/fondos", fundController.getFundPensions);
app.get("/fondos/fondoId/:id", fundController.getFundPensionsById);
app.post("/fondos/crear-tipo-fondos", fundController.postFundPensions);

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
    fundServices.getFundPensions.mockResolvedValue(mockFondos);

    const res = await request(app).get("/fondos");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockFondos);
    expect(fundServices.getFundPensions).toHaveBeenCalled();
  });

  it("Debería obtener un fondo de pensión por ID", async () => {
    const mockFondo = {
      id: 1,
      nombre: "Fondo A",
      montoMinimo: 100000,
      categoria: "Categoria A",
    };
    fundServices.getFundPensionsById.mockResolvedValue(mockFondo);

    const res = await request(app).get("/fondos/fondoId/1");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockFondo);
    expect(fundServices.getFundPensionsById).toHaveBeenCalledWith("1");
  });

  it("Debería crear un nuevo fondo de pensión", async () => {
    const nuevoFondo = {
      nombre: "Fondo B",
      montoMinimo: 200000,
      categoria: "FPV",
    };
    fundServices.postFundPensions.mockResolvedValue(nuevoFondo);

    const res = await request(app)
      .post("/fondos/crear-tipo-fondos")
      .send(nuevoFondo);

    expect(res.status).toBe(201);
    expect(res.body).toEqual(nuevoFondo);
    expect(fundServices.postFundPensions).toHaveBeenCalledWith(
      "Fondo B",
      200000,
      "FPV"
    );
  });
});
