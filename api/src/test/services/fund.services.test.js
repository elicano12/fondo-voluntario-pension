const { fundRepository } = require("../../repositories/index.js");
const { NotFoundError } = require("../../utils/errors.js");
const fundServices = require("../../services/fund.services.js"); // Asegúrate de usar la ruta correcta

jest.mock("../../repositories/fund.repository.js"); // Mock del repositorio

describe("Fund Services", () => {
  describe("getFundPensions", () => {
    it("debería lanzar un error de NotFound si no hay fondos de pensiones", async () => {
      fundRepository.getFundPensions.mockResolvedValue([]); // Simula que no hay fondos

      await expect(fundServices.getFundPensions()).rejects.toThrow(NotFoundError);
    });

    it("debería devolver una lista de fondos de pensiones si hay fondos", async () => {
      const mockFunds = [{ id: 1, nombre: "Fondo A", montoMinimo: 1000 }];
      fundRepository.getFundPensions.mockResolvedValue(mockFunds); // Simula que hay fondos

      const result = await fundServices.getFundPensions();

      expect(result).toEqual(mockFunds);
      expect(fundRepository.getFundPensions).toHaveBeenCalled();
    });
  });

  describe("getFundPensionsById", () => {
    it("debería lanzar un error de NotFound si el fondo no existe", async () => {
      fundRepository.getFundPensionsById.mockResolvedValue(null); // Simula que el fondo no existe
  
      await expect(fundServices.getFundPensionsById(1)).rejects.toThrow(NotFoundError);
    });
  
    it("debería devolver el fondo si existe", async () => {
      const mockFund = { id: 1, nombre: "Fondo A", montoMinimo: 1000 };
      fundRepository.getFundPensionsById.mockResolvedValue(mockFund); // Simula que el fondo existe
  
      const result = await fundServices.getFundPensionsById(1);
  
      expect(result).toEqual(mockFund);
      expect(fundRepository.getFundPensionsById).toHaveBeenCalledWith(1);
    });
  });
  
  describe("postFundPensions", () => {
    it("debería lanzar un error si faltan campos requeridos", async () => {
      await expect(fundServices.postFundPensions(null, 1000, "Categoria A"))
        .rejects.toThrow(Error)
    });
  
    it("debería crear un nuevo fondo correctamente", async () => {
      const mockFund = {
        id: 1,
        nombre: "Fondo A",
        montoMinimo: 1000,
        categoria: "Categoria A",
      };
  
      fundRepository.postFundPensions.mockResolvedValue(mockFund);
  
      const result = await fundServices.postFundPensions("Fondo A", 1000, "Categoria A");
  
      expect(result).toEqual(mockFund);
      expect(fundRepository.postFundPensions).toHaveBeenCalledWith("Fondo A", 1000, "Categoria A");
    });
  });
  
});
