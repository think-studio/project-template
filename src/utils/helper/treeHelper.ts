export function treeMap<T = any>(treeData: T[], opt: { children?: string; conversion: Fn }): any[] {
    return treeData.map((item) => treeMapEach(item, opt));
}

/**
 * @description: Extract tree specified structure
 */
export function treeMapEach(
    data: any,
    { children = 'children', conversion }: { children?: string; conversion: Fn },
) {
    const haveChildren = Array.isArray(data[children]) && data[children].length > 0;
    const conversionData = conversion(data) || {};
    if (haveChildren) {
        return {
            ...conversionData,
            [children]: data[children].map((i: number) =>
                treeMapEach(i, {
                    children,
                    conversion,
                }),
            ),
        };
    } else {
        return {
            ...conversionData,
        };
    }
}