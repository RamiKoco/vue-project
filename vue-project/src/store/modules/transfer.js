import axios from "axios";

export default {
  namespaced: true,

  state: {},

  mutations: {},

  actions: {
    async getTransfers({ commit }, payload) {
      const transfer = await axios.get(
        `http://localhost:8080/transfer?driverName=${
          payload?.driverName ? payload?.driverName : ""
        }&vehiclePlate=${
          payload?.vehiclePlate ? payload?.vehiclePlate : ""
        }&passengerName=${
          payload?.passengerName ? payload?.passengerName : ""
        }&increaseDecrease=${
          payload?.increaseDecrease ? payload?.increaseDecrease : "ASC"
        }`
      );
      return transfer;
    },
    async getTransfer({ commit }, payload) {
      const transfer = await axios.get(
        `http://localhost:8080/transfer/${payload.id}`
      );
      return transfer;
    },
    async addTransfer({ commit }, payload) {
      const transfer = await axios.post(`http://localhost:8080/transfer`, {
        date: payload.date,
        driver_id: payload.driver_id,
        passenger_id: payload.passenger_id,
        end_point: payload.end_point,
        expedition_time: payload.expedition_time,
        starting_point: payload.starting_point,
        vehicle_id: payload.vehicle_id,
      });
      return transfer;
    },
    async updateTransfer({ commit }, payload) {
      const transfer = await axios.put(`http://localhost:8080/transfer`, {
        date: payload.date,
        driver_id: payload.driver_id,
        passenger_id: payload.passenger_id,
        end_point: payload.end_point,
        expedition_time: payload.expedition_time,
        starting_point: payload.starting_point,
        vehicle_id: payload.vehicle_id,
        id: payload.id,
      });
      return transfer;
    },
  },

  getters: {},
};
