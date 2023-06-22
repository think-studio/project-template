import { organizationListApi } from '/@/api/system/organization'
import { getRoleListApi } from '/@/api/system/role'
import { FormSchema } from '/@/components/Form/src/types/form'
import { BasicColumn } from '/@/components/Table/src/types/table'

export const columns: BasicColumn[] = [
  {
    label: '账号',
    prop: 'account',
    align: 'center',
    minWidth: 120
  },
  {
    label: '所属组织',
    prop: 'organizationName',
    minWidth: 120
  },
  {
    label: '用户名',
    prop: 'username',
    minWidth: 120
  },
  {
    label: '昵称',
    prop: 'nickName',
    minWidth: 120
  },
  {
    label: '手机号',
    prop: 'mobile',
    minWidth: 120
  },
  {
    label: '角色',
    prop: 'roleName',
    minWidth: 120
  },
  {
    label: "状态",
    prop: "status",
    customRender: ({ text, record, index }) => {
      return h(
        ElTag,
        {
          type: ['success', 'danger'][record.status]
        },
        () => ['启用', '停用'][record.status]!
      );
    },
    align: 'center',
    width: 110,
  },
  {
    label: '创建时间',
    prop: 'gmtCreated',
    minWidth: 120
  }
]

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
  {
    field: 'mobileLike',
    label: '手机号',
    component: 'Input',
    colProps: {
      span: 8,
    },
  },
  {
    field: 'status',
    label: '状态',
    component: 'Select',
    valueType: 'number',
    componentProps: {
      options: [{
        label: '启用',
        value: 0,
      }, {
        label: '停用',
        value: 1
      }]
    },
    colProps: {
      span: 8,
    },
  },
]

export const formSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'id',
    component: 'Input',
    show: false
  },
  {
    label: '账号',
    field: 'account',
    component: 'Input',
    required: true,
    componentProps: ({ formModel }) => {
      return {
        readonly: Boolean(formModel.id)
      }
    },
    colProps: {
      span: 12,
    },
  },
  {
    label: '用户名',
    field: 'username',
    component: 'Input',
    required: true,
    colProps: {
      span: 12,
    },
  },
  {
    label: '昵称',
    field: 'nickName',
    component: 'Input',
    required: true,
    colProps: {
      span: 12,
    },
  },
  {
    label: '手机号',
    field: 'mobile',
    component: 'Input',
    componentProps: ({ formModel }) => {
      return {
        maxLength: 11,
        readonly: Boolean(formModel.id),
        formatter: (v: string) => {
          return v.replace(/[^\d]/g, '')
        }
      }
    },
    required: true,
    colProps: {
      span: 12,
    },
  },
  {
    label: '登录密码',
    field: 'password',
    component: 'Input',
    required: true,
    ifShow({ model }) {
      return !model.id;
    },
    colProps: {
      span: 12,
    },
  },
  {
    label: '角色权限',
    field: 'roleId',
    component: 'Select',
    slot: 'roleId',
    required: true,
    colProps: {
      span: 12,
    },
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
      multiple: false
    },
    required: true,
    colProps: {
      span: 12,
    },
  }
]
