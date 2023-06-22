<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="titleRef"
    @ok="handleSubmit"
    @cancel="resetFields"
  >
    <div class="ba-operate-form">
      <BasicForm @register="registerForm"></BasicForm>
    </div>
  </BasicModal>
</template>

<script lang="ts" setup name="MenuModal">
import { useModalInner, BasicModal } from "/@/components/Modal";
import { BasicForm, useForm } from "/@/components/Form";
import { formSchema } from "./menu.data";
import { addMenuApi, getMenuListApi, updateMenuApi } from "/@/api/system/menu";
import { ResultEnum } from "/@/enums/httpEnum";

const emit = defineEmits(["success", "register"]);

const titleRef = ref<string>("新增菜单");
const isUpdateRef = ref<boolean>(false);

const [
  registerForm,
  { updateSchema, clearValidate, validate, setFieldsValue, resetFields },
] = useForm({
  showActionButtonGroup: false,
  labelWidth: 120,
  schemas: formSchema,
});
const [registerModal, { changeOkLoading, closeModal }] = useModalInner(
  async (data) => {
    const { isUpdate, value } = unref(data);
    isUpdateRef.value = isUpdate;
    await clearValidate();
    titleRef.value = isUpdate ? "编辑菜单" : "新增菜单";
    if (isUpdate) {
      let fieldsValue: any = {};
      for (const item of formSchema) {
        fieldsValue[item.field] = unref(value)[item.field];
      }
      setFieldsValue(fieldsValue);
    }
    const treeData = (await getMenuListApi()).data;
    updateSchema({
      field: "parentId",
      componentProps: {
        data: treeData,
      },
    });
  }
);

async function handleSubmit() {
  try {
    const values = await validate();
    if (!values.component) {
      values.component = "LAYOUT";
    }
    changeOkLoading(true);
    await (unref(isUpdateRef) ? updateMenuApi(values) : addMenuApi(values));
    emit("success");
    closeModal();
  } catch (error) {
  } finally {
    changeOkLoading(false);
  }
}
</script>
