
import { defHttp } from '/@/utils/http/axios';
import { ContentTypeEnum } from '/@/enums/httpEnum';
import { DictModel } from './model/dictModel';

// 列表
export const dictPageListApi = (params: Recordable) => {
    return defHttp.post<DictModel>({
        url: '/admin/dictType/page',
        data: params,
    });
};

// 新增
export const addDictApi = (params: Recordable) => {
    return defHttp.post<boolean>({
        url: '/admin/dictType/insert',
        data: params,
    });
};

// 编辑
export const updateDictApi = (params: Recordable) => {
    return defHttp.post<boolean>({
        url: '/admin/dictType/update',
        data: params,
    });
};

// 删除
export const deleteDictByIdApi = (id: string) => {
    return defHttp.post<boolean>({
        url: '/admin/dictType/del',
        params: { id },
        headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    });
};

// 详情
export const dictDetailByIdApi = (id: string) => {
    return defHttp.post<DictModel>({
        url: '/admin/dictType/detail',
        params: { id },
        headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    });
};

// 获取所有的字典值
export const getAllDicApi = () => {
    return defHttp.post<DictModel[]>({
        url: '/common/dictType/list',
    }, {
        errorMessageMode: 'message',
    });
};
