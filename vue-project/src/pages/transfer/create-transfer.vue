<template>
  <section>
    <VCard class="mb-6" title="Sefer Oluştur"> </VCard>

    <VCard>
      <VCardText
        ><VRow>
          <VCol cols="12" sm="6" md="6">
            <VCombobox
              v-model="passenger"
              :items="passengerItems"
              label="Yolcu Seçin"
              density="compact"
            />
          </VCol>
          <VCol cols="12" sm="6" md="6">
            <VCombobox
              v-model="driver"
              :items="driverItems"
              label="Sürücü Seçin"
              density="compact"
            />
          </VCol>
          <VCol cols="12" sm="6" md="6">
            <VCombobox
              v-model="vehicle"
              :items="vehicleItems"
              label="Araç Seçin"
              density="compact"
            />
          </VCol>
          <VCol cols="12" sm="6" md="6">
            <AppDateTimePicker
              v-model="transferDate"
              label="Sefer Tarihi"
              density="compact"
            />
          </VCol>
          <VCol cols="12" sm="6" md="6">
            <AppDateTimePicker
              v-model="transferTime"
              label="Sefer Saati"
              density="compact"
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
            />
          </VCol>
          <VCol cols="12" sm="6" md="6">
            <VTextField
              label="Bitiş Noktası"
              density="compact"
              v-model="endPoint"
            />
          </VCol>
          <VCol cols="12" sm="12" md="12">
            <VBtn @click="addTransfer()" variant="outlined" block>
              Sefer Oluştur
            </VBtn>
          </VCol>
        </VRow></VCardText
      >
    </VCard>
  </section>
</template>

<script setup>
import store from "../../store/index.js";
import AppDateTimePicker from "@core/components/AppDateTimePicker.vue";
import { useToast } from "vue-toastification";
import { onMounted, watchEffect } from "vue";

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

const getPassengers = async () => {
  await store.dispatch("passenger/getPassengers").then((res) => {
    res.data.forEach((i) => {
      passengerItems.value.push({
        value: i.id,
        title: i.name + " " + i.lastname,
      });
    });
  });
};

watchEffect(getPassengers);

const getDriver = async () => {
  await store.dispatch("driver/getDrivers").then((res) => {
    res.data.forEach((i) => {
      driverItems.value.push({
        value: i.id,
        title: i.name + " " + i.lastname,
      });
    });
  });
};

watchEffect(getDriver);

const getVehicle = async () => {
  await store.dispatch("vehicle/getVehicles").then((res) => {
    res.data.forEach((i) => {
      vehicleItems.value.push({
        value: i.id,
        title: i.plate,
      });
    });
  });
};

watchEffect(getVehicle);

const addTransfer = async () => {
  await store
    .dispatch("transfer/addTransfer", {
      date: transferDate.value,
      driver_id: driver.value.value,
      passenger_id: passenger.value.value,
      end_point:endPoint.value,
      expedition_time: transferTime.value,
      starting_point: startPoint.value,
      vehicle_id: vehicle.value.value
    })
    .then((res) => {
      toast.success("Sefer başarı ile oluşturuldu.", {
        position: "top-right",
        timeout: 3000,
      });
    }).catch(error => {
      toast.error("Sefer oluşturulurken bir hata meydana geldi!", {
        position: "top-right",
        timeout: 3000,
      });
    })
};
</script>
