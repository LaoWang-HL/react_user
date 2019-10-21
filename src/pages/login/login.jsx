import React, { Component } from 'react'
import { Form, Icon, Input, Button } from 'antd'

import logo from './images/logo.png'
import './login.less'

const { Item } = Form // 必须在所有import的下面

 class Login extends Component {
handleSubmit=()=>{


}
render(){
  console.log(this.props)
const {getFieldDecorator} = this.props.form
  return(
    <div className='login'>
    <header className="login-header">
          <img src={logo} alt="logo"/>
          <h1>后台管理系统</h1>
        </header>
        <div className='login-content'>
        <h1>用户登录</h1>
     <form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
      
        {getFieldDecorator('username', {
          rules: [{ required: true, message: '用户名必须输入' },
          {max:14,message:'输入最大长度为14'},
          {min:4,message:'输入最小长度为4'}
         
                  ],
        })(
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Username"
          />,
        )}
        
        </Form.Item>
        <Form.Item>
        {getFieldDecorator('password', {
          rules: [{ required: true, message: '密码必须输入' },
          {max:14,message:'输入最大长度为14'},
          {min:4,message:'输入最小长度为4'}
         
                  ],
        })(<Input
             prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
             type="password"
             placeholder="Password"
           />)}
        </Form.Item>
          <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
          登录
          </Button>
          </Form.Item>
     </form>
        
        </div>
    </div>
  )
}

}
const loginWrap=Form.create()(Login) 
export default loginWrap