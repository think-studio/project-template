<template>
  <div>
    <BasicTable @register="registerTable" @action-add="handleAdd">
      <template #dictType="{ record }">
        <ElButton link type="primary" @click="handleGoDictDataPage(record.id)">
          {{ record.dictType }}</ElButton
        >
      </template>
      <template #action="scope">
        <TableAction :actions="createActions(scope)" />
      </template>
    </BasicTable>
    <DictModal @register="registerModal" @reload="reload" />
  </div>
</template>
<script lang="ts" setup name="DictType">
import {
  BasicTable,
  useTable,
  TableAction,
  ActionItem,
} from "/@/components/Table";
import { dictPageListApi, deleteDictByIdApi } from "/@/api/system/dict/dict";
import { useModal } from "/@/components/Modal";
import DictModal from "./modal.vue";
import { columns } from "./dict.data";
import router from "/@/router";

const [registerTable, { reload }] = useTable({
  api: dictPageListApi,
  columns,
  showSelection: false,
  headerConfig: {
    useSearchForm: false,
    quickSearchField: "dictNameLike",
    quickSearchPlaceholder: "请输入字典类型查询",
    showBatchDeleteBtn: false,
  },

  actionColumn: {
    width: 140,
    label: "操作",
    align: "center",
    prop: "action",
    slots: "action",
    fixed: "right",
  },
});

const [registerModal, { openModal }] = useModal();

function handleAdd() {
  openModal(true, {
    isUpdate: false,
  });
}

function handleEdit(record: any) {
  openModal(true, {
    isUpdate: true,
    data: record,
  });
}

function handleDelete(record: any) {
  deleteDictByIdApi(record.id).then((res) => {
    reload();
  });
}
const createActions = ({ record }: any): ActionItem[] => [
  {
    tooltip: "编辑",
    type: "primary",
    icon: "fa fa-edit",
    auth: "dict:btn:edit",
    onClick: handleEdit.bind(null, record),
  },
  {
    tooltip: "删除",
    icon: "fa fa-trash-o",
    auth: "dict:btn:delete",
    type: "danger",
    popConfirm: {
      title: "是否确认删除",
      confirm: handleDelete.bind(null, record),
    },
  },
];

function handleGoDictDataPage(id: string) {
  router.push({
    name: "DictData",
    query: {
      id,
    },
  });
}
</script>
