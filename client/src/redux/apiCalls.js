import { publicRequest, userRequest } from "../requestMethods"
import { loginFailuer, loginStart, loginSuccess } from "./userRedux"
import { getOrdersStart, getOrdersSuccess, getOrdersFailure } from "./ordersRedux"

export const login = async (dispatch,user)=>{
    dispatch(loginStart())
    try{
        const res = await publicRequest.post("auth/login",user)

        dispatch(loginSuccess(res.data))
    }catch(err){
        dispatch(loginFailuer())
    }
} 


export const getOrders = async (dispatch, userId)=>{
    dispatch(getOrdersStart())
    try{
        const res = await userRequest.get(`/orders/find/${userId}`)
        dispatch(getOrdersSuccess(res.data))
    }catch(err){
        dispatch(getOrdersFailure())
        console.log(err)
    }
}