<template>
  <section>
    <VCard class="mb-6" :title="isDetail ? 'Yolcu Detay' : 'Yolcu Listesi' ">
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
          <VCol cols="12" sm="12" md="6">
            <VCombobox
              v-model="searchQueryType"
              :items="type"
              label="Tip"
              clearable
              density="compact"
            />
          </VCol>
          <VCol cols="12" sm="12" md="6">
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
            <th scope="col">Tipi</th>
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
                {{ typeSet(i.type) }}
              </p>
            </td>
            <td>
              <VBtn
                icon="mdi-pencil"
                variant="text"
                @click="getPassenger(i.id)"
              />
              <VBtn
                icon="mdi-delete"
                variant="text"
                color="error"
                @click="deletePassenger(i.id)"
              />
            </td>
          </tr>
        </tbody>
      </VTable>
    </VCard>
    <PassengerDetail v-if="isDetail" :id="passengerId" />
  </section>
</template>

<script setup>
import store from "../../store/index.js";
import PassengerDetail from "../../components/passenger/PassengerDetail.vue";
import { onMounted, watchEffect } from "vue";

const type = [
  { title: "Hasta", value: "1" },
  { title: "Hastane Personeli", value: "2" },
  { title: "Doktor", value: "3" },
];

const searchQueryType = ref(null);
const searchQueryName = ref("");
const list = ref([]);
const isDetail = ref(false);
const passengerId = ref("");

const getPassengers = async () => {
  await store
    .dispatch("passenger/getPassengers", {
      name: searchQueryName.value,
      type: searchQueryType.value ? searchQueryType.value.value : "",
    })
    .then((res) => {
      list.value = res.data;
    });
};

watchEffect(getPassengers);

const typeSet = (item) => {
  let typeTitle = "";
  type.forEach((i) => {
    if (i.value == item) {
      typeTitle = i.title;
    }
  });

  return typeTitle;
};

const deletePassenger = async (id) => {
  await store
    .dispatch("passenger/deletePassenger", {
      id: id,
    })
    .then((res) => {
      getPassengers();
    });
};

const getPassenger = async (id) => {
  passengerId.value = id;
  isDetail.value = true;
};

const back = () => {
  isDetail.value = false;
  getPassengers();
}
   
</script>
