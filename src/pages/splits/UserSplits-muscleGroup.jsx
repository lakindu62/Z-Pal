
import React, { useEffect, useState } from 'react'
import { useSplitsState } from '../../contexts/splitContext';
import { nanoid } from 'nanoid';
import { Link, Navigate, useNavigate, useNavigation, useParams } from 'react-router-dom';
import AddButton from '../../components/splits/AddButton';
import LogForm from '../../components/log/LogForm';


const SplitsMuscleGroup = () => {
    const params = useParams()
    // const navigate = useNavigate()

    // useEffect(() => {
    //     const handleBeforeUnload = (event) => {
    //         event.preventDefault()
    //         navigate('/settings')
    //     }

    //     window.addEventListener('beforeunload', handleBeforeUnload)

    //     return () => {
    //         window.removeEventListener('beforeunload', handleBeforeUnload)
    //     }
    // }, [navigate])



    const { splits, setSplits } = useSplitsState();

    const split = splits.find(split => {

        return split.id === params.id
    })


    function handleRemoveMuscleGroup(key){
        console.log('clicked')

        setSplits(prev=>{

        })
        delete split.muscleGroups[key]
    }


    const muscleGroups = split && Object.entries(split.muscleGroups)
        .map(([key, value], index) => {


            const id = index + 1


            return (

                <div className='flex w-full bg-background-200 py-1 px-4 justify-center rounded-lg  ' key={id}>
                    <Link   className='bg-background-200 py-1 w-full flex justify-center rounded-lg'
                            to={`/settings/splits/${split.id}/${key}`}
                            state={value}
                             >
                            {key}
                    </Link>
                    <img src="/icons/remove-grey.svg" onClick={() =>handleRemoveMuscleGroup(key)} alt="" />

                </div>
            )
        })



    function handleSplitActive() {
        setSplits((prev) => {
            return prev.map(split => {
                if (split.id === params.id) {
                    return {
                        ...split,
                        isActive: !split.isActive
                    }
                }
                return {
                    ...split,
                    isActive: false
                }
            })
        });
    }

    const navigate = useNavigate()

    function handleRemoveSplit() {
        setSplits(prev => {
            return (
                prev.filter(split => {
                    return split.id !== params.id
                })
            )
        })

        navigate('/settings/splits')

    }

    console.log(splits)


    const [newMuscleGroup, setNewMuscleGroup] = useState('')
    const [isFormActive, setIsFormActive] = useState(false)

    function handleFormActive() {
        setIsFormActive(!isFormActive)
    }

    function handleAddMuscleGroup() {


        setSplits((prev) => {
            return prev.map(split => {
                if (split.id === params.id) {
                    return {
                        ...split,
                        muscleGroups: {
                            ...split.muscleGroups,
                            [newMuscleGroup]: []
                        }
                    }
                }
                return split
            })
        });
    }








    return (
        <div className='w-full mt-10  flex flex-col items-center h-[60vh] justify-evenly'>
            <div className='w-full flex flex-col items-center'>
                <div className='w-3/4 flex justify-between mb-10'>
                    <div className='underline underline-offset-2  tracking-wider text-lg uppercase '>{split?.name}</div>
                    <div className='flex gap-3 ' >
                        <button className='flex  items-center ' onClick={handleSplitActive}>
                            <span className={`tracking-wide ${split?.isActive ? 'text-green-700' : ''}`}>Active</span>
                            <img className={`w-4 duration-200 `} src={`${split?.isActive ? '/icons/active-green.svg' : '/icons/add-blue.svg'}`} alt="" />
                        </button>
                        <button onClickCapture={handleRemoveSplit} className='bg-iphoneBlue-100 text-white px-2 rounded-lg font-thin tracking-wide py-1'>Remove</button>
                    </div>
                </div>
                <div className='flex flex-col w-3/4 justify-cenwter items-center gap-2 mb-20'>
                    {muscleGroups}
                </div>
            </div>

            <AddButton
                handleFormActive={handleFormActive}
                btnName='Muscle Group'
            />

            <LogForm
                title='Add Muscle Group'
                onSubmit={(e) => {
                    e.preventDefault()
                    handleAddMuscleGroup(e)
                }}
                onCancel={handleFormActive}
                inputLabel='Muscle Group'
                inputPlaceholder='Muscle Group'
                inputValue={newMuscleGroup}
                setInputValue={setNewMuscleGroup}
                isFormActive={isFormActive}

            />



        </div>
    );

}

export default SplitsMuscleGroup

// [
//     {
//         "isActive": true,
//         "name": "oneDocAll",
//         "id": "random",
//         "muscleGroups": {
//             "Back": [
//                 "Lat pull downs",
//                 "Barbell rows"
//             ],
//             "Chest": [
//                 "Bench press",
//                 "Flies"
//             ]
//         }
//     }
// ]
