import { ref } from 'vue'
import { FormSchema } from '/@/components/Form/src/types/form'
import { BasicColumn } from '/@/components/Table/src/types/table'
import type Node from 'element-plus/es/components/tree/src/model/node'
import { organizationListApi } from '/@/api/system/organization'

import { useUserStoreWithOut } from "/@/store/modules/user";

const userStore = useUserStoreWithOut();

const isSuperAdmin = userStore.userInfo?.isSuperAdmin === 1;

const isButton = (type: number) => type === 2

const dataSource = ref<any>([])
let defaultCheckedSource: any = []

export const setTreeData = (treeData: any, defaultCheckedData: any) => {
  dataSource.value = treeData
  defaultCheckedSource.splice(0, defaultCheckedSource.length, ...defaultCheckedData)
}

export const searchFormSchema: FormSchema[] = [
  {
    label: '所属组织',
    field: 'orgId',
    component: 'ApiSelect',
    componentProps: {
      api: organizationListApi,
      config: {
        label: "orgName",
        value: "id",
      },
    },
    colProps: {
      span: 8,
    },
  },
];

export const columns: BasicColumn[] = [
  {
    label: '角色名称',
    prop: 'name',
    align: 'center'
  },
  {
    label: '所属组织',
    prop: 'organizationName',
  },
  {
    label: '角色描述',
    prop: 'description'
  }
]

export const formSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'id',
    component: 'Input',
    show: false
  },
  {
    label: '角色名称',
    field: 'name',
    component: 'Input',
    required: true
  },
  {
    label: '角色描述',
    field: 'description',
    component: 'Input',
    required: true
  },
  {
    label: '所属组织',
    field: 'orgId',
    component: 'ApiSelect',
    componentProps: {
      api: organizationListApi,
      config: {
        label: "orgName",
        value: "id",
      },
    },
    required: true,
    colProps: {
      span: 12,
    },
    ifShow() {
      return isSuperAdmin
    },
  },
  {
    label: '菜单分配',
    field: 'roleMenus',
    component: 'Tree',
    componentProps: ({ formModel }) => {
      return {
        nodeKey: 'id',
        defaultCheckedKeys: defaultCheckedSource,
        defaultExpandAll: true,
        showCheckbox: true,
        checkStrictly: true,
        props: {
          label: 'title',
          class: (data: any, node: Node) => {
            if (node.isLeaf) return ''
            let addClass = true
            for (const key in node.childNodes) {
              if (!node.childNodes[key].isLeaf || !isButton(node.childNodes[key].data.type)) {
                addClass = false
              }
            }
            return addClass ? 'penultimate-node' : ''
          }
        },
        data: unref(dataSource),
        customEvent: [{
          fnName: 'onCheck',
          cb: (data: any, datas: any) => {
            formModel.menuIds = datas.checkedKeys
          }
        }]
      }
    }
  }
]
