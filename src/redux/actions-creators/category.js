import {
  RECEIVE_CATEGORYS,
  ADD_CATEGORY,
  UPDATE_CATEGORY
} from '../actions-types'

import {
  reqCategorys,
  reqAddCategory,
  reqUpdateCategory
} from '../../api'

const receiveCategorys=(categorys)=>({type:RECEIVE_CATEGORYS,data:categorys})
const addCategory=(category)=>({type:ADD_CATEGORY,data:category})
const updateCategory=(category)=>({type:UPDATE_CATEGORY,data:category})

export const getCategorysAsync=()=>{
  return async dispatch=>{
    const result =await reqCategorys()
   
    if (result.status===0) {
       const categorys=result.data
       
       dispatch(receiveCategorys(categorys))
    }
    return result.msg
  }
}

export const addCategoryAsync=(categoryName)=>{
  return async dispatch=>{
    const result =await reqAddCategory(categoryName)
    console.log(result)
    if (result.status===0) {
      const category=result.data
      console.log(category)
      dispatch(addCategory(category))
   }
   return result.msg
  }
}

export const updateCategoryAsync=({categoryId, categoryName})=>{
  return async dispatch=>{
    const result =await reqUpdateCategory({categoryId, categoryName})
    if (result.status===0) {
      const category = {_id: categoryId, name: categoryName}
      dispatch(updateCategory(category))
   }
   return result.msg
  }
}
