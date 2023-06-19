import { publicRequest } from "../AxiosReq";
import { loginStart, loginSucess, loginError } from "./UserSlice";


const Apicall=async(dispatch,data)=>{
dispatch(loginStart())
try{
    const res= await publicRequest.post("/auth/login", data)
    dispatch(loginSucess(res.data))
}catch(e){
    dispatch(loginError())
}
}

export default Apicall;