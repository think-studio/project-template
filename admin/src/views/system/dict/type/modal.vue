<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="getTitle"
    @ok="handleSubmit"
  >
    <div class="ba-operate-form">
      <BasicForm @register="registerForm" />
    </div>
  </BasicModal>
</template>
<script lang="ts" setup name="DictTypeModal">
import { BasicModal, useModalInner } from "/@/components/Modal";
import { BasicForm, useForm } from "/@/components/Form";
import { formSchema } from "./dict.data";
import { addDictApi, updateDictApi } from "/@/api/system/dict/dict";

const emit = defineEmits(["reload", "register"]);
const isUpdateRef = ref<boolean>(false);

const getTitle = computed(() => {
  return unref(isUpdateRef) ? "编辑" : "新增";
});

const [registerModal, { closeModal, changeOkLoading }] = useModalInner(
  async ({ isUpdate, data }) => {
    isUpdateRef.value = isUpdate;
    await resetFields();
    if (isUpdate) {
      let fieldsValue: Recordable = {};
      for (const item of formSchema) {
        fieldsValue[item.field] = data[item.field];
      }
      setFieldsValue(fieldsValue);
    }
  }
);

const [registerForm, { validate, setFieldsValue, resetFields }] = useForm({
  labelWidth: 120,
  schemas: formSchema,
  showActionButtonGroup: false,
});

async function handleSubmit() {
  try {
    const value = await validate();
    changeOkLoading(true);
    await (unref(isUpdateRef) ? updateDictApi(value) : addDictApi(value));
    emit("reload");
    closeModal();
  } catch (err) {
    console.error(err);
  } finally {
    changeOkLoading(false);
  }
}
</script>
