// import { directHisobot } from "../../../backend/src/controllers/admin-app/registration.controller";

const routes = [
  {
    path: "/",
    component: () => import("@/pages/Layout/DashboardLayout.vue"),
    redirect: "user",
    name: "dashboard",
    children: [
      {
        path: "user",
        name: "User Profile",
        component: () => import("@/pages/User/Index.vue")
      },
      {
        path: "statsionar",
        name: "Statsionar",
        component: () => import("@/pages/User/Statsionar.vue")
      },
      {
        path: "bemor",
        name: "Bemor",
        component: () => import("@/pages/Bemorlar/Index.vue")
      },
      {
        path: "bemor-create",
        name: "Bemor-create",
        component: () => import("@/pages/Bemorlar/Create.vue")
      },
      {
        path: "bemor-update/:id",
        name: "Bemor-update",
        component: () => import("@/pages/Bemorlar/Update.vue")
      },
      {
        path: "naprovitel",
        name: "Naprovitel",
        component: () => import("@/pages/Naprovitel/Index.vue")
      },
      {
        path: "naprovitel-create",
        name: "Naprovitel Create",
        component: () => import("@/pages/Naprovitel/Create.vue")
      },
      {
        path: "naprovitel-update/:id",
        name: "Naprovitel Update",
        component: () => import("@/pages/Naprovitel/Update.vue")
      },
      {
        path: "medpritavitel",
        name: "Medpristavitel",
        component: () => import("@/pages/medPristavitel/Index.vue")
      },
      {
        path: "habarnoma",
        name: "SmsHabarnoma",
        component: () => import("@/pages/Habarnoma/HabarNoma.vue")
      },
      {
        path: "medpritavitel-create",
        name: "medpritavitel Create",
        component: () => import("@/pages/medPristavitel/Create.vue")
      },
      {
        path: "medpritavitel-update/:id",
        name: "medpritavitel Update",
        component: () => import("@/pages/medPristavitel/Update.vue")
      },
      {
        path: "reagent",
        name: "Reagent",
        component: () => import("@/pages/Reagent/Index.vue")
      },
      {
        path: "reagent-create",
        name: "Reagent Create",
        component: () => import("@/pages/Reagent/Create.vue")
      },
      {
        path: "reagent-update/:id",
        name: "Reagent Update",
        component: () => import("@/pages/Reagent/Update.vue")
      },
      {
        path: "prixod",
        name: "Prixod",
        component: () => import("@/pages/Prixod/Index.vue")
      },

      {
        path: "provider",
        name: "Provider",
        component: () => import("@/pages/Pastavshik/Index.vue")
      },
      {
        path: "provider-create",
        name: "Provider Create",
        component: () => import("@/pages/Pastavshik/Create.vue")
      },
      {
        path: "provider-update/:id",
        name: "Provider Update",
        component: () => import("@/pages/Pastavshik/Update.vue")
      },
      {
        path: "provider/pay",
        name: "ProviderPay",
        component: () => import("@/pages/PastavshikTolov/Index.vue")
      },

      {
        path: "/arxiv",
        name: "Arxiv",
        component: () => import("@/pages/Arxiv/Index.vue")
      },
      {
        path: "/hisobotlar",
        nema: "Hisobotlar",
        component: () => import("@/pages/Hisobot/From.vue")
      },
      {
        path: "oplata",
        name: "oplata",
        component: () => import("@/pages/Oplata/Index.vue")
      },
      {
        path: "oplata-create",
        name: "Oplata Create",
        component: () => import("@/pages/Oplata/Create.vue")
      },
      {
        path: "oplata-update/:id",
        name: "oplata-update",
        component: () => import("@/pages/Oplata/Update.vue")
      },
      {
        path: "oplataDoc/:id",
        name: "oplataDoc",
        component: () => import("@/pages/oplataDoc/From.vue")
      },
      {
        path: "oplata_doc",
        name: "oplataDocument",
        component: () => import("@/pages/oplataDoc/Index.vue")
      },
      {
        path: "naprovitel-oplata",
        name: "naprovitel-oplata",
        component: () => import("@/pages/naprovitlOplata/Index.vue")
      },
      {
        path: "naprovitel-oplata-create",
        name: "naprovitel Create",
        component: () => import("@/pages/naprovitlOplata/Create.vue")
      },
      {
        path: "naprovitel-oplata-update/:id",
        name: "naprovitel-update",
        component: () => import("@/pages/naprovitlOplata/Update.vue")
      },
      {
        path: "KassaDoc/:id",
        name: "KassaDoc",
        component: () => import("@/pages/KassaDoc/From.vue")
      },
      {
        path: "kassaDoc",
        name: "KAssaDOcument",
        component: () => import("@/pages/KassaDoc/Index.vue")
      },
      {
        path: "Shifokor-bolimi",
        name: "ShifokorBolimi",
        component: () => import("@/pages/ShifokorBolimi/Index.vue")
      },
      {
        path: "doctor-hisobot",
        name: "DoctorHisobot",
        component: () => import("@/pages/Hisobot/Doctor.vue")
      },

      {
        path: "kassa-hisobot",
        name: "KassaHisobot",
        component: () => import("@/pages/Hisobot/Kassa.vue")
      },
      {
        path: "inspection_hisobot",
        name: "InspectionHisobot",
        component: () => import("@/pages/Hisobot/Inspection.vue")
      },
      {
        path: "tekshiruvchi_hisobot",
        name: "TekshiruvHisobot",
        component: () => import("@/pages/Hisobot/Tekshiruvchi.vue")
      },
      {
        path: "surgery/hisobot",
        name: "SurgeryHeobot",
        component: () => import("@/pages/Hisobot/Operatsiya.vue")
      },
      {
        path: "surgery/qoshimcha/hisobot",
        name: "SurgeryQoshimchaHeobot",
        component: () => import("@/pages/Hisobot/OperQoshimcha.vue")
      },
      {
        path: "direct_hisobot",
        name: "DirectHisobot",
        component: () => import("@/pages/Hisobot/Direct.vue")
      },
      {
        path: "med/direct/hisobot",
        name: "MedDirectHisobot",
        component: () => import("@/pages/Hisobot/MedHisobot.vue")
      },
      {
        path: "provayder/hisobot",
        name: "PastavshikHisobot",
        component: () => import("@/pages/Hisobot/Pastavshik.vue")
      },
      {
        path: "reagent/hisobot",
        name: "ReagentHisobot",
        component: () => import("@/pages/Hisobot/Reagent.vue")
      },
      {
        path: "/shif/oper/son",
        name: "ShifOperSon",
        component: () => import("@/pages/Hisobot/OperShif.vue")
      },
      {
        path: "Shifokor-bolimi-create",
        name: "ShifokorBolimi-create",
        component: () => import("@/pages/ShifokorBolimi/Create.vue")
      },
      {
        path: "shifokor-bolimi-update/:id",
        name: "ShifokorBolimi-update",
        component: () => import("@/pages/ShifokorBolimi/Update.vue")
      },
      {
        path: "yonalish",
        name: "Yonalish",
        component: () => import("@/pages/ShifokorYonalishi/Index.vue")
      },
      {
        path: "Shifokor-yonalish-create",
        name: "ShifokorYonalish-create",
        component: () => import("@/pages/ShifokorYonalishi/Create.vue")
      },
      {
        path: "shifokor-yonalish-update/:id",
        name: "ShifokorYonalish-update",
        component: () => import("@/pages/ShifokorYonalishi/Update.vue")
      },
      {
        path: "qoshimcha",
        name: "Qoshimcha",
        component: () => import("@/pages/OperatQoshim/Index.vue")
      },
      {
        path: "qoshimcha-create",
        name: "Qoshimcha-create",
        component: () => import("@/pages/OperatQoshim/Create.vue")
      },
      {
        path: "qoshimcha-update/:id",
        name: "Qoshimcha-update",
        component: () => import("@/pages/OperatQoshim/Update.vue")
      },
      {
        path: "xabarnoma",
        name: "Habarnoma",
        component: () => import("@/pages/Habarnoma/HabarNoma.vue")
      },
      {
        path: "shifokor",
        name: "shifokor",
        component: () => import("@/pages/Shifokorlar/Index.vue")
      },
      {
        path: "shifokor-create",
        name: "shifokor-create",
        component: () => import("@/pages/Shifokorlar/Create.vue")
      },
      {
        path: "shifokor-update/:id",
        name: "shifokor-update",
        component: () => import("@/pages/Shifokorlar/Update.vue")
      },
      {
        path: "operatsiya",
        name: "Operatsiya",
        component: () => import("@/pages/Operatsiya/Index.vue")
      },
      {
        path: "operatsiya-create",
        name: "Operatsiya-create",
        component: () => import("@/pages/Operatsiya/Create.vue")
      },
      {
        path: "operatsiya-update/:id",
        name: "Operatsiya-update",
        component: () => import("@/pages/Operatsiya/Update.vue")
      },
      {
        path: "operatsiya-category",
        name: "Operatsiya category",
        component: () => import("@/pages/OperatsiyaCategory/Index.vue")
      },
      {
        path: "operatsiya-category-create",
        name: "Operatsiya category create",
        component: () => import("@/pages/OperatsiyaCategory/Create.vue")
      },
      {
        path: "operatsiya-category-update/:id",
        name: "Operatsiya category update",
        component: () => import("@/pages/OperatsiyaCategory/Update.vue")
      },
      {
        path: "hodimlar",
        name: "Hodimlar",
        component: () => import("@/pages/Hodimlar/Index.vue")
      },
      {
        path: "hodimlar-create",
        name: "Hodimlar-create",
        component: () => import("@/pages/Hodimlar/Create.vue")
      },
      {
        path: "hodimlar-update/:id",
        name: "Hodimlar-update",
        component: () => import("@/pages/Hodimlar/Update.vue")
      },
      {
        path: "penalty-bonus",
        name: "penalty-bonus",
        component: () => import("@/pages/PenaltyBonus/Index.vue")
      },   
      {
        path: "penalty-bonus-create",
        name: "penalty-bonus-create",
        component: () => import("@/pages/PenaltyBonus/Create.vue")
      },
      {
        path: "penalty-bonus-update/:id",
        name: "penalty-bonus-update",
        component: () => import("@/pages/PenaltyBonus/Update.vue")
      },
      {
        path: 'user-come-leave',
        name: 'user-come-leave',
        component: () => import('@/pages/UserComeLeave/Index.vue')
      },
      {
        path: "xonalar",
        name: "Xonalar",
        component: () => import("@/pages/Xonalar/Index.vue")
      },
      {
        path: "reagent/department",
        name: "Reagent Department",
        component: () => import("@/pages/ReagentBolimi/Index.vue")
      },
      {
        path: "xonalar-create",
        name: "Xonalar-create",
        component: () => import("@/pages/Xonalar/Create.vue")
      },
      {
        path: "xonalar-update/:id",
        name: "Xonalar-update",
        component: () => import("@/pages/Xonalar/Update.vue")
      },
      {
        path: "filiallar",
        name: "Filiallar",
        component: () => import("@/pages/Filiallar/Index.vue")
      },
      {
        path: "filiallar-create",
        name: "Filiallar-create",
        component: () => import("@/pages/Filiallar/Create.vue")
      },
      {
        path: "filiallar-update/:id",
        name: "Filiallar-update",
        component: () => import("@/pages/Filiallar/Update.vue")
      },

      {
        path: "tekshiruv-bolimlari",
        name: "TekshiruvBolimlari",
        component: () => import("@/pages/TekshiruvBolimlari/Index.vue")
      },
      {
        path: "tekshiruv-bolimlari-create",
        name: "TekshiruvBolimlari-create",
        component: () => import("@/pages/TekshiruvBolimlari/Create.vue")
      },
      {
        path: "tekshiruv-bolimlari-update/:id",
        name: "TekshiruvBolimlari-update",
        component: () => import("@/pages/TekshiruvBolimlari/Update.vue")
      },
      {
        path: "tekshiruvlar",
        name: "Tekshiruvlar",
        component: () => import("@/pages/Tekshiruvlar/Index.vue")
      },
      {
        path: "tekshiruvlar-create",
        name: "Tekshiruvlar-create",
        component: () => import("@/pages/Tekshiruvlar/Create.vue")
      },
      {
        path: "tekshiruvlar-update/:id",
        name: "Tekshiruvlar-update",
        component: () => import("@/pages/Tekshiruvlar/Update.vue")
      },
      {
        path: "dorilar",
        name: "Dorilar",
        component: () => import("@/pages/Dorilar/Index.vue")
      },
      {
        path: "kassaa",
        name: "Kassa",
        component: () => import("@/pages/Kassa Order/Index.vue")
      },
      {
        path: "kassa-create",
        name: "KassaCreate",
        component: () => import("@/pages/Kassa Order/Create.vue")
      },
      {
        path: "kassa-update/:id",
        name: "Kassa-Update",
        component: () => import("@/pages/Kassa Order/Update.vue")
      },
      {
        path: "palata/bolim",
        name: "PalataBolim",
        component: () => import("@/pages/PalataBolimi/Index.vue")
      },
      {
        path: "palata/bolim/create",
        name: "PalataBolimCreate",
        component: () => import("@/pages/PalataBolimi/Create.vue")
      },
      {
        path: "palata/bolim/update/:id",
        name: "PalataBolimUpdate",
        component: () => import("@/pages/PalataBolimi/Update.vue")
      },
      {
        path: "palata/xona",
        name: "PalataXona",
        component: () => import("@/pages/PalataXona/Index.vue")
      },
      {
        path: "palata/xona/create",
        name: "PalataXonaCreate",
        component: () => import("@/pages/PalataXona/Create.vue")
      },
      {
        path: "palata/xona/update/:id",
        name: "PalataXonaUpdate",
        component: () => import("@/pages/PalataXona/Update.vue")
      },
      {
        path: "palata",
        name: "Palata",
        component: () => import("@/pages/Palata/Index.vue")
      },
      {
        path: "palata-create",
        name: "PalataCreate",
        component: () => import("@/pages/Palata/Create.vue")
      },
      {
        path: "palata-update/:id",
        name: "Palata-Update",
        component: () => import("@/pages/Palata/Update.vue")
      },
      {
        path: "dorilar-create",
        name: "Dorilar-create",
        component: () => import("@/pages/Dorilar/Create.vue")
      },
      {
        path: "dorilar-update/:id",
        name: "Dorilar-update",
        component: () => import("@/pages/Dorilar/Update.vue")
      },
      {
        path: "oylik",
        name: "Oylik",
        component: () => import("@/pages/HodimOylik/Index.vue")
      },
      {
        path: "oylik-create",
        name: "OylikCreate",
        component: () => import("@/pages/HodimOylik/Create.vue")
      },
      {
        path: "oylik-update/:id",
        name: "Oylik-Update",
        component: () => import("@/pages/HodimOylik/Update.vue")
      },
      {
        path: "tolovlar",
        name: "tolovlar",
        component: () => import("@/pages/tolovlar/index.vue")
      },
      // {
      //   path: "naprovitel",
      //   name: "Naprovitel",
      //   component: () => import("@/pages/Naprovitel/Index.vue")
      // },
      // {
      //   path: "naprovitel-create",
      //   name: "Naprovitel-create",
      //   component: () => import("@/pages/Naprovitel/Create.vue")
      // },
      // {
      //   path: "naprovitel-update/:id",
      //   name: "Naprovitel-update",
      //   component: () => import("@/pages/Naprovitel/Update.vue")
      // }
    ]
  },
  {
    path: "/registration/archive",
    name: "Registration Archive",
    component: () => import("@/pages/Arxiv/Kasalliktarixi.vue")
  },
  {
    path: "/provider/pay/create",
    name: "Provider Pay Create",
    component: () => import("@/pages/PastavshikTolov/Create.vue")
  },
  {
    path: "/provider/pay/update/:id",
    name: "Provider Pay Update",
    component: () => import("@/pages/PastavshikTolov/Update.vue")
  },
  {
    path: "/provider/pay/document/:id",
    name: "Provider Document",
    component: () => import("@/pages/PastavshikTolov/Document.vue")
  },
  {
    path: "/prixod-create",
    name: "Prixod Create",
    component: () => import("@/pages/Prixod/Create.vue")
  },
  {
    path: "/prixod-update/:id",
    name: "Prixod Update",
    component: () => import("@/pages/Prixod/Update.vue")
  },
  {
    path: "/prixod/document/:id",
    name: "Prixod Document",
    component: () => import("@/pages/Prixod/Document.vue")
  },
  {
    path: "/reagent/department/create",
    name: "Reagent Department Create",
    component: () => import("@/pages/ReagentBolimi/Update.vue")
  },
  {
    path: "/reagent/department/update/:id",
    name: "Reagent Department Update",
    component: () => import("@/pages/ReagentBolimi/Update.vue")
  },
  {
    path: "/patient-count",
    name: "PatientCount",
    component: () => import("@/pages/Sverka/Patient_count.vue")
  },
  {
    path: "/patient-count-palata",
    name: "PatientCountPalata",
    component: () => import("@/pages/Hisobot/PalataByDoctor.vue")
  },
  {
    path: "/doctor_sverka",
    name: "DoctorSverka",
    component: () => import("@/pages/Sverka/DoctorSverka.vue")
  },
  {
    path: "/kassa-sverka",
    name: "KassaSverka",
    component: () => import("@/pages/Sverka/KassaSverka.vue")
  },
  {
    path: "/koriklar",
    name: "Koriklar",
    component: () => import("@/pages/Sverka/Koriklar.vue")
  },
  {
    path: "/direct_sverka",
    name: "DIrectSverka",
    component: () => import("@/pages/Sverka/DirectSverka.vue")
  },
  {
    path: "/shif/oper/son/sverka",
    name: "ShifOperSonSverka",
    component: () => import("@/pages/Sverka/OperShif.vue")
  },
  {
    path: "/provayder/sverka",
    name: "ProvayderSverka",
    component: () => import("@/pages/Sverka/PostavshikSverks.vue")
  },
  {
    path: "/Reagent/sverka",
    name: "ReagentSverka",
    component: () => import("@/pages/Sverka/ReagentSverka.vue")
  },
  {
    path: "/med/direct/sverka",
    name: "MedDIrectSverka",
    component: () => import("@/pages/Sverka/MedSverka.vue")
  },
  {
    path: "/inspection_sverka",
    name: "InspectionSverka",
    component: () => import("@/pages/Sverka/inspectionSverka.vue")
  },
  {
    path: "/tekshiruvchi_sverka",
    name: "TekshiruvchiSverka",
    component: () => import("@/pages/Sverka/Tekshiruvchi.vue")
  },
  {
    path: "/keldi/ketdi",
    name: "KeldiKetdi",
    component: () => import("@/pages/Hisobot/KeldiKetdi.vue")
  },
  {
    path: "/surgery/sverka",
    name: "SurgerySverka",
    component: () => import("@/pages/Sverka/Operatsiya.vue")
  },
  {
    path: "/surgery/qoshimcha/sverka",
    name: "SurgeryQoshimchaSverka",
    component: () => import("@/pages/Sverka/OperatsiyaQoshimcha.vue")
  },
  {
    path: "/statsionar/sverka",
    name: "StatsionarSverka",
    component: () => import("@/pages/Sverka/Statsionar.vue")
  },
  {
    path: "/statsionar/hisobot",
    name: "StatsionarHisobot",
    component: () => import("@/pages/Hisobot/Statsionar.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/pages/Login.vue")
  },
  {
    path: "/arxivone/:id",
    name: "ArxivOne",
    component: () => import("@/pages/Arxiv/From.vue")
  },
  {
    path: "/user-create",
    name: "Create",
    component: () => import("@/pages/User/Create.vue")
    // meta: {
    //   requireAdmin: true,
    // }
  },
  {
    path: "/user-update/:id",
    name: "Update",
    component: () => import("@/pages/User/Update.vue")
  },
  {
    path: "/user-chek/:id",
    name: "User Profile Chek",
    component: () => import("@/pages/User/Chek.vue")
  },
  {
    path: "/user-navbat-chek/:id",
    name: "NavbatChek",
    component: () => import("@/pages/User/NavbatChek.vue")
  },
  {
    path: "/user-bayonot",
    name: "User Profile Bayonot",
    component: () => import("@/pages/User/Bayonot.vue")
  },
  {
    path: "/user-retsept",
    name: "User Profile Retsept",
    component: () => import("@/pages/User/Retsept.vue")
  },
  {
    path: "/user-statsionar",
    name: "User Profile Statsionar",
    component: () => import("@/pages/User/StatsionarPechat.vue")
  },
  {
    path: "/user/operatsiya",
    name: "User Operatsiya",
    component: () => import("@/pages/User/OperatsiyaChek.vue")
  },
  // {
  //   path: "/user/navbatchek",
  //   name: "User Navbat Chek",
  //   component: () => import("@/pages/User/NavbatChek.vue")
  // },
  {
    path: "/royhat",
    name: "Royhatlar",
    component: () => import("@/pages/NavbatlarRoyhati/Dashboard.vue")
  },
  {
    path: "/user-tekshiruv",
    name: "UserTekshiruvlar",
    component: () => import("@/pages/User/Tekshiruv.vue")
  },
  {
    path: "/user-tekshiruv-shablon",
    name: "UserTekshiruvlarShablon",
    component: () => import("@/pages/User/TekshiruvShablonli.vue")
  },
  {
    path: "/hodim-hisobot",
    name: "HodimHisobot",
    component: () => import("@/pages/Hisobot/Hodim.vue")
  },
  {
    path: "/hodim_sverka",
    name: "HodimSverka",
    component: () => import("@/pages/Sverka/HodimSverka.vue")
  },
  {
    path: "*",
    name: "404",
    component: () => import("@/pages/404.vue")
  }
];
// router.beforeEach((to, from, next) => {
//   const publicPages = ['/login']
//   const authRequired = !publicPages.includes(to.path)
//   const loggedIn = localStorage.getItem('token')
//   const role = localStorage.getItem('user').role;
//   // trying to access a restricted page + not logged in
//   // redirect to login page
//   if (authRequired && !loggedIn) {
//     next('/login')
//   } else {
//     if(role == 'Shifokor' && to.meta.requireAdmin) {
//       next('/login');
//     } else {
//       next();
//     }
//   }
// })

export default routes;
