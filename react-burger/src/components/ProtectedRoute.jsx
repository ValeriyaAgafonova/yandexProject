import { useSelector } from "react-redux"
import { Redirect } from "react-router-dom"


const ProtectedRoute = ({ children, path }) =>{
const userName = useSelector(state => state.auth.userName);
console.log(userName)
if(!userName){
    console.log('if', path)
   return (
    <Redirect
    to={{
      pathname: path
    }}
  />
   ) 
}
else{
    return (
           children

    )
}

}

export default ProtectedRoute