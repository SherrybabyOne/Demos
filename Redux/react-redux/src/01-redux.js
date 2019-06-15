const defaultState = {
    num: 0
}
//reducer
export function counter(state=defaultState,action){
    console.log(state,action)
    switch(action.type){
        case 'add':
            return  {...state,num: state.num+1}
        case 'remove':
            return {...state,num: state.num-1}
        default:
            return {num:0}
    }
}
//action
export function addNum(){
    return {type:'add'}
}
export function removeNum(){
    return {type:'remove'}
}
export function addNumAsync(){
    return dispatch => {
        setTimeout(()=>{
            dispatch(addNum())
        },1000)
    }
}
export function addNumDouble(){
    return [{type: 'add'},{type: 'add'}]
}
