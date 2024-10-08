const { TransactionModel } = require("../../models/transaction.models");
const { transactionsRepository } = require("../../repositories");


jest.mock("../../models/transaction.models.js", () => ({
    TransactionModel: jest.fn(),
  }));

describe("Transaction Repository", () => {
    beforeEach(() => {
        jest.clearAllMocks();
      });

  it("Debería retornar todas las transacciones", async () => {
    const mockTransactions = [
      { usuarioId: "user1", fondoId: "fund1", tipo: "apertura", monto: 100 },
      { usuarioId: "user2", fondoId: "fund2", tipo: "cancelado", monto: 50 },
    ];

    TransactionModel.find = jest.fn().mockResolvedValue(mockTransactions);

    const result = await transactionsRepository.getTransactions();
    expect(TransactionModel.find).toHaveBeenCalled();
    expect(result).toEqual(mockTransactions);
  });

  it("Debería retornar transacciones por usuarioId y tipo", async () => {
    const mockTransactions = [{ usuarioId: "user1", fondoId: "fund1", tipo: "apertura", monto: 100 }];
    
    TransactionModel.find = jest.fn().mockResolvedValue(mockTransactions);

    const result = await transactionsRepository.getTransactionUserId("user1", "apertura");
    expect(TransactionModel.find).toHaveBeenCalledWith({ usuarioId: "user1", tipo: "apertura" });
    expect(result).toEqual(mockTransactions);
  });

  it("Debería cambiar el tipo de la transaccion a cancelar", async () => {
    const mockTransaction = { usuarioId: "user1", fondoId: "fund1", tipo: "apertura", monto: 100 };

    TransactionModel.findOne = jest.fn().mockResolvedValue(mockTransaction);

    const result = await transactionsRepository.getCancelTransaction("user1", "fund1");

    expect(TransactionModel.findOne).toHaveBeenCalledWith({
      usuarioId: "user1",
      fondoId: "fund1",
      tipo: "apertura",
    });
    expect(result).toEqual(mockTransaction);
  });
  
  it("Debería guardar una transacción", async () => {
    const mockTransaction = { usuarioId: "user1", fondoId: "fund1", tipo: "apertura", monto: 100 };
    const mockSavedTransaction = { ...mockTransaction, _id: "mockId", unicoId: "mockUnicoId" };

    TransactionModel.mockImplementation(() => ({
      save: jest.fn().mockResolvedValue(mockSavedTransaction), 
    }));

    const result = await transactionsRepository.saveTransaction(mockTransaction);

    expect(TransactionModel).toHaveBeenCalledWith({
      ...mockTransaction,
      unicoId: expect.any(String), 
    });
    expect(result).toEqual(mockSavedTransaction);
  });

  it("Debería actualizar una transacción", async () => {
    const mockTransaction = { _id: "mockId", tipo: "cancelado" };
    const mockUpdatedTransaction = { ...mockTransaction, monto: 200 };

    TransactionModel.findByIdAndUpdate = jest.fn().mockResolvedValue(mockUpdatedTransaction);

    const result = await transactionsRepository.updateTransactions(mockTransaction);
    expect(TransactionModel.findByIdAndUpdate).toHaveBeenCalledWith(
      { _id: mockTransaction._id },
      { $set: { tipo: mockTransaction.tipo } },
      { new: true }
    );
    expect(result).toEqual(mockUpdatedTransaction);
  });

});

