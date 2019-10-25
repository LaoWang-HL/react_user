import React,{ Component } from 'react'
import { Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {removeUserToken} from '../../redux/actions-creators/user'
import { Layout } from "antd";
import LeftNav from './left-nav'
import AdminHeader from './header'
const { Header, Footer, Sider, Content } = Layout

class Admin extends Component {
  logout=()=>{
    this.props.removeUserToken()
  }

  render() {
    if (!this.props.hasLogin) {
      return <Redirect to='/login'/>
    }
    return (
      <Layout style={{height:'100%'}}>
      <Sider>
         <LeftNav></LeftNav>
      </Sider>
      <Layout>
        
          <AdminHeader/>
        
        <Content>Content</Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
    )
  }
}
export default connect(
  state=>({user:state.user.user,hasLogin:state.user.hasLogin}),
  {removeUserToken}
)(Admin)