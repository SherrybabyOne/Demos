import React from 'react';
import {connect} from './react-redux';
import {addNum,removeNum,addNumAsync,addNumDouble} from './01-redux'

class App extends React.Component{
  render(){
    return(
      <div>
        <h1>当前数量:{this.props.num?this.props.num.num:''}</h1>
        <button onClick={this.props.addNum}>增加数量</button> 
        <button onClick={this.props.removeNum}>减少数量</button>
        <button onClick={this.props.addNumAsync}>拖一秒钟再增加</button>
        <button onClick={this.props.addNumDouble}>增加两次数量</button>
      </div>
    )
  }
}

export default connect(state=>({num: state}),{addNum,removeNum,addNumAsync,addNumDouble})(App);
