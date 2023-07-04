import React, { useContext, useState, useEffect } from 'react'
import { auth, usersCollection } from '../firebase'
import { getProfileImage } from '../firebase-storage'

import {
    updateDoc,
    doc,
    onSnapshot,
    setDoc
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




    const [profileImageUrl, setProfileImageUrl] = useState('wg')

    async function updateCurrentUserDetails(data) {
        try {
            if (!data || typeof data !== 'object') {
                throw new Error('Invalid data provided');
            }

            const userDoc = doc(usersCollection, currentUser.uid);
            await setDoc(userDoc, data);

            console.log('User details updated successfully');
            return true;
        } catch (error) {
            console.error('Error updating user details:', error);
            return false;
        }
    }


    useEffect(() => {

        if (currentUser) {
            const userDoc = doc(usersCollection, currentUser.uid)

            const unsubscribe = onSnapshot(userDoc, doc => {
                setUserDetails(doc.data())

            })




        }

        currentUser && getProfileImage(currentUser.uid)
            .then(url => {
                setProfileImageUrl(url)
                console.log(url)
            })
            .catch(error => {
                console.log(error)
            })



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
        userDetails,
        profileImageUrl,
        updateCurrentUserDetails
    }




    return (
        <authContext.Provider value={value}>
            {!loading && children}
        </authContext.Provider>
    )
}
