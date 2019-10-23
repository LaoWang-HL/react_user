
import axios from 'axios'
import qs from 'qs'
import {message} from 'antd'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 创建一个instance
const instance = axios.create({
  timeout: 10000 // 超时时间为10s
})

// 添加请求拦截器
instance.interceptors.request.use(config => { 
  console.log('request interceptor onResolved()')
  // 显示请求进度
  NProgress.start()

  const {data} = config
  if (data instanceof Object) { 
    config.data = qs.stringify(data)
  }


  return config 
})


instance.interceptors.response.use(
  response => {
    console.log('response interceptor onResolved()')

  
    NProgress.done()

 
    const result = response.data
  

    return result
  },
  error => {
    console.log('response interceptor onRejected()')
    
    // 隐藏请求进度
    NProgress.done()

  
    message.error('请求出错: ' + error.message)
 
    return new Promise(() => {})
  }
)


// 向外暴露instance
export default instance