import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, doc, onSnapshot } from 'firebase/firestore'
import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore';

import { useAuth } from '../contexts/auth';
import { getDate, dateWithFormat, getYesterdaysDate } from '../utils'


const Tabs = () => {
    const { currentUser } = useAuth()

    const [bodyParts, setBodyParts] = useState([])
    const [activeTab, setActiveTab] = useState("#");
    const handleTabClick = (target) => {
        setActiveTab(target);
    };



    const [date, setDate] = useState(new Date());
    const modifyDate = (amount) => {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + amount);
        setDate(newDate);

    };
    function getDateEl() {
        if (dateWithFormat(date) === getDate()) {
            return 'Today'
        } else if (getYesterdaysDate() == dateWithFormat(date)) {
            return 'Yesterday'
        } else {
            return dateWithFormat(date)
        }
    }

    const [isInputVisible, setInputVisible] = useState(false);

    const handleInputDataClick = () => {
        setInputVisible(!isInputVisible);
    };



    function handleDateSubmit(date) {
        console.log("this is the selected date", date)
        const selectedDate = new Date(date)
        setDate(selectedDate)
        setInputVisible(!isInputVisible);

    }


    const path = `/users/${currentUser.uid}/userLogs/${dateWithFormat(date)}`
    const docRef = doc(db, path)













    useEffect(() => {
        onSnapshot(docRef, (snapshot) => {
            const data = snapshot.data();

            if (!data) {
                setBodyParts(null)
                return
            }

            const updatedBodyParts = Object.keys(data).map((key) => ({
                [key]: {
                    name: key,
                    exercises: data[key],
                },
            }));
            setBodyParts(updatedBodyParts);
        });
    }, [path]);



    useEffect(() => {
        if (bodyParts?.length > 0) {
            const initialTab = `#${Object.keys(bodyParts[0])[0]}`;
            setActiveTab(initialTab);
        }
    }, [bodyParts]);









    return (
        <div className='w-full flex items-center justify-center flex-col'>
            <div className='w-11/12 text-center text-lg  font-bold'>Log History</div>
            <div className='w-11/12 bg-white rounded-3xl '>
                <div className='flex justify-between px-2 py-2'>
                    <div className='w-1/4'></div>
                    <div className='flex gap-3'>
                        <img onClick={() => modifyDate(-1)} src="/icons/backwards.svg" alt="" />
                        <span onClick={handleInputDataClick}>{getDateEl()}</span>
                        <img onClick={() => modifyDate(+1)} src="/icons/forwards.svg" alt="" />

                        {isInputVisible && <InputDate handleDateSubmit={handleDateSubmit} />}
                    </div>

                    <div className='w-1/4'>
                        <button className=''>Relog</button>
                    </div>
                </div>
                <div className='flex flex-col items-center  '>
                    <div className='bg-background-100 p-2 px-4 rounded-xl'>
                        <ul className="flex gap-3   list-none first">
                            {bodyParts?.map((data) => {
                                const bodyPartName = Object.keys(data)[0]
                                return (<li
                                    className={`tab cursor-pointer  ${activeTab === `#${bodyPartName}` ? 'active' : ''}
                                     text-black px-3 text-sm  rounded-xl relative after:content-[''] after:h-5/6 after:w-[2px] after:block after:absolute after:left-0 after:bg-background-200 after:top-[10%] first:after:w-0
                                    `}
                                    onClick={() => handleTabClick(`#${bodyPartName}`)}
                                >
                                    {bodyPartName}
                                </li>)
                            })}
                        </ul>
                    </div>
                    <div className="tab-content mt-5 bg-slate-200 ">
                        {bodyParts?.map(data => {
                            const bodyPartName = Object.keys(data)[0]
                            const exercisesObj = data[bodyPartName].exercises
                            const array = Object.entries(exercisesObj).map(([key, value]) => {
                                return { [key]: value }

                            })



                            return (
                                <div
                                    id="home"
                                    data-tab-content
                                    className={`tab-pane ${activeTab === `#${bodyPartName}` ? 'active' : ''} `}
                                >
                                    {array.map(exercise => {
                                        return <DisplayBodyPart
                                            exercise={exercise}
                                        />
                                    })}
                                    {/* <h1>{array}</h1> */}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};



function DisplayBodyPart({ exercise }) {
    const exerciseName = Object.keys(exercise)[0]
    const sets = exercise[exerciseName]
    return (
        <div className={`flex gap-5 p-5 justify-between items-center `}>
            <div className='  tracking-wider w-[40%]'>{exerciseName}</div>
            <span className=' w-[3px]  bg-background-200 block  rounded-lg h-full'  ></span>
            <div className="pl-5 relative exerciseName flex flex-col justify-between items-center gap-3 w-[60%] text-slate-500 text-xs">
                {sets.map((set, index) => {
                    return (<div className='flex'>
                        <div className="flex gap-2">
                            <span>{`Set ${index + 1}`}</span>
                            <span>::</span>
                        </div>
                        <div className="flex gap-3 ">
                            <span>{`Reps ${set.rep}`}</span>
                            <span>|</span>
                            <span>{`Weight ${set.weight}`}</span>
                        </div>
                    </div>)
                })}
            </div>
        </div>
    )
}


function InputDate({ handleDateSubmit }) {

    const [date, setDate] = useState('')
    console.log(date)



    function handleSubmit(e) {
        e.preventDefault()
        handleDateSubmit(date)

    }



    return (

        <div className='fixed bottom-0   left-0  w-screen'>
            <div className='bg-white h-20 w-screen flex items-center justify-center'>

                <form action="" onSubmit={handleSubmit}>
                    <input
                        type="date"
                        className=' '
                        onChange={e => setDate(e.target.value)}

                    />
                    <button
                        type='submit'
                    >Enter

                    </button>
                </form>


            </div>

        </div>

    )
}


export default Tabs;
