<template>
  <div class="default-main">
    <div class="person-data">
      <BasicUpload
        v-model="avatarKey"
        class="avatar-uploader"
        :limit="1"
        folderName="iot/avatar"
        accept="image/gif, image/jpg, image/jpeg, image/bmp, image/png, image/webp"
      >
      </BasicUpload>
      <div>
        <BasicForm @register="registerForm" @submit="handleSubmit" />
      </div>
    </div>
    <div class="login-log">
      <el-card header="登录日志" shadow="never">
        <el-timeline>
          <el-timeline-item
            v-for="item in loginLogList"
            size="large"
            :timestamp="`${item.gmtCreated}-${item.os}`"
          >
            {{ item.msg }}
          </el-timeline-item>
        </el-timeline>
        <el-pagination
          :currentPage="paginationState.currentPage"
          :page-size="paginationState.pageSize"
          background
          layout="prev, next, jumper"
          :total="paginationState.total"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts" name="PersonData">
import { BasicForm, useForm } from "/@/components/Form";
import { BasicUpload } from "/@/components/Upload";
import { useUserStore } from "/@/store/modules/user";
import { getUserLoginLogApi, resetPasswordApi } from "/@/api/sys/user";
import { updateAccountApi } from "/@/api/system/account";
import { valid } from "/@/utils/validate";

const userStore = useUserStore();

const loginLogList = ref<any[]>([]);
const avatarKey = ref("");
const paginationState = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0,
});
const [registerForm, { setFieldsValue }] = useForm({
  showResetButton: false,
  schemas: [
    {
      field: "id",
      label: "id",
      component: "Input",
      show: false,
    },
    {
      label: "账号",
      field: "username",
      component: "Input",
      componentProps: {
        disabled: true,
      },
    },
    {
      label: "昵称",
      field: "nickName",
      component: "Input",
      required: true,
    },
    {
      label: "手机号",
      field: "mobile",
      component: "Input",
      rules: [
        {
          validator: valid.phone,
        },
      ],
    },
    {
      label: "新密码",
      field: "password",
      component: "Input",
      componentProps: {
        placeholder: "不修改请留空",
      },
    },
  ],
});

function getLogingLog() {
  getUserLoginLogApi({
    userNameLike: userStore.getUserInfo?.username,
    pageIndex: paginationState.currentPage,
    pageSize: paginationState.pageSize,
  }).then((res) => {
    loginLogList.value = res.data;
    paginationState.total = parseInt(res.count!);
  });
}

function handleCurrentChange(page: number) {
  paginationState.currentPage = page;
  getLogingLog();
}

function handleSubmit(values: any) {
  values.avatarKey = unref(avatarKey);
  if (values.password) {
    // 重置密码
    resetPasswordApi({
      account: userStore.getUserInfo?.username,
      password: values.password,
    }).then((res) => {
      ElMessage.success("修改密码成功");
    });
  }
  Reflect.deleteProperty(values, "password");
  updateAccountApi(values).then((res) => {
    if (res.data) {
      userStore.setUserInfo();
    }
  });
}

onMounted(() => {
  const userInfo = userStore.getUserInfo;
  if (userInfo) {
    const { id, nickName, username, avatarKey: avatar, mobile } = userInfo;
    avatarKey.value = avatar;
    setFieldsValue({
      id,
      nickName,
      mobile,
      username,
    });
  }
  getLogingLog();
});
</script>

<style scoped lang="scss">
.default-main {
  display: flex;
}
.person-data {
  flex: 1;
  background-color: var(--ba-bg-color-overlay);
  border-radius: var(--el-border-radius-base);
  border-top: 3px solid #409eff;
  padding: 20px;
  background: white;
  margin-right: 40px;
  .avatar-uploader {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    margin: 60px auto 10px auto;
    border-radius: 50%;
    box-shadow: var(--el-box-shadow-light);
    border: 1px dashed var(--el-border-color);
    cursor: pointer;
    overflow: hidden;
    width: 110px;
    height: 110px;
  }
  .avatar-uploader:hover {
    border-color: var(--el-color-primary);
  }
  .avatar {
    width: 110px;
    height: 110px;
    display: block;
  }
  .image-slot {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
}
.login-log {
  flex: 1;
}
</style>
