import React , {useRef , useState} from "react"
import {useAuth} from "../contexts/auth"
import {Link , useNavigate} from "react-router-dom"


export default function Login(){

    const [loading , setLoading] = useState(false)
    const [error , setError] = useState("")

    const {login , currentUser} = useAuth()
    const navigate= useNavigate()

    const emailRef = useRef(null)
    const passwordRef = useRef(null)




    async function handleSubmit(e){
        e.preventDefault()
        try{
            setLoading(true)
            await login(emailRef.current.value , passwordRef.current.value)
            navigate("/")
            
        }catch{
            setError("Incorrect password")
        }
        setLoading(false)
    }

    return(
        
        <div className="flex flex-col justify-center items-center h-[80vh] gap-4 ">
            {currentUser && JSON.stringify(currentUser.uid)}

            <div className="headerText">Log in</div>

        <form className="flex flex-col" onSubmit={handleSubmit}>
            <input
                ref={emailRef}
                className="formInput" 
                type="email" 
                name="email" 
                placeholder="Email" required
                 />
            <input
                ref={passwordRef}
                className="formInput" 
                type="password" 
                name="password" 
                placeholder="Password" required
                 />
            <button disabled={loading} className="btn-form">Login</button>
        </form>





        <div className="flex flex-col items-center">
         <p>{error}</p>
            <Link to="/reset-password" className="text-red-500">forgot password?</Link>
            <p>Dont have a account ? </p><Link to="/signup" >SignUp</Link>
        </div>
        </div>
    )
}