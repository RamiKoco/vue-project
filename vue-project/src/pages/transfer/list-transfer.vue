<template>
  <section>
    <VCard
      class="mb-6"
      :title="isDetail ? 'Transfer Detay' : 'Transfer Listesi'"
    >
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
      <template #append>
        <VBtn @click="filter()">
          Filtrele
          <VIcon
            end
            :icon="isFilter ? 'mdi-arrow-up': 'mdi-arrow-down'"
          />
        </VBtn>
      </template>
      <VCardText v-if="isFilter" class="d-flex flex-wrap gap-4">
        <VRow>
          <VCol cols="12" sm="12" md="6">
            <!-- 👉 Search  -->
            <VTextField
              placeholder="Şöför Adına Göre Ara..."
              density="compact"
              v-model="searchDriverName"
            />
          </VCol>
          <VCol cols="12" sm="12" md="6">
            <!-- 👉 Search  -->
            <VTextField
              placeholder="Plakaya Göre Ara..."
              density="compact"
              v-model="searchVehiclePlate"
            />
          </VCol>
          <VCol cols="12" sm="12" md="6">
            <!-- 👉 Search  -->
            <VTextField
              placeholder="Yolcu Adına Göre Ara..."
              density="compact"
              v-model="searchPassengerName"
            />
          </VCol>
          <VCol cols="12" sm="12" md="6">
            <!-- 👉 Search  -->
            <VSwitch
              v-model="increaseDecrease"
              density="compact"
              inset
              :label="`Tarihe Göre Sırala : ${isIncreaseDecrease(
                increaseDecrease
              )}`"
            />
          </VCol>
        </VRow>
      </VCardText>

      <VDivider />

      <VTable class="text-no-wrap table-header-bg rounded-0">
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
            <th scope="col">Aksiyon</th>
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
            <td>
              <VBtn
                v-if="isUpdate(i.date)"
                icon="mdi-pencil"
                variant="text"
                @click="getDetail(i.id)"
              />
              <VBtn
                v-if="!isUpdate(i.date)"
                icon="mdi-eye"
                variant="text"
                @click="getNotUpdateDetail(i.id)"
              />
            </td>
          </tr>
        </tbody>
      </VTable>
    </VCard>
    <TransferDetail v-if="isUpdateDetail" :id="transferId" />
    <TransferGetDetail v-if="isNotUpdateDetail" :id="transferId" />
  </section>
</template>

<script setup>
import store from "../../store/index.js";
import TransferDetail from "../../components/transfer/TransferDetail.vue";
import TransferGetDetail from "../../components/transfer/TransferGetDetail.vue";
import { onMounted, watchEffect } from "vue";

const list = ref([]);
const isDetail = ref(false);
const isUpdateDetail = ref(false);
const isNotUpdateDetail = ref(false);
const transferId = ref("");
const increaseDecrease = ref(true);
const searchDriverName = ref("");
const searchVehiclePlate = ref("");
const searchPassengerName = ref("");
const searchIncreaseDecrease = ref("DESC");
const isFilter = ref(false);

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

const getDetail = async (id) => {
  transferId.value = id;
  isDetail.value = true;
  isUpdateDetail.value = true;
};

const getNotUpdateDetail = async (id) => {
  transferId.value = id;
  isDetail.value = true;
  isNotUpdateDetail.value = true;
};

const back = () => {
  isDetail.value = false;
  isUpdateDetail.value = false;
  isNotUpdateDetail.value = false;
  getTransfer();
};

const isUpdate = (item) => {
  const date = new Date();
  const transferDate = new Date(item);
  return date < transferDate;
};

const isIncreaseDecrease = (item) => {
  if (item) {
    searchIncreaseDecrease.value = "DESC";
    return "Azalan";
  } else {
    searchIncreaseDecrease.value = "ASC";
    return "Artan";
  }
};

const filter = () => {
  isFilter.value = !isFilter.value;
}

</script>
