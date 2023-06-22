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
import { formSchema, setTreeData } from "./role.data";
import { getMenuListApi } from "/@/api/system/menu";
import {
  addRoleApi,
  getRoleDetailApi,
  updateRoleApi,
} from "/@/api/system/role";
import { ResultEnum } from "/@/enums/httpEnum";

const emit = defineEmits(["success", "register"]);

const titleRef = ref<string>("新增角色");
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
    titleRef.value = isUpdate ? "编辑角色" : "新增角色";
    if (isUpdate) {
      let fieldsValue: any = {};
      for (const item of formSchema) {
        fieldsValue[item.field] = unref(value)[item.field];
      }
      setFieldsValue(fieldsValue);
    }
    const treeData = (await getMenuListApi()).data;
    setTreeData(
      treeData,
      isUpdate
        ? unref(value)["roleMenus"].map((item: any) => item.menuId) || []
        : []
    );
  }
);

async function handleSubmit() {
  try {
    const values = await validate();
    changeOkLoading(true);
    if (values.menuIds) {
      values.roleMenus = values.menuIds?.map((item: string) => {
        return {
          menuId: item,
        };
      });
    }
    Reflect.deleteProperty(values, "menuIds");
    const res = await (unref(isUpdateRef)
      ? updateRoleApi(values)
      : addRoleApi(values));
    if (res.code === ResultEnum.SUCCESS) {
      emit("success");
      closeModal();
    }
  } catch (error) {
    console.error(error);
  } finally {
    changeOkLoading(false);
  }
}
</script>

<style lang="scss" scoped>
:deep(.penultimate-node) {
  .el-tree-node__children {
    padding-left: 60px;
    white-space: pre-wrap;
    line-height: 12px;

    .el-tree-node {
      display: inline-block;
    }

    .el-tree-node__content {
      padding-left: 5px !important;
      padding-right: 5px;

      .el-tree-node__expand-icon {
        display: none;
      }
    }
  }
}
</style>
