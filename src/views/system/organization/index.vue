<template>
  <div>
    <BasicTable @register="registerTable" @action-add="handleAdd">
      <template #action="scope">
        <TableAction :actions="createActions(scope)" />
      </template>
    </BasicTable>
    <OrganizationModal @register="registerModal" @reload="reload" />
  </div>
</template>
<script lang="ts" setup name="Organization">
import {
  BasicTable,
  useTable,
  TableAction,
  ActionItem,
} from "/@/components/Table";
import {
  organizationPageListApi,
  deleteOrganizationByIdApi,
} from "/@/api/system/organization";
import { useModal } from "/@/components/Modal";
import OrganizationModal from "./modal.vue";
import { columns, searchFormSchema } from "./organization.data";
import { hasPermission } from "/@/directives/permission";

const [registerTable, { reload }] = useTable({
  api: organizationPageListApi,
  columns,
  showSelection: false,
  headerConfig: {
    useSearchForm: false,
    quickSearchField: "orgNameLike",
    quickSearchPlaceholder: "请输入组织名称查询",
    showBatchDeleteBtn: false,
    showAddBtn: hasPermission("organization:btn:add"),
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
  });
}

function handleEdit(record: any) {
  openModal(true, {
    isUpdate: true,
    data: record,
  });
}

function handleDelete(record: any) {
  deleteOrganizationByIdApi(record.id).then((res) => {
    reload();
  });
}
const createActions = ({ record }: any): ActionItem[] => [
  {
    tooltip: "编辑",
    type: "primary",
    icon: "fa fa-edit",
    auth: "organization:btn:edit",
    onClick: handleEdit.bind(null, record),
  },
  {
    tooltip: "删除",
    icon: "fa fa-trash-o",
    auth: "organization:btn:delete",
    type: "danger",
    popConfirm: {
      title: "是否确认删除",
      confirm: handleDelete.bind(null, record),
    },
  },
];
</script>
