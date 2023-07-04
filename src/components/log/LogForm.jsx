import React from 'react';

export default function LogForm({
    title,
    onSubmit,
    onCancel,
    inputLabel,
    inputPlaceholder,
    inputValue,
    setInputValue,
    isFormActive,
}) {
    return (
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
                            type='text'
                            onChange={(e) => setInputValue(e.target.value)}
                            value={inputValue}
                            placeholder={inputPlaceholder}
                            required
                        />
                        <div className='flex gap-3 flex-row-reverse'>
                            <button
                                disabled={!inputValue}
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
    );
}
