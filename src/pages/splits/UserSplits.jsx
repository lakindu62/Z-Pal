import React, { useEffect, useState } from 'react'
import { useSplitsState } from '../../contexts/splitContext'
import { Link } from 'react-router-dom'
import LogForm from '../../components/log/LogForm'
import AddButton from '../../components/splits/AddButton'
import { nanoid } from 'nanoid'





const Splits = () => {

    const { splits, setSplits } = useSplitsState()

    const splitsEl = splits?.map(split => {
        return (
            <div className='w-full flex relative after:w-full after:block after:h-[2px] after:bg-background-100 after:absolute after:bottom-0 after:rounded-2xl ' key={split.id}>
                <Link  className=' py-2 px-3 w-full'   to={`/settings/splits/${split.id}`}>{split.name}</Link>
                <img src="/icons/forwards.svg"  alt="" />
            </div>
        )
    })

    const [newSplit, setNewSplit] = useState('')
    const [isSplitFormActive, setIsSplitFormActive] = useState(false)


    function handleAddSplits(e) {
        setSplits(prev => {
            return [
                ...prev,
                {
                    id: nanoid(),
                    name: newSplit,
                    muscleGroups: {},
                    isActive: false

                }
            ]
        })
    }

    function handleFormActive(){
        setIsSplitFormActive(!isSplitFormActive)
    }

    function closeAddSplit() {

    }




    return (
        <div className='w-full flex flex-col justify-center items-center h-[70vh]'>
            <div className='px-5 py-2 bg-background-200 w-10/12 mb-16 rounded-3xl '>
                <div className='flex flex-col gap-3 items-center w-full pt-5 pb-9 '>
                    {splitsEl}
                </div>
            </div>
            <AddButton
             handleFormActive={handleFormActive}
             btnName = 'split'
            />
       
            <LogForm
                title='Add Split'
                onSubmit={(e) => {
                    e.preventDefault()
                    handleAddSplits(e)
                }}
                onCancel={handleFormActive}
                inputLabel='split'
                inputPlaceholder='split'
                inputValue={newSplit}
                setInputValue={setNewSplit}
                isFormActive={isSplitFormActive}

            />
        </div>
    )
}

export default Splits
