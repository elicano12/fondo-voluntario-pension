// Importamos las dependencias necesarias
const request = require("supertest");
const express = require("express");
const app = require("../../app");
const transactionsServices = require("../../services/transaction.services");
const transactionsController = require("../../controllers/transactions.controller");

app.use(express.json());

jest.mock("../../services/transaction.services");

app.get("/transacciones", transactionsController.getTransactions);
app.get(
  "/transacciones/usuarioId/:id",
  transactionsController.getTransactionUserId
);
app.post("/transacciones/apertura-fondos", transactionsController.postOpenFund);
app.post(
  "/transacciones/cancelacion-fondos",
  transactionsController.postCancelFund
);

describe("Controladores de Transacciones", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Limpiamos los mocks después de cada test
  });

  it("Debería obtener todas las transacciones", async () => {
    const mockTransacciones = [
      { id: 1, usuarioId: 1, fondoId: 2, monto: 1000, tipo: "apertura" },
      { id: 2, usuarioId: 1, fondoId: 3, monto: 2000, tipo: "cancelacion" },
    ];

    transactionsServices.getTransactions.mockResolvedValue(mockTransacciones);

    const res = await request(app).get("/transacciones");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockTransacciones);
    expect(transactionsServices.getTransactions).toHaveBeenCalledTimes(1);
  });

  it("Debería obtener transacciones por ID de usuario", async () => {
    const mockTransacciones = [
      { id: 1, usuarioId: 1, fondoId: 2, monto: 1000, tipo: 'apertura' },
    ];
    
    // Mockear el servicio
    transactionsServices.getTransactionUserId.mockResolvedValue(mockTransacciones);

    const res = await request(app).get("/transacciones/usuarioId/1");
    
    expect(res.status).toBe(201);
    expect(res.body).toEqual(mockTransacciones);
    expect(transactionsServices.getTransactionUserId).toHaveBeenCalledWith('1', 'apertura');
  });

  it("Debería abrir un fondo de pensión", async () => {
    const mockAperturaFondo = {
      message: "Fondo abierto con éxito",
    };

    transactionsServices.postOpenFund.mockResolvedValue(mockAperturaFondo);

    const aperturaFondoData = {
      usuarioId: 1,
      fondoId: 2,
      monto: 1000,
      tipo: "apertura",
    };

    const res = await request(app)
      .post("/transacciones/apertura-fondos")
      .send(aperturaFondoData);

    expect(res.status).toBe(201);
    expect(res.body).toEqual(mockAperturaFondo);
    expect(transactionsServices.postOpenFund).toHaveBeenCalledWith(
      1,
      2,
      1000,
      "apertura"
    );
  });

  it("Debería cancelar un fondo de pensión", async () => {
    const mockCancelacionFondo = {
      message: "Fondo cancelado con éxito",
    };

    transactionsServices.postCancelFund.mockResolvedValue(mockCancelacionFondo);

    const cancelacionFondoData = {
      usuarioId: 1,
      fondoId: 2,
    };

    const res = await request(app)
      .post("/transacciones/cancelacion-fondos")
      .send(cancelacionFondoData);

    expect(res.status).toBe(201);
    expect(res.body).toEqual(mockCancelacionFondo);
    expect(transactionsServices.postCancelFund).toHaveBeenCalledWith(1, 2);
  });
});
