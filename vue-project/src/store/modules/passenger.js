import axios from "axios";

export default {
  namespaced: true,

  state: {},

  mutations: {},

  actions: {
    async getPassengers({ commit }, payload) {
      const passenger = await axios.get(`http://localhost:8080/passenger?name=${payload?.name ? payload?.name : '' }&type=${payload?.type ? payload.type : ''}`);
      return passenger;
    },
    async getPassenger({ commit }, payload) {
      const passenger = await axios.get(`http://localhost:8080/passenger/${payload.id}`);
      return passenger;
    },
    async addPassenger({ commit }, payload) {
      const passenger = await axios.post(`http://localhost:8080/passenger`, {
        name: payload.name,
        lastname: payload.lastname,
        phone: payload.phone,
        type: payload.type,
      });
      return passenger;
    },
    async updatePassenger({ commit }, payload) {
      const passenger = await axios.put(`http://localhost:8080/passenger`, {
        name: payload.name,
        lastname: payload.lastname,
        phone: payload.phone,
        type: payload.type,
        id:payload.id
      });
      return passenger;
    },
    async deletePassenger({ commit }, payload) {
      const passenger = await axios.delete(`http://localhost:8080/passenger?id=${payload.id}`);
      return passenger;
    },
  },

  getters: {},
};
