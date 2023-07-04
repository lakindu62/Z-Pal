import React from 'react';
import LogForm from './LogForm';

export default function LogExercise({
    bodyPart,
    exerciseInput,
    setExerciseInput,
    addExercise,
    closeAddExercise,
    isAddExerciseActive,
}) {
    return (
        <LogForm
            title='Add Exercise'
            onSubmit={(e) => {
                e.preventDefault();
                addExercise(bodyPart, exerciseInput);
            }}
            onCancel={closeAddExercise}
            inputLabel='name'
            inputPlaceholder='name'
            inputValue={exerciseInput}
            setInputValue={setExerciseInput}
            isFormActive={isAddExerciseActive}
        />
    );
}
