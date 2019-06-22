import React from 'react';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {

    }
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(){
    console.log('aaa')
  }
  render(){
    const data = {
      react: 'redux'
    }
    return(
      <div>
        {/* 不推荐,每次render bind都会执行一次 */}
        <button onClick={this.handleClick.bind(this)}>Btn1</button>
        {/* 不推荐，每次render 箭头函数都会重新生成，之前的函数未必被清空，浪费性能 */}
        <button onClick={()=>this.handleClick()}>Btn2</button>
        {/* 推荐 在constructor中调用bind，之后重新渲染不会再调用 */}
        <button onClick={this.handleClick}>Btn3</button>
        {/* 不推荐 每一次都会生成新的对象传递，之前对象的内存空间未必被清除，浪费性能 */}
        <Demo data={{react:'redux'}}></Demo>
        {/* 推荐 */}
        <Demo data={data}></Demo>
        {/* 传递参数尽量避免传递不需要的数据 */}
      </div>
    )
  }
}

class Demo extends React.Component{
  render(){
    return (
      <div>
        {this.props.data.react}
      </div>
    )
  }
}

export default App;
