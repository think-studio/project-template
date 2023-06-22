<template>
  <div class="layout-logo">
    <img class="logo-img" :src="userStore.getOrgInfo?.logoUrl" alt="logo" />
  </div>
</template>

<script setup lang="ts" name="OrgLogo">
import { useUserStore } from "/@/store/modules/user";

const userStore = useUserStore();
</script>

<style scoped lang="scss">
.layout-logo {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 10px;
  background: #fff;

  .logo-img {
    height: 36px;
  }
}
</style>
