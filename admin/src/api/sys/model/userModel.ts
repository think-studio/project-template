import { RouteMeta } from 'vue-router'
import { Component } from '/@/router/types'

export interface MetaModel {
  currentActiveMenu?: string
  hideMenu: boolean
  hideTab: boolean
  title: string
  single: boolean;
}

export interface MenuModel {
  id: string
  path: string
  component: Component
  currentActiveMenu: string;
  meta: MetaModel
  name: string
  redirect: string
  children: MenuModel[]
  hideMenu: 'y' | 'n'
  hideTab: 'y' | 'n'
  icon: string
  title: string
  type: number
}

export interface PermissionModel {
  permission: string
}

export interface LoginResultModel {
  token: string;
}

export interface UserInfoModel {
  id: string;
  mobile: string;
  avatarKey: string;
  menus: MenuModel[];
  permissionList: PermissionModel[];
  username: string;
  nickName: string;
  roleName: string;
  isSuperAdmin: number;
}
interface StoreResp {
  id: string;
  companyName: string;
}