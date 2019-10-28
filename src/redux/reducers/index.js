import { combineReducers } from "redux";
import user from './user'
import xxx from './xxx'
import headerTitle from './header-title'
import categorys from './category'
export default combineReducers(
  {
    user,
    xxx,
    headerTitle,
    categorys
  }
)