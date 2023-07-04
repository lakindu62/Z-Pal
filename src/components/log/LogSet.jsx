import React from 'react';
import LogForm from './LogForm';

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
    addSet,
}) {


    const title = 'Add Set'
    const onSubmit = (e) => {
        e.preventDefault();
        addSet(bodyPart, selectedExercise, setInput);
        setSetInput({ reps: '', weight: '' });
    }
    const onCancel = closeAddSet
    const inputLabel = 'No of Reps'
    const inputPlaceholder = 'No of Reps'
    const repStateValue = setInput.reps
    const weightStateValue = setInput.weight


    const isFormActive = isSetActive

    const isInputFilled = repStateValue && weightStateValue



    return (


        <div>


            <div className='w-full flex justify-center fixed bottom-0 overflow-hidden'>
                <div
                    className={`w-full bg-white rounded-t-3xl flex flex-col justify-center items-center gap-6 duration-300 ${isFormActive ? 'h-[99vh]' : 'h-0'
                        }`}
                >
                    <div className='flex flex-col justify-center items-center -translate-y-20'>
                        <span className='font-bold'>{title}</span>
                        <form
                            className='flex flex-col gap-4 justify-center items-center'
                            onSubmit={onSubmit}
                        >


                            <input
                                className='border px-2 py-1'
                                type='number'
                                onChange={(e) => handleRepsChange(e)}
                                value={repStateValue}
                                placeholder={inputPlaceholder}
                                required
                            />

                            <input
                                className='border px-2 py-1'
                                type='number'
                                onChange={(e) => handleWeightChange(e)}
                                value={weightStateValue}
                                placeholder='weight'
                                required
                            />

                            <div className='flex gap-3 flex-row-reverse'>
                                <button
                                    disabled={!isInputFilled}
                                    onClick={onCancel}
                                    className='w-[75px] h-[25px] rounded-lg bg-iphoneBlue-100 text-white text-sm'
                                >
                                    Add
                                </button>
                                <button
                                    onClick={onCancel}
                                    className='w-[75px] h-[25px] bg-background-100 rounded-lg'
                                    type='button'
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
