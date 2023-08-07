<template>
  <section>
    <VCard class="mb-6" title="Sürücü Ekle"> </VCard>

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
            <VTextField label="T.C No" density="compact" v-model="tc" />
          </VCol>
          <VCol cols="12" sm="6" md="6">
            <VTextField
              label="Ehliyet No"
              density="compact"
              v-model="drivingLicenceNo"
            />
          </VCol>
          <VCol cols="12" sm="6" md="6">
            <VTextField label="Adres" density="compact" v-model="address" />
          </VCol>
          <VCol cols="12" sm="12" md="12">
            <VBtn @click="addDriver()" variant="outlined" block>
              Sürücü Kaydet
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
const name = ref(null);
const lastname = ref(null);
const phone = ref(null);
const tc = ref(null);
const drivingLicenceNo = ref(null);
const address = ref(null);

const addDriver = async () => {
  await store
    .dispatch("driver/addDriver", {
      name: name.value,
      lastname: lastname.value,
      phone: phone.value,
      tc: tc.value,
      drivingLicenceNo: drivingLicenceNo.value,
      address: address.value,
    })
    .then((res) => {
      name.value = null;
      lastname.value = null;
      phone.value = null;
      tc.value = null;
      drivingLicenceNo.value = null;
      address.value = null;

      toast.success("Sürücü başarı ile eklendi.", {
        position: "top-right",
        timeout: 3000,
      });
    })
    .catch((error) => {
      toast.error("Sürücü eklerken bir hata meydana geldi!", {
        position: "top-right",
        timeout: 3000,
      });
    });
};
</script>
