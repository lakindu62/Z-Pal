import React, { useContext, useState, useEffect } from 'react'
import { auth, usersCollection } from '../firebase'

import {
    updateDoc,
    doc,
    onSnapshot
} from "firebase/firestore"

import {
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateEmail,
    updatePassword,
    sendPasswordResetEmail,

} from "firebase/auth"


const authContext = React.createContext()

export function useAuth() {
    return useContext(authContext)
}



export default function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState()
    const [userDetails, setUserDetails] = useState({})
    const [loading, setLoading] = useState(true)


    function signup(email, password) {

        return createUserWithEmailAndPassword(auth, email, password);
        // Account creation successful

    }

    async function login(email, password) {
        try {
            const userCredentials = await signInWithEmailAndPassword(auth, email, password)
            const user = userCredentials.user
            console.log(user.email, "signed in")
        } catch (error) {
            throw error;
        }

    }

    function logout() {
        signOut(auth)
            .then(() => {
                console.log("user Signed out")
            })
    }

    function changeEmail(email) {
        return updateEmail(auth.currentUser, email)
    }


    function changeUserEmailInDb(userid, userEmail) {

        const userDoc = doc(usersCollection, userid)
        console.log(currentUser.uid, "->", currentUser.email)
        return updateDoc(userDoc, {
            email: userEmail
        })

    }



    function changePassword(password) {
        return updatePassword(auth.currentUser, password)
    }


    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email)

    }






    useEffect(() => {
        onAuthStateChanged(auth, user => {
            setCurrentUser(user)
            setLoading(false)
            // console.log("Signed in " ,user)
        })


    }, [])


    useEffect(() => {

        if (currentUser) {
            const userDoc = doc(usersCollection, currentUser.uid)

            onSnapshot(userDoc, doc => {
                setUserDetails(doc.data())

            })
        }



    }, [currentUser])






    const value = {
        currentUser,
        signup,
        login,
        logout,
        changeEmail,
        changePassword,
        resetPassword,
        changeUserEmailInDb,
        userDetails

    }


    return (
        <authContext.Provider value={value}>
            {!loading && children}
        </authContext.Provider>

    )
}
