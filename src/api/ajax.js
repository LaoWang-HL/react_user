
import axios from 'axios'
import qs from 'qs'
import {message} from 'antd'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '../redux/store'
import { removeUserToken } from "../redux/actions-creators/user";
import history from '../history'

const instance = axios.create({
  timeout: 10000 // 超时时间为10s
})

 /*添加请求拦截器*/
instance.interceptors.request.use(config => { 
  console.log('request interceptor onResolved()')
  
  NProgress.start()

  const {data} = config
  if (data instanceof Object) { 
    config.data = qs.stringify(data)
  }
  const token=store.getState().user.token
  if (token) {
    config.headers['Authorization']='atguigu_'+token
  }

  return config 
})

/* 添加响应拦截器 */
instance.interceptors.response.use(
  response => {
    console.log('response interceptor onResolved()')

  
    NProgress.done()

 
    const result = response.data
  

    return result
  },
  error => {
    console.log('response interceptor onRejected()')
    
    /* 打印一下error.response  查看内部是什么 */
    NProgress.done()
    const {status,data:{msg}={}}=error.response
    if (status===401) {
      if (history.location.pathname!='/login') {
        message.error(msg)
        store.dispatch(removeUserToken())
      }
    }else if (status===404) {
      message.error('请求资源不存在')
    }else{
      message.error('请求出错'+error.message)
    }
  
  
    return new Promise(() => {})
  }
)


// 向外暴露instance
export default instance