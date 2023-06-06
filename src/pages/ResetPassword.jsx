import React, { useRef, useState } from "react"
import { useAuth } from "../contexts/auth"
import { Link, useNavigate } from "react-router-dom"


export default function ResetPassword() {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [message , setMessage] = useState("")

    const {  resetPassword  } = useAuth()
    const navigate = useNavigate()

    const emailRef = useRef(null)
    const passwordRef = useRef(null)




    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setMessage("")
            setError("")
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage("check your inbox for further instructions")

        } catch {
            setError("Failed to reset password")
        }
        setLoading(false)
    }

    return (

        <div className="flex flex-col justify-center items-center h-[80vh] gap-4 ">
            <div className="border border-stone-300 rounded p-10">
                <div className="headerText mb-10">Password Reset</div>
                <div className="mb-5 text-blue-500 text-center">{message}{error}</div>
                <form className="flex flex-col mb-5" onSubmit={handleSubmit}>
                    <input
                        ref={emailRef}
                        className="formInput"
                        type="email"
                        name="email"
                        placeholder="Email" required
                    />
                    <button disabled={loading} className="btn-form btn-password-reset">Send</button>
                </form>
                <div className="flex flex-col items-center">
                    <p>{error}</p>
                    <Link to="/login" className="text-blue-500 mb-5 ">Login</Link>
                </div>


            </div>
            <div>
                <p>Need an account ? <Link to="/signup" >SignUp</Link> </p>
            </div>
        </div>
    )
}