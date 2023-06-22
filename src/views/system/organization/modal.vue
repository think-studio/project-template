<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="getTitle"
    @ok="handleSubmit"
  >
    <div class="ba-operate-form">
      <BasicForm @register="registerForm">
        <template #fenceRadius="{ model }">
          <el-input v-model.number="model.fenceRadius" placeholder="请输入">
            <template #suffix>米</template>
          </el-input>
        </template>
        <template #id="{ model }">
          <el-input v-model.number="model.id" :disabled="isUpdateRef" placeholder="请输入">
          </el-input>
        </template>
      </BasicForm>
    </div>
  </BasicModal>
</template>
<script lang="ts" setup name="OrganizationModal">
import { BasicModal, useModalInner } from "/@/components/Modal";
import { BasicForm, useForm } from "/@/components/Form";
import { formSchema } from "./organization.data";
import { useUserStore } from "/@/store/modules/user";
import {
  addOrganizationApi,
  updateOrganizationApi,
} from "/@/api/system/organization";
const orgInfo = computed(() => {
  return useUserStore().getOrgInfo;
});
const emit = defineEmits(["reload", "register"]);
const isUpdateRef = ref<boolean>(false);

const getTitle = computed(() => {
  return unref(isUpdateRef) ? "编辑" : "新增";
});

const [registerModal, { closeModal, changeOkLoading }] = useModalInner(
  async ({ isUpdate, data }) => {
    isUpdateRef.value = isUpdate;
    console.log(isUpdate);

    await resetFields();
    if (isUpdate) {
      let fieldsValue: Recordable = {};
      for (const item of formSchema) {
        fieldsValue[item.field] = data[item.field];
      }
      setFieldsValue(fieldsValue);
    }else{
      if (unref(orgInfo)) {
        setFieldsValue({
          fenceRadius: unref(orgInfo)?.fenceRadius,
        });
      }
    }
  }
);

const [registerForm, { validate, setFieldsValue, resetFields, updateSchema }] =
  useForm({
    labelWidth: 120,
    schemas: formSchema,
    showActionButtonGroup: false,
  });

async function handleSubmit() {
  try {
    const value = await validate();
    changeOkLoading(true);
    await (unref(isUpdateRef)
      ? updateOrganizationApi(value)
      : addOrganizationApi(value));
    emit("reload");
    closeModal();
  } catch (err) {
    console.error(err);
  } finally {
    changeOkLoading(false);
  }
}
</script>
