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
            <VCombobox
              v-model="type"
              :items="typeList"
              label="Yolcu Tipi"
              density="compact"
            />
          </VCol>
          <VCol cols="12" sm="12" md="12">
            <VBtn @click="updatePassenger()" variant="outlined" block> Yolcuyu Güncelle </VBtn>
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

const props = defineProps({id:{type:String,required:true}})

const typeList = [
  { title: "Hasta", value: "1" },
  { title: "Hastane Personeli", value: "2" },
  { title: "Doktor", value: "3" },
];
const toast = useToast();
const detailPassenger = ref();
const name = ref(null);
const lastname = ref(null);
const phone = ref(null);
const type = ref(null);

const getPassenger =async () => {
  await store
    .dispatch("passenger/getPassenger", {
     id:props.id
    })
    .then((res) => {
      console.log(res);
      detailPassenger.value = res.data;
      name.value = res.data.name;
      lastname.value = res.data.lastname;
      phone.value = res.data.phone;
      typeList.forEach(i => {
        if(i.value ==res.data.type ){
          type.value = i
        }
      })
    });
}

const updatePassenger =async () => {
  await store
    .dispatch("passenger/updatePassenger", {
      name: name.value,
      lastname: lastname.value,
      phone: phone.value,
      type: type.value.value,
      id: props.id
    })
    .then((res) => {
      toast.success("Yolcu başarı ile güncellendi.", {
        position: "top-right",
        timeout: 3000,
      });
    }).catch((error) => {
      toast.error("Yolcu güncellenirken hata meydana geldi!", {
        position: "top-right",
        timeout: 3000,
      });
    });
}

watchEffect(() => {
  if(props.id){
    getPassenger();
  }
})
</script>
