import React,{ Component } from 'react'
import { Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {removeUserToken} from '../../redux/actions-creators/user'




class Admin extends Component {
  logout=()=>{
    this.props.removeUserToken()
  }

  render() {
    if (!this.props.hasLogin) {
      return <Redirect to='/login'/>
    }
    return (
      <div>
      <p>Hello, {this.props.user.username}</p>

      <button onClick={this.logout}>退出登陆</button>


    </div>
    )
  }
}
export default connect(
  state=>({user:state.user.user,hasLogin:state.user.hasLogin}),
  {removeUserToken}
)(Admin)