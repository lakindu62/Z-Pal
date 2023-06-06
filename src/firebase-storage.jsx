import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,

} from "firebase/storage"






//root reference
const storage = getStorage()



async function setProfileImage(userId, imageFile) {
    const currentUserProfileImage = ref(storage, `users/${userId}/images/profileImage.jpg`);

    try {
        const response = await fetch(imageFile)
        const image = await response.blob()
        return await uploadBytes(currentUserProfileImage, image)
      
        
    } catch (error) {
        console.log("failed to upload", error)
    }


}


function getProfileImage(userId) {
    return new Promise((resolve, reject) => {
      const currentUserProfileImage = ref(storage, `users/${userId}/images/profileImage.jpg`);
      getDownloadURL(currentUserProfileImage)
        .then(receivedUrl => {
          resolve(receivedUrl);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  


export { setProfileImage, getProfileImage }



