<template>
  <div>
    <BasicTable @register="registerTable" @action-add="handleOpenModal">
      <template #action="scope">
        <TableAction :actions="createActions(scope)"></TableAction>
      </template>
    </BasicTable>
    <RoleModal @register="registerModal" @success="reload" />
  </div>
</template>

<script lang="ts" setup name="SystemRole">
import {
  deleteRoleApi,
  getRoleDetailApi,
  getRolePageApi,
} from "/@/api/system/role";
import { BasicTable, useTable, TableAction } from "/@/components/Table";
import { useModal } from "/@/components/Modal";
import { columns, searchFormSchema } from "./role.data";
import RoleModal from "./modal.vue";
import { ElMessage } from "element-plus";
import { ActionItem } from "/@/components/Table/src/types/tableAction";
import { RoleModel } from "/@/api/system/model/role";
import { useUserStore } from "/@/store/modules/user";

const userStore = useUserStore();

const isSuperAdmin = userStore.userInfo?.isSuperAdmin === 1;

const [registerTable, { reload }] = useTable({
  api: getRolePageApi,
  showSelection: false,
  headerConfig: {
    useSearchForm: isSuperAdmin,
    quickSearchPlaceholder: "请输入角色名查询",
    quickSearchField: "nameLike",
    showBatchDeleteBtn: false,
  },
  formConfig: {
    labelWidth: 120,
    schemas: searchFormSchema,
  },
  columns,
  actionColumn: {
    width: 140,
    label: "操作",
    align: "center",
    prop: "action",
    slots: "action",
    fixed: "right",
  },
});

function createActions({ record }: { record: RoleModel }): ActionItem[] {
  return [
    {
      tooltip: "编辑",
      type: "primary",
      icon: "fa fa-edit",
      onClick: handleEdit.bind(null, toRaw(record)),
    },
    {
      tooltip: "删除",
      type: "danger",
      icon: "fa fa-trash-o",
      popConfirm: {
        title: "是否删除？",
        confirm: handleDelete.bind(null, record.id),
      },
    },
  ];
}

const [registerModal, { openModal }] = useModal();

function handleOpenModal() {
  openModal(true, {
    isUpdate: false,
  });
}

function handleEdit(value: RoleModel) {
  return getRoleDetailApi(value.id).then((res) => {
    openModal(true, {
      isUpdate: true,
      value: res.data,
    });
  });
}

function handleDelete(id: string) {
  return deleteRoleApi(id).then((res) => {
    ElMessage.success("删除成功");
    reload();
  });
}
</script>
