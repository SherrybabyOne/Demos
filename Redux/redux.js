export function createStore(reducer,enhancer){
    if(enhancer){
        return enhancer(createStore)(reducer)
    }
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

export function applyMiddleware(...middlewares){
    return createStore=>(...args)=>{
        const store = createStore(...args)
        let dispatch = store.dispatch;

        const midApi = {
            getState: store.getState,
            dispatch: (...args)=>dispatch(...args)
        }
        const middlewareChain = middlewares.map(middleware=>middleware(midApi))
        dispatch = compose(...middlewareChain)(store.dispatch)
        // dispatch = middleware(midApi)(store.dispatch)
        // middleware(midApi)(store.dispatch)(action)
        return {
            ...store,
            dispatch
        }
    }
}

// compose(fn1,fn2,fn3)
// fn1(fn2(fn3()))
export function compose(...funcs){
    if(funcs.length === 0){
        return arg=>arg
    }
    if(funcs.length === 1){
        return funcs[0]
    }
    return funcs.reduce((ret,item) => (...args)=>ret(item(...args)))
}

//{addGun,removGun}
//addGun(参数)
//dispatch(addGun(参数))
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