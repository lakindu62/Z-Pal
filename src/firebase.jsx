import { useEffect } from 'react'
import {initializeApp} from 'firebase/app'
import {
    getFirestore,
    collection,
    onSnapshot,
    doc , addDoc , setDoc , updateDoc , deleteDoc , getDoc
} from 'firebase/firestore'
import {
    getAuth,
    signInWithEmailAndPassword,
} from 'firebase/auth'
import { useLocation } from 'react-router-dom'





const firebaseConfig = {
    apiKey: "AIzaSyAw9jutLxgF7aeDqux5z5TX-EIoADkExDI",
    authDomain: "fir-9-dojo-a880f.firebaseapp.com",
    projectId: "fir-9-dojo-a880f",
    storageBucket: "fir-9-dojo-a880f.appspot.com",
    messagingSenderId:"993497437100",
    appId: "1:993497437100:web:bfbdcd7aa62bf23c33e009",
    measurementId: "G-PC8S4TJ553"
  };


const  app = initializeApp(firebaseConfig)
const auth = getAuth()
const db = getFirestore()

const usersCollection = collection(db , "users")





function setUser({email , fName , sName , dob  , userId}){
    const userDoc = doc(usersCollection , userId)
    return setDoc(userDoc, {
        email,
        fName,
        sName,
        dob
    })
}

function getUserSplits(){

}


async function createDocumentWithCollection(path, documentData) {
    const pathParts = path.split('/');
    const collectionPath = pathParts.slice(0, -1).join('/');
    const documentId = pathParts[pathParts.length - 1];
  
    // Create the collection if it doesn't exist
    const collectionRef = db.collection(collectionPath);
    await collectionRef.doc(documentId).set(documentData);
  
    console.log(`Document created at path: ${path}`);
  }


  async function setLog(path , logData){
    const userLogRef = doc(db , path)



  }



export {auth , usersCollection , setUser ,db }
export default app




