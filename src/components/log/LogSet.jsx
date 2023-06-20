import React from 'react'

export default function LogSet({
    bodyPart,
    selectedExercise,
    setInput,
    setSetInput,
    handleRepsChange,
    handleWeightChange,
    handleIsSetActive,
    closeAddSet,
    isSetActive,
    addSet


}) {
    return (
        <div className='w-full flex justify-center fixed bottom-0  overflow-hidden'>

            <div className={`w-3/4 bg-white rounded-t-3xl  flex flex-col justify-center items-center gap-6  duration-300
                    ${isSetActive ? "h-48" : "h-0"}`}>

                <span className='font-bold'>Add Set</span>
                <form className='flex flex-col gap-4 justify-center items-center'
                    onSubmit={
                        e => {
                            e.preventDefault()
                           
                            addSet(bodyPart , selectedExercise , setInput)
                            setSetInput({ reps: '', weight: '' })

                        }
                    }
                >
                    <input
                        className='border px-2 py-1'
                        type="tel"
                        onChange={handleRepsChange}
                        value={setInput.reps}
                        placeholder='No of Reps'
                    />
                    <input
                        className='border px-2 py-1'
                        type="tel"
                        onChange={handleWeightChange}
                        value={setInput.weight}
                        placeholder='Kg'
                    />

                    <div className='flex gap-3'>
                        <button type='button' onClick={closeAddSet} className='w-[75px] h-[25px] rounded-lg bg-background-100 text-black text-sm '>
                            Cancel</button>
                        <button disabled={!(setInput.weight && setInput.reps)} onClick={() => handleIsSetActive(bodyPart, selectedExercise)} className='w-[75px] h-[25px] rounded-lg bg-iphoneBlue-100 text-white text-sm '>
                            Add</button>

                    </div>
                </form>
            </div>

        </div>
    )
}
