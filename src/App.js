import React, {Component} from 'react'
import {message} from 'antd'
import {Router, Switch, Route} from "react-router-dom"

import Login from './containers/login/login'
import Admin from './containers/admin/admin'
import history from './history'
/*
应用根组件
 */
class App extends Component {

  handleClick = () => {
    message.success('成功啦...');
  }

render() {     
    return (
      <Router history={history}>
        <Switch> 
          {/* /login */}
          <Route path="/login" component={Login} exact/>
          <Route path="/" component={Admin} />
        </Switch>
      </Router>
    )
  }
}

export default App
