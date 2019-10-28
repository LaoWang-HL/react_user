import React, { Component } from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'  // 高阶组件, 用来包装非路由组件
import dayjs from 'dayjs'
import format from 'date-fns/format'
import { removeUserToken } from '../../../redux/actions-creators/user'
import {Modal,Button,Icon} from 'antd'
import LinkButton from '../../../components/link-button'
import {reqWeather} from '../../../api'
import './index.less'
import screenfull from 'screenfull'

/* 
管理界面的头部组件
*/
@connect(
  state => (
{
      username: state.user.user.username,
      headerTitle:state.headerTitle
    }),
  {removeUserToken}
)
@withRouter  // 向组件内部传入3个属性: history/location/match
class Header extends Component {

  state = {
    // currentTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
    currentTime: format(Date.now(), 'yyyy-MM-dd HH:mm:ss'),
    dayPictureUrl:'',
    weather:'',
     isFullScreen:false
  }

  logout = () => {
    Modal.confirm({
      title: '确认退出吗?',
      onOk: () => {
        this.props.removeUserToken()
      },
      onCancel() {
        console.log('Cancel');
      },
    })
  }

  showWeather= async ()=>{
      const {dayPictureUrl,weather}=await reqWeather('北京')
      this.setState({
        dayPictureUrl,
        weather
      })
  }

   handleFullScreen=()=>{
     if (screenfull.isEnabled) {
       screenfull.toggle()
     }
   }

  componentDidMount () {
    // 启动循环定时器, 每隔1s, 更新显示当前时间
    this.intervalId = setInterval(() => {
      this.setState({
        currentTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
      })
    }, 1000);
    this.showWeather()

    screenfull.onchange(()=>{
      this.setState({
        isFullScreen:!this.state.isFullScreen
      })
    })
    
  }

  componentWillUnmount () {
    // 清除定时器
    clearInterval(this.intervalId)
  }


  render() {
  
    const {currentTime,dayPictureUrl,weather,isFullScreen} = this.state
    const {username,headerTitle}=this.props
    return (
      <div className="header">
        <div className="header-top">
        <Button size='small' onClick={this.handleFullScreen}>
         <Icon type={isFullScreen?'fullscreen-exit':'fullscreen'}/>
        </Button>&nbsp;
          <span>欢迎, {username}</span>
          <LinkButton onClick={this.logout}>退出</LinkButton>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{headerTitle}</div>
          <div className="header-bottom-right">
            <span>{currentTime}</span>
            <img src={dayPictureUrl} alt="weather"/>
            <span>{weather}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default Header
