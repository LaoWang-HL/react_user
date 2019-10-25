import{
  SAVE_USER_TOKEN,
  REMOVE_USER_TOKEN
} from '../actions-types'

import storage from '../../urils/storage'
// const _user=JSON.parse(localStorage.getItem('user_key')||'{}')
// const _token=localStorage.getItem('token_key')
const _user=storage.get(storage.KEYS.USER_KEY,{})
const _token=storage.get(storage.KEYS.TOKEN_KEY,'')
const initUser = {
  user:_user,
  token:_token,
  hasLogin:_token&&_user._id
}
export default function user(state=initUser, action) {
  switch (action.type) {
    case SAVE_USER_TOKEN:
      const { user,token }=action.data
      return{
        user,
        token,
        hasLogin:true
      }
      case REMOVE_USER_TOKEN:
        return {
          user:{},
          token:'',
          hasLogin:false
        }
    default:
      return state
  }
}