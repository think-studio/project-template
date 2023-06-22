import { UserInfoModel } from '/@/api/sys/model/userModel'
import { getUserInfoApi, loginApi, doLogout } from '/@/api/sys/user'
import { store } from '/@/store'
import { orgInfoLocalData, tokenLocalData } from '/@/utils/storage/local-data'
import { ElMessageBox } from 'element-plus'
import { router } from '/@/router'
import { useAppStore } from './app'

import { OrganizationModel } from '/@/api/system/model/organizationModel'
import { organizationDetailApi } from '/@/api/system/organization'

interface UserState {
  token?: string
  userInfo?: UserInfoModel
  permission?: string[]
  sessionTimeout?: boolean
  orgInfo?: OrganizationModel
}

export const useUserStore = defineStore('app-user', {
  state: (): UserState => ({
    token: undefined,
    userInfo: undefined,
    permission: undefined,
    sessionTimeout: false,
    orgInfo: undefined
  }),
  getters: {
    getToken(): Nullable<string> {
      return this.token || tokenLocalData.get()
    },
    getPermission(): Nullable<string[]> {
      return this.permission || []
    },
    getSessionTimeout(): boolean {
      return !!this.sessionTimeout
    },
    getUserInfo(): UserInfoModel | undefined {
      return this.userInfo
    },
    getOrgInfo(): OrganizationModel | undefined {
      return this.orgInfo
    }
  },
  actions: {
    setToken(token: string | undefined) {
      this.token = token
      tokenLocalData.set(token)
    },
    login(params: any) {
      return new Promise(async (resolve, reject) => {
        try {
          const { token } = await (await loginApi(params)).data
          this.setToken(token)
          resolve(token)
        } catch (error) {
          reject(error);
        }
      })
    },
    async setUserInfo() {
      const res = await getUserInfoApi()
      this.userInfo = res.data;
      this.setPermission()
      this.setOrgInfo();
      useAppStore().setDictData()
      return res.data
    },
    async setOrgInfo() {
      const res = await organizationDetailApi();
      this.orgInfo = res.data;
      orgInfoLocalData.set(this.orgInfo)
    },
    setPermission() {
      this.permission = this.userInfo?.permissionList?.map(item => item.permission)
    },
    /**
     * @description: logout
     */
    async logout(goLogin = false) {
      if (this.getToken) {
        try {
          await doLogout()
        } catch {
          console.log('注销Token失败')
        }
      }
      this.setToken(undefined)
      this.setSessionTimeout(false)
      goLogin && this.goLoginPage()
    },
    setSessionTimeout(flag: boolean) {
      this.sessionTimeout = flag
    },
    goLoginPage() {
      router.go(0)
    },
    /**
     * @description: Confirm before logging out
     */
    confirmLoginOut() {
      ElMessageBox.confirm('是否确认退出登录?', '温馨提醒', {
        // confirmButtonText: 'OK',
        // cancelButtonText: 'Cancel',
        type: 'warning'
      })
        .then(async () => {
          await this.logout(true)
        })
        .catch(() => { })
    }
  }
})

export function useUserStoreWithOut() {
  return useUserStore(store)
}
