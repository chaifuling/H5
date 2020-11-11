import Me from "@/components/miue";

export default [
  {
    path: "/",
    name: "home",
    component: resolve => require(["@/view/home/index.vue"], resolve)
  },
  {
    path: "/activity",
    component: Me,
    children: [
      {
        path: "callsEntries",
        name: "callsEntries",
        component: resolve =>
          require(["@/view/activity/callsEntries.vue"], resolve)
      },
      {
        path: "liveNotice",
        name: "liveNotice",
        component: resolve =>
          require(["@/view/activity/liveNotice.vue"], resolve)
      },
      {
        path: "topicspk",
        name: "topicspk",
        component: resolve =>
          require(["@/view/activity/topicspk.vue"], resolve)
      },
      {
        path: "offlineActivity",
        name: "offlineActivity",
        component: resolve =>
          require(["@/view/activity/offlineActivity.vue"], resolve)
      },
      {
        path: "form",
        name: "form",
        component: resolve =>
          require(["@/view/activity/form.vue"], resolve)
      }, //adress
      {
        path: "adress",
        name: "adress",
        component: resolve =>
          require(["@/view/activity/adress.vue"], resolve)
      }, //adress
      {
        path: "sharePage",
        name: "sharePage",
        component: resolve =>
          require(["@/view/activity/sharePage.vue"], resolve)
      }, //adress
    ]
  }
];