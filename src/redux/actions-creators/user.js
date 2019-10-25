import { reqLogin } from '../../api'
import {message} from 'antd'
import { SAVE_USER_TOKEN, REMOVE_USER_TOKEN } from '../actions-types'
import storage from "../../urils/storage";
const saveUserToken=(user,token)=>({type:SAVE_USER_TOKEN,data:{user,token}})
export const removeUserToken = () => {
  // 清除local中的user和token
  // localStorage.removeItem('user_key')
  // localStorage.removeItem('token_key')
   storage.remove(storage.KEYS.USER_KEY)
   storage.remove(storage.KEYS.TOKEN_KEY)
  return {type: REMOVE_USER_TOKEN}
}
export function loginAsync(username,password) {
  return async dispatch=>{
   const result =await reqLogin({username,password})
    if(result.status===0){
      const {user,token}=result.data
      // localStorage.setItem('ueser_key',JSON.stringify(user))
      // localStorage.setItem('token_key',token)
      /* 讲user和token保存在local中 */
      storage.set(storage.KEYS.USER_KEY,user)
      storage.set(storage.KEYS.TOKEN_KEY,token)
      dispatch(saveUserToken(user,token))
    }else{
      message.error(result.msg)
    }
  }
}