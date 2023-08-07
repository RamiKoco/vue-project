<template>
  <section>
    <VCard>
      <VCardText
        ><VRow>
          <VCol cols="12" sm="6" md="6">
            <VTextField label="Araç Modeli" density="compact" v-model="model" />
          </VCol>
          <VCol cols="12" sm="6" md="6">
            <VTextField
              label="Araç Plakası"
              density="compact"
              v-model="plate"
            />
          </VCol>
          <VCol cols="12" sm="12" md="12">
            <VBtn @click="updateVehicle()" variant="outlined" block>
              Aracı Güncelle
            </VBtn>
          </VCol>
        </VRow></VCardText
      >
    </VCard>
  </section>
</template>

<script setup>
import store from "../../store/index.js";
import { useToast } from "vue-toastification";
import { onMounted, ref, watchEffect } from "vue";

const props = defineProps({ id: { type: String, required: true } });

const toast = useToast();
const model = ref(null);
const plate = ref(null);


const getVehicle = async () => {
  await store
    .dispatch("vehicle/getVehicle", {
      id: props.id,
    })
    .then((res) => {
      model.value = res.data.model;
      plate.value = res.data.plate;
    });
};

const updateVehicle = async () => {
  await store
    .dispatch("vehicle/updateVehicle", {
      model: model.value,
      plate:plate.value,
      id: props.id,
    })
    .then((res) => {
      toast.success("Araç başarı ile güncellendi.", {
        position: "top-right",
        timeout: 3000,
      });
    })
    .catch((error) => {
      toast.error("Araç güncellenirken hata meydana geldi!", {
        position: "top-right",
        timeout: 3000,
      });
    });
};

watchEffect(() => {
  if (props.id) {
    getVehicle();
  }
});
</script>
