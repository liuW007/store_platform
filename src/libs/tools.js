
  /**
   * @description 得到两个数组的并集, 两个数组的元素为数值或字符串
   * @param {Array} arr1
   * @param {Array} arr2
   */
  export const getUnion = (arr1, arr2) => {
    return Array.from(new Set([...arr1, ...arr2]))
  }

  /**
   * @description 数据去重
   * @param {Array} arr：需要去重的对象数组
   * @param {String} key：去重的对象key
   * @returns {Array} 返回新的数组
   */
  export const dataDelRepeat = (arr, key = 'id') => {
    let new_arr = [];
    arr.forEach(item => {
      new_arr.push(item[key]);
    });
    new_arr = [...new Set(new_arr)];
    return arr.filter(item => {
      let index = new_arr.indexOf(item[key]);
      if (index > -1) {
        new_arr.splice(index, 1);
      }
      return false;
    })
  }

  /**
   * @description 对象深度拷贝
   * @description 不适用于函数,RegExp,对象有循环引用
   */
  export const deepCopy = (obj) => {
    return JSON.parse(JSON.stringify(obj));
  }