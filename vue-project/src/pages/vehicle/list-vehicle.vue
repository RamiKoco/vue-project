<template>
  <section>
    <VCard class="mb-6" :title="isDetail ? 'Araç Detay' : 'Araç Listesi'">
      <template #append>
        <VBtn
          v-if="isDetail"
          icon="mdi-arrow-left"
          variant="text"
          @click="back()"
        />
      </template>
    </VCard>

    <VCard v-if="!isDetail">
      <VCardText class="d-flex flex-wrap gap-4">
        <VRow>
          <VCol cols="12" sm="12" md="12">
            <!-- 👉 Search  -->
            <VTextField
              v-model="searchQueryVehicle"
              placeholder="Plakaya Göre Ara..."
              density="compact"
            />
          </VCol>
        </VRow>
      </VCardText>

      <VDivider />

      <VTable class="text-no-wrap table-header-bg rounded-0">
        <!-- 👉 table head -->
        <thead>
          <tr>
            <th scope="col">Araç Modeli</th>
            <th scope="col">Araç Plakası</th>
            <th scope="col">Aksiyon</th>
          </tr>
        </thead>

        <!-- 👉 table body -->
        <tbody>
          <tr v-for="(i, index) in list" :key="index">
            <td>
              <p class="text-sm">
                {{ i.model }}
              </p>
            </td>
            <td>
              <p class="text-sm">
                {{ i.plate }}
              </p>
            </td>
            <td>
              <VBtn icon="mdi-pencil" variant="text" @click="getDetail(i.id)" />
              <VBtn
                icon="mdi-delete"
                variant="text"
                color="error"
                @click="deleteVehicle(i.id)"
              />
            </td>
          </tr>
        </tbody>
      </VTable>
    </VCard>
    <VehicleDetail v-if="isDetail" :id="vehicleId" />
  </section>
</template>

<script setup>
import store from "../../store/index.js";
import VehicleDetail from "../../components/vehicle/VehicleDetail.vue";
import { onMounted, watchEffect } from "vue";

const searchQueryVehicle = ref("");
const list = ref([]);
const isDetail = ref(false);
const vehicleId = ref("");

const getVehicle = async () => {
  await store
    .dispatch("vehicle/getVehicles", {
      plate: searchQueryVehicle.value,
    })
    .then((res) => {
      list.value = res.data;
    });
};

watchEffect(getVehicle);

const deleteVehicle = async (id) => {
  await store
    .dispatch("vehicle/deleteVehicle", {
      id: id,
    })
    .then((res) => {
      getVehicle();
    });
};

const getDetail = async (id) => {
  vehicleId.value = id;
  isDetail.value = true;
};

const back = () => {
  isDetail.value = false;
  getVehicle();
};
</script>
