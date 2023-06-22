
import { BasicColumn, FormSchema } from '/@/components/Table';
import { valid } from '/@/utils/validate';

export const columns: BasicColumn[] = [
    {
        label: '组织名称',
        prop: 'orgName',
    },
    {
        label: '手机号',
        prop: 'mobile',
    },
    {
        label: '组织代码',
        prop: 'orgCode'
    },
    {
        label: '创建时间',
        prop: 'gmtCreated',
    },
];
export const searchFormSchema: FormSchema[] = [
    {
        field: '',
        label: '',
        component: 'Input',
        colProps: {
            span: 8,
        },
    },
];
export const formSchema: FormSchema[] = [
    {
        field: 'id',
        label: 'Id',
        component: 'Input',
        show: false,
    },
    {

        field: 'orgName',
        label: '组织名称',
        component: 'Input',
        required: true,
    },
    {
        field: 'mobile',
        label: '手机号',
        component: 'Input',
        required: true,
        rules: [
            {
                validator: valid.phone,
            },
            {
                required: true,
                message: '请输入手机号',
                trigger: 'blur'
            }
        ]
    },
    {
        field: 'id',
        label: '组织ID',
        component: 'Input',
        slot: 'id',
        required: true,
    },
    {
        field: 'fenceRadius',
        label: '围栏半径',
        component: 'Input',
        slot: 'fenceRadius',
        colProps: {
          span: 24
        },
        rules: [
          {
            required: true,
            message: '请输入围栏半径'
          },
          {
            validator: valid.numberSize(50, 5000)
          }
        ]
      },
    {
        field: 'tcoStoreId',
        label: 'TCO商户ID',
        component: 'Input',
        required: true,
    },
    {

        field: 'orgCode',
        label: '组织代码',
        component: 'Input',
        required: true,
    },
    {
        field: 'logoKey',
        label: 'Logo',
        component: 'Upload',
        componentProps: {
            accept: '.png,.jpg,.jpeg'
        },
        required: true
    },
];