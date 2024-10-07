const request = require("supertest");
const express = require("express");
const app = require("../../app");
const usuariosServices = require("../../services/usuarios.services");
const usuariosController = require("../../controllers/usuarios.controller");

app.use(express.json());

// Mock de la respuesta del servicio
jest.mock("../../services/usuarios.services.js");

app.get("/usuarios", usuariosController.getUsuarios);
app.get("/usuarios/usuario-id", usuariosController.getUsuarioById);
app.post("/usuarios/crear-usuarios", usuariosController.postUsuarios);

describe("Usuarios Controller", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Limpiamos los mocks después de cada test
  });

  it("Debería obtener todos los usuarios", async () => {
    const mockUsuarios = [
      {
        id: 1,
        nombre: "Usuario A",
        email: "usuarioa@test.com",
        saldo: 400,
        notificaciones: "sms",
      },
      {
        id: 2,
        nombre: "Usuario B",
        email: "usuariob@test.com",
        saldo: 600,
        notificaciones: "email",
      },
    ];

    usuariosServices.getUsuarios.mockResolvedValue(mockUsuarios);

    const res = await request(app).get("/usuarios");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockUsuarios);
    expect(usuariosServices.getUsuarios).toHaveBeenCalledTimes(1);
  });

  it("Debería obtener un usuario por ID", async () => {
    const mockUsuario = {
      id: 1,
      nombre: "Usuario A",
      email: "usuarioa@test.com",
      saldo: 400,
      notificaciones: "sms",
    };

    usuariosServices.getUsuarioById.mockResolvedValue(mockUsuario);

    const res = await request(app).get("/usuarios/usuario-id").query({ id: "1" });

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockUsuario);
    expect(usuariosServices.getUsuarioById).toHaveBeenCalledWith("1");
  });

  it("Debería crear un nuevo usuario", async () => {
    const mockNuevoUsuario = {
      id: 1,
      nombre: "Nuevo Usuario",
      email: "nuevo@test.com",
      telefono: "123456789",
      saldo: 5000,
      notificaciones: "email",
    };

    usuariosServices.postUsuarios.mockResolvedValue(mockNuevoUsuario);

    const nuevoUsuarioData = {
      nombre: "Nuevo Usuario",
      email: "nuevo@test.com",
      telefono: "123456789",
      saldo: 5000,
      notificaciones: "email",
    };

    const res = await request(app).post("/usuarios/crear-usuarios").send(nuevoUsuarioData); // Enviamos los datos en el body

    expect(res.status).toBe(201);
    expect(res.body).toEqual(mockNuevoUsuario);
    expect(usuariosServices.postUsuarios).toHaveBeenCalledWith(
      "Nuevo Usuario",
      "nuevo@test.com",
      "123456789",
      5000,
      "email"
    );
  });
});
