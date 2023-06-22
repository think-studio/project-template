
import { defHttp } from '/@/utils/http/axios';
import { ContentTypeEnum } from '/@/enums/httpEnum';
import { DictDataModel } from './model/dataModel';

// 列表
export const dataPageListApi = (params: Recordable) => {
    return defHttp.post<DictDataModel>({
        url: '/admin/dictData/page',
        data: params,
    });
};

// 新增
export const addDataApi = (params: Recordable) => {
    return defHttp.post<boolean>({
        url: '/admin/dictData/insert',
        data: params,
    });
};

// 编辑
export const updateDataApi = (params: Recordable) => {
    return defHttp.post<boolean>({
        url: '/admin/dictData/update',
        data: params,
    });
};

// 删除
export const deleteDataByIdApi = (id: string) => {
    return defHttp.post<boolean>({
        url: '/admin/dictData/del',
        params: { id },
        headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    });
};

// 详情
export const dataDetailByIdApi = (id: string) => {
    return defHttp.post<DictDataModel>({
        url: '/admin/dictData/detail',
        params: { id },
        headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    });
};