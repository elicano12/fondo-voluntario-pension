// const {
//     transactionsRepository,
//     fundRepository,
//     usersRepository,
//   } = require("../../repositories");
//   const { NotFoundError, BadRequestError } = require("../../utils/errors");
//   const { enviarEmails, enviarSMS } = require("../../utils");
//   const transactionsServices = require("../../services/transaction.services");

//   jest.mock("../../repositories"); // Mockea los repositorios
//   jest.mock("../../utils", () => ({
//     enviarEmails: jest.fn(),
//     enviarSMS: jest.fn(),
//   }));

//   describe("Transactions Services", () => {

//     describe("getTransactions", () => {
//         it("debería devolver las transacciones", async () => {
//           const mockTransacciones = [{ id: 1, usuarioId: 1, fondoId: 2, monto: 1000 }];
//           transactionsRepository.getTransactions.mockResolvedValue(mockTransacciones);

//           const result = await transactionsServices.getTransactions();

//           expect(result).toEqual(mockTransacciones);
//           expect(transactionsRepository.getTransactions).toHaveBeenCalledWith();
//         });

//         it("debería lanzar una exeption si esta vacio", async () => {
//             const mockTransacciones = [];
//             transactionsRepository.getTransactions.mockResolvedValue(mockTransacciones);

//             await expect(transactionsServices.getTransactions())
//             .rejects.toThrow(NotFoundError);

//           });
//       });

//     describe("getTransactionUserId", () => {
//       it("debería devolver las transacciones por ID de usuario", async () => {
//         const mockTransacciones = [{ id: 1, usuarioId: 1, fondoId: 2, monto: 1000 }];
//         transactionsRepository.getTransactionUserId.mockResolvedValue(mockTransacciones);

//         const result = await transactionsServices.getTransactionUserId(1, "apertura");

//         expect(result).toEqual(mockTransacciones);
//         expect(transactionsRepository.getTransactionUserId).toHaveBeenCalledWith(1, "apertura");
//       });
//     });

//     describe("postOpenFund", () => {

//         it("debería lanzar un error de NotFound si el usuario o el fondo no existen", async () => {
//           usersRepository.getUserById.mockResolvedValue(null);
//           fundRepository.getFundPensionsById.mockResolvedValue(null);

//           await expect(transactionsServices.postOpenFund(1, 1, 1000, "apertura"))
//             .rejects.toThrow(NotFoundError);
//         });

//         it("debería lanzar un error de NotFound si el usuario no tiene suficiente saldo", async () => {
//           const mockUser = { id: 1, saldo: 500, notificaciones: "email" };
//           const mockFund = { id: 1, montoMinimo: 1000, nombre: "Fondo A" };

//           usersRepository.getUserById.mockResolvedValue(mockUser);
//           fundRepository.getFundPensionsById.mockResolvedValue(mockFund);

//           await expect(transactionsServices.postOpenFund(1, 1, 1000, "apertura"))
//             .rejects.toThrow(NotFoundError);
//         });

//         it("debería suscribir al usuario a un fondo exitosamente y enviar notificación por email", async () => {
//           const mockUser = { id: 1, saldo: 1500, notificaciones: "email", email: "user@example.com" };
//           const mockFund = { id: 1, montoMinimo: 1000, nombre: "Fondo A" };

//           usersRepository.getUserById.mockResolvedValue(mockUser);
//           fundRepository.getFundPensionsById.mockResolvedValue(mockFund);
//           transactionsRepository.saveTransaction.mockResolvedValue(true);

//           const result = await transactionsServices.postOpenFund(1, 1, 1000, "apertura");

//           expect(usersRepository.saveUser).toHaveBeenCalledWith(expect.objectContaining({
//             id: 1, saldo: 500
//           }));
//           expect(enviarEmails).toHaveBeenCalledWith("user@example.com", "Suscripción exitosa al fondo Fondo A");
//           expect(result).toEqual({ fund: mockFund, message: "Suscripción realizada con éxito." });
//         });
//       });

//   });

const {
  transactionsRepository,
  fundRepository,
  usersRepository,
} = require("../../repositories");
const { enviarSMS, enviarEmails } = require("../../utils");
const { NotFoundError, BadRequestError } = require("../../utils/errors");
const transactionServices = require("../../services/transaction.services");

jest.mock("../../repositories");
jest.mock("../../utils");

