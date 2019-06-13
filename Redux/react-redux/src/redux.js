export function createStore(reducer){
    let preloadedState = undefined;
    let currentState = preloadedState;
    let currentListener = [];

    function getState(){
        return currentState
    }
    function subscribe(listener){
        currentListener.push(listener)
    }
    function dispatch(action){
        currentState = reducer(currentState,action)
        currentListener.forEach(v=>v());
        return action
    }
    dispatch({type:'@IMOOC-REACT-REDUX'})
    return {getState,subscribe,dispatch}
}