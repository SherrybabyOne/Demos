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

class Demo extends React.PureComponent{
  // shouldComponentUpdate(nextProps,nextState){
  //    if(nextProps.title === this.props.title){
  //      return false
  //    }
  //    return true
  // }

  render(){
    console.log('aaa')
    return (
      <h2>
        I am Demo,{this.props.title}
      </h2>
    )
  }
}

export default App;
