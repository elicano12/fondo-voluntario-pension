const { UsersModel } = require("../../models/users.model");
const usersRepository = require("../../repositories/users.repository");

// Mock del modelo FundModel
jest.mock("../../models/users.model", () => ({
  UsersModel: jest.fn(),
}));

describe("Fund Repository", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Debería recuperar todos los usuarios", async () => {
    const mockUsers = [
      {
        nombre: "Juan",
        email: "juan@mail.com",
        telefono: "123456789",
        saldo: 1000,
        notificaciones: "email",
      },
      {
        nombre: "Ana",
        email: "ana@mail.com",
        telefono: "987654321",
        saldo: 2000,
        notificaciones: "sms",
      },
    ];

    UsersModel.find = jest.fn().mockResolvedValue(mockUsers);

    const result = await usersRepository.getUsers();

    expect(UsersModel.find).toHaveBeenCalled();
    expect(result).toEqual(mockUsers);
  });

  it("Debería recuperar un usuario por ID", async () => {
    const mockUser = {
      nombre: "Juan",
      email: "juan@mail.com",
      telefono: "123456789",
      saldo: 1000,
      notificaciones: "email",
    };

    UsersModel.findById = jest.fn().mockResolvedValue(mockUser);

    const result = await usersRepository.getUserById("mockId");

    expect(UsersModel.findById).toHaveBeenCalledWith("mockId");
    expect(result).toEqual(mockUser);
  });

  it("Debería guardar un nuevo usuario", async () => {
    const mockUser = {
      nombre: "Juan",
      email: "juan@mail.com",
      telefono: "123456789",
      saldo: 1000,
      notificaciones: "email",
    };
    const mockSavedUser = { ...mockUser, _id: "mockId" };

    UsersModel.mockImplementation(() => ({
      save: jest.fn().mockResolvedValue(mockSavedUser),
    }));

    const result = await usersRepository.postUser(
        mockUser.nombre,
        mockUser.email,
        mockUser.telefono,
        mockUser.saldo,
        mockUser.notificaciones
    );
    
    expect(UsersModel).toHaveBeenCalledWith({
      nombre: mockUser.nombre,
      email: mockUser.email,
      telefono: mockUser.telefono,
      saldo: mockUser.saldo,
      notificaciones: mockUser.notificaciones,
    });

    expect(result).toEqual(mockSavedUser);
  });

  it("Debería guardar el usuario proporcionado", async () => {
    const mockUser = {
      save: jest
        .fn()
        .mockResolvedValue({
          _id: "mockId",
          nombre: "Juan",
          email: "juan@mail.com",
        }),
    };

    const result = await usersRepository.saveUser(mockUser);

    expect(mockUser.save).toHaveBeenCalled();
    expect(result).toEqual({
      _id: "mockId",
      nombre: "Juan",
      email: "juan@mail.com",
    });
  });
});
