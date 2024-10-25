import "./ImageForm.css"
import { useEffect, useRef, useState } from "react";
import { db } from "../../FirebaseInit";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ImageForm(props) {
    const { albumName, albumId, updateImage, setUpdateImage, setShowImageForm } = props;

    const titleRef = useRef();
    const imageUrlRef = useRef();
    const [loading, setLoading] = useState(false); // Loading state

    useEffect(() => {
        if (updateImage) {
            titleRef.current.value = updateImage.title;
            imageUrlRef.current.value = updateImage.imageUrl;
        }
    }, [updateImage]);

    function clearForm(e) {
        e.preventDefault();
        titleRef.current.value = "";
        titleRef.current.focus();
        imageUrlRef.current.value = "";
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);  // Start loading

        const data = {
            title: titleRef.current.value,
            imageUrl: imageUrlRef.current.value
        };

        try {
            // If updating, first remove the old image then add the new one
            if (updateImage) {
                const oldData = {
                    title: updateImage.title,
                    imageUrl: updateImage.imageUrl
                };
                await updateDoc(doc(db, "albums", albumId), {
                    imageList: arrayRemove(oldData),
                });
            }

            // Add the new image
            await updateDoc(doc(db, "albums", albumId), {
                imageList: arrayUnion(data)
            });

            setUpdateImage(null);
            setShowImageForm(false);

            toast.success(updateImage ? "Image updated successfully." : "Image added successfully.");

            // Clear form
            titleRef.current.value = "";
            titleRef.current.focus();
            imageUrlRef.current.value = "";
        } catch (error) {
            console.error("Error updating album: ", error);
            toast.error("Failed to update the album.");
        } finally {
            setLoading(false);  // End loading
        }
    }

    return (
        <>
            <div className="imageForm">
                <span>{updateImage ? `Update image in ${albumName}` : `Add image to ${albumName}`}</span>
                <form onSubmit={handleSubmit}>
                    <input required placeholder="Title" ref={titleRef} />
                    <input required placeholder="Image URL" ref={imageUrlRef} />
                    <div className="imageForm-actions">
                        <button type="button" onClick={clearForm}>Clear</button>
                        <button disabled={loading}>{updateImage ? "Update" : "Add"}</button>
                    </div>
                </form>
            </div>
        </>
    );
}
