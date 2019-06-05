//react-redux
import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from './redux.js' 
// connect 负责链接组件，把redux里的数据放到组件的属性里(高阶组件)
// 1. 负责接受一个组件,把state里的一些数据放进去，返回一个组件
// 2. 数据变化的时候，能够通知组件
// export function connect(mapStateToProps,mapDispatchToProps){
//     return function(WrapComponent){
//         return class ConnectedComponent extends React.Component{

//         }
//     }
// }
export const connect = (mapStateToProps=state=>state,mapDispatchToProps={})=>(WrapComponent)=>{
    return class ConnectedComponent extends React.Component{
        static contextTypes = {
            store: PropTypes.object
        }
        constructor(props,context){
            super(props,context);
            this.state = {
                props: {}
            }
        }
        componentDidMount(){
            const {store} = this.context;
            store.subscribe(()=>this.update())
            this.update();
        }
        //获取mapStateToProps、mapDispatchToProps，放入到props里
        update(){
            const {store} = this.context;
            const stateProps = mapStateToProps(store.getState());
            //方法不能直接给，需要dispatch
            // function addGun(){
            //     return {type: ADD_GUN}
            // }
            // 直接执行addGun()毫无意义
            // 需要: addGun=()=>store.dispatch(addGun())才有意义，其实就是用dispatch把actionCreator给包了一层
            // bindActionCreators()函数是redux提供的
            const dispatchProps = bindActionCreators(mapDispatchToProps,store.dispatch)
            this.setState({
                props: {
                    ...this.state.props,
                    ...stateProps,
                    ...dispatchProps
                }
            })
        }
        render(){
            return <WrapComponent {...this.state.props} />
        }
    }
}

// Provider，把store放到context里，所有子元素可以直接获取到store
export class Provider extends React.Component{
    static childContextTypes = {
        store: PropTypes.object
    }
    getChildContext(){
        return {store: this.store}
    }
    constructor(props,context){
        super(props,context);
        this.store = props.store
    }
    render(){
        return this.props.children
    }
}