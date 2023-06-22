import { ElTag } from "element-plus";
import { BasicColumn, FormSchema } from "/@/components/Table";

export const columns: BasicColumn[] = [
    {
        label: "字典名称",
        prop: "dictName",
    },
    {
        label: "字典类型",
        prop: "dictType",
        slots: "dictType"
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
        label: "备注",
        prop: "remark",
    },
];
export const searchFormSchema: FormSchema[] = [
    {
        field: "dictNameLike",
        label: "字典类型",
        component: "Input",
        colProps: {
            span: 8,
        },
    },
];
export const formSchema: FormSchema[] = [
    {
        field: "id",
        label: "Id",
        component: "Input",
        show: false,
    },
    {
        field: "dictName",
        label: "字典名称",
        component: "Input",
        required: true,
    },
    {
        field: "dictType",
        label: "字典类型",
        component: "Input",
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
        component: "Input",
        componentProps: {
            type: "textarea",
        },
    },
];
