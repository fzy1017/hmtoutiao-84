// 信息存储
const KEY = 'hmtoutiao-84'
const local = {
  // 存储信息
  setUser (user) {
    const jsonStr = JSON.stringify(user)
    window.sessionStorage.setItem(KEY, jsonStr)
  },
  // 获取信息
  getUser () {
    const jsonStr = window.sessionStorage.getItem(KEY)
    return JSON.parse(jsonStr)
  },
  //   移除信息
  delUser () {
    window.sessionStorage.removeItem(KEY)
  }
}
export default local
