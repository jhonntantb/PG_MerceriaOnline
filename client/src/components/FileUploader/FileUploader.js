import React, { useState } from 'react';
import firebase from "firebase";
import { useEffect } from 'react';
import './FileUploaderButton.css'



const ReactFirebaseFileUpload = ({ storeImages, setStoreImages }) => {
    const [images, setImages] = useState([]);
    const [urls, setUrls] = useState([]);
    const [progress, setProgress] = useState(0);

    var auxLoadedImage = []


    const handleChange2 = (e) => {
        e.preventDefault()
        let auxLoader = []
        for (let i = 0; i < e.target.files.length; i++) {
            const newImage = e.target.files[i];
            newImage["id"] = Math.random();
            auxLoader.push(newImage)
        }
        setImages(auxLoader)
    };

    const handleUpload = async (e, setUrls) => {
        e.preventDefault();
        var promises = [];
        images.forEach((image) => {
            const uploadTask = firebase.storage().ref(`images/${image.name}`).put(image);
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
                },
                () => {
                    firebase.storage()
                        .ref("images")
                        .child(image.name)
                        .getDownloadURL()
                        .then((url) => {
                            auxLoadedImage.push(url)
                        })
                })
            promises.push(uploadTask);
        });


        await Promise.all(promises)

        setTimeout(function () {
            setUrls(urls.concat(auxLoadedImage))
            auxLoadedImage = [];
        }, 1500)
        setImages([])
    };

    useEffect(() => {
        if (urls.length > 0) {
            setStoreImages(urls)
        }

    }, [urls])

    useEffect(() => {
        if (storeImages.length > 0) setUrls(storeImages)
    }, [storeImages])


    function quitImageHandler(e) {
        e.preventDefault()
        let auxUrl = urls.filter(u => u !== e.target.value)
        setUrls(auxUrl)
    }

    return (
        <div className="container">
            <progress value={progress} max="100" />
            <br />
            <br />
            <input className="btn btn-" type="file" multiple onChange={handleChange2} />
            <button id="buttonupload" hidden={!(images.length > 0)} onClick={(e) => handleUpload(e, setUrls)}>Upload</button>
            <br />
            <br />
            {urls.length > 0 ? urls.map((url, i) => (
                <div className="container" key={i}> <img
                    style={{ width: "250px" }}
                    src={url || "http://via.placeholder.com/300"}
                    alt="firebase-image"
                />
                    <button name={i} value={url} onClick={quitImageHandler}>X</button>
                </div>
            )) : null}
        </div>
    );
};

export default ReactFirebaseFileUpload;
