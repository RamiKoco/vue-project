<template>
  <section>
    <VCard class="mb-6" :title="isDetail ? 'Sürücü Detay' : 'Sürücü Listesi'">
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
              v-model="searchQueryName"
              placeholder="İsmi Göre Ara..."
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
            <th scope="col">Adı</th>
            <th scope="col">Soyadı</th>
            <th scope="col">Telefon</th>
            <th scope="col">T.C. No</th>
            <th scope="col">Ehliyet No</th>
            <th scope="col">Adres</th>
            <th scope="col">Aksiyon</th>
          </tr>
        </thead>

        <!-- 👉 table body -->
        <tbody>
          <tr v-for="(i, index) in list" :key="index">
            <td>
              <p class="text-sm">
                {{ i.name }}
              </p>
            </td>
            <td>
              <p class="text-sm">
                {{ i.lastname }}
              </p>
            </td>
            <td>
              <p class="text-sm">
                {{ i.phone }}
              </p>
            </td>
            <td>
              <p class="text-sm">
                {{ i.tc }}
              </p>
            </td>
            <td>
              <p class="text-sm">
                {{ i.drivinglicenceno }}
              </p>
            </td>
            <td>
              <p class="text-sm">
                {{ i.address }}
              </p>
            </td>
            <td>
              <VBtn icon="mdi-pencil" variant="text" @click="getDetail(i.id)" />
              <VBtn
                icon="mdi-delete"
                variant="text"
                color="error"
                @click="deleteDriver(i.id)"
              />
            </td>
          </tr>
        </tbody>
      </VTable>
    </VCard>
    <DriverDetail v-if="isDetail" :id="driverId" />
  </section>
</template>

<script setup>
import store from "../../store/index.js";
import DriverDetail from "../../components/driver/DriverDetail.vue";
import { onMounted, watchEffect } from "vue";

const searchQueryName = ref("");
const list = ref([]);
const isDetail = ref(false);
const driverId = ref("");

const getDriver = async () => {
  await store
    .dispatch("driver/getDrivers", {
      name: searchQueryName.value,
    })
    .then((res) => {
      list.value = res.data;
    });
};

watchEffect(getDriver);

const deleteDriver = async (id) => {
  await store
    .dispatch("driver/deleteDriver", {
      id: id,
    })
    .then((res) => {
      getDriver();
    });
};

const getDetail = async (id) => {
  driverId.value = id;
  isDetail.value = true;
};

const back = () => {
  isDetail.value = false;
  getDriver();
};
</script>
