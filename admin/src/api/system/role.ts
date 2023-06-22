import { RoleModel } from './model/role'
import { ContentTypeEnum } from '/@/enums/httpEnum'
import { defHttp } from '/@/utils/http/axios'

export const getRolePageApi = (params?: Recordable) => {
  return defHttp.post<RoleModel[]>({
    url: '/admin/role/page',
    data: params
  })
}

export const getRoleListApi = (params?: Recordable) => {
  return defHttp.post<RoleModel[]>({
    url: '/admin/role/list',
    data: params
  },
    {
      errorMessageMode: 'message',
    })
}

export const addRoleApi = (params?: Recordable) => {
  return defHttp.post<RoleModel>(
    {
      url: '/admin/role/insert',
      data: params
    },
    {
      errorMessageMode: 'modal'
    }
  )
}

// 
export const getRoleDetailApi = (id: string) => {
  return defHttp.post<RoleModel[]>({
    url: '/admin/role/detail?id=' + id,
    headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED }
  })
}

export const updateRoleApi = (params?: Recordable) => {
  return defHttp.post<RoleModel>(
    {
      url: '/admin/role/update',
      data: params
    },
    {
      errorMessageMode: 'modal'
    }
  )
}

export const deleteRoleApi = (params: string) => {
  return defHttp.post(
    {
      url: '/admin/role/delete?id=' + params,
      headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED }
    },
    {
      errorMessageMode: 'modal'
    }
  )
}
