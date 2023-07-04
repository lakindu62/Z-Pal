import React from 'react'

const AddButton = (
    {handleFormActive,
    btnName}
    
) => {


    return (
        <button onClick={handleFormActive} className='bg-white px-4 py-4 flex justify-center items-center gap-3 rounded-xl shadow-md group h-14 '>
            <img src="/icons/add-blue.svg" alt="" className='h-5 group-hover:h-6 duration-100 ease-out' />
            <span className='text-sm'>{`Lets add some ${btnName}s`}</span>
        </button>
    )
}

export default AddButton