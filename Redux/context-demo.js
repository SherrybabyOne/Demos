import React,{Component} from 'react';
import PropTypes from 'prop-types';

//context是全局的，组件里声明，所有元素可以直接获取
class Sidebar extends Component{
    render(){
        return(
            <div>
                <p>侧边栏</p>
                <Navbar />
            </div>
        )
    }
}
class Navbar extends Component{
    static contextTypes = {
        user: PropTypes.string
    }
    render(){
        return(
            <div>
                <p>姓名：{this.context.user}</p>
            </div>
        )
    }
}

export default class Page extends Component{
    static childContextTypes = {
        user: PropTypes.string
    }
    constructor(props){
        super(props);
        this.state={
            user: 'sherry'
        }
    }
    getChildContext(){
        return this.state
    }
    render(){
        return(
            <div>
                <Sidebar />
            </div>
        )
    }
}