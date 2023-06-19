import React, { useEffect, useState } from 'react'
import { nanoid } from 'nanoid';
import { useNavigate, useLocation } from 'react-router-dom';
import LogBodyPartSelection from '../../components/log/LogBodyPartSelection'
import LogExercise from '../../components/log/LogExercise';
import LogSet from '../../components/log/LogSet';
import DisplayLog from '../../components/log/DisplayLog';
import { useAuth } from '../../contexts/auth';
import { getDate } from '../../utils';
import { setDoc, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase'

export default function () {

    const { currentUser } = useAuth()
    const navigate = useNavigate()
    const [log, setLog] = useState({

    });
    const [isBodypartsSelected, setIsBodypartsSelected] = useState(false)
    const [isAddExerciseActive, setIsAddExerciseActive] = useState(false)
    const [isSetActive, setIsSetActive] = useState(false)

    const [selectedBodyPart, setSelectedBodyPart] = useState("")
    const [selectedExercise, setSelectedExercise] = useState("")
    const [exerciseInput, setExerciseInput] = useState("")

    const [setInput, setSetInput] = useState({ reps: '', weight: '' })


    const location = useLocation()




    useEffect(() => {
        console.log(location.state ? location.state : null)
        const date = location.state
        if (location.state) {
            const path = `/users/${currentUser.uid}/userLogs/${date}`
            console.log(path)
            const docRef = doc(db, path)

            onSnapshot(docRef, snapshot => {
                console.log(snapshot)
                setLog(snapshot.data())

            })
        }

    }, [location])






    // Function to handle checkbox change
    function handleCheckboxChange(e) {
        const checkboxValue = e.target.value
        setLog(prevLog => {
            if (e.target.checked) {
                return {
                    ...prevLog,
                    [checkboxValue]: {

                    }




                }
            } else {
                const { [checkboxValue]: removedProperty, ...updatedDictionary } = prevLog
                return updatedDictionary
            }
        })
    }


    function addExercise(bodyPart, exercise) {
        setLog(prevLog => {


            const updatedExercisesObj = { ...prevLog[bodyPart], [exercise]: [] }


            return {
                ...prevLog,
                [bodyPart]: updatedExercisesObj
            }


        }

        )
    }




    function handleAddSet(currentBodyPart, selectedExercise, setInput) {
        setLog((prevLog) => {
            return {
                ...prevLog,
                [currentBodyPart]: {
                    ...prevLog[currentBodyPart],
                    [selectedExercise]: [
                        ...prevLog[currentBodyPart][selectedExercise],
                        {
                            set: prevLog[currentBodyPart][selectedExercise].length + 1,
                            rep: setInput.reps,
                            weight: setInput.weight
                        }
                    ]
                }
            };
        });
    }

    function handleRemoveSet(bodyPartKey, exercise, set) {
        setLog((prevLog) => {
            const updatedLog = { ...prevLog };
            const exerciseSets = updatedLog[bodyPartKey][exercise];
            const filteredSets = exerciseSets.filter((setObj) => setObj.set !== set);
            updatedLog[bodyPartKey][exercise] = filteredSets;
            return updatedLog;
        });
    }








    function handleIsBodypartsSelected() {
        setIsBodypartsSelected(!isBodypartsSelected)
    }
    function handleisAddExerciseActive(bodyPart) {
        setIsAddExerciseActive(!isAddExerciseActive)
        setSelectedBodyPart(bodyPart)
    }

    function handleIsSetActive(selectedBodyPart, selectedExercise) {

        console.log('selectedBodyPart:', selectedBodyPart);
        console.log('selectedExercise:', selectedExercise);


        setIsSetActive(!isSetActive)
        setIsAddExerciseActive(false)
        setSelectedBodyPart(selectedBodyPart)
        setSelectedExercise(selectedExercise)
    }


    function closeAddExercise() {
        setIsAddExerciseActive(!isAddExerciseActive)

    }




    function closeAddSet() {
        setIsSetActive(!isSetActive)
    }






    function handleRepsChange(e) {
        setSetInput(prevSet => ({
            ...prevSet,
            reps: e.target.value
        }));
    }

    function handleWeightChange(e) {
        setSetInput(prevSet => ({
            ...prevSet,
            weight: e.target.value
        }));
    }

    function handleSetLogtoDb() {


        const docRef = doc(db, `/users/${currentUser.uid}/userLogs/${location.state ? location.state : getDate()}`)
        setDoc(docRef, log)
            .then(() => {
                navigate('/progress')
            })
            .catch(err => {
                console.log(err)
            })
    }




    console.log("original log = > ", log && log)

    const loggedBodyPartsElement = Object.entries(log)?.map(([bodyPartKey, value]) => {
        return <div key={nanoid()} className='w-full flex justify-center items-center flex-col mt-4 '>
            <div className='w-3/4 h-[50px] bg-white flex justify-between items-center px-5 shadow-md rounded-3xl text-lg'>
                <span>{bodyPartKey}</span>
                <img onClick={() => handleisAddExerciseActive(bodyPartKey)} src="/icons/add-black.svg" alt="" />
            </div>

            {Object.entries(value)?.map(([exercise, exerciseValue]) => {
                return <div key={nanoid()} className=' w-full flex justify-center items-center flex-col'>
                    <div onClick={() => handleIsSetActive(bodyPartKey, exercise)} className='flex items-center justify-center  gap-6 px-14 h-[40px] w-[50%] mt-4  bg-background-200  shadow-inner text-slate-600  rounded-3xl  '>
                        {exercise}
                        <img src="/icons/add-grey.svg" alt="" />
                    </div>
                    <div className=' flex flex-col justify-center '>
                        {exerciseValue?.map(setObj => {
                            console.log(exerciseValue)
                            return (
                                <div key={nanoid()} className=''>
                                    <div className='flex gap-10 mt-3 text-slate-500 text-xs'>
                                        <div className='flex justify-between gap-3 min-w-min '>
                                            <div className='flex gap-2'><span>Set 0{setObj.set}</span><span>::</span></div>
                                            <div className='flex gap-3 rounded-lg shadow-inner'>
                                                <span>Reps {setObj.rep}</span>
                                                <span>|</span>
                                                <span>Weight {setObj.weight}kg</span>
                                            </div>
                                        </div>
                                        <img onClick={() => handleRemoveSet(bodyPartKey, exercise, setObj.set)} src="/icons/remove-grey.svg" alt="" />

                                    </div>
                                    <span className='h-0.5 w-full mt-1 bg-background-200 block'></span>
                                </div>
                            )
                        })}
                    </div>
                </div>



            })}
        </div>
    })










    return (

        !isBodypartsSelected && !location.state ?

            <LogBodyPartSelection
                handleCheckboxChange={handleCheckboxChange}
                handleIsBodypartsSelected={handleIsBodypartsSelected}
            />

            :

            <div className='relative bg-background-100'>
                <DisplayLog
                    loggedBodyPartsElement={loggedBodyPartsElement}
                    dateFromLocation={location.state}
                />
                <div className='w-full flex justify-center mt-5 pb-5 bg-background-100'>
                    <button onClick={handleSetLogtoDb} className='mt-10 bg-iphoneBlue-100 text-white px-5 py-1 rounded-xl'>{location.state ? ' Update Log' : 'Finish Log'}</button>
                </div>
                <LogExercise
                    bodyPart={selectedBodyPart}
                    exerciseInput={exerciseInput}
                    setExerciseInput={setExerciseInput}
                    addExercise={addExercise}
                    closeAddExercise={closeAddExercise}
                    isAddExerciseActive={isAddExerciseActive}
                />
                <LogSet
                    setInput={setInput}
                    handleRepsChange={handleRepsChange}
                    handleWeightChange={handleWeightChange}
                    closeAddSet={closeAddSet}
                    isSetActive={isSetActive}
                    addSet={handleAddSet}
                    bodyPart={selectedBodyPart}
                    selectedExercise={selectedExercise}
                    setSetInput={setSetInput}
                    handleIsSetActive={handleIsSetActive}
                />


            </div>
    )
}
