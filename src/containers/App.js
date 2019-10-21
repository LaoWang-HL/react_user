import React from 'react'
import { connect } from 'react-redux'
import Counter from '../components/couter'
import {increment, decrement, incrementAsync} from '../redux/action-creators/count'


export default connect(
  state=>({count:state.count}),
  {increment,decrement,incrementAsync}
)(Counter)