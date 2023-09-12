import { Button } from '@mui/base';
import React, { useState } from 'react';
import { storage, db, firebase } from './firebase';
import { upload } from '@testing-library/user-event/dist/upload';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { serverTimestamp } from "firebase/firestore";
import './ImageUpload.css';



function ImageUpload({username}) {
    const [image,setImage]=useState(null);
    const [progress,setProgress]=useState(0);
    const [caption, setCaption]=useState('');

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        const storageRef = ref(storage, `/files/${image.name}`);
         const uploadTask = uploadBytesResumable(storageRef, image);
 
         // const uploadTask = storage.ref(`images/${image.name}`).put(image);


        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) => {
                console.log(error);
                alert(error.message);
            },
            () => {
                // storage
                // .child(image.name)
                getDownloadURL(uploadTask.snapshot.ref)
                .then(url => {
                    db.collection("posts").add({
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        caption: caption,
                        imageUrl: url,
                        username: username
                    });
                                    
                    setProgress(0);
                    setCaption("");
                    setImage(null);
                });
            }
        );      
    };



  return (
    <div className='imageupload'>
        <progress value={progress} max="100" className='imageupload_progress' />
        <input type='text' placeholder='write a caption' onChange={event => setCaption(event.target.value)} value={caption}/>    
        <input type='file' onChange={handleChange}/>
        <Button onClick={handleUpload}> Upload </Button>


        </div>
  )
}

export default ImageUpload