describe("Transaction Services", () => {
  // Pruebas para getTransactions
  describe("getTransactions", () => {
    it("debería lanzar un error NotFound si no hay transacciones", async () => {
      transactionsRepository.getTransactions.mockResolvedValue([]);
      await expect(transactionServices.getTransactions()).rejects.toThrow(
        NotFoundError
      );
      await expect(transactionServices.getTransactions()).rejects.toThrow(
        "transactions not found"
      );
    });

    it("debería devolver las transacciones si hay transacciones", async () => {
      const mockTransactions = [{ id: 1, tipo: "apertura", monto: 100 }];
      transactionsRepository.getTransactions.mockResolvedValue(
        mockTransactions
      );
      const result = await transactionServices.getTransactions();
      expect(result).toEqual(mockTransactions);
    });
  });

  // Pruebas para getTransactionUserId
  describe("getTransactionUserId", () => {
    it("debería devolver transacciones por ID de usuario", async () => {
      const mockTransactions = [{ id: 1, usuarioId: 1, tipo: "apertura" }];
      transactionsRepository.getTransactionUserId.mockResolvedValue(
        mockTransactions
      );
      const result = await transactionServices.getTransactionUserId(
        1,
        "apertura"
      );
      expect(result).toEqual(mockTransactions);
      expect(transactionsRepository.getTransactionUserId).toHaveBeenCalledWith(
        1,
        "apertura"
      );
    });
  });

  // Pruebas para postOpenFund
  describe("postOpenFund", () => {
    const usuarioId = 1;
    const fondoId = 1;
    const monto = 1000;
    const tipo = "apertura";

    it("debería lanzar un error NotFound si el usuario o el fondo no existen", async () => {
      usersRepository.getUserById.mockResolvedValue(null);
      fundRepository.getFundPensionsById.mockResolvedValue({ id: fondoId });

      await expect(
        transactionServices.postOpenFund(usuarioId, fondoId, monto, tipo)
      ).rejects.toThrow(NotFoundError);
      await expect(
        transactionServices.postOpenFund(usuarioId, fondoId, monto, tipo)
      ).rejects.toThrow("Users o Funds not found");
    });

    it("debería lanzar un error NotFound si el saldo del usuario es insuficiente", async () => {
      const mockUser = { id: usuarioId, saldo: 500, notificaciones: "email" };
      const mockFund = { id: fondoId, montoMinimo: 1000, nombre: "Fondo A" };

      usersRepository.getUserById.mockResolvedValue(mockUser);
      fundRepository.getFundPensionsById.mockResolvedValue(mockFund);

      await expect(
        transactionServices.postOpenFund(usuarioId, fondoId, monto, tipo)
      ).rejects.toThrow(NotFoundError);
      await expect(
        transactionServices.postOpenFund(usuarioId, fondoId, monto, tipo)
      ).rejects.toThrow(
        "No tiene saldo disponible para vincularse al fondo Fondo A"
      );
    });

    it("debería realizar la suscripción exitosamente", async () => {
      const mockUser = {
        id: usuarioId,
        saldo: 1500,
        email: "user@example.com",
        telefono: "123456789",
        notificaciones: "email",
      };
      const mockFund = { id: fondoId, montoMinimo: 1000, nombre: "Fondo A" };

      usersRepository.getUserById.mockResolvedValue(mockUser);
      fundRepository.getFundPensionsById.mockResolvedValue(mockFund);
      usersRepository.saveUser.mockResolvedValue(mockUser);
      transactionsRepository.saveTransaction.mockResolvedValue({});

      const result = await transactionServices.postOpenFund(
        usuarioId,
        fondoId,
        monto,
        tipo
      );
      expect(result).toEqual({
        fund: mockFund,
        message: "Suscripción realizada con éxito.",
      });
      expect(usersRepository.saveUser).toHaveBeenCalledWith({
        ...mockUser,
        saldo: 500,
      }); // Verifica que se haya actualizado el saldo
      expect(transactionsRepository.saveTransaction).toHaveBeenCalled();
      expect(enviarEmails).toHaveBeenCalledWith(
        mockUser.email,
        `Suscripción exitosa al fondo Fondo A`
      );
    });
  });

  // Pruebas para postCancelFund
  describe("postCancelFund", () => {
    const usuarioId = 1;
    const fondoId = 1;

    it("debería lanzar un error NotFound si el usuario o el fondo no existen", async () => {
      usersRepository.getUserById.mockResolvedValue(null);
      fundRepository.getFundPensionsById.mockResolvedValue({ id: fondoId });

      await expect(
        transactionServices.postCancelFund(usuarioId, fondoId)
      ).rejects.toThrow(NotFoundError);
      await expect(
        transactionServices.postCancelFund(usuarioId, fondoId)
      ).rejects.toThrow("Users o Funds not found");
    });

    it("debería lanzar un error NotFound si no se encuentra una transacción activa", async () => {
      const mockUser = { id: usuarioId, saldo: 1000, notificaciones: "email" };
      const mockFund = { id: fondoId, nombre: "Fondo A" };

      usersRepository.getUserById.mockResolvedValue(mockUser);
      fundRepository.getFundPensionsById.mockResolvedValue(mockFund);
      transactionsRepository.getCancelTransaction.mockResolvedValue(null);

      await expect(
        transactionServices.postCancelFund(usuarioId, fondoId)
      ).rejects.toThrow(NotFoundError);
    });

    it("debería realizar la cancelación exitosamente", async () => {
      const mockUser = {
        id: usuarioId,
        saldo: 1000,
        email: "user@example.com",
        telefono: "123456789",
        notificaciones: "email",
      };
      const mockFund = { id: fondoId, nombre: "Fondo A" };
      const mockTransaction = { _id: "transaction_id", monto: 500 };

      usersRepository.getUserById.mockResolvedValue(mockUser);
      fundRepository.getFundPensionsById.mockResolvedValue(mockFund);
      transactionsRepository.getCancelTransaction.mockResolvedValue(
        mockTransaction
      );
      usersRepository.saveUser.mockResolvedValue(mockUser);
      transactionsRepository.updateTransactions.mockResolvedValue({});

      const result = await transactionServices.postCancelFund(
        usuarioId,
        fondoId
      );
      expect(result).toEqual({
        fund: mockFund,
        message: "Cancelación realizada con éxito.",
      });
      expect(usersRepository.saveUser).toHaveBeenCalledWith({
        ...mockUser,
        saldo: 1500,
      }); // Verifica que se haya actualizado el saldo
      expect(transactionsRepository.updateTransactions).toHaveBeenCalledWith({
        _id: mockTransaction._id,
        usuarioId,
        fondoId,
        tipo: "cancelado",
        monto: mockTransaction.monto,
      });
      expect(enviarEmails).toHaveBeenCalledWith(
        mockUser.email,
        `Suscripción exitosa al fondo Fondo A`
      );
    });
  });
});
