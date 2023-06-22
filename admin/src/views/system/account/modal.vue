<template>
  <BasicModal
    v-bind="$attrs"
    width="800px"
    @register="registerModal"
    :title="titleRef"
    @ok="handleSubmit"
    @cancel="resetFields"
  >
    <div class="ba-operate-form">
      <BasicForm @register="registerForm">
        <template #roleId="{ model }">
          <el-select v-model="model['roleId']" clearable filterable>
            <el-option-group
              v-for="group in roleGroupOptions"
              :key="group.label"
              :label="group.label"
            >
              <el-option
                v-for="item in group.options"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              ></el-option>
            </el-option-group>
          </el-select>
        </template>
      </BasicForm>
    </div>
  </BasicModal>
</template>

<script lang="ts" setup name="AccountModal">
import { useModalInner, BasicModal } from "/@/components/Modal";
import { BasicForm, useForm } from "/@/components/Form";
import { formSchema } from "./account.data";
import { addAccountApi, updateAccountApi } from "/@/api/system/account";
import { useUserStore } from "/@/store/modules/user";
import { getRoleListApi } from "/@/api/system/role";

const userStore = useUserStore();
const emit = defineEmits(["success", "register"]);

const titleRef = ref<string>("新增账号");
const isUpdateRef = ref<boolean>(false);
const roleGroupOptions = ref<any>([]);

const [registerForm, { clearValidate, validate, setFieldsValue, resetFields }] =
  useForm({
    showActionButtonGroup: false,
    labelWidth: 120,
    schemas: formSchema,
  });
const [registerModal, { changeOkLoading, closeModal }] = useModalInner(
  async (data) => {
    const { isUpdate, value } = unref(data);
    isUpdateRef.value = isUpdate;
    await clearValidate();
    titleRef.value = isUpdate ? "编辑账号" : "新增账号";
    if (isUpdate) {
      let fieldsValue: any = {};
      for (const item of formSchema) {
        fieldsValue[item.field] = unref(value)[item.field];
      }
      setFieldsValue(fieldsValue);
    } else {
      if (userStore.userInfo?.isSuperAdmin === 0) {
        setFieldsValue({
          orgId: userStore.orgInfo?.id,
        });
      }
    }
  }
);

function getRoleGroup() {
  getRoleListApi().then((res) => {
    let temp: any = {};
    for (const item of res.data) {
      if (temp[item.organizationName]) {
        temp[item.organizationName].push({
          label: item.name,
          value: item.id,
        });
      } else {
        temp[item.organizationName] = [
          {
            label: item.name,
            value: item.id,
          },
        ];
      }
    }
    roleGroupOptions.value = Object.keys(temp).map((item) => {
      return {
        label: item,
        options: temp[item],
      };
    });
  });
}
getRoleGroup();

async function handleSubmit() {
  try {
    let values = await validate();
    changeOkLoading(true);
    await (unref(isUpdateRef)
      ? updateAccountApi(values)
      : addAccountApi(values));
    emit("success");
    closeModal();
  } catch (error) {
  } finally {
    changeOkLoading(false);
  }
}
</script>
