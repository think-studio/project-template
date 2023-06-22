import { MenuModel } from "../sys/model/userModel";
import { ContentTypeEnum } from "/@/enums/httpEnum";
import { defHttp } from "/@/utils/http/axios";

export const getMenuListApi = (params?: Recordable) => {
    return defHttp.post<MenuModel[]>({
        url: '/admin/menu/top_list',
        data: params,
    });
};

export const addMenuApi = (params?: Recordable) => {
    return defHttp.post<MenuModel[]>({
        url: '/admin/menu/insert',
        data: params,
    }, {
        errorMessageMode: 'modal'
    });
}

export const updateMenuApi = (params?: Recordable) => {
    return defHttp.post<MenuModel[]>({
        url: '/admin/menu/update',
        data: params,
    }, {
        errorMessageMode: 'modal'
    });
}

export const deleteMenuApi = (id: string) => {
    return defHttp.post({
        url: '/admin/menu/delete',
        params: {
            id
        },
        headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    }, {
        errorMessageMode: 'modal'
    })
}