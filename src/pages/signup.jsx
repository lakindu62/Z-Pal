import React, { useState, useRef } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { setUser } from "../firebase"
import { useAuth } from "../contexts/auth"



export default function Signup() {

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)


    const { signup, currentUser } = useAuth()
    const navigate = useNavigate()


    const formRef = useRef(null)
    const fNameRef = useRef(null)
    const sNameRef = useRef(null)
    const dobRef = useRef(null)
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const confirmPasswordRef = useRef(null)


    
    async function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== confirmPasswordRef.current.value) {
            return setError("passwords do not match")
        }

        try {





            const userCredentials = await signup(emailRef.current.value, passwordRef.current.value)
                
          
                    const userParams = {
                        email: emailRef.current.value,
                        fName: fNameRef.current.value,
                        sName: sNameRef.current.value,
                        dob: dobRef.current.value,
                        userId: userCredentials.user.uid
                    }

                    setUser(userParams)
             

            setError('')
            setLoading(true)





            navigate('/')



        } catch (error) {
            console.log(error)
            setError("Failed to create an account : email already in use")

        }
        setLoading(false)
    }



    return (
        <div className="pageContainer">
            {currentUser && JSON.stringify(currentUser.uid)}

            <div className="formContainer">
                <div className="headerText mb-10">Sign up</div>
                <form className="signUpForm" onSubmit={handleSubmit} ref={formRef}>
                    <input
                        className="formInput signupFormInput"
                        ref={fNameRef}
                        // onChange={handleInputChange}
                        type="text"
                        name="fName"
                        placeholder="FirstName"
                    // value=""
                    />

                    <input
                        className="formInput signupFormInput"
                        ref={sNameRef}
                        // onChange={handleInputChange}
                        type="text"
                        name="sName"
                        placeholder="SecondName"
                    // value=""
                    />

                    <input
                        className="formInput signupFormInput"
                        ref={dobRef}
                        // onChange={handleInputChange}
                        type="date"
                        name="dob"
                        placeholder="Date Of Birth"
                    // value=""
                    />
                    <input
                        className="formInput signupFormInput"
                        ref={emailRef}
                        // onChange={handleInputChange}
                        type="email"
                        name="email"
                        placeholder="Email"
                    // value=""
                    />
                    <input
                        className="formInput signupFormInput"
                        ref={passwordRef}
                        // onChange={handleInputChange}
                        type="password"
                        name="password"
                        placeholder="Password"
                        // value=""
                        id="" />
                    <input
                        className="formInput signupFormInput"
                        ref={confirmPasswordRef}
                        type="password"
                        name="confirmPassword"
                        placeholder="confirm password"
                    />
                    <button disabled={loading} className="btn-form">Sign Up</button>
                </form>
                <p>already signed in?</p> <Link to="/login"> log in</Link>
                <p className="text-red-600">{error}</p>
            </div>

        </div>
    )
}