import { api } from "./api";

export interface FilterOptions {
  muscles: string[];
  categories: string[];
  equipment: string[];
}

export const exerciseService = {
  getMuscles: async (token: string): Promise<string[]> => {
    try {
      const response = await api.get("/exercises/muscles", token);
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error("Failed to fetch muscles:", error);
      return [];
    }
  },

  getCategories: async (token: string): Promise<string[]> => {
    try {
      const response = await api.get("/exercises/categories", token);
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      return [];
    }
  },

  getEquipment: async (token: string): Promise<string[]> => {
    try {
      const response = await api.get("/exercises/equipment", token);
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error("Failed to fetch equipment:", error);
      return [];
    }
  },

  getAllFilters: async (token: string): Promise<FilterOptions> => {
    try {
      const [muscles, categories, equipment] = await Promise.all([
        exerciseService.getMuscles(token),
        exerciseService.getCategories(token),
        exerciseService.getEquipment(token),
      ]);
      return { muscles, categories, equipment };
    } catch (error) {
      console.error("Failed to fetch all filters:", error);
      return { muscles: [], categories: [], equipment: [] };
    }
  },
};
