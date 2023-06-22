import { cloneDeep } from "lodash-es";
import { AppRouteModule, AppRouteRecordRaw, BackMenuModel } from "../types";
import { treeMap } from "/@/utils/helper/treeHelper";

export function transformRouteToMenu(routeModList: AppRouteModule[]): BackMenuModel[] {
    const cloneRouteModList = cloneDeep(routeModList);
    const routeList: AppRouteRecordRaw[] = [];

    cloneRouteModList.forEach((item) => {
        if (item.meta?.single) {
            const realItem = item?.children?.[0];
            realItem && routeList.push(realItem);
        } else {
            routeList.push(item);
        }
    });
    const list: BackMenuModel[] = treeMap(routeList, {
        conversion: (node: AppRouteRecordRaw) => {
            const { hideMenu, name, path, meta: { title } = {}, icon } = node;
            return {
                icon,
                name: name,
                hideMenu: hideMenu === 'y',
                title,
                path,
            };
        }
    })
    joinParentPath(list)
    return cloneDeep(list)
}

function joinParentPath(menus: BackMenuModel[], parentPath = '') {
    for (let index = 0; index < menus.length; index++) {
        const menu = menus[index];

        if (!(menu.path.startsWith('/'))) {
            menu.path = `${parentPath}/${menu.path}`;
        }
        if (menu?.children?.length) {
            joinParentPath(menu.children, menu.path);
        }
    }
}