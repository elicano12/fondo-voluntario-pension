const fondosRepository = require("../../repositories/fund.repository");
const fondosServices = require("../../services/fund.services");
const {NotFoundError} = require("../../utils/errorHandler");

jest.mock("../../repositories/fondos.resopitory.js");

describe("Fondos Services", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Limpiamos los mocks después de cada test
  });

  describe("Llamado del metodo getFondosPensiones", () => {
    it("Debería obtener todos los fondos de pensión", async () => {
      const mockFondos = [
        { id: 1, nombre: "Fondo A", montoMinimo: 100000 },
        { id: 2, nombre: "Fondo B", montoMinimo: 200000 },
      ];

      fondosRepository.getFondoPensiones.mockResolvedValue(mockFondos);

      const result = await fondosServices.getFondosPensiones();
      expect(result).toEqual(mockFondos);
      expect(fondosRepository.getFondoPensiones).toHaveBeenCalledTimes(1);
    });

    fit("Debería lanzar un error si no se encuentran fondos", async () => {
      fondosRepository.getFondoPensiones.mockResolvedValue([]);

      await expect(fondosServices.getFondosPensiones()).rejects.toThrow(NotFoundError)
    });
  });

//   // Test para getFondosPensionesById
//   describe("getFondosPensionesById", () => {
//     it("Debería obtener un fondo de pensión por ID", async () => {
//       const mockFondo = { id: 1, nombre: "Fondo A", montoMinimo: 100000 };

//       // Mockeamos el repositorio
//       fondosRepository.getFondoPensionesById.mockResolvedValue(mockFondo);

//       const result = await getFondosPensionesById(1);
//       expect(result).toEqual(mockFondo);
//       expect(fondosRepository.getFondoPensionesById).toHaveBeenCalledWith(1);
//     });

//     it("Debería lanzar un error si no se encuentra el fondo", async () => {
//       // Mockeamos el repositorio para devolver null
//       fondosRepository.getFondoPensionesById.mockResolvedValue(null);

//       await expect(getFondosPensionesById(1)).rejects.toThrow(NotFoundError);
//       expect(fondosRepository.getFondoPensionesById).toHaveBeenCalledWith(1);
//     });
//   });

//   // Test para postFondosPensiones
//   describe("postFondosPensiones", () => {
//     it("Debería crear un nuevo fondo de pensión", async () => {
//       const mockFondo = {
//         id: 1,
//         nombre: "Fondo A",
//         montoMinimo: 100000,
//         categoria: "Riesgo Bajo",
//       };

//       // Mockeamos el repositorio
//       fondosRepository.postFondoPensiones.mockResolvedValue(mockFondo);

//       const result = await postFondosPensiones(
//         "Fondo A",
//         100000,
//         "Riesgo Bajo"
//       );
//       expect(result).toEqual(mockFondo);
//       expect(fondosRepository.postFondoPensiones).toHaveBeenCalledWith(
//         "Fondo A",
//         100000,
//         "Riesgo Bajo"
//       );
//     });

//     it("Debería lanzar un error si faltan campos requeridos", async () => {
//       await expect(
//         postFondosPensiones(null, 100000, "Riesgo Bajo")
//       ).rejects.toThrow(
//         "Missing required fields: nombre, montoMinimo, categoria"
//       );
//       await expect(
//         postFondosPensiones("Fondo A", null, "Riesgo Bajo")
//       ).rejects.toThrow(
//         "Missing required fields: nombre, montoMinimo, categoria"
//       );
//     });
//   });
});
