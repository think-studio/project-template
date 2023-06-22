<template>
  <div class="org">
    <div>
      <div class="title">组织logo</div>
      <div class="logo-upload">
        <BasicUpload
          v-model="avatarKey"
          class="avatar-uploader"
          :limit="1"
          accept=".jpg,.png"
          @success="handleSuccess"
        >
        </BasicUpload>
        <div class="tip">仅支持JPG、PNG格式照片</div>
        <div class="tip">图片尺寸为260 × 50效果更好哦</div>
      </div>
    </div>
    <div>
      <div class="title">组织信息</div>
      <div class="org-form">
        <el-form
          :model="formData"
          :rules="rules"
          :inline="true"
          labelWidth="110px"
          ref="formRef"
        >
          <el-form-item label="组织名称" prop="orgName">
            <el-input v-model="formData.orgName"></el-input>
          </el-form-item>
          <el-form-item label="默认围栏半径" prop="fenceRadius">
            <el-input v-model.number="formData.fenceRadius">
              <template #suffix>米</template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button :loading="loading" type="primary" @click="handleSubmit"
              >修改</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup name="OrgTab">
import { useUserStore } from "/@/store/modules/user";
import { updateOrganizationApi } from "/@/api/system/organization";
import { BasicUpload } from "/@/components/Upload";
import type { FormRules, FormInstance } from "element-plus";
import { valid } from "/@/utils/validate";

const formRef = ref<FormInstance>();
const avatarKey = ref("");
const loading = ref(false);

const rules = reactive<FormRules>({
  orgName: [
    {
      required: true,
      message: "组织名称不能为空",
      trigger: "blur",
    },
  ],
  fenceRadius: [
    {
      required: true,
      message: "默认围栏半径不能为空",
      trigger: "blur",
    },
    {
      validator: valid.numberSize(50, 5000),
    },
  ],
});

const formData = reactive({
  id: "",
  orgName: "",
  fenceRadius: 0,
});

const orgInfo = computed(() => {
  return useUserStore().orgInfo;
});

watch(
  () => orgInfo.value,
  (n) => {
    if (n) {
      avatarKey.value = n.logoKey;
      formData.orgName = n.orgName;
      formData.id = n.id;
      formData.fenceRadius = n.fenceRadius;
    }
  },
  {
    immediate: true,
  }
);

async function updateOrganization(params: Recordable) {
  try {
    await updateOrganizationApi(params);
    ElMessage.success("修改成功");
    useUserStore().setOrgInfo();
  } catch (error) {
    console.error(error);
  }
}

function handleSuccess() {
  updateOrganization({
    id: unref(orgInfo)?.id,
    logoKey: unref(avatarKey),
  });
}

function handleSubmit() {
  formRef.value?.validate(async (valid) => {
    if (valid) {
      loading.value = true;
      try {
        await updateOrganization(formData);
      } catch (error) {
        console.error(error);
      } finally {
        loading.value = false;
      }
    }
  });
}
</script>

<style scoped lang="scss">
.org {
  padding: 40px 0 40px 40px;
  .title {
    align-self: flex-start;
    font-weight: 700;
    font-size: 18px;
    line-height: 16px;
    color: rgba(0, 0, 0, 0.85);
  }
  .logo-upload {
    margin: 30px 0 40px;
  }
  .tip {
    font-size: 12px;
    color: rgb(161, 169, 190);
  }
  .org-form {
    display: flex;
    align-items: center;
    margin-top: 40px;
    align-self: flex-start;
    .label {
      font-weight: 400;
      font-size: 14px;
      line-height: 18px;
      color: rgba(0, 0, 0, 0.45);
      min-width: 94px;
    }
    .input {
      width: 250px;
    }
  }
}
</style>
