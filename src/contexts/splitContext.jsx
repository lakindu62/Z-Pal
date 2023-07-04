import React, { useEffect, useState } from 'react'
import { useAuth } from './auth';

import { db } from '../firebase';
import { collection, doc, onSnapshot, setDoc } from 'firebase/firestore';
import { useLocation } from 'react-router-dom';
import { deepArrayCompare } from '../utils';


const SplitsContext = React.createContext(null);

export const useSplitsState = () => {
    const splits = React.useContext(SplitsContext)
    if (!splits) {
        throw new Error("useSplitsState must be used within the SplitsProvider")
    }

    return splits
};



export const SplitsProvider = ({ children }) => {

    const [splits, setSplits] = useState([])
    const [receivedSplits, setReceivedSplits] = useState([])




    const { currentUser, userDetails , updateCurrentUserDetails } = useAuth()

 // async function updateUserSplits(){
    //     await setDoc()
    // }

    useEffect(() => {
        if (userDetails && userDetails.userSplits) {
            const receviedSplitData = userDetails.userSplits
            setSplits(receviedSplitData);
            setReceivedSplits(receviedSplitData);

        }


    }, [currentUser, userDetails]);


    const location = useLocation()
   
    const data  = {
        ...userDetails,
        userSplits:splits
    }



    
    useEffect(() => {

        const isSplitsIncluded = (location.pathname.split('/').filter(e => {
            return e !== ''
        }).includes('splits'))

        console.log(isSplitsIncluded)

        if (!deepArrayCompare(splits, receivedSplits)) {

            if (!isSplitsIncluded) {
                console.log('LOCATION CHANGE =>', splits)


                updateCurrentUserDetails(data)
                

                setSplits(receivedSplits)
                return

            }

        }

    }, [location])


    const api = {
        splits,
        setSplits,

    }

    return (
        <SplitsContext.Provider value={api}>
            {children}
        </SplitsContext.Provider>
    )

}