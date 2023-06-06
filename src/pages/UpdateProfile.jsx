import React, { useState, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { setUser } from "../firebase"
import { useAuth } from "../contexts/auth"
// import {changeUserEmailInDb} from "../db-utilities/ChangeData"


export default function UpdateProfile() {

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)


    const { currentUser , changeEmail , changePassword , changeUserEmailInDb } = useAuth()
    const navigate = useNavigate()


    const formRef = useRef(null)
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const confirmPasswordRef = useRef(null)


     function handleSubmit(e) {
        e.preventDefault()

        const promises = []

        if(emailRef.current.value !== currentUser.email){
            promises.push(changeEmail(emailRef.current.value))
        }

        // if(passwordRef.current.value === confirmPasswordRef.current.value){
        //     promises.push(changePassword(passwordRef.current.value))
        // }

      Promise.all(promises).then(()=>{
        promises.push(changeUserEmailInDb(currentUser.uid ,emailRef.current.value ))
        
        navigate("/login")
      }).catch(error =>{
        console.log(error)
      })
    }



    return (
        <div className="pageContainer flex flex-col items-center">
            <div className="formContainer">
                <div className="headerText mb-10">Update Profile</div>

                <form className="signUpForm" onSubmit={handleSubmit} ref={formRef}>

                    <input
                        className="formInput signupFormInput"
                        ref={emailRef}
                        // onChange={handleInputChange}
                        type="email"
                        name="email"
                        placeholder="Update Email"
                    // value=""
                    />
                    {/* <input
                        className="formInput signupFormInput"
                        ref={passwordRef}
                        // onChange={handleInputChange}
                        type="password"
                        name="password"
                        placeholder="Update Password"
                        // value=""
                        id="" />
                    <input
                        className="formInput signupFormInput"
                        ref={confirmPasswordRef}
                        type="password"
                        name="confirmPassword"
                        placeholder="confirm password"
                    /> */}
                    <button disabled={loading} className="btn-form">Update</button>
                </form>
                 <Link to="/">cancel</Link>
                <p className="text-red-600">{error}</p>
            </div>

        </div>
    )
}