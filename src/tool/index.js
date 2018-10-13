export default {
  storage: {
    // 存储
    set (key, value) {
      window.localStorage.setItem(key, JSON.stringify(value))
    },
    // 取出数据
    get (key) {
      return JSON.parse(window.localStorage.getItem(key))
    },
    // 删除数据
    remove (key) {
      window.localStorage.removeItem(key)
    }
  }
}
