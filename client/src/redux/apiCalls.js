import { publicRequest } from "../requestMethods"
import { loginFailuer, loginStart, loginSuccess } from "./userRedux"

export const login = async (dispatch,user)=>{
    dispatch(loginStart())
    try{
        const res = await publicRequest.post("auth/login",user)
        dispatch(loginSuccess(res.data))
    }catch(err){
        dispatch(loginFailuer())
    }

} 