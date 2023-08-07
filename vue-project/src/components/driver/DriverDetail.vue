<template>
  <section>
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
            <VBtn @click="updateDriver()" variant="outlined" block>
              Sürücüyü Güncelle
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
const name = ref(null);
const lastname = ref(null);
const phone = ref(null);
const tc = ref(null);
const drivingLicenceNo = ref(null);
const address = ref(null);

const getPassenger = async () => {
  await store
    .dispatch("driver/getDriver", {
      id: props.id,
    })
    .then((res) => {
      console.log(res);
      name.value = res.data.name;
      lastname.value = res.data.lastname;
      phone.value = res.data.phone;
      tc.value = res.data.tc;
      drivingLicenceNo.value = res.data.drivinglicenceno;
      address.value = res.data.address;
    });
};

const updateDriver = async () => {
  await store
    .dispatch("driver/updateDriver", {
      name: name.value,
      lastname: lastname.value,
      phone: phone.value,
      tc: tc.value,
      drivingLicenceNo: drivingLicenceNo.value,
      address: address.value,
      id: props.id,
    })
    .then((res) => {
      toast.success("Sürücü başarı ile güncellendi.", {
        position: "top-right",
        timeout: 3000,
      });
    })
    .catch((error) => {
      toast.error("Sürücü güncellenirken hata meydana geldi!", {
        position: "top-right",
        timeout: 3000,
      });
    });
};

watchEffect(() => {
  if (props.id) {
    getPassenger();
  }
});
</script>
