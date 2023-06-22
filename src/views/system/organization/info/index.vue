<template>
  <div>
    <div>
      <el-tabs v-model="activeName">
        <el-tab-pane label="组织" name="org"> </el-tab-pane>
      </el-tabs>
    </div>
    <div class="tab-content">
      <keep-alive>
        <OrgTab></OrgTab>
      </keep-alive>
    </div>
  </div>
</template>

<script lang="ts" setup name="OrgInfo">
import OrgTab from "./components/org.vue";
const activeName = ref("org");
</script>

<style scoped lang="scss">
:deep(.el-tabs) {
  background: white;
  .el-tabs__header {
    margin: 0;
    padding: 0 8px;
    .el-tabs__nav-wrap::after {
      content: "";
      display: none;
    }
  }
}
.tab-content {
  margin-top: 20px;
  padding-left: 24px;
  background: white;
}
</style>
