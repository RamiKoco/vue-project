<template>
  <section>
    <VRow class="match-height">
      <VCol cols="12" sm="4" md="3">
        <CardStatisticsVertical
          v-bind="{
            title: 'Toplam Transfer Sayısı',
            color: 'primary',
            icon: 'mdi-car-traction-control',
            stats: totalTransfers,
            subtitle: 'Tüm Zamanlar',
          }"
        />
      </VCol>
      <VCol cols="12" sm="4" md="3">
        <CardStatisticsVertical
          v-bind="{
            title: 'Toplam Araç Sayısı',
            color: 'error',
            icon: 'mdi-car',
            stats: totalVehicle,
            subtitle: 'Tüm Zamanlar',
          }"
        />
      </VCol>
      <VCol cols="12" sm="4" md="3">
        <CardStatisticsVertical
          v-bind="{
            title: 'Toplam Şöför Sayısı',
            color: 'info',
            icon: 'mdi-card-account-details-outline',
            stats: totalDriver,
            subtitle: 'Tüm Zamanlar',
          }"
        />
      </VCol>
      <VCol cols="12" sm="4" md="3">
        <CardStatisticsVertical
          v-bind="{
            title: 'Toplam Kayıtlı Yolcu Sayısı',
            color: 'success',
            icon: 'mdi-seat-passenger',
            stats: totalPassenger,
            subtitle: 'Tüm Zamanlar',
          }"
        />
      </VCol>
      <VCol cols="12" md="12">
        <VCard>
          <VTable height="300" class="text-no-wrap table-header-bg rounded-0">
            <!-- 👉 table head -->
            <thead>
              <tr>
                <th scope="col">Sefer Tarihi</th>
                <th scope="col">Sefer Saati</th>
                <th scope="col">Başlangıç Noktası</th>
                <th scope="col">Bitiş Noktası</th>
                <th scope="col">Şöför Adı Soyadı</th>
                <th scope="col">Araç Plakası</th>
                <th scope="col">Yolcu Adı Soyadı</th>
              </tr>
            </thead>

            <!-- 👉 table body -->
            <tbody>
              <tr v-for="(i, index) in list" :key="index">
                <td>
                  <p class="text-sm">
                    {{ i.date }}
                  </p>
                </td>
                <td>
                  <p class="text-sm">
                    {{ i.time }}
                  </p>
                </td>
                <td>
                  <p class="text-sm">
                    {{ i.startPoint }}
                  </p>
                </td>
                <td>
                  <p class="text-sm">
                    {{ i.endPoint }}
                  </p>
                </td>
                <td>
                  <p class="text-sm">
                    {{ i.driverFullName }}
                  </p>
                </td>
                <td>
                  <p class="text-sm">
                    {{ i.plate }}
                  </p>
                </td>
                <td>
                  <p class="text-sm">
                    {{ i.passengerFullName }}
                  </p>
                </td>
              </tr>
            </tbody>
          </VTable>
        </VCard>
      </VCol>
    </VRow>
  </section>
</template>

<script setup>
import store from "../store/index.js";
import { onMounted, watchEffect } from "vue";

const list = ref([]);
const searchDriverName = ref("");
const searchVehiclePlate = ref("");
const searchPassengerName = ref("");
const searchIncreaseDecrease = ref("ASC");
const totalTransfers = ref(0);
const totalVehicle = ref(0);
const totalDriver = ref(0);
const totalPassenger = ref(0);

const getTransfer = async () => {
  list.value = [];
  await store
    .dispatch("transfer/getTransfers", {
      driverName: searchDriverName.value,
      vehiclePlate: searchVehiclePlate.value,
      passengerName: searchPassengerName.value,
      increaseDecrease: searchIncreaseDecrease.value,
    })
    .then((res) => {
      totalTransfers.value = res.data.length;
      res.data.forEach((i) => {
        list.value.push({
          id: i.id,
          date: i.date.split("T")[0],
          time: i.expedition_time,
          startPoint: i.starting_point,
          endPoint: i.end_point,
          driverFullName: i.driver_name + " " + i.driver_lastname,
          plate: i.plate,
          passengerFullName: i.passenger_name + " " + i.passenger_lastname,
        });
        console.log(list.value);
      });
    });
};

watchEffect(getTransfer);

const getVehicle = async () => {
  await store.dispatch("vehicle/getVehicles").then((res) => {
    totalVehicle.value = res.data.length;
  });
};
watchEffect(getVehicle);

const getDriver = async () => {
  await store.dispatch("driver/getDrivers").then((res) => {
    totalDriver.value = res.data.length;
  });
};

watchEffect(getDriver);

const getPassengers = async () => {
  await store.dispatch("passenger/getPassengers").then((res) => {
    totalPassenger.value = res.data.length;
  });
};
watchEffect(getPassengers);
</script>
