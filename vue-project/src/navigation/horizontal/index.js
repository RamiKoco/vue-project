export default [
  {
    title: "Anasayfa",
    to: { name: "index" },
    icon: { icon: "mdi-home-outline" },
  },
  {
    title: "Transfer",
    icon: { icon: "mdi-car-traction-control" },
    children: [
      {
        title: "Transfer Listesi",
        to: { name: "transfer-list-transfer" },
        icon: { icon: "mdi-list-box-outline" },
      },
      {
        title: "Transfer Oluştur",
        to: { name: "transfer-create-transfer" },
        icon: { icon: "mdi-account-multiple-plus-outline" },
      },
    ],
  },
  {
    title: "Yolcu",
    icon: { icon: "mdi-seat-passenger" },
    children: [
      {
        title: "Yolcu Listesi",
        to: { name: "passenger-list-passenger" },
        icon: { icon: "mdi-account-multiple-plus-outline" },
      },
      {
        title: "Yolcu Ekle",
        to: { name: "passenger-create-passenger" },
        icon: { icon: "mdi-account-multiple-plus-outline" },
      },
    ],
  },
  {
    title: "Sürücü",
    icon: { icon: "mdi-card-account-details-outline" },
    children: [
      {
        title: "Sürücü Listesi",
        to: { name: "driver-list-driver" },
        icon: { icon: "mdi-list-box-outline" },
      },
      {
        title: "Sürücü Ekle",
        to: { name: "driver-create-driver" },
        icon: { icon: "mdi-account-multiple-plus-outline" },
      },
    ],
  },
  {
    title: "Araç",
    icon: { icon: "mdi-car" },
    children: [
      {
        title: "Araç Listesi",
        to: { name: "vehicle-list-vehicle" },
        icon: { icon: "mdi-list-box-outline" },
      },
      {
        title: "Araç Ekle",
        to: { name: "vehicle-create-vehicle" },
        icon: { icon: "mdi-account-multiple-plus-outline" },
      },
    ],
  },

];
