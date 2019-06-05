

const arrayThunk = ({getState,dispatch})=>next=>action=>{
    //如果是函数，执行一下，参数是dispatch、getState
    if(Array.isArray(action)){
        action.forEach(v=>dispatch(v))
    }
    //如果不符合我们的要求，直接调用下一个中间件，使用next
    //如果符合我们的要求，需要重新dispatch，调用dispatch即可
    return next(action)
}