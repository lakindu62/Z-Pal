import React, { useRef } from 'react'

const SelectActiveSplit = (
    {
        activeSplit,
        handleActiveSplitChange,
        splits

    }
) => {


    const selectRef = useRef(null);

    const handleLabelClick = () => {
        console.log(selectRef.current.target)
      selectRef.current.click();
    };

    return (

            
            <div>
                <select ref={selectRef} className='p-1.5 bg-[#F6F6F6]  pr-2  rounded-xl text-sm tracking-wider  ' id="active-split" value={activeSplit} onChange={handleActiveSplitChange}>
                    {splits?.map((split) => (
                        <option className='' key={split.id} value={split.name}>
                            {split.name}
                        </option>
                    ))}
                </select>
               
            </div>

    )
}

export default SelectActiveSplit