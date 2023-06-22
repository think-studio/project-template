
import { ElTag } from 'element-plus';
import { BasicColumn, FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
    {
        label: '字典标签',
        prop: 'dictLabel',
    },
    {
        label: '字典键值',
        prop: 'dictValue',
    },
    {
        label: '状态',
        prop: 'status',
        customRender: ({ record }) => {
            const status = record.status === 'y';
            const type = status ? 'success' : 'danger';
            const text = status ? '启用' : '不启用';
            return h(ElTag, { type: type }, () => text);
        },
    },
    {
        label: '备注',
        prop: 'remark',
    },
    {
        label: '创建时间',
        prop: 'gmtCreated',
    },
];
export const searchFormSchema: FormSchema[] = [
    {
        field: 'dictLabelLike',
        label: '标签名称',
        component: 'Input',
        colProps: { span: 8 },
    },
    {
        field: 'status',
        label: '状态',
        component: 'Select',
        componentProps: {
            options: [
                { label: '不启用', value: 'n' },
                { label: '启用', value: 'y' },
            ],
        },
        colProps: { span: 8 },
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
        field: 'dictTypeId',
        label: 'DictTypeId',
        component: 'Input',
        show: false,
    },
    {
        field: 'dictLabel',
        label: '字典标签',
        component: 'Input',
        required: true,
    },
    {
        field: 'dictValue',
        label: '字典键值',
        component: 'Input',
        required: true,
    },
    {
        field: 'dictSort',
        label: '字典排序',
        component: 'InputNumber',
        required: true,
    },
    {
        field: 'status',
        label: '状态',
        component: 'RadioButtonGroup',
        defaultValue: 'y',
        componentProps: {
            options: [
                { label: '启用', value: 'y' },
                { label: '不启用', value: 'n' },
            ],
        },
    },
    {
        field: 'remark',
        label: '备注',
        component: 'Input',
        componentProps: {
            type: "textarea",
        },
    },
];