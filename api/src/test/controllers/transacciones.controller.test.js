// Importamos las dependencias necesarias
const request = require("supertest");
const express = require("express");
const app = require("../../app");
const transaccionesServices = require('../../services/transaction.services');
const transaccionesController = require("../../controllers/transactions.controller");

app.use(express.json());

jest.mock('../../services/transacciones.services.js');

app.get("/transacciones", transaccionesController.getTransacciones);
app.get("/transacciones/usuarioId", transaccionesController.getTransaccionesUsuarioId);
app.post("/transacciones/apertura-fondos", transaccionesController.postAperturaFondo);
app.post("/transacciones/cancelacion-fondos", transaccionesController.postCancelacionFondo);

describe('Controladores de Transacciones', () => {

  afterEach(() => {
    jest.clearAllMocks(); // Limpiamos los mocks después de cada test
  });

  it('Debería obtener todas las transacciones', async () => {
    const mockTransacciones = [
      { id: 1, usuarioId: 1, fondoId: 2, monto: 1000, tipo: 'apertura' },
      { id: 2, usuarioId: 1, fondoId: 3, monto: 2000, tipo: 'cancelacion' }
    ];

    transaccionesServices.getTransacciones.mockResolvedValue(mockTransacciones);

    const res = await request(app).get('/transacciones');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockTransacciones);
    expect(transaccionesServices.getTransacciones).toHaveBeenCalledTimes(1);
  });

  it('Debería obtener las transacciones por ID de usuario', async () => {
    const mockTransacciones = [
      { id: 1, usuarioId: 1, fondoId: 2, monto: 1000, tipo: 'apertura' }
    ];

    transaccionesServices.getTransaccionesUsuarioId.mockResolvedValue(mockTransacciones);

    const res = await request(app).get('/transacciones/usuarioId').query({ id: '1'});

    expect(res.status).toBe(201);
    expect(res.body).toEqual(mockTransacciones);
    expect(transaccionesServices.getTransaccionesUsuarioId).toHaveBeenCalledWith('1', 'apertura');
  });

  it('Debería abrir un fondo de pensión', async () => {
    const mockAperturaFondo = {
      fondo: { id: 1, usuarioId: 1, fondoId: 2, monto: 1000, tipo: 'apertura' },
      message: 'Fondo abierto con éxito'
    };

    transaccionesServices.postAperturaFondo.mockResolvedValue(mockAperturaFondo);

    const aperturaFondoData = {
      usuarioId: 1,
      fondoId: 2,
      monto: 1000,
      tipo: 'apertura'
    };

    const res = await request(app)
      .post('/transacciones/apertura-fondos')
      .send(aperturaFondoData);

    expect(res.status).toBe(201);
    expect(res.body).toEqual(mockAperturaFondo);
    expect(transaccionesServices.postAperturaFondo).toHaveBeenCalledWith(
      1,
      2,
      1000,
      'apertura'
    );
  });

  it('Debería cancelar un fondo de pensión', async () => {
    const mockCancelacionFondo = {
      fondo: { id: 1, usuarioId: 1, fondoId: 2, tipo: 'cancelacion' },
      message: 'Fondo cancelado con éxito'
    };

    transaccionesServices.postCancelacionFondo.mockResolvedValue(mockCancelacionFondo);

    const cancelacionFondoData = {
      usuarioId: 1,
      fondoId: 2
    };

    const res = await request(app)
      .post('/transacciones/cancelacion-fondos')
      .send(cancelacionFondoData);

    expect(res.status).toBe(201);
    expect(res.body).toEqual(mockCancelacionFondo);
    expect(transaccionesServices.postCancelacionFondo).toHaveBeenCalledWith(1, 2);
  });
});
