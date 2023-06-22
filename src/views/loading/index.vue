<template>
  <div>
    <div class="default-main ba-main-loading"></div>
  </div>
</template>

<script lang="ts" setup name="Loading">
import { loading } from "/@/utils/loading";

import { useUserStore } from "/@/store/modules/user";
import router from "/@/router/index";
import {
  transformObjToRoute,
  flatMultiLevelRoutes,
} from "/@/router/helper/routeHelper";
import { useNavTabStroe } from "/@/store/modules/navTabs";
import { BackMenuModel } from "/@/router/types";
import { transformRouteToMenu } from "/@/router/helper/menuHelper";
import { RouteRecordRaw, useRoute } from "vue-router";

const route = useRoute();

onMounted(() => {
  loading.show();
  if (!useUserStore().getToken) {
    router.push({ name: "Login" }).then(() => {
      loading.hide();
    });
  } else {
    useUserStore()
      .setUserInfo()
      .then((data) => {
        // 添加动态路由
        const { menus } = data;
        let routeList = transformObjToRoute(menus);
        routeList = flatMultiLevelRoutes(routeList);
        routeList.forEach((route) => {
          router.addRoute(route as RouteRecordRaw);
        });

        const backMenuList: BackMenuModel[] = transformRouteToMenu(routeList);
        useNavTabStroe().setBackMenuList(backMenuList);

        if (route.query && route.query.url) {
          router
            .push({
              path: route.query.url as string,
              query: JSON.parse(route.query.query as string),
            })
            .then(() => {
              loading.hide();
            });
          return;
        }
        router.push({ name: "Home" }).then(() => {
          loading.hide();
        });
      });
  }
});
</script>

<style scoped lang="scss">
.ba-main-loading {
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-footer {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
