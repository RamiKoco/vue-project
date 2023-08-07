import axios from "axios";

export default {
  namespaced: true,

  state: {},

  mutations: {},

  actions: {
    async getDrivers({ commit }, payload) {
      const driver = await axios.get(
        `http://localhost:8080/driver?name=${payload?.name ? payload?.name : '' }`
      );
      return driver;
    },
    async getDriver({ commit }, payload) {
      const driver = await axios.get(
        `http://localhost:8080/driver/${payload.id}`
      );
      return driver;
    },
    async addDriver({ commit }, payload) {
      const driver = await axios.post(`http://localhost:8080/driver`, {
        name: payload.name,
        lastname: payload.lastname,
        phone: payload.phone,
        tc: payload.tc,
        drivingLicenceNo: payload.drivingLicenceNo,
        address: payload.address,
      });
      return driver;
    },
    async updateDriver({ commit }, payload) {
      const driver = await axios.put(`http://localhost:8080/driver`, {
        name: payload.name,
        lastname: payload.lastname,
        phone: payload.phone,
        tc: payload.tc,
        drivingLicenceNo: payload.drivingLicenceNo,
        address: payload.address,
        id: payload.id,
      });
      return driver;
    },
    async deleteDriver({ commit }, payload) {
      const driver = await axios.delete(
        `http://localhost:8080/driver?id=${payload.id}`
      );
      return driver;
    },
  },

  getters: {},
};
