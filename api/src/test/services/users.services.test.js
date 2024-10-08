const { usersRepository } = require("../../repositories");
const { NotFoundError } = require("../../utils/errors.js");
const usersServices = require("../../services/user.services.js"); // Asegúrate de usar la ruta correcta

jest.mock("../../repositories/index.js"); // Mock del repositorio

describe("Users Services", () => {
  describe("getUsers", () => {
    it("debería lanzar un error de NotFound si no hay usuarios", async () => {
      usersRepository.getUsers.mockResolvedValue([]); // Simula que no hay usuarios

      await expect(usersServices.getUsers()).rejects.toThrow(NotFoundError);
    });

    it("debería devolver una lista de usuarios si hay usuarios", async () => {
      const mockUsers = [{ id: 1, nombre: "John", email: "john@example.com" }];
      usersRepository.getUsers.mockResolvedValue(mockUsers); // Simula que hay usuarios

      const result = await usersServices.getUsers();

      expect(result).toEqual(mockUsers);
      expect(usersRepository.getUsers).toHaveBeenCalled();
    });
  });

  describe("getUserById", () => {
    it("debería lanzar un error de NotFound si el usuario no existe", async () => {
      usersRepository.getUserById.mockResolvedValue(null); // Simula que el usuario no existe
  
      await expect(usersServices.getUserById(1)).rejects.toThrow(NotFoundError);
    });
  
    it("debería devolver el usuario si existe", async () => {
      const mockUser = { id: 1, nombre: "John", email: "john@example.com" };
      usersRepository.getUserById.mockResolvedValue(mockUser); // Simula que el usuario existe
  
      const result = await usersServices.getUserById(1);
  
      expect(result).toEqual(mockUser);
      expect(usersRepository.getUserById).toHaveBeenCalledWith(1);
    });
  });

  describe("postUser", () => {
    it("debería lanzar un error si faltan campos requeridos", async () => {
      await expect(usersServices.postUser(null, "john@example.com", "123456789"))
        .rejects.toThrow(Error);
    });
  
    it("debería crear un nuevo usuario correctamente", async () => {
      const mockUser = {
        id: 1,
        nombre: "John",
        email: "john@example.com",
        telefono: "123456789",
        saldo: 1000,
        notificaciones: "email",
      };
  
      usersRepository.postUser.mockResolvedValue(mockUser); // Simula la creación del usuario
  
      const result = await usersServices.postUser(
        "John",
        "john@example.com",
        "123456789",
        1000,
        "email"
      );
  
      expect(result).toEqual(mockUser);
      expect(usersRepository.postUser).toHaveBeenCalledWith(
        "John",
        "john@example.com",
        "123456789",
        1000,
        "email"
      );
    });
  });
  
  
});
