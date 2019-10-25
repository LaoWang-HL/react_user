import store from 'store'
/* 保存指定的key与value值在本地 */
function set(key,value) {
  store.set(key,value)
}

/* 获取指定key对应的value值，如果没有，返回指定值 */
function get(key,defaultValue) {
  if (defaultValue===undefined) {
     throw new Error('get()必须指定默认值')
  }

  return store.get(key,defaultValue)
}

/* 删除指定key的数据，如果不传删除所有的key value */
function remove(key) {
  if (key) {
    store.remove(key)
  }else{
    store.clearAll()
  }
}

export default {
  set,
  get,
  remove,
  KEYS: {
    USER_KEY: 'user_key',
    TOKEN_KEY: 'token_key'
  }
}