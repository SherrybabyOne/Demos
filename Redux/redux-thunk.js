

const thunk = ({getState,dispatch})=>next=>action=>{
    //如果是函数，执行一下，参数是dispatch、getState
    if(typeof action ==='function'){
        return action(dispatch,getState)
    }

    //默认什么都没干
    return next(action)
}