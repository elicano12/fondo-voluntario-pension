const request = require("supertest");
const express = require("express");
const app = require("../../app");
const usersServices = require("../../services/user.services");
const usersController = require("../../controllers/users.controller");

app.use(express.json());

jest.mock("../../services/user.services");

app.get("/usuarios", usersController.getUsers);
app.get("/usuarios/usuarioId/:id", usersController.getUserById);
app.post("/usuarios/crear-usuarios", usersController.postUser);

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

    usersServices.getUsers.mockResolvedValue(mockUsuarios);

    const res = await request(app).get("/usuarios");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockUsuarios);
    expect(usersServices.getUsers).toHaveBeenCalledTimes(1);
  });

  it("Debería obtener un usuario por ID", async () => {
    const mockUsuario = {
      id: 1,
      nombre: "Usuario A",
      email: "usuarioa@test.com",
      saldo: 400,
      notificaciones: "sms",
    };

    usersServices.getUserById.mockResolvedValue(mockUsuario);

    const res = await request(app).get("/usuarios/usuarioId/1");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockUsuario);
    expect(usersServices.getUserById).toHaveBeenCalledWith("1");
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

    usersServices.postUser.mockResolvedValue(mockNuevoUsuario);

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
    expect(usersServices.postUser).toHaveBeenCalledWith(
      "Nuevo Usuario",
      "nuevo@test.com",
      "123456789",
      5000,
      "email"
    );
  });
});
