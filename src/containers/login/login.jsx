
import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import { Form, Icon, Input, Button } from 'antd'

import { connect } from 'react-redux'

import {loginAsync} from '../../redux/actions-creators/user'
import logo from './images/logo.png'
import './login.less'


const { Item } = Form 

@connect(
  state => ({hasLogin: state.user.hasLogin}),  
  {loginAsync} 
)
@Form.create()   
class Login extends Component {

  handleSubmit = (event) => {
    event.preventDefault() 

    this.props.form.validateFields((err, values) => {
      if (!err) { // 验证成功
        const {username, password} = values
        console.log('发ajax请求', {username, password})

        this.props.loginAsync(username, password)

       

    

          
      } else {
        
      }
    });

  
  }


  validatePwd = (rule, value, callback) => {
  
   if (value==='') {
     callback('密码必须输入')
   } else if (value.length<4) {
     callback('密码必须大于等于4位')
   } else if (value.length>12) {
     callback('密码必须小于等于12位')
   } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
     callback('密码必须是英文、数字或下划线组成')
   } else {
     callback()
   }
  }

  render() {
    console.log('Login render() ', this.props.form )

    const {hasLogin} = this.props
    if (hasLogin) { 
      return <Redirect to="/"/> 
    }

    const { getFieldDecorator } = this.props.form;


    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo"/>
          <h1>后台管理系统</h1>
        </header>
        <div className="login-content">
          <h1>用户登陆</h1>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Item>
              {
                getFieldDecorator('username',{ 
                  initialValue: '', 
                  
                  rules: [
                    { required: true, whitespace: true, message: '用户名必须输入' },
                    { min: 4, message: '用户名不能小于4位' },
                    { max: 12, message: '用户名不能大于12位' },
                    { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成' },
                  ],
                })(
                  <Input
                      prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      placeholder="用户名"
                    />
                )
              }
            </Item>
            <Form.Item>

              {
                getFieldDecorator('password', {
                  initialValue: '', // 初始值
                  rules: [
                    // 自定义验证
                    {validator: this.validatePwd}
                  ]
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="密码"
                  />
                )
              }
              
            </Form.Item>
            <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">登陆</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}


export default Login



