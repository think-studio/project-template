import { AccountInfoModel } from "./model/account";
import { ContentTypeEnum } from "/@/enums/httpEnum";
import { defHttp } from "/@/utils/http/axios";

export const getAccountPageApi = (params?: Recordable) => {
  return defHttp.post<AccountInfoModel[]>({
    url: "/admin/admin_user/page",
    data: params,
  });
};

export const addAccountApi = (params?: Recordable) => {
  return defHttp.post<AccountInfoModel[]>(
    {
      url: "/admin/admin_user/insert",
      data: params,
    },
    {
      errorMessageMode: "modal",
    }
  );
};

export const getAccountInfoApi = (id: string) => {
  return defHttp.post<AccountInfoModel>(
    {
      url: "/admin/admin_user/detail?id=" + id,
    },
    {
      errorMessageMode: "modal",
    }
  );
};

export const updateAccountApi = (params?: Recordable) => {
  return defHttp.post<AccountInfoModel[]>(
    {
      url: "/admin/admin_user/update",
      data: params,
    },
    {
      errorMessageMode: "modal",
    }
  );
};

export const deleteAccountApi = (id: string) => {
  return defHttp.post(
    {
      url: "/admin/admin_user/delete?id=" + id,
      headers: { "Content-Type": ContentTypeEnum.FORM_URLENCODED },
    },
    {
      errorMessageMode: "modal",
    }
  );
};
