import { DictDataModel } from "./dataModel";

export interface DictModel {
    id: string;
    dictName: string;
    dictType: string
    status: string;
    remark: string;
    dataList: DictDataModel[]
}