<template>
  <section>
    <VCard>
      <VCardText
        ><VRow>
          <VCol cols="12" sm="6" md="6">
            <VCombobox
              v-model="passenger"
              :items="passengerItems"
              label="Yolcu Seçin"
              density="compact"
              readonly
            />
          </VCol>
          <VCol cols="12" sm="6" md="6">
            <VCombobox
              v-model="driver"
              :items="driverItems"
              label="Sürücü Seçin"
              density="compact"
              readonly
            />
          </VCol>
          <VCol cols="12" sm="6" md="6">
            <VCombobox
              v-model="vehicle"
              :items="vehicleItems"
              label="Araç Seçin"
              density="compact"
              readonly
            />
          </VCol>
          <VCol cols="12" sm="6" md="6">
            <AppDateTimePicker
              v-model="transferDate"
              label="Sefer Tarihi"
              density="compact"
              readonly
            />
          </VCol>
          <VCol cols="12" sm="6" md="6">
            <AppDateTimePicker
              v-model="transferTime"
              label="Sefer Saati"
              density="compact"
              readonly
              :config="{
                enableTime: true,
                noCalendar: true,
                dateFormat: 'H:i',
              }"
            />
          </VCol>
          <VCol cols="12" sm="6" md="6">
            <VTextField
              label="Başlangıç Noktası"
              density="compact"
              v-model="startPoint"
              readonly
            />
          </VCol>
          <VCol cols="12" sm="6" md="6">
            <VTextField
              label="Bitiş Noktası"
              density="compact"
              v-model="endPoint"
              readonly
            />
          </VCol> </VRow
      ></VCardText>
    </VCard>
  </section>
</template>

<script setup>
import store from "../../store/index.js";
import { useToast } from "vue-toastification";
import { onMounted, ref, watchEffect } from "vue";

const props = defineProps({ id: { type: String, required: true } });

const toast = useToast();
const passengerItems = ref([]);
const driverItems = ref([]);
const vehicleItems = ref([]);

const passenger = ref(null);
const driver = ref(null);
const vehicle = ref(null);
const transferDate = ref(null);
const transferTime = ref(null);
const startPoint = ref(null);
const endPoint = ref(null);

const getTransfer = async () => {
  await store
    .dispatch("transfer/getTransfer", {
      id: props.id,
    })
    .then((res) => {
      console.log(res.data);
      transferDate.value = res.data.date.split("T")[0];
      transferTime.value = res.data.expedition_time;
      startPoint.value = res.data.starting_point;
      endPoint.value = res.data.end_point;
      getPassengers(res.data.passenger_id);
      getDriver(res.data.driver_id);
      getVehicle(res.data.vehicle_id);
    });
};

const getPassengers = async (item) => {
  await store.dispatch("passenger/getPassengers").then((res) => {
    res.data.forEach((i) => {
      passengerItems.value.push({
        value: i.id,
        title: i.name + " " + i.lastname,
      });
      if (i.id == item) {
        passenger.value = {
          value: i.id,
          title: i.name + " " + i.lastname,
        };
      }
    });
  });
};

const getDriver = async (item) => {
  await store.dispatch("driver/getDrivers").then((res) => {
    res.data.forEach((i) => {
      driverItems.value.push({
        value: i.id,
        title: i.name + " " + i.lastname,
      });
      if (i.id == item) {
        driver.value = {
          value: i.id,
          title: i.name + " " + i.lastname,
        };
      }
    });
  });
};

const getVehicle = async (item) => {
  await store.dispatch("vehicle/getVehicles").then((res) => {
    res.data.forEach((i) => {
      vehicleItems.value.push({
        value: i.id,
        title: i.plate,
      });
      if (i.id == item) {
        vehicle.value = {
          value: i.id,
          title: i.plate,
        };
      }
    });
  });
};

watchEffect(() => {
  if (props.id) {
    getTransfer();
  }
});
</script>
