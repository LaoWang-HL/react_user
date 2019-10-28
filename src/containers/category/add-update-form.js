import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Form,Input} from 'antd'

const {Item} =Form
@Form.create()
class AddUpdateForm extends Component {

 static propTypes={
   setForm:PropTypes.func.isRequired,
   categoryName:PropTypes.string
 }

 constructor (props){
   super(props)

   this.props.setForm(this.props.form)
 }


  render() {
    const {getFieldDecorator}=this.props.form
    return (
      <Form>
      <Item>
        {
          getFieldDecorator('categoryName', {
            initialValue: this.props.categoryName || '', // 如果手动输入修改了重新指定无效
            rules: [
              {required: true, message: '分类名称必须输入'}
            ]
          })(
            <Input placeholder="请输入分类名称"/>
          )
        }
      </Item>
    </Form>
    )
  }
}
export default AddUpdateForm