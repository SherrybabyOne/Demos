import React,{Component} from 'react';
import PropTypes from 'prop-types';

//context是全局的，组件里声明，所有子元素可以直接获取
class SideBar extends Component{
    render(){
        return(
            <div>
                <p>侧边栏</p>
                <NavBar />
            </div>
        )
    }
}
class NavBar extends Component{
    static contextTypes = {
        user: PropTypes.string
    }
    render(){
        return(
            <div>{this.context.user}的导航栏</div>
        )
    }
}
//另一种写法
// function NvaBar(props,context){

// }

export class Page extends Component{
    static childContextTypes = {
        user: PropTypes.string
    }
    getChildContext(){
        return {user:this.context.user}
    }
    constructor(props){
        super(props);
        this.state={
            user: 'A'
        }
    }
    render(){
        return(
            <div>
                <p>我是{this.state.user}</p>
                <SideBar />
            </div>
        )
    }
}