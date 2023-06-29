import Taro from "@tarojs/taro";
import qs from 'qs';
import { RouteName, routes } from ".";

function joinParams(name, params?: Recordable) {
    let url = routes[name];
    if (params) {
        url = `${url}?${qs.stringify(params)}`;
    }
    return url
}

class Router {
    // 跳转到下一级
    static pushName(name: RouteName, params?: Recordable) {
        const url = joinParams(name, params)
        Taro.navigateTo({
            url,
        })
    }
    // 替换当前页面
    static redirectName(name: RouteName, params?: Recordable) {
        const url = joinParams(name, params)
        Taro.redirectTo({
            url
        })
    }
    // 返回
    static back() {
        Taro.navigateBack();
    }
    // 获取当前页面的参数
    static get params() {
        return Taro.getCurrentInstance().router?.params
    }
}

export default Router