
import React from 'react'

export default function LogExercise({
    bodyPart,
    exerciseInput,
    setExerciseInput,
    addExercise,
    closeAddExercise,
    isAddExerciseActive
}) {
    return (
        <div className='w-full flex justify-center fixed bottom-0  overflow-hidden'>
            <div className={`w-3/4 bg-white rounded-t-3xl  flex flex-col justify-center items-center gap-6  duration-300
                ${isAddExerciseActive ? "h-48" : "h-0"}`}>

                <span className='font-bold'>Add Excercise</span>
                <form className='flex flex-col gap-4 justify-center items-center'
                    onSubmit={
                        e => {
                            e.preventDefault()
                            addExercise(bodyPart, exerciseInput)

                        }
                    }>
                    <input
                        className='border px-2 py-1'
                        type="text"
                        onChange={e => setExerciseInput(e.target.value)}
                        value={exerciseInput}
                        placeholder='name'
                        required
                    />
                

                    <div className='flex gap-3 flex-row-reverse'>
                        <button disabled={!exerciseInput} onClick={closeAddExercise} className='w-[75px] h-[25px] rounded-lg bg-iphoneBlue-100 text-white text-sm '>
                        Add
                        </button>
                        <button onClick={closeAddExercise} className='w-[75px] h-[25px]  bg-background-100 rounded-lg' type='button' >Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
