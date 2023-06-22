
import { defHttp } from '/@/utils/http/axios';
import { ContentTypeEnum } from '/@/enums/httpEnum';
import { OrganizationModel } from './model/organizationModel';

// 列表
export const organizationPageListApi = (params: Recordable) => {
    return defHttp.post<OrganizationModel>({
        url: '/organization/page',
        data: params,
    });
};

// 新增
export const addOrganizationApi = (params: Recordable) => {
    return defHttp.post<boolean>({
        url: '/organization/insert',
        data: params,
    });
};

// 编辑
export const updateOrganizationApi = (params: Recordable) => {
    return defHttp.post<boolean>({
        url: '/organization/update',
        data: params,
    });
};

// 删除
export const deleteOrganizationByIdApi = (id: string) => {
    return defHttp.post<boolean>({
        url: '',
        params: { id },
        headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    });
};

// 详情
export const organizationDetailApi = () => {
    return defHttp.post<OrganizationModel>({
        url: '/organization/info',
    });
};

export const organizationListApi = (params: Recordable) => {
    return defHttp.post<OrganizationModel>({
        url: '/organization/list',
        data: params,
    }, {
        errorMessageMode: 'message',
    });
};

// 修改账单日
export const updateBillDayApi = (billDay: number) => {
    return defHttp.post<boolean>({
        url: '/organization/updateBillDay',
        params: { billDay },
        headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    });
};

export const sendBillApi = (isSend: 'y' | 'n') => {
    return defHttp.post<boolean>({
        url: '/organization/isSend',
        params: { isSend },
        headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    });
};
