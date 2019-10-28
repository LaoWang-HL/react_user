import React, { Component } from 'react'
import { Menu, Icon, Button } from 'antd';
import {Link} from 'react-router-dom'
import {withRouter} from 'react-router-dom'
import menuList from '../../../config/menu-config'
import logo from "../../../assets/images/logo.png";
import  "./index.less";
import {connect} from 'react-redux'
import {setHeaderTitle} from '../../../redux/actions-creators/header-tittle'

const { Item,SubMenu } = Menu
@connect(state=>({headerTitle:state.headerTitle}),{setHeaderTitle})
@withRouter

class LeftNav extends Component {

getMenuNodes_reduce=(menuList)=>{
  return menuList.reduce((pre,item)=>{
    const path=this.props.location.pathname
    if(!item.children){
      //疑问：这里的setHeaderTitle做了什么工作
      if (item.key===path && this.props.headerTitle!==item.title) {
        this.props.setHeaderTitle(item.title)
        
      }
     


       pre.push(
        <Item key={item.key}>
        <Link to={item.key}>
          <Icon type={item.icon} />
          <span>{item.title}</span>
        </Link>
      </Item>
       )
    }else{
//如果传进的item有在标签数组中找到 对应的某一个item的key值，把这个key保存到state中
      if (item.children.some(item => item.key === path)) {
        this.openKey = item.key
      }
      



      pre.push(
        <SubMenu
          key={item.key}
          title={
            <span>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </span>
          }
        >
          {this.getMenuNodes_reduce(item.children)} {/* 进行递归调用 */}
        </SubMenu>
      )
    }
    return pre
  },[])
}



  render() {
    const menuNodes=this.getMenuNodes_reduce(menuList)
    const selectedKey=this.props.location.pathname
    const openKey=this.openKey
    return (
      
        <div className='left-nav'>
          <div className='left-nav-header'>
           <img src={logo}></img>
           <h1>硅谷后台</h1>
          </div>
          <Menu
            mode='inline'
            theme='dark'
            selectedKeys={[selectedKey]}
            defaultOpenKeys={[openKey]}
        >
            {this.getMenuNodes_reduce(menuList)}
           { /*<Item key="/home">
            <Link to="/home">
              <Icon type="home" />
              <span>首页</span>
            </Link>
          </Item>
          <SubMenu
            key="/products"
            title={
              <span>
                <Icon type="mail" />
                <span>商品</span>
              </span>
            }
          >
            <Item key="/category">
              <Link to="/category">
                <Icon type="pic-left" />
                <span>分类管理</span>
              </Link>
            </Item>
            <Item key="/product">
              <Link to="/product">
                <Icon type="border-outer" />
                <span>商品管理</span>
              </Link>
            </Item>
          </SubMenu>*/}
        </Menu>
        </div>
     
    )
  }
}
export default LeftNav