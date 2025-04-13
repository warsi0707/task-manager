import { useCallback, useEffect, useState } from "react"
import AuthContext from "./AuthContext"
import { BackendUrl } from "../utils/BackendUrl";
import toast from "react-hot-toast";


export default function AuthProvider({children}) {
    const [authenticated, setAuthenticated] = useState(false)

    const verifyLogin =useCallback(async() => {
        try{
            const response = await fetch(`${BackendUrl}/user/verify`, {
                method: "GET",
                credentials: "include",
              });
              const result = await response.json();
              console.log(result)
              if (result.authenticated === true) {
                setAuthenticated(true);
              } else {
                setAuthenticated(false);
              }
        }catch(error){
            toast.error(error.message)
        }
        
      },[])
      useEffect(()=>{
        verifyLogin()
      },[verifyLogin])
  return (
    <div>
      <AuthContext.Provider value={{authenticated, setAuthenticated}}>
        {children}
      </AuthContext.Provider>
    </div>
  )
}
