/* eslint-disable */
import axios from 'axios'
import {
  MessageBox,
  Message,
  Loading
} from 'element-ui'
import store from '@/store'
import router from '@/router'
import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth'
import qs from 'qs'

/** ================================== 环境 ======================================= **/
let ENV = 'dev'
/** ================================== 生产环境打包拦路虎（预防打包出错） ============================ **/
ENV = process.env.NODE_ENV === 'production' ? 'prod' : ENV
export const BASE_CONFIG = {
  dev: {
    baseURL: '/dev-manager'
  }
} [ENV]

// create an axios instance
const service = axios.create({
  baseURL: BASE_CONFIG.baseURL, // url = base url + request url
  // withCredentials: true, // 是否带cookie
  timeout: 5000 // 网页响应超时时间
})

export let loadingInstance
// 请求拦截器
service.interceptors.request.use(
  config => {
    // do something before request is sent
    // 添加一个loading遮罩
    loadingInstance = Loading.service({
      lock: true,
      text: "数据加载中，请稍后...",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.7)"
    })
    config.headers["Request-ID"] = new Date().getTime() * 1000
    let jsonData = config.method == "get" ? config.params : config.data
    // 打印接口请求相关
    console.log(`%c[ 请求 ]: [ ${process.env.VUE_APP_BASE_URL}/${config.url} ] [ ${config.method.toUpperCase()} ] 数据接口，参数：`, "color:DodgerBlue", jsonData || {})

    if (store.getters.token) {
      // 有请求登录接口获取到token之后，才加入 Authorization 验证
      config.headers['Authorization'] = `Bearer ${getToken()}`
    }
    // 加入时间戳，标记接口不同时请求情况
    let params = config.params || {}
    params = {
      ...params,
      r: new Date().getTime()
    }
    config.params = params
    return config
  },
  error => {
    // do something with request error
    loadingInstance.close()
    console.log('请求有误，请联系管理员') // for debug
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    // 接口响应，关闭遮罩
    loadingInstance.close()
    // 打印接口响应相关
    console.log(`%c[ 响应 ]: [ ${process.env.VUE_APP_BASE_URL}/${response.config.url.replace(new RegExp(`${response.config.baseURL}/`), "")} ] [ ${response.config.method.toUpperCase()} ] 数据接口，返回：`, "color:YellowGreen", res)

    if (res.code !== 200) {
      Message({
        message: res.msg || '请求有误，请联系管理员',
        type: 'error',
        duration: 5 * 1000
      })

      if (res.code === 1002 || res.code === 1003) {
        // to re-login
        MessageBox.confirm('登录失效', '确认退出？', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      } else if (res.code === 1004) {
        store.dispatch('user/resetToken').then(() => {
          router.push('/login')
        })
      }
      return Promise.reject(new Error(res.msg || '请求有误，请联系管理员'))
    } else {
      console.log('res --> ', res)
      return res
    }
  },
  // 接口响应有误捕捉
  error => {
    console.log(`接口响应有误 err 【 ${error} 】`) // for debug
    Message({
      message: '服务器出现异常，请联系管理员',
      type: 'error',
      duration: 5 * 1000
    })
    // 接口无响应，关闭遮罩，然后渠道相应错误提示页
    loadingInstance.close()
    return Promise.reject(error)
  }
)

// 以下对 GET、POST、DELETE、PATCH、PUT 请求方法封装（根据你的具体业务需求进行封装）

/**
 * POST 请求封装
 * @param {string} url 请求url
 * @param {any} params 请求参数
 * @param {boolean} isJson 请求参数格式，boolean 值，true 表示传 json，false 表示传 form-data
 * @returns 
 */
export function fetchPost(url, params, isJson = false) {
  if (params) {
    removeEmptyKeyValue(params)
  }

  return new Promise((resolve, reject) => {
    let data = qs.stringify(params)
    if (isJson) {
      data = params
    }
    service.post(url, data)
      .then(res => {
        resolve(res)
      }, err => {
        reject(err)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * GET 请求方法封装
 * @param {string} url 请求url
 * @param {any} params 请求参数
 * @returns 
 */
export function fetchGet(url, params) {
  if (params) {
    removeEmptyKeyValue(params)
  }
  return new Promise((resolve, reject) => {
    service.get(url, {
        params: params
      })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * PATCH 请求方法封装
 * @param {string} url 请求url 
 * @param {any} params 请求参数
 * @returns 
 */
export function fetchPatch(url, params) {
  return new Promise((resolve, reject) => {
    service.patch(url, {
        params: params
      })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * PUT 请求方法封装
 * @param {string} url 请求url
 * @param {any} params 请求参数
 * @param {boolean} isFormData 请求参数格式，boolean 值，true 表示传 json，false 表示传 form-data
 * @returns 
 */
export function fetchPut(url, params, isFormData) {
  if (params) {
    removeEmptyKeyValue(params)
  }
  if (isFormData) {
    let ret = ""
    ret = qs.stringify(params)
    return new Promise((resolve, reject) => {
      service.put(url, ret)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  } else {
    return new Promise((resolve, reject) => {
      service.put(url, params)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}

/**
 * DELETE 请求方法封装
 * @param {string} url 请求url
 * @param {any} params 请求参数
 * @returns 
 */
export function fetchDelete(url, params) {
  if (params) {
    removeEmptyKeyValue(params)
  }
  return new Promise((resolve, reject) => {
    service.delete(url, {
        params: params
      })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

const removeEmptyKeyValue = obj => {
  Object.keys(obj).forEach(key => {
    if (
      obj[key] === undefined ||
      obj[key] === "undefined" ||
      obj[key] === "null" ||
      obj[key] === "" ||
      obj[key] === null
    ) {
      delete obj[key]
      // obj[key] = ''
    }
    if (typeof obj[key] === "object") {
      removeEmptyKeyValue(obj[key])
    }
  })
}

export default service
