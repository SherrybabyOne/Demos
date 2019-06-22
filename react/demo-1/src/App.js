import React from 'react';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      num: 0,
      title: 'imooc'
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleTitle = this.handleTitle.bind(this)
  }
  handleClick(){
    this.setState({
      num: this.state.num+1
    })
  }
  handleTitle(){
    this.setState({
      title: this.state.title + '!'
    })
  }
  render(){
    return(
      <div>
        <h2>App,{this.state.num}</h2>
        <button onClick={this.handleClick}>Btn1</button>
        <button onClick={this.handleTitle}>Btn2</button>
        <Demo title={this.state.title} />
      </div>
    )
  }
}

// immutable优点：
//   1. 减少内存的使用
//   2. 并发安全
//   3. 降低项目复杂度
//   4. 便于比较复杂数据，定制shouldComponentUpdate方便
//   5. 时间旅行方便
//   6. 函数式编程
// 缺点：
//   1. 学习成本
//   2. 库的大小
//   3. 对现有项目入侵太严重(新项目使用，老项目待用)

class Demo extends React.PureComponent{
  // shouldComponentUpdate(nextProps,nextState){
  //    if(nextProps.title === this.props.title){
  //      return false
  //    }
  //    return true
  // }

  render(){
    return (
      <h2>
        I am Demo,{this.props.title}
      </h2>
    )
  }
}

export default App;