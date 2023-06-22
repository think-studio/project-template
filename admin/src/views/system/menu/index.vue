<template>
  <div>
    <BasicTable @register="registerTable" @action-add="handleOpenModal">
      <template #action="scope">
        <TableAction :actions="createActions(scope)"></TableAction>
      </template>
    </BasicTable>
    <MenuModal @register="registerModal" @success="reload" />
  </div>
</template>

<script lang="ts" setup name="SystemMenu">
import { deleteMenuApi, getMenuListApi } from "/@/api/system/menu";
import { BasicTable, useTable, TableAction } from "/@/components/Table";
import { useModal } from "/@/components/Modal";
import MenuModal from "./modal.vue";
import { ElMessage, ElTag } from "element-plus";
import { ActionItem } from "/@/components/Table/src/types/tableAction";
import { MenuModel } from "/@/api/sys/model/userModel";
import { Icon } from "/@/components/Icon";
import { ResultEnum } from "/@/enums/httpEnum";
import { MenuType } from "./menu.data";

let menuTypes = {
  [MenuType.Dir]: {
    text: "目录",
    type: "success",
  },
  [MenuType.Menu]: {
    text: "菜单",
    type: "danger",
  },
  [MenuType.Button]: {
    text: "按钮",
    type: "info",
  },
};

const [registerTable, { reload }] = useTable({
  api: getMenuListApi,
  headerConfig: {
    useSearchForm: false,
    useQuickSearch: false,
    showBatchDeleteBtn: false,
  },
  pagination: false,
  showSelection: false,
  showIndex: false,
  columns: [
    {
      label: "菜单名称",
      prop: "title",
    },
    {
      label: "路由名称",
      prop: "name",
    },
    {
      label: "图标",
      prop: "icon",
      align: "center",
      customRender: ({ text }) => {
        if (text) {
          return h(Icon, {
            name: text,
          });
        } else {
        }
      },
      width: 60,
    },
    {
      label: "类型",
      prop: "type",
      align: "center",
      customRender: ({ text, record, index }) => {
        const current = menuTypes[text as "0" | "1" | "2"];
        return h(
          ElTag,
          {
            type: current.type as "",
          },
          () => current.text
        );
      },
    },
    {
      label: "权限标识",
      prop: "permission",
    },
    {
      label: "排序",
      align: "center",
      prop: "orderNo",
    },
  ],
  actionColumn: {
    width: 140,
    label: "操作",
    align: "center",
    prop: "action",
    slots: "action",
    fixed: "right",
  },
});

function handleEdit(value: MenuModel) {
  openModal(true, {
    isUpdate: true,
    value,
  });
}

async function handleDelete(id: string) {
  return deleteMenuApi(id).then((res) => {
    ElMessage.success("删除成功");
    reload();
  });
}

function createActions({ record }: { record: MenuModel }): ActionItem[] {
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
        confirm: handleDelete.bind(null, unref(record).id),
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
