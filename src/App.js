import React, {Component} from 'react'
import {message} from 'antd'
import { BrowserRouter, Switch, Route} from "react-router-dom"

import Login from './containers/login/login'
import Admin from './containers/admin/admin'

/*
应用根组件
 */
class App extends Component {

  handleClick = () => {
    message.success('成功啦...');
  }

  render() {
    return (
      <BrowserRouter>
        <Switch> 
          {/* /login */}
          <Route path="/login" component={Login} exact/>
          <Route path="/" component={Admin} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
