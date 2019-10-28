import React, { Component } from 'react'
import {Card, Select, Input, Button, Icon, Table} from 'antd'
import {reqProducts,reqSearchProducts} from '../../api'
import {PAGE_SIZE} from '../../config'

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
      dataIndex: 'status',
      render: (price) => (
        <span>
          <Button type="primary">下架</Button>
          <span>在售</span>
        </span>
      )
    },
    {
      width: 100,
      title: '操作',
      render: (product) => (
        <span>
          <Button type="link">详情</Button>
          <Button type="link">修改</Button>
        </span>
      )
    },
  ]

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
      <Button type='primary'>
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
