import { ADD_PRODUCT, UPDATE_PRODUCT } from "../action-types";

const initProducts=[]
export default function products(state=initProducts,action) {
  switch (action.type) {
    case ADD_PRODUCT:
      const product=action.data
      return [product,...state]
    case UPDATE_PRODUCT:
    return state
  
    default:
      return state
    
  }
}