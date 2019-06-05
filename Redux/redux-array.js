

const arrayThunk = ({getState,dispatch})=>next=>action=>{
    //如果是函数，执行一下，参数是dispatch、getState
    if(Array.isArray(action)){
        action.forEach(v=>next(v))
    }

    //默认什么都没干
    return next(action)
}