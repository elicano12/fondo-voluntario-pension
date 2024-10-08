const { FundModel } = require("../../models/fund.models");
const fundRepository = require("../../repositories/fund.repository");

// Mock del modelo FundModel
jest.mock("../../models/fund.models", () => ({
  FundModel: jest.fn(),
}));

describe("Fund Repository", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Debería obtener todos los fondos de pensiones", async () => {
    const mockFunds = [
      { nombre: "Fondo A", montoMinimo: 1000, categoria: "FPV" },
      { nombre: "Fondo B", montoMinimo: 500, categoria: "FIC" },
    ];

    FundModel.find = jest.fn().mockResolvedValue(mockFunds);

    const result = await fundRepository.getFundPensions();

    expect(FundModel.find).toHaveBeenCalled();
    expect(result).toEqual(mockFunds);
  });

  it("Debería obtener un fondo por su ID", async () => {
    const mockFund = { nombre: "Fondo A", montoMinimo: 1000, categoria: "FPV" };

    FundModel.findById = jest.fn().mockResolvedValue(mockFund);

    const result = await fundRepository.getFundPensionsById("mockId");

    expect(FundModel.findById).toHaveBeenCalledWith("mockId");
    expect(result).toEqual(mockFund);
  });

  it("Debería guardar un nuevo fondo de pensiones", async () => {
    const mockFund = { nombre: "Fondo A", montoMinimo: 1000, categoria: "FPV" };
    const mockSavedFund = { ...mockFund, _id: "mockId" };
  
    FundModel.mockImplementation(() => ({
      save: jest.fn().mockResolvedValue(mockSavedFund),
    }));
  
    const result = await fundRepository.postFundPensions(
      mockFund.nombre,
      mockFund.montoMinimo,
      mockFund.categoria
    );
  
    expect(FundModel).toHaveBeenCalledWith(mockFund);
  
    expect(result).toEqual(mockSavedFund);
  });
});
