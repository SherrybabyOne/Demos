import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from './redux';

//1.负责接受有i 个组件，把state里的一些数据放进去，返回一个组件
//2.数据变化的时候，能够通知组件
//function写connect
// export function connect(mapStateToProps=state=>state, mapDispatchToProps={}){
//     return function(WrappedComponent){
//         return class ConnectedComponent extends React.Component{

//         }
//     }
// }
export const connect = (mapStateToProps=state=>state, mapDispatchToProps={})=>(WrappedComponent)=>{
    return class ConnectedComponent extends React.Component{
        static contextTypes = {
            store: PropTypes.object
        }
        constructor(props, context){
            super(props, context)
            this.state = {
                props: {}
            }
            this.update = this.update.bind(this);
        }
        componentDidMount(){
            const {store} = this.context;
            store.subscribe(this.update)
            this.update();
        }
        update(){
            //获取mapStateToProps、mapDispatchToProps放到组件里
            const {store} = this.context;
            const stateProps = mapStateToProps(store.getState())
            //方法不能直接给，需要dispatch，store.dispatch()
            const dispatchProps = bindActionCreators(mapDispatchToProps,store.dispatch);
            this.setState({
                props: {
                    ...this.state.props,
                    ...stateProps,
                    ...dispatchProps
                }
            })
        }
        render(){
            return <WrappedComponent {...this.state.props} />
        }
    }
}

// Provider,把store放到context里面，所有的子元素可以直接获取到store
export class Provider extends React.Component{
    static childContextTypes = {
        store: PropTypes.object
    }
    getChildContext(){
        return {store: this.store}
    }
    constructor(props){
        super(props)
        this.store = this.props.store;
    }
    render(){
        return this.props.children
    }
}