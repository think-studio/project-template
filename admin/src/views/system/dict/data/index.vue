<template>
  <div>
    <BackNav />
    <BasicTable @register="registerTable" @action-add="handleAdd">
      <template #action="scope">
        <TableAction :actions="createActions(scope)" />
      </template>
    </BasicTable>
    <DataModal @register="registerModal" @reload="reload" />
  </div>
</template>
<script lang="ts" setup name="DictData">
import {
  BasicTable,
  useTable,
  TableAction,
  ActionItem,
} from "/@/components/Table";
import { dataPageListApi, deleteDataByIdApi } from "/@/api/system/dict/data";
import { useModal } from "/@/components/Modal";
import DataModal from "./modal.vue";
import { columns, searchFormSchema } from "./data.data";
import { hasPermission } from "/@/directives/permission";
import BackNav from "/@/components/BackNav/index.vue";

let typeId = ref("");

const { id } = useRoute().query;
typeId.value = id as string;

const [registerTable, { reload }] = useTable({
  api: dataPageListApi,
  columns,
  showSelection: false,
  searchInfo: {
    dictTypeId: unref(typeId),
  },
  headerConfig: {
    showBatchDeleteBtn: false,
    showAddBtn: hasPermission("dictData:btn:add"),
    quickSearchField: "dictLabelLike",
    quickSearchPlaceholder: "请输入字典标签查询",
  },
  formConfig: {
    labelWidth: 120,
    schemas: searchFormSchema,
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
    data: unref(typeId),
  });
}

function handleEdit(record: any) {
  openModal(true, {
    isUpdate: true,
    data: record,
  });
}

function handleDelete(record: any) {
  deleteDataByIdApi(record.id).then((res) => {
    reload();
  });
}
const createActions = ({ record }: any): ActionItem[] => [
  {
    tooltip: "编辑",
    type: "primary",
    icon: "fa fa-edit",
    auth: "dictData:btn:edit",
    onClick: handleEdit.bind(null, record),
  },
  {
    tooltip: "删除",
    icon: "fa fa-trash-o",
    auth: "dictData:btn:delete",
    type: "danger",
    popConfirm: {
      title: "是否确认删除",
      confirm: handleDelete.bind(null, record),
    },
  },
];
</script>
