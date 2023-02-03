
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./auth/config";


export const uploadFile = (file) => {
    if(!file){
        return;
    }
    else {
        const storageRef = ref(storage, 'images/' + 'image-'+Date.now()+Math.round(Math.random()*1E9));
        const uploadTask = uploadBytesResumable(storageRef, file);
    
        uploadTask.on('state_changed',
            (snapshot) => {
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            },
            (error) => {
                console.log('error while uploading image...')
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    return downloadURL;
                });
            }
        );
    }
}
