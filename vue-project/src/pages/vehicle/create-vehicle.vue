<template>
  <section>
    <VCard class="mb-6" title="Yolcu Ekle"> </VCard>

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
            <VBtn @click="addVehicle()" variant="outlined" block>
              Araç Kaydet
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
import { onMounted } from "vue";

const toast = useToast();
const model = ref(null);
const plate = ref(null);

const addVehicle = async () => {
  await store
    .dispatch("vehicle/addVehicle", {
      model: model.value,
      plate: plate.value,
    })
    .then((res) => {
      model.value = null;
      plate.value = null;

      toast.success("Araç başarı ile eklendi.", {
        position: "top-right",
        timeout: 3000,
      });
    })
    .catch((error) => {
      toast.error("Araç eklerken bir hata meydana geldi!", {
        position: "top-right",
        timeout: 3000,
      });
    });
};
</script>
