import { FormSchema } from "/@/components/Form/src/types/form";
export enum MenuType {
    Dir = 0,
    Menu = 1,
    Button = 2
}

const isDir = (type: number) => type === MenuType.Dir;
const isMenu = (type: number) => type === MenuType.Menu;
const isButton = (type: number) => type === MenuType.Button;

export const formSchema: FormSchema[] = [{
    field: 'id',
    label: 'id',
    component: 'Input',
    show: false
}, {
    field: 'type',
    label: '类型',
    component: 'RadioButtonGroup',
    defaultValue: MenuType.Dir,
    valueType: 'number',
    componentProps: {
        options: [
            { label: '目录', value: MenuType.Dir },
            { label: '菜单', value: MenuType.Menu },
            { label: '按钮', value: MenuType.Button },
        ],
    },
}, {
    label: '菜单名称',
    field: 'title',
    component: 'Input',
    required: true,
}, {
    label: '路由名称',
    field: 'name',
    component: 'Input',
    required: true,
    ifShow: ({ values }) => !isButton(values.type),
}, {
    field: 'permission',
    label: '权限标识',
    component: 'Input',
    ifShow: ({ values }) => isButton(values.type),
}, {
    label: '上级',
    field: 'parentId',
    component: 'TreeSelect',
    componentProps: {
        props: {
            label: 'title',
            children: 'children',
        },
        valueKey: "id",
        nodeKey: 'id',
        showCheckbox: true,
        checkStrictly: true,
    }
}, {
    label: '排序',
    field: 'orderNo',
    component: 'InputNumber',
    required: true,
    componentProps: {
        precision: 0
    }
}, {
    label: '图标',
    field: 'icon',
    component: 'IconSelector',
    ifShow: ({ values }) => !isButton(values.type),
}, {
    label: '是否外链',
    field: 'isFrame',
    component: 'RadioButtonGroup',
    defaultValue: false,
    componentProps: {
        options: [
            { label: '是', value: true },
            { label: '否', value: false },
        ],
    },
    ifShow: ({ values }) => isMenu(values.type),
}, {
    label: '路由地址',
    field: 'path',
    component: 'Input',
    componentProps: {
        placeholder: '一级路由以`/`开头（/admin），二级路由无需`/`（admin）'
    },
    required: true,
    ifShow: ({ values }) => !isButton(values.type),
}, {
    field: 'component',
    label: '组件路径',
    component: 'Input',
    componentProps: {
        placeholder: 'views下的文件路径， 如：system/menu/index'
    },
    ifShow: ({ values }) => isMenu(values.type),
}, {
    field: 'redirect',
    label: '重定向地址',
    component: 'Input',
    componentProps: {
        placeholder: '输入父级路由加子级路由（/system/menu）'
    },
    required: true,
    ifShow: ({ values }) => isDir(values.type),
}, {
    field: 'hideMenu',
    label: '状态',
    component: 'RadioButtonGroup',
    defaultValue: 'n',
    componentProps: {
        options: [
            { label: '显示', value: 'n' },
            { label: '隐藏', value: 'y' },
        ],
    },
    ifShow: ({ values }) => !isButton(values.type),
}, {
    field: 'hideTab',
    label: '标签页',
    component: 'RadioButtonGroup',
    defaultValue: 'n',
    componentProps: {
        options: [
            { label: '显示', value: 'n' },
            { label: '隐藏', value: 'y' },
        ],
    },
    ifShow: ({ values }) => isMenu(values.type),
}, {
    field: 'currentActiveMenu',
    label: '当前激活的菜单',
    component: 'Input',
    ifShow: ({ values }) => isMenu(values.type),
}]