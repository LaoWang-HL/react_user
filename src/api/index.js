import ajax from './ajax'
import jsonp from 'jsonp'
import { message } from 'antd'

export const reqLogin=({username,password})=>ajax({
  url:'/login',
  method:'POST',
  data:{username,password}

})

export const reqUsers=()=> ajax({
  url:'/manage/user/list',
  method:'GET'
})

export const reqWeather = (city) => {

  return new Promise((resolve, reject) => {
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    // callback函数由jsonp库内部定义__jp0函数调用的 --> callback参数来告诉服务器返回的js代码: __jp(data)
    jsonp(url, {}, (err, data) => { 
      
      if (!err && data.status==='success') {
        const {dayPictureUrl, weather} = data.results[0].weather_data[0]
        resolve({dayPictureUrl, weather})
      } else {
        // reject(new Error('获取天气失败!'))
        message.error('获取天气失败!')
        return new Promise(() => {})
      }
    })
  })
  
}



export const reqCategorys=()=>ajax('/manage/category/list')

export const reqAddCategory=(categoryName)=>ajax.post('/manage/category/add',{categoryName})

export const reqUpdateCategory=({categoryId,categoryName})=>ajax({
  url: '/manage/category/update',
  method: 'POST',
  data: {categoryId, categoryName}
})

export const reqProducts=(pageNum,pageSize)=>ajax({
  url: '/manage/product/list',
  params: {
    pageNum,
    pageSize
  }
})





export const reqSearchProducts=({
  pageNum, 
  pageSize, 
  searchType, // 搜索类型名称  'productName' / 'productDesc'
  searchName, // 搜索的关键字
})=>ajax({
  url:'/manage/product/search',
  params:{
    pageNum,
    pageSize,
    [searchType]:searchName
  }
})