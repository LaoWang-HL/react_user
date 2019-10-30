import React, { Component, useRef,useEffect,useState } from 'react'
import {
  Card,
  Button,
  Icon,
  Table,
  Modal,
  message

} from 'antd'
import {connect} from 'react-redux'
import { 
  getCategorysAsync, 
  addCategoryAsync, 
  updateCategoryAsync 
} from '../../redux/actions-creators/category'
import LinkButton from '../../components/link-button'
import AddUpdateForm from './add-update-form'



   function Category(props) {
     const [loading, setloading] = useState(false)
     const [isShowAdd, setShowAdd] = useState(false)
     const [isShowUpdate,setShowUpdate]=useState(false)

     const categoryRef = useRef({})
     const formRef=useRef(null)
     const columnsRef = useRef(
      [
        {
          title: '分类名称',
          dataIndex: 'name',
        },
        {
          width: 300,
          title: '操作',
          // 如果没有指定dataIndex, 接收数据对象参数, 如果指定了dataIndex, 接收对应值的参数
          render: (category) => <LinkButton onClick={() => showUpdate(category)}>修改分类</LinkButton>,
        }
      ]
    )
    useEffect(() => {

      getCateforys()
    }, [])
    
   async function getCateforys(){
      setloading(true)
  
      const msg=await props.getCategorysAsync()
      setloading(false)
       if (msg) {
         message.error(msg)
       }
    }

  async function addCategory(){
      formRef.current.validateFields(async(error,values)=>{
        if (!error) {
          const {categoryName}=values
          const msg=await props.addCategoryAsync(categoryName)
          if (msg) {
            message.error(msg)
          }else{
           
            setShowAdd(false)
            message.success('添加分类成功')
          }
        }
       
      })
    }
     
 

function updateCategory(){
    formRef.current.validateFields( async (error,values)=>{
      if (!error) {
        const {categoryName}=values
        const categoryId=categoryRef.current._id

        const msg=await props.updateCategoryAsync({categoryId, categoryName})
        if (msg) {
          // 更新失败, 显示提示
          message.error(msg)
        } else {
          setShowUpdate(false)
          message.success('更新分类成功')
       
        }
      }
    })
  }

   function hideAdd(){
    formRef.current.resetFields()
   
    setShowAdd(false)
  }

  function showUpdate(category){
    categoryRef.current=category
    
    setShowUpdate(true)
  }

  
  function hideUpdate (){
    // 删除前面添加的属性
    
    categoryRef.current={}
    // 重置输入
    
    formRef.current.resetFields()
    // 隐藏更新界面
    
    setShowUpdate(false)
  }
    const {categorys}=props
    const category=categoryRef.current
  const extra = (
    <Button type="primary" onClick={() => setShowAdd(true)}>
      <Icon type="plus"></Icon>
      添加
    </Button>
  )

    return (
      <Card extra={extra}>
        <Table 
          bordered
          loading={loading}
          dataSource={categorys} 
          columns={columnsRef.current} 
          rowKey="_id"
          pagination={{pageSize: 5, showQuickJumper: true}}
        />

        <Modal
          title="添加分类"
          visible={isShowAdd}
          onOk={addCategory}
          onCancel={hideAdd}
        >
          <AddUpdateForm setForm={(form) =>formRef.current=form }/>
        </Modal>
        <Modal
          title="修改分类"
          visible={isShowUpdate}
          onOk={updateCategory}
          onCancel={hideUpdate}
        >
          <AddUpdateForm setForm={(form) =>formRef.current = form} categoryName={category.name}/>
        </Modal>
      </Card>
    )
  }

export default connect(
  state => ({categorys: state.categorys}),
  {getCategorysAsync, addCategoryAsync, updateCategoryAsync}
)(Category)