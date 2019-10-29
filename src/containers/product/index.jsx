import React, { Component } from 'react'
import {Card, Select, Input, Button, Icon, Table, message} from 'antd'
import {reqProducts,reqSearchProducts, reqUpdateProductStatus} from '../../api'
import {PAGE_SIZE} from '../../config'
import memoryUtils from '../../urils/memory'
const {Option}=Select
export default class Product extends Component {

  state={
    products:[],
    toral:0,
    searchType:'productName',
    searchName:''
  }

  columns=[
    {
      title: '商品名称',
      dataIndex: 'name',
    },
    {
      title: '商品描述',
      dataIndex: 'desc',
    },
    {
      title: '价格',
      dataIndex: 'price',
      render: (price) => '¥' + price
    },
    {
      width: 100,
      title: '状态',
      // dataIndex: 'status',
      render: ({_id,status}) => {
        let btnText='下架'
        let text='在售'
        
        if (status===2) {
          btnText='上架'
          text='已下架'
        }
        return (
          <span>
            <Button 
               type='primary'
               onClick={()=>{
                 
                return this.updateStatus(_id,status===1?2:1)
                }}            
            >{btnText}</Button>
             <span>{text}</span>
          </span>
        )
      }

    },
    {
      width: 100,
      title: '操作',
      render: (product) => (
        <span>
          <Button type="link" onClick={()=>{
            memoryUtils.product=product
            this.props.history.push(`/product/detail/${product._id}`)
          }}>详情</Button>
          <Button type="link" onClick={()=>{
            memoryUtils.product=product
            this.props.history.push(`/product/addupdate`)
          }}>修改</Button>
        </span>
      )
    },
  ]

  updateStatus= async (id,status)=>{
    const result =await reqUpdateProductStatus(id,status)
    console.log(result)
    if (result.status===0) {
      message.success('更新状态成功')
     
      let products=this.state.products
      products=products.map(item=>{
        if (item._id===id) {
          
           return {...item,status}
        } else{
          return item
        }
      })
      this.setState({
        products
      })
    }else{
      message.error(result.msg)
    }
  }

  getProducts= async (pageNum)=>{
    let result
    if (this.isSearch) {
      const {searchType,searchName}=this.state
      if (!searchName) return 
      result = await reqSearchProducts({pageNum,pageSize:PAGE_SIZE,searchType,searchName})
    }else{
      result = await reqProducts(pageNum,PAGE_SIZE)
    }
      if (result.status===0) {
        const {list,total}=result.data
        this.setState({
          products:list,
          total
        })
      }
  }

  componentDidMount(){
    this.getProducts(1)
  }
  render() {
    const {products,total,searchType,searchName}=this.state
    
    const title=(
      <span>
        <Select 
          value={searchType} 
          onChange={(value) => this.setState({searchType: value})}
        >
          <Option value="productName">按名称搜索</Option>
          <Option value="productDesc">按描述搜索</Option>
        </Select>
        <Input 
          style={{width: 200, margin: '0 10px'}} 
          placeholder="关键字" 
          value={searchName}
          onChange={event => this.setState({searchName: event.target.value})}
        />
        <Button 
          type="primary" 
          onClick={() => {
            this.isSearch = true // 保存一个标识搜索的值
            this.getProducts(1)
          }}
        >
          搜索
        </Button>
      </span>
    )

    const extra=(
      <Button type='primary' onClick={()=>{
        memoryUtils.product={}
        this.props.history.push('/product/addupdate')
      }}>
        <Icon type="plus"></Icon>
          添加商品
      </Button>
    )
    return (
      <Card title={title} extra={extra}>
      <Table
        dataSource={products}
        columns={this.columns}
        bordered
        rowKey="_id"
        pagination={{
          pageSize: PAGE_SIZE, 
          total, 
          // onChange:  (page) => {this.getProducts(page)}
          onChange:  this.getProducts
        }}
      />
    </Card>
    )
  }
}
