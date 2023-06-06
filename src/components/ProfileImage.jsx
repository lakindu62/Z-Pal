import React, { useState, useEffect } from 'react';
import { setProfileImage } from '../firebase-storage'

import { useAuth } from "../contexts/auth"





function ProfilePictureUpload({handleUploadImage , isUploadImageActive ,displayImageUrl}) {
    const [selectedImage, setSelectedImage] = useState(null);



    const { currentUser } = useAuth()

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(URL.createObjectURL(file));
        
       

    };



    // async function uploadImage() {
    //     try {
    //         const snapshot = await setProfileImage(currentUser.uid, selectedImage)
    //         getProfileImage(currentUser.uid, setDisplayImage)

    //         console.log(displayImage)
    //     } catch (error) {
    //         console.log("failed to set profile pic")
    //     }

    // }

 
   



    useEffect(() => {
        setProfileImage(currentUser.uid , selectedImage)
          

    }, [selectedImage])

    return (








        <div className={`bg-white  flex flex-col gap-5 items-center justify-center w-full duration-200`}>
            <img className='h-16 w-16 object-cover rounded-full'    src={`${displayImageUrl ? displayImageUrl : "/icons/noProfileIcon.png"}`}  alt="" />
            <hr className='bg-slate-300 h-0.5 w-full -m-2' />
            <label htmlFor="imageUpload" className='text-sm text-iphoneBlue-100 cursor-pointer'>Upload Photo</label>
            <input  onChange={handleImageChange} type='file' className=' text-sm text-iphoneBlue-100 hidden  ' id='imageUpload' /> 
            <hr className='bg-slate-300 h-0.5 w-full -m-2' />

            <button className='text-sm  text-red-500'>Remove Current Photo</button>
            <hr className='bg-slate-300 h-0.5 w-full -m-2' />

            <button onClick={handleUploadImage} className='text-sm  text-black'>Cancel</button>
            
        </div>



        // <div>
        //     <button onClick={uploadImage} className='bg-background-100 p-2 rounded-xl'>Upload Image</button>

        //     {displayImage ? (
        //         <img src={displayImage} alt="Selected" className='h-[120px] w-[120px] object-cover rounded-full' />
        //     ) : (
        //         <img src="/icons/noProfileIcon.png" alt="Selected" className='h-[120px] w-[120px] object-cover rounded-full' />
        //     )}

        //     <input type="file" accept="image/*" onChange={handleImageChange} hidden id='profileImageUpload' />
        // </div>
    );
}

export default ProfilePictureUpload;
