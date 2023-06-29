import Taro from "@tarojs/taro";
import qs from 'qs';
import { RouteName, routes } from ".";

class Router {
    static pushName(name: RouteName, params?: Recordable) {
        let url = routes[name];
        if (params) {
            url = `${url}?${qs.stringify(params)}`;
        }
        Taro.navigateTo({
            url: url,
        })
    }
    static back() {
        Taro.navigateBack();
    }
    static get params() {
        return Taro.getCurrentInstance().router?.params
    }
}

export default Router