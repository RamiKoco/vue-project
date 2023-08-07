<template>
  <section>
    <VCard class="mb-6" title="Yolcu Ekle"> </VCard>

    <VCard>
      <VCardText
        ><VRow>
          <VCol cols="12" sm="6" md="6">
            <VTextField label="İsim" density="compact" v-model="name" />
          </VCol>
          <VCol cols="12" sm="6" md="6">
            <VTextField label="Soyad" density="compact" v-model="lastname" />
          </VCol>
          <VCol cols="12" sm="6" md="6">
            <VTextField label="Telefon" density="compact" v-model="phone" />
          </VCol>
          <VCol cols="12" sm="6" md="6">
            <VCombobox
              v-model="type"
              :items="items"
              label="Yolcu Tipi"
              density="compact"
            />
          </VCol>
          <VCol cols="12" sm="12" md="12">
            <VBtn @click="addPassenger()" variant="outlined" block> Yolcu Kaydet </VBtn>
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
const name = ref(null);
const lastname = ref(null);
const phone = ref(null);
const type = ref(null);

const items = [
  { title: "Hasta", value: "1" },
  { title: "Hastane Personeli", value: "2" },
  { title: "Doktor", value: "3" },
];

const addPassenger = async () => {
  await store
    .dispatch("passenger/addPassenger", {
      name: name.value,
      lastname: lastname.value,
      phone: phone.value,
      type: type.value.value,
    })
    .then((res) => {
      name.value = null;
      lastname.value = null;
      phone.value = null;
      type.value = null;
      
      toast.success("Yolcu başarı ile eklendi.", {
        position: "top-right",
        timeout: 3000,
      });
    }).catch((error) => {
      toast.error("Yolcu eklerken bir hata meydana geldi!", {
        position: "top-right",
        timeout: 3000,
      });
    });
};
</script>
