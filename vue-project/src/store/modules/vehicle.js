import axios from "axios";

export default {
  namespaced: true,

  state: {},

  mutations: {},

  actions: {
    async getVehicles({ commit }, payload) {
      const vehicle = await axios.get(
        `http://localhost:8080/vehicle?plate=${payload?.plate ? payload?.plate : '' }`
      );
      return vehicle;
    },
    async getVehicle({ commit }, payload) {
      const vehicle = await axios.get(
        `http://localhost:8080/vehicle/${payload.id}`
      );
      return vehicle;
    },
    async addVehicle({ commit }, payload) {
      const vehicle = await axios.post(`http://localhost:8080/vehicle`, {
        model: payload.model,
        plate: payload.plate,
      });
      return vehicle;
    },
    async updateVehicle({ commit }, payload) {
      const vehicle = await axios.put(`http://localhost:8080/vehicle`, {
        model: payload.model,
        plate: payload.plate,
        id: payload.id,
      });
      return vehicle;
    },
    async deleteVehicle({ commit }, payload) {
      const vehicle = await axios.delete(
        `http://localhost:8080/vehicle?id=${payload.id}`
      );
      return vehicle;
    },
  },

  getters: {},
};
