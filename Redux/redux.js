export function createStore(reducer, enhancer){
    if(enhancer){
        return enhancer(createStore)(reducer)
    }
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

export function applyMiddleware(...middlewares){
    return createStore => (...args) => {
        const store = createStore(...args);
        let dispatch = store.dispatch;

        const midApi = {
            getState: store.getState,
            dispatch: (...args)=>dispatch(...args)
        }
        let middlewareChain = middlewares.map(middleware=>middleware(midApi));
        dispatch = compose(...middlewareChain)(store.dispatch)
        // dispatch = middleware(midApi)(store.dispatch)
        //middleware(midApi)(store.dispatch)(action)
        return {
            ...store,
            dispatch
        }
    }
}
// compose(fn1,fn2,fn3)
// fn1(fn2(fn3))
function compose(...funcs){
    if(funcs.length===0){
        return arg=>arg
    }else if (funcs.length===1){
        return funcs[0]
    }else{
        return funcs.reduce((ret,item)=>(...args)=>ret(item(...args)))
    }
}

function bindActionCreator(creator,dispatch){
    return (...args) => dispatch(creator(...args))
}
export function bindActionCreators(actionCreators,dispatch){
    // let bound = {};
    // Object.keys(actionCreators).forEach(v => {
    //     let creator = actionCreators[v];
    //     bound[v] = this.bindActionCreator(creator,dispatch)
    // });
    // return bound
    //另一种写法：
    return Object.keys(actionCreators).reduce((ret,item)=>{
        ret[item] = bindActionCreator(actionCreators[item],dispatch)
        return ret
    },{})
}