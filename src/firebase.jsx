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



const firebaseConfig = {
    apiKey: import.meta.env.VITE_APIKEY,
    authDomain: import.meta.env.VITE_AUTHDOMAIN ,
    projectId: import.meta.env.VITE_PROJECTID,
    storageBucket: import.meta.env.VITE_STORAGEBUCKET,
    messagingSenderId:import.meta.env.VITE_MESSAGINGSENDERID,
    appId: import.meta.env.VITE_APPID ,
    measurementId: import.meta.env.VITE_MEASUREMENTID
  };


const  app = initializeApp(firebaseConfig)
const auth = getAuth()
const db = getFirestore()

const usersCollection = collection(db , "users")
const {currentUser} = useAuthContext()




function setUser({email , fName , sName , dob  , userId}){
    const userDoc = doc(usersCollection , userId)
    return setDoc(userDoc, {
        email,
        fName,
        sName,
        dob
    })
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




