import { createStore } from "vuex"
import passenger from "./modules/passenger.js"
import driver from "./modules/driver.js"
import vehicle from "./modules/vehicle.js"
import transfer from "./modules/transfer.js"

const store = createStore({
  modules: {
    passenger,
    driver,
    vehicle,
    transfer
  },

  state: {},

  mutations: {},

  actions: {},

  getters: {},
})

export default store
