import ajax from './ajax'

export const reqLogin=({username,password})=>ajax({
  url:'/login',
  method:'POST',
  data:{username,password}

})