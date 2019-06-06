/**
 * @description 判断路由是否还有子项
 * @param {Object} item 每一项路由
 * @returns {Boolean}
 */
export const hasChild = (item) => {
    return item.children && item.children.length !== 0;
}

/**
 * @description 路由显示与否
 * @param {Object} item 
 * @returns {Boolean}
 */
// const showThisMenuEle = (item, access) => {
//     if (item.meta && item.meta.access && item.meta.access.length) {
//       if (hasOneOf(item.meta.access, access)) return true
//       else return false
//     } else return true
//   }

/**
 * @description 通过路由列表得到表单列表
 * @param {Array} list 路由列表
 * @returns {Array}
 */
export const getMenuByRouter = (list) => {
    let res = []
    list.forEach(item=>{
        if (!item.meta || !item.meta.hideInMenu) {
            let obj = {
                name: item.name,
                meta: item.meta
            }
            if (hasChild(item)) {
                obj.children = getMenuByRouter(item.children);
            }
            res.push(obj);
        } 
    })
    return res;
}

/**
 * @description 路由显示的标题
 * @param {Object} item 每一项路由
 * @returns {String}
 */
export const showTitle = (item) => {
    let { title } = item.meta;
    if (!title) return;
    title = (item.meta && item.meta.title) || item.name;
    return title;
}
