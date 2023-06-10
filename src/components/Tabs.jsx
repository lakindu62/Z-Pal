import React, { useEffect, useState } from 'react';

import { db } from '../firebase';

import { collection, doc, onSnapshot } from 'firebase/firestore'
import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore';

const Tabs = ({ path }) => {
    const [bodyParts, setBodyParts] = useState([])
    

    const [activeTab, setActiveTab] = useState("#");
    const handleTabClick = (target) => {
        setActiveTab(target);
    };

   
    const docRef = doc(db, path)













    useEffect(() => {
        onSnapshot(docRef, (snapshot) => {
            const data = snapshot.data()
          
            setBodyParts([])
            Object.entries(data).map(([key, value]) => {
                setBodyParts((prev) => {
                    return [
                        ...prev,
                        {
                            [key]: {
                                name: key,
                                exercises: value,
                            },
                        },
                    ];
                });
            });
            ;
        });
    }, []);

    useEffect(() => {
        if (bodyParts.length > 0) {
          const initialTab = `#${Object.keys(bodyParts[0])[0]}`;
          setActiveTab(initialTab);
        }
      }, [bodyParts]);


    




    return (
        <div className='w-full flex items-center justify-center flex-col'>
            Log History
            <div className='w-3/4 bg-white'>
                <div className='flex justify-between px-2 py-2'>
                    <div></div>
                    <div className='flex gap-3'>
                        <img src="/icons/backwards.svg" alt="" />
                        <span>Today</span>
                        <img src="/icons/forwards.svg" alt="" />
                    </div>

                    <button>Relog</button>      
                </div>
                <div className='flex w-full justify-center flex-col items-center'>
                    <div>
                        <ul className="flex gap-3   list-none">
                            {bodyParts.map((data) => {
                                const bodyPartName = Object.keys(data)[0]
                                return (<li
                                    className={`tab cursor-pointer  ${activeTab === `#${bodyPartName}` ? 'active' : ''}
                                    bg-black text-white px-2 py-1 rounded-xl
                                    `}
                                    onClick={() => handleTabClick(`#${bodyPartName}`)}
                                >
                                    {bodyPartName}
                                </li>)
                            })}
                        </ul>
                    </div>
                    <div className="tab-content mt-5 bg-slate-200">
                        {bodyParts.map(data => {
                            const bodyPartName = Object.keys(data)[0]
                            const exercisesObj = data[bodyPartName].exercises
                            const array = Object.entries(exercisesObj).map(([key , value])=>{
                                return key
                            })
                            return(
                                <div
                                id="home"
                                data-tab-content
                                className={`tab-pane ${activeTab ===  `#${bodyPartName}` ? 'active' : ''}`}
                            >
                                <h1>{array}</h1>
                                <p>This is the home</p>
                            </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tabs;
