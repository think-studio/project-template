<template>
  <div>
    <BasicTable @register="registerTable" @action-add="handleOpenModal">
      <template #action="scope">
        <TableAction :actions="createActions(scope)"></TableAction>
      </template>
    </BasicTable>
    <AccountModal @register="registerModal" @success="reload" />
  </div>
</template>

<script lang="ts" setup name="SystemAccount">
import {
  getAccountPageApi,
  updateAccountApi,
  getAccountInfoApi,
} from "/@/api/system/account";
import { BasicTable, useTable, TableAction } from "/@/components/Table";
import { useModal } from "/@/components/Modal";
import { columns, searchFormSchema } from "./account.data";
import AccountModal from "./modal.vue";
import { ActionItem } from "/@/components/Table/src/types/tableAction";
import { AccountInfoModel } from "/@/api/system/model/account";

const [registerTable, { reload }] = useTable({
  api: getAccountPageApi,
  showSelection: false,
  formConfig: {
    labelWidth: 120,
    schemas: searchFormSchema,
  },
  headerConfig: {
    quickSearchPlaceholder: "请输入用户名查询",
    quickSearchField: "usernameLike",
    showBatchDeleteBtn: false,
  },
  pagination: true,
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

function handleEdit(value: AccountInfoModel) {
  return getAccountInfoApi(value.id).then((res) => {
    openModal(true, {
      isUpdate: true,
      value: res.data,
    });
  });
}

function handleDisableOrEnable(record: AccountInfoModel) {
  updateAccountApi({
    id: record.id,
    status: record.status === 0 ? 1 : 0,
  }).then((res) => {
    ElMessage.success("停用成功");
    reload();
  });
}

function createActions({ record }: { record: AccountInfoModel }): ActionItem[] {
  const isEnable = record.status === 0;
  return [
    {
      tooltip: "编辑",
      type: "primary",
      auth: "account:btn:edit",
      onClick: handleEdit.bind(null, toRaw(record)),
    },
    {
      tooltip: isEnable ? "停用" : "启用",
      type: isEnable ? "danger" : "success",
      auth: "account:btn:enableOrDisable",
      popConfirm: {
        title: `是否${isEnable ? "停用" : "启用"}改账号？`,
        confirm: handleDisableOrEnable.bind(null, record),
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
</script>
