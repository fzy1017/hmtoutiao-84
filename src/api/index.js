import axios from 'axios'
import router from '@/router'
// 添加请求头
import local from '@/utils/local'
import BIGJSOM from 'json-bigint'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// if (local.getUser()) {
//   axios.defaults.headers.Authorization = `Bearer ${local.getUser.token}`
// }
axios.defaults.transformResponse = [(data) => {
  try {
    return BIGJSOM.parse(data)
  } catch (e) {
    return data
  }
}]

// 请求拦截器
axios.interceptors.request.use((config) => {
  // 拦截成功  往headers中加token
  const user = local.getUser() || {}
  config.headers.Authorization = `Bearer ${user.token}`
  return config
}, (err) => {
  return Promise.reject(err)
})
// 响应拦截器
axios.interceptors.response.use(res => res, err => {
  // 获取响应状态码  err.response 响应对象  err.response.status 状态码
  if (err.response.status === 401) {
    // 如果是401跳转登录
    // 麻烦 window.location.href = 'http://localhost:8080/#/login'
    // 不推荐 window.location.hash = '#/login'
    // 使用vue-router进行跳转
    return router.push('/login')
  }
  return Promise.reject(err)
})
export default axios
