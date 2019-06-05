export function createStore(reducer){

    let currentState = {};
    let currentListener = [];
    function getState(){
        return currentState
    }
    function subscribe(listener){
        currentListener.push(listener)
    }
    function dispatch(action){
        currentState = reducer(currentState,action);
        currentListener.forEach(v=>v);
        return action
    }
    dispatch({})
    return {getState,subscribe,dispatch}
}

function bindActionCreator(creator,dispatch){
    return (...args) => dispatch(creator(...args))
}
//actionCreators类似于{addGun,removGun}
export function bindActionCreators(actionCreators,dispatch){
    let bound = {};
    Object.keys(actionCreators).forEach(v=>{
        let creator = actionCreators[v];
        bound[v] = bindActionCreator(creator,dispatch)
    })
    return bound
    //另一种函数式写法
    // return Object.keys(actionCreators).reduce((ret,item)=>{
    //     ret[item] = bindActionCreator(actionCreators[item],dispatch)
    // },{})
}