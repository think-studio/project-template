import { LocalDataManager } from "./local-storage";
import { OrganizationModel } from "/@/api/system/model/organizationModel";

// token
export const tokenLocalData = new LocalDataManager<string>(
    "token",
    6 * 1000 * 3600 * 24
);

// 工作时间
export const workTimeLocalData = new LocalDataManager<{
    date: string,
    startTime: number,
    pauseTime: number,
    startPauseTime: number,
}>("workTime")

// 组织信息
export const orgInfoLocalData = new LocalDataManager<OrganizationModel>('orgInfo